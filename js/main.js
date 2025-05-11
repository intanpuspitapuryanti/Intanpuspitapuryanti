// Fungsi pembantu untuk mencampur array (untuk mengacak soal dan opsi)
function shuffleArray(array) {
    // Buat salinan array untuk menghindari perubahan pada array asli
    const newArray = [...array];
    
    // Algoritma Fisher-Yates untuk pengacakan
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
    }
    
    return newArray;
}

// Fungsi untuk membuat tombol opsi jawaban
function createOptionButtons(options, containerId, clickHandler) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Hapus tombol yang mungkin sudah ada sebelumnya
    container.innerHTML = '';
    
    // Buat tombol untuk setiap opsi
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.addEventListener('click', clickHandler);
        container.appendChild(button);
    });
}

// Fungsi untuk menampilkan feedback jawaban
function showFeedback(element, isCorrect, message) {
    if (!element) return;
    
    element.textContent = message;
    element.className = isCorrect ? 'feedback correct' : 'feedback incorrect';
    
    // Tambahkan animasi
    element.style.animation = 'none';
    void element.offsetWidth; // Trigger reflow untuk reset animasi
    element.style.animation = 'popIn 0.3s ease-out';
}

// Fungsi untuk memperbarui tampilan skor
function updateScore(element, score) {
    if (!element) return;
    
    // Update nilai skor dengan animasi
    element.textContent = score;
    element.style.animation = 'none';
    void element.offsetWidth; // Trigger reflow untuk reset animasi
    element.style.animation = 'scorePop 0.5s ease-out';
}

// Inisialisasi tombol navigasi
function initializeNavigation() {
    const tebakGambarBtn = document.getElementById('tebak-gambar-btn');
    const tebakSuaraBtn = document.getElementById('tebak-suara-btn');
    const tebakGambarSection = document.getElementById('tebak-gambar-section');
    const tebakSuaraSection = document.getElementById('tebak-suara-section');
    
    if (tebakGambarBtn && tebakSuaraBtn && tebakGambarSection && tebakSuaraSection) {
        // Event listener untuk tombol Tebak Gambar
        tebakGambarBtn.addEventListener('click', function() {
            // Aktifkan tombol Tebak Gambar
            tebakGambarBtn.classList.add('active');
            tebakSuaraBtn.classList.remove('active');
            
            // Tampilkan section Tebak Gambar
            tebakGambarSection.classList.add('active');
            tebakSuaraSection.classList.remove('active');
        });
        
        // Event listener untuk tombol Tebak Suara
        tebakSuaraBtn.addEventListener('click', function() {
            // Aktifkan tombol Tebak Suara
            tebakSuaraBtn.classList.add('active');
            tebakGambarBtn.classList.remove('active');
            
            // Tampilkan section Tebak Suara
            tebakSuaraSection.classList.add('active');
            tebakGambarSection.classList.remove('active');
        });
    }
}

// Tambahkan style animasi jika belum ada
function addAnimationsCSS() {
    if (!document.getElementById('animations-css')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'animations-css';
        styleSheet.innerHTML = `
            @keyframes popIn {
                0% { transform: scale(0.8); opacity: 0; }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); opacity: 1; }
            }
            
            @keyframes scorePop {
                0% { transform: scale(1); }
                50% { transform: scale(1.5); color: var(--primary); }
                100% { transform: scale(1); }
            }
            
            @keyframes fadeIn {
                0% { opacity: 0; }
                100% { opacity: 1; }
            }
            
            .game-section {
                display: none;
                animation: fadeIn 0.5s ease-out;
            }
            
            .game-section.active {
                display: block;
            }
            
            /* Perbaikan untuk tombol end game */
            .kembali-menu-gambar, .kembali-menu-suara, #kembali-menu, #kembali-menu-suara {
                background: #FF9800;
                color: white;
                border: none;
                padding: 12px 20px;
                border-radius: 10px;
                cursor: pointer;
                font-weight: bold;
                font-family: 'Nunito', sans-serif;
                transition: background 0.3s, transform 0.3s;
            }
            
            .kembali-menu-gambar:hover, .kembali-menu-suara:hover, #kembali-menu:hover, #kembali-menu-suara:hover {
                background: #F57C00;
                transform: translateY(-2px);
            }
        `;
        document.head.appendChild(styleSheet);
    }
}

// Fungsi untuk menangani tombol kembali ke menu
function handleBackToMenuButtons() {
    // Perbaikan untuk tombol kembali menu
    document.addEventListener('click', function(event) {
        // Cek apakah yang diklik adalah tombol kembali menu
        if (event.target.id === 'kembali-menu' || event.target.id === 'kembali-menu-suara') {
            // Reset tampilan ke tab Tebak Gambar (default)
            const tebakGambarBtn = document.getElementById('tebak-gambar-btn');
            const tebakSuaraBtn = document.getElementById('tebak-suara-btn');
            const tebakGambarSection = document.getElementById('tebak-gambar-section');
            const tebakSuaraSection = document.getElementById('tebak-suara-section');
            
            // Aktifkan tab Tebak Gambar
            if (tebakGambarBtn && tebakSuaraBtn) {
                tebakGambarBtn.classList.add('active');
                tebakSuaraBtn.classList.remove('active');
            }
            
            // Tampilkan section Tebak Gambar
            if (tebakGambarSection && tebakSuaraSection) {
                tebakGambarSection.classList.add('active');
                tebakSuaraSection.classList.remove('active');
                
                // Reset game Tebak Gambar
                setTimeout(() => {
                    initializeTebakGambar();
                }, 100);
            }
        }
    });
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Tambahkan animasi CSS
    addAnimationsCSS();
    
    // Inisialisasi navigasi tab
    initializeNavigation();
    
    // Inisialisasi game
    initializeTebakGambar();
    initializeTebakSuara();
    
    // Tangani tombol kembali ke menu
    handleBackToMenuButtons();
});
