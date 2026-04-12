/**
 * SYNTHESIS — KaTeX $-Wrapper v3
 * Phase 2: Takes files already processed by v2 (latex commands present)
 * and wraps math expressions in $...$ for KaTeX rendering.
 *
 * Run: node scripts/katex_wrap.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const TARGET_FILES = [
    'questions_tkd_matdas.js',
    'b11_matdas.js',
    'b13_matdas.js',
    'b2_tkd_matdas.js',
    'b2_saintek_matipa.js',
    'b28_saintek_matipa_200.js',
    'questions_saintek_matipa.js',
];

/**
 * Wrap math expressions in $...$ within a JS string value.
 *
 * Approach: segment text into math and prose parts.
 * A "math segment" is a contiguous run containing math tokens.
 * We then wrap those segments with $.
 *
 * Math indicators (things that mark a run as math):
 * - \keyword (backslash-command)
 * - x^n, x_n
 * - Bare variable followed by operator: x + y, a - b, etc.
 * - Numbers in mathematical context
 * - f(x), g(x)
 */
function wrapMathInText(text) {
    // We'll use a token-based approach.
    // Split text by newlines first, process each line independently.
    return text.split('\n').map(line => wrapMathInLine(line)).join('\n');
}

function wrapMathInLine(line) {
    // Strategy: find all contiguous "math regions" and wrap them.
    // A math region is triggered by:
    //   1. A backslash command \cmd
    //   2. An expression with ^, _, math operators
    //   3. f(x), g(x), etc.
    //   4. Patterns like "2x", "3y", "ax²"

    // Quick check: does this line contain anything math-like?
    if (!hasMathContent(line)) return line;

    // We'll do targeted replacements for specific patterns.
    // This is safer than trying to parse the whole line.
    let s = line;

    // ── Pattern 1: \cmd{...} or \cmd expressions — wrap surrounding expression ──
    // Examples: \sqrt{75}, \log_{2}(x), \frac{a}{b}, \pi, \alpha
    // Find runs that contain \cmd and adjacent math
    s = wrapBackslashExpressions(s);

    // ── Pattern 2: Expressions like x^2, x^{n}, 2^n ──
    s = wrapExponentExpressions(s);

    // ── Pattern 3: f(x), g(x), f(expr) ──
    // Already partially handled

    return s;
}

/**
 * Does this line contain mathematical content worth wrapping?
 */
function hasMathContent(line) {
    return /\\[a-zA-Z]/.test(line) ||      // backslash command
           /\^[{0-9a-zA-Z]/.test(line) ||   // superscript
           /_[{0-9a-zA-Z]/.test(line) ||    // subscript
           /\\infty|\\pi|\\alpha|\\beta|\\theta/.test(line) ||
           /\\sqrt|\\log|\\lim|\\sin|\\cos|\\tan|\\frac/.test(line);
}

/**
 * Wrap expressions containing backslash commands.
 * Strategy: find a "math island" — a contiguous sequence that starts/ends
 * with a math token, and wrap it in $...$
 *
 * We identify math islands by walking char by char.
 */
function wrapBackslashExpressions(line) {
    // If already has $ delimiters (from adv_calculus etc), skip
    if (line.includes('$')) return line;

    // Find positions of backslash commands
    const positions = [];
    const re = /\\([a-zA-Z]+)\s*(?:\{[^}]*\}|\([^)]*\))?/g;
    let m;
    while ((m = re.exec(line)) !== null) {
        positions.push({ start: m.index, end: m.index + m[0].length });
    }

    if (positions.length === 0) return line;

    // Expand each position to its full math expression
    // by greedily including adjacent math chars
    const mathChars = /[0-9a-zA-Z\s\+\-\*\/\^\{\}\(\)\[\]_\.\,\|\\]/;
    const regions = [];

    for (const pos of positions) {
        // Walk left to expand
        let start = pos.start;
        while (start > 0 && mathChars.test(line[start - 1])) {
            // Don't cross Indonesian words or punctuation boundaries
            const prevChar = line[start - 1];
            if (/[a-zA-Z]/.test(prevChar)) {
                // Check if this is a word boundary (prose word, not math var)
                // If preceded by a space and is a long word, stop
                break;
            }
            start--;
        }

        // Walk right to expand
        let end = pos.end;
        while (end < line.length && mathChars.test(line[end])) {
            end++;
        }

        regions.push({ start, end });
    }

    // Merge overlapping regions
    const merged = [];
    for (const reg of regions.sort((a, b) => a.start - b.start)) {
        if (merged.length === 0 || reg.start > merged[merged.length-1].end + 2) {
            merged.push({ ...reg });
        } else {
            merged[merged.length-1].end = Math.max(merged[merged.length-1].end, reg.end);
        }
    }

    // Build result by inserting $ markers
    let result = '';
    let pos = 0;
    for (const reg of merged) {
        result += line.slice(pos, reg.start);
        const expr = line.slice(reg.start, reg.end).trim();
        if (expr) {
            result += `$${expr}$`;
        }
        pos = reg.end;
    }
    result += line.slice(pos);

    return result;
}

function wrapExponentExpressions(line) {
    if (line.includes('$')) return line;

    // Wrap things like 2^n, x^{n}, a^(n), x_1, x_{n}
    let s = line;
    s = s.replace(/([a-zA-Z0-9])\^(\{[^}]+\}|[0-9a-zA-Z])/g, (m) => `$${m}$`);
    s = s.replace(/([a-zA-Z])\{[0-9]+\}/g, (m) => `$${m}$`); // subscript-like
    return s;
}

/**
 * Process raw JS source file — apply $ wrapping to string literal contents.
 */
function processSource(src) {
    // Match JS string literals and apply wrapMathInText to the inner content.
    // We handle both " and ' strings, with escape awareness.
    return src.replace(/"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'/g, (match, dq, sq) => {
        const inner = dq !== undefined ? dq : sq;
        const quote = dq !== undefined ? '"' : "'";

        // Skip strings that are clearly not question content
        // (e.g., function names, class names, keys)
        if (inner.length < 3) return match;
        if (/^[a-z_]+$/.test(inner)) return match; // pure identifier

        const transformed = wrapMathInText(inner);
        if (transformed !== inner) {
            return quote + transformed + quote;
        }
        return match;
    });
}

// ─── Main ───
console.log('SYNTHESIS KaTeX Dollar-Wrapper v3\n' + '='.repeat(50));

let totalChanged = 0;

for (const file of TARGET_FILES) {
    const filepath = path.join(ROOT, file);
    if (!fs.existsSync(filepath)) {
        console.log(`SKIP: ${file} (not found)`);
        continue;
    }

    process.stdout.write(`Processing ${file}... `);

    const original = fs.readFileSync(filepath, 'utf8');
    const converted = processSource(original);

    if (converted !== original) {
        fs.writeFileSync(filepath, converted, 'utf8');

        let changes = 0;
        const lines1 = original.split('\n');
        const lines2 = converted.split('\n');
        for (let i = 0; i < lines1.length; i++) {
            if (lines1[i] !== (lines2[i] || '')) changes++;
        }
        totalChanged += changes;
        console.log(`✓ ${changes} lines updated`);
    } else {
        console.log(`— No changes`);
    }
}

console.log(`\nTotal lines updated: ${totalChanged}`);
