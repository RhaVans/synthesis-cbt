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
                tokens.push({ type: 'text', value: remainder });
                i = j;
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
                // Wait, if base is `)`, then `(x-5)` should have been part of the math.
                tokens.push({ type: 'math', value: atom.join('') });
                i = j; continue;
            }
        }

        // Number
        if (/[0-9]/.test(tok)) {
            tokens.push({ type: 'math_op', value: tok });
            i++; continue;
        }

        // Math Operator
        if (/[-+=<>*/()]/.test(tok)) {
            tokens.push({ type: 'math_op', value: tok });
            i++; continue;
        }

        // Single letter (could be variable like x, y)
        if (/[a-zA-Z]/.test(tok)) {
            // Check if it's bounded by spaces and math ops
            // Actually, we can just call it 'math_var' if it's a single letter.
            // If it's part of a word, it will be multiple letters.
            // To be safe, let's group all letters together as text.
            let j = i;
            let letters = '';
            while (j < n && /[a-zA-Z]/.test(raw[j])) {
                letters += raw[j]; j++;
            }
            if (letters.length === 1) {
                tokens.push({ type: 'math_var', value: letters });
            } else {
                tokens.push({ type: 'text', value: letters });
            }
            i = j; continue;
        }

        // Spaces
        if (/[ \t]/.test(tok)) {
            tokens.push({ type: 'space', value: tok });
            i++; continue;
        }

        tokens.push({ type: 'text', value: tok }); i++;
    }

    // Now group adjacent math things
    let finalStr = '';
    let currentMath = [];

    for (let k = 0; k < tokens.length; k++) {
        let t = tokens[k];

        // Should we include this token in the current math island?
        let isMath = (t.type === 'math' || t.type === 'math_op' || t.type === 'math_var');
        let isSpace = (t.type === 'space');

        if (isMath) {
            currentMath.push(t.value);
        } else if (isSpace && currentMath.length > 0) {
            // Space inside math island? Only if followed by more math
            let nextMath = false;
            for (let l = k + 1; l < tokens.length; l++) {
                if (tokens[l].type === 'space') continue;
                if (tokens[l].type === 'math' || tokens[l].type === 'math_op' || tokens[l].type === 'math_var') {
                    nextMath = true;
                }
                break;
            }
            if (nextMath) {
                currentMath.push(t.value);
            } else {
                // End of math island
                if (currentMath.join('').trim() !== '') {
                     // Check if it really contains math
                     let hasCoreMath = currentMath.some(v => v.includes('\\\\') || v.includes('^') || v.includes('_') || /[=<>+\-]/.test(v));
                     if (hasCoreMath) {
                         finalStr += '$' + currentMath.join('') + '$';
                     } else {
                         finalStr += currentMath.join('');
                     }
                }
                currentMath = [];
                finalStr += t.value;
            }
        } else {
            // Text or punctuation ends the math island
            if (currentMath.length > 0) {
                 let str = currentMath.join('');
                 // Check if it contains core math
                 let hasCoreMath = currentMath.some(v => v.includes('\\\\') || v.includes('^') || v.includes('_') || /[=<>+\-]/.test(v));
                 if (hasCoreMath && str.trim() !== '' && !/^[0-9.,]+$/.test(str.trim())) { // Don't wrap plain numbers
                     finalStr += '$' + str + '$';
                 } else {
                     finalStr += str;
                 }
                 currentMath = [];
            }
            finalStr += t.value;
        }
    }

    if (currentMath.length > 0) {
         let str = currentMath.join('');
         let hasCoreMath = currentMath.some(v => v.includes('\\\\') || v.includes('^') || v.includes('_') || /[=<>+\-]/.test(v));
         if (hasCoreMath && str.trim() !== '' && !/^[0-9.,]+$/.test(str.trim())) {
             finalStr += '$' + str + '$';
         } else {
             finalStr += str;
         }
    }

    return finalStr;
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
    "Persamaan (x-5)^2 = 0"
];

for (let s of inputs) {
    console.log(processTest(s));
}
