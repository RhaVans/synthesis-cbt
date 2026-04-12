/**
 * fix_longest_answer_pattern.js
 * 
 * Equalizes answer option lengths across ALL 5500 questions to remove the
 * pattern where the longest answer is the correct one.
 * 
 * Approach:
 * 1. Parse each question file with regex to extract each question block
 * 2. For each question, identify the options array and the correct answer index
 * 3. Measure display lengths of all options
 * 4. Pad shorter WRONG options by adding parenthetical context/qualifiers
 * 5. Write modified files back
 * 
 * The padding is done by appending phrases in parentheses to the wrong answers
 * that are significantly shorter than the correct answer, making all options
 * appear roughly equal in length.
 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

// ─── Collect all .js question files (exclude non-question files) ──────────────
const skipFiles = new Set(['app.js']);
const allJsFiles = fs.readdirSync(root).filter(f =>
  f.endsWith('.js') &&
  !f.endsWith('.bak') &&
  !skipFiles.has(f) &&
  !f.startsWith('.')
);

// ─── Helper: display length ignoring LaTeX ────────────────────────────────────
function displayLen(s) {
  return s
    .replace(/\$[^$]*\$/g, 'XX')        // replace $...$ with XX
    .replace(/\\\\[a-zA-Z]+/g, '')        // remove \command
    .replace(/[\\${}^_]/g, '')            // remove escape chars
    .replace(/\s+/g, ' ')                // normalize whitespace
    .trim()
    .length;
}

// ─── Filler phrases (natural-sounding Indonesian academic qualifiers) ─────────
const fillerPhrases = [
  'dalam konteks umum',
  'secara konvensional',
  'menurut definisi standar',
  'berdasarkan teori dasar',
  'dalam pengertian luas',
  'secara terminologis',
  'menurut konsensus ilmiah',
  'dari perspektif akademis',
  'dalam literatur standar',
  'sesuai teori klasik',
  'secara fundamental',
  'menurut prinsip dasar',
  'dalam kerangka teori',
  'berdasarkan referensi umum',
  'pada konteks konvensional',
  'menurut pengertian baku',
  'secara konseptual',
  'dalam definisi teknis',
  'berdasarkan acuan formal',
  'dalam arti sempit',
  'sesuai klasifikasi umum',
  'menurut pandangan mainstream',
  'berdasarkan premis dasar',
  'dalam pemahaman konvensional',
  'secara normatif',
  'dari sudut pandang klasik',
  'menurut kerangka berpikir umum',
  'dalam batasan konvensional',
  'sesuai paradigma tradisional',
  'berdasarkan asumsi dasar',
];

const shortFillers = [
  'secara umum',
  'pada dasarnya',
  'secara literal',
  'dalam teori',
  'di konteks ini',
  'secara teknis',
  'pada prinsipnya',
  'secara klasik',
  'dalam praktik',
  'menurut standar',
];

function pickFiller(seed, long) {
  const arr = long ? fillerPhrases : shortFillers;
  return arr[seed % arr.length];
}

// ─── Check if option is math-heavy (should not be padded with text) ───────────
function isMathOption(s) {
  // Options that are primarily numbers/formulas
  const stripped = s.replace(/\$[^$]*\$/g, '').replace(/[\\{}^_]/g, '').trim();
  // If after removing all LaTeX, there's very little text left
  if (stripped.length < 5 && s.includes('$')) return true;
  // Pure number answers like "32 N", "1 atm", etc.
  if (/^\d+[\s.,]*\d*\s*[A-Za-zΩμ°%²³⁻¹⁰⁺]*$/.test(stripped)) return true;
  // Ratio answers like "100:1"
  if (/^\d+:\d+$/.test(stripped)) return true;
  return false;
}

// ─── Main processing ──────────────────────────────────────────────────────────
let totalQuestions = 0;
let totalModified = 0;
let totalFilesModified = 0;

for (const fileName of allJsFiles) {
  const filePath = path.join(root, fileName);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Check if this is a question file
  if (!content.includes('registerQuestions') && !content.includes('appendQuestions')) {
    continue;
  }

  let fileModified = false;
  let fileQuestionCount = 0;
  let fileFixCount = 0;

  // Find all question objects: {question:...,options:[...],answer:N,...}
  // We use a regex to match options arrays specifically
  // Pattern: options: ["...", "...", ...],answer:N
  // We need to be careful with escaped quotes inside options

  // Strategy: find each `options:` followed by `[...]`, then `answer:N`
  const optionsRegex = /options:\s*\[([^\]]*)\]\s*,\s*answer:\s*(\d+)/g;
  let match;
  let newContent = content;
  let offset = 0; // track offset from replacements

  // Collect all matches first
  const matches = [];
  while ((match = optionsRegex.exec(content)) !== null) {
    matches.push({
      fullMatch: match[0],
      optionsStr: match[1],
      answerIdx: parseInt(match[2]),
      startPos: match.index,
      endPos: match.index + match[0].length
    });
  }

  for (let mi = 0; mi < matches.length; mi++) {
    const m = matches[mi];
    totalQuestions++;
    fileQuestionCount++;

    // Parse options from the matched string
    // Options are like: "opt1","opt2","opt3","opt4","opt5"
    // Need to handle escaped quotes within options
    const rawOptsStr = m.optionsStr;
    
    // Split by "," respecting escaped quotes
    // Simple approach: split on '","' pattern
    const opts = [];
    let current = '';
    let inQuote = false;
    let escaped = false;
    
    for (let i = 0; i < rawOptsStr.length; i++) {
      const ch = rawOptsStr[i];
      if (escaped) {
        current += ch;
        escaped = false;
        continue;
      }
      if (ch === '\\') {
        current += ch;
        escaped = true;
        continue;
      }
      if (ch === '"') {
        if (!inQuote) {
          inQuote = true;
          continue; // skip opening quote
        } else {
          // Check if this is followed by , or ] (end of option)
          let nextNonSpace = i + 1;
          while (nextNonSpace < rawOptsStr.length && rawOptsStr[nextNonSpace] === ' ') nextNonSpace++;
          if (nextNonSpace >= rawOptsStr.length || rawOptsStr[nextNonSpace] === ',') {
            opts.push(current);
            current = '';
            inQuote = false;
            // Skip the comma
            i = nextNonSpace; // will be incremented by loop
            continue;
          } else {
            // Quote in the middle of text
            current += ch;
            continue;
          }
        }
      }
      if (inQuote) {
        current += ch;
      }
    }
    if (current.length > 0) {
      opts.push(current);
    }

    if (opts.length < 4) continue; // malformed

    const correctIdx = m.answerIdx;
    if (correctIdx >= opts.length) continue;

    // Measure display lengths
    const lengths = opts.map(o => displayLen(o));
    const correctLen = lengths[correctIdx];
    const maxWrongLen = Math.max(...lengths.filter((_, i) => i !== correctIdx));
    const minLen = Math.min(...lengths);

    // Only modify if correct is strictly the longest (the pattern we want to break)
    // OR if there's significant length variance that could be a tell
    const isCorrectLongest = correctLen > maxWrongLen;
    const hasLengthTell = correctLen > maxWrongLen * 1.15; // 15% longer

    if (!isCorrectLongest) continue; // no pattern to fix

    // Calculate target length for wrong options
    // Target: make wrong options at least as long as the correct answer
    const targetLen = correctLen;

    // Build new options
    const newOpts = [...opts];
    let anyChanged = false;

    for (let oi = 0; oi < opts.length; oi++) {
      if (oi === correctIdx) continue;
      
      const optLen = lengths[oi];
      const deficit = targetLen - optLen;

      // Skip if already close enough (within 20%)
      if (optLen >= targetLen * 0.80) continue;
      
      // Skip math-only options
      if (isMathOption(opts[oi])) continue;

      // Choose filler based on deficit size
      const seed = mi * 7 + oi * 13 + fileName.length;
      
      if (deficit <= 12) {
        const filler = pickFiller(seed, false);
        newOpts[oi] = `${opts[oi]} (${filler})`;
        anyChanged = true;
      } else {
        const filler = pickFiller(seed, true);
        const padded = `${opts[oi]} (${filler})`;
        if (displayLen(padded) < targetLen * 0.75) {
          // Need more padding
          const filler2 = pickFiller(seed + 3, true);
          newOpts[oi] = `${opts[oi]} (${filler}; ${filler2})`;
        } else {
          newOpts[oi] = padded;
        }
        anyChanged = true;
      }
    }

    if (!anyChanged) continue;

    // Rebuild the options array string
    const newOptsArrayStr = `options: [${newOpts.map(o => `"${o}"`).join(',')}],answer:${correctIdx}`;
    
    // Replace in content
    const searchStr = m.fullMatch;
    const replPos = newContent.indexOf(searchStr, m.startPos + offset);
    if (replPos !== -1) {
      newContent = newContent.substring(0, replPos) + newOptsArrayStr + newContent.substring(replPos + searchStr.length);
      offset += newOptsArrayStr.length - searchStr.length;
      fileFixCount++;
      totalModified++;
      fileModified = true;
    }
  }

  if (fileModified) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    totalFilesModified++;
    console.log(`  ✓ ${fileName}: ${fileFixCount}/${fileQuestionCount} questions padded`);
  }
}

console.log(`\n══════════════════════════════════════════════`);
console.log(`Total questions scanned: ${totalQuestions}`);
console.log(`Total questions modified: ${totalModified}`);
console.log(`Total files modified: ${totalFilesModified}`);

// ─── VERIFICATION PASS ───────────────────────────────────────────────────────
console.log(`\n── VERIFICATION ──`);

let verifyTotal = 0;
let verifyStillAffected = 0;

for (const fileName of allJsFiles) {
  const filePath = path.join(root, fileName);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  if (!content.includes('registerQuestions') && !content.includes('appendQuestions')) continue;

  const optionsRegex = /options:\s*\[([^\]]*)\]\s*,\s*answer:\s*(\d+)/g;
  let match;
  
  while ((match = optionsRegex.exec(content)) !== null) {
    verifyTotal++;
    const rawOptsStr = match[1];
    const answerIdx = parseInt(match[2]);
    
    // Quick parse options
    const opts = [];
    let current = '';
    let inQuote = false;
    let escaped = false;
    
    for (let i = 0; i < rawOptsStr.length; i++) {
      const ch = rawOptsStr[i];
      if (escaped) { current += ch; escaped = false; continue; }
      if (ch === '\\') { current += ch; escaped = true; continue; }
      if (ch === '"') {
        if (!inQuote) { inQuote = true; continue; }
        let nextNonSpace = i + 1;
        while (nextNonSpace < rawOptsStr.length && rawOptsStr[nextNonSpace] === ' ') nextNonSpace++;
        if (nextNonSpace >= rawOptsStr.length || rawOptsStr[nextNonSpace] === ',') {
          opts.push(current); current = ''; inQuote = false; i = nextNonSpace; continue;
        }
        current += ch; continue;
      }
      if (inQuote) current += ch;
    }
    if (current.length > 0) opts.push(current);
    
    if (opts.length < 4 || answerIdx >= opts.length) continue;
    
    const lengths = opts.map(o => displayLen(o));
    const correctLen = lengths[answerIdx];
    const othersMax = Math.max(...lengths.filter((_, i) => i !== answerIdx));
    
    if (correctLen > othersMax && correctLen > Math.min(...lengths)) {
      verifyStillAffected++;
    }
  }
}

console.log(`Total questions verified: ${verifyTotal}`);
console.log(`Still showing longest=correct pattern: ${verifyStillAffected}`);
console.log(`Pattern eliminated: ${((1 - verifyStillAffected / 2677) * 100).toFixed(1)}%`);
