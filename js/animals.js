(function (window) {
    const soundButtonClass = 'btn-sound';

    const animals = [
        {
            name: 'Singa',
            emoji: '🦁',
            image: 'https://via.placeholder.com/320x180/FF6B6B/ffffff?text=Singa',
            sound: 'assets/sounds/lion.mp3',
            fact: 'Singa tidur sampai 20 jam sehari dan hidup dalam kelompok bernama pride.',
            difficulty: 'mudah'
        },
        {
            name: 'Gajah',
            emoji: '🐘',
            image: 'https://via.placeholder.com/320x180/95A5A6/ffffff?text=Gajah',
            sound: 'assets/sounds/elephant.mp3',
            fact: 'Gajah punya ingatan kuat dan telinga besar untuk menjaga suhu tubuh.',
            difficulty: 'mudah'
        },
        {
            name: 'Harimau',
            emoji: '🐯',
            image: 'https://via.placeholder.com/320x180/FFA500/ffffff?text=Harimau',
            sound: 'assets/sounds/tiger.mp3',
            fact: 'Harimau punya garis-garis tubuh unik seperti sidik jari manusia.',
            difficulty: 'mudah'
        },
        {
            name: 'Jerapah',
            emoji: '🦒',
            image: 'https://via.placeholder.com/320x180/D4A574/ffffff?text=Jerapah',
            sound: 'assets/sounds/giraffe.mp3',
            fact: 'Jerapah memiliki leher panjang dan bisa memakan daun tinggi di pohon.',
            difficulty: 'sedang'
        },
        {
            name: 'Zebra',
            emoji: '🦓',
            image: 'https://via.placeholder.com/320x180/34495E/ffffff?text=Zebra',
            sound: 'assets/sounds/zebra.mp3',
            fact: 'Pola belang zebra membantu melindungi mereka dari serangga dan musuh.',
            difficulty: 'sedang'
        },
        {
            name: 'Kucing',
            emoji: '🐱',
            image: 'https://via.placeholder.com/320x180/E67E22/ffffff?text=Kucing',
            sound: 'assets/sounds/cat.mp3',
            fact: 'Kucing sering membersihkan diri dengan lidahnya yang kasar seperti sikat.',
            difficulty: 'mudah'
        },
        {
            name: 'Anjing',
            emoji: '🐕',
            image: 'https://via.placeholder.com/320x180/A0522D/ffffff?text=Anjing',
            sound: 'assets/sounds/dog.mp3',
            fact: 'Anjing bisa mendengar suara yang jauh lebih baik dibanding manusia.',
            difficulty: 'mudah'
        },
        {
            name: 'Kelinci',
            emoji: '🐰',
            image: 'https://via.placeholder.com/320x180/F3D1B0/ffffff?text=Kelinci',
            sound: 'assets/sounds/rabbit.mp3',
            fact: 'Kelinci melompat tinggi dan senang menggigit wortel serta daun hijau.',
            difficulty: 'mudah'
        },
        {
            name: 'Burung',
            emoji: '🐦',
            image: 'https://via.placeholder.com/320x180/3498DB/ffffff?text=Burung',
            sound: 'assets/sounds/bird.mp3',
            fact: 'Burung memiliki sayap yang kuat untuk terbang jauh dan bernyanyi ceria.',
            difficulty: 'sedang'
        },
        {
            name: 'Ikan',
            emoji: '🐠',
            image: 'https://via.placeholder.com/320x180/2ECC71/ffffff?text=Ikan',
            sound: 'assets/sounds/fish.mp3',
            fact: 'Ikan bernapas dengan insang dan hidup di air laut atau sungai.',
            difficulty: 'mudah'
        },
        {
            name: 'Kupu-Kupu',
            emoji: '🦋',
            image: 'https://via.placeholder.com/320x180/9B59B6/ffffff?text=Kupu-Kupu',
            sound: 'assets/sounds/butterfly.mp3',
            fact: 'Kupu-kupu punya sayap warna-warni untuk terbang di sekitar bunga.',
            difficulty: 'sulit'
        },
        {
            name: 'Panda',
            emoji: '🐼',
            image: 'https://via.placeholder.com/320x180/FFFFFF/000000?text=Panda',
            sound: 'assets/sounds/panda.mp3',
            fact: 'Panda suka makan bambu dan terlihat menggemaskan ketika duduk makan.',
            difficulty: 'sedang'
        },
        {
            name: 'Koala',
            emoji: '🐨',
            image: 'https://via.placeholder.com/320x180/7F8C8D/ffffff?text=Koala',
            sound: 'assets/sounds/koala.mp3',
            fact: 'Koala tidur lama di pohon karena makan daun eucalyptus yang membuatnya rileks.',
            difficulty: 'sedang'
        },
        {
            name: 'Buaya',
            emoji: '🐊',
            image: 'https://via.placeholder.com/320x180/2C3E50/ffffff?text=Buaya',
            sound: 'assets/sounds/crocodile.mp3',
            fact: 'Buaya bisa berenang cepat dan memiliki gigi tajam yang kuat.',
            difficulty: 'sulit'
        },
        {
            name: 'Kuda',
            emoji: '🐴',
            image: 'https://via.placeholder.com/320x180/A569BD/ffffff?text=Kuda',
            sound: 'assets/sounds/horse.mp3',
            fact: 'Kuda berlari cepat dan sering membantu orang bepergian atau bekerja di peternakan.',
            difficulty: 'sedang'
        },
        {
            name: 'Sapi',
            emoji: '🐄',
            image: 'https://via.placeholder.com/320x180/2ECC71/ffffff?text=Sapi',
            sound: 'assets/sounds/cow.mp3',
            fact: 'Sapi memberi susu yang biasa digunakan untuk minuman dan makanan.',
            difficulty: 'mudah'
        },
        {
            name: 'Kambing',
            emoji: '🐐',
            image: 'https://via.placeholder.com/320x180/BF6B6B/ffffff?text=Kambing',
            sound: 'assets/sounds/goat.mp3',
            fact: 'Kambing suka memanjat dan sering hidup di ladang atau peternakan.',
            difficulty: 'sedang'
        },
        {
            name: 'Domba',
            emoji: '🐑',
            image: 'https://via.placeholder.com/320x180/F7F1E1/000000?text=Domba',
            sound: 'assets/sounds/sheep.mp3',
            fact: 'Domba berwarna putih lembut dan biasanya hidup berkelompok.',
            difficulty: 'mudah'
        },
        {
            name: 'Elang',
            emoji: '🦅',
            image: 'https://via.placeholder.com/320x180/FFD700/000000?text=Elang',
            sound: 'assets/sounds/eagle.mp3',
            fact: 'Elang terbang tinggi dan memiliki penglihatan sangat tajam.',
            difficulty: 'sulit'
        },
        {
            name: 'Ular',
            emoji: '🐍',
            image: 'https://via.placeholder.com/320x180/16A085/ffffff?text=Ular',
            sound: 'assets/sounds/snake.mp3',
            fact: 'Ular merayap dan menggunakan lidahnya untuk mencium bau di udara.',
            difficulty: 'sulit'
        }
    ];

    const state = {
        currentFilter: 'semua',
        currentSearch: ''
    };

    function init() {
        bindEvents();
        renderAnimals();
    }

    function bindEvents() {
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', () => {
                setFilter(button.dataset.filter || 'semua');
            });
        });

        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', event => {
                state.currentSearch = event.target.value.trim().toLowerCase();
                renderAnimals();
            });
        }

        const closeModalBtn = document.getElementById('closeDetailModal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }

        const modal = document.getElementById('animalDetailModal');
        if (modal) {
            modal.addEventListener('click', event => {
                if (event.target === modal) closeModal();
            });
        }
    }

    function setFilter(filter) {
        state.currentFilter = filter;
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.classList.toggle('active', button.dataset.filter === filter);
        });
        renderAnimals();
    }

    function getVisibleAnimals() {
        return animals.filter(animal => {
            const matchesFilter = state.currentFilter === 'semua' || animal.difficulty === state.currentFilter;
            const matchesSearch = animal.name.toLowerCase().includes(state.currentSearch) || animal.fact.toLowerCase().includes(state.currentSearch);
            return matchesFilter && matchesSearch;
        });
    }

    function renderAnimals() {
        const grid = document.getElementById('animalsGrid');
        if (!grid) return;

        const visible = getVisibleAnimals();
        if (visible.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: white; font-size: 18px; margin: 50px 0;">Tidak ada hewan yang ditemukan. Coba kata lain.</p>';
            return;
        }

        grid.innerHTML = visible.map(animal => {
            return `
                <div class="animal-card">
                    <img class="animal-image" src="${animal.image}" alt="Gambar ${animal.name}" />
                    <div class="animal-icon">${animal.emoji}</div>
                    <div class="animal-name">${animal.name}</div>
                    <div class="animal-fact">${animal.fact}</div>
                    <div class="difficulty-badge difficulty-${animal.difficulty}">${animal.difficulty.toUpperCase()}</div>
                    <div class="animal-actions">
                        <button type="button" class="action-btn btn-sound" data-sound="${animal.sound}">🔊 Suara</button>
                        <button type="button" class="action-btn btn-detail" data-name="${animal.name}">📘 Lebih Lanjut</button>
                    </div>
                </div>
            `;
        }).join('');

        grid.querySelectorAll(`.${soundButtonClass}`).forEach(button => {
            button.addEventListener('click', () => {
                playAnimalSound(button.dataset.sound, button);
            });
        });

        grid.querySelectorAll('.btn-detail').forEach(button => {
            button.addEventListener('click', () => {
                openDetailModal(button.dataset.name);
            });
        });
    }

    function playAnimalSound(soundPath, button) {
        if (!soundPath) return;

        button.disabled = true;
        button.classList.add('playing');
        const originalText = button.innerHTML;
        button.innerHTML = '⏳ Memutar...';

        const audio = new Audio(soundPath);
        audio.volume = 0.85;

        const resetButton = () => {
            button.disabled = false;
            button.classList.remove('playing');
            button.innerHTML = originalText;
        };

        audio.addEventListener('ended', resetButton);
        audio.addEventListener('error', () => {
            resetButton();
            console.warn('Suara tidak ditemukan:', soundPath);
            alert('🔊 Suara belum tersedia. Pastikan file ' + soundPath + ' ada di folder assets/sounds.');
        });

        audio.play().catch(err => {
            resetButton();
            console.warn('Gagal memutar suara:', err);
            alert('🔊 Tidak bisa memutar suara sekarang. Coba lagi nanti.');
        });
    }

    function openDetailModal(name) {
        const animal = animals.find(item => item.name === name);
        if (!animal) return;

        document.getElementById('detailAnimalIcon').textContent = animal.emoji;
        document.getElementById('detailAnimalName').textContent = animal.name;
        document.getElementById('detailAnimalEnglish').textContent = animal.fact;
        document.getElementById('detailAnimalDescription').textContent = 'Hewan ini menyenangkan dan mudah dikenali oleh anak-anak.';
        document.getElementById('detailAnimalDifficulty').textContent = 'Ceria';
        document.getElementById('detailAnimalFact').textContent = animal.fact;

        const modal = document.getElementById('animalDetailModal');
        if (modal) {
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
        }
    }

    function closeModal() {
        const modal = document.getElementById('animalDetailModal');
        if (modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        }
    }

    window.animalLearning = {
        init,
        renderAnimals,
        playAnimalSound
    };

    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('animalsGrid')) {
            init();
        }
    });
})(window);
