const {execSync} = require('child_process');
const headSrc = execSync('git show HEAD:questions_tkd_matdas.js', {encoding:'utf8'});

const LATEX_CMD_NAMES = 'sqrt|log|lim|frac|sin|cos|tan|cot|sec|csc|arcsin|arccos|arctan|sinh|cosh|tanh|exp|ln|pi|alpha|beta|gamma|delta|epsilon|theta|lambda|mu|sigma|phi|omega|Delta|Sigma|Omega|infty|cdot|circ|pm|mp|times|div|leq|geq|neq|approx|equiv|to|in|notin|ldots|nabla';
function makeLATEX_RE() {
    return new RegExp(`(?<!\\\\)\\\\(${LATEX_CMD_NAMES})`, 'g');
}
function prefixSingleBackslashes(src) {
    return src.replace(/"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'/g, (match, dq, sq) => {
        const inner = dq !== undefined ? dq : sq;
        const q = dq !== undefined ? '"' : "'";
        if (inner.includes('$')) return match;
        const fixed = inner.replace(makeLATEX_RE(), '\\\\$1');
        return q + fixed + q;
    });
}

// Just process Q1 block
const q1Block = headSrc.split('\n').slice(7, 15).join('\n');
const prefixed = prefixSingleBackslashes(q1Block);

// Confirm chars around log in prefixed
const logIdx = prefixed.indexOf('log_');
if (logIdx >= 0) {
    const slice = prefixed.slice(logIdx-4, logIdx+4);
    console.log('Chars in prefixed before log:', [...slice].map(c=>c.charCodeAt(0)));
}

// Now trace the raw walker
const src = prefixed;
const n = src.length;
let i = 0;
let scanResult = '';

// Find the Q1 question string start
const q1start = src.indexOf('"Jika f(x)');
console.log('\nQ1 string starts at position:', q1start);
const q = '"';
let j = q1start + 1;
let rawContent = '';
while (j < n) {
    const ch = src[j];
    if (ch === '\\') {
        const ecPair = src[j] + (src[j+1]||'');
        rawContent += ecPair;
        j += 2;
    } else if (ch === q) {
        j++; break;
    } else {
        rawContent += ch;
        j++;
    }
}

// Find log in rawContent  
const rcLogIdx = rawContent.indexOf('log_');
if (rcLogIdx >= 0) {
    const rcSlice = rawContent.slice(rcLogIdx-4, rcLogIdx+4);
    console.log('rawContent chars before log:', [...rcSlice].map(c=>c.charCodeAt(0)));
}
console.log('rawContent has $ :', rawContent.includes('$'));
