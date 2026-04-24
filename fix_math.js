// Let's go back to katex_master.js and just fix it!

// Currently in `katex_master.js`:
/*
            if (matched) {
                out.push('$' + atom.join('') + '$');
                i = j; continue;
            }
*/
// It wraps atoms INDIVIDUALLY.
// Let's modify `wrapRawTokens` to return an array of `{type: 'math'|'text', value: string}`.
// And then group them properly!
