/**
 * ========================================
 * GAMES.JS - GAME MINI DAN KUIS
 * ========================================
 * File ini menghandle:
 * - Tebak suara hewan
 * - Cocokkan hewan dengan jumlah kaki
 * - Mini Kuis
 * - Sistem scoring
 */

const gamesPageHTML = `
    <div class="games-page page">
        <div class="page-content">
            <h1 class="page-title">🎮 Game & Kuis 🎮</h1>

            <!-- Game selector -->
            <div class="games-selector">
                <div class="game-card" data-game="sound">
                    <div class="game-icon">🔊</div>
                    <h2>Tebak Suara Hewan</h2>
                    <p>Dengarkan suara dan tebak hewan mana!</p>
                </div>

                <div class="game-card" data-game="legs">
                    <div class="game-icon">🦵</div>
                    <h2>Hitung Kaki</h2>
                    <p>Cocokkan hewan dengan jumlah kakinya</p>
                </div>

                <div class="game-card" data-game="quiz">
                    <div class="game-icon">❓</div>
                    <h2>Kuis Hewan</h2>
                    <p>Jawab pertanyaan tentang hewan</p>
                </div>

                <div class="game-card" data-game="memory">
                    <div class="game-icon">🧠</div>
                    <h2>Memory Game</h2>
                    <p>Temukan pasangan hewan yang sama</p>
                </div>
            </div>

            <!-- Game content area -->
            <div class="game-content" id="gameContent"></div>
        </div>
    </div>
`;

const gamesPageCSS = `
    <style>
    .games-page {
        animation: fadeIn 0.5s ease;
    }

    /* Games selector */
    .games-selector {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-bottom: 40px;
    }

    .game-card {
        background: white;
        border-radius: 15px;
        padding: 30px 20px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        border: 3px solid transparent;
    }

    .game-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        border-color: var(--primary-color);
    }

    .game-card:active {
        transform: translateY(-5px);
    }

    .game-icon {
        font-size: 60px;
        margin-bottom: 15px;
        animation: pulse 1.5s ease infinite;
    }

    .game-card:nth-child(1) .game-icon { animation-delay: 0s; }
    .game-card:nth-child(2) .game-icon { animation-delay: 0.1s; }
    .game-card:nth-child(3) .game-icon { animation-delay: 0.2s; }
    .game-card:nth-child(4) .game-icon { animation-delay: 0.3s; }

    .game-card h2 {
        font-size: 18px;
        color: var(--dark-color);
        margin-bottom: 10px;
    }

    .game-card p {
        font-size: 13px;
        color: #7f8c8d;
    }

    /* Game content */
    .game-content {
        background: white;
        border-radius: 15px;
        padding: 30px;
        min-height: 400px;
        display: none;
    }

    .game-content.active {
        display: block;
        animation: fadeIn 0.3s ease;
    }

    .game-header {
        text-align: center;
        margin-bottom: 30px;
    }

    .game-title {
        font-size: 28px;
        color: var(--dark-color);
        margin-bottom: 10px;
    }

    .game-progress {
        font-size: 16px;
        color: #7f8c8d;
        margin-bottom: 20px;
    }

    .progress-bar {
        width: 100%;
        height: 10px;
        background: #e0e0e0;
        border-radius: 10px;
        overflow: hidden;
        margin-top: 10px;
    }

    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        transition: width 0.3s ease;
    }

    /* Game back button */
    .game-back-btn {
        display: inline-block;
        margin-bottom: 20px;
    }

    /* Score display */
    .score-display {
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        border-radius: 10px;
        padding: 20px;
        text-align: center;
        margin-bottom: 20px;
    }

    .score-value {
        font-size: 48px;
        font-weight: bold;
    }

    .score-label {
        font-size: 14px;
        opacity: 0.9;
    }

    /* Responsive */
    @media screen and (max-width: 768px) {
        .games-selector {
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
        }

        .game-card {
            padding: 20px 15px;
        }

        .game-icon {
            font-size: 45px;
        }

        .game-card h2 {
            font-size: 16px;
        }

        .game-card p {
            font-size: 12px;
        }

        .game-content {
            padding: 20px;
        }
    }

    @media screen and (max-width: 480px) {
        .games-selector {
            grid-template-columns: 1fr;
        }

        .game-title {
            font-size: 22px;
        }

        .score-value {
            font-size: 36px;
        }
    }
    </style>
`;

/**
 * Load Games content
 */
function loadQuizContent() {
    // Insert HTML
    const container = document.querySelector('.container');
    if (!document.querySelector('.games-page')) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = gamesPageHTML;
        container.appendChild(tempDiv.firstElementChild);
    }

    // Insert CSS
    if (!document.querySelector('style[data-games]')) {
        const styleTag = document.createElement('style');
        styleTag.setAttribute('data-games', 'true');
        styleTag.innerHTML = gamesPageCSS.replace('<style>', '').replace('</style>', '');
        document.head.appendChild(styleTag);
    }

    // Show games page
    const gamesPage = document.querySelector('.games-page');
    if (gamesPage) {
        gamesPage.classList.add('active');
    }

    // Setup event listeners
    setupGamesEventListeners();
}

/**
 * Setup games event listeners
 */
function setupGamesEventListeners() {
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('click', () => {
            const game = card.getAttribute('data-game');
            startGame(game);
        });
    });
}

/**
 * Start game
 * @param {string} game - Game type
 */
function startGame(game) {
    playSound('click');
    const gameContent = document.getElementById('gameContent');
    
    if (!gameContent) return;

    gameContent.classList.add('active');

    switch (game) {
        case 'sound':
            initSoundGuessGame();
            break;
        case 'legs':
            initLegsMatchingGame();
            break;
        case 'quiz':
            initQuizGame();
            break;
        case 'memory':
            initMemoryGame();
            break;
    }
}

/**
 * Go back from game
 */
function backFromGame() {
    playSound('click');
    const gameContent = document.getElementById('gameContent');
    if (gameContent) {
        gameContent.classList.remove('active');
        gameContent.innerHTML = '';
    }
}

// ========== GAME 1: TEBAK SUARA HEWAN ==========

let soundGameState = {
    currentIdx: 0,
    score: 0,
    totalQuestions: 5,
    answered: false,
    questions: []
};

function initSoundGuessGame() {
    soundGameState.currentIdx = 0;
    soundGameState.score = 0;
    soundGameState.answered = false;

    // Create questions
    soundGameState.questions = shuffleArray(animals).slice(0, soundGameState.totalQuestions);

    displaySoundGuessQuestion();
}

function displaySoundGuessQuestion() {
    const idx = soundGameState.currentIdx;
    const question = soundGameState.questions[idx];

    const gameContent = document.getElementById('gameContent');
    if (!gameContent) return;

    gameContent.innerHTML = `
        <button class="btn btn-secondary game-back-btn" onclick="backFromGame()">⬅️ Kembali</button>
        
        <div class="game-header">
            <h2 class="game-title">🔊 Tebak Suara Hewan</h2>
            <div class="game-progress">
                Soal ${idx + 1} dari ${soundGameState.totalQuestions}
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${((idx + 1) / soundGameState.totalQuestions) * 100}%"></div>
                </div>
            </div>
        </div>

        <div class="score-display">
            <div class="score-label">Skor Anda</div>
            <div class="score-value">${soundGameState.score}/${soundGameState.totalQuestions}</div>
        </div>

        <div style="text-align: center; margin: 30px 0;">
            <p style="font-size: 18px; margin-bottom: 20px; color: #7f8c8d;">
                Tekan tombol di bawah untuk mendengarkan suara, lalu pilih hewan yang benar!
            </p>
            <button class="btn btn-primary" id="playSoundBtn" style="font-size: 18px; padding: 15px 30px;">
                🔊 Putar Suara
            </button>
        </div>

        <div class="sound-options" id="soundOptions" style="display: none; margin: 30px 0;">
            <h3 style="text-align: center; margin-bottom: 20px;">Hewan mana yang berbunyi?</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 15px;">
                ${shuffleArray(animals).slice(0, 4).map((a, i) => `
                    <button class="sound-option-btn" data-animal-id="${a.id}" data-correct="${a.id === question.id}">
                        <div style="font-size: 50px; margin-bottom: 10px;">${a.icon}</div>
                        <div style="font-size: 14px; font-weight: bold;">${a.name}</div>
                    </button>
                `).join('')}
            </div>
        </div>

        <div id="soundFeedback"></div>
    `;

    const playBtn = document.getElementById('playSoundBtn');
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            playSound(`animal-${question.name.toLowerCase()}`);
            document.getElementById('soundOptions').style.display = 'block';

            const options = document.querySelectorAll('.sound-option-btn');
            options.forEach(btn => {
                btn.addEventListener('click', () => {
                    const isCorrect = btn.getAttribute('data-correct') === 'true';
                    checkSoundAnswer(isCorrect, question);
                });
            });
        });
    }
}

function checkSoundAnswer(isCorrect, question) {
    if (soundGameState.answered) return;
    soundGameState.answered = true;

    if (isCorrect) {
        playSound('success');
        soundGameState.score++;
    }

    const feedback = document.getElementById('soundFeedback');
    if (feedback) {
        feedback.innerHTML = `
            <div style="text-align: center; margin: 20px 0;">
                <p style="font-size: 20px; font-weight: bold; color: ${isCorrect ? 'var(--success-color)' : 'var(--primary-color)'};">
                    ${isCorrect ? '🎉 Benar!' : '❌ Salah!'}
                </p>
                <p style="font-size: 16px; color: #7f8c8d; margin: 10px 0;">
                    Jawabannya adalah: <strong>${question.name}</strong>
                </p>
            </div>
            <button class="btn btn-secondary" id="nextSoundBtn" style="width: 100%; margin-top: 20px;">
                ${soundGameState.currentIdx >= soundGameState.totalQuestions - 1 ? 'Lihat Hasil' : 'Soal Berikutnya ➡️'}
            </button>
        `;

        document.getElementById('nextSoundBtn').addEventListener('click', () => {
            if (soundGameState.currentIdx >= soundGameState.totalQuestions - 1) {
                showGameScore();
            } else {
                soundGameState.currentIdx++;
                soundGameState.answered = false;
                displaySoundGuessQuestion();
            }
        });
    }
}

// ========== GAME 2: HITUNG KAKI ==========

let legsGameState = {
    currentIdx: 0,
    score: 0,
    totalQuestions: 5,
    answered: false,
    questions: []
};

function initLegsMatchingGame() {
    legsGameState.currentIdx = 0;
    legsGameState.score = 0;
    legsGameState.answered = false;

    // Create questions
    legsGameState.questions = shuffleArray(animals).slice(0, legsGameState.totalQuestions);

    displayLegsQuestion();
}

function displayLegsQuestion() {
    const idx = legsGameState.currentIdx;
    const question = legsGameState.questions[idx];

    const gameContent = document.getElementById('gameContent');
    if (!gameContent) return;

    // Create options
    const options = new Set([question.legs]);
    const possibleLegs = [0, 2, 4, 6, 8];
    
    while (options.size < 4) {
        options.add(getRandomItem(possibleLegs));
    }

    const optionsArray = shuffleArray(Array.from(options));

    gameContent.innerHTML = `
        <button class="btn btn-secondary game-back-btn" onclick="backFromGame()">⬅️ Kembali</button>
        
        <div class="game-header">
            <h2 class="game-title">🦵 Cocokkan Jumlah Kaki</h2>
            <div class="game-progress">
                Soal ${idx + 1} dari ${legsGameState.totalQuestions}
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${((idx + 1) / legsGameState.totalQuestions) * 100}%"></div>
                </div>
            </div>
        </div>

        <div class="score-display">
            <div class="score-label">Skor Anda</div>
            <div class="score-value">${legsGameState.score}/${legsGameState.totalQuestions}</div>
        </div>

        <div style="text-align: center; margin: 30px 0;">
            <div style="font-size: 80px; margin-bottom: 20px;">${question.icon}</div>
            <h3 style="font-size: 20px; margin-bottom: 20px;">Berapa kaki ${question.name}?</h3>
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; max-width: 300px; margin: 0 auto;">
                ${optionsArray.map(opt => `
                    <button class="legs-option-btn" data-answer="${opt}" data-correct="${opt === question.legs}">
                        <div style="font-size: 36px; font-weight: bold; color: var(--primary-color);">${opt}</div>
                    </button>
                `).join('')}
            </div>
        </div>

        <div id="legsFeedback"></div>
    `;

    const optionBtns = document.querySelectorAll('.legs-option-btn');
    optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isCorrect = btn.getAttribute('data-correct') === 'true';
            checkLegsAnswer(isCorrect, question);
        });
    });
}

function checkLegsAnswer(isCorrect, question) {
    if (legsGameState.answered) return;
    legsGameState.answered = true;

    if (isCorrect) {
        playSound('success');
        legsGameState.score++;
    }

    const feedback = document.getElementById('legsFeedback');
    if (feedback) {
        feedback.innerHTML = `
            <div style="text-align: center; margin: 20px 0;">
                <p style="font-size: 20px; font-weight: bold; color: ${isCorrect ? 'var(--success-color)' : 'var(--primary-color)'};">
                    ${isCorrect ? '🎉 Benar!' : '❌ Salah!'}
                </p>
                <p style="font-size: 16px; color: #7f8c8d; margin: 10px 0;">
                    ${question.name} mempunyai <strong>${question.legs} kaki</strong>
                </p>
            </div>
            <button class="btn btn-secondary" id="nextLegsBtn" style="width: 100%; margin-top: 20px;">
                ${legsGameState.currentIdx >= legsGameState.totalQuestions - 1 ? 'Lihat Hasil' : 'Soal Berikutnya ➡️'}
            </button>
        `;

        document.getElementById('nextLegsBtn').addEventListener('click', () => {
            if (legsGameState.currentIdx >= legsGameState.totalQuestions - 1) {
                showGameScore();
            } else {
                legsGameState.currentIdx++;
                legsGameState.answered = false;
                displayLegsQuestion();
            }
        });
    }
}

// ========== GAME 3: KUIS HEWAN ==========

let quizGameState = {
    currentIdx: 0,
    score: 0,
    totalQuestions: 5,
    answered: false,
    questions: []
};

function initQuizGame() {
    quizGameState.currentIdx = 0;
    quizGameState.score = 0;
    quizGameState.answered = false;

    // Create quiz questions
    quizGameState.questions = createQuizQuestions();

    displayQuizQuestion();
}

function createQuizQuestions() {
    const questions = [
        { question: 'Hewan apa yang tidur 20 jam sehari?', correct: 'Singa', options: ['Singa', 'Gajah', 'Kucing', 'Burung'] },
        { question: 'Jerapah memiliki lidah sepanjang berapa cm?', correct: '50 cm', options: ['50 cm', '30 cm', '70 cm', '20 cm'] },
        { question: 'Berapa banyak mata yang dimiliki kupu-kupu?', correct: '12.000', options: ['12.000', '5.000', '1.000', '50.000'] },
        { question: 'Hewan apa yang paling tinggi di dunia?', correct: 'Jerapah', options: ['Jerapah', 'Gajah', 'Burung unta', 'Zebra'] },
        { question: 'Ikan tidak bisa apa?', correct: 'Menutup mata', options: ['Menutup mata', 'Berenang', 'Makan', 'Bernafas'] },
    ];

    return shuffleArray(questions).slice(0, quizGameState.totalQuestions);
}

function displayQuizQuestion() {
    const idx = quizGameState.currentIdx;
    const question = quizGameState.questions[idx];

    const gameContent = document.getElementById('gameContent');
    if (!gameContent) return;

    const optionsShuffled = shuffleArray(question.options);

    gameContent.innerHTML = `
        <button class="btn btn-secondary game-back-btn" onclick="backFromGame()">⬅️ Kembali</button>
        
        <div class="game-header">
            <h2 class="game-title">❓ Kuis Hewan</h2>
            <div class="game-progress">
                Soal ${idx + 1} dari ${quizGameState.totalQuestions}
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${((idx + 1) / quizGameState.totalQuestions) * 100}%"></div>
                </div>
            </div>
        </div>

        <div class="score-display">
            <div class="score-label">Skor Anda</div>
            <div class="score-value">${quizGameState.score}/${quizGameState.totalQuestions}</div>
        </div>

        <div style="background: #F0F8FF; border-left: 4px solid var(--secondary-color); padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="font-size: 18px; color: var(--dark-color); font-weight: bold; text-align: center;">
                ${question.question}
            </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin: 30px 0;">
            ${optionsShuffled.map((opt, i) => `
                <button class="quiz-option-btn" data-answer="${opt}" data-correct="${opt === question.correct}">
                    ${opt}
                </button>
            `).join('')}
        </div>

        <div id="quizFeedback"></div>
    `;

    const optionBtns = document.querySelectorAll('.quiz-option-btn');
    optionBtns.forEach(btn => {
        btn.style.padding = '15px';
        btn.style.fontSize = '16px';
        btn.style.fontWeight = 'bold';
        btn.style.cursor = 'pointer';
        btn.style.backgroundColor = 'white';
        btn.style.border = '2px solid #ddd';
        btn.style.borderRadius = '10px';
        btn.style.transition = 'all 0.3s ease';
        
        btn.addEventListener('mouseover', () => {
            btn.style.borderColor = 'var(--primary-color)';
            btn.style.transform = 'translateY(-3px)';
        });

        btn.addEventListener('mouseout', () => {
            btn.style.borderColor = '#ddd';
            btn.style.transform = 'translateY(0)';
        });

        btn.addEventListener('click', () => {
            const isCorrect = btn.getAttribute('data-correct') === 'true';
            checkQuizAnswer(isCorrect, question);
        });
    });
}

function checkQuizAnswer(isCorrect, question) {
    if (quizGameState.answered) return;
    quizGameState.answered = true;

    if (isCorrect) {
        playSound('success');
        quizGameState.score++;
    }

    const feedback = document.getElementById('quizFeedback');
    if (feedback) {
        feedback.innerHTML = `
            <div style="text-align: center; margin: 20px 0;">
                <p style="font-size: 20px; font-weight: bold; color: ${isCorrect ? 'var(--success-color)' : 'var(--primary-color)'};">
                    ${isCorrect ? '🎉 Benar!' : '❌ Salah!'}
                </p>
                <p style="font-size: 16px; color: #7f8c8d; margin: 10px 0;">
                    Jawabannya: <strong>${question.correct}</strong>
                </p>
            </div>
            <button class="btn btn-secondary" id="nextQuizBtn" style="width: 100%; margin-top: 20px;">
                ${quizGameState.currentIdx >= quizGameState.totalQuestions - 1 ? 'Lihat Hasil' : 'Soal Berikutnya ➡️'}
            </button>
        `;

        document.getElementById('nextQuizBtn').addEventListener('click', () => {
            if (quizGameState.currentIdx >= quizGameState.totalQuestions - 1) {
                showGameScore();
            } else {
                quizGameState.currentIdx++;
                quizGameState.answered = false;
                displayQuizQuestion();
            }
        });
    }
}

// ========== GAME 4: MEMORY GAME ==========

let memoryGameState = {
    cards: [],
    flipped: [],
    matched: 0,
    score: 0,
    moves: 0
};

function initMemoryGame() {
    memoryGameState.cards = [];
    memoryGameState.flipped = [];
    memoryGameState.matched = 0;
    memoryGameState.score = 100;
    memoryGameState.moves = 0;

    // Create pairs
    const selectedAnimals = shuffleArray(animals).slice(0, 6);
    const pairs = [...selectedAnimals, ...selectedAnimals];
    memoryGameState.cards = shuffleArray(pairs);

    displayMemoryGame();
}

function displayMemoryGame() {
    const gameContent = document.getElementById('gameContent');
    if (!gameContent) return;

    gameContent.innerHTML = `
        <button class="btn btn-secondary game-back-btn" onclick="backFromGame()">⬅️ Kembali</button>
        
        <div class="game-header">
            <h2 class="game-title">🧠 Memory Game</h2>
            <div class="score-display">
                <div class="score-label">Skor</div>
                <div class="score-value">${memoryGameState.score}</div>
            </div>
            <p style="text-align: center; color: #7f8c8d;">Gerakan: ${memoryGameState.moves}</p>
        </div>

        <div class="memory-grid" id="memoryGrid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 30px 0;">
            ${memoryGameState.cards.map((animal, idx) => `
                <button class="memory-card" data-idx="${idx}" data-animal-id="${animal.id}">
                    <div class="memory-card-inner">
                        <div class="memory-card-front">?</div>
                        <div class="memory-card-back">${animal.icon}</div>
                    </div>
                </button>
            `).join('')}
        </div>

        <div id="memoryFeedback"></div>
    `;

    // Style memory cards
    const style = document.createElement('style');
    style.textContent = `
        .memory-card {
            width: 100%;
            aspect-ratio: 1;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
            perspective: 1000px;
        }

        .memory-card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            transition: transform 0.6s;
            transform-style: preserve-3d;
        }

        .memory-card.flipped .memory-card-inner {
            transform: rotateY(180deg);
        }

        .memory-card-front, .memory-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            backface-visibility: hidden;
            font-size: 40px;
            font-weight: bold;
            border-radius: 10px;
        }

        .memory-card-front {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
        }

        .memory-card-back {
            background: white;
            border: 2px solid #ddd;
            transform: rotateY(180deg);
        }

        .memory-grid {
            max-width: 400px;
            margin: 30px auto !important;
        }

        @media screen and (max-width: 480px) {
            .memory-grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }
    `;
    document.head.appendChild(style);

    const cards = document.querySelectorAll('.memory-card');
    cards.forEach(card => {
        card.addEventListener('click', () => flipMemoryCard(card));
    });
}

function flipMemoryCard(card) {
    if (memoryGameState.flipped.length >= 2 || card.classList.contains('matched')) return;

    card.classList.add('flipped');
    memoryGameState.flipped.push(card);

    if (memoryGameState.flipped.length === 2) {
        memoryGameState.moves++;
        checkMemoryMatch();
    }
}

function checkMemoryMatch() {
    const [card1, card2] = memoryGameState.flipped;
    const id1 = card1.getAttribute('data-animal-id');
    const id2 = card2.getAttribute('data-animal-id');

    if (id1 === id2) {
        playSound('success');
        card1.classList.add('matched');
        card2.classList.add('matched');
        memoryGameState.matched++;

        memoryGameState.flipped = [];

        if (memoryGameState.matched === memoryGameState.cards.length / 2) {
            showGameScore('memory');
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            memoryGameState.flipped = [];
        }, 1000);
    }

    memoryGameState.score = Math.max(0, 100 - memoryGameState.moves * 5);
    document.querySelector('.score-value').textContent = memoryGameState.score;
    document.querySelector('[style*="Gerakan"]').textContent = `Gerakan: ${memoryGameState.moves}`;
}

// ========== SHOW GAME SCORE ==========

function showGameScore(gameType = null) {
    const gameContent = document.getElementById('gameContent');
    if (!gameContent) return;

    let score = 0, total = 0, message = '';

    if (gameType === 'memory') {
        score = memoryGameState.score;
        total = 100;
        message = score >= 80 ? '🎉 Luar Biasa!' : score >= 60 ? '✓ Bagus!' : 'Coba lagi!';
    } else {
        // Determine which game was played
        score = soundGameState.score || legsGameState.score || quizGameState.score;
        total = soundGameState.totalQuestions || legsGameState.totalQuestions || quizGameState.totalQuestions;
        const percentage = (score / total) * 100;
        message = percentage === 100 ? '🎉 Sempurna!' : percentage >= 70 ? '✓ Bagus!' : '❌ Coba lagi!';
    }

    gameContent.innerHTML = `
        <div style="text-align: center; padding: 40px 20px;">
            <h2 style="font-size: 28px; margin-bottom: 20px; color: var(--dark-color);">Hasil Akhir</h2>
            
            <div style="font-size: 60px; margin: 30px 0;">
                ${message.includes('Sempurna') || message.includes('Luar') ? '🏆' : message.includes('Bagus') ? '🎖️' : '💪'}
            </div>

            <div class="score-display" style="max-width: 300px; margin: 30px auto;">
                <div class="score-label">Skor Akhir</div>
                <div class="score-value">${score}/${total}</div>
            </div>

            <p style="font-size: 20px; font-weight: bold; color: var(--dark-color); margin: 20px 0;">
                ${message}
            </p>

            <p style="font-size: 16px; color: #7f8c8d; margin: 20px 0;">
                ${score === total ? '👏 Kamu sempurna! Hebat sekali!' : `Kamu benar ${score} dari ${total}. Terus berlatih!`}
            </p>

            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; margin-top: 30px;">
                <button class="btn btn-primary" onclick="backFromGame()">
                    🏠 Kembali ke Game
                </button>
                <button class="btn btn-secondary" onclick="navigateToPage('home')">
                    🏡 Kembali ke Home
                </button>
            </div>
        </div>
    `;
}
