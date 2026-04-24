// Wait! If I just look at how "math" is typically written in these files, they are just strings like:
// "Jika f(x) = 2^{x+1} dan g(x) = \\log_{2}(x - 3), maka nilai dari (f \\circ g)(19) adalah \\ldots"
// The problem is that KaTeX formatting should ideally be done by HUMANS when writing the questions.
// `katex_master.js` was a script to try and automate it.
// If I change `katex_master.js`, I'm modifying the source files. But `katex_master.js` is just a script. It's an OPTIONAL converter?
// The prompt says: "Modify `wrapRawTokens` in `scripts/katex_master.js` to group adjacent math atoms, operators (like `+`, `-`, `=`, `<`), numbers, and spaces into a single `$ ... $` block, rather than wrapping them individually. This ensures expressions like `x^2 + y^2 = 25` and `(x-5)^2` are properly wrapped together."
// Okay, so the user EXPECTS me to modify `wrapRawTokens` to do this grouping.

// Let's implement the token-based grouping inside `wrapRawTokens`.

const KNOWN_LATEX = new Set([
    'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega',
    'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega',
    'sin', 'cos', 'tan', 'cot', 'sec', 'csc', 'arcsin', 'arccos', 'arctan', 'sinh', 'cosh', 'tanh', 'coth',
    'log', 'ln', 'exp', 'lim', 'max', 'min', 'inf', 'sup', 'det', 'mod', 'gcd',
    'int', 'iint', 'iiint', 'oint', 'sum', 'prod', 'coprod',
    'sqrt', 'frac', 'cfrac', 'binom', 'over', 'choose',
    'infty', 'emptyset', 'nabla', 'partial', 'exists', 'nexists', 'forall', 'neg', 'lor', 'land',
    'rightarrow', 'leftarrow', 'leftrightarrow', 'Rightarrow', 'Leftarrow', 'Leftrightarrow', 'uparrow', 'downarrow', 'updownarrow', 'Uparrow', 'Downarrow', 'Updownarrow', 'mapsto', 'longmapsto', 'nearrow', 'searrow', 'swarrow', 'nwarrow', 'to',
    'equiv', 'sim', 'simeq', 'approx', 'cong', 'neq', 'leq', 'geq', 'll', 'gg', 'propto', 'doteq', 'propto',
    'subset', 'supset', 'subseteq', 'supseteq', 'in', 'notin', 'ni', 'cap', 'cup', 'setminus', 'times', 'div', 'pm', 'mp', 'ast', 'star', 'circ', 'bullet', 'cdot', 'oplus', 'ominus', 'otimes', 'oslash', 'odot', 'amalg',
    'ldots', 'cdots', 'vdots', 'ddots',
    'hat', 'check', 'breve', 'acute', 'grave', 'tilde', 'bar', 'vec', 'dot', 'ddot',
    'mathbb', 'mathbf', 'mathcal', 'mathfrak', 'mathscr', 'mathsf', 'mathtt', 'mathit', 'mathrm',
    'left', 'right', 'langle', 'rangle', 'lvert', 'rvert', 'lVert', 'rVert', 'lceil', 'rceil', 'lfloor', 'rfloor',
    'text', 'quad', 'qquad', '!', ',', ':', ';', ' ',
    'begin', 'end', 'hline', 'cline', 'multicolumn', 'multirow', 'array', 'matrix', 'pmatrix', 'bmatrix', 'Bmatrix', 'vmatrix', 'Vmatrix', 'cases', 'align', 'aligned', 'gather', 'gathered', 'eqnarray', 'equation',
    'displaystyle', 'textstyle', 'scriptstyle', 'scriptscriptstyle', ' limits', 'nolimits'
]);

function readBracedArg(raw, startI, open, close, out) {
    let i = startI;
    if (raw[i] !== open) return i;
    out.push(open); i++;
    let depth = 1;
    while (i < raw.length && depth > 0) {
        if (raw[i] === open) { depth++; out.push(raw[i]); i++; }
        else if (raw[i] === close) {
            depth--;
            if (depth === 0) { out.push(close); i++; break; }
            out.push(raw[i]); i++;
        } else {
            out.push(raw[i]); i++;
        }
    }
    return i;
}

function readAtomMods(raw, atomToks, startI) {
    let i = startI;
    const n = raw.length;
    let again = true;
    while (again) {
        again = false;
        if (i < n && raw[i] === '_') {
            i++;
            if (i < n && raw[i] === '{') {
                atomToks.push('_');
                i = readBracedArg(raw, i, '{', '}', atomToks);
                again = true;
            } else if (i < n && raw[i] && /[a-zA-Z0-9)]/.test(raw[i][0])) {
                atomToks.push('_', raw[i]); i++; again = true;
            } else { i--; }
        }
        if (i < n && raw[i] === '^') {
            i++;
            if (i < n && raw[i] === '{') {
                atomToks.push('^');
                i = readBracedArg(raw, i, '{', '}', atomToks);
                again = true;
            } else if (i < n && raw[i] === '-' && i+1 < n && /[0-9]/.test((raw[i+1]||'')[0])) {
                atomToks.push('^{', raw[i], raw[i+1], '}'); i += 2; again = true;
            } else if (i < n && raw[i] && /[a-zA-Z0-9)]/.test(raw[i][0])) {
                atomToks.push('^', raw[i]); i++; again = true;
            } else { i--; }
        }
        if (i < n && raw[i] === '{') {
            i = readBracedArg(raw, i, '{', '}', atomToks);
            again = true;
        }
        if (i < n && raw[i] === '(') {
            i = readBracedArg(raw, i, '(', ')', atomToks);
            again = true;
        }
    }
    return i;
}

function wrapRawTokens(raw) {
    const tokens = [];
    let i = 0;
    const n = raw.length;
    while (i < n) {
        const tok = raw[i];

        // LaTeX command
        if (tok === '\\\\' && i+1 < n && raw[i+1] && /[a-zA-Z]/.test(raw[i+1][0])) {
            let j = i + 1;
            let letters = '';
            while (j < n && raw[j] && raw[j].length === 1 && /[a-zA-Z]/.test(raw[j])) {
                letters += raw[j]; j++;
            }
            let cmdLen = 0;
            for (let k = letters.length; k >= 1; k--) {
                if (KNOWN_LATEX.has(letters.slice(0, k))) { cmdLen = k; break; }
            }
            if (cmdLen === 0) cmdLen = 1;
            const cmd = letters.slice(0, cmdLen);
            const atomToks = ['\\\\', ...cmd.split('')];
            i = i + 1 + cmdLen;
            const remainder = letters.slice(cmdLen);
            i = readAtomMods(raw, atomToks, i);
            tokens.push({ type: 'math', value: atomToks.join('') });
            if (remainder) {
                // If it's a single letter remainder, treat as math_var maybe?
                if (remainder.length === 1) tokens.push({ type: 'math_var', value: remainder });
                else tokens.push({ type: 'text', value: remainder });
            }
            continue;
        }

        // Exponent/subscript
        if (/[a-zA-Z0-9)]/.test(tok) && i+1 < n && (raw[i+1] === '^' || raw[i+1] === '_')) {
            const base = tok, mod = raw[i+1];
            let j = i + 2;
            let atom = [base, mod];
            let matched = false;
            if (j < n && raw[j] === '{') {
                j = readBracedArg(raw, j, '{', '}', atom);
                matched = true;
            } else if (mod === '^' && j < n && raw[j] && /[0-9]/.test(raw[j][0])) {
                atom.push(raw[j]); j++; matched = true;
            } else if (mod === '^' && j < n && raw[j] === '-' && j+1 < n && /[0-9]/.test((raw[j+1]||'')[0])) {
                atom.push('{', raw[j], raw[j+1], '}'); j += 2; matched = true;
            }
            if (matched) {
                tokens.push({ type: 'math', value: atom.join('') });
                i = j; continue;
            }
        }

        if (/[0-9]/.test(tok)) {
            tokens.push({ type: 'math_op', value: tok });
            i++; continue;
        }

        if (/[-+=<>*/()]/.test(tok)) {
            tokens.push({ type: 'math_op', value: tok });
            i++; continue;
        }

        if (/[a-zA-Z]/.test(tok)) {
            let j = i;
            let letters = '';
            while (j < n && /[a-zA-Z]/.test(raw[j])) {
                letters += raw[j]; j++;
            }
            // "f" or "x" or "y"
            if (letters.length === 1) {
                tokens.push({ type: 'math_var', value: letters });
            } else {
                tokens.push({ type: 'text', value: letters });
            }
            i = j; continue;
        }

        if (/[ \t]/.test(tok)) {
            tokens.push({ type: 'space', value: tok });
            i++; continue;
        }

        tokens.push({ type: 'text', value: tok }); i++;
    }

    // Grouping
    let finalStr = '';
    let currentMath = [];

    for (let k = 0; k < tokens.length; k++) {
        let t = tokens[k];
        let isMath = (t.type === 'math' || t.type === 'math_op' || t.type === 'math_var');
        let isSpace = (t.type === 'space');

        if (isMath) {
            currentMath.push(t);
        } else if (isSpace && currentMath.length > 0) {
            // Space inside math island?
            let nextMath = false;
            let textAhead = false;
            for (let l = k + 1; l < tokens.length; l++) {
                if (tokens[l].type === 'space') continue;
                if (tokens[l].type === 'math' || tokens[l].type === 'math_op' || tokens[l].type === 'math_var') {
                    nextMath = true;
                } else {
                    textAhead = true;
                }
                break;
            }
            if (nextMath) {
                currentMath.push(t);
            } else {
                finalStr += renderMathIsland(currentMath);
                currentMath = [];
                finalStr += t.value;
            }
        } else {
            if (currentMath.length > 0) {
                 finalStr += renderMathIsland(currentMath);
                 currentMath = [];
            }
            finalStr += t.value;
        }
    }

    if (currentMath.length > 0) {
         finalStr += renderMathIsland(currentMath);
    }

    return finalStr;
}

function renderMathIsland(tokens) {
    let str = tokens.map(t => t.value).join('');
    // Ensure the island contains at least one explicit math feature:
    // a latex command, an exponent `^`, subscript `_`, or math operators like `=`.
    let hasCoreMath = tokens.some(t => t.type === 'math' || (t.type === 'math_op' && /[=<>+\-]/.test(t.value)));
    if (hasCoreMath && str.trim() !== '' && !/^[0-9.,]+$/.test(str.trim())) {
        return '$' + str + '$';
    } else {
        return str;
    }
}

function processTest(s) {
    const rawStrTokens = [];
    for (let k = 0; k < s.length; k++) {
        if (s[k] === '\\' && s[k+1] === '\\') {
            rawStrTokens.push('\\\\'); k++;
        } else {
            rawStrTokens.push(s[k]);
        }
    }
    return wrapRawTokens(rawStrTokens);
}

const inputs = [
    "Jika x^2 + y^2 = 25 dan \\\\int_{0}^{1} x dx, maka \\\\log_2(x-3) = 5.",
    "Luas = 150.72 cm^2",
    "Nilai dari (x-5)^2 adalah",
    "Persamaan (x-5)^2 = 0",
    "f(x) = x_1 + y_2",
    "f(x) = 2^{x+1} dan g(x) = \\\\log_{2}(x - 3), maka nilai dari (f \\\\circ g)(19) adalah \\\\ldots"
];

for (let s of inputs) {
    console.log(processTest(s));
}
