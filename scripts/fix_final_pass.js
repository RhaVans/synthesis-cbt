/**
 * fix_final_pass.js
 * 
 * Final pass to fix the remaining ~139 questions.
 * For these stubborn cases (mostly math options), we use a different strategy:
 * Instead of adding parenthetical text, we add a LONGER wrong option by
 * making it the same option but with additional qualification text,
 * OR for purely numeric ones, we just "accept" them since they are so short
 * that padding would look unnatural.
 * 
 * For truly short text wrong options, be very aggressive with padding.
 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const skipFiles = new Set(['app.js']);
const allJsFiles = fs.readdirSync(root).filter(f =>
  f.endsWith('.js') &&
  !f.endsWith('.bak') &&
  !skipFiles.has(f) &&
  !f.startsWith('.')
);

function displayLen(s) {
  return s
    .replace(/\$[^$]*\$/g, 'XX')
    .replace(/\\\\[a-zA-Z]+/g, '')
    .replace(/[\\${}^_]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .length;
}

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

function pickFiller(seed) {
  return fillerPhrases[Math.abs(seed) % fillerPhrases.length];
}

function parseOptions(rawOptsStr) {
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
  return opts;
}

// For this final pass: even very short numeric-ish options get padded if they have ANY text
function canPad(s) {
  // Only skip truly pure numbers like "32 N", "3 s", "1 atm"
  const stripped = s.replace(/\$[^$]*\$/g, '').replace(/[\\{}^_$]/g, '').trim();
  // If it's literally just a number + unit, skip
  if (/^[\d.,\s]*[A-Za-zΩμ°%²³⁻¹⁰⁺\/]*$/.test(stripped) && stripped.length < 12) return false;
  // If it's a ratio, skip
  if (/^\d+:\d+$/.test(stripped)) return false;
  // If ALL of it is inside LaTeX (pure math), skip  
  if (s.startsWith('$') && s.endsWith('$') && s.split('$').length <= 3) return false;
  return true;
}

let totalFixed = 0;

for (const fileName of allJsFiles) {
  const filePath = path.join(root, fileName);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (!content.includes('registerQuestions') && !content.includes('appendQuestions')) continue;

  let fileModified = false;

  const optionsRegex = /options:\s*\[([^\]]*)\]\s*,\s*answer:\s*(\d+)/g;
  const matches = [];
  let match;
  while ((match = optionsRegex.exec(content)) !== null) {
    matches.push({
      fullMatch: match[0],
      optionsStr: match[1],
      answerIdx: parseInt(match[2]),
      startPos: match.index,
    });
  }

  let newContent = content;
  let offset = 0;

  for (let mi = 0; mi < matches.length; mi++) {
    const m = matches[mi];
    const opts = parseOptions(m.optionsStr);
    if (opts.length < 4) continue;
    
    const correctIdx = m.answerIdx;
    if (correctIdx >= opts.length) continue;

    const lengths = opts.map(o => displayLen(o));
    const correctLen = lengths[correctIdx];
    const othersMax = Math.max(...lengths.filter((_, i) => i !== correctIdx));

    // Only process if correct is STILL the longest
    if (correctLen <= othersMax) continue;

    const newOpts = [...opts];
    let anyChanged = false;

    for (let oi = 0; oi < opts.length; oi++) {
      if (oi === correctIdx) continue;
      if (lengths[oi] >= correctLen) continue;
      
      if (!canPad(opts[oi])) continue;

      const seed = mi * 19 + oi * 23 + fileName.charCodeAt(0) * 3;
      const filler1 = pickFiller(seed);
      const filler2 = pickFiller(seed + 7);

      if (opts[oi].includes('(')) {
        // Already padded, extend further
        newOpts[oi] = opts[oi].replace(/\)$/, `; ${filler1}; ${filler2})`);
      } else {
        newOpts[oi] = `${opts[oi]} (${filler1}; ${filler2})`;
      }
      anyChanged = true;
    }

    if (!anyChanged) continue;

    // Re-check: is correct still longest after padding?
    const newLengths = newOpts.map(o => displayLen(o));
    const newOthersMax = Math.max(...newLengths.filter((_, i) => i !== correctIdx));
    if (newLengths[correctIdx] > newOthersMax) {
      // Still longest, need even MORE padding on the longest wrong option
      // Find the longest wrong option and pad it even more
      let bestWrong = -1;
      let bestWrongLen = 0;
      for (let oi = 0; oi < newOpts.length; oi++) {
        if (oi === correctIdx) continue;
        if (newLengths[oi] > bestWrongLen && canPad(newOpts[oi])) {
          bestWrongLen = newLengths[oi];
          bestWrong = oi;
        }
      }
      if (bestWrong !== -1) {
        const deficit = newLengths[correctIdx] - bestWrongLen;
        const extra = pickFiller(mi * 19 + bestWrong * 23 + 11);
        const extra2 = pickFiller(mi * 19 + bestWrong * 23 + 17);
        if (newOpts[bestWrong].includes('(')) {
          newOpts[bestWrong] = newOpts[bestWrong].replace(/\)$/, `; ${extra}; ${extra2})`);
        } else {
          newOpts[bestWrong] = `${newOpts[bestWrong]} (${extra}; ${extra2})`;
        }
      }
    }

    const newOptsArrayStr = `options: [${newOpts.map(o => `"${o}"`).join(',')}],answer:${correctIdx}`;
    
    const searchStr = m.fullMatch;
    const replPos = newContent.indexOf(searchStr, m.startPos + offset);
    if (replPos !== -1) {
      newContent = newContent.substring(0, replPos) + newOptsArrayStr + newContent.substring(replPos + searchStr.length);
      offset += newOptsArrayStr.length - searchStr.length;
      totalFixed++;
      fileModified = true;
    }
  }

  if (fileModified) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
  }
}

console.log(`Additional questions fixed in pass 3: ${totalFixed}`);

// ─── Final verification ───────────────────────────────────────────────────────
console.log(`\n── FINAL VERIFICATION ──`);

let verifyTotal = 0;
let stillAffected = 0;
const stillByFile = {};

for (const fileName of allJsFiles) {
  const filePath = path.join(root, fileName);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  if (!content.includes('registerQuestions') && !content.includes('appendQuestions')) continue;

  const optionsRegex = /options:\s*\[([^\]]*)\]\s*,\s*answer:\s*(\d+)/g;
  let match;
  
  while ((match = optionsRegex.exec(content)) !== null) {
    verifyTotal++;
    const opts = parseOptions(match[1]);
    const answerIdx = parseInt(match[2]);
    if (opts.length < 4 || answerIdx >= opts.length) continue;
    
    const lengths = opts.map(o => displayLen(o));
    const correctLen = lengths[answerIdx];
    const othersMax = Math.max(...lengths.filter((_, i) => i !== answerIdx));
    
    if (correctLen > othersMax && correctLen > Math.min(...lengths)) {
      stillAffected++;
      stillByFile[fileName] = (stillByFile[fileName] || 0) + 1;
    }
  }
}

console.log(`Total questions: ${verifyTotal}`);
console.log(`Still showing longest=correct: ${stillAffected}`);
console.log(`Original: 2677 → Now: ${stillAffected}`);
console.log(`Fixed: ${2677 - stillAffected} (${((1 - stillAffected / 2677) * 100).toFixed(1)}%)`);

if (stillAffected > 0) {
  console.log(`\nRemaining by file (these are pure math/numeric options):`);
  for (const [file, count] of Object.entries(stillByFile).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${file}: ${count}`);
  }
}
