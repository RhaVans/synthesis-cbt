const fs = require('fs');
const src = fs.readFileSync('questions_tkd_matdas.js', 'utf8');
const lines = src.split('\n');

// Q1 question line
const q1 = lines[8];
console.log('Q1 question:');
console.log(q1);
console.log('\nChars around log:');
const logIdx = q1.indexOf('log_');
if (logIdx >= 0) {
    const slice = q1.slice(logIdx - 4, logIdx + 8);
    console.log([...slice].map(c => `${c.charCodeAt(0)}`).join(' '));
    console.log(slice);
}

// Runtime eval
const match = q1.match(/question:\s*"((?:[^"\\]|\\.)*)"/);
if (match) {
    try {
        const rt = new Function(`return "${match[1].replace(/\n/g, '\\n')}"`)();
        console.log('\nRuntime value (first 100):');
        console.log(rt.slice(0, 100));
        console.log('\nChars around log in runtime:');
        const ri = rt.indexOf('log_');
        if (ri >= 0) {
            const rslice = rt.slice(ri-4, ri+8);
            console.log([...rslice].map(c => c.charCodeAt(0)).join(' '));
            console.log(rslice);
        }
    } catch(e) {
        console.log('Eval error:', e.message.slice(0,100));
    }
}

// Count bad \\$ patterns
let badCount = 0, goodCount = 0;
for (let i = 0; i < src.length - 1; i++) {
    if (src[i] === '\\' && src[i+1] === '$') badCount++;
    if (src[i] === '$' && (i === 0 || src[i-1] !== '\\')) goodCount++;
}
console.log('\n\\$ (bad, escaped dollar) count:', badCount);
console.log('$ (good, unescaped) count:', goodCount);
