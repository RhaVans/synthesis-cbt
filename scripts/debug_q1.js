// Debug: simulate exact processing of Q1 question string
// HEAD source: "Jika f(x) = 2^{x+1} dan g(x) = \log_{2}(x ? 3), maka nilai dari (f \circ g)(19) adalah ?"
// Note: the original file has SINGLE backslash before \log and \circ

// Step 1: Read HEAD file's exact bytes
const fs = require('fs');
const rawFile = fs.readFileSync('questions_tkd_matdas.js', 'utf8');

// Find the Q1 question string in the currently MODIFIED file (after v5 conversion)
const currentLines = rawFile.split('\n');
console.log('Current Q1 question line (after v5):');
console.log(currentLines[8]);
console.log('');

// Now read the HEAD file using git show
const {execSync} = require('child_process');
const headFile = execSync('git show HEAD:questions_tkd_matdas.js', {encoding:'utf8'});
const headLines = headFile.split('\n');
console.log('HEAD Q1 question line:');
console.log(headLines[8]);
console.log('');

// Extract the question string from HEAD
const headQ = headLines[8];
const match = headQ.match(/question:\s*"((?:[^"\\]|\\.)*)"/);
if (!match) { console.log('NO MATCH'); process.exit(1); }
const innerRaw = match[1];
console.log('Inner raw (as in file):', JSON.stringify(innerRaw));

// Step 2: prefixSingleBackslashes simulation
const LATEX_CMDS = /(?<!\\)\\(log|sqrt|circ|cdot|ldots|neq|pm|pi|alpha|beta|infty|leq|geq|to|frac|sin|cos|tan|lim|ln)/g;
const fixed = innerRaw.replace(LATEX_CMDS, '\\\\$1');
console.log('After prefix:', JSON.stringify(fixed));
const hasDollar = fixed.includes('$');
console.log('Has dollar?', hasDollar);

// Step 3: decodeJSString
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
                default: result += raw[i]; i++;
            }
        } else { result += raw[i]; i++; }
    }
    return result;
}
const decoded = decodeJSString(fixed);
console.log('Decoded:', JSON.stringify(decoded.slice(0,80)));

// Step 4: Check what readLatexAtom does
// \log_{2}(x - 3) in decoded string
const logPos = decoded.indexOf('\\log');
console.log('Log position:', logPos);
if (logPos >= 0) {
    console.log('Char at log-1:', JSON.stringify(decoded[logPos-1]));
    console.log('Chars from log:', JSON.stringify(decoded.slice(logPos, logPos+18)));
}
