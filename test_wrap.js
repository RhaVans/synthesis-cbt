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
            } else if (i < n && raw[i] && /[a-zA-Z0-9]/.test(raw[i][0])) {
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
            } else if (i < n && raw[i] && /[a-zA-Z0-9]/.test(raw[i][0])) {
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

function tokenizeMath(raw) {
    const out = [];
    let i = 0;
    const n = raw.length;
    while (i < n) {
        const tok = raw[i];
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
            out.push({ type: 'math', value: atomToks.join('') });
            if (remainder) {
                out.push({ type: 'text', value: remainder });
                i = j;
            }
            continue;
        }
        if (/[a-zA-Z0-9]/.test(tok) && i+1 < n && (raw[i+1] === '^' || raw[i+1] === '_')) {
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
                out.push({ type: 'math', value: atom.join('') });
                i = j; continue;
            }
        }

        out.push({ type: 'text', value: tok }); i++;
    }
    return out;
}

const s = "Jika x^2 + y^2 = 25 dan \\int_{0}^{1} x dx, maka log_2(x-3)";
const rawStrTokens = [];
for (let k = 0; k < s.length; k++) {
    if (s[k] === '\\' && s[k+1] === '\\') {
        rawStrTokens.push('\\\\'); k++;
    } else {
        rawStrTokens.push(s[k]);
    }
}
console.log(tokenizeMath(rawStrTokens));
