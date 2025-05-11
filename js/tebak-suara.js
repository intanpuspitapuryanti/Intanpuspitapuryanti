// Variabel state untuk game Tebak Suara
let currentSuaraIndex = 0;
let suaraScore = 0;
let suaraShuffledData = [];
let audioElement = null;

// Inisialisasi game Tebak Suara
function initializeTebakSuara() {
    console.log('Initializing Tebak Suara game...');
    
    // Cek ketersediaan data
    if (!tebakSuaraData || !Array.isArray(tebakSuaraData) || tebakSuaraData.length === 0) {
        console.error('Error: Tebak Suara data not available or empty!');
        return;
    }
    
    // Acak urutan data game
    suaraShuffledData = shuffleArray(tebakSuaraData);
    currentSuaraIndex = 0;
    suaraScore = 0;
    
    // Siapkan elemen audio
    audioElement = document.getElementById('suara-tebakan');
    if (!audioElement) {
        console.error('Error: suara-tebakan audio element not found!');
    }
    
    // Update tampilan skor
    const scoreElement = document.getElementById('suara-score');
    if (scoreElement) {
        updateScore(scoreElement, suaraScore);
    } else {
        console.error('Error: suara-score element not found!');
    }
    
    // Siapkan tombol play
    const playButton = document.getElementById('play-sound');
    if (playButton) {
        // Hapus event listener lama untuk menghindari duplikasi
        playButton.removeEventListener('click', playCurrentSound);
        playButton.addEventListener('click', playCurrentSound);
        console.log('Play button event listener added for Tebak Suara');
    } else {
        console.error('Error: play-sound button not found!');
    }
    
    // Tampilkan pertanyaan pertama
    displaySuaraQuestion(currentSuaraIndex);
    
    // Tambahkan event listener untuk tombol "Next"
    const nextButton = document.getElementById('next-suara');
    if (nextButton) {
        // Hapus event listener lama
        nextButton.removeEventListener('click', nextSuaraQuestion);
        nextButton.addEventListener('click', nextSuaraQuestion);
        console.log('Next button event listener added for Tebak Suara');
    } else {
        console.error('Error: next-suara button not found!');
    }
}

// Putar suara saat ini
function playCurrentSound() {
    console.log('Play button clicked');
    
    if (!audioElement) {
        console.error('Audio element not initialized!');
        return;
    }
    
    if (currentSuaraIndex < suaraShuffledData.length) {
        audioElement.src = suaraShuffledData[currentSuaraIndex].sound;
        console.log(`Playing sound: ${suaraShuffledData[currentSuaraIndex].sound}`);
        
        // Coba putar audio dan tangani kesalahan
        const playPromise = audioElement.play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Pemutaran berhasil
                console.log('Audio playback started successfully');
            })
            .catch(error => {
                // Pemutaran gagal
                console.error('Audio playback failed:', error);
                alert('Gagal memainkan suara. Pastikan file suara tersedia dan format didukung.');
            });
        }
    }
}

// Tampilkan pertanyaan saat ini
function displaySuaraQuestion(index) {
    console.log(`Displaying Tebak Suara question index: ${index}`);
    
    if (index >= suaraShuffledData.length) {
        // Akhir game, mulai ulang
        endTebakSuara();
        return;
    }
    
    const currentQuestion = suaraShuffledData[index];
    
    // Siapkan sumber audio
    if (audioElement) {
        audioElement.src = currentQuestion.sound;
        console.log(`Set audio source to: ${currentQuestion.sound}`);
    }
    
    // Buat opsi yang diacak
    const shuffledOptions = shuffleArray(currentQuestion.options);
    
    // Buat tombol-tombol opsi
    createOptionButtons(shuffledOptions, 'suara-options', handleSuaraOptionClick);
    
    // Bersihkan feedback sebelumnya
    const feedbackElement = document.getElementById('suara-feedback');
    if (feedbackElement) {
        feedbackElement.textContent = '';
        feedbackElement.className = 'feedback';
    } else {
        console.error('Error: suara-feedback element not found!');
    }
    
    // Sembunyikan tombol Next sampai jawaban dipilih
    const nextButton = document.getElementById('next-suara');
    if (nextButton) {
        nextButton.style.display = 'none';
    } else {
        console.error('Error: next-suara button not found!');
    }
}

// Tangani klik pada opsi
function handleSuaraOptionClick(event) {
    const selectedOption = event.target.textContent;
    const currentQuestion = suaraShuffledData[currentSuaraIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    console.log(`Option clicked: ${selectedOption}, Correct answer: ${currentQuestion.correctAnswer}, isCorrect: ${isCorrect}`);
    
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
}

// Pindah ke pertanyaan berikutnya
function nextSuaraQuestion() {
    console.log('Moving to next Tebak Suara question');
    currentSuaraIndex++;
    displaySuaraQuestion(currentSuaraIndex);
}

// Akhiri game dan mulai ulang
function endTebakSuara() {
    console.log('Game over for Tebak Suara');
    
    // Tampilkan pesan game over
    const feedbackElement = document.getElementById('suara-feedback');
    if (feedbackElement) {
        feedbackElement.textContent = `Game selesai! Skor Anda: ${suaraScore}/${suaraShuffledData.length}`;
        feedbackElement.className = 'feedback';
    }
    
    // Kosongkan opsi
    const optionsContainer = document.getElementById('suara-options');
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
    }
    
    // Ubah teks tombol next menjadi restart
    const nextButton = document.getElementById('next-suara');
    if (nextButton) {
        nextButton.textContent = 'Main Lagi';
        nextButton.style.display = 'block';
        
        // Hapus event listener lama
        nextButton.removeEventListener('click', nextSuaraQuestion);
        
        // Tambahkan event listener untuk restart
        const restartHandler = function() {
            nextButton.textContent = 'Selanjutnya';
            nextButton.removeEventListener('click', restartHandler);
            nextButton.addEventListener('click', nextSuaraQuestion);
            initializeTebakSuara();
        };
        
        nextButton.addEventListener('click', restartHandler);
    }
}
