const {execSync} = require('child_process');
const headFile = execSync('git show HEAD:questions_tkd_matdas.js', {encoding:'utf8'});

// Run prefixSingleBackslashes on the HEAD source
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

const afterPrefix = prefixSingleBackslashes(headFile);

// Check Q1 question in afterPrefix
const lines = afterPrefix.split('\n');
const l8 = lines[8];
const logIdx = l8.indexOf('log_');
if (logIdx >= 0) {
    const slice = l8.slice(logIdx-4, logIdx+6);
    console.log('After prefix, chars before log:');
    [...slice].forEach(c => console.log(`  '${c === '\\' ? '\\\\' : c}' (${c.charCodeAt(0)})`));
    const numBs = [...l8.slice(logIdx-5, logIdx)].filter(c => c === '\\').length;
    console.log('Backslashes before log:', numBs);
}
