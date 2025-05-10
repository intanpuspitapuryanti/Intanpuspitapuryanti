// imageGame.js - Logika untuk permainan tebak gambar

// Elemen-elemen DOM
const questionImage = document.getElementById("question-image");
const imageOptions = document.getElementById("image-options");
const imageFeedback = document.getElementById("image-feedback");
const imageScore = document.getElementById("image-score");

// Variabel state
let currentImageQuestion = 0;
let imageScoreValue = 0;

// Fungsi untuk memuat pertanyaan gambar
function loadImageQuestion(index) {
    // Reset kembali ke awal jika sudah mencapai akhir
    if (index >= imageQuestions.length) {
        index = 0;
        currentImageQuestion = 0;
    }
    
    const question = imageQuestions[index];
    
    // Set gambar pertanyaan
    questionImage.src = question.image;
    questionImage.alt = "Tebak gambar apa ini?";
    
    // Bersihkan opsi dan feedback sebelumnya
    imageOptions.innerHTML = "";
    imageFeedback.textContent = "";
    imageFeedback.className = "feedback";
    
    // Acak opsi jawaban
    const shuffledOptions = [...question.options];
    shuffleArray(shuffledOptions);
    
    // Buat tombol untuk setiap opsi
    shuffledOptions.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "option-button";
        button.addEventListener("click", () => checkImageAnswer(option, question.correctAnswer));
        imageOptions.appendChild(button);
    });
}

// Fungsi untuk memeriksa jawaban
function checkImageAnswer(selectedOption, correctAnswer) {
    // Nonaktifkan semua tombol opsi selama feedback
    const optionButtons = imageOptions.querySelectorAll(".option-button");
    optionButtons.forEach(button => {
        button.disabled = true;
    });
    
    if (selectedOption === correctAnswer) {
        // Jawaban benar
        imageFeedback.textContent = "Benar! 👏";
        imageFeedback.className = "feedback correct";
        
        // Tambah skor
        imageScoreValue += 10;
        imageScore.textContent = imageScoreValue;
        
        // Lanjut ke pertanyaan berikutnya setelah delay
        setTimeout(() => {
            currentImageQuestion++;
            loadImageQuestion(currentImageQuestion);
        }, 1500);
    } else {
        // Jawaban salah
        imageFeedback.textContent = "Coba lagi! 🤔";
        imageFeedback.className = "feedback incorrect";
        
        // Aktifkan kembali tombol setelah delay
        setTimeout(() => {
            optionButtons.forEach(button => {
                button.disabled = false;
            });
        }, 1000);
    }
}

// Fungsi untuk mereset skor
function resetImageScore() {
    imageScoreValue = 0;
    imageScore.textContent = imageScoreValue;
}
