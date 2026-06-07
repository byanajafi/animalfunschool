/**
 * ========================================
 * CONFIG.JS - KONFIGURASI APLIKASI
 * ========================================
 * File untuk centralized configuration
 * Mudah untuk custom dan maintenance
 */

const APP_CONFIG = {
    // Informasi Aplikasi
    app: {
        name: 'Belajar Hewan',
        version: '1.0.0',
        lang: 'id',
        description: 'Aplikasi edukasi anak mengenal hewan'
    },

    // Settings Audio
    audio: {
        enabled: true,
        musicVolume: 0.3,
        soundVolume: 0.7,
        musicUrl: 'assets/sounds/bg-music.mp3',
        sounds: {
            click: 'assets/sounds/click.mp3',
            success: 'assets/sounds/success.mp3',
            error: 'assets/sounds/error.mp3'
        }
    },

    // Settings Visual
    visual: {
        theme: 'light',
        animationsEnabled: true,
        particlesEnabled: true,
        reducedMotion: false
    },
    // Game Settings
    games: {
        soundGuess: {
            totalQuestions: 5,
            timeLimit: 60
        },
        legsMatching: {
            totalQuestions: 5,
            timeLimit: 60
        },
        quiz: {
            totalQuestions: 5,
            timeLimit: 120
        },
        memory: {
            pairs: 6,
            timeLimit: 300
        }
    },

    // Calistung Settings
    calistung: {
        membaca: {
            totalQuestions: 10,
            passingScore: 70
        },
        menulis: {
            canvasWidth: 400,
            canvasHeight: 150,
            lineWidth: 3,
            lineColor: '#FF6B6B'
        },
        menghitung: {
            totalQuestions: 5,
            passingScore: 60
        },
        kosakata: {
            perPage: 10
        }
    },

    // Color Palette
    colors: {
        primary: '#FF6B6B',
        secondary: '#4ECDC4',
        accent: '#FFE66D',
        success: '#95E1D3',
        warning: '#FFA502',
        error: '#FF6B6B',
        dark: '#2C3E50',
        light: '#ECF0F1',
        background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },

    // Breakpoints
    breakpoints: {
        xs: 320,
        sm: 480,
        md: 768,
        lg: 1024,
        xl: 1200,
        xxl: 1400
    },

    // Storage Keys
    storage: {
        userProgress: 'userProgress',
        settings: 'appSettings',
        scores: 'gameScores',
        achievements: 'achievements'
    },

    // API Endpoints (jika menggunakan backend)
    api: {
        enabled: false,
        baseUrl: 'https://api.example.com',
        timeout: 5000,
        endpoints: {
            saveProgress: '/progress/save',
            getProgress: '/progress/get',
            submitScore: '/scores/submit',
            getLeaderboard: '/scores/leaderboard'
        }
    },

    // Feature Flags
    features: {        calistung: {
            membaca: true,
            menulis: true,
            menghitung: true,
            kosakata: true
        },
        games: {
            soundGuess: true,
            legsMatching: true,
            quiz: true,
            memory: true
        },
        socialSharing: false,
        offlineMode: true
    },

    // Accessibility
    accessibility: {
        highContrast: false,
        fontSize: 'normal', // 'small', 'normal', 'large'
        colorBlindMode: false,
        screenReaderOptimized: false
    },

    // Performance
    performance: {
        lazyLoadImages: true,
        cacheAssets: true,
        compressionEnabled: true,
        maxConcurrentRequests: 3
    },

    // Debug Mode
    debug: {
        enabled: false,
        logLevel: 'info', // 'debug', 'info', 'warn', 'error'
        showPerformanceMetrics: false,
        showGridOverlay: false
    }
};

// Hewan (Animals Data)
const ANIMALS_CONFIG = [
    {
        id: 1,
        name: 'Singa',
        englishName: 'Lion',
        icon: '🦁',
        description: 'Raja hutan yang berani dan kuat',
        fact: 'Singa bisa tidur hingga 20 jam sehari',
        legs: 4,
        sound: 'assets/sounds/animals/lion.mp3',        color: '#FF6B6B',
        difficulty: 'Mudah',
        category: 'mammals'
    },
    {
        id: 2,
        name: 'Gajah',
        englishName: 'Elephant',
        icon: '🐘',
        description: 'Hewan terbesar di darat',
        fact: 'Gajah punya memori yang sangat bagus',
        legs: 4,
        sound: 'assets/sounds/animals/elephant.mp3',        color: '#95A5A6',
        difficulty: 'Mudah',
        category: 'mammals'
    },
    {
        id: 3,
        name: 'Harimau',
        englishName: 'Tiger',
        icon: '🐯',
        description: 'Kucing besar yang cantik dan berbahaya',
        fact: 'Harimau adalah pemburu yang sangat gesit',
        legs: 4,
        sound: 'assets/sounds/animals/tiger.mp3',        color: '#FFA500',
        difficulty: 'Mudah',
        category: 'mammals'
    },
    {
        id: 4,
        name: 'Zebra',
        englishName: 'Zebra',
        icon: '🦓',
        description: 'Kuda berbelang putih dan hitam',
        fact: 'Setiap zebra punya pola belang yang unik',
        legs: 4,
        sound: 'assets/sounds/animals/zebra.mp3',        color: '#34495E',
        difficulty: 'Sedang',
        category: 'mammals'
    },
    {
        id: 5,
        name: 'Jerapah',
        englishName: 'Giraffe',
        icon: '🦒',
        description: 'Hewan tertinggi di dunia',
        fact: 'Jerapah punya lidah sepanjang 50 cm',
        legs: 4,
        sound: 'assets/sounds/animals/giraffe.mp3',        color: '#D4A574',
        difficulty: 'Sedang',
        category: 'mammals'
    },
    {
        id: 6,
        name: 'Kucing',
        englishName: 'Cat',
        icon: '🐱',
        description: 'Hewan peliharaan yang lucu dan imut',
        fact: 'Kucing punya 18 otot untuk menggerakkan telinga',
        legs: 4,
        sound: 'assets/sounds/animals/cat.mp3',        color: '#E67E22',
        difficulty: 'Mudah',
        category: 'mammals'
    },
    {
        id: 7,
        name: 'Anjing',
        englishName: 'Dog',
        icon: '🐕',
        description: 'Sahabat setia manusia',
        fact: 'Anjing memiliki pendengaran 4x lebih baik dari manusia',
        legs: 4,
        sound: 'assets/sounds/animals/dog.mp3',        color: '#A0522D',
        difficulty: 'Mudah',
        category: 'mammals'
    },
    {
        id: 8,
        name: 'Burung',
        englishName: 'Bird',
        icon: '🐦',
        description: 'Hewan yang bisa terbang tinggi',
        fact: 'Burung bisa tidur sambil terbang',
        legs: 2,
        sound: 'assets/sounds/animals/bird.mp3',        color: '#3498DB',
        difficulty: 'Sedang',
        category: 'birds'
    },
    {
        id: 9,
        name: 'Ikan',
        englishName: 'Fish',
        icon: '🐠',
        description: 'Hewan air yang indah',
        fact: 'Ikan tidak bisa menutup mata mereka',
        legs: 0,
        sound: 'assets/sounds/animals/fish.mp3',        color: '#2ECC71',
        difficulty: 'Mudah',
        category: 'aquatic'
    },
    {
        id: 10,
        name: 'Kupu-kupu',
        englishName: 'Butterfly',
        icon: '🦋',
        description: 'Serangga bersayap indah',
        fact: 'Kupu-kupu punya 12.000 mata',
        legs: 6,
        sound: 'assets/sounds/animals/butterfly.mp3',        color: '#9B59B6',
        difficulty: 'Sulit',
        category: 'insects'
    }
];

/**
 * Utility Functions untuk Config
 */

// Get config value
function getConfig(key, defaultValue = null) {
    const keys = key.split('.');
    let value = APP_CONFIG;
    
    for (let k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            return defaultValue;
        }
    }
    
    return value;
}

// Set config value
function setConfig(key, value) {
    const keys = key.split('.');
    const lastKey = keys.pop();
    let obj = APP_CONFIG;
    
    for (let k of keys) {
        if (!(k in obj) || typeof obj[k] !== 'object') {
            obj[k] = {};
        }
        obj = obj[k];
    }
    
    obj[lastKey] = value;
}

// Get all animals
function getAllAnimals() {
    return ANIMALS_CONFIG;
}

// Get animal by ID
function getAnimalById(id) {
    return ANIMALS_CONFIG.find(a => a.id === id);
}

// Get animals by difficulty
function getAnimalsByDifficulty(difficulty) {
    return ANIMALS_CONFIG.filter(a => a.difficulty === difficulty);
}

// Get animals by category
function getAnimalsByCategory(category) {
    return ANIMALS_CONFIG.filter(a => a.category === category);
}

// Merge user config with defaults
function mergeConfig(userConfig) {
    const merged = JSON.parse(JSON.stringify(APP_CONFIG));
    
    function deepMerge(target, source) {
        for (let key in source) {
            if (source.hasOwnProperty(key)) {
                if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
                    if (!target[key]) target[key] = {};
                    deepMerge(target[key], source[key]);
                } else {
                    target[key] = source[key];
                }
            }
        }
    }
    
    deepMerge(merged, userConfig);
    return merged;
}

// Export untuk digunakan
window.APP_CONFIG = APP_CONFIG;
window.ANIMALS_CONFIG = ANIMALS_CONFIG;
window.getConfig = getConfig;
window.setConfig = setConfig;
window.getAllAnimals = getAllAnimals;
window.getAnimalById = getAnimalById;
window.getAnimalsByDifficulty = getAnimalsByDifficulty;
window.getAnimalsByCategory = getAnimalsByCategory;
window.mergeConfig = mergeConfig;

console.log('✓ Config loaded successfully');

