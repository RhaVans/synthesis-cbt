/**
 * Post-fix: Repair remaining single-backslash LaTeX in already-converted files.
 * These were missed because \t, \b, \n, \r are valid JS escape sequences,
 * so the converter skipped \tan, \beta, \to, \text, \theta, \times, \nabla etc.
 * 
 * Strategy: walk source char-by-char inside string literals.
 * When we see \, check if next char is ALSO \ (already doubled) → skip both.
 * If single \, read the full command word. If it's known LaTeX → double it.
 */
const fs = require('fs');

const ALL_KNOWN = new Set([
    'sqrt','log','lim','frac','sin','cos','tan','cot','sec','csc',
    'arcsin','arccos','arctan','sinh','cosh','tanh','exp','ln',
    'pi','alpha','beta','gamma','delta','epsilon','theta','lambda',
    'mu','sigma','phi','omega','Delta','Sigma','Omega','infty',
    'cdot','circ','pm','mp','times','div','leq','geq','neq','approx',
    'equiv','to','Rightarrow','Leftrightarrow','in','notin','cap','cup',
    'emptyset','subset','subseteq','forall','exists',
    'lfloor','rfloor','lceil','rceil','mathbb','text',
    'sum','int','prod','ldots','vec','hat','bar','overline','underline',
    'binom','left','right','partial','nabla','det',
]);

const files = fs.readdirSync('.').filter(f =>
    f.endsWith('.js') && !f.startsWith('scripts') && !f.startsWith('app')
);

let totalFixed = 0;

for (const file of files) {
    let src = fs.readFileSync(file, 'utf8');
    let fixed = 0;
    let result = '';
    let i = 0;

    while (i < src.length) {
        if (src[i] === '"' || src[i] === "'") {
            const q = src[i];
            result += q;
            i++;
            while (i < src.length) {
                if (src[i] === '\\') {
                    if (src[i+1] === '\\') {
                        // Already doubled backslash — copy both and skip
                        result += '\\\\';
                        i += 2;
                        continue;
                    }
                    // Single backslash — check if followed by known LaTeX command
                    let j = i + 1;
                    let cmd = '';
                    while (j < src.length && /[a-zA-Z]/.test(src[j])) { cmd += src[j]; j++; }
                    if (cmd && ALL_KNOWN.has(cmd)) {
                        // Fix: \cmd → \\cmd
                        result += '\\\\' + cmd;
                        i = j;
                        fixed++;
                        continue;
                    }
                    // Not a known command — copy backslash as-is
                    result += src[i];
                    i++;
                } else if (src[i] === q) {
                    result += q;
                    i++;
                    break;
                } else {
                    result += src[i];
                    i++;
                }
            }
        } else {
            result += src[i];
            i++;
        }
    }

    if (fixed > 0) {
        fs.writeFileSync(file, result, 'utf8');
        console.log(`  ✓ ${file}: ${fixed} fixes`);
        totalFixed += fixed;
    }
}

console.log(`\nTotal: ${totalFixed} single-backslash LaTeX fixed.`);
