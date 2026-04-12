const fs = require('fs');
const s = fs.readFileSync('questions_tkd_matdas.js', 'utf8');
// Extract question texts
const re = /question:\s*"((?:[^"\\]|\\.)*)"/g;
let m, i = 0;
while ((m = re.exec(s)) !== null) {
    i++;
    if (i === 21) {
        console.log('Q21:', m[1]);
        break;
    }
}
