/**
 * ========================================
 * MAIN.JS - LOGIKA UTAMA APLIKASI
 * ========================================
 * File ini menghandle:
 * - Navigasi antar halaman
 * - Audio management
 * - Event listeners global
 * - Utility functions
 */

// State aplikasi
const appState = {
    currentPage: 'home',
    soundEnabled: true,
    musicEnabled: true,
    selectedAnimal: null,
    userProgress: {
        calistung: {},
        games: {},
        animals: {}
    }
};

// Inisialisasi saat dokumen siap
document.addEventListener('DOMContentLoaded', () => {
    console.log('✓ App initialized');
    setupEventListeners();
    loadUserProgress();
    playBackgroundMusic();
});

/**
 * Setup event listeners untuk semua elemen
 */
function setupEventListeners() {
    // Menu cards
    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach(card => {
        card.addEventListener('click', () => {
            const page = card.getAttribute('data-page');
            navigateToPage(page);
        });
    });

    // Navigation buttons
    const navHomeBtn = document.querySelector('.nav-home');
    const navBackBtn = document.querySelector('.nav-back');

    navHomeBtn.addEventListener('click', () => {
        navigateToPage('home');
    });

    navBackBtn.addEventListener('click', () => {
        goBack();
    });

    // Responsive menu untuk mobile
    setupResponsiveMenu();
}

/**
 * Navigasi ke halaman tertentu
 * @param {string} page - Nama halaman (home, animals, calistung, quiz)
 */
function navigateToPage(page) {
    console.log(`Navigating to: ${page}`);
    
    // Play click sound
    playSound('click');

    // Update current page
    appState.currentPage = page;

    // Hide loading
    showLoading(false);

    // Update navigation buttons
    const navBackBtn = document.querySelector('.nav-back');
    if (page === 'home') {
        navBackBtn.style.display = 'none';
    } else {
        navBackBtn.style.display = 'block';
    }

    // Sembunyikan home page
    const homePage = document.querySelector('.home-page');
    if (homePage) {
        homePage.style.display = page === 'home' ? 'flex' : 'none';
    }

    // Handle page-specific logic
    switch (page) {
        case 'home':
            showHomePage();
            break;
        case 'animals':
            showAnimalsPage();
            break;
        case 'calistung':
            showCalistungPage();
            break;
        case 'quiz':
            showQuizPage();
            break;
        default:
            console.warn(`Unknown page: ${page}`);
    }

    // Scroll to top
    window.scrollTo(0, 0);

    // Save to history
    window.history.pushState({ page }, `Page - ${page}`);
}

/**
 * Kembali ke halaman sebelumnya
 */
function goBack() {
    window.history.back();
}

/**
 * Tampilkan halaman home
 */
function showHomePage() {
    console.log('Showing home page');
    const homePage = document.querySelector('.home-page');
    if (homePage) {
        homePage.style.display = 'flex';
    }
}

/**
 * Tampilkan halaman belajar hewan
 */
function showAnimalsPage() {
    console.log('Showing animals page');
    showLoading(true);

    // Simulasi loading
    setTimeout(() => {
        showLoading(false);
        loadAnimalsContent();
    }, 500);
}

/**
 * Tampilkan halaman Calistung
 */
function showCalistungPage() {
    console.log('Showing calistung page');
    showLoading(true);

    // Simulasi loading
    setTimeout(() => {
        showLoading(false);
        loadCalistungContent();
    }, 500);
}

/**
 * Tampilkan halaman Kuis
 */
function showQuizPage() {
    console.log('Showing quiz page');
    showLoading(true);

    // Simulasi loading
    setTimeout(() => {
        showLoading(false);
        loadQuizContent();
    }, 500);
}

/**
 * Tampilkan/sembunyikan loading spinner
 * @param {boolean} show - Tampilkan atau tidak
 */
function showLoading(show) {
    const spinner = document.querySelector('.loading-spinner');
    if (spinner) {
        spinner.style.display = show ? 'block' : 'none';
    }
}

/**
 * Setup responsive menu untuk mobile
 */
function setupResponsiveMenu() {
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {
            // Mobile layout
            const menuGrid = document.querySelector('.menu-grid');
            if (menuGrid) {
                menuGrid.style.gridTemplateColumns = '1fr';
            }
        }
    });
}

/**
 * Audio Management
 */

/**
 * Play background music
 */
function playBackgroundMusic() {
    if (!appState.musicEnabled) return;

    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        bgMusic.volume = 0.2;
        bgMusic.play().catch(err => {
            console.log('Autoplay prevented:', err);
        });
    }
}

/**
 * Pause background music
 */
function pauseBackgroundMusic() {
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        bgMusic.pause();
    }
}

/**
 * Play sound effect
 * @param {string} soundName - Nama sound effect (click, success, error, etc)
 */
function playSound(soundName) {
    if (!appState.soundEnabled) return;

    // Map sound names ke file
    const soundMap = {
        'click': 'assets/sounds/click.mp3',
        'success': 'assets/sounds/success.mp3',
        'error': 'assets/sounds/error.mp3',
        'animal-lion': 'assets/sounds/animals/lion.mp3',
        'animal-elephant': 'assets/sounds/animals/elephant.mp3',
        // Tambahkan lebih banyak sound sesuai kebutuhan
    };

    const soundFile = soundMap[soundName];
    if (!soundFile) {
        console.warn(`Sound not found: ${soundName}`);
        return;
    }

    const audio = new Audio(soundFile);
    audio.volume = 0.7;
    audio.play().catch(err => {
        console.log('Sound play failed:', err);
    });
}

/**
 * Toggle sound
 */
function toggleSound() {
    appState.soundEnabled = !appState.soundEnabled;
    console.log(`Sound ${appState.soundEnabled ? 'enabled' : 'disabled'}`);
}

/**
 * Toggle music
 */
function toggleMusic() {
    appState.musicEnabled = !appState.musicEnabled;
    if (appState.musicEnabled) {
        playBackgroundMusic();
    } else {
        pauseBackgroundMusic();
    }
    console.log(`Music ${appState.musicEnabled ? 'enabled' : 'disabled'}`);
}

/**
 * Data Hewan (Animals Data)
 */

const animals = [
    {
        id: 1,
        name: 'Singa',
        englishName: 'Lion',
        icon: '🦁',
        description: 'Raja hutan yang berani dan kuat',
        fact: 'Singa bisa tidur hingga 20 jam sehari',
        legs: 4,
        sound: 'assets/sounds/animals/lion.mp3',
        color: '#FF6B6B',
        difficulty: 'Mudah'
    },
    {
        id: 2,
        name: 'Gajah',
        englishName: 'Elephant',
        icon: '🐘',
        description: 'Hewan terbesar di darat',
        fact: 'Gajah punya memori yang sangat bagus',
        legs: 4,
        sound: 'assets/sounds/animals/elephant.mp3',
        color: '#95A5A6',
        difficulty: 'Mudah'
    },
    {
        id: 3,
        name: 'Harimau',
        englishName: 'Tiger',
        icon: '🐯',
        description: 'Kucing besar yang cantik dan berbahaya',
        fact: 'Harimau adalah pemburu yang sangat gesit',
        legs: 4,
        sound: 'assets/sounds/animals/tiger.mp3',
        color: '#FFA500',
        difficulty: 'Mudah'
    },
    {
        id: 4,
        name: 'Zebra',
        englishName: 'Zebra',
        icon: '🦓',
        description: 'Kuda berbelang putih dan hitam',
        fact: 'Setiap zebra punya pola belang yang unik',
        legs: 4,
        sound: 'assets/sounds/animals/zebra.mp3',
        color: '#34495E',
        difficulty: 'Sedang'
    },
    {
        id: 5,
        name: 'Jerapah',
        englishName: 'Giraffe',
        icon: '🦒',
        description: 'Hewan tertinggi di dunia',
        fact: 'Jerapah punya lidah sepanjang 50 cm',
        legs: 4,
        sound: 'assets/sounds/animals/giraffe.mp3',
        color: '#D4A574',
        difficulty: 'Sedang'
    },
    {
        id: 6,
        name: 'Kucing',
        englishName: 'Cat',
        icon: '🐱',
        description: 'Hewan peliharaan yang lucu dan imut',
        fact: 'Kucing punya 9 nyawa menurut cerita',
        legs: 4,
        sound: 'assets/sounds/animals/cat.mp3',
        color: '#E67E22',
        difficulty: 'Mudah'
    },
    {
        id: 7,
        name: 'Anjing',
        englishName: 'Dog',
        icon: '🐕',
        description: 'Sahabat setia manusia',
        fact: 'Anjing memiliki pendengaran 4x lebih baik dari manusia',
        legs: 4,
        sound: 'assets/sounds/animals/dog.mp3',
        color: '#A0522D',
        difficulty: 'Mudah'
    },
    {
        id: 8,
        name: 'Burung',
        englishName: 'Bird',
        icon: '🐦',
        description: 'Hewan yang bisa terbang tinggi',
        fact: 'Burung bisa tidur sambil terbang',
        legs: 2,
        sound: 'assets/sounds/animals/bird.mp3',
        color: '#3498DB',
        difficulty: 'Sedang'
    },
    {
        id: 9,
        name: 'Ikan',
        englishName: 'Fish',
        icon: '🐠',
        description: 'Hewan air yang indah',
        fact: 'Ikan tidak bisa menutup mata mereka',
        legs: 0,
        sound: 'assets/sounds/animals/fish.mp3',
        color: '#2ECC71',
        difficulty: 'Mudah'
    },
    {
        id: 10,
        name: 'Kupu-kupu',
        englishName: 'Butterfly',
        icon: '🦋',
        description: 'Serangga bersayap indah',
        fact: 'Kupu-kupu punya 12.000 mata',
        legs: 6,
        sound: 'assets/sounds/animals/butterfly.mp3',
        color: '#9B59B6',
        difficulty: 'Sulit'
    }
];

/**
 * User Progress Management
 */

/**
 * Load user progress dari localStorage
 */
function loadUserProgress() {
    const saved = localStorage.getItem('userProgress');
    if (saved) {
        appState.userProgress = JSON.parse(saved);
        console.log('✓ User progress loaded');
    }
}

/**
 * Save user progress ke localStorage
 */
function saveUserProgress() {
    localStorage.setItem('userProgress', JSON.stringify(appState.userProgress));
    console.log('✓ User progress saved');
}

/**
 * Update progress untuk hewan tertentu
 * @param {number} animalId - ID hewan
 * @param {object} progressData - Data progress
 */
function updateAnimalProgress(animalId, progressData) {
    if (!appState.userProgress.animals[animalId]) {
        appState.userProgress.animals[animalId] = {};
    }
    appState.userProgress.animals[animalId] = {
        ...appState.userProgress.animals[animalId],
        ...progressData,
        lastAccessed: new Date().toISOString()
    };
    saveUserProgress();
}

/**
 * Get progress untuk hewan tertentu
 * @param {number} animalId - ID hewan
 * @returns {object} Data progress
 */
function getAnimalProgress(animalId) {
    return appState.userProgress.animals[animalId] || {};
}

/**
 * Utility Functions
 */

/**
 * Format waktu ke format yang readable
 * @param {number} seconds - Jumlah detik
 * @returns {string} Format waktu
 */
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Get random item dari array
 * @param {array} arr - Array
 * @returns {*} Random item
 */
function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Shuffle array
 * @param {array} arr - Array
 * @returns {array} Shuffled array
 */
function shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Debounce function
 * @param {function} func - Function
 * @param {number} wait - Wait time in ms
 * @returns {function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Placeholder functions untuk page loading
 * (akan di-implement di file terpisah)
 */

function loadAnimalsContent() {
    console.log('Loading animals content...');
    // Implementation di animals.js
}

function loadCalistungContent() {
    console.log('Loading calistung content...');
    // Implementation di calistung.js
}

function loadQuizContent() {
    console.log('Loading quiz content...');
    // Implementation di games.js
}

/**
 * Export untuk digunakan di file lain
 */
window.appState = appState;
window.animals = animals;
window.playSound = playSound;
window.navigateToPage = navigateToPage;
window.goBack = goBack;
window.showLoading = showLoading;
window.updateAnimalProgress = updateAnimalProgress;
window.getAnimalProgress = getAnimalProgress;
window.saveUserProgress = saveUserProgress;
window.shuffleArray = shuffleArray;
window.getRandomItem = getRandomItem;
window.formatTime = formatTime;

