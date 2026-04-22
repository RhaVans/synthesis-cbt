/* ============================================
   SYNTHESIS — Quiz Engine & Application
   ============================================ */

// QUESTION_BANK and registerQuestions are defined in index.html inline script (loaded before question files)

// ========== SUBJECT CONFIGURATION ==========
const SUBJECTS = {
    tps_verbal: { name: 'Verbal', category: 'TPS / TPA', catKey: 'tps', timePerQ: 80 },
    tps_numerik: { name: 'Numerik', category: 'TPS / TPA', catKey: 'tps', timePerQ: 90 },
    tps_logika: { name: 'Logika', category: 'TPS / TPA', catKey: 'tps', timePerQ: 80 },
    tps_spasial: { name: 'Spasial', category: 'TPS / TPA', catKey: 'tps', timePerQ: 80 },
    tkd_matdas: { name: 'Matematika Dasar', category: 'TKD', catKey: 'tkd', timePerQ: 90 },
    tkd_indo: { name: 'Bahasa Indonesia', category: 'TKD', catKey: 'tkd', timePerQ: 80 },
    tkd_eng: { name: 'Bahasa Inggris', category: 'TKD', catKey: 'tkd', timePerQ: 80 },
    saintek_matipa: { name: 'Matematika IPA', category: 'TKA Saintek', catKey: 'saintek', timePerQ: 100 },
    saintek_fisika: { name: 'Fisika', category: 'TKA Saintek', catKey: 'saintek', timePerQ: 100 },
    saintek_kimia: { name: 'Kimia', category: 'TKA Saintek', catKey: 'saintek', timePerQ: 100 },
    saintek_biologi: { name: 'Biologi', category: 'TKA Saintek', catKey: 'saintek', timePerQ: 90 },
    soshum_ekonomi: { name: 'Ekonomi', category: 'TKA Soshum', catKey: 'soshum', timePerQ: 80 },
    soshum_sosiologi: { name: 'Sosiologi', category: 'TKA Soshum', catKey: 'soshum', timePerQ: 80 },
    soshum_sejarah: { name: 'Sejarah', category: 'TKA Soshum', catKey: 'soshum', timePerQ: 80 },
    soshum_geografi: { name: 'Geografi', category: 'TKA Soshum', catKey: 'soshum', timePerQ: 80 },
    // Advanced Challenge
    adv_precalculus: { name: 'Pre-Kalkulus', category: 'Advanced Challenge', catKey: 'adv', timePerQ: 120 },
    adv_calculus: { name: 'Kalkulus', category: 'Advanced Challenge', catKey: 'adv', timePerQ: 120 },
};

const CATEGORY_METADATA = {
    tps: { name: 'TPS / TPA', color: 'var(--cat-tps)' },
    tkd: { name: 'TKD', color: 'var(--cat-tkd)' },
    saintek: { name: 'TKA Saintek', color: 'var(--cat-saintek)' },
    soshum: { name: 'TKA Soshum', color: 'var(--cat-soshum)' },
    adv: { name: 'Advanced Challenge', color: 'var(--gold)' }
};

// ========== STATE ==========
let state = {
    mode: 'practice', // 'practice' or 'exam'
    currentSubject: null,
    questions: [],
    currentIndex: 0,
    answers: {},       // { index: selectedOption }
    flagged: new Set(),
    hintShown: {},
    timer: null,
    timeLeft: 0,
    startTime: null,
    endTime: null,
};

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    updateSubjectCounts();
    initHero();
});

const domCache = {
    counts: {},
    categories: {},
    totalQuestions: null
};

function updateSubjectCounts() {
    let categoryTotals = { tps: 0, tkd: 0, saintek: 0, soshum: 0, adv: 0 };
    let grandTotal = 0;

    for (const [key, config] of Object.entries(SUBJECTS)) {
        const count = (QUESTION_BANK[key] || []).length;

        if (!domCache.counts[key]) {
            domCache.counts[key] = document.getElementById(`count-${key}`);
        }
        const el = domCache.counts[key];

        if (el) el.textContent = count;
        if (!categoryTotals[config.catKey]) categoryTotals[config.catKey] = 0;
        categoryTotals[config.catKey] += count;
        grandTotal += count;
    }

    for (const [cat, total] of Object.entries(categoryTotals)) {
        if (!domCache.categories[cat]) {
            domCache.categories[cat] = document.getElementById(`count-${cat}`);
        }
        const el = domCache.categories[cat];
        if (el) el.textContent = `${total} soal`;
    }

    if (!domCache.totalQuestions) {
        domCache.totalQuestions = document.querySelectorAll('#totalQuestions');
    }
    domCache.totalQuestions.forEach(el => { el.textContent = grandTotal; });
}

// ========== VIEW MANAGEMENT ==========
function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById(viewId);
    if (target) {
        target.classList.add('active');
        target.scrollTop = 0;
        window.scrollTo(0, 0);
    }
    if (viewId === 'stats') {
        renderStatsDashboard();
    }
}

// ========== MODE ==========
function setMode(mode) {
    state.mode = mode;
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });
}

// ========== QUIZ START ==========
function startQuiz(subjectKey) {
    const questions = QUESTION_BANK[subjectKey];
    if (!questions || questions.length === 0) {
        alert('Soal untuk mata uji ini belum tersedia.');
        return;
    }

    const config = SUBJECTS[subjectKey];

    state.currentSubject = subjectKey;
    // Shuffle question order, then shuffle options within each question,
    // then balance so no two consecutive questions share the same correct answer
    let shuffled = shuffleArray([...questions]);
    shuffled = shuffleOptions(shuffled);
    shuffled = balanceConsecutiveAnswers(shuffled);
    state.questions = shuffled;
    state.currentIndex = 0;
    state.answers = {};
    state.flagged = new Set();
    state.hintShown = {};
    state.startTime = Date.now();
    state.endTime = null;

    // Set timer — fixed 360 minutes
    state.timeLeft = 360 * 60;

    // Update UI
    document.getElementById('quizCategoryLabel').textContent = config.category;
    document.getElementById('quizSubjectLabel').textContent = config.name;

    // Build question grid
    buildQuestionGrid();

    // Show quiz
    showView('quiz');
    renderQuestion();
    startTimer();
}

function startFullExam() {
    // Combine all available questions from all subjects (up to 165)
    let allQuestions = [];
    for (const key of Object.keys(SUBJECTS)) {
        const qs = QUESTION_BANK[key] || [];
        // Take proportional amount
        const take = Math.min(qs.length, Math.ceil(165 / Object.keys(SUBJECTS).length));
        allQuestions = allQuestions.concat(shuffleArray([...qs]).slice(0, take));
    }

    if (allQuestions.length === 0) {
        alert('Belum ada soal yang tersedia.');
        return;
    }

    state.currentSubject = 'full_exam';
    // Shuffle question order, then shuffle options, then balance consecutive answers
    let shuffled = shuffleArray(allQuestions).slice(0, 165);
    shuffled = shuffleOptions(shuffled);
    shuffled = balanceConsecutiveAnswers(shuffled);
    state.questions = shuffled;
    state.currentIndex = 0;
    state.answers = {};
    state.flagged = new Set();
    state.hintShown = {};
    state.startTime = Date.now();
    state.endTime = null;
    state.timeLeft = 360 * 60; // 360 minutes
    state.mode = 'exam';

    document.getElementById('quizCategoryLabel').textContent = 'SIMULASI PENUH';
    document.getElementById('quizSubjectLabel').textContent = 'SYNTHESIS';

    buildQuestionGrid();
    showView('quiz');
    renderQuestion();
    startTimer();
}

// ========== QUESTION RENDERING ==========
function renderQuestion() {
    const q = state.questions[state.currentIndex];
    if (!q) return;

    const total = state.questions.length;
    const idx = state.currentIndex;

    // Badge & Progress
    document.getElementById('questionBadge').textContent = `Soal ${idx + 1}`;
    document.getElementById('quizProgressText').textContent = `${idx + 1} / ${total}`;
    document.getElementById('quizProgressFill').style.width = `${((idx + 1) / total) * 100}%`;

    // Question text
    document.getElementById('questionText').innerHTML = formatText(q.question);

    // Options
    const optionsList = document.getElementById('optionsList');
    const labels = ['A', 'B', 'C', 'D', 'E'];
    optionsList.innerHTML = '';

    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.id = `option-${i}`;

        // Check if answered
        if (state.answers[idx] !== undefined) {
            if (state.mode === 'practice') {
                btn.classList.add('disabled');
                if (i === q.answer) btn.classList.add('correct');
                if (state.answers[idx] === i && i !== q.answer) btn.classList.add('wrong');
            } else {
                if (state.answers[idx] === i) btn.classList.add('selected');
            }
        }

        btn.innerHTML = `
            <span class="option-label">${labels[i]}</span>
            <span class="option-text">${formatText(opt)}</span>
        `;

        btn.addEventListener('click', () => selectOption(i));
        optionsList.appendChild(btn);
    });

    // Hint
    const hintContent = document.getElementById('hintContent');
    hintContent.innerHTML = formatText(q.hint);
    hintContent.classList.toggle('show', !!state.hintShown[idx]);
    document.querySelector('.hint-toggle span').textContent =
        state.hintShown[idx] ? 'Sembunyikan Petunjuk' : 'Tampilkan Petunjuk';

    // Explanation (practice mode)
    const explPanel = document.getElementById('explanationPanel');
    if (state.mode === 'practice' && state.answers[idx] !== undefined) {
        const isCorrect = state.answers[idx] === q.answer;
        explPanel.style.display = 'block';
        document.getElementById('explanationIcon').textContent = isCorrect ? '✓' : '✗';
        const titleEl = document.getElementById('explanationTitle');
        titleEl.textContent = isCorrect ? 'Jawaban Benar!' : `Jawaban Salah — Jawaban yang benar: ${labels[q.answer]}`;
        titleEl.className = `explanation-title ${isCorrect ? 'correct' : 'wrong'}`;
        document.getElementById('explanationContent').innerHTML = formatText(q.explanation);
    } else {
        explPanel.style.display = 'none';
    }

    // Flag button
    document.getElementById('btnFlag').classList.toggle('flagged', state.flagged.has(idx));

    // Nav buttons
    document.getElementById('btnPrev').style.visibility = idx === 0 ? 'hidden' : 'visible';
    document.getElementById('btnNext').textContent = idx === total - 1 ? 'Selesai' : '';
    document.getElementById('btnNext').innerHTML = idx === total - 1
        ? 'Kumpulkan <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>'
        : 'Selanjutnya <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';

    // Update grid
    updateQuestionGrid();
    updateSidebarStats();

    // Render KaTeX math in the quiz area
    renderMathInContainer(document.querySelector('.quiz-main'));
}

// ========== KaTeX MATH RENDERING ==========
function renderMathInContainer(container) {
    if (!container || typeof renderMathInElement !== 'function') return;
    try {
        renderMathInElement(container, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false }
            ],
            throwOnError: false,
            trust: true
        });
    } catch (e) {
        // silently ignore KaTeX rendering errors
    }
}

// ========== TEXT FORMATTING & LaTeX PRE-WRAPPING ==========

const REGEX_HTML_ESCAPE = /[&<>"']/g;
const REGEX_MATH_INDICATOR = /\$|\\[a-zA-Z]|[a-zA-Z0-9]\^[{0-9]|[a-zA-Z0-9]_/;
const REGEX_LATEX_TOKEN = /\$[^\$]+\$|\\[a-zA-Z]+(?:_(?:\{[^{}]*\}|[a-zA-Z0-9])|\^(?:\{[^{}]*\}|[a-zA-Z0-9])|\{[^{}]*\}|\([^)]*\))*|[a-zA-Z0-9]\^(?:\{[^{}]*\}|[0-9]+)|[a-zA-Z0-9]_(?:\{[^{}]*\}|[a-zA-Z0-9])/g;
const REGEX_BOLD = /\*\*(.*?)\*\*/g;
const REGEX_ITALIC = /\*(.*?)\*/g;
const REGEX_CODE = /`(.*?)`/g;
const REGEX_NEWLINE = /\n/g;

/**
 * Pre-wrap LaTeX commands in $...$ so KaTeX auto-render picks them up.
 * Handles question strings that have LaTeX commands (\\sqrt, \\log, etc.)
 * but no $ delimiters — produced by the KaTeX converter for matdas/matipa files.
 *
 * Strategy: find contiguous "math islands" anchored on a LaTeX command or
 * exponent/subscript notation, expand to include adjacent math chars,
 * then wrap the whole run in $...$. Skips segments already inside $...$.
 */
function escapeHTML(str) {
    if (!str) return '';
    return str.replace(REGEX_HTML_ESCAPE, m => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[m]);
}

function prewrapMath(text) {
    if (!text) return text;

    // Does the text have any bare LaTeX content? (or already wrapped content)
    if (!REGEX_MATH_INDICATOR.test(text)) return text;

    // First match existing $...$ blocks to protect them, then match bare LaTeX tokens.
    // Wrap each LaTeX token individually — do NOT sweep into prose (no space consumption)
    // Token: \cmd{args}^{sup}_{sub}(args)  OR  x^{n}  OR  x_{n}
    return text.replace(REGEX_LATEX_TOKEN, match => {
        if (match.startsWith('$')) {
            return match; // already wrapped
        }
        return '$' + match + '$';
    });
}

function formatText(text) {
    if (!text) return '';
    // Escape HTML first to prevent XSS
    text = escapeHTML(text);
    // Pre-wrap bare LaTeX math in $...$ for KaTeX auto-render
    text = prewrapMath(text);
    // Basic formatting: support for newlines and simple formatting
    return text
        .replace(REGEX_BOLD, '<strong>$1</strong>')
        .replace(REGEX_ITALIC, '<em>$1</em>')
        .replace(REGEX_CODE, '<code style="background:rgba(0,0,0,0.3);padding:2px 6px;border-radius:4px;font-family:var(--font-mono);font-size:0.9em;">$1</code>')
        .replace(REGEX_NEWLINE, '<br>');
}


// ========== OPTION SELECTION ==========
function selectOption(optionIndex) {
    const idx = state.currentIndex;
    const q = state.questions[idx];

    // In practice mode, once answered can't change
    if (state.mode === 'practice' && state.answers[idx] !== undefined) return;

    state.answers[idx] = optionIndex;
    renderQuestion();

    // In practice mode & auto-advance after delay
    if (state.mode === 'practice') {
        // Show explanation immediately, no auto-advance
    }
}

// ========== NAVIGATION ==========
function nextQuestion() {
    if (state.currentIndex >= state.questions.length - 1) {
        if (state.mode === 'exam') {
            submitQuiz();
        } else {
            submitQuiz();
        }
        return;
    }
    state.currentIndex++;
    renderQuestion();
    scrollToTop();
}

function prevQuestion() {
    if (state.currentIndex <= 0) return;
    state.currentIndex--;
    renderQuestion();
    scrollToTop();
}

function goToQuestion(index) {
    state.currentIndex = index;
    renderQuestion();
    scrollToTop();
}

function scrollToTop() {
    document.querySelector('.quiz-main')?.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== FLAG ==========
function toggleFlag() {
    const idx = state.currentIndex;
    if (state.flagged.has(idx)) {
        state.flagged.delete(idx);
    } else {
        state.flagged.add(idx);
    }
    document.getElementById('btnFlag').classList.toggle('flagged', state.flagged.has(idx));
    updateQuestionGrid();
    updateSidebarStats();
}

// ========== HINT ==========
function toggleHint() {
    const idx = state.currentIndex;
    state.hintShown[idx] = !state.hintShown[idx];
    const hintContent = document.getElementById('hintContent');
    hintContent.classList.toggle('show', state.hintShown[idx]);
    document.querySelector('.hint-toggle span').textContent =
        state.hintShown[idx] ? 'Sembunyikan Petunjuk' : 'Tampilkan Petunjuk';
}

// ========== QUESTION GRID ==========
function buildQuestionGrid() {
    const grid = document.getElementById('questionGrid');
    grid.innerHTML = '';
    state.questions.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.className = 'q-grid-btn';
        btn.textContent = i + 1;
        btn.addEventListener('click', () => goToQuestion(i));
        grid.appendChild(btn);
    });
}

function updateQuestionGrid() {
    const btns = document.querySelectorAll('.q-grid-btn');
    btns.forEach((btn, i) => {
        btn.className = 'q-grid-btn';
        if (i === state.currentIndex) btn.classList.add('current');
        if (state.answers[i] !== undefined) btn.classList.add('answered');
        if (state.flagged.has(i)) btn.classList.add('flagged');
    });
}

function updateSidebarStats() {
    const total = state.questions.length;
    const answered = Object.keys(state.answers).length;
    document.getElementById('answeredCount').textContent = answered;
    document.getElementById('flaggedCount').textContent = state.flagged.size;
    document.getElementById('remainingCount').textContent = total - answered;
}

// ========== TIMER ==========
function startTimer() {
    clearInterval(state.timer);
    updateTimerDisplay();

    state.timer = setInterval(() => {
        state.timeLeft--;
        updateTimerDisplay();

        if (state.timeLeft <= 0) {
            clearInterval(state.timer);
            submitQuiz();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(state.timeLeft / 60);
    const seconds = state.timeLeft % 60;
    const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById('timerDisplay').textContent = display;

    const timerEl = document.getElementById('quizTimer');
    timerEl.classList.remove('warning', 'danger');
    if (state.timeLeft <= 60) {
        timerEl.classList.add('danger');
    } else if (state.timeLeft <= 300) {
        timerEl.classList.add('warning');
    }
}

// ========== SUBMIT & RESULTS ==========
function submitQuiz() {
    clearInterval(state.timer);
    state.endTime = Date.now();

    const total = state.questions.length;
    let correct = 0, wrong = 0, skipped = 0;

    state.questions.forEach((q, i) => {
        if (state.answers[i] === undefined) {
            skipped++;
        } else if (state.answers[i] === q.answer) {
            correct++;
        } else {
            wrong++;
        }
    });

    const score = Math.round((correct / total) * 100);
    const elapsed = Math.floor((state.endTime - state.startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;

    // Update results UI
    const subjectConfig = SUBJECTS[state.currentSubject] || { name: 'Simulasi Penuh', category: 'SYNTHESIS' };
    document.getElementById('resultsTitle').textContent = 'Hasil Simulasi';
    document.getElementById('resultsSubject').textContent =
        state.currentSubject === 'full_exam' ? 'Ujian Mandiri Lengkap' : `${subjectConfig.category} — ${subjectConfig.name}`;
    document.getElementById('scoreValue').textContent = score;
    document.getElementById('correctCount').textContent = correct;
    document.getElementById('wrongCount').textContent = wrong;
    document.getElementById('skippedCount').textContent = skipped;
    document.getElementById('timeTaken').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // Animate score ring
    const circumference = 339.292;
    const offset = circumference - (score / 100) * circumference;
    const scoreFill = document.getElementById('scoreFill');
    scoreFill.style.strokeDashoffset = circumference;
    
    // Add SVG gradient definition if not exists
    const svg = document.querySelector('.score-svg');
    if (!svg.querySelector('defs')) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        grad.id = 'scoreGrad';
        grad.innerHTML = '<stop offset="0%" stop-color="#005baa"/><stop offset="100%" stop-color="#d4a843"/>';
        defs.appendChild(grad);
        svg.insertBefore(defs, svg.firstChild);
    }

    // Hide review section initially
    document.getElementById('reviewSection').style.display = 'none';

    showView('results');

    // Animate after view transition
    requestAnimationFrame(() => {
        setTimeout(() => {
            scoreFill.style.strokeDashoffset = offset;
        }, 100);
    });

    // Record session for statistics
    recordSession(correct, wrong, skipped, elapsed);
}

// ========== REVIEW ==========
function showReview() {
    const reviewSection = document.getElementById('reviewSection');
    reviewSection.style.display = 'block';
    filterReview('all');
    reviewSection.scrollIntoView({ behavior: 'smooth' });
}

function filterReview(filter) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });

    const reviewList = document.getElementById('reviewList');
    reviewList.innerHTML = '';

    const labels = ['A', 'B', 'C', 'D', 'E'];

    state.questions.forEach((q, i) => {
        const userAnswer = state.answers[i];
        const isCorrect = userAnswer === q.answer;
        const isSkipped = userAnswer === undefined;

        // Filter
        if (filter === 'correct' && !isCorrect) return;
        if (filter === 'wrong' && (isCorrect || isSkipped)) return;
        if (filter === 'skipped' && !isSkipped) return;

        const status = isSkipped ? 'skipped' : (isCorrect ? 'correct' : 'wrong');

        const item = document.createElement('div');
        item.className = `review-item ${status}`;
        item.innerHTML = `
            <div class="review-question"><strong>Soal ${i + 1}.</strong> ${formatText(q.question)}</div>
            <div class="review-answer-grid">
                ${q.options.map((opt, j) => {
                    let cls = 'review-option';
                    if (j === q.answer) cls += ' is-correct';
                    if (j === userAnswer && j !== q.answer) cls += ' is-selected is-wrong';
                    return `<div class="${cls}"><span class="review-opt-label">${labels[j]}.</span> ${formatText(opt)}</div>`;
                }).join('')}
            </div>
            <div class="review-explanation"><strong>Pembahasan:</strong>\n${formatText(q.explanation)}</div>
        `;
        reviewList.appendChild(item);
    });

    if (reviewList.children.length === 0) {
        reviewList.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:2rem;">Tidak ada soal yang sesuai filter.</p>';
    }
}

// ========== RETRY ==========
function retryQuiz() {
    if (state.currentSubject === 'full_exam') {
        startFullExam();
    } else {
        startQuiz(state.currentSubject);
    }
}

// ========== EXIT ==========
function confirmExit() {
    document.getElementById('exitModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('exitModal').style.display = 'none';
}

function forceExit() {
    clearInterval(state.timer);
    closeModal();
    showView('select');
}

// ========== UTILITIES ==========
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Shuffle the options within each question so the correct answer
 * is no longer always at index 0 (option A). Creates deep copies
 * so the original QUESTION_BANK is never mutated.
 */
function shuffleOptions(questions) {
    return questions.map(q => {
        // Deep-copy the question so we don't mutate the bank
        const copy = { ...q, options: [...q.options] };
        const numOptions = copy.options.length;

        // Build index array [0,1,2,3,4] and shuffle it
        const indices = Array.from({ length: numOptions }, (_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }

        // Reorder options and remap the correct answer index
        copy.options = indices.map(i => q.options[i]);
        copy.answer = indices.indexOf(q.answer);

        return copy;
    });
}

/**
 * Ensure no two consecutive questions share the same correct-answer index.
 * When a collision is found, rotate the options of the current question
 * so the correct answer moves to a different slot. This preserves the
 * relative order of wrong answers and only changes where the correct
 * answer sits (A/B/C/D/E).
 */
function balanceConsecutiveAnswers(questions) {
    for (let i = 1; i < questions.length; i++) {
        if (questions[i].answer === questions[i - 1].answer) {
            const q = questions[i];
            const numOptions = q.options.length;
            const prevAnswer = questions[i - 1].answer;

            // Collect candidate positions (anything != previous answer)
            const candidates = [];
            for (let pos = 0; pos < numOptions; pos++) {
                if (pos !== prevAnswer) candidates.push(pos);
            }

            // Pick a random new position for the correct answer
            const newPos = candidates[Math.floor(Math.random() * candidates.length)];

            // Swap the option at newPos with the correct option
            const oldPos = q.answer;
            [q.options[oldPos], q.options[newPos]] = [q.options[newPos], q.options[oldPos]];
            q.answer = newPos;
        }
    }
    return questions;
}

// ========== PARTICLE SYSTEM ==========
function initParticles() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrame;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.3 + 0.05;
            this.color = Math.random() > 0.7
                ? `rgba(212, 168, 67, ${this.opacity})`
                : `rgba(0, 91, 170, ${this.opacity})`;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    // Create particles
    const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 91, 170, ${0.03 * (1 - dist / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        animFrame = requestAnimationFrame(animate);
    }

    animate();
}

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', (e) => {
    const quizView = document.getElementById('quiz');
    if (!quizView.classList.contains('active')) return;

    switch (e.key) {
        case '1': case 'a': case 'A': selectOption(0); break;
        case '2': case 'b': case 'B': selectOption(1); break;
        case '3': case 'c': case 'C': selectOption(2); break;
        case '4': case 'd': case 'D': selectOption(3); break;
        case '5': case 'e': case 'E': selectOption(4); break;
        case 'ArrowRight': case 'n': nextQuestion(); break;
        case 'ArrowLeft': case 'p': prevQuestion(); break;
        case 'f': toggleFlag(); break;
        case 'h': toggleHint(); break;
    }
});

// ========== STATISTICS & ANALYTICS ENGINE ==========
const STATS_KEY = 'synthesis_stats';
const SESSIONS_KEY = 'synthesis_sessions';

function getStats() {
    try {
        return JSON.parse(localStorage.getItem(STATS_KEY)) || createEmptyStats();
    } catch (e) {
        return createEmptyStats();
    }
}

function getSessions() {
    try {
        return JSON.parse(localStorage.getItem(SESSIONS_KEY)) || [];
    } catch (e) {
        return [];
    }
}

function createEmptyStats() {
    const stats = { totalCorrect: 0, totalWrong: 0, totalSkipped: 0, totalTime: 0, sessions: 0, subjects: {} };
    for (const key of Object.keys(SUBJECTS)) {
        stats.subjects[key] = { correct: 0, wrong: 0, skipped: 0 };
    }
    return stats;
}

function saveStats(stats) {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

function saveSessions(sessions) {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

function recordSession(correct, wrong, skipped, elapsedSeconds) {
    const stats = getStats();
    stats.totalCorrect += correct;
    stats.totalWrong += wrong;
    stats.totalSkipped += skipped;
    stats.totalTime += elapsedSeconds;
    stats.sessions++;

    // Per-subject breakdown
    if (state.currentSubject && state.currentSubject !== 'full_exam') {
        if (!stats.subjects[state.currentSubject]) {
            stats.subjects[state.currentSubject] = { correct: 0, wrong: 0, skipped: 0 };
        }
        stats.subjects[state.currentSubject].correct += correct;
        stats.subjects[state.currentSubject].wrong += wrong;
        stats.subjects[state.currentSubject].skipped += skipped;
    } else if (state.currentSubject === 'full_exam') {
        // Distribute across subjects proportionally for full exam
        // (simplified: just add to total, not per-subject)
    }

    saveStats(stats);

    // Record time-series session data
    const sessions = getSessions();
    sessions.push({
        date: new Date().toISOString(),
        correct: correct,
        wrong: wrong,
        skipped: skipped,
        elapsed: elapsedSeconds,
        subject: state.currentSubject,
        total: correct + wrong + skipped
    });
    // Keep last 50 sessions max
    if (sessions.length > 50) sessions.splice(0, sessions.length - 50);
    saveSessions(sessions);
}

function renderStatsDashboard() {
    const stats = getStats();
    const sessions = getSessions();
    const totalAnswered = stats.totalCorrect + stats.totalWrong + stats.totalSkipped;
    const accuracy = totalAnswered > 0 ? Math.round((stats.totalCorrect / (stats.totalCorrect + stats.totalWrong)) * 100) || 0 : 0;

    // Summary cards
    document.getElementById('statsTotalCorrect').textContent = stats.totalCorrect;
    document.getElementById('statsTotalWrong').textContent = stats.totalWrong;
    document.getElementById('statsTotalSkipped').textContent = stats.totalSkipped;
    document.getElementById('statsTotalAnswered').textContent = totalAnswered;
    document.getElementById('statsAccuracyValue').textContent = accuracy;

    // Accuracy ring animation
    const circumference = 263.894;
    const offset = circumference - (accuracy / 100) * circumference;
    const ring = document.getElementById('statsAccuracyRing');
    ring.style.strokeDashoffset = circumference;
    requestAnimationFrame(() => {
        setTimeout(() => { ring.style.strokeDashoffset = offset; }, 50);
    });

    // Time display
    const totalMin = Math.floor(stats.totalTime / 60);
    const totalHrs = Math.floor(totalMin / 60);
    const remMin = totalMin % 60;
    document.getElementById('statsTotalTime').textContent = `${totalHrs}j ${remMin}m`;
    document.getElementById('statsSessions').textContent = stats.sessions;
    const avgPerQ = totalAnswered > 0 ? Math.round(stats.totalTime / totalAnswered) : 0;
    document.getElementById('statsAvgPerQ').textContent = `${avgPerQ}d`;

    // Performance over time chart
    renderPerformanceChart(sessions);

    // Category breakdown
    renderCategoryBreakdown(stats);

    // Subject breakdown
    renderSubjectBreakdown(stats);
}

function renderPerformanceChart(sessions) {
    const canvas = document.getElementById('performanceChart');
    const emptyMsg = document.getElementById('chartEmptyMsg');
    const ctx = canvas.getContext('2d');

    // HiDPI support
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    const width = rect.width;
    const height = 260;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    if (sessions.length === 0) {
        canvas.style.display = 'none';
        emptyMsg.style.display = 'block';
        return;
    }
    canvas.style.display = 'block';
    emptyMsg.style.display = 'none';

    const padTop = 30, padBottom = 50, padLeft = 45, padRight = 20;
    const chartW = width - padLeft - padRight;
    const chartH = height - padTop - padBottom;

    // Data
    const data = sessions.slice(-20); // Last 20 sessions
    const maxVal = Math.max(1, ...data.map(s => s.correct + s.wrong));

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
        const y = padTop + (chartH / gridLines) * i;
        ctx.beginPath();
        ctx.moveTo(padLeft, y);
        ctx.lineTo(width - padRight, y);
        ctx.stroke();

        // Y-axis label
        ctx.fillStyle = 'rgba(184, 176, 160, 0.5)';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(maxVal - (maxVal / gridLines) * i), padLeft - 8, y + 4);
    }

    const barGroupW = chartW / data.length;
    const barW = Math.min(barGroupW * 0.35, 24);
    const gap = 3;

    data.forEach((s, i) => {
        const x = padLeft + barGroupW * i + barGroupW / 2;

        // Correct bar (green)
        const correctH = (s.correct / maxVal) * chartH;
        const correctY = padTop + chartH - correctH;
        ctx.fillStyle = 'rgba(74, 222, 128, 0.75)';
        roundRect(ctx, x - barW - gap/2, correctY, barW, correctH, 2);
        ctx.fill();

        // Wrong bar (red)
        const wrongH = (s.wrong / maxVal) * chartH;
        const wrongY = padTop + chartH - wrongH;
        ctx.fillStyle = 'rgba(192, 57, 43, 0.75)';
        roundRect(ctx, x + gap/2, wrongY, barW, wrongH, 2);
        ctx.fill();

        // X-axis label — session number
        ctx.fillStyle = 'rgba(184, 176, 160, 0.5)';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        const label = formatSessionDate(s.date);
        ctx.fillText(label, x, height - padBottom + 18);

        // Accuracy text above bars
        const sessionTotal = s.correct + s.wrong;
        if (sessionTotal > 0) {
            const acc = Math.round((s.correct / sessionTotal) * 100);
            ctx.fillStyle = 'rgba(201, 168, 76, 0.7)';
            ctx.font = 'bold 10px JetBrains Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillText(acc + '%', x, Math.min(correctY, wrongY) - 6);
        }
    });
}

function roundRect(ctx, x, y, w, h, r) {
    if (h < 1) return;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x, y + h);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

function formatSessionDate(isoDate) {
    try {
        const d = new Date(isoDate);
        return `${d.getDate()}/${d.getMonth()+1}`;
    } catch (e) {
        return '';
    }
}

function getCategoryStats(stats, catKey) {
    let correct = 0, wrong = 0, skipped = 0;
    for (const [subjKey, subjConfig] of Object.entries(SUBJECTS)) {
        if (subjConfig.catKey === catKey && stats.subjects[subjKey]) {
            correct += stats.subjects[subjKey].correct;
            wrong += stats.subjects[subjKey].wrong;
            skipped += stats.subjects[subjKey].skipped;
        }
    }
    return { correct, wrong, skipped };
}

function generateCategoryHTML(name, catStats) {
    const { correct, wrong, skipped } = catStats;
    const total = correct + wrong + skipped;
    const correctPct = total > 0 ? (correct / total * 100) : 0;
    const wrongPct = total > 0 ? (wrong / total * 100) : 0;
    const skippedPct = total > 0 ? (skipped / total * 100) : 0;

    return `
        <div class="stats-breakdown-item">
            <div class="stats-breakdown-header">
                <span class="stats-breakdown-name">${escapeHTML(name)}</span>
                <div class="stats-breakdown-counts">
                    <span class="correct-count">✓ ${correct}</span>
                    <span class="wrong-count">✗ ${wrong}</span>
                    <span>${total} total</span>
                </div>
            </div>
            <div class="stats-bar-track">
                <div class="stats-bar-correct" style="width:${correctPct}%"></div>
                <div class="stats-bar-wrong" style="width:${wrongPct}%"></div>
                <div class="stats-bar-skipped" style="width:${skippedPct}%"></div>
            </div>
        </div>
    `;
}

function renderCategoryBreakdown(stats) {
    const container = document.getElementById('statsCategoryBreakdown');
    let html = '';

    for (const [catKey, catInfo] of Object.entries(CATEGORY_METADATA)) {
        const catStats = getCategoryStats(stats, catKey);
        html += generateCategoryHTML(catInfo.name, catStats);
    }
    container.innerHTML = html;
}

function renderSubjectBreakdown(stats) {
    const container = document.getElementById('statsSubjectBreakdown');
    let html = `
        <div class="stats-subject-row stats-subject-row-header">
            <span>Mata Uji</span>
            <span style="text-align:center">Benar</span>
            <span style="text-align:center">Salah</span>
            <span style="text-align:center">Total</span>
            <span style="text-align:center">Akurasi</span>
        </div>
    `;

    for (const [key, config] of Object.entries(SUBJECTS)) {
        const s = stats.subjects[key] || { correct: 0, wrong: 0, skipped: 0 };
        const total = s.correct + s.wrong + s.skipped;
        const answered = s.correct + s.wrong;
        const accuracy = answered > 0 ? Math.round((s.correct / answered) * 100) + '%' : '—';

        html += `
            <div class="stats-subject-row">
                <span class="stats-subject-name">${escapeHTML(config.name)}</span>
                <span class="stats-subject-cell correct-val">${s.correct}</span>
                <span class="stats-subject-cell wrong-val">${s.wrong}</span>
                <span class="stats-subject-cell total-val">${total}</span>
                <span class="stats-subject-cell accuracy-val">${accuracy}</span>
            </div>
        `;
    }
    container.innerHTML = html;
}

// ========== RESET STATS ==========
function confirmResetStats() {
    document.getElementById('resetStatsModal').style.display = 'flex';
}

function closeResetModal() {
    document.getElementById('resetStatsModal').style.display = 'none';
}

function executeResetStats() {
    localStorage.removeItem(STATS_KEY);
    localStorage.removeItem(SESSIONS_KEY);
    closeResetModal();
    renderStatsDashboard();
}

// ========== HERO TITLE SCRAMBLE ANIMATION ==========
function initHero() {
    const titleEl = document.getElementById('heroTitle');
    if (!titleEl) return;

    const WORD = 'SYNTHESIS';
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    // Build individual letter spans
    titleEl.innerHTML = WORD.split('').map((ch, i) =>
        `<span class="letter" data-char="${ch}" data-index="${i}">${ch}</span>`
    ).join('');

    const letters = titleEl.querySelectorAll('.letter');

    function randomChar() {
        return CHARS[Math.floor(Math.random() * CHARS.length)];
    }

    function scrambleLetter(span, originalChar, ticks, callback) {
        let count = 0;
        span.classList.add('scrambling');
        const iv = setInterval(() => {
            span.textContent = randomChar();
            count++;
            if (count >= ticks) {
                clearInterval(iv);
                span.textContent = originalChar;
                span.classList.remove('scrambling');
                if (callback) callback();
            }
        }, 60);
    }

    function runScrambleCycle() {
        // Pick 3 unique random letter indices
        const indices = [];
        while (indices.length < 3) {
            const idx = Math.floor(Math.random() * WORD.length);
            if (!indices.includes(idx)) indices.push(idx);
        }

        let completed = 0;
        indices.forEach(idx => {
            const span = letters[idx];
            const original = span.dataset.char;
            const ticks = 6 + Math.floor(Math.random() * 5); // 6–10 ticks
            const delay = Math.floor(Math.random() * 200); // stagger each letter slightly
            setTimeout(() => {
                scrambleLetter(span, original, ticks, () => {
                    completed++;
                });
            }, delay);
        });

        // Schedule next cycle: 500–1500ms after current one (from start of this cycle)
        const nextDelay = 500 + Math.floor(Math.random() * 1000);
        setTimeout(runScrambleCycle, nextDelay);
    }

    // Start after a 1s initial delay
    setTimeout(runScrambleCycle, 1000);
}

