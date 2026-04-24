const fs = require('fs');
const code = fs.readFileSync('scripts/katex_master.js', 'utf8');

eval(code.match(/const KNOWN_LATEX = new Set\([^\)]*\);/)[0]);
eval(code.match(/function readBracedArg\([^)]*\)\s*{[\s\S]*?\n\}/)[0]);
eval(code.match(/function readAtomMods\([^)]*\)\s*{[\s\S]*?\n\}/)[0]);
eval(code.match(/function wrapRawTokens\([^)]*\)\s*{[\s\S]*?\n\}/)[0]);

const src = "Persamaan (x-5)^2 = 0";
const tokens = [];
for(let c of src) tokens.push(c);

console.log(wrapRawTokens(tokens));
