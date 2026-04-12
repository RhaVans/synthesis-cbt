const {execSync} = require('child_process');
const headFile = execSync('git show HEAD:questions_tkd_matdas.js', {encoding:'utf8'});
const headLines = headFile.split('\n');
const line8 = headLines[8]; // Q1 question line

// Find the backslash before 'log'
const logIdx = line8.indexOf('log_');
if (logIdx < 0) { console.log('log_ not found'); process.exit(1); }

console.log('Chars before log (indices ' + (logIdx-4) + ' to ' + logIdx + '):');
const charsBefore = [...line8.slice(logIdx-4, logIdx+5)].map(c => ({
    char: c,
    code: c.charCodeAt(0)
}));
console.log(JSON.stringify(charsBefore, null, 2));

// How many backslashes?
const numBackslashes = [...line8.slice(logIdx-5, logIdx)].filter(c => c === '\\').length;
console.log('Number of backslashes immediately before log:', numBackslashes);
