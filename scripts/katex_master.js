/**
 * SYNTHESIS — KaTeX Converter v6 FINAL
 * =============================================
 * Direct source-text processing — no decode/encode pipeline.
 * Phase 1: Unicode → \\LaTeX source notation
 * Phase 2: Fix invalid single-backslash \cmd → \\cmd
 * Phase 3: Wrap \\cmd atoms in $...$  (only strings with LaTeX)
 * Phase 4: Wrap fraction options
 * 
 * Run: node scripts/katex_master.js
 */

'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const MATH_SUBJECTS = [
    'questions_tkd_matdas.js',
    'b2_tkd_matdas.js',
    'b4_matdas_1.js','b4_matdas_2.js','b4_matdas_3.js',
    'b5_matdas_1.js','b5_matdas_2.js',
    'b6_matdas_a.js','b6_matdas_b.js',
    'b7_matdas_1.js','b7_matdas_2.js',
    'b8_matdas_1.js','b8_matdas_2.js',
    'b9_matdas_1.js','b9_matdas_2.js',
    'b10_matdas_1.js','b10_matdas_2.js',
    'b11_matdas.js','b13_matdas.js','b14_matdas.js','b16_matdas.js',
    'questions_saintek_matipa.js','b2_saintek_matipa.js','b28_saintek_matipa_200.js',
    'questions_saintek_fisika.js','b2_saintek_fisika.js','b29_saintek_fisika_200.js',
    'questions_saintek_kimia.js','b2_saintek_kimia.js','b30_saintek_kimia_200.js',
    'questions_tps_numerik.js','b2_tps_numerik.js','b3_tps_numerik.js',
    'b4_tps_numerik.js','b23_tps_numerik_200.js',
    'questions_tps_logika.js','b2_tps_logika.js','b3_tps_logika.js','b24_tps_logika_200.js',
    'b4_all_subjects.js','b5_all_subjects.js','b6_all_subjects.js',
    'b7_all_subjects.js','b8_all_subjects.js','b10_all_subjects.js',
    'b20_allsubjects.js','b21_last.js',
    'b12_final.js','b15_final.js','b17_final.js','b18_endgame.js','b19_closing.js',
    'b36_saintek_supplement.js','b37_soshum_tps_supplement.js',
    'questions_saintek_biologi.js','b2_saintek_biologi.js','b31_saintek_biologi_200.js',
    'exp_abs_saintek.js','exp_final_saintek.js','exp_last_saintek.js',
    'exp_saintek_1.js','exp_saintek_2.js','exp_saintek_3.js','exp_saintek_final.js',
];

// ─ Phase 1: Unicode → \\LaTeX notation in source file ─────────
function unicodeToLatex(src) {
    // We output \\cmd (double backslash) which is the correct JS source for \cmd at runtime
    const MAP = [
        [/√/g,'\\\\sqrt'],[/∑/g,'\\\\sum'],[/∫/g,'\\\\int'],[/∞/g,'\\\\infty'],
        [/α/g,'\\\\alpha'],[/β/g,'\\\\beta'],[/γ/g,'\\\\gamma'],[/δ/g,'\\\\delta'],
        [/ε/g,'\\\\epsilon'],[/θ/g,'\\\\theta'],[/λ/g,'\\\\lambda'],[/μ/g,'\\\\mu'],
        [/π/g,'\\\\pi'],[/ρ/g,'\\\\rho'],[/σ/g,'\\\\sigma'],[/φ/g,'\\\\phi'],
        [/ω/g,'\\\\omega'],[/Δ/g,'\\\\Delta'],[/Σ/g,'\\\\Sigma'],[/Ω/g,'\\\\Omega'],
        [/≤/g,'\\\\leq'],[/≥/g,'\\\\geq'],[/≠/g,'\\\\neq'],[/≈/g,'\\\\approx'],
        [/→/g,'\\\\to'],[/⇒/g,'\\\\Rightarrow'],[/⇔/g,'\\\\Leftrightarrow'],
        [/∘/g,'\\\\circ'],[/±/g,'\\\\pm'],[/×/g,'\\\\times'],[/÷/g,'\\\\div'],
        [/·/g,'\\\\cdot'],
        [/²/g,'^2'],[/³/g,'^3'],[/⁴/g,'^4'],[/⁵/g,'^5'],
        [/⁶/g,'^6'],[/⁷/g,'^7'],[/⁸/g,'^8'],[/⁹/g,'^9'],
        [/₀/g,'_0'],[/₁/g,'_1'],[/₂/g,'_2'],[/₃/g,'_3'],
        [/₄/g,'_4'],[/₅/g,'_5'],[/₆/g,'_6'],[/₇/g,'_7'],[/₈/g,'_8'],[/₉/g,'_9'],
        [/∈/g,'\\\\in'],[/∉/g,'\\\\notin'],[/∩/g,'\\\\cap'],[/∪/g,'\\\\cup'],
        [/∅/g,'\\\\emptyset'],[/⊂/g,'\\\\subset'],[/⊆/g,'\\\\subseteq'],
        [/∀/g,'\\\\forall'],[/∃/g,'\\\\exists'],
        [/⌊/g,'\\\\lfloor'],[/⌋/g,'\\\\rfloor'],[/⌈/g,'\\\\lceil'],[/⌉/g,'\\\\rceil'],
        [/ℝ/g,'\\\\mathbb{R}'],[/ℤ/g,'\\\\mathbb{Z}'],[/ℕ/g,'\\\\mathbb{N}'],[/ℚ/g,'\\\\mathbb{Q}'],
        [/−/g,'-'],[/…/g,'\\\\ldots'],[/°/g,'^\\\\circ'],
    ];
    for (const [pat, rep] of MAP) src = src.replace(pat, rep);
    return src;
}

// ─ Phase 2: Fix single-backslash LaTeX at char level ──────────
// In committed files, \sqrt \log etc appear with SINGLE \ (invalid JS).
// At runtime JS drops the unknown escape → 'sqrt' without backslash.
// Here we repair: \cmd → \\cmd inside string literals.
const KNOWN_LATEX = new Set([
    'sqrt','log','lim','frac','sin','cos','tan','cot','sec','csc',
    'arcsin','arccos','arctan','sinh','cosh','tanh','exp','ln',
    'pi','alpha','beta','gamma','delta','epsilon','theta','lambda',
    'mu','sigma','phi','omega','Delta','Sigma','Omega','infty',
    'cdot','circ','pm','mp','times','div','leq','geq','neq','approx',
    'to','Rightarrow','Leftrightarrow','in','notin','cap','cup',
    'emptyset','subset','subseteq','forall','exists',
    'lfloor','rfloor','lceil','rceil','mathbb','text',
    'sum','int','prod','ldots','vec','hat','bar','overline','underline',
    'binom','left','right','frac','partial','nabla',
]);

function fixSingleBackslashLatex(src) {
    let result = '';
    let i = 0;
    const n = src.length;
    while (i < n) {
        // Skip single-line comments
        if (src[i] === '/' && src[i+1] === '/') {
            let j = i; while (j < n && src[j] !== '\n') j++;
            result += src.slice(i, j); i = j; continue;
        }
        // Skip multi-line comments
        if (src[i] === '/' && src[i+1] === '*') {
            let j = i + 2;
            while (j < n-1 && !(src[j] === '*' && src[j+1] === '/')) j++;
            j += 2; result += src.slice(i, j); i = j; continue;
        }
        // String literal
        if (src[i] === '"' || src[i] === "'") {
            const q = src[i]; let j = i + 1; let content = '';
            while (j < n) {
                if (src[j] === '\\') {
                    const next = src[j+1] || '';
                    if (/[a-zA-Z]/.test(next)) {
                        // Potentially invalid JS escape (lone \cmd)
                        let cmdEnd = j + 1;
                        while (cmdEnd < n && /[a-zA-Z]/.test(src[cmdEnd])) cmdEnd++;
                        const fullLetters = src.slice(j+1, cmdEnd);

                        // Find longest known prefix
                        let matchedLen = 0;
                        for (let k = fullLetters.length; k >= 1; k--) {
                            if (KNOWN_LATEX.has(fullLetters.slice(0, k))) {
                                matchedLen = k;
                                break;
                            }
                        }

                        if (matchedLen > 0) {
                            // Fix it: \cmd → \\cmd in source
                            const cmd = fullLetters.slice(0, matchedLen);
                            content += '\\\\' + cmd; j = j + 1 + matchedLen;
                        } else if (/[ntr\\'"0bfvux]/.test(next)) {
                            // Valid JS escape — copy as-is
                            content += src[j] + next; j += 2;
                        } else {
                            content += src[j] + next; j += 2;
                        }
                    } else if (/[ntr\\'"0bfvux]/.test(next)) {
                        // Valid JS escape — copy as-is
                        content += src[j] + next; j += 2;
                    } else {
                        content += src[j] + next; j += 2;
                    }
                } else if (src[j] === q) { j++; break; }
                else { content += src[j]; j++; }
            }
            result += q + content + q; i = j; continue;
        }
        result += src[i]; i++;
    }
    return result;
}

// ─ Helper: read balanced {…} or (…) from raw token array ──────
function readBracedArg(raw, startI, open, close, out) {
    let i = startI;
    if (raw[i] !== open) return i;
    out.push(open); i++;
    let depth = 1;
    while (i < raw.length && depth > 0) {
        if (raw[i] === open) { depth++; out.push(raw[i]); i++; }
        else if (raw[i] === close) {
            depth--;
            if (depth === 0) { out.push(close); i++; break; }
            out.push(raw[i]); i++;
        } else {
            out.push(raw[i]); i++;
        }
    }
    return i;
}

// ─ Phase 3: Wrap atoms in $…$ ─────────────────────────────────
function wrapAtomsInSource(src) {
    let result = '';
    let i = 0;
    const n = src.length;
    while (i < n) {
        // Skip comments
        if (src[i] === '/' && src[i+1] === '/') {
            let j = i; while (j < n && src[j] !== '\n') j++;
            result += src.slice(i, j); i = j; continue;
        }
        if (src[i] === '/' && src[i+1] === '*') {
            let j = i + 2;
            while (j < n-1 && !(src[j] === '*' && src[j+1] === '/')) j++;
            j += 2; result += src.slice(i, j); i = j; continue;
        }
        // String literal
        if (src[i] === '"' || src[i] === "'") {
            const q = src[i]; let j = i + 1;
            let raw = [];
            while (j < n) {
                if (src[j] === '\\') { raw.push(src.slice(j, j+2)); j += 2; }
                else if (src[j] === q) { j++; break; }
                else { raw.push(src[j]); j++; }
            }
            const rawStr = raw.join('');
            // Skip strings that already have $ or have no LaTeX/math
            const hasDollar = rawStr.includes('$');
            const hasLatexCmd = rawStr.includes('\\\\'); // double-backslash = valid LaTeX
            const hasBracedExp = /[a-zA-Z0-9]\^{|[a-zA-Z0-9]_\{/.test(rawStr);
            if (!hasDollar && (hasLatexCmd || hasBracedExp)) {
                result += q + wrapRawTokens(raw) + q;
            } else {
                result += q + rawStr + q;
            }
            i = j; continue;
        }
        result += src[i]; i++;
    }
    return result;
}

function wrapRawTokens(raw) {
    const out = [];
    let i = 0;
    const n = raw.length;
    while (i < n) {
        const tok = raw[i];
        // LaTeX command: '\\\\' followed by letters
        if (tok === '\\\\' && i+1 < n && raw[i+1] && /[a-zA-Z]/.test(raw[i+1][0])) {
            // Read all consecutive letters
            let j = i + 1;
            let letters = '';
            while (j < n && raw[j] && raw[j].length === 1 && /[a-zA-Z]/.test(raw[j])) {
                letters += raw[j]; j++;
            }
            // Find the LONGEST prefix of letters that is a recognized LaTeX command
            let cmdLen = 0;
            for (let k = letters.length; k >= 1; k--) {
                if (KNOWN_LATEX.has(letters.slice(0, k))) { cmdLen = k; break; }
            }
            if (cmdLen === 0) {
                // Not a recognized command — treat as single-letter cmd
                cmdLen = 1;
            }
            const cmd = letters.slice(0, cmdLen);
            const atomToks = ['\\\\', ...cmd.split('')];
            i = i + 1 + cmdLen; // skip past '\\\\' and cmd letters
            // Put remaining letters back (non-consumed) to out
            const remainder = letters.slice(cmdLen);
            // Read trailing mods (subscript, superscript, {args})
            i = readAtomMods(raw, atomToks, i);
            out.push('$' + atomToks.join('') + '$');
            // Emit any remainder letters without wrapping
            if (remainder) {
                out.push(remainder);
                i = Math.max(i, j); // Advance past the remainder in raw
            }
            continue;
        }
        // Exponent/subscript with braces: x^{n}, x_{n}
        // OR bare numeric exponent: x^2, x^{-1}
        // Do NOT wrap bare x_letter (to keep identifiers like tkd_matdas intact)
        if (/[a-zA-Z0-9]/.test(tok) && i+1 < n && (raw[i+1] === '^' || raw[i+1] === '_')) {
            const base = tok, mod = raw[i+1];
            let j = i + 2;
            let atom = [base, mod];
            let matched = false;
            if (j < n && raw[j] === '{') {
                // Brace-delimited: x^{...} or x_{...}
                j = readBracedArg(raw, j, '{', '}', atom);
                matched = true;
            } else if (mod === '^' && j < n && raw[j] && /[0-9]/.test(raw[j][0])) {
                // x^digit
                atom.push(raw[j]); j++; matched = true;
            } else if (mod === '^' && j < n && raw[j] === '-' && j+1 < n && /[0-9]/.test((raw[j+1]||'')[0])) {
                // x^-digit
                atom.push('{', raw[j], raw[j+1], '}'); j += 2; matched = true;
            }
            if (matched) {
                out.push('$' + atom.join('') + '$');
                i = j; continue;
            }
        }
        out.push(tok); i++;
    }
    return out.join('');
}

function readAtomMods(raw, atomToks, startI) {
    let i = startI;
    const n = raw.length;
    let again = true;
    while (again) {
        again = false;
        if (i < n && raw[i] === '_') {
            i++;
            if (i < n && raw[i] === '{') {
                atomToks.push('_');
                i = readBracedArg(raw, i, '{', '}', atomToks);
                again = true;
            } else if (i < n && raw[i] && /[a-zA-Z0-9]/.test(raw[i][0])) {
                atomToks.push('_', raw[i]); i++; again = true;
            } else { i--; }
        }
        if (i < n && raw[i] === '^') {
            i++;
            if (i < n && raw[i] === '{') {
                atomToks.push('^');
                i = readBracedArg(raw, i, '{', '}', atomToks);
                again = true;
            } else if (i < n && raw[i] === '-' && i+1 < n && /[0-9]/.test((raw[i+1]||'')[0])) {
                atomToks.push('^{', raw[i], raw[i+1], '}'); i += 2; again = true;
            } else if (i < n && raw[i] && /[a-zA-Z0-9]/.test(raw[i][0])) {
                atomToks.push('^', raw[i]); i++; again = true;
            } else { i--; }
        }
        if (i < n && raw[i] === '{') {
            i = readBracedArg(raw, i, '{', '}', atomToks);
            again = true;
        }
        if (i < n && raw[i] === '(') {
            i = readBracedArg(raw, i, '(', ')', atomToks);
            again = true;
        }
    }
    return i;
}

// ─ Phase 4: Wrap fraction options ─────────────────────────────
function wrapFractionOptions(src) {
    return src.replace(/options\s*:\s*\[((?:"[^"]*"|'[^']*'|[^[\]])*)\]/g, (full, inner) => {
        const wrapped = inner.replace(/"(-?\d+)\/(\d+)"/g, (_, num, den) =>
            `"$\\\\frac{${num}}{${den}}$"`);
        return `options: [${wrapped}]`;
    });
}

// ─ Phase 5: ASCII fixups ──────────────────────────────────────
function asciiFixups(src) {
    // Convert \\sqrt(expr) → \\sqrt{expr}  [already-doubled from unicode conversion or fixSingleBackslash]
    src = src.replace(/\\\\sqrt\(([^)\n]+)\)/g, '\\\\sqrt{$1}');
    // Convert bare sqrt(expr) → \\sqrt{expr}  [not yet converted]
    src = src.replace(/\bsqrt\(([^)\n]+)\)/g, '\\\\sqrt{$1}');
    // Multi-digit bare exponents
    src = src.replace(/\^(\d{2,})/g, '^{$1}');
    src = src.replace(/\^(-\d)\b/g, '^{$1}');
    return src;
}

// ─ Main pipeline ──────────────────────────────────────────────
function processFile(src) {
    src = unicodeToLatex(src);
    src = fixSingleBackslashLatex(src);
    src = asciiFixups(src);
    src = wrapAtomsInSource(src);
    src = wrapFractionOptions(src);
    return src;
}

// ─ Runner ─────────────────────────────────────────────────────
console.log('SYNTHESIS KaTeX Converter v6-FINAL\n' + '═'.repeat(50));
let totalFiles = 0, totalLines = 0;
for (const file of MATH_SUBJECTS) {
    const fp = path.join(ROOT, file);
    if (!fs.existsSync(fp)) { console.log(`  SKIP: ${file}`); continue; }
    const original = fs.readFileSync(fp, 'utf8');
    const dollarsBefore = (original.match(/\$/g)||[]).length;
    const converted = processFile(original);
    const dollarsAfter = (converted.match(/\$/g)||[]).length;
    if (converted !== original) {
        const l1 = original.split('\n'), l2 = converted.split('\n');
        let changed = 0;
        for (let k = 0; k < Math.max(l1.length, l2.length); k++) {
            if (l1[k] !== l2[k]) changed++;
        }
        totalLines += changed; totalFiles++;
        fs.writeFileSync(fp, converted, 'utf8');
        console.log(`  ✓ ${file}: $${dollarsBefore}→${dollarsAfter}`);
    } else {
        console.log(`  — ${file}: no changes`);
    }
}
console.log(`\n${'═'.repeat(50)}`);
console.log(`Done: ${totalFiles} files, ${totalLines} lines changed.`);
