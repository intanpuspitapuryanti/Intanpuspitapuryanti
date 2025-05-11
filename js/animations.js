// File animations.js
// Menambahkan animasi dan elemen interaktif untuk game

document.addEventListener('DOMContentLoaded', function() {
    // Animasi elemen dekorasi
    animateDecorations();
    
    // Tambahkan animasi hover untuk image container
    setupImageAnimation();
    
    // Tambahkan konfeti untuk jawaban benar
    setupConfettiEffect();
});

// Animasi untuk elemen dekorasi
function animateDecorations() {
    const decorations = document.querySelectorAll('.decoration');
    
    decorations.forEach((el, index) => {
        // Tambahkan delay dan durasi animasi yang berbeda
        el.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
        el.style.animationDelay = `${index * 0.7}s`;
        
        // Gerakkan secara acak
        setInterval(() => {
            const randomX = Math.random() * 10 - 5; // -5px to 5px
            const randomY = Math.random() * 10 - 5; // -5px to 5px
            el.style.transform = `translate(${randomX}px, ${randomY}px) ${el.classList.contains('square') ? 'rotate(45deg)' : ''}`;
        }, 3000);
    });
}

// Animasi untuk container gambar
function setupImageAnimation() {
    const imageContainer = document.querySelector('.image-container');
    
    if (imageContainer) {
        imageContainer.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = imageContainer.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            // Efek 3D tilt
            imageContainer.style.transform = `
                perspective(1000px)
                rotateY(${x * 10}deg)
                rotateX(${y * -10}deg)
                scale3d(1.05, 1.05, 1.05)
            `;
        });
        
        imageContainer.addEventListener('mouseleave', () => {
            imageContainer.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
        });
    }
}

// Efek konfeti ketika jawaban benar
function setupConfettiEffect() {
    // Tangani event ketika jawaban benar di Tebak Gambar
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('option-btn')) {
            setTimeout(() => {
                const feedback = document.querySelector('.feedback.correct');
                if (feedback) {
                    createConfetti(feedback);
                }
            }, 100);
        }
    });
}

// Buat efek konfeti
function createConfetti(element) {
    const container = element.closest('.game-container');
    
    // Buat 50 konfeti
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Posisi awal
        const startPositionX = Math.random() * container.offsetWidth;
        const startPositionY = Math.random() * container.offsetHeight * 0.5;
        
        // Warna acak
        const colors = ['#fdcb6e', '#6c5ce7', '#00cec9', '#00b894', '#e84393'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Bentuk acak
        const shapes = ['circle', 'square', 'triangle'];
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        
        // Terapkan properti
        confetti.style.left = startPositionX + 'px';
        confetti.style.top = startPositionY + 'px';
        confetti.style.backgroundColor = randomColor;
        confetti.style.opacity = '1';
        
        if (randomShape === 'circle') {
            confetti.style.borderRadius = '50%';
        } else if (randomShape === 'triangle') {
            confetti.style.width = '0';
            confetti.style.height = '0';
            confetti.style.backgroundColor = 'transparent';
            confetti.style.borderLeft = '7px solid transparent';
            confetti.style.borderRight = '7px solid transparent';
            confetti.style.borderBottom = '15px solid ' + randomColor;
        }
        
        // Animasi jatuh
        const animationDuration = Math.random() * 3 + 2; // 2-5 detik
        const randomDelay = Math.random() * 0.5; // 0-0.5 detik delay
        
        confetti.style.animation = `fall ${animationDuration}s ease-in ${randomDelay}s forwards`;
        
        // Tambahkan ke container
        container.appendChild(confetti);
        
        // Hapus setelah animasi selesai
        setTimeout(() => {
            confetti.remove();
        }, (animationDuration + randomDelay) * 1000);
    }
}

// Tambahkan keyframe untuk animasi jatuh konfeti
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
@keyframes fall {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
    }
    25% {
        transform: translateY(25%) rotate(45deg);
        opacity: 0.75;
    }
    50% {
        transform: translateY(50%) rotate(90deg);
        opacity: 0.5;
    }
    75% {
        transform: translateY(75%) rotate(135deg);
        opacity: 0.25;
    }
    100% {
        transform: translateY(100%) rotate(180deg);
        opacity: 0;
    }
}`;
document.head.appendChild(styleSheet);

// Tambahkan efek suara klik
function addClickSoundEffects() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const audio = new Audio('assets/sounds/click.mp3');
            audio.volume = 0.5;
            audio.play().catch(err => console.log('Audio tidak dapat diputar:', err));
        });
    });
}

// Jalankan setelah dokumen dimuat
if (document.readyState === 'complete') {
    addClickSoundEffects();
} else {
    window.addEventListener('load', addClickSoundEffects);
}
