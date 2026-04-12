const fs = require('fs');

// Search all matdas files for "integral" questions
const files = fs.readdirSync('.').filter(f => f.includes('matdas') && f.endsWith('.js'));
files.push('questions_tkd_matdas.js');

for (const file of files) {
    if (!fs.existsSync(file)) continue;
    const s = fs.readFileSync(file, 'utf8');
    // Find lines with "integral" (case-insensitive)
    const lines = s.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const l = lines[i];
        if (/integral/i.test(l) && /question/.test(l)) {
            // Find question value
            const qm = l.match(/question:\s*"((?:[^"\\]|\\.)*)"/);
            if (qm) {
                console.log(`${file}:${i+1}:`, qm[1].slice(0, 120));
            }
        }
    }
}
