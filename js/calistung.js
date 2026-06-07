/**
 * ========================================
 * CALISTUNG.JS - MODUL CALISTUNG
 * ========================================
 * File ini menghandle:
 * - Belajar membaca (matching huruf awal hewan)
 * - Belajar menulis (tracing nama hewan)
 * - Belajar berhitung (menghitung bagian tubuh hewan)
 */

// ==========================================
// DATA HEWAN UNTUK CALISTUNG
// ==========================================

const calistungAnimals = [
    {
        name: 'Singa',
        emoji: '🦁',
        firstLetter: 'S',
        legs: 4,
        ears: 2,
        eyes: 2,
        countingQuestions: [
            { type: 'legs', answer: 4, text: 'Berapa kaki singa? 🦁' },
            { type: 'ears', answer: 2, text: 'Berapa telinga singa? 👂' },
            { type: 'eyes', answer: 2, text: 'Berapa mata singa? 👀' }
        ]
    },
    {
        name: 'Gajah',
        emoji: '🐘',
        firstLetter: 'G',
        legs: 4,
        ears: 2,
        eyes: 2,
        countingQuestions: [
            { type: 'legs', answer: 4, text: 'Berapa kaki gajah? 🐘' },
            { type: 'ears', answer: 2, text: 'Berapa telinga gajah? 👂' }
        ]
    },
    {
        name: 'Harimau',
        emoji: '🐯',
        firstLetter: 'H',
        legs: 4,
        ears: 2,
        eyes: 2,
        countingQuestions: [
            { type: 'legs', answer: 4, text: 'Berapa kaki harimau? 🐯' }
        ]
    },
    {
        name: 'Burung',
        emoji: '🐦',
        firstLetter: 'B',
        legs: 2,
        ears: 0,
        eyes: 2,
        countingQuestions: [
            { type: 'legs', answer: 2, text: 'Berapa kaki burung? 🐦' },
            { type: 'eyes', answer: 2, text: 'Berapa mata burung? 👀' }
        ]
    },
    {
        name: 'Kucing',
        emoji: '🐱',
        firstLetter: 'K',
        legs: 4,
        ears: 2,
        eyes: 2,
        countingQuestions: [
            { type: 'legs', answer: 4, text: 'Berapa kaki kucing? 🐱' }
        ]
    }
];

// ==========================================
// STATE GLOBAL
// ==========================================

let calistungState = {
    currentTab: 'membaca',
    matchingAnswers: {},
    writingCanvas: null,
    writingCtx: null,
    isDrawing: false,
    countingIndex: 0,
    currentCountingQuestion: null,
    selectedAnswer: null
};

// ==========================================
// INITIALIZE CALISTUNG
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Calistung initialized');
    initCalistung();
});

function initCalistung() {
    // Initialize canvas untuk menulis
    const canvas = document.getElementById('tracingCanvas');
    if (canvas) {
        calistungState.writingCanvas = canvas;
        calistungState.writingCtx = canvas.getContext('2d');
        initCanvas();
    }

    // Initialize select untuk memilih hewan
    const select = document.getElementById('animalSelectWrite');
    if (select) {
        calistungAnimals.forEach(animal => {
            const option = document.createElement('option');
            option.value = animal.name;
            option.textContent = `${animal.emoji} ${animal.name}`;
            select.appendChild(option);
        });
    }

    // Initialize matching game
    initMatching();

    // Initialize counting game
    initCounting();
}

// ==========================================
// TAB SWITCHING
// ==========================================

function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Deactivate all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    const tabElement = document.getElementById(tabName);
    if (tabElement) {
        tabElement.classList.add('active');
    }

    // Activate selected button
    event.target.classList.add('active');
    calistungState.currentTab = tabName;

    // Re-initialize jika diperlukan
    if (tabName === 'menghitung') {
        initCounting();
    }
}

// ==========================================
// SECTION 1: MEMBACA (MATCHING GAME)
// ==========================================

function initMatching() {
    const animalsContainer = document.getElementById('matchingAnimals');
    const lettersContainer = document.getElementById('matchingLetters');

    if (!animalsContainer || !lettersContainer) return;

    animalsContainer.innerHTML = '';
    lettersContainer.innerHTML = '';

    // Shuffle animals untuk variasi
    const shuffledAnimals = [...calistungAnimals].sort(() => Math.random() - 0.5).slice(0, 5);
    const shuffledLetters = [...shuffledAnimals].sort(() => Math.random() - 0.5);

    // Reset matching answers
    calistungState.matchingAnswers = {};

    // Create animal items
    shuffledAnimals.forEach((animal, index) => {
        const animalEl = document.createElement('div');
        animalEl.className = 'animal-item';
        animalEl.draggable = true;
        animalEl.id = `animal-${index}`;
        animalEl.dataset.animalName = animal.name;
        animalEl.innerHTML = `
            <div class="animal-emoji">${animal.emoji}</div>
            <div class="animal-name">${animal.name}</div>
        `;

        animalEl.addEventListener('dragstart', dragStart);
        animalEl.addEventListener('dragend', dragEnd);

        animalsContainer.appendChild(animalEl);
    });

    // Create letter items
    shuffledLetters.forEach((animal, index) => {
        const letterEl = document.createElement('div');
        letterEl.className = 'letter-item';
        letterEl.id = `letter-${index}`;
        letterEl.dataset.correctAnimal = animal.name;
        letterEl.dataset.firstLetter = animal.firstLetter;
        letterEl.textContent = animal.firstLetter;

        letterEl.addEventListener('dragover', dragOver);
        letterEl.addEventListener('drop', drop);

        lettersContainer.appendChild(letterEl);
    });
}

function dragStart(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', e.target.closest('.animal-item').id);
    e.target.closest('.animal-item').classList.add('dragging');
}

function dragEnd(e) {
    e.target.closest('.animal-item').classList.remove('dragging');
}

function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function drop(e) {
    e.preventDefault();
    const animalId = e.dataTransfer.getData('text/plain');
    const animalEl = document.getElementById(animalId);
    const animalName = animalEl.dataset.animalName;
    const letterEl = e.target.closest('.letter-item');
    const correctAnimal = letterEl.dataset.correctAnimal;

    // Check if correct
    if (animalName === correctAnimal) {
        letterEl.classList.add('matched');
        letterEl.classList.remove('wrong');
        calistungState.matchingAnswers[letterEl.id] = animalName;
        playSound('correct');
    } else {
        letterEl.classList.remove('matched');
        letterEl.classList.add('wrong');
        playSound('wrong');
        setTimeout(() => {
            letterEl.classList.remove('wrong');
        }, 500);
    }
}

function checkMatching() {
    const letterItems = document.querySelectorAll('.letter-item');
    let allCorrect = true;

    letterItems.forEach(letter => {
        const correctAnimal = letter.dataset.correctAnimal;
        const matched = letter.classList.contains('matched');

        if (!matched) {
            allCorrect = false;
            letter.classList.add('wrong');
            setTimeout(() => {
                letter.classList.remove('wrong');
            }, 500);
        }
    });

    if (allCorrect) {
        alert('🎉 Sempurna! Semua jawaban benar! 🎉');
        playSound('correct');
        setTimeout(() => initMatching(), 1000);
    } else {
        alert('❌ Ada yang belum sesuai. Coba lagi!');
        playSound('wrong');
    }
}

// ==========================================
// SECTION 2: MENULIS (TRACING + VALIDATION)
// ==========================================

// State untuk tracking attempt
let writingState = {
    currentAnimal: null,
    attemptCount: 0,
    maxAttempts: 3,
    hintShown: false,
    answered: false
};

function initCanvas() {
    const canvas = calistungState.writingCanvas;
    const ctx = calistungState.writingCtx;

    if (!canvas || !ctx) return;

    // Set canvas background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw border
    ctx.strokeStyle = '#4ECDC4';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Add event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch events untuk mobile
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', stopDrawing);
}

function startDrawing(e) {
    calistungState.isDrawing = true;
    const rect = calistungState.writingCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    calistungState.writingCtx.beginPath();
    calistungState.writingCtx.moveTo(x, y);
}

function draw(e) {
    if (!calistungState.isDrawing) return;
    const rect = calistungState.writingCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = calistungState.writingCtx;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#FF6B6B';
    ctx.lineTo(x, y);
    ctx.stroke();
}

function stopDrawing() {
    calistungState.isDrawing = false;
}

function handleTouchStart(e) {
    e.preventDefault();
    calistungState.isDrawing = true;
    const touch = e.touches[0];
    const rect = calistungState.writingCanvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    calistungState.writingCtx.beginPath();
    calistungState.writingCtx.moveTo(x, y);
}

function handleTouchMove(e) {
    if (!calistungState.isDrawing) return;
    e.preventDefault();
    const touch = e.touches[0];
    const rect = calistungState.writingCanvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const ctx = calistungState.writingCtx;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#FF6B6B';
    ctx.lineTo(x, y);
    ctx.stroke();
}

function clearCanvas() {
    const canvas = calistungState.writingCanvas;
    const ctx = calistungState.writingCtx;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw border
    ctx.strokeStyle = '#4ECDC4';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Clear input text juga
    const textInput = document.getElementById('writingTextInput');
    if (textInput) {
        textInput.value = '';
        textInput.style.borderColor = '#4ECDC4';
    }

    // Reset state
    writingState.attemptCount = 0;
    writingState.hintShown = false;
    updateHintDisplay();
}

function initWriting() {
    const select = document.getElementById('animalSelectWrite');
    const selectedName = select.value;

    if (!selectedName) {
        alert('Silakan pilih hewan terlebih dahulu!');
        return;
    }

    // Find animal object
    writingState.currentAnimal = calistungAnimals.find(a => a.name === selectedName);
    writingState.attemptCount = 0;
    writingState.hintShown = false;
    writingState.answered = false;

    clearCanvas();
    updateReferenceDisplay();
    updateHintDisplay();
    clearFeedback();

    // Draw guide text (faded)
    const ctx = calistungState.writingCtx;
    const canvas = calistungState.writingCanvas;

    ctx.font = 'bold 80px Arial';
    ctx.fillStyle = 'rgba(78, 205, 196, 0.15)';
    ctx.textAlign = 'center';
    ctx.fillText(selectedName, canvas.width / 2, canvas.height / 2 + 25);
    
    // Reset untuk draw lagi
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#4ECDC4';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function updateReferenceDisplay() {
    const referenceEl = document.getElementById('writingReference');
    if (writingState.currentAnimal && referenceEl) {
        referenceEl.textContent = writingState.currentAnimal.name.toUpperCase();
        referenceEl.style.color = '#FF6B6B';
    }
}

function updateHintDisplay() {
    const hintArea = document.getElementById('writingHintArea');
    if (!hintArea) return;

    hintArea.innerHTML = '';

    if (writingState.answered) return;

    // Show attempt counter
    const remainingAttempts = writingState.maxAttempts - writingState.attemptCount;
    if (remainingAttempts > 0) {
        const attemptText = document.createElement('div');
        attemptText.textContent = `Percobaan: ${writingState.attemptCount}/${writingState.maxAttempts}`;
        hintArea.appendChild(attemptText);
    }

    // Show hint setelah 2 attempt
    if (writingState.attemptCount >= 2 && !writingState.hintShown && writingState.currentAnimal) {
        writingState.hintShown = true;
        const hintEl = document.createElement('div');
        hintEl.style.marginTop = '10px';
        hintEl.style.color = '#FF6B6B';
        hintEl.style.fontWeight = 'bold';
        hintEl.textContent = `💡 Hint: Nama dimulai dengan huruf "${writingState.currentAnimal.name[0].toUpperCase()}"`;
        hintArea.appendChild(hintEl);
    }
}

function clearFeedback() {
    const feedbackEl = document.getElementById('writingFeedback');
    if (feedbackEl) {
        feedbackEl.innerHTML = '';
        feedbackEl.className = '';
    }
}

/**
 * Validasi jawaban dari canvas atau text input
 */
function checkWriting() {
    if (!writingState.currentAnimal) {
        alert('Silakan pilih hewan terlebih dahulu!');
        return;
    }

    if (writingState.answered) {
        alert('Anda sudah menjawab soal ini. Klik "Hewan Berikutnya" untuk lanjut!');
        return;
    }

    // Option 1: Cek dari text input (lebih akurat)
    const textInput = document.getElementById('writingTextInput');
    let userAnswer = null;

    if (textInput && textInput.value.trim()) {
        userAnswer = textInput.value.trim();
    } else {
        // Option 2: Validasi canvas - cek apakah ada tulisan
        const canvas = calistungState.writingCanvas;
        const imageData = calistungState.writingCtx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let drawnPixels = 0;
        for (let i = 0; i < data.length; i += 4) {
            // Cek pixel yang bukan background (white = 255,255,255)
            if (data[i] !== 255 || data[i + 1] !== 255 || data[i + 2] !== 255) {
                drawnPixels++;
            }
        }

        if (drawnPixels < 300) {
            showFeedback('⚠️ Tulis lebih besar atau panjang lagi! 📝', 'wrong');
            return;
        }

        // Untuk canvas, kita anggap valid jika sudah cukup besar
        // (tidak bisa OCR tulisan anak, jadi assume benar jika effort cukup)
        userAnswer = 'canvas_drawing';
    }

    // Validasi
    const correctName = writingState.currentAnimal.name.toLowerCase().trim();
    const inputName = userAnswer.toLowerCase().trim();

    const isCorrect = inputName === correctName;

    writingState.attemptCount++;

    if (isCorrect) {
        handleCorrectAnswer();
    } else {
        handleWrongAnswer();
    }

    updateHintDisplay();
}

function handleCorrectAnswer() {
    writingState.answered = true;

    // Show feedback
    const feedback = `✓ Bagus! Benar sekali 🎉<br>${writingState.currentAnimal.emoji} ${writingState.currentAnimal.name.toUpperCase()}`;
    showFeedback(feedback, 'correct');

    // Highlight canvas
    const canvas = calistungState.writingCanvas;
    canvas.classList.add('canvas-highlight');
    setTimeout(() => {
        canvas.classList.remove('canvas-highlight');
    }, 600);

    // Play sound
    playSound('correct');

    // Confetti animation
    createConfetti();

    // Show next button
    const nextBtn = document.getElementById('writingNextBtn');
    if (nextBtn) {
        nextBtn.style.display = 'block';
    }

    // Update input style
    const textInput = document.getElementById('writingTextInput');
    if (textInput) {
        textInput.style.borderColor = '#95E1D3';
        textInput.style.background = 'rgba(149, 225, 211, 0.1)';
    }
}

function handleWrongAnswer() {
    writingState.answered = false;

    const remainingAttempts = writingState.maxAttempts - writingState.attemptCount;

    if (remainingAttempts > 0) {
        const feedback = `❌ Belum tepat, coba lagi ya! 💪<br>(Sisa percobaan: ${remainingAttempts})`;
        showFeedback(feedback, 'wrong');
    } else {
        const correctName = writingState.currentAnimal.name.toUpperCase();
        const feedback = `❌ Sayang! Jawaban yang benar adalah: <strong>${correctName}</strong> ${writingState.currentAnimal.emoji}`;
        showFeedback(feedback, 'wrong');
        writingState.answered = true;

        // Show next button
        const nextBtn = document.getElementById('writingNextBtn');
        if (nextBtn) {
            nextBtn.style.display = 'block';
        }
    }

    // Mark input as wrong
    const textInput = document.getElementById('writingTextInput');
    if (textInput && textInput.value.trim()) {
        textInput.style.borderColor = '#FF6B6B';
        textInput.style.background = 'rgba(255, 107, 107, 0.1)';

        // Shake effect
        textInput.style.animation = 'none';
        setTimeout(() => {
            textInput.style.animation = 'shake 0.5s ease';
        }, 10);
    }

    // Play sound
    playSound('wrong');
}

function showFeedback(message, type) {
    const feedbackEl = document.getElementById('writingFeedback');
    if (!feedbackEl) return;

    feedbackEl.innerHTML = message;
    feedbackEl.className = `feedback-${type}`;
}

function createConfetti() {
    const confettiPieces = ['🎉', '🎊', '⭐', '🌟', '✨', '🎈'];
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3'];

    for (let i = 0; i < 12; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.textContent = confettiPieces[Math.floor(Math.random() * confettiPieces.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '50%';
        confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.fontSize = (20 + Math.random() * 20) + 'px';
        confetti.style.animationDelay = (Math.random() * 0.2) + 's';

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

function nextWritingAnimal() {
    const select = document.getElementById('animalSelectWrite');
    
    // Find current animal index
    const currentIndex = calistungAnimals.findIndex(a => a.name === writingState.currentAnimal.name);
    const nextIndex = (currentIndex + 1) % calistungAnimals.length;
    
    select.value = calistungAnimals[nextIndex].name;
    initWriting();

    // Hide next button
    const nextBtn = document.getElementById('writingNextBtn');
    if (nextBtn) {
        nextBtn.style.display = 'none';
    }
}

// ==========================================
// SECTION 3: MENGHITUNG (COUNTING)
// ==========================================

function initCounting() {
    calistungState.countingIndex = 0;
    calistungState.selectedAnswer = null;
    showCountingQuestion();
}

function showCountingQuestion() {
    if (calistungState.countingIndex >= calistungAnimals.length) {
        calistungState.countingIndex = 0;
    }

    const animal = calistungAnimals[calistungState.countingIndex];
    const questions = animal.countingQuestions;
    const question = questions[Math.floor(Math.random() * questions.length)];

    calistungState.currentCountingQuestion = question;
    calistungState.selectedAnswer = null;

    // Update animal card
    const cardEl = document.getElementById('countingCard');
    cardEl.innerHTML = `
        <div class="animal-image">${animal.emoji}</div>
        <div class="counting-question">${question.text}</div>
    `;

    // Create answer buttons
    const buttonsEl = document.getElementById('countingButtons');
    buttonsEl.innerHTML = '';

    // Generate options (correct answer + 2 distractors)
    const options = new Set([question.answer]);
    while (options.size < 3) {
        const randomNum = Math.floor(Math.random() * 10) + 1;
        if (randomNum !== question.answer) {
            options.add(randomNum);
        }
    }

    // Shuffle options
    const shuffledOptions = [...options].sort(() => Math.random() - 0.5);

    shuffledOptions.forEach(num => {
        const btn = document.createElement('button');
        btn.className = 'count-btn';
        btn.textContent = num;
        btn.onclick = () => selectAnswer(num, btn);
        buttonsEl.appendChild(btn);
    });

    // Clear feedback
    document.getElementById('countingFeedback').innerHTML = '';
}

function selectAnswer(num, btnEl) {
    calistungState.selectedAnswer = num;

    // Remove selected class dari semua button
    document.querySelectorAll('.count-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Add selected class ke button yang diklik
    btnEl.classList.add('selected');

    // Check answer
    setTimeout(() => {
        checkCountingAnswer(num);
    }, 300);
}

function checkCountingAnswer(answer) {
    const question = calistungState.currentCountingQuestion;
    const feedbackEl = document.getElementById('countingFeedback');

    if (answer === question.answer) {
        feedbackEl.className = 'counting-feedback correct';
        feedbackEl.textContent = '🎉 Benar! Jawaban kamu tepat!';
        playSound('correct');
    } else {
        feedbackEl.className = 'counting-feedback wrong';
        feedbackEl.textContent = `❌ Salah! Jawabannya ${question.answer}.`;
        playSound('wrong');
    }
}

function nextCountingQuestion() {
    calistungState.countingIndex++;
    showCountingQuestion();
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function playSound(type) {
    try {
        const audio = document.getElementById(type === 'correct' ? 'correctSound' : 'wrongSound');
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.log('Audio play error:', e));
        }
    } catch (e) {
        console.log('Sound play error:', e);
    }
}

console.log('✓ Calistung.js loaded successfully');

// Old code - keep for backward compatibility
const calistungPageHTML = `
    <div class="calistung-page page">
        <div class="page-content">
            <h1 class="page-title">✏️ Calistung (Baca, Tulis, Hitung) ✏️</h1>

            <!-- Tab navigation -->
            <div class="calistung-tabs">
                <button class="tab-btn active" data-tab="membaca">📖 Membaca</button>
                <button class="tab-btn" data-tab="menulis">✏️ Menulis</button>
                <button class="tab-btn" data-tab="menghitung">🔢 Menghitung</button>
                <button class="tab-btn" data-tab="kosakata">📚 Kosakata</button>
            </div>

            <!-- Content area -->
            <div class="calistung-content">
                <!-- TAB MEMBACA -->
                <div class="tab-content active" data-tab="membaca">
                    <h2>Pelajari Huruf Awal Hewan</h2>
                    <p class="intro-text">Cocokkan gambar hewan dengan huruf awal namanya!</p>
                    
                    <div class="matching-game">
                        <div class="matching-left" id="matchingAnimals">
                            <!-- Animals will be populated here -->
                        </div>
                        <div class="matching-arrow">→</div>
                        <div class="matching-right" id="matchingLetters">
                            <!-- Letters will be populated here -->
                        </div>
                    </div>

                    <button class="btn btn-success" id="checkMatchBtn">
                        ✓ Periksa Jawaban
                    </button>
                </div>

                <!-- TAB MENULIS -->
                <div class="tab-content" data-tab="menulis">
                    <h2>Trace & Tulis Nama Hewan</h2>
                    <p class="intro-text">Ikuti garis untuk menulis nama hewan!</p>
                    
                    <div class="writing-exercise">
                        <div class="animal-selection-write">
                            <label>Pilih hewan:</label>
                            <select id="animalSelectWrite">
                                <option value="">-- Pilih Hewan --</option>
                            </select>
                        </div>

                        <div class="tracing-area" id="tracingArea">
                            <canvas id="tracingCanvas" width="400" height="150"></canvas>
                            <p class="canvas-text">Klik dan drag untuk menulis!</p>
                        </div>

                        <div class="writing-buttons">
                            <button class="btn btn-secondary" id="clearWriteBtn">🗑️ Hapus</button>
                            <button class="btn btn-success" id="checkWriteBtn">✓ Periksa</button>
                        </div>
                    </div>
                </div>

                <!-- TAB MENGHITUNG -->
                <div class="tab-content" data-tab="menghitung">
                    <h2>Hitung Bagian Tubuh Hewan</h2>
                    <p class="intro-text">Hitunglah jumlah kaki, telinga, atau bagian tubuh lainnya!</p>
                    
                    <div class="counting-game">
                        <div class="counting-animal-card" id="countingCard">
                            <!-- Animal will be selected here -->
                        </div>

                        <div class="counting-options">
                            <h3>Berapa jumlahnya?</h3>
                            <div class="counting-buttons" id="countingButtons">
                                <!-- Buttons will be populated here -->
                            </div>
                        </div>

                        <div class="counting-feedback" id="countingFeedback"></div>

                        <button class="btn btn-secondary" id="nextCountBtn">
                            ➡️ Soal Berikutnya
                        </button>
                    </div>
                </div>

                <!-- TAB KOSAKATA -->
                <div class="tab-content" data-tab="kosakata">
                    <h2>Pelajari Kosakata Hewan</h2>
                    <p class="intro-text">Lihat gambar, nama, dan dengarkan ejaan hewan!</p>
                    
                    <div class="vocabulary-cards">
                        <div class="vocabulary-card" id="vocabCard">
                            <!-- Content will be populated here -->
                        </div>

                        <div class="vocab-nav">
                            <button class="btn btn-secondary" id="prevVocabBtn">
                                ⬅️ Sebelumnya
                            </button>
                            <span class="vocab-counter" id="vocabCounter">1 / 10</span>
                            <button class="btn btn-secondary" id="nextVocabBtn">
                                Selanjutnya ➡️
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

const calistungPageCSS = `
    <style>
    .calistung-page {
        animation: fadeIn 0.5s ease;
    }

    /* Tabs */
    .calistung-tabs {
        display: flex;
        gap: 10px;
        margin-bottom: 30px;
        flex-wrap: wrap;
        justify-content: center;
    }

    .tab-btn {
        background: white;
        border: 2px solid #ddd;
        border-radius: 50px;
        padding: 10px 20px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        color: #7f8c8d;
    }

    .tab-btn:hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
    }

    .tab-btn.active {
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        border-color: transparent;
    }

    /* Tab content */
    .tab-content {
        display: none;
        animation: fadeIn 0.3s ease;
    }

    .tab-content.active {
        display: block;
    }

    .tab-content h2 {
        font-size: 24px;
        color: var(--dark-color);
        margin-bottom: 10px;
    }

    .intro-text {
        font-size: 16px;
        color: #7f8c8d;
        margin-bottom: 20px;
    }

    /* ===== MEMBACA - Matching Game ===== */
    .matching-game {
        display: flex;
        gap: 20px;
        margin: 30px 0;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }

    .matching-left, .matching-right {
        flex: 1;
        min-width: 200px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .matching-item {
        background: white;
        border: 2px solid #ddd;
        border-radius: 10px;
        padding: 15px;
        cursor: grab;
        transition: all 0.3s ease;
        user-select: none;
        font-weight: bold;
    }

    .matching-item:hover {
        transform: translateX(5px);
        border-color: var(--primary-color);
        box-shadow: 0 5px 15px rgba(255, 107, 107, 0.2);
    }

    .matching-item.animal {
        font-size: 16px;
    }

    .matching-item.letter {
        font-size: 24px;
        text-align: center;
    }

    .matching-arrow {
        font-size: 30px;
        color: var(--secondary-color);
        animation: bounce-horizontal 1.5s ease infinite;
    }

    @keyframes bounce-horizontal {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(10px); }
    }

    /* ===== MENULIS - Tracing Canvas ===== */
    .writing-exercise {
        margin: 20px 0;
    }

    .animal-selection-write {
        margin-bottom: 20px;
    }

    .animal-selection-write label {
        font-size: 16px;
        font-weight: bold;
        margin-right: 10px;
        color: var(--dark-color);
    }

    .animal-selection-write select {
        padding: 10px 15px;
        border: 2px solid #ddd;
        border-radius: 8px;
        font-size: 16px;
        cursor: pointer;
        font-family: 'Arial', sans-serif;
    }

    .tracing-area {
        background: #F8F9FA;
        border: 3px dashed var(--secondary-color);
        border-radius: 10px;
        padding: 20px;
        margin: 20px 0;
        text-align: center;
    }

    #tracingCanvas {
        border: 2px solid #ddd;
        border-radius: 8px;
        background: white;
        cursor: crosshair;
        display: block;
        margin: 0 auto 10px;
        max-width: 100%;
    }

    .canvas-text {
        font-size: 14px;
        color: #999;
        margin-top: 10px;
    }

    .writing-buttons {
        display: flex;
        gap: 10px;
        justify-content: center;
    }

    /* ===== MENGHITUNG - Counting ===== */
    .counting-game {
        margin: 20px 0;
    }

    .counting-animal-card {
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 15px;
        padding: 40px 20px;
        text-align: center;
        color: white;
        margin-bottom: 30px;
    }

    .counting-icon {
        font-size: 100px;
        margin-bottom: 15px;
        animation: bounce 1.5s ease infinite;
    }

    .counting-question {
        font-size: 18px;
        margin: 15px 0;
        line-height: 1.6;
    }

    .counting-options {
        margin: 20px 0;
    }

    .counting-options h3 {
        font-size: 18px;
        margin-bottom: 15px;
        color: var(--dark-color);
    }

    .counting-buttons {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
        gap: 10px;
    }

    .count-btn {
        background: white;
        border: 2px solid #ddd;
        border-radius: 10px;
        padding: 20px 15px;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        color: var(--dark-color);
    }

    .count-btn:hover {
        transform: translateY(-3px);
        border-color: var(--primary-color);
        box-shadow: 0 5px 15px rgba(255, 107, 107, 0.2);
    }

    .count-btn:active {
        transform: scale(0.95);
    }

    .counting-feedback {
        margin: 20px 0;
        font-size: 18px;
        text-align: center;
        font-weight: bold;
        min-height: 30px;
    }

    .feedback-correct {
        color: var(--success-color);
    }

    .feedback-incorrect {
        color: var(--primary-color);
    }

    /* ===== KOSAKATA - Vocabulary ===== */
    .vocabulary-cards {
        margin: 20px 0;
    }

    .vocabulary-card {
        background: white;
        border: 2px solid #ddd;
        border-radius: 15px;
        padding: 30px;
        text-align: center;
        margin-bottom: 20px;
    }

    .vocab-icon {
        font-size: 120px;
        margin-bottom: 20px;
        animation: bounce 1.5s ease infinite;
    }

    .vocab-name {
        font-size: 32px;
        font-weight: bold;
        color: var(--dark-color);
        margin: 15px 0;
    }

    .vocab-english {
        font-size: 18px;
        color: var(--secondary-color);
        margin-bottom: 15px;
    }

    .vocab-spelling {
        background: #F0F8FF;
        border-left: 4px solid var(--secondary-color);
        padding: 15px;
        margin: 15px 0;
        border-radius: 8px;
        text-align: center;
    }

    .vocab-spelling-text {
        font-size: 16px;
        color: #555;
        font-weight: bold;
        letter-spacing: 2px;
    }

    .vocab-play-btn {
        background: linear-gradient(135deg, var(--secondary-color), #45B3AA);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 10px 20px;
        margin-top: 15px;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .vocab-play-btn:hover {
        transform: scale(1.05);
    }

    .vocab-nav {
        display: flex;
        gap: 15px;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }

    .vocab-counter {
        font-size: 14px;
        color: #7f8c8d;
        font-weight: bold;
        min-width: 60px;
    }

    /* Responsive */
    @media screen and (max-width: 768px) {
        .calistung-tabs {
            gap: 8px;
        }

        .tab-btn {
            padding: 8px 16px;
            font-size: 12px;
        }

        .matching-game {
            gap: 10px;
        }

        .matching-left, .matching-right {
            min-width: 150px;
        }

        .vocab-icon {
            font-size: 80px;
        }

        .vocab-name {
            font-size: 24px;
        }

        #tracingCanvas {
            width: 100%;
            max-width: 100%;
        }

        .counting-icon {
            font-size: 80px;
        }
    }

    @media screen and (max-width: 480px) {
        .calistung-tabs {
            gap: 5px;
        }

        .tab-btn {
            padding: 6px 12px;
            font-size: 11px;
        }

        .matching-arrow {
            transform: rotate(90deg);
        }

        .matching-game {
            flex-direction: column;
            gap: 15px;
        }

        .matching-left, .matching-right {
            width: 100%;
        }

        .vocab-icon {
            font-size: 60px;
        }

        .vocab-name {
            font-size: 20px;
        }

        .counting-buttons {
            grid-template-columns: repeat(3, 1fr);
        }

        .count-btn {
            padding: 15px 10px;
            font-size: 16px;
        }
    }
    </style>
`;

/**
 * Load Calistung content
 */
function loadCalistungContent() {
    // Insert HTML
    const container = document.querySelector('.container');
    if (!document.querySelector('.calistung-page')) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = calistungPageHTML;
        container.appendChild(tempDiv.firstElementChild);
    }

    // Insert CSS
    if (!document.querySelector('style[data-calistung]')) {
        const styleTag = document.createElement('style');
        styleTag.setAttribute('data-calistung', 'true');
        styleTag.innerHTML = calistungPageCSS.replace('<style>', '').replace('</style>', '');
        document.head.appendChild(styleTag);
    }

    // Show calistung page
    const calistungPage = document.querySelector('.calistung-page');
    if (calistungPage) {
        calistungPage.classList.add('active');
    }

    // Setup event listeners
    setupCalistungEventListeners();

    // Initialize content
    initMembacaGame();
    initMenulisExercise();
    initMenghitungGame();
    initKosakatlaCards();
}

/**
 * Setup Calistung event listeners
 */
function setupCalistungEventListeners() {
    // Tab buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.getAttribute('data-tab');
            switchCalistungTab(tab);
        });
    });
}

/**
 * Switch Calistung tab
 * @param {string} tab - Tab name
 */
function switchCalistungTab(tab) {
    playSound('click');

    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelector(`.tab-content[data-tab="${tab}"]`).classList.add('active');

    // Reinitialize based on tab
    if (tab === 'membaca') {
        initMembacaGame();
    } else if (tab === 'menulis') {
        initMenulisExercise();
    } else if (tab === 'menghitung') {
        initMenghitungGame();
    } else if (tab === 'kosakata') {
        initKosakatlaCards();
    }
}

// ========== MEMBACA - Matching Game ==========

let membacaState = {
    animals: [],
    letters: [],
    matches: {}
};

function initMembacaGame() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    
    // Get first letters
    const firstLetters = animals.map(a => ({
        id: a.id,
        name: a.name,
        letter: a.name.charAt(0).toUpperCase()
    }));

    // Get unique letters
    const uniqueLetters = [...new Set(firstLetters.map(f => f.letter))];

    membacaState.animals = firstLetters;
    membacaState.letters = shuffleArray(uniqueLetters);
    membacaState.matches = {};

    displayMembacaGame();
    setupMembacaListeners();
}

function displayMembacaGame() {
    const animalsContainer = document.getElementById('matchingAnimals');
    const lettersContainer = document.getElementById('matchingLetters');

    if (animalsContainer) {
        animalsContainer.innerHTML = membacaState.animals.map((animal, idx) => `
            <div class="matching-item animal" draggable="true" data-animal-id="${animal.id}" data-idx="${idx}">
                ${animal.name}
            </div>
        `).join('');
    }

    if (lettersContainer) {
        lettersContainer.innerHTML = membacaState.letters.map(letter => `
            <div class="matching-item letter" data-letter="${letter}">
                ${letter}
            </div>
        `).join('');
    }
}

function setupMembacaListeners() {
    const animalItems = document.querySelectorAll('.matching-item.animal');
    const letterItems = document.querySelectorAll('.matching-item.letter');

    animalItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('animalId', item.getAttribute('data-animal-id'));
        });
    });

    letterItems.forEach(item => {
        item.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            item.style.backgroundColor = '#f0f0f0';
        });

        item.addEventListener('dragleave', (e) => {
            item.style.backgroundColor = 'white';
        });

        item.addEventListener('drop', (e) => {
            e.preventDefault();
            item.style.backgroundColor = 'white';
            const animalId = e.dataTransfer.getData('animalId');
            const letter = item.getAttribute('data-letter');
            
            membacaState.matches[animalId] = letter;
            console.log('Matched:', animalId, 'with', letter);
        });
    });

    // Check button
    const checkBtn = document.getElementById('checkMatchBtn');
    if (checkBtn) {
        checkBtn.addEventListener('click', checkMembacaAnswers);
    }
}

function checkMembacaAnswers() {
    playSound('click');
    let correct = 0;
    let total = membacaState.animals.length;

    membacaState.animals.forEach(animal => {
        const matchedLetter = membacaState.matches[animal.id];
        if (matchedLetter === animal.letter) {
            correct++;
        }
    });

    const percentage = Math.round((correct / total) * 100);
    let message = '';

    if (percentage === 100) {
        playSound('success');
        message = `🎉 Sempurna! ${correct}/${total} jawaban benar!`;
    } else if (percentage >= 70) {
        message = `✓ Bagus! ${correct}/${total} jawaban benar (${percentage}%)`;
    } else {
        message = `Coba lagi! ${correct}/${total} jawaban benar (${percentage}%)`;
    }

    alert(message);
}

// ========== MENULIS - Tracing Exercise ==========

let menuliState = {
    isDrawing: false,
    selectedAnimal: null,
    context: null
};

function initMenulisExercise() {
    const select = document.getElementById('animalSelectWrite');
    if (!select) return;

    select.innerHTML = '<option value="">-- Pilih Hewan --</option>' + 
        animals.map(a => `<option value="${a.id}">${a.name}</option>`).join('');

    select.addEventListener('change', (e) => {
        const animalId = parseInt(e.target.value);
        if (animalId) {
            const animal = animals.find(a => a.id === animalId);
            if (animal) {
                menuliState.selectedAnimal = animal;
                setupTracingCanvas(animal);
            }
        }
    });

    setupCanvasDrawing();
}

function setupCanvasDrawing() {
    const canvas = document.getElementById('tracingCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    menuliState.context = ctx;

    let isDrawing = false;

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    });

    canvas.addEventListener('mousemove', (e) => {
        if (isDrawing) {
            const rect = canvas.getBoundingClientRect();
            ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
            ctx.stroke();
        }
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    canvas.addEventListener('mouseout', () => {
        isDrawing = false;
    });

    const clearBtn = document.getElementById('clearWriteBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            playSound('click');
        });
    }

    const checkBtn = document.getElementById('checkWriteBtn');
    if (checkBtn) {
        checkBtn.addEventListener('click', () => {
            playSound('success');
            alert('✓ Bagus! Kamu sudah menulis: ' + (menuliState.selectedAnimal?.name || 'Hewan'));
        });
    }
}

function setupTracingCanvas(animal) {
    const canvas = document.getElementById('tracingCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw faint text as guide
    ctx.font = 'bold 48px Arial';
    ctx.fillStyle = 'rgba(200, 200, 200, 0.3)';
    ctx.fillText(animal.name, 10, 80);
    
    // Setup pen
    ctx.strokeStyle = '#FF6B6B';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
}

// ========== MENGHITUNG - Counting Game ==========

let menghitungState = {
    currentIdx: 0,
    questions: [],
    answered: false
};

function initMenghitungGame() {
    menghitungState.currentIdx = 0;
    menghitungState.answers = {};

    // Generate questions
    menghitungState.questions = animals.map(a => ({
        animal: a,
        question: `Berapa jumlah kaki ${a.name}?`,
        body_part: 'kaki',
        correct_answer: a.legs
    }));

    displayMenghitungQuestion();
}

function displayMenghitungQuestion() {
    const idx = menghitungState.currentIdx;
    const question = menghitungState.questions[idx];

    const card = document.getElementById('countingCard');
    if (card) {
        card.innerHTML = `
            <div class="counting-icon">${question.animal.icon}</div>
            <div class="counting-question">${question.question}</div>
        `;
    }

    const buttonsContainer = document.getElementById('countingButtons');
    if (buttonsContainer) {
        const options = [0, 2, 4, 6, 8];
        const correctIdx = options.indexOf(question.correct_answer);
        
        if (correctIdx === -1) {
            options[Math.floor(Math.random() * options.length)] = question.correct_answer;
        }

        const shuffledOptions = shuffleArray(options);

        buttonsContainer.innerHTML = shuffledOptions.map(opt => `
            <button class="count-btn" data-answer="${opt}">
                ${opt}
            </button>
        `).join('');

        document.querySelectorAll('.count-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const answer = parseInt(btn.getAttribute('data-answer'));
                checkMenghitungAnswer(answer, question.correct_answer);
            });
        });
    }

    const feedback = document.getElementById('countingFeedback');
    if (feedback) {
        feedback.innerHTML = '';
    }

    menghitungState.answered = false;
}

function checkMenghitungAnswer(answer, correct) {
    if (menghitungState.answered) return;
    menghitungState.answered = true;

    const feedback = document.getElementById('countingFeedback');
    if (feedback) {
        if (answer === correct) {
            playSound('success');
            feedback.innerHTML = `<div class="feedback-correct">🎉 Benar! ${answer} adalah jawaban yang tepat!</div>`;
        } else {
            feedback.innerHTML = `<div class="feedback-incorrect">Oops, jawabannya ${correct}, bukan ${answer}. Coba lagi!</div>`;
        }
    }

    const nextBtn = document.getElementById('nextCountBtn');
    if (nextBtn) {
        nextBtn.style.display = 'inline-block';
        nextBtn.onclick = () => {
            menghitungState.currentIdx++;
            if (menghitungState.currentIdx >= menghitungState.questions.length) {
                menghitungState.currentIdx = 0;
            }
            displayMenghitungQuestion();
            nextBtn.style.display = 'none';
        };
    }
}

// ========== KOSAKATA - Vocabulary Cards ==========

let kosavataState = {
    currentIdx: 0,
    total: 10
};

function initKosakatlaCards() {
    kosavataState.currentIdx = 0;
    kosavataState.total = Math.min(animals.length, 10);
    displayVocabCard();
}

function displayVocabCard() {
    const idx = kosavataState.currentIdx;
    const animal = animals[idx];

    if (!animal) return;

    const card = document.getElementById('vocabCard');
    if (card) {
        card.innerHTML = `
            <div class="vocab-icon">${animal.icon}</div>
            <div class="vocab-name">${animal.name}</div>
            <div class="vocab-english">${animal.englishName}</div>
            <div class="vocab-spelling">
                <div class="vocab-spelling-text">${animal.name.split('').join(' ')}</div>
            </div>
            <button class="vocab-play-btn" id="playVocabBtn">
                🔊 Dengarkan Ejaan
            </button>
        `;

        const playBtn = document.getElementById('playVocabBtn');
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                playAnimalSound(animal);
            });
        }
    }

    // Update counter
    const counter = document.getElementById('vocabCounter');
    if (counter) {
        counter.textContent = `${idx + 1} / ${kosavataState.total}`;
    }

    // Setup navigation buttons
    const prevBtn = document.getElementById('prevVocabBtn');
    const nextBtn = document.getElementById('nextVocabBtn');

    if (prevBtn) {
        prevBtn.disabled = idx === 0;
        prevBtn.onclick = () => {
            if (idx > 0) {
                kosavataState.currentIdx--;
                displayVocabCard();
            }
        };
    }

    if (nextBtn) {
        nextBtn.disabled = idx >= kosavataState.total - 1;
        nextBtn.onclick = () => {
            if (idx < kosavataState.total - 1) {
                kosavataState.currentIdx++;
                displayVocabCard();
            }
        };
    }
}
