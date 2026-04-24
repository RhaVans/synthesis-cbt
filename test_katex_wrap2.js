const fs = require('fs');
const code = fs.readFileSync('scripts/katex_master.js', 'utf8');

eval(code.match(/const KNOWN_LATEX = new Set\([^\)]*\);/)[0]);
eval(code.match(/function readBracedArg\([^)]*\)\s*{[\s\S]*?\n\}/)[0]);
eval(code.match(/function readAtomMods\([^)]*\)\s*{[\s\S]*?\n\}/)[0]);
eval(code.match(/function wrapRawTokens\([^)]*\)\s*{[\s\S]*?\n\}/)[0]);

// Ah, wait! The regex for wrapRawTokens explicitly checks if `tok` is `[a-zA-Z0-9]`.
// But for `(x-5)^2`, `tok` is `)` because `)` is right before `^`.
// Let's modify wrapRawTokens to also accept `)` as a base.

const src = "Persamaan (x-5)^2 = 0";
const tokens = [];
for(let c of src) tokens.push(c);
