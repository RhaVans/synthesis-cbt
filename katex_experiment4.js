const fs = require('fs');

function fixSourceWrap(src) {
    // If I just parse the whole file line by line, find the math islands manually...
    // Actually, maybe I can just update the Regex for wrapRawTokens in `katex_master.js` to something simpler?
    // The user's goal was to make sure `x^2 + y^2 = 25` and `(x-5)^2` are properly wrapped together.
    // They are currently separated.
    // Wait... if I simply change `app.js` to NOT wrap client-side, and then manually apply a regex replacement on ALL question bank files?

    // Instead of completely revamping katex_master's token system, I can write a regex replacement that merges adjacent $...$ blocks in the source files.

    let changed = true;
    while(changed) {
        let old = src;
        // Merge $x^2$ + $y^2$ -> $x^2 + y^2$
        src = src.replace(/\$([^$\n]+)\$([ \t]*[-+*/=<>(),0-9]+[ \t]*)\$([^$\n]+)\$/g, '$$$1$2$3$$');
        changed = old !== src;
    }

    // Expand to absorb `(`, `)`, `=`, etc.
    changed = true;
    while (changed) {
        let old = src;
        // Rightwards: e.g. `(x-5)^2` -> currently `(x-5$)^2$` or something, or it wasn't wrapped at all.
        // If I use the modified `[a-zA-Z0-9)]` regex from earlier, it gives `(x-5$)^2$`.
        src = src.replace(/\$([^$\n]+)\$([ \t]*[-+=<>*/()]?[ \t]*[0-9]+)\b/g, '$$$1$2$$');
        src = src.replace(/\$([^$\n]+)\$([ \t]*[-+=<>*/()]+[ \t]*)(?=[a-zA-Z\s,.]|$)/g, (m, p1, p2) => {
             if (p2.match(/^[ \t.,]+$/)) return m;
             return `$$${p1}${p2}$$`;
        });

        // Leftwards: e.g. `Persamaan (x-` ...
        src = src.replace(/\b([0-9]+[ \t]*[-+=<>*/()]+[ \t]*)\$([^$\n]+)\$/g, '$$$1$2$$');
        src = src.replace(/(?<=^|[a-zA-Z\s,.])([ \t]*[-+=<>*/()]+[ \t]*)\$([^$\n]+)\$/g, (m, p1, p2) => {
             if (p1.match(/^[ \t.,]+$/)) return m;
             return `$$${p1}${p2}$$`;
        });
        changed = old !== src;
    }

    return src;
}

console.log(fixSourceWrap("Persamaan $(x-5)^2$ = 0"));
console.log(fixSourceWrap("Luas = 150.72 c$m^2$"));
