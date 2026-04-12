const fs = require('fs');
const path = require('path');

const FILES = [
    'questions_tkd_matdas.js',
    'b4_matdas_1.js',
    'questions_saintek_matipa.js',
    'questions_saintek_fisika.js',
    'questions_saintek_kimia.js',
    'questions_tps_numerik.js',
    'questions_tps_logika.js',
    'b28_saintek_matipa_200.js',
    'b29_saintek_fisika_200.js',
    'b36_saintek_supplement.js',
];

let totalBadDollar = 0;
let totalGoodDollar = 0;
let totalFiles = 0;

for (const file of FILES) {
    const src = fs.readFileSync(file, 'utf8');
    let bad = 0, good = 0;
    for (let i = 0; i < src.length - 1; i++) {
        if (src[i] === '\\' && src[i+1] === '$') bad++;
        if (src[i] === '$' && (i === 0 || src[i-1] !== '\\')) good++;
    }
    totalBadDollar += bad;
    totalGoodDollar += good;
    totalFiles++;
    
    // Show 3 sample wrapped atoms from this file
    const atoms = src.match(/\$[^$\n]{1,40}\$/g) || [];
    const samples = atoms.slice(0, 5).map(a => a.slice(0, 30));
    
    // Try to eval one question to verify runtime
    let runtimeOk = '?';
    try {
        const qMatch = src.match(/question:\s*"((?:[^"\\]|\\.)*)"/);
        if (qMatch) {
            const rt = new Function(`return "${qMatch[1].replace(/\n.*$/s, '')}"`)();
            runtimeOk = rt.includes('$') ? '$ at runtime ✓' : '(no $ in Q1)';
        }
    } catch(e) { runtimeOk = '(eval error)'; }
    
    console.log(`${file}: bad\\$=${bad} good$=${good} ${runtimeOk}`);
    if (samples.length) console.log('  samples:', samples.join(', '));
}

console.log('\n' + '='.repeat(60));
console.log(`TOTAL: bad\\$=${totalBadDollar} (should be 0), good$=${totalGoodDollar}`);
