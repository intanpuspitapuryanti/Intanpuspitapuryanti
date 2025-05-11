// Variabel state untuk game Tebak Gambar
let currentGambarIndex = 0;
let gambarScore = 0;
let gambarShuffledData = [];

// Inisialisasi game Tebak Gambar
function initializeTebakGambar() {
    console.log('Initializing Tebak Gambar game...');
    
    // Cek ketersediaan data
    if (!tebakGambarData || !Array.isArray(tebakGambarData) || tebakGambarData.length === 0) {
        console.error('Error: Tebak Gambar data not available or empty!');
        return;
    }
    
    // Acak urutan data game untuk setiap sesi bermain
    gambarShuffledData = shuffleArray(tebakGambarData);
    currentGambarIndex = 0;
    gambarScore = 0;
    
    // Update tampilan skor
    const scoreElement = document.getElementById('gambar-score');
    if (scoreElement) {
        updateScore(scoreElement, gambarScore);
    } else {
        console.error('Error: gambar-score element not found!');
    }
    
    // Tampilkan pertanyaan pertama
    displayGambarQuestion(currentGambarIndex);
    
    // Tambahkan event listener untuk tombol "Next"
    const nextButton = document.getElementById('next-gambar');
    if (nextButton) {
        // Hapus event listener yang lama untuk menghindari duplikasi
        nextButton.removeEventListener('click', nextGambarQuestion);
        nextButton.addEventListener('click', nextGambarQuestion);
        console.log('Next button event listener added for Tebak Gambar');
    } else {
        console.error('Error: next-gambar button not found!');
    }
}

// Tampilkan pertanyaan saat ini
function displayGambarQuestion(index) {
    console.log(`Displaying Tebak Gambar question index: ${index}`);
    
    if (index >= gambarShuffledData.length) {
        // Akhir game, mulai ulang
        endTebakGambar();
        return;
    }
    
    const currentQuestion = gambarShuffledData[index];
    
    // Update gambar
    const imageElement = document.getElementById('gambar-tebakan');
    if (imageElement) {
        imageElement.src = currentQuestion.image;
        imageElement.alt = 'Tebak gambar ini';
        console.log(`Set image source to: ${currentQuestion.image}`);
    } else {
        console.error('Error: gambar-tebakan element not found!');
    }
    
    // Buat opsi yang diacak
    const shuffledOptions = shuffleArray(currentQuestion.options);
    
    // Buat tombol-tombol opsi
    createOptionButtons(shuffledOptions, 'gambar-options', handleGambarOptionClick);
    
    // Bersihkan feedback sebelumnya
    const feedbackElement = document.getElementById('gambar-feedback');
    if (feedbackElement) {
        feedbackElement.textContent = '';
        feedbackElement.className = 'feedback';
    } else {
        console.error('Error: gambar-feedback element not found!');
    }
    
    // Sembunyikan tombol Next sampai jawaban dipilih
    const nextButton = document.getElementById('next-gambar');
    if (nextButton) {
        nextButton.style.display = 'none';
    } else {
        console.error('Error: next-gambar button not found!');
    }
}

// Tangani klik pada opsi
function handleGambarOptionClick(event) {
    const selectedOption = event.target.textContent;
    const currentQuestion = gambarShuffledData[currentGambarIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    console.log(`Option clicked: ${selectedOption}, Correct answer: ${currentQuestion.correctAnswer}, isCorrect: ${isCorrect}`);
    
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
}

// Pindah ke pertanyaan berikutnya
function nextGambarQuestion() {
    console.log('Moving to next Tebak Gambar question');
    currentGambarIndex++;
    displayGambarQuestion(currentGambarIndex);
}

// Akhiri game dan mulai ulang
function endTebakGambar() {
    console.log('Game over for Tebak Gambar');
    
    // Tampilkan pesan game over
    const feedbackElement = document.getElementById('gambar-feedback');
    if (feedbackElement) {
        feedbackElement.textContent = `Game selesai! Skor Anda: ${gambarScore}/${gambarShuffledData.length}`;
        feedbackElement.className = 'feedback';
    }
    
    // Kosongkan opsi
    const optionsContainer = document.getElementById('gambar-options');
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
    }
    
    // Ubah teks tombol next menjadi restart
    const nextButton = document.getElementById('next-gambar');
    if (nextButton) {
        nextButton.textContent = 'Main Lagi';
        nextButton.style.display = 'block';
        
        // Hapus event listener lama
        nextButton.removeEventListener('click', nextGambarQuestion);
        
        // Tambahkan event listener untuk restart
        const restartHandler = function() {
            nextButton.textContent = 'Selanjutnya';
            nextButton.removeEventListener('click', restartHandler);
            nextButton.addEventListener('click', nextGambarQuestion);
            initializeTebakGambar();
        };
        
        nextButton.addEventListener('click', restartHandler);
    }
}
