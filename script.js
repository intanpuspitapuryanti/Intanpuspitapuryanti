// Debug mode - set ke false untuk menyembunyikan pesan debug
const DEBUG = false;

// Fungsi untuk menambahkan pesan debug
function debug(message) {
    if (DEBUG) {
        const debugInfo = document.getElementById("debug-info");
        debugInfo.style.display = "block";
        debugInfo.innerHTML += message + "<br>";
        console.log(message);
    }
}

// Data kuis tebak gambar
const questionsGambar = [
    {
        question: "Hewan apa ini?",
        image: "assets/images/cat.jpg",
        imageAlt: "Kucing",
        options: ["Kucing", "Anjing", "Kelinci", "Hamster"],
        answer: "Kucing"
    },
    {
        question: "Hewan apa ini?",
        image: "assets/images/elephant.jpg",
        imageAlt: "Gajah",
        options: ["Jerapah", "Gajah", "Singa", "Harimau"],
        answer: "Gajah"
    },
    {
        question: "Hewan apa ini?",
        image: "assets/images/monkey.jpg",
        imageAlt: "Monyet",
        options: ["Gorila", "Orangutan", "Monyet", "Simpanse"],
        answer: "Monyet"
    },
    {
        question: "Hewan apa ini?",
        image: "assets/images/fish.jpg",
        imageAlt: "Ikan",
        options: ["Ikan", "Ubur-ubur", "Gurita", "Lumba-lumba"],
        answer: "Ikan"
    },
    {
        question: "Hewan apa ini?",
        image: "assets/images/bird.jpg",
        imageAlt: "Burung",
        options: ["Ayam", "Bebek", "Burung", "Angsa"],
        answer: "Burung"
    }
];

// Data kuis tebak suara
const questionsSuara = [
    {
        question: "Suara hewan apa ini?",
        sound: "assets/audio/ayam.mp3",
        options: ["Kucing", "Ayam", "Burung", "Singa"],
        answer: "Ayam"
    },
    {
        question: "Suara hewan apa ini?",
        sound: "assets/audio/kucing.mp3",  // Perbaikan typo: kuicing -> kucing
        options: ["Kucing", "Anjing", "Singa", "Macan"],
        answer: "Kucing"
    },
    {
        question: "Suara hewan apa ini?",
        sound: "assets/audio/monyet.mp3",  // Perbaikan typo: moibl -> monyet
        options: ["Lumba-lumba", "Monyet", "Jerapah", "Gajah"],
        answer: "Monyet"
    },
    {
        question: "Suara hewan apa ini?",
        sound: "assets/audio/sapi.mp3",
        options: ["Kerbau", "Rusa", "Sapi", "Kambing"],
        answer: "Sapi"
    },
    {
        question: "Suara hewan apa ini?",
        sound: "assets/audio/anjing.mp3",
        options: ["Anjing", "Serigala", "Rubah", "Hyena"],
        answer: "Anjing"
    }
];

// Variabel global
let currentGameMode = null; // Null, 'gambar', atau 'suara'
let currentQuestionGambar = 0;
let currentQuestionSuara = 0;
let scoreGambar = 0;
let scoreSuara = 0;
let isMusicPlaying = false;
let answersDisabled = false;
let audioInitialized = false;
let isAnimalSoundPlaying = false;

// Elemen DOM - Menu Utama
const mainMenu = document.getElementById("main-menu");
const tebakGambarBtn = document.getElementById("tebak-gambar-btn");
const tebakSuaraBtn = document.getElementById("tebak-suara-btn");

// Elemen DOM - Tebak Gambar
const kuisTebakGambar = document.getElementById("kuis-tebak-gambar");
const questionTextGambar = document.getElementById("question-text-gambar");
const questionImage = document.getElementById("question-image");
const optionsContainerGambar = document.getElementById("options-gambar");
const feedbackContainerGambar = document.getElementById("feedback-gambar");
const scoreElementGambar = document.getElementById("score-gambar");
const nextButtonGambar = document.getElementById("next-button-gambar");
const restartButtonGambar = document.getElementById("restart-button-gambar");
const menuButtonGambar = document.getElementById("menu-button-gambar");
const progressBarGambar = document.getElementById("progress-gambar");

// Elemen DOM - Tebak Suara
const kuisTebakSuara = document.getElementById("kuis-tebak-suara");
const questionTextSuara = document.getElementById("question-text-suara");
const optionsContainerSuara = document.getElementById("options-suara");
const feedbackContainerSuara = document.getElementById("feedback-suara");
const scoreElementSuara = document.getElementById("score-suara");
const nextButtonSuara = document.getElementById("next-button-suara");
const restartButtonSuara = document.getElementById("restart-button-suara");
const menuButtonSuara = document.getElementById("menu-button-suara");
const progressBarSuara = document.getElementById("progress-suara");
const playSoundButton = document.getElementById("play-sound-button");
const animalSound = document.getElementById("animal-sound");

// Audio elements
const correctSound = document.getElementById("correct-sound");
const incorrectSound = document.getElementById("incorrect-sound");
const backgroundMusic = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");

// Fungsi untuk membuat gelembung animasi
function createBubbles() {
    const bubbleContainer = document.querySelector('.bubble-effect');
    const bubbleCount = 10;
    
    // Hapus gelembung yang sudah ada
    const existingBubbles = document.querySelectorAll('.bubble');
    existingBubbles.forEach(bubble => bubble.remove());
    
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        // Ukuran acak
        const size = Math.random() * 60 + 20;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Posisi acak
        const left = Math.random() * 100;
        bubble.style.left = `${left}%`;
        
        // Delay acak
        const animationDelay = Math.random() * 15;
        bubble.style.animationDelay = `${animationDelay}s`;
        
        // Durasi acak
        const animationDuration = Math.random() * 5 + 5;
        bubble.style.animationDuration = `${animationDuration}s`;
        
        bubbleContainer.appendChild(bubble);
    }
}

// Fungsi untuk inisialisasi audio
function initAudio() {
    if (!audioInitialized) {
        // Set volume untuk audio background music
        backgroundMusic.volume = 0.5;
        
        // Pre-load audio untuk mengurangi delay
        correctSound.load();
        incorrectSound.load();
        backgroundMusic.load();
        animalSound.load();
        
        // Pastikan audio tidak tumpang tindih
        correctSound.oncanplaythrough = function() {
            debug("Correct sound ready");
        };
        
        incorrectSound.oncanplaythrough = function() {
            debug("Incorrect sound ready");
        };
        
        // Menghindari multiple play
        correctSound.onplay = function() {
            debug("Correct sound playing");
        };
        
        incorrectSound.onplay = function() {
            debug("Incorrect sound playing");
        };
        
        // Set volume suara hewan
        animalSound.volume = 1.0;
        
        animalSound.onended = function() {
            isAnimalSoundPlaying = false;
            debug("Animal sound ended");
        };
        
        audioInitialized = true;
        debug("Audio initialized");
    }
}

// Fungsi toggle musik
function toggleMusic() {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        musicToggle.innerHTML = "♫";
        isMusicPlaying = false;
    } else {
        if (!audioInitialized) {
            initAudio();
        }
        backgroundMusic.play().catch(e => {
            debug("Error playing music: " + e.message);
        });
        musicToggle.innerHTML = "◼";
        isMusicPlaying = true;
    }
}

// Fungsi untuk memulai kuis tebak gambar
function startTebakGambar() {
    currentGameMode = 'gambar';
    mainMenu.style.display = "none";
    kuisTebakGambar.style.display = "block";
    kuisTebakSuara.style.display = "none";
    
    // Reset nilai kuis
    currentQuestionGambar = 0;
    scoreGambar = 0;
    
    // Perbarui UI
    updateScoreGambar();
    loadQuestionGambar();
    updateProgressBarGambar();
    
    // Animasi gelembung
    createBubbles();
    
    debug("Tebak Gambar started");
}

// Fungsi untuk memulai kuis tebak suara
function startTebakSuara() {
    currentGameMode = 'suara';
    mainMenu.style.display = "none";
    kuisTebakGambar.style.display = "none";
    kuisTebakSuara.style.display = "block";
    
    // Reset nilai kuis
    currentQuestionSuara = 0;
    scoreSuara = 0;
    
    // Perbarui UI
    updateScoreSuara();
    loadQuestionSuara();
    updateProgressBarSuara();
    
    // Animasi gelembung
    createBubbles();
    
    debug("Tebak Suara started");
}

// Fungsi untuk memuat pertanyaan tebak gambar
function loadQuestionGambar() {
    if (currentQuestionGambar < questionsGambar.length) {
        const question = questionsGambar[currentQuestionGambar];
        
        // Set pertanyaan dan gambar
        questionTextGambar.textContent = question.question;
        questionImage.src = question.image;
        questionImage.alt = question.imageAlt;
        
        // Kosongkan container opsi jawaban
        optionsContainerGambar.innerHTML = "";
        
        // Tambahkan opsi jawaban
        question.options.forEach((option, index) => {
            const optionButton = document.createElement("button");
            optionButton.textContent = option;
            optionButton.className = "option";
            optionButton.style = "--i:" + index; // Untuk animasi bertahap
            
            optionButton.addEventListener("click", () => {
                if (!answersDisabled) {
                    checkAnswerGambar(option);
                }
            });
            
            optionsContainerGambar.appendChild(optionButton);
        });
        
        // Sembunyikan feedback
        feedbackContainerGambar.innerHTML = "";
        feedbackContainerGambar.classList.remove("show");
        
        // Sembunyikan tombol berikutnya dan mulai ulang
        nextButtonGambar.style.display = "none";
        restartButtonGambar.style.display = "none";
        
        // Reset status jawaban
        answersDisabled = false;
        
        debug("Loaded question gambar: " + (currentQuestionGambar + 1));
    } else {
        // Kuis selesai, tampilkan ringkasan
        showSummaryGambar();
    }
}

// Fungsi untuk memuat pertanyaan tebak suara
function loadQuestionSuara() {
    if (currentQuestionSuara < questionsSuara.length) {
        const question = questionsSuara[currentQuestionSuara];
        
        // Set pertanyaan dan suara
        questionTextSuara.textContent = question.question;
        
        // Reset isAnimalSoundPlaying sebelum mengubah sumber suara
        isAnimalSoundPlaying = false;
        
        // Perbarui sumber suara
        animalSound.src = question.sound;
        
        // Pre-load audio untuk mengurangi delay
        animalSound.load();
        
        // Kosongkan container opsi jawaban
        optionsContainerSuara.innerHTML = "";
        
        // Tambahkan opsi jawaban
        question.options.forEach((option, index) => {
            const optionButton = document.createElement("button");
            optionButton.textContent = option;
            optionButton.className = "option";
            optionButton.style = "--i:" + index; // Untuk animasi bertahap
            
            optionButton.addEventListener("click", () => {
                if (!answersDisabled) {
                    checkAnswerSuara(option);
                }
            });
            
            optionsContainerSuara.appendChild(optionButton);
        });
        
        // Sembunyikan feedback
        feedbackContainerSuara.innerHTML = "";
        feedbackContainerSuara.classList.remove("show");
        
        // Sembunyikan tombol berikutnya dan mulai ulang
        nextButtonSuara.style.display = "none";
        restartButtonSuara.style.display = "none";
        
        // Reset status jawaban
        answersDisabled = false;
        
        debug("Loaded question suara: " + (currentQuestionSuara + 1));
    } else {
        // Kuis selesai, tampilkan ringkasan
        showSummarySuara();
    }
}

// Perbaikan untuk checkAnswerGambar
function checkAnswerGambar(userAnswer) {
    // Hindari multiple clicks
    if (answersDisabled) return;
    answersDisabled = true;
    
    const correctAnswer = questionsGambar[currentQuestionGambar].answer;
    const isCorrect = userAnswer === correctAnswer;
    
    // Ubah warna tombol jawaban
    const optionButtons = optionsContainerGambar.querySelectorAll(".option");
    optionButtons.forEach(button => {
        if (button.textContent === correctAnswer) {
            button.style.backgroundColor = "#4caf50"; // Warna hijau untuk jawaban benar
        } else if (button.textContent === userAnswer && !isCorrect) {
            button.style.backgroundColor = "#f44336"; // Warna merah untuk jawaban salah
        }
    });
    
    // Perbarui skor jika jawaban benar
    if (isCorrect) {
        scoreGambar++;
        updateScoreGambar();
        
        // Mainkan suara benar jika audio diinisialisasi
        if (audioInitialized) {
            correctSound.currentTime = 0;
            correctSound.play().catch(e => {
                debug("Error playing correct sound: " + e.message);
            });
        }
        
        // Tampilkan feedback positif dengan penanganan error yang lebih baik
        const correctGifPath = "assets/images/correct.gif";
        feedbackContainerGambar.innerHTML = `
            <div style="color: #4caf50; font-weight: bold;">Benar sekali!</div>
            <img src="${correctGifPath}" alt="Correct" class="feedback-gif" 
                 onerror="this.onerror=null; this.src='assets/images/default-correct.png'; debug('GIF correct not found, using fallback');">
        `;
    } else {
        // Mainkan suara salah jika audio diinisialisasi
        if (audioInitialized) {
            incorrectSound.currentTime = 0;
            incorrectSound.play().catch(e => {
                debug("Error playing incorrect sound: " + e.message);
            });
        }
        
        // Tampilkan feedback negatif dengan penanganan error yang lebih baik
        const incorrectGifPath = "assets/images/incorrect.gif";
        feedbackContainerGambar.innerHTML = `
            <div style="color: #f44336; font-weight: bold;">Ups, hampir benar!</div>
            <div>Jawaban yang benar adalah: ${correctAnswer}</div>
            <img src="${incorrectGifPath}" alt="Incorrect" class="feedback-gif"
                 onerror="this.onerror=null; this.src='assets/images/default-incorrect.png'; debug('GIF incorrect not found, using fallback');">
        `;
    }
    
    // Tampilkan feedback
    feedbackContainerGambar.classList.add("show");
    
    // Tampilkan tombol berikutnya atau mulai ulang
    if (currentQuestionGambar < questionsGambar.length - 1) {
        nextButtonGambar.style.display = "inline-block";
    } else {
        restartButtonGambar.style.display = "inline-block";
    }
    
    debug("Checked answer gambar: " + userAnswer + ", Correct: " + isCorrect);
}

// Perbaikan untuk checkAnswerSuara
function checkAnswerSuara(userAnswer) {
    // Hindari multiple clicks
    if (answersDisabled) return;
    answersDisabled = true;
    
    const correctAnswer = questionsSuara[currentQuestionSuara].answer;
    const isCorrect = userAnswer === correctAnswer;
    
    // Ubah warna tombol jawaban
    const optionButtons = optionsContainerSuara.querySelectorAll(".option");
    optionButtons.forEach(button => {
        if (button.textContent === correctAnswer) {
            button.style.backgroundColor = "#4caf50"; // Warna hijau untuk jawaban benar
        } else if (button.textContent === userAnswer && !isCorrect) {
            button.style.backgroundColor = "#f44336"; // Warna merah untuk jawaban salah
        }
    });
    
    // Perbarui skor jika jawaban benar
    if (isCorrect) {
        scoreSuara++;
        updateScoreSuara();
        
        // Mainkan suara benar jika audio diinisialisasi
        if (audioInitialized) {
            correctSound.currentTime = 0;
            correctSound.play().catch(e => {
                debug("Error playing correct sound: " + e.message);
            });
        }
        
        // Tampilkan feedback positif dengan penanganan error yang lebih baik
        const correctGifPath = "assets/images/correct.gif";
        feedbackContainerSuara.innerHTML = `
            <div style="color: #4caf50; font-weight: bold;">Benar sekali!</div>
            <img src="${correctGifPath}" alt="Correct" class="feedback-gif"
                 onerror="this.onerror=null; this.src='assets/images/default-correct.png'; debug('GIF correct not found, using fallback');">
        `;
    } else {
        // Mainkan suara salah jika audio diinisialisasi
        if (audioInitialized) {
            incorrectSound.currentTime = 0;
            incorrectSound.play().catch(e => {
                debug("Error playing incorrect sound: " + e.message);
            });
        }
        
        // Tampilkan feedback negatif dengan penanganan error yang lebih baik
        const incorrectGifPath = "assets/images/incorrect.gif";
        feedbackContainerSuara.innerHTML = `
            <div style="color: #f44336; font-weight: bold;">Ups, hampir benar!</div>
            <div>Jawaban yang benar adalah: ${correctAnswer}</div>
            <img src="${incorrectGifPath}" alt="Incorrect" class="feedback-gif"
                 onerror="this.onerror=null; this.src='assets/images/default-incorrect.png'; debug('GIF incorrect not found, using fallback');">
        `;
    }
    
    // Tampilkan feedback
    feedbackContainerSuara.classList.add("show");
    
    // Tampilkan tombol berikutnya atau mulai ulang
    if (currentQuestionSuara < questionsSuara.length - 1) {
        nextButtonSuara.style.display = "inline-block";
    } else {
        restartButtonSuara.style.display = "inline-block";
    }
    
    debug("Checked answer suara: " + userAnswer + ", Correct: " + isCorrect);
}

// Fungsi untuk memperbarui progress bar tebak gambar
function updateProgressBarGambar() {
    const progressPercentage = ((currentQuestionGambar + 1) / questionsGambar.length) * 100;
    progressBarGambar.style.width = progressPercentage + "%";
}

// Fungsi untuk memperbarui progress bar tebak suara
function updateProgressBarSuara() {
    const progressPercentage = ((currentQuestionSuara + 1) / questionsSuara.length) * 100;
    progressBarSuara.style.width = progressPercentage + "%";
}

// Fungsi untuk memperbarui tampilan skor tebak gambar
function updateScoreGambar() {
    scoreElementGambar.textContent = `Skor: ${scoreGambar}`;
    scoreElementGambar.classList.add("score-update");
    
    // Hapus animasi setelah selesai
    setTimeout(() => {
        scoreElementGambar.classList.remove("score-update");
    }, 500);
}

// Fungsi untuk memperbarui tampilan skor tebak suara
function updateScoreSuara() {
    scoreElementSuara.textContent = `Skor: ${scoreSuara}`;
    scoreElementSuara.classList.add("score-update");
    
    // Hapus animasi setelah selesai
    setTimeout(() => {
        scoreElementSuara.classList.remove("score-update");
    }, 500);
}

// Fungsi untuk menampilkan ringkasan hasil tebak gambar
function showSummaryGambar() {
    questionTextGambar.textContent = "Kuis Selesai!";
    questionImage.src = "assets/images/trophy.jpg";
    questionImage.alt = "Trophy";
    
    optionsContainerGambar.innerHTML = "";
    
    const totalQuestions = questionsGambar.length;
    const percentage = Math.round((scoreGambar / totalQuestions) * 100);
    
    let message;
    if (percentage >= 80) {
        message = "Hebat sekali! Kamu memang pintar!";
    } else if (percentage >= 50) {
        message = "Bagus! Terus berlatih ya!";
    } else {
        message = "Jangan menyerah! Coba lagi ya!";
    }
    
    feedbackContainerGambar.innerHTML = `
        <div style="font-size: 24px; font-weight: bold; margin-bottom: 10px;">
            Skor Akhir: ${scoreGambar}/${totalQuestions} (${percentage}%)
        </div>
        <div style="font-size: 20px; margin-bottom: 20px;">${message}</div>
        <img src="assets/images/finish.gif" alt="Finish" class="feedback-gif" onerror="this.style.display='none'">
    `;
    
    feedbackContainerGambar.classList.add("show");
    
    nextButtonGambar.style.display = "none";
    restartButtonGambar.style.display = "inline-block";
    
    debug("Game gambar finished with score: " + scoreGambar + "/" + totalQuestions);
}

// Fungsi untuk menampilkan ringkasan hasil tebak suara
function showSummarySuara() {
    questionTextSuara.textContent = "Kuis Selesai!";
    
    optionsContainerSuara.innerHTML = "";
    
    const totalQuestions = questionsSuara.length;
    const percentage = Math.round((scoreSuara / totalQuestions) * 100);
    
    let message;
    if (percentage >= 80) {
        message = "Hebat sekali! Telingamu sangat tajam!";
    } else if (percentage >= 50) {
        message = "Bagus! Dengarkan dengan lebih teliti ya!";
    } else {
        message = "Jangan menyerah! Coba lagi ya!";
    }
    
    feedbackContainerSuara.innerHTML = `
        <div style="font-size: 24px; font-weight: bold; margin-bottom: 10px;">
            Skor Akhir: ${scoreSuara}/${totalQuestions} (${percentage}%)
        </div>
        <div style="font-size: 20px; margin-bottom: 20px;">${message}</div>
        <img src="assets/images/finish.gif" alt="Finish" class="feedback-gif" onerror="this.style.display='none'">
    `;
    
    feedbackContainerSuara.classList.add("show");
    
    nextButtonSuara.style.display = "none";
    restartButtonSuara.style.display = "inline-block";
    
    debug("Game suara finished with score: " + scoreSuara + "/" + totalQuestions);
}

// Fungsi untuk kembali ke menu utama
function backToMainMenu() {
    mainMenu.style.display = "block";
    kuisTebakGambar.style.display = "none";
    kuisTebakSuara.style.display = "none";
    currentGameMode = null;
    
    // Reset suara hewan jika sedang diputar
    if (isAnimalSoundPlaying) {
        animalSound.pause();
        isAnimalSoundPlaying = false;
    }
    
    // Animasi gelembung
    createBubbles();
    
    debug("Back to main menu");
}

// Fungsi untuk memutar suara hewan
function playAnimalSound() {
    if (!audioInitialized) {
        initAudio();
    }
    
    // Jika sudah diinisialisasi tetapi tidak sedang diputar
    if (!isAnimalSoundPlaying) {
        // Reset suara untuk memastikan bisa diputar dari awal
        animalSound.currentTime = 0;
        
        // Coba play suara
        const playPromise = animalSound.play();
        
        // Handle jika ada masalah dengan play promise
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isAnimalSoundPlaying = true;
                debug("Animal sound playing");
                
                // Animasi audio visualizer
                const visualizerBars = document.querySelectorAll('.audio-visualizer .bar');
                visualizerBars.forEach(bar => {
                    bar.style.animation = 'none';
                    void bar.offsetWidth; // Trigger reflow
                    bar.style.animation = 'visualize 0.8s ease-in-out infinite alternate';
                });
            }).catch(e => {
                debug("Error playing animal sound: " + e.message);
                isAnimalSoundPlaying = false;
            });
        }
    } else {
        // Jika sedang diputar, stop dan muat ulang
        animalSound.pause();
        animalSound.currentTime = 0;
        
        // Coba play suara
        animalSound.play().then(() => {
            isAnimalSoundPlaying = true;
            debug("Animal sound restarted");
        }).catch(e => {
            debug("Error restarting animal sound: " + e.message);
            isAnimalSoundPlaying = false;
        });
    }
}

// Event Listeners

// Menu utama
tebakGambarBtn.addEventListener("click", function() {
    if (!audioInitialized) {
        initAudio();
    }
    startTebakGambar();
});

tebakSuaraBtn.addEventListener("click", function() {
    if (!audioInitialized) {
        initAudio();
    }
    startTebakSuara();
});

// Tebak Gambar Controls
nextButtonGambar.addEventListener("click", function() {
    currentQuestionGambar++;
    loadQuestionGambar();
    updateProgressBarGambar();
});

restartButtonGambar.addEventListener("click", function() {
    startTebakGambar();
});

menuButtonGambar.addEventListener("click", function() {
    backToMainMenu();
});

// Tebak Suara Controls
nextButtonSuara.addEventListener("click", function() {
    currentQuestionSuara++;
    loadQuestionSuara();
    updateProgressBarSuara();
});

restartButtonSuara.addEventListener("click", function() {
    startTebakSuara();
});

menuButtonSuara.addEventListener("click", function() {
    backToMainMenu();
});

// Play sound button
playSoundButton.addEventListener("click", function() {
    playAnimalSound();
});

// Musik background
musicToggle.addEventListener("click", function() {
    toggleMusic();
});

// Efek hover untuk tombol
document.querySelectorAll(".menu-button, .option, .control-button").forEach(button => {
    button.addEventListener("mouseenter", function() {
        if (audioInitialized) {
            const hoverSound = document.getElementById("hover-sound");
            hoverSound.currentTime = 0;
            hoverSound.volume = 0.3;
            hoverSound.play().catch(e => {
                debug("Error playing hover sound: " + e.message);
            });
        }
    });
});

// Inisialisasi game
document.addEventListener("DOMContentLoaded", function() {
    // Buat element debug_info jika DEBUG aktif
    if (DEBUG) {
        const debugDiv = document.createElement("div");
        debugDiv.id = "debug-info";
        debugDiv.className = "debug-info";
        document.body.appendChild(debugDiv);
    }
    
    // Animasi gelembung saat memulai
    createBubbles();
    
    // Set interval untuk membuat gelembung setiap 10 detik
    setInterval(createBubbles, 10000);
    
    debug("Game initialized");
});

// Inisialisasi audio saat user interaction pertama
document.addEventListener("click", function initOnFirstInteraction() {
    if (!audioInitialized) {
        initAudio();
    }
    // Hapus event listener setelah audio diinisialisasi
    document.removeEventListener("click", initOnFirstInteraction);
    
    debug("Audio initialized on first interaction");
});

// Event listener untuk tombol escape (kembali ke menu)
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        backToMainMenu();
        debug("Escaped to main menu using keyboard");
    }
});

// Perbarui fungsi untuk preload gambar
function preloadImages() {
    const imagesToPreload = [
        "assets/images/cat.jpg",
        "assets/images/elephant.jpg",
        "assets/images/monkey.jpg",
        "assets/images/fish.jpg",
        "assets/images/bird.jpg",
        "assets/images/trophy.jpg",
        "assets/images/correct.gif",
        "assets/images/incorrect.gif",
        "assets/images/finish.gif",
        "assets/images/play-icon.png",
        // Tambahkan gambar fallback
        "assets/images/default-correct.png",
        "assets/images/default-incorrect.png",
        "assets/images/default-finish.png"
    ];

    // Coba untuk preload gambar dan log hasil
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.onload = function() {
            debug("Successfully loaded image: " + src);
        };
        img.onerror = function() {
            debug("Failed to load image: " + src);
        };
        img.src = src;
    });
}
// Beri penanda khusus untuk perangkat seluler
function setupMobileSpecificBehavior() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.body.classList.add('mobile-device');
        
        // Ubah beberapa elemen styling untuk mobile jika diperlukan
        document.querySelectorAll('.option').forEach(option => {
            option.style.padding = '15px 20px';
        });
        
        debug("Mobile device detected, applied mobile-specific styles");
    }
}

// Menambahkan kemampuan haptic feedback untuk perangkat yang mendukung
function vibrateDevice(duration) {
    if (navigator.vibrate) {
        navigator.vibrate(duration);
        debug("Device vibrated for " + duration + "ms");
    }
}

// Fungsi untuk membuat konfeti ketika mendapat nilai sempurna
function createConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 5 + 's';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        document.body.appendChild(confetti);
        
        // Hapus konfeti setelah animasi selesai
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
    
    debug("Created confetti effect");
}

// Penambahan handling untuk accessibility (aksesibilitas)
function setupAccessibility() {
    // Tambahkan ARIA labels untuk tombol
    document.querySelectorAll('button').forEach(button => {
        if (!button.getAttribute('aria-label')) {
            button.setAttribute('aria-label', button.textContent);
        }
    });
    
    // Tambahkan focus outline yang jelas
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        button:focus, a:focus {
            outline: 3px solid #ff9f1c !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(styleElement);
    
    debug("Accessibility enhancements applied");
}

// Fungsi untuk menyimpan skor tertinggi di local storage
function saveHighScore(gameMode, score) {
    const currentHighScore = localStorage.getItem(`highScore_${gameMode}`) || 0;
    if (score > currentHighScore) {
        localStorage.setItem(`highScore_${gameMode}`, score);
        debug(`New high score for ${gameMode}: ${score}`);
        return true;
    }
    return false;
}

// Fungsi untuk mendapatkan skor tertinggi dari local storage
function getHighScore(gameMode) {
    return localStorage.getItem(`highScore_${gameMode}`) || 0;
}

// Tampilkan skor tertinggi dalam ringkasan hasil
function updateSummaryWithHighScore(gameMode, currentScore) {
    const isNewHighScore = saveHighScore(gameMode, currentScore);
    const highScore = getHighScore(gameMode);
    
    const highScoreElement = document.createElement('div');
    highScoreElement.style.fontSize = '20px';
    highScoreElement.style.marginTop = '10px';
    
    if (isNewHighScore) {
        highScoreElement.innerHTML = `<span style="color: #ff6b6b; font-weight: bold;">🏆 REKOR BARU!</span> Skor Tertinggi: ${highScore}`;
        // Tambahkan efek visual untuk rekor baru
        createConfetti();
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    } else {
        highScoreElement.textContent = `Skor Tertinggi: ${highScore}`;
    }
    
    // Tambahkan ke container feedback yang sesuai
    if (gameMode === 'gambar') {
        feedbackContainerGambar.appendChild(highScoreElement);
    } else if (gameMode === 'suara') {
        feedbackContainerSuara.appendChild(highScoreElement);
    }
    
    debug(`Updated summary with high score for ${gameMode}: ${highScore}`);
}

// Override fungsi summary untuk menambahkan high score
const originalShowSummaryGambar = showSummaryGambar;
showSummaryGambar = function() {
    originalShowSummaryGambar();
    updateSummaryWithHighScore('gambar', scoreGambar);
};

const originalShowSummarySuara = showSummarySuara;
showSummarySuara = function() {
    originalShowSummarySuara();
    updateSummaryWithHighScore('suara', scoreSuara);
};

// Deteksi ketika browser atau tab tidak aktif
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Jika tab tidak aktif, pause musik jika sedang bermain
        if (isMusicPlaying) {
            backgroundMusic.pause();
            debug("Background music paused due to tab inactive");
        }
        
        // Pause suara hewan jika sedang bermain
        if (isAnimalSoundPlaying) {
            animalSound.pause();
            isAnimalSoundPlaying = false;
            debug("Animal sound paused due to tab inactive");
        }
    } else {
        // Jika kembali ke tab dan musik sebelumnya playing, mulai lagi
        if (isMusicPlaying) {
            backgroundMusic.play().catch(e => {
                debug("Error resuming music: " + e.message);
            });
            debug("Background music resumed on tab active");
        }
    }
});

// Tambahkan event listener untuk mendeteksi perangkat yang digunakan (touch atau mouse)
window.addEventListener('touchstart', function() {
    document.body.classList.add('touch-device');
    debug("Touch device detected");
});

// Inisialisasi tambahan saat dokumen dimuat
document.addEventListener("DOMContentLoaded", function() {
    // Preload gambar untuk menghindari lag
    preloadImages();
    
    // Setup untuk perangkat mobile
    setupMobileSpecificBehavior();
    
    // Setup untuk aksesibilitas
    setupAccessibility();
    
    // Cek apakah ada high score tersimpan
    const highScoreGambar = getHighScore('gambar');
    const highScoreSuara = getHighScore('suara');
    
    if (highScoreGambar > 0 || highScoreSuara > 0) {
        debug("Found existing high scores - Gambar: " + highScoreGambar + ", Suara: " + highScoreSuara);
    }
    
    debug("Enhanced initialization complete");
});