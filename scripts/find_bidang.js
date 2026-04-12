const fs = require('fs');

// Search all matdas files for the plane equation question
const files = fs.readdirSync('.').filter(f => f.includes('matdas') && f.endsWith('.js'));
files.push('questions_tkd_matdas.js');

for (const file of files) {
    if (!fs.existsSync(file)) continue;
    const s = fs.readFileSync(file, 'utf8');
    if (s.includes('bidang') && (s.includes('1,0,0') || s.includes('Persamaan bidang'))) {
        const lines = s.split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('bidang') && lines[i].includes('question')) {
                const qm = lines[i].match(/question:\s*"((?:[^"\\]|\\.)*)"/);
                if (qm) console.log(`${file}:${i+1}: ${qm[1].slice(0, 120)}`);
            }
        }
    }
}
