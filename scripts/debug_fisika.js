const fs = require('fs');

const FILES = ['questions_saintek_fisika.js', 'b29_saintek_fisika_200.js', 'b36_saintek_supplement.js'];

for (const file of FILES) {
    const src = fs.readFileSync(file, 'utf8');
    console.log(`\n=== ${file} ===`);
    let count = 0;
    for (let i = 0; i < src.length - 1; i++) {
        if (src[i] === '\\' && src[i+1] === '$') {
            count++;
            if (count <= 5) {
                console.log(`  [${i}] Context: ${JSON.stringify(src.slice(Math.max(0,i-25), i+25))}`);
            }
        }
    }
    console.log(`  Total bad \\$: ${count}`);
}
