// soundGame.js - Logika untuk permainan tebak suara

// Elemen-elemen DOM
const playSound = document.getElementById("play-sound");
const soundOptions = document.getElementById("sound-options");
const soundFeedback = document.getElementById("sound-feedback");
const soundScore = document.getElementById("sound-score");

// Variabel state
let currentSoundQuestion = 0;
let soundScoreValue = 0;
let currentAudio = null;

// Fungsi untuk memuat pertanyaan suara
function loadSoundQuestion(index) {
    // Reset kembali ke awal jika sudah mencapai akhir
    if (index >= soundQuestions.length) {
        index = 0;
        currentSoundQuestion = 0;
    }
    
    const question = soundQuestions[index];
    
    // Siapkan audio (tapi jangan diputar dulu)
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    currentAudio = new Audio(question.sound);
    
    // Bersihkan opsi dan feedback sebelumnya
    soundOptions.innerHTML = "";
    soundFeedback.textContent = "";
    soundFeedback.className = "feedback";
    
    // Acak opsi jawaban
    const shuffledOptions = [...question.options];
    shuffleArray(shuffledOptions);
    
    // Buat tombol untuk setiap opsi
    shuffledOptions.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "option-button";
        button.addEventListener("click", () => checkSoundAnswer(option, question.correctAnswer));
        soundOptions.appendChild(button);
    });
}

// Event listener untuk tombol putar suara
playSound.addEventListener("click", playCurrentSound);

// Fungsi untuk memutar suara pertanyaan saat ini
function playCurrentSound() {
    if (currentAudio) {
        // Reset audio jika sudah pernah diputar
        currentAudio.currentTime = 0;
        
        // Tambahkan kelas playing untuk visual feedback
        playSound.classList.add("playing");
        
        // Putar suara
        currentAudio.play();
        
        // Hapus kelas playing setelah suara selesai
        currentAudio.onended = function() {
            playSound.classList.remove("playing");
        };
    }
}

// Fungsi untuk memeriksa jawaban
function checkSoundAnswer(selectedOption, correctAnswer) {
    // Nonaktifkan semua tombol opsi selama feedback
    const optionButtons = soundOptions.querySelectorAll(".option-button");
    optionButtons.forEach(button => {
        button.disabled = true;
    });
    
    if (selectedOption === correctAnswer) {
        // Jawaban benar
        soundFeedback.textContent = "Benar! 👏";
        soundFeedback.className = "feedback correct";
        
        // Tambah skor
        soundScoreValue += 10;
        soundScore.textContent = soundScoreValue;
        
        // Lanjut ke pertanyaan berikutnya setelah delay
        setTimeout(() => {
            currentSoundQuestion++;
            loadSoundQuestion(currentSoundQuestion);
        }, 1500);
    } else {
        // Jawaban salah
        soundFeedback.textContent = "Coba lagi! 🤔";
        soundFeedback.className = "feedback incorrect";
        
        // Aktifkan kembali tombol setelah delay
        setTimeout(() => {
            optionButtons.forEach(button => {
                button.disabled = false;
            });
        }, 1000);
    }
}

// Fungsi untuk mereset skor
function resetSoundScore() {
    soundScoreValue = 0;
    soundScore.textContent = soundScoreValue;
}
