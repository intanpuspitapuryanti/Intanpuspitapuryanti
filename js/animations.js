// Simplified animations.js - efek pada jawaban benar
document.addEventListener('DOMContentLoaded', function() {
    // Event listener untuk jawaban benar
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
});

// Efek konfeti sederhana untuk jawaban benar
function createConfetti(element) {
    const container = element.closest('.game-container');
    
    // Buat 30 konfeti (lebih sedikit untuk performa lebih baik)
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = ['#ff6b6b', '#5D3FD3', '#00E5FF', '#FFDB0F'][Math.floor(Math.random() * 4)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.left = `${Math.random() * container.offsetWidth}px`;
        confetti.style.top = `${Math.random() * 200}px`;
        confetti.style.opacity = '1';
        
        // Animasi simple
        confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${Math.random() * 200 + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 2000 + 1000,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });
        
        container.appendChild(confetti);
        
        // Hapus setelah animasi selesai
        setTimeout(() => confetti.remove(), Math.random() * 2000 + 1000);
    }
}
