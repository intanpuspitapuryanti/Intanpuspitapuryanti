// Fix untuk masalah feedback yang menghilang
document.addEventListener('DOMContentLoaded', function() {
    console.log('Feedback fix loaded');
    
    // Override fungsi showFeedback untuk memastikan tetap terlihat
    // Save original function reference if it exists
    const originalShowFeedback = window.showFeedback;
    
    // Override the function
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
    };
    
    // Perbaikan untuk tebak gambar
    const fixTebakGambarNextButton = function() {
        const nextButton = document.getElementById('next-gambar');
        if (nextButton) {
            const originalNextHandler = nextGambarQuestion;
            
            // Replace the next button handler
            nextButton.removeEventListener('click', nextGambarQuestion);
            nextButton.addEventListener('click', function modifiedNextGambar() {
                // Advance to next question
                currentGambarIndex++;
                displayGambarQuestion(currentGambarIndex);
            });
        }
    };
    
    // Perbaikan untuk tebak suara
    const fixTebakSuaraNextButton = function() {
        const nextButton = document.getElementById('next-suara');
        if (nextButton) {
            const originalNextHandler = nextSuaraQuestion;
            
            // Replace the next button handler
            nextButton.removeEventListener('click', nextSuaraQuestion);
            nextButton.addEventListener('click', function modifiedNextSuara() {
                // Advance to next question
                currentSuaraIndex++;
                displaySuaraQuestion(currentSuaraIndex);
            });
        }
    };
    
    // Perbaikan fungsi display question untuk tebak gambar
    const originalDisplayGambarQuestion = window.displayGambarQuestion;
    window.displayGambarQuestion = function(index) {
        // Panggil fungsi asli
        if (typeof originalDisplayGambarQuestion === 'function') {
            originalDisplayGambarQuestion(index);
        } else {
            console.log('Original displayGambarQuestion not available, running fallback');
            // Logika fallback jika fungsi asli tidak tersedia
            if (index >= gambarShuffledData.length) {
                endTebakGambar();
                return;
            }
            
            const currentQuestion = gambarShuffledData[index];
            const imageElement = document.getElementById('gambar-tebakan');
            if (imageElement) {
                imageElement.src = currentQuestion.image;
                imageElement.alt = 'Tebak gambar ini';
            }
            
            // Buat opsi yang diacak
            const shuffledOptions = shuffleArray(currentQuestion.options);
            
            // Buat tombol-tombol opsi
            createOptionButtons(shuffledOptions, 'gambar-options', handleGambarOptionClick);
        }
        
        // Perbaikan: SELALU bersihkan feedback saat pindah ke pertanyaan baru
        const feedbackElement = document.getElementById('gambar-feedback');
        if (feedbackElement) {
            feedbackElement.textContent = '';
            feedbackElement.className = 'feedback';
        }
        
        // Sembunyikan tombol Next sampai jawaban dipilih
        const nextButton = document.getElementById('next-gambar');
        if (nextButton) {
            nextButton.style.display = 'none';
        }
    };
    
    // Perbaikan fungsi display question untuk tebak suara
    const originalDisplaySuaraQuestion = window.displaySuaraQuestion;
    window.displaySuaraQuestion = function(index) {
        // Panggil fungsi asli
        if (typeof originalDisplaySuaraQuestion === 'function') {
            originalDisplaySuaraQuestion(index);
        } else {
            console.log('Original displaySuaraQuestion not available, running fallback');
            // Logika fallback jika fungsi asli tidak tersedia
            if (index >= suaraShuffledData.length) {
                endTebakSuara();
                return;
            }
            
            const currentQuestion = suaraShuffledData[index];
            if (audioElement) {
                audioElement.src = currentQuestion.sound;
            }
            
            // Buat opsi yang diacak
            const shuffledOptions = shuffleArray(currentQuestion.options);
            
            // Buat tombol-tombol opsi
            createOptionButtons(shuffledOptions, 'suara-options', handleSuaraOptionClick);
        }
        
        // Perbaikan: SELALU bersihkan feedback saat pindah ke pertanyaan baru
        const feedbackElement = document.getElementById('suara-feedback');
        if (feedbackElement) {
            feedbackElement.textContent = '';
            feedbackElement.className = 'feedback';
        }
        
        // Sembunyikan tombol Next sampai jawaban dipilih
        const nextButton = document.getElementById('next-suara');
        if (nextButton) {
            nextButton.style.display = 'none';
        }
    };
    
    // Fix untuk event handler tebak gambar
    const originalHandleGambarOptionClick = window.handleGambarOptionClick;
    window.handleGambarOptionClick = function(event) {
        const selectedOption = event.target.textContent;
        const currentQuestion = gambarShuffledData[currentGambarIndex];
        const isCorrect = selectedOption === currentQuestion.correctAnswer;
        
        // Nonaktifkan semua tombol opsi
        const optionButtons = document.querySelectorAll('#gambar-options .option-btn');
        optionButtons.forEach(button => {
            button.disabled = true;
            
            // Sorot jawaban benar dan salah
            if (button.textContent === currentQuestion.correctAnswer) {
                button.classList.add('correct');
            } else if (button.textContent === selectedOption && !isCorrect) {
                button.classList.add('incorrect');
            }
        });
        
        // Tampilkan feedback
        const feedbackElement = document.getElementById('gambar-feedback');
        if (feedbackElement) {
            if (isCorrect) {
                showFeedback(feedbackElement, true, 'Benar!');
                gambarScore++;
                const scoreElement = document.getElementById('gambar-score');
                if (scoreElement) {
                    updateScore(scoreElement, gambarScore);
                }
            } else {
                showFeedback(feedbackElement, false, 'Salah! Jawaban yang benar adalah ' + currentQuestion.correctAnswer);
            }
        }
        
        // Tampilkan tombol Next
        const nextButton = document.getElementById('next-gambar');
        if (nextButton) {
            nextButton.style.display = 'block';
        }
    };
    
    // Fix untuk event handler tebak suara
    const originalHandleSuaraOptionClick = window.handleSuaraOptionClick;
    window.handleSuaraOptionClick = function(event) {
        const selectedOption = event.target.textContent;
        const currentQuestion = suaraShuffledData[currentSuaraIndex];
        const isCorrect = selectedOption === currentQuestion.correctAnswer;
        
        // Nonaktifkan semua tombol opsi
        const optionButtons = document.querySelectorAll('#suara-options .option-btn');
        optionButtons.forEach(button => {
            button.disabled = true;
            
            // Sorot jawaban benar dan salah
            if (button.textContent === currentQuestion.correctAnswer) {
                button.classList.add('correct');
            } else if (button.textContent === selectedOption && !isCorrect) {
                button.classList.add('incorrect');
            }
        });
        
        // Tampilkan feedback
        const feedbackElement = document.getElementById('suara-feedback');
        if (feedbackElement) {
            if (isCorrect) {
                showFeedback(feedbackElement, true, 'Benar!');
                suaraScore++;
                const scoreElement = document.getElementById('suara-score');
                if (scoreElement) {
                    updateScore(scoreElement, suaraScore);
                }
            } else {
                showFeedback(feedbackElement, false, 'Salah! Jawaban yang benar adalah ' + currentQuestion.correctAnswer);
            }
        }
        
        // Tampilkan tombol Next
        const nextButton = document.getElementById('next-suara');
        if (nextButton) {
            nextButton.style.display = 'block';
        }
    };
    
    // Jalankan perbaikan setelah beberapa waktu untuk memastikan semua skrip dimuat
    setTimeout(function() {
        fixTebakGambarNextButton();
        fixTebakSuaraNextButton();
        
        // Untuk debugging
        console.log('Feedback fix applied successfully');
    }, 500);
});
