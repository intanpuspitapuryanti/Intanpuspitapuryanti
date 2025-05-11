// Animasi untuk aplikasi Tebak-Tebakan
document.addEventListener('DOMContentLoaded', function() {
    console.log('Animation script loaded');
    
    // Event listener untuk jawaban benar
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('option-btn')) {
            // Tunggu sebentar agar kelas 'correct' atau 'incorrect' ditambahkan terlebih dahulu
            setTimeout(() => {
                console.log('Checking for correct answer');
                if (event.target.classList.contains('correct')) {
                    console.log('Correct answer clicked, triggering animation');
                    const feedbackElement = document.querySelector('.feedback.correct');
                    if (feedbackElement) {
                        createConfetti(feedbackElement);
                    } else {
                        console.log('Feedback element not found, trying alternative approach');
                        // Coba temukan elemen feedback dengan cara lain
                        const gameSection = event.target.closest('.game-section');
                        if (gameSection) {
                            const feedbackAlt = gameSection.querySelector('.feedback');
                            if (feedbackAlt) {
                                createConfetti(feedbackAlt);
                            }
                        }
                    }
                }
            }, 100);
        }
    });
});

// Efek konfeti sederhana untuk jawaban benar
function createConfetti(element) {
    console.log('Creating confetti effect');
    
    const container = element.closest('.game-container');
    if (!container) {
        console.error('Error: Game container not found for confetti effect!');
        return;
    }
    
    // Buat konfeti
    const confettiCount = 30; // Lebih sedikit untuk performa yang lebih baik
    const colors = ['#ff6b6b', '#5D3FD3', '#00E5FF', '#FFDB0F'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.left = `${Math.random() * container.offsetWidth}px`;
        confetti.style.top = `${Math.random() * 200}px`;
        confetti.style.opacity = '1';
        confetti.style.zIndex = '1000';
        confetti.style.pointerEvents = 'none'; // Agar tidak mengganggu interaksi pengguna
        
        // Animasi konfeti
        confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${Math.random() * 200 + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 2000 + 1000,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });
        
        container.appendChild(confetti);
        
        // Hapus setelah animasi selesai
        setTimeout(() => {
            if (confetti && confetti.parentNode) {
                confetti.remove();
            }
        }, Math.random() * 2000 + 1000);
    }
}

// Tambahkan animasi hover untuk tombol opsi
document.addEventListener('DOMContentLoaded', function() {
    // Tambahkan efek hover untuk elemen
    function addHoverEffect(selector) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.transition = 'transform 0.2s ease';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // Tambahkan efek hover untuk tombol-tombol
    addHoverEffect('.option-btn');
    addHoverEffect('.next-btn');
    addHoverEffect('.sound-btn');
    
    // Tambahkan efek pulse pada sound button
    const soundButton = document.getElementById('play-sound');
    if (soundButton) {
        // Animasi pulse untuk tombol suara
        setInterval(() => {
            soundButton.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(1.1)' },
                { transform: 'scale(1)' }
            ], {
                duration: 2000,
                iterations: 1
            });
        }, 5000); // Ulangi setiap 5 detik
    }
});

// Animasi saat pergantian tab
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.menu button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Animasi section yang muncul
            const targetId = this.id === 'tebak-gambar-btn' ? 
                'tebak-gambar-section' : 'tebak-suara-section';
            
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.animation = 'none';
                setTimeout(() => {
                    targetSection.style.animation = 'popIn 0.5s';
                }, 10);
            }
        });
    });
    
    // Animasi saat jawaban benar
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('option-btn')) {
            // Dapatkan jawaban yang benar dari konteks permainan
            let correctAnswer = '';
            
            // Cek di mana kita berada (tebak gambar atau tebak suara)
            const gambarSection = document.getElementById('tebak-gambar-section');
            const isGambarActive = gambarSection && gambarSection.classList.contains('active');
            
            if (isGambarActive && typeof currentGambarIndex !== 'undefined' && gambarShuffledData && 
                currentGambarIndex < gambarShuffledData.length) {
                correctAnswer = gambarShuffledData[currentGambarIndex].correctAnswer;
            } else if (typeof currentSuaraIndex !== 'undefined' && suaraShuffledData && 
                currentSuaraIndex < suaraShuffledData.length) {
                correctAnswer = suaraShuffledData[currentSuaraIndex].correctAnswer;
            }
            
            // Jika jawaban benar, animasikan gambar jika ada
            if (event.target.textContent === correctAnswer) {
                console.log('Correct answer detected, animating image');
                
                // Animasi gambar jika di bagian tebak gambar
                if (isGambarActive) {
                    const imageElement = document.getElementById('gambar-tebakan');
                    if (imageElement) {
                        imageElement.animate([
                            { transform: 'scale(1)' },
                            { transform: 'scale(1.1)' },
                            { transform: 'scale(1)' }
                        ], {
                            duration: 500,
                            iterations: 1
                        });
                    }
                }
                
                // Tampilkan dan animasikan feedback
                setTimeout(() => {
                    let feedbackElement;
                    if (isGambarActive) {
                        feedbackElement = document.getElementById('gambar-feedback');
                    } else {
                        feedbackElement = document.getElementById('suara-feedback');
                    }
                    
                    if (feedbackElement) {
                        showFeedback(feedbackElement, true, 'Benar!');
                        createConfetti(feedbackElement);
                    }
                }, 50);
            }
        }
    });
});
