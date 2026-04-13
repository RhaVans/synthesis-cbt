/**
 * verify_answer_balance.js
 * 
 * Simulates the shuffleOptions + balanceConsecutiveAnswers pipeline
 * and reports the answer distribution to prove randomization works.
 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

// Mock question registration
const QUESTION_BANK = {};
global.registerQuestions = (cat, questions) => {
  if (!QUESTION_BANK[cat]) QUESTION_BANK[cat] = [];
  QUESTION_BANK[cat].push(...questions);
};
global.appendQuestions = (cat, questions) => {
  if (!QUESTION_BANK[cat]) QUESTION_BANK[cat] = [];
  QUESTION_BANK[cat].push(...questions);
};

const allFiles = fs.readdirSync(root).filter(f =>
  f.endsWith('.js') && !f.endsWith('.bak') && f !== 'app.js' && !f.startsWith('.')
);

for (const f of allFiles) {
  const full = path.join(root, f);
  try {
    delete require.cache[require.resolve(full)];
    require(full);
  } catch (e) {}
}

// Count total
let totalQ = 0;
for (const qs of Object.values(QUESTION_BANK)) totalQ += qs.length;

console.log(`═══════════════════════════════════════════════`);
console.log(`Total questions loaded: ${totalQ}`);
console.log(`═══════════════════════════════════════════════`);

// BEFORE: show original distribution
const beforeDist = [0, 0, 0, 0, 0];
for (const qs of Object.values(QUESTION_BANK)) {
  for (const q of qs) beforeDist[q.answer]++;
}
console.log(`\n── BEFORE (original data) ──`);
['A', 'B', 'C', 'D', 'E'].forEach((l, i) => {
  const pct = (beforeDist[i] / totalQ * 100).toFixed(1);
  const bar = '█'.repeat(Math.round(pct / 2));
  console.log(`  ${l}: ${beforeDist[i].toString().padStart(5)} (${pct}%) ${bar}`);
});

// --- Replicate the app.js functions ---
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function shuffleOptions(questions) {
  return questions.map(q => {
    const copy = { ...q, options: [...q.options] };
    const numOptions = copy.options.length;
    const indices = Array.from({ length: numOptions }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    copy.options = indices.map(i => q.options[i]);
    copy.answer = indices.indexOf(q.answer);
    return copy;
  });
}

function balanceConsecutiveAnswers(questions) {
  for (let i = 1; i < questions.length; i++) {
    if (questions[i].answer === questions[i - 1].answer) {
      const q = questions[i];
      const numOptions = q.options.length;
      const prevAnswer = questions[i - 1].answer;
      const candidates = [];
      for (let pos = 0; pos < numOptions; pos++) {
        if (pos !== prevAnswer) candidates.push(pos);
      }
      const newPos = candidates[Math.floor(Math.random() * candidates.length)];
      const oldPos = q.answer;
      [q.options[oldPos], q.options[newPos]] = [q.options[newPos], q.options[oldPos]];
      q.answer = newPos;
    }
  }
  return questions;
}

// Simulate for ALL questions combined
let allQ = [];
for (const qs of Object.values(QUESTION_BANK)) allQ.push(...qs);
let shuffled = shuffleArray(allQ);
shuffled = shuffleOptions(shuffled);
shuffled = balanceConsecutiveAnswers(shuffled);

// AFTER distribution
const afterDist = [0, 0, 0, 0, 0];
for (const q of shuffled) afterDist[q.answer]++;

console.log(`\n── AFTER (shuffled + balanced) ──`);
['A', 'B', 'C', 'D', 'E'].forEach((l, i) => {
  const pct = (afterDist[i] / totalQ * 100).toFixed(1);
  const bar = '█'.repeat(Math.round(pct / 2));
  console.log(`  ${l}: ${afterDist[i].toString().padStart(5)} (${pct}%) ${bar}`);
});

// Check consecutive answers
let consecutiveCount = 0;
for (let i = 1; i < shuffled.length; i++) {
  if (shuffled[i].answer === shuffled[i - 1].answer) consecutiveCount++;
}
console.log(`\n── Consecutive same-answer pairs ──`);
console.log(`  Before balancing would be ~${Math.round(totalQ * 0.94)}`);
console.log(`  After balancing: ${consecutiveCount}`);
console.log(`  ${consecutiveCount === 0 ? '✓ ZERO consecutive duplicates!' : '⚠ Some remain (edge case)'}`);

// Verify correctness: make sure the correct answer text didn't change
console.log(`\n── Correctness verification ──`);
let correct = 0, incorrect = 0;
// Quick spot check: compare first 100 original vs shuffled
const origAll = [];
for (const qs of Object.values(QUESTION_BANK)) origAll.push(...qs);

// Build a map of question text -> correct option text
const origMap = new Map();
for (const q of origAll) {
  origMap.set(q.question, q.options[q.answer]);
}

for (const q of shuffled) {
  const origCorrectText = origMap.get(q.question);
  const shuffledCorrectText = q.options[q.answer];
  if (origCorrectText === shuffledCorrectText) {
    correct++;
  } else {
    incorrect++;
    if (incorrect <= 3) {
      console.log(`  MISMATCH: "${q.question.substring(0, 60)}..."`);
      console.log(`    Original correct: "${origCorrectText}"`);
      console.log(`    Shuffled correct: "${shuffledCorrectText}"`);
    }
  }
}
console.log(`  Correct mappings: ${correct}/${totalQ}`);
console.log(`  Mismatches: ${incorrect}`);
console.log(`  ${incorrect === 0 ? '✓ All answer mappings preserved!' : '✗ ERRORS FOUND'}`);

// Show sample of first 10 questions and their answers
console.log(`\n── Sample: first 10 questions answer keys ──`);
const labels = ['A', 'B', 'C', 'D', 'E'];
for (let i = 0; i < Math.min(10, shuffled.length); i++) {
  console.log(`  Q${(i + 1).toString().padStart(2)}: ${labels[shuffled[i].answer]}  "${shuffled[i].question.substring(0, 50)}..."`);
}
