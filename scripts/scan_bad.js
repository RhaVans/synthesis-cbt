const fs = require('fs');
const path = require('path');

const KNOWN = new Set([
    'sqrt','log','lim','frac','sin','cos','tan','cot','sec','csc',
    'arcsin','arccos','arctan','sinh','cosh','tanh','exp','ln',
    'pi','alpha','beta','gamma','delta','epsilon','theta','lambda',
    'mu','sigma','phi','omega','Delta','Sigma','Omega','infty',
    'cdot','circ','pm','mp','times','div','leq','geq','neq','approx',
    'to','Rightarrow','Leftrightarrow','in','notin','cap','cup',
    'emptyset','subset','subseteq','forall','exists',
    'lfloor','rfloor','lceil','rceil','mathbb','text',
    'sum','int','prod','ldots','vec','hat','bar','overline','underline',
    'binom','left','right','partial','nabla','det',
]);

const files = fs.readdirSync('.').filter(f => f.endsWith('.js') && !f.startsWith('scripts'));
let totalBad = 0;

for (const file of files) {
    const s = fs.readFileSync(file, 'utf8');
    // Find single-backslash LaTeX: char 92 followed by known cmd, NOT preceded by another 92
    let bad = [];
    for (let i = 0; i < s.length; i++) {
        if (s.charCodeAt(i) === 92) { // backslash
            // Check NOT preceded by another backslash
            if (i > 0 && s.charCodeAt(i-1) === 92) continue;
            // Check followed by known cmd
            let j = i + 1;
            let cmd = '';
            while (j < s.length && /[a-zA-Z]/.test(s[j])) { cmd += s[j]; j++; }
            if (cmd && KNOWN.has(cmd)) {
                // Check it's NOT already doubled (next char after \ is not \)
                if (s.charCodeAt(i+1) !== 92) {
                    bad.push({pos: i, cmd, ctx: s.slice(Math.max(0,i-10), i+cmd.length+5)});
                }
            }
        }
    }
    if (bad.length > 0) {
        totalBad += bad.length;
        console.log(`${file}: ${bad.length} single-backslash LaTeX`);
        bad.slice(0, 3).forEach(b => console.log(`  \\${b.cmd} at ${b.pos}: ...${b.ctx}...`));
    }
}
console.log(`\nTOTAL: ${totalBad} bad single-backslash LaTeX commands`);
