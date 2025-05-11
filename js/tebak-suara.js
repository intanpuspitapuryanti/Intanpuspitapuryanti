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
    console.log("Initializing Tebak Suara game"); // Debug log
    
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
    
    // Make sure all game elements are visible
    const audioContainer = document.querySelector('.audio-container');
    if (audioContainer) audioContainer.style.display = 'flex';
    
    const optionsContainer = document.getElementById('suara-options');
    if (optionsContainer) optionsContainer.style.display = 'grid';
    
    const scoreContainer = document.querySelector('#tebak-suara-section .score-container');
    if (scoreContainer) scoreContainer.style.display = 'block';
    
    // Clear feedback container
    const feedbackElement = document.getElementById('suara-feedback');
    if (feedbackElement) feedbackElement.innerHTML = '';
    
    // Display first question
    displaySuaraQuestion(currentSuaraIndex);
    
    // Add event listener to "Next" button
    const nextButton = document.getElementById('next-suara');
    if (nextButton) {
        // Remove existing event listeners to prevent duplicates
        const newButton = nextButton.cloneNode(true);
        nextButton.parentNode.replaceChild(newButton, nextButton);
        newButton.addEventListener('click', nextSuaraQuestion);
    }
}

// Display current question
function displaySuaraQuestion(index) {
    console.log("Displaying question", index, "of", suaraShuffledData.length); // Debug log
    
    if (index >= suaraShuffledData.length) {
        // End of game
        console.log("End of game reached"); // Debug log
        endTebakSuara();
        return;
    }
    
    const currentQuestion = suaraShuffledData[index];
    
    // Set audio source
    if (audioElement) {
        audioElement.src = currentQuestion.sound;
        console.log("Set audio source:", currentQuestion.sound); // Debug log
    } else {
        console.error("Audio element not found"); // Debug log
    }
    
    // Create shuffled options
    const shuffledOptions = shuffleArray(currentQuestion.options);
    
    // Create option buttons
    createOptionButtons(shuffledOptions, 'suara-options', handleSuaraOptionClick);
    
    // Clear previous feedback
    const feedbackElement = document.getElementById('suara-feedback');
    if (feedbackElement) {
        feedbackElement.textContent = '';
        feedbackElement.className = 'feedback';
    }
    
    // Hide Next button until answer is selected
    const nextButton = document.getElementById('next-suara');
    if (nextButton) nextButton.style.display = 'none';
}

// Play current sound
function playCurrentSound() {
    if (audioElement) {
        // Add animation to play button
        const playButton = document.getElementById('play-sound');
        if (playButton) playButton.classList.add('playing');
        
        audioElement.currentTime = 0; // Reset to beginning
        audioElement.play().catch(error => {
            console.error('Error playing audio:', error);
            alert('Tidak dapat memutar suara. Pastikan browser Anda mendukung audio.');
        });
        
        // Remove animation when audio ends
        audioElement.onended = function() {
            if (playButton) playButton.classList.remove('playing');
        };
    }
}

// Handle option click
function handleSuaraOptionClick(event) {
    // Get selected option
    const selectedOption = event.target.textContent;
    const currentQuestion = suaraShuffledData[currentSuaraIndex];
    const feedbackElement = document.getElementById('suara-feedback');
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    console.log("Selected:", selectedOption, "Correct:", currentQuestion.correctAnswer); // Debug log
    
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
    if (feedbackElement) {
        if (isCorrect) {
            showFeedback(feedbackElement, true, 'Benar! 🎉');
            suaraScore++;
            const scoreElement = document.getElementById('suara-score');
            if (scoreElement) updateScore(scoreElement, suaraScore);
        } else {
            showFeedback(feedbackElement, false, `Salah! Jawaban yang benar adalah "${currentQuestion.correctAnswer}" 😞`);
        }
    }
    
    // Show Next button
    const nextButton = document.getElementById('next-suara');
    if (nextButton) nextButton.style.display = 'block';
}

// Move to next question
function nextSuaraQuestion() {
    currentSuaraIndex++;
    displaySuaraQuestion(currentSuaraIndex);
}

// End game and show results
function endTebakSuara() {
    console.log("Ending Tebak Suara game with score:", suaraScore); // Debug log
    
    // Hide game elements
    const audioContainer = document.querySelector('.audio-container');
    if (audioContainer) audioContainer.style.display = 'none';
    
    const optionsContainer = document.getElementById('suara-options');
    if (optionsContainer) optionsContainer.style.display = 'none';
    
    const nextButton = document.getElementById('next-suara');
    if (nextButton) nextButton.style.display = 'none';
    
    const scoreContainer = document.querySelector('#tebak-suara-section .score-container');
    if (scoreContainer) scoreContainer.style.display = 'none';
    
    // Show result
    const feedbackElement = document.getElementById('suara-feedback');
    if (!feedbackElement) {
        console.error("Feedback element not found"); // Debug log
        return;
    }
    
    feedbackElement.className = 'feedback';
    
    const totalQuestions = suaraShuffledData.length;
    const percentage = Math.round((suaraScore / totalQuestions) * 100);
    
    console.log("Creating result message, percentage:", percentage); // Debug log
    
    // Create result message with animation
    let message = `<div class="result-container">`;
    
    // Add musical note animations for high scores
    if (percentage >= 80) {
        message += `
            <div class="music-notes">
                <div class="note">♪</div>
                <div class="note">♫</div>
                <div class="note">♬</div>
                <div class="note">♩</div>
            </div>
        `;
    }
    
    message += `<h3>Selamat! Permainan Selesai</h3>
               <div class="result-score">
                 <span class="score-number">${suaraScore}</span> dari ${totalQuestions} 
                 <span class="score-percentage">(${percentage}%)</span>
               </div>`;
    
    if (percentage >= 80) {
        message += '<p class="result-message">Hebat sekali! Pendengaranmu sangat tajam! 🌟</p>';
    } else if (percentage >= 60) {
        message += '<p class="result-message">Bagus! Terus berlatih mendengarkan ya! 👍</p>';
    } else {
        message += '<p class="result-message">Jangan menyerah! Kamu pasti bisa lebih baik! 💪</p>';
    }
    
    message += '<button id="restart-suara" class="next-btn">Main Lagi</button>';
    message += '</div>';
    
    feedbackElement.innerHTML = message;
    console.log("Result message set:", message.substring(0, 100) + "..."); // Debug log (truncated)
    
    // Add CSS in-line to ensure styles are applied
    const resultContainer = feedbackElement.querySelector('.result-container');
    if (resultContainer) {
        resultContainer.style.background = 'white';
        resultContainer.style.padding = '30px';
        resultContainer.style.borderRadius = '15px';
        resultContainer.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        resultContainer.style.textAlign = 'center';
        resultContainer.style.position = 'relative';
        resultContainer.style.margin = '20px auto';
        resultContainer.style.maxWidth = '400px';
        resultContainer.style.animation = 'scaleIn 0.5s ease';
    }
    
    // Add event listener to restart button
    setTimeout(() => {
        const restartButton = document.getElementById('restart-suara');
        console.log("Restart button found:", !!restartButton); // Debug log
        
        if (restartButton) {
            restartButton.addEventListener('click', () => {
                console.log("Restart button clicked"); // Debug log
                initializeTebakSuara();
            });
        }
    }, 100);
    
    // Add CSS rules for sound result screen
    if (!document.getElementById('sound-result-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'sound-result-styles';
        styleSheet.innerHTML = `
            @keyframes scaleIn {
                0% { transform: scale(0.8); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }
            
            .playing {
                animation: pulse-play 0.5s infinite alternate;
                background: var(--secondary) !important;
            }
            
            @keyframes pulse-play {
                0% { transform: scale(1); }
                100% { transform: scale(1.1); }
            }
            
            .music-notes {
                height: 60px;
                position: relative;
                margin-bottom: 20px;
            }
            
            .note {
                position: absolute;
                font-size: 30px;
                color: var(--primary);
                opacity: 0;
            }
            
            .note:nth-child(1) {
                left: 30%;
                animation: float-note 3s ease-in-out infinite 0.5s;
            }
            
            .note:nth-child(2) {
                left: 45%;
                animation: float-note 2.5s ease-in-out infinite;
            }
            
            .note:nth-child(3) {
                left: 60%;
                animation: float-note 3s ease-in-out infinite 1s;
            }
            
            .note:nth-child(4) {
                left: 75%;
                animation: float-note 2.7s ease-in-out infinite 0.7s;
            }
            
            @keyframes float-note {
                0% {
                    opacity: 0;
                    transform: translateY(30px);
                }
                50% {
                    opacity: 1;
                }
                100% {
                    opacity: 0;
                    transform: translateY(-30px);
                }
            }
            
            .result-score {
                font-size: 24px;
                margin: 20px 0;
                font-weight: bold;
            }
            
            .score-number {
                font-size: 48px;
                color: #6a5acd;
            }
            
            .score-percentage {
                color: #ff7e5f;
                font-weight: bold;
            }
            
            .result-message {
                font-size: 20px;
                margin-bottom: 30px;
            }
            
            #restart-suara {
                font-size: 18px;
                padding: 12px 30px;
                background: #6a5acd;
                color: white;
                border: none;
                border-radius: 30px;
                cursor: pointer;
                transition: transform 0.3s, box-shadow 0.3s;
            }
            
            #restart-suara:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 15px rgba(0,0,0,0.2);
            }
        `;
        document.head.appendChild(styleSheet);
    }
}
