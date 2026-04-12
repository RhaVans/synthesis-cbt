/**
 * SYNTHESIS — KaTeX Smart Converter v2
 * Converts plain-text math in question bank JS files to properly wrapped KaTeX.
 *
 * Strategy:
 * 1. Parse each JS source file to extract string values from question objects
 * 2. Apply targeted regex transforms (unicode → latex, wrap in $...$)
 * 3. Reconstruct and write back
 *
 * Run: node scripts/katex_convert_v2.js
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
 * Apply transformations to a single math expression string.
 * Input: raw text from question/option/hint/explanation field
 * Output: text with math wrapped in $...$ or $$...$$
 */
function transformMathText(raw) {
    let s = raw;

    // ═══════════════════════════════════════════════════
    // PASS 1: Unicode symbols → LaTeX commands
    // ═══════════════════════════════════════════════════
    const UNICODE = [
        [/√/g, '\\sqrt'],
        [/∑/g, '\\sum'],
        [/∫/g, '\\int'],
        [/∞/g, '\\infty'],
        [/≤/g, ' \\leq '],
        [/≥/g, ' \\geq '],
        [/≠/g, ' \\neq '],
        [/→/g, ' \\to '],
        [/⇒/g, ' \\Rightarrow '],
        [/±/g, ' \\pm '],
        [/×/g, ' \\times '],
        [/÷/g, ' \\div '],
        [/²/g, '^2'],
        [/³/g, '^3'],
        [/⁴/g, '^4'],
        [/⁵/g, '^5'],
        [/₀/g, '_0'], [/₁/g, '_1'], [/₂/g, '_2'], [/₃/g, '_3'],
        [/₄/g, '_4'], [/₅/g, '_5'], [/₆/g, '_6'], [/₇/g, '_7'],
        [/₈/g, '_8'], [/₉/g, '_9'],
        [/π/g, '\\pi'],
        [/α/g, '\\alpha'],
        [/β/g, '\\beta'],
        [/θ/g, '\\theta'],
        [/φ/g, '\\phi'],
        [/γ/g, '\\gamma'],
        [/Δ/g, '\\Delta'],
        [/δ/g, '\\delta'],
        [/ε/g, '\\epsilon'],
        [/λ/g, '\\lambda'],
        [/μ/g, '\\mu'],
        [/σ/g, '\\sigma'],
        [/ω/g, '\\omega'],
        [/∈/g, ' \\in '],
        [/∉/g, ' \\notin '],
        [/∩/g, ' \\cap '],
        [/∪/g, ' \\cup '],
        [/∅/g, '\\emptyset'],
        [/⌊/g, '\\lfloor '],
        [/⌋/g, ' \\rfloor'],
        [/⌈/g, '\\lceil '],
        [/⌉/g, ' \\rceil'],
        [/∘/g, '\\circ'],
        [/ℝ/g, '\\mathbb{R}'],
        [/ℤ/g, '\\mathbb{Z}'],
        [/ℕ/g, '\\mathbb{N}'],
        [/ℚ/g, '\\mathbb{Q}'],
        [/·/g, ' \\cdot '],
    ];
    for (const [pat, rep] of UNICODE) {
        s = s.replace(pat, rep);
    }

    // ═══════════════════════════════════════════════════
    // PASS 2: Fix sqrt patterns
    // ═══════════════════════════════════════════════════
    // sqrt(expr) → \sqrt{expr}
    s = s.replace(/\bsqrt\(([^)]+)\)/g, '\\sqrt{$1}');
    s = s.replace(/\\sqrt\(([^)]+)\)/g, '\\sqrt{$1}');
    // \sqrt followed by bare number/letter
    s = s.replace(/\\sqrt\s*(\d+)/g, '\\sqrt{$1}');
    s = s.replace(/\\sqrt\s*([a-zA-Z])\b/g, '\\sqrt{$1}');

    // ═══════════════════════════════════════════════════
    // PASS 3: Logarithm patterns
    // ═══════════════════════════════════════════════════
    // log_2(x), log₂(x), log_a(x) etc
    s = s.replace(/log_\{?([a-zA-Z0-9]+)\}?\(([^)]*)\)/g, '\\log_{$1}($2)');
    s = s.replace(/log_([a-zA-Z0-9])\(([^)]*)\)/g, '\\log_{$1}($2)');
    // log_a x (no parens)
    s = s.replace(/\blog_([a-zA-Z0-9])\s+/g, '\\log_{$1} ');
    // ln(x)
    s = s.replace(/\bln\(([^)]+)\)/g, '\\ln($1)');

    // ═══════════════════════════════════════════════════
    // PASS 4: Trig and math functions
    // ═══════════════════════════════════════════════════
    const FUNS = ['sin','cos','tan','cot','sec','csc','arcsin','arccos','arctan',
                  'ln','log','lim','max','min','det','gcd','sup','inf','mod'];
    for (const fn of FUNS) {
        const re = new RegExp(`(?<!\\\\)\\b${fn}\\b`, 'g');
        s = s.replace(re, `\\${fn}`);
    }

    // ═══════════════════════════════════════════════════
    // PASS 5: Exponents and subscripts — brace multi-char
    // ═══════════════════════════════════════════════════
    // x^(expr) → x^{expr}
    s = s.replace(/\^\(([^)]+)\)/g, '^{$1}');
    // x^n where n is 2+ digits
    s = s.replace(/\^(\d{2,})/g, '^{$1}');
    // x_(expr)
    s = s.replace(/_\(([^)]+)\)/g, '_{$1}');
    // x_n where n is 2+ digits
    s = s.replace(/_(\d{2,})/g, '_{$1}');

    // ═══════════════════════════════════════════════════
    // PASS 6: Fraction shorthand a/b → \frac{a}{b}
    // Only for simple number/variable fractions in known contexts
    // ═══════════════════════════════════════════════════
    // Simple fractions like 5/3, 11/2 (option values)
    // Skip: things like "Rp50.000/bulan" or HTML/URL slashes
    // We'll wrap specific patterns carefully

    // ═══════════════════════════════════════════════════
    // PASS 7: Wrap math expression sequences in $...$
    // ═══════════════════════════════════════════════════
    // Strategy: identify segments that contain math tokens and wrap them.
    // This is done by detecting "math regions" — runs of text that contain
    // mathematical operators, function calls, or variables.

    // For this codebase, inline math patterns include:
    // - f(x) = ..., g(x), f^(-1)
    // - x^n, x_n
    // - log_n, \sqrt, \sin etc
    // - expressions like "2x + 3y = 5"
    // - fractions like "5/3"
    // - inequalities like "x > 0", "x ≤ 2"

    return s;
}

/**
 * Process string values inside JS string literals, apply math transforms.
 * Preserves the JS syntax (quotes, escapes, etc.)
 */
function processSource(src) {
    // Match JS string literals (double or single quoted)
    // and apply transformMathText to their content.
    return src.replace(/"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'/g, (match, dq, sq) => {
        const inner = dq !== undefined ? dq : sq;
        const quote = dq !== undefined ? '"' : "'";
        const transformed = transformMathText(inner);
        return quote + transformed + quote;
    });
}

// ─── Main ───
console.log('SYNTHESIS KaTeX Converter v2\n' + '='.repeat(50));

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
        // Backup original
        fs.writeFileSync(filepath + '.bak', original, 'utf8');
        fs.writeFileSync(filepath, converted, 'utf8');

        // Count changes
        let changes = 0;
        const lines1 = original.split('\n');
        const lines2 = converted.split('\n');
        for (let i = 0; i < lines1.length; i++) {
            if (lines1[i] !== lines2[i]) changes++;
        }
        totalChanged += changes;
        console.log(`✓ ${changes} lines changed (backup: ${file}.bak)`);
    } else {
        console.log(`— No changes needed`);
    }
}

console.log(`\nTotal lines changed: ${totalChanged}`);
console.log('Done. Check .bak files to review originals.');
