// Direct test of processSource on Q1's block
// This replicates the exact functions from katex_master.js

const fs = require('fs');
const path = require('path');

// Load the converter
const converter = fs.readFileSync(path.join(__dirname, 'katex_master.js'), 'utf8');
// Extract all functions by evaluating the module  
// but skip the MATH_SUBJECTS loop at the end

// Instead, let's create a minimal test
const {execSync} = require('child_process');

// Get HEAD Q1 block
const headSrc = execSync('git show HEAD:questions_tkd_matdas.js', {encoding:'utf8'});

// Tiny version of processSource just for Q1
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
        console.log(`  PREFIX: "${inner.slice(0,40)}" → "${fixed.slice(0,40)}"`);
        return q + fixed + q;
    });
}

// Just test on the first 15 lines (Q1 block)
const q1Block = headSrc.split('\n').slice(7, 15).join('\n');
console.log('Input:');
console.log(q1Block);
console.log('\nRunning prefixSingleBackslashes...');
const prefixed = prefixSingleBackslashes(q1Block);
console.log('\nPrefixed result:');
console.log(prefixed);
console.log('\nChars before log in prefixed:');
const logIdx = prefixed.indexOf('log_');
if (logIdx >= 0) {
    const slice = prefixed.slice(logIdx-4, logIdx+4);
    console.log([...slice].map(c => `${c.charCodeAt(0)}(${c==='\\' ? '\\\\' : c})`).join(' '));
}
