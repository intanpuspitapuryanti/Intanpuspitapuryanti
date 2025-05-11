/**
 * Script tambahan untuk memperbaiki masalah feedback
 * Letakkan ini di akhir body setelah semua script lain untuk memastikan
 * bahwa fungsi showFeedback tersedia dan dijalankan dengan benar
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Fix feedback script loaded');
    
    // Perbaiki fungsi showFeedback jika tidak berfungsi seperti yang diharapkan
    window.showFeedback = function(element, isCorrect, message) {
        console.log(`Showing feedback: ${message}, isCorrect: ${isCorrect}`);
        
        if (!element) {
            console.error('Error: Feedback element not found!');
            return;
        }
        
        // Pastikan elemen terlihat
        element.style.display = 'block';
        
        // Reset kelas
        element.classList.remove('correct', 'incorrect');
        
        // Tambahkan kelas yang sesuai
        if (isCorrect) {
            element.classList.add('correct');
        } else {
            element.classList.add('incorrect');
        }
        
        // Tetapkan pesan
        element.textContent = message;
        
        // Tambahkan animasi sederhana
        element.animate([
            { transform: 'scale(0.8)', opacity: 0 },
            { transform: 'scale(1.1)', opacity: 1 },
            { transform: 'scale(1)', opacity: 1 }
        ], {
            duration: 400,
            easing: 'ease-out'
        });
        
        // Trigger event kustom yang bisa ditangkap oleh animations.js
        if (isCorrect) {
            const feedbackEvent = new CustomEvent('feedbackShown', { 
                detail: { isCorrect: true, element: element }
            });
            document.dispatchEvent(feedbackEvent);
        }
    };
    
    // Tangani klik opsi secara langsung di sini juga untuk memastikan feedback muncul
    document.querySelectorAll('.option-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Jadi handler kedua untuk memastikan feedback muncul
            setTimeout(() => {
                const section = this.closest('.game-section');
                if (!section) return;
                
                const isTebakGambar = section.id === 'tebak-gambar-section';
                const currentData = isTebakGambar ? 
                    (typeof gambarShuffledData !== 'undefined' ? gambarShuffledData : null) : 
                    (typeof suaraShuffledData !== 'undefined' ? suaraShuffledData : null);
                
                const currentIndex = isTebakGambar ? 
                    (typeof currentGambarIndex !== 'undefined' ? currentGambarIndex : -1) : 
                    (typeof currentSuaraIndex !== 'undefined' ? currentSuaraIndex : -1);
                
                // Pastikan data valid
                if (!currentData || currentIndex < 0 || currentIndex >= currentData.length) return;
                
                const correctAnswer = currentData[currentIndex].correctAnswer;
                const isCorrect = this.textContent === correctAnswer;
                
                // Dapatkan elemen feedback
                const feedbackId = isTebakGambar ? 'gambar-feedback' : 'suara-feedback';
                const feedbackElement = document.getElementById(feedbackId);
                
                if (feedbackElement) {
                    // Tampilkan feedback jika belum terlihat
                    if (!feedbackElement.textContent) {
                        showFeedback(feedbackElement, isCorrect, 
                            isCorrect ? 'Benar!' : 'Salah! Jawaban yang benar adalah ' + correctAnswer);
                    }
                    
                    // Jika benar, tambahkan animasi konfeti
                    if (isCorrect && typeof createConfetti === 'function') {
                        setTimeout(() => createConfetti(feedbackElement), 100);
                    }
                }
            }, 50);
        }, { passive: true });
    });
    
    // Event listener untuk perubahan konten DOM (ketika opsi baru dibuat)
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && node.classList && node.classList.contains('option-btn')) {
                        // Tambahkan event listener untuk opsi baru
                        node.addEventListener('click', function() {
                            // Sama logikanya dengan handler di atas, tetapi disingkat
                            setTimeout(() => {
                                const section = this.closest('.game-section');
                                if (!section) return;
                                
                                const feedbackId = section.id === 'tebak-gambar-section' ? 
                                    'gambar-feedback' : 'suara-feedback';
                                const feedbackElement = document.getElementById(feedbackId);
                                
                                // Jika opsi ini memiliki kelas 'correct', berarti jawaban benar
                                if (this.classList.contains('correct') && feedbackElement) {
                                    // Tampilkan konfeti jika fungsi tersedia
                                    if (typeof createConfetti === 'function') {
                                        setTimeout(() => createConfetti(feedbackElement), 100);
                                    }
                                }
                            }, 50);
                        }, { passive: true });
                    }
                });
            }
        });
    });
    
    // Amati perubahan pada container opsi
    observer.observe(document.getElementById('gambar-options') || document.body, { 
        childList: true, 
        subtree: true 
    });
    observer.observe(document.getElementById('suara-options') || document.body, { 
        childList: true, 
        subtree: true 
    });
    
    // Tangani event kustom dari animations.js
    document.addEventListener('feedbackShown', function(e) {
        if (e.detail.isCorrect && e.detail.element) {
            if (typeof createConfetti === 'function') {
                createConfetti(e.detail.element);
            }
        }
    });
});
