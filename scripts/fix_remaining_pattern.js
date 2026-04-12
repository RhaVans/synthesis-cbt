/**
 * fix_remaining_pattern.js
 * 
 * Second pass to aggressively fix remaining questions where the correct answer
 * is still the longest. This pass:
 * - Lowers the threshold for padding (80% → 95% of target length)
 * - Also pads math-adjacent text options  
 * - Handles remaining edge cases
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
  return arr[Math.abs(seed) % arr.length];
}

// Much less strict — only skip truly numeric-only options
function isPureNumeric(s) {
  const stripped = s.replace(/\$[^$]*\$/g, '').replace(/[\\{}^_$]/g, '').trim();
  // Pure numbers like "32 N", "3 s", "100:1", "I/4"
  return /^[\d.,\/\s:+\-×÷IΩμ°%²³⁻¹⁰⁺A-Z]*$/.test(stripped) && stripped.length < 20;
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

// ─── Process ──────────────────────────────────────────────────────────────────
let totalQuestions = 0;
let totalModified = 0;

for (const fileName of allJsFiles) {
  const filePath = path.join(root, fileName);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (!content.includes('registerQuestions') && !content.includes('appendQuestions')) continue;

  let fileModified = false;
  let fileFixCount = 0;

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
    totalQuestions++;

    const opts = parseOptions(m.optionsStr);
    if (opts.length < 4) continue;
    
    const correctIdx = m.answerIdx;
    if (correctIdx >= opts.length) continue;

    const lengths = opts.map(o => displayLen(o));
    const correctLen = lengths[correctIdx];
    const othersMax = Math.max(...lengths.filter((_, i) => i !== correctIdx));

    // Only fix if correct is STILL the longest
    if (correctLen <= othersMax) continue;

    const targetLen = correctLen;
    const newOpts = [...opts];
    let anyChanged = false;

    for (let oi = 0; oi < opts.length; oi++) {
      if (oi === correctIdx) continue;
      
      const optLen = lengths[oi];
      
      // Skip if already at target (within 95%)
      if (optLen >= targetLen * 0.95) continue;
      
      // Skip pure numeric options
      if (isPureNumeric(opts[oi])) continue;

      // Already has parenthetical padding? Add more or extend
      const seed = mi * 11 + oi * 17 + fileName.charCodeAt(0);
      const deficit = targetLen - optLen;

      if (deficit <= 8) {
        const filler = pickFiller(seed, false);
        if (!opts[oi].includes('(')) {
          newOpts[oi] = `${opts[oi]} (${filler})`;
        } else {
          // Already has parens, extend
          newOpts[oi] = opts[oi].replace(/\)$/, `; ${pickFiller(seed + 5, false)})`);
        }
        anyChanged = true;
      } else if (deficit <= 20) {
        const filler = pickFiller(seed, true);
        if (!opts[oi].includes('(')) {
          newOpts[oi] = `${opts[oi]} (${filler})`;
        } else {
          newOpts[oi] = opts[oi].replace(/\)$/, `; ${pickFiller(seed + 7, true)})`);
        }
        anyChanged = true;
      } else {
        const filler1 = pickFiller(seed, true);
        const filler2 = pickFiller(seed + 3, true);
        if (!opts[oi].includes('(')) {
          newOpts[oi] = `${opts[oi]} (${filler1}; ${filler2})`;
        } else {
          newOpts[oi] = opts[oi].replace(/\)$/, `; ${filler1}; ${filler2})`);
        }
        anyChanged = true;
      }
    }

    if (!anyChanged) continue;

    const newOptsArrayStr = `options: [${newOpts.map(o => `"${o}"`).join(',')}],answer:${correctIdx}`;
    
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
  }
}

console.log(`Total questions scanned: ${totalQuestions}`);
console.log(`Additional questions fixed in pass 2: ${totalModified}`);

// ─── Final verification ───────────────────────────────────────────────────────
console.log(`\n── FINAL VERIFICATION ──`);

let verifyTotal = 0;
let stillAffected = 0;
const stillAffectedByFile = {};

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
      stillAffectedByFile[fileName] = (stillAffectedByFile[fileName] || 0) + 1;
    }
  }
}

console.log(`Total questions: ${verifyTotal}`);
console.log(`Still showing longest=correct pattern: ${stillAffected}`);
console.log(`Original affected: 2677`);
console.log(`Pattern eliminated: ${((1 - stillAffected / 2677) * 100).toFixed(1)}%`);

if (stillAffected > 0) {
  console.log(`\nRemaining by file:`);
  const sorted = Object.entries(stillAffectedByFile).sort((a, b) => b[1] - a[1]);
  for (const [file, count] of sorted) {
    console.log(`  ${file}: ${count}`);
  }
}
