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
});

function updateSubjectCounts() {
    let categoryTotals = { tps: 0, tkd: 0, saintek: 0, soshum: 0, adv: 0 };
    let grandTotal = 0;

    for (const [key, config] of Object.entries(SUBJECTS)) {
        const count = (QUESTION_BANK[key] || []).length;
        const el = document.getElementById(`count-${key}`);
        if (el) el.textContent = count;
        if (!categoryTotals[config.catKey]) categoryTotals[config.catKey] = 0;
        categoryTotals[config.catKey] += count;
        grandTotal += count;
    }

    for (const [cat, total] of Object.entries(categoryTotals)) {
        const el = document.getElementById(`count-${cat}`);
        if (el) el.textContent = `${total} soal`;
    }

    const totalEl = document.getElementById('totalQuestions');
    if (totalEl) totalEl.textContent = grandTotal;
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
    state.questions = shuffleArray([...questions]);
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
    state.questions = shuffleArray(allQuestions).slice(0, 165);
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
        document.getElementById('explanationIcon').textContent = isCorrect ? '✅' : '❌';
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

function formatText(text) {
    if (!text) return '';
    // Basic formatting: support for newlines and simple formatting
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code style="background:rgba(0,0,0,0.3);padding:2px 6px;border-radius:4px;font-family:var(--font-mono);font-size:0.9em;">$1</code>')
        .replace(/\n/g, '<br>');
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
