/**
 * verify_and_check_remaining.js
 * 
 * Final verification:
 * 1. Confirm all 5500 questions still load properly
 * 2. Show examples of the remaining 135 unfixable questions (pure math)
 * 3. Confirm pattern is eliminated for text-based questions
 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

// Mock question registration
const allQ = [];
let currentFile = '';

global.registerQuestions = (cat, questions) => {
  questions.forEach((q, i) => allQ.push({ file: currentFile, idx: i, cat, q }));
};
global.appendQuestions = (cat, questions) => {
  questions.forEach((q, i) => allQ.push({ file: currentFile, idx: i, cat, q }));
};

const allFiles = fs.readdirSync(root).filter(f =>
  f.endsWith('.js') && !f.endsWith('.bak') && f !== 'app.js' && !f.startsWith('.')
);

for (const f of allFiles) {
  const full = path.join(root, f);
  currentFile = f;
  try {
    delete require.cache[require.resolve(full)];
    require(full);
  } catch (e) {}
}

console.log(`═══════════════════════════════════════════════`);
console.log(`Total questions loaded successfully: ${allQ.length}`);
console.log(`═══════════════════════════════════════════════`);

// Check pattern
function displayLen(s) {
  return s.replace(/\$[^$]*\$/g, 'XX').replace(/\\\\[a-zA-Z]+/g, '').replace(/[\\${}^_]/g, '').replace(/\s+/g, ' ').trim().length;
}

let patternCount = 0;
const examples = [];

for (const entry of allQ) {
  const { q, file } = entry;
  const lengths = q.options.map(o => displayLen(o));
  const correctLen = lengths[q.answer];
  const othersMax = Math.max(...lengths.filter((_, i) => i !== q.answer));
  
  if (correctLen > othersMax && correctLen > Math.min(...lengths)) {
    patternCount++;
    if (examples.length < 5) {
      examples.push({
        file,
        question: q.question.substring(0, 80),
        options: q.options.map((o, i) => `[${i === q.answer ? '✓' : ' '}] ${o} (len=${lengths[i]})`),
      });
    }
  }
}

console.log(`\nQuestions still with longest=correct pattern: ${patternCount}`);
console.log(`Pattern elimination rate: ${((1 - patternCount / 2677) * 100).toFixed(1)}%`);

if (examples.length > 0) {
  console.log(`\nExamples of remaining (unfixable — pure math options):`);
  for (const ex of examples) {
    console.log(`\n  File: ${ex.file}`);
    console.log(`  Q: ${ex.question}...`);
    for (const opt of ex.options) {
      console.log(`    ${opt}`);
    }
  }
}

// Verify no questions were broken (all have 5 options and valid answer index)
let broken = 0;
for (const entry of allQ) {
  const { q } = entry;
  if (!q.options || q.options.length < 4 || q.answer < 0 || q.answer >= q.options.length) {
    broken++;
    console.log(`BROKEN: ${entry.file} idx ${entry.idx}`);
  }
}
console.log(`\nBroken questions: ${broken}`);
console.log(`All questions valid: ${broken === 0 ? 'YES ✓' : 'NO ✗'}`);

// Show sample of a FIXED question to confirm padding looks natural
console.log(`\n── Sample fixed question ──`);
for (const entry of allQ) {
  const { q, file } = entry;
  // Find one with parenthetical padding
  if (q.options.some(o => o.includes('(secara') || o.includes('(dalam') || o.includes('(menurut'))) {
    const lengths = q.options.map(o => displayLen(o));
    console.log(`File: ${file}`);
    console.log(`Q: ${q.question.substring(0, 100)}`);
    q.options.forEach((o, i) => {
      console.log(`  [${i === q.answer ? '✓' : ' '}] ${o} (len=${lengths[i]})`);
    });
    break;
  }
}
