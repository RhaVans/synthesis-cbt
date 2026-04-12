const fs = require('fs');
const files = ['b11_matdas.js','b13_matdas.js','b14_matdas.js','b16_matdas.js',
               'b2_tkd_matdas.js','b4_matdas_1.js','b4_matdas_2.js','b5_matdas_1.js'];

for (const f of files) {
    if (!fs.existsSync(f)) continue;
    const s = fs.readFileSync(f, 'utf8');
    // Find dollar-wrapped regions longer than 50 chars with NO latex commands (\\cmd)
    const re = /\$([^$]{50,})\$/g;
    let m, long = [];
    while ((m = re.exec(s)) !== null) {
        // If inner has no \\cmd and has spaces (prose text), it's a bad wrap
        if (!/\\\\[a-zA-Z]/.test(m[1]) && m[1].includes(' ')) {
            long.push(m[1].slice(0, 80));
        }
    }
    if (long.length) {
        console.log(`\n${f}: ${long.length} bad prose-in-dollar wraps`);
        long.slice(0, 3).forEach(x => console.log('  [' + x + ']'));
    }
}
console.log('\nDone.');
