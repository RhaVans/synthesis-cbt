const fs = require('fs');
const s = fs.readFileSync('questions_tkd_matdas.js', 'utf8');
const re = /question:\s*"((?:[^"\\]|\\.)*)"/g;
let m, i = 0;
while ((m = re.exec(s)) !== null) {
    i++;
    if (i === 18) {
        console.log('Q18:', m[1]);
        break;
    }
}
