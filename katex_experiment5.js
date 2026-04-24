const fs = require('fs');

// We have 3 goals:
// 1. Group math blocks: $x^2$ + $y^2$ -> $x^2 + y^2$
// 2. Expand over parens/equals: Persamaan (x-$5)^2$ = 0 -> Persamaan $(x-5)^2 = 0$
// 3. Fix the `c$m^2$` issue: 150.72 c$m^2$ -> 150.72 cm$^2$ or something. Wait, "cm^2" shouldn't be wrapped with the "c" because "cm" is a unit.
// Oh, the reviewer said `cm^2` should be formatted. Usually units are formatted as `\text{cm}^2` or just left as `cm^2` but if we wrap it, it should probably be `\text{cm}^2` or just `cm^2` as raw text. Actually, KaTeX renders `cm^2` as $cm^2$ nicely. So if we wrap `cm^2` it becomes $cm^2$.

// What if we just revert to the user's suggestion of a regex for app.js but we make it BETTER?
// The reviewer complained that "Attempting to parse complex mathematical notation with limited regex is a known anti-pattern and results in the disjointed UI seen in the screenshots... A better approach would be to properly support full equation matching or rely on explicit math delimiters (e.g., $...$) in the source data."
// So the reviewer explicitly wants me to "rely on explicit math delimiters in the source data"!

// This means I MUST process the source files.

function fixSourceFile(content) {
    let changed = true;
    while(changed) {
        let old = content;
        content = content.replace(/\$([^$\n]+)\$([ \t]*[-+*/=<>(),0-9]+[ \t]*)\$([^$\n]+)\$/g, '$$$1$2$3$$');
        changed = old !== content;
    }

    changed = true;
    while (changed) {
        let old = content;
        content = content.replace(/\$([^$\n]+)\$([ \t]*[-+=<>*/()]?[ \t]*[0-9]+)\b/g, '$$$1$2$$');
        content = content.replace(/\$([^$\n]+)\$([ \t]*[-+=<>*/()]+[ \t]*)(?=[a-zA-Z\s,.]|$)/g, (m, p1, p2) => {
             if (p2.match(/^[ \t.,]+$/)) return m;
             return `$$${p1}${p2}$$`;
        });

        content = content.replace(/\b([0-9]+[ \t]*[-+=<>*/()]+[ \t]*)\$([^$\n]+)\$/g, '$$$1$2$$');
        content = content.replace(/(?<=^|[^a-zA-Z0-9$])([ \t]*[-+=<>*/()]+[ \t]*)\$([^$\n]+)\$/g, (m, p1, p2) => {
             if (p1.match(/^[ \t.,]+$/)) return m;
             return `$$${p1}${p2}$$`;
        });
        changed = old !== content;
    }

    // Fix c$m^2$ to cm$^2$ or $cm^2$?
    content = content.replace(/([a-zA-Z]+)\$([^$\n]+)\$/g, (m, p1, p2) => {
        // e.g. "c$m^2$" -> "$cm^2$"
        return `$$${p1}${p2}$$`;
    });

    return content;
}

const inputs = [
    "Jika $x^2$ + $y^2$ = 25 dan $\\int_{0}^{1}$ $x$ dx, maka $\\log_2(x-3)$ = 5.",
    "Luas = 150.72 c$m^2$",
    "Nilai dari (x-5$)^2$ adalah",
    "Persamaan (x-5$)^2$ = 0",
    "f(x) = $x_1$ + $y_2$",
    "f(x) = $2^{x+1}$ dan g(x) = $\\log_{2}(x - 3)$, maka nilai dari (f $\\circ$ g)(19) adalah $\\ldots$"
];

for (let s of inputs) {
    console.log(fixSourceFile(s));
}
