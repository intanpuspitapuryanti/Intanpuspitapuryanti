// File ini berisi animasi tambahan untuk game
// Animasi ini akan ditambahkan ke halaman secara dinamis

// Tambahkan animasi konfeti untuk hasil akhir game
function addConfettiAnimation() {
    // Buat element style untuk animasi konfeti
    const confettiStyle = document.createElement('style');
    confettiStyle.id = 'confetti-animation';
    confettiStyle.innerHTML = `
        .confetti-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 100;
            overflow: hidden;
        }
        
        .confetti {
            position: absolute;
            width: 10px;
            height: 10px;
            background-color: #f00;
            opacity: 0.7;
            border-radius: 0;
            animation: confetti-fall 3s ease-in-out forwards;
        }
        
        @keyframes confetti-fall {
            0% {
                transform: translateY(-100px) rotate(0deg);
                opacity: 1;
            }
            
            100% {
                transform: translateY(calc(100vh + 100px)) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(confettiStyle);
}

// Fungsi untuk menambahkan animasi loading
function addLoadingAnimation() {
    // Buat element style untuk animasi loading
    const loadingStyle = document.createElement('style');
    loadingStyle.id = 'loading-animation';
    loadingStyle.innerHTML = `
        .loading-container {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .loading-dots {
            display: flex;
            gap: 8px;
        }
        
        .loading-dot {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: var(--primary);
            animation: loading-bounce 0.8s infinite alternate;
        }
        
        .loading-dot:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .loading-dot:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        @keyframes loading-bounce {
            0% {
                transform: translateY(0);
            }
            100% {
                transform: translateY(-15px);
            }
        }
    `;
    document.head.appendChild(loadingStyle);
}

// Fungsi untuk menampilkan loading animation
function showLoading(container) {
    const loadingContainer = document.createElement('div');
    loadingContainer.className = 'loading-container';
    loadingContainer.innerHTML = `
        <div class="loading-dots">
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
        </div>
    `;
    
    container.innerHTML = '';
    container.appendChild(loadingContainer);
}

// Fungsi untuk menyembunyikan loading animation
function hideLoading(container) {
    const loadingEl = container.querySelector('.loading-container');
    if (loadingEl) {
        loadingEl.remove();
    }
}

// Fungsi untuk menampilkan animasi konfeti
function showConfetti() {
    // Buat container untuk konfeti
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);
    
    // Warna untuk konfeti
    const colors = ['#ff4136', '#0074d9', '#ffdc00', '#01ff70', '#f012be', '#ff851b'];
    
    // Buat 100 konfeti
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Set properti acak untuk konfeti
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomLeft = Math.random() * 100;
        const randomDelay = Math.random() * 3;
        const randomSize = Math.random() * 10 + 5;
        
        confetti.style.backgroundColor = randomColor;
        confetti.style.left = `${randomLeft}%`;
        confetti.style.width = `${randomSize}px`;
        confetti.style.height = `${randomSize}px`;
        confetti.style.animationDelay = `${randomDelay}s`;
        
        // Tambahkan bentuk acak
        const shapes = ['50%', '0']; // circle atau square
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        confetti.style.borderRadius = randomShape;
        
        confettiContainer.appendChild(confetti);
    }
    
    // Hapus container konfeti setelah animasi selesai
    setTimeout(() => {
        confettiContainer.remove();
    }, 6000);
}

// Inisialisasi animasi
document.addEventListener('DOMContentLoaded', function() {
    addConfettiAnimation();
    addLoadingAnimation();
});
