// Full end-to-end trace of Q1's question string
const {execSync} = require('child_process');
const headSrc = execSync('git show HEAD:questions_tkd_matdas.js', {encoding:'utf8'});

// ── Copy exact functions from katex_master.js ──────────
const LATEX_CMDS = /(?<!\\)\\(sqrt|log|lim|frac|sin|cos|tan|cot|sec|csc|arcsin|arccos|arctan|sinh|cosh|tanh|exp|ln|pi|alpha|beta|gamma|delta|epsilon|theta|lambda|mu|sigma|phi|omega|Delta|Sigma|Omega|infty|cdot|circ|pm|mp|times|div|leq|geq|neq|approx|equiv|to|Rightarrow|Leftrightarrow|in|notin|cap|cup|emptyset|subset|subseteq|forall|exists|lfloor|rfloor|lceil|rceil|mathbb|text|sum|int|prod|ldots|neq|vec|hat|bar|overline|underline|binom|left|right|frac|partial|nabla)/g;

function prefixSingleBackslashes(src) {
    return src.replace(/"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'/g, (match, dq, sq) => {
        const inner = dq !== undefined ? dq : sq;
        const q = dq !== undefined ? '"' : "'";
        if (inner.includes('$')) return match;
        const fixed = inner.replace(LATEX_CMDS, '\\\\$1');
        return q + fixed + q;
    });
}

function decodeJSString(raw) {
    let result = '', i = 0;
    while (i < raw.length) {
        if (raw[i] === '\\') {
            i++;
            switch (raw[i]) {
                case 'n': result += '\n'; i++; break;
                case 't': result += '\t'; i++; break;
                case 'r': result += '\r'; i++; break;
                case '\\': result += '\\'; i++; break;
                case "'": result += "'"; i++; break;
                case '"': result += '"'; i++; break;
                case '0': result += '\0'; i++; break;
                default: result += raw[i]; i++;
            }
        } else { result += raw[i]; i++; }
    }
    return result;
}

function encodeJSString(str) {
    let result = '';
    for (const ch of str) {
        switch (ch) {
            case '\\': result += '\\\\'; break;
            case '\n': result += '\\n'; break;
            case '\r': result += '\\r'; break;
            case '\t': result += '\\t'; break;
            case '"': result += '\\"'; break;
            default: result += ch;
        }
    }
    return result;
}

function readBal(s, i, open, close) {
    if (s[i] !== open) return '';
    let depth = 0, j = i;
    while (j < s.length) {
        if (s[j] === open) depth++;
        else if (s[j] === close && --depth === 0) return s.slice(i, j + 1);
        j++;
    }
    return s.slice(i);
}

function readLatexAtom(s, i) {
    if (s[i] !== '\\') return null;
    if (i + 1 >= s.length) return null;
    if (!/[a-zA-Z]/.test(s[i+1])) return null;
    let j = i + 1;
    while (j < s.length && /[a-zA-Z]/.test(s[j])) j++;
    let atom = s.slice(i, j);
    let extended = true;
    while (extended && j < s.length) {
        extended = false;
        if (s[j] === '_') {
            j++;
            if (j < s.length && s[j] === '{') {
                const b = readBal(s, j, '{', '}');
                atom += '_' + b; j += b.length; extended = true;
            } else if (j < s.length && /[a-zA-Z0-9]/.test(s[j])) {
                atom += '_' + s[j]; j++; extended = true;
            } else { j--; }
        }
        if (j < s.length && s[j] === '^') {
            j++;
            if (j < s.length && s[j] === '{') {
                const b = readBal(s, j, '{', '}');
                atom += '^' + b; j += b.length; extended = true;
            } else if (j < s.length && /[a-zA-Z0-9]/.test(s[j])) {
                atom += '^' + s[j]; j++; extended = true;
            } else { j--; }
        }
        if (j < s.length && s[j] === '{') {
            const b = readBal(s, j, '{', '}');
            atom += b; j += b.length; extended = true;
        }
        if (j < s.length && s[j] === '(') {
            const b = readBal(s, j, '(', ')');
            atom += b; j += b.length; extended = true;
        }
    }
    return { atom, end: j };
}

function wrapAtoms(str) {
    if (!str || str.includes('$')) return str;
    if (!/\\[a-zA-Z]|[a-zA-Z0-9]\^[\{0-9\-]|[a-zA-Z]_[\{0-9]/.test(str)) return str;
    let result = '';
    let i = 0;
    const n = str.length;
    while (i < n) {
        if (str[i] === '\\' && i+1 < n && /[a-zA-Z]/.test(str[i+1])) {
            const la = readLatexAtom(str, i);
            if (la && la.atom.length > 1) {
                result += '$' + la.atom + '$';
                i = la.end;
                continue;
            }
        }
        if (/[a-zA-Z0-9]/.test(str[i]) && i+1 < n && (str[i+1] === '^' || str[i+1] === '_')) {
            let atom = str[i]; let j = i + 1;
            const mod = str[j]; j++;
            if (j < n && str[j] === '{') {
                const b = readBal(str, j, '{', '}');
                atom += mod + b; j += b.length;
            } else if (j < n && str[j] === '-' && /[0-9]/.test(str[j+1]||'')) {
                atom += mod + '{' + str[j] + str[j+1] + '}'; j += 2;
            } else if (j < n && /[0-9a-zA-Z]/.test(str[j])) {
                atom += mod + str[j]; j++;
            } else {
                result += str[i]; i++; continue;
            }
            result += '$' + atom + '$';
            i = j;
            continue;
        }
        result += str[i]; i++;
    }
    return result;
}

// ── Now trace the Q1 question string ────────────────────
const STEP1 = prefixSingleBackslashes(headSrc);

// Find Q1 question in STEP1
const step1Lines = STEP1.split('\n');
const q1line = step1Lines[8]; // 0-indexed
console.log('STEP1 Q1 line:');
console.log(q1line);
console.log('');

// Simulate processSource on just the Q1 question string
// The string starts with " and ends with "
const startIdx = q1line.indexOf('"');
const src = q1line;
const n = src.length;
let j = startIdx + 1;
let rawContent = '';
while (j < n) {
    if (src[j] === '\\') { rawContent += src[j] + (src[j+1]||''); j += 2; }
    else if (src[j] === '"') { j++; break; }
    else { rawContent += src[j]; j++; }
}

console.log('rawContent (first 80):', JSON.stringify(rawContent.slice(0, 80)));
console.log('Has $ in rawContent?', rawContent.includes('$'));

const decoded = decodeJSString(rawContent);
console.log('Decoded (first 80):', JSON.stringify(decoded.slice(0, 80)));

const wrapped = wrapAtoms(decoded);
console.log('Wrapped (first 80):', JSON.stringify(wrapped.slice(0, 80)));

const reencoded = encodeJSString(wrapped);
console.log('Re-encoded (first 80):', JSON.stringify(reencoded.slice(0, 80)));
console.log('');
console.log('Final output for file:');
console.log('"' + reencoded.slice(0, 80) + '"');
