const {execSync} = require('child_process');
const s = execSync('git show HEAD:questions_saintek_fisika.js', {encoding:'utf8'});
const idx = s.indexOf('2h/g');
if (idx >= 0) {
    console.log('Context:');
    console.log(s.slice(Math.max(0,idx-50), idx+30));
    console.log('\nChar codes:');
    [...s.slice(idx-10, idx+5)].forEach(c => process.stdout.write(`${c.charCodeAt(0)}(${c==='\\' ? '\\\\' : c==='$' ? '$' : c}) `));
    console.log('');
}
