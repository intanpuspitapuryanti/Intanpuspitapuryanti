// Data for Tebak Suara game
const tebakSuaraData = [
    {
        sound: 'assets/sounds/suara_kucing.mp3',
        correctAnswer: 'Kucing',
        options: ['Kucing', 'Anjing', 'Singa', 'Harimau']
    },
    {
        sound: 'assets/sounds/suara_ayam.mp3',
        correctAnswer: 'Ayam',
        options: ['Ayam', 'Burung', 'Bebek', 'Angsa']
    },
    {
        sound: 'assets/sounds/suara_sapi.mp3',
        correctAnswer: 'Sapi',
        options: ['Sapi', 'Kambing', 'Kuda', 'Kerbau']
    },
    {
        sound: 'assets/sounds/suara_gajah.mp3',
        correctAnswer: 'Gajah',
        options: ['Gajah', 'Jerapah', 'Badak', 'Harimau']
    },
    {
        sound: 'assets/sounds/suara_monyet.mp3',
        correctAnswer: 'Monyet',
        options: ['Monyet', 'Gorila', 'Simpanse', 'Orangutan']
    },
    {
        sound: 'assets/sounds/suara_hujan.mp3',
        correctAnswer: 'Hujan',
        options: ['Hujan', 'Air Terjun', 'Sungai', 'Laut']
    },
    {
        sound: 'assets/sounds/suara_petir.mp3',
        correctAnswer: 'Petir',
        options: ['Petir', 'Gempa', 'Ledakan', 'Gunung Meletus']
    },
    {
        sound: 'assets/sounds/suara_piano.mp3',
        correctAnswer: 'Piano',
        options: ['Piano', 'Gitar', 'Drum', 'Biola']
    }
];

// Game state variables
let currentSuaraIndex = 0;
let suaraScore = 0;
let suaraShuffledData = [];
let audioElement = null;

// Initialize Tebak Suara game
function initializeTebakSuara() {
    // Shuffle the game data array
    suaraShuffledData = shuffleArray(tebakSuaraData);
    currentSuaraIndex = 0;
    suaraScore = 0;
    
    // Set up audio element
    audioElement = document.getElementById('suara-tebakan');
    
    // Update score display
    const scoreElement = document.getElementById('suara-score');
    updateScore(scoreElement, suaraScore);
    
    // Set up play button
    const playButton = document.getElementById('play-sound');
    playButton.addEventListener('click', playCurrentSound);
    
    // Display first question
    displaySuaraQuestion(currentSuaraIndex);
    
    // Add event listener to "Next" button
    document.getElementById('next-suara').addEventListener('click', nextSuaraQuestion);
}

// Display current question
function displaySuaraQuestion(index) {
    if (index >= suaraShuffledData.length) {
        // End of game, restart
        endTebakSuara();
        return;
    }
    
    const currentQuestion = suaraShuffledData[index];
    
    // Set audio source
    audioElement.src = currentQuestion.sound;
    
    // Create shuffled options
    const shuffledOptions = shuffleArray(currentQuestion.options);
    
    // Create option buttons
    createOptionButtons(shuffledOptions, 'suara-options', handleSuaraOptionClick);
    
    // Clear previous feedback
    const feedbackElement = document.getElementById('suara-feedback');
    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback';
    
    // Hide Next button until answer is selected
    document.getElementById('next-suara').style.display = 'none';
}

// Play current sound
function playCurrentSound() {
    if (audioElement) {
        audioElement.currentTime = 0; // Reset to beginning
        audioElement.play().catch(error => {
            console.error('Error playing audio:', error);
            alert('Tidak dapat memutar suara. Pastikan browser Anda mendukung audio.');
        });
    }
}

// Handle option click
function handleSuaraOptionClick(event) {
    // Get selected option
    const selectedOption = event.target.textContent;
    const currentQuestion = suaraShuffledData[currentSuaraIndex];
    const feedbackElement = document.getElementById('suara-feedback');
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    // Disable all option buttons
    const optionButtons = document.querySelectorAll('#suara-options .option-btn');
    optionButtons.forEach(button => {
        button.disabled = true;
        
        // Highlight correct and incorrect answers
        if (button.textContent === currentQuestion.correctAnswer) {
            button.classList.add('correct');
        } else if (button.textContent === selectedOption && !isCorrect) {
            button.classList.add('incorrect');
        }
    });
    
    // Show feedback
    if (isCorrect) {
        showFeedback(feedbackElement, true, 'Benar! 🎉');
        suaraScore++;
        updateScore(document.getElementById('suara-score'), suaraScore);
    } else {
        showFeedback(feedbackElement, false, `Salah! Jawaban yang benar adalah "${currentQuestion.correctAnswer}" 😞`);
    }
    
    // Show Next button
    document.getElementById('next-suara').style.display = 'block';
}

// Move to next question
function nextSuaraQuestion() {
    currentSuaraIndex++;
    displaySuaraQuestion(currentSuaraIndex);
}

// End game and show results
function endTebakSuara() {
    const gameContainer = document.querySelector('#tebak-suara-section .game-container');
    
    // Hide elements
    document.getElementById('play-sound').style.display = 'none';
    document.getElementById('suara-options').style.display = 'none';
    document.getElementById('next-suara').style.display = 'none';
    
    // Show result
    const feedbackElement = document.getElementById('suara-feedback');
    feedbackElement.className = 'feedback';
    
    const totalQuestions = suaraShuffledData.length;
    const percentage = Math.round((suaraScore / totalQuestions) * 100);
    
    let message = `<h3>Selamat! Permainan Selesai</h3>
                   <p>Skor Akhir: ${suaraScore} dari ${totalQuestions} (${percentage}%)</p>`;
    
    if (percentage >= 80) {
        message += '<p>Hebat sekali! Kamu sangat pintar! 🏆</p>';
    } else if (percentage >= 60) {
        message += '<p>Bagus! Terus berlatih ya! 👍</p>';
    } else {
        message += '<p>Jangan menyerah! Coba lagi ya! 💪</p>';
    }
    
    message += '<button id="restart-suara" class="next-btn">Main Lagi</button>';
    
    feedbackElement.innerHTML = message;
    
    // Add event listener to restart button
    setTimeout(() => {
        document.getElementById('restart-suara').addEventListener('click', () => {
            // Reset display
            document.getElementById('play-sound').style.display = 'flex';
            document.getElementById('suara-options').style.display = 'grid';
            
            // Restart game
            initializeTebakSuara();
        });
    }, 100);
}
