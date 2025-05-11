// Data for Tebak Gambar game
const tebakGambarData = [
    {
        image: 'assets/images/kucing.jpg',
        correctAnswer: 'Kucing',
        options: ['Kucing', 'Anjing', 'Kelinci', 'Harimau']
    },
    {
        image: 'assets/images/gajah.jpg',
        correctAnswer: 'Gajah',
        options: ['Gajah', 'Jerapah', 'Kuda', 'Singa']
    },
    {
        image: 'assets/images/pisang.jpg',
        correctAnswer: 'Pisang',
        options: ['Pisang', 'Apel', 'Jeruk', 'Mangga']
    },
    {
        image: 'assets/images/mobil.jpg',
        correctAnswer: 'Mobil',
        options: ['Mobil', 'Sepeda', 'Pesawat', 'Kapal']
    },
    {
        image: 'assets/images/rumah.jpg',
        correctAnswer: 'Rumah',
        options: ['Rumah', 'Sekolah', 'Toko', 'Kantor']
    },
    {
        image: 'assets/images/ayam.jpg',
        correctAnswer: 'Ayam',
        options: ['Ayam', 'Bebek', 'Angsa', 'Burung']
    },
    {
        image: 'assets/images/bola.jpg',
        correctAnswer: 'Bola',
        options: ['Bola', 'Raket', 'Buku', 'Pensil']
    },
    {
        image: 'assets/images/bunga.jpg',
        correctAnswer: 'Bunga',
        options: ['Bunga', 'Pohon', 'Rumput', 'Daun']
    }
];

// Game state variables
let currentGambarIndex = 0;
let gambarScore = 0;
let gambarShuffledData = [];

// Initialize Tebak Gambar game
function initializeTebakGambar() {
    // Shuffle the game data array to have random order for each game session
    gambarShuffledData = shuffleArray(tebakGambarData);
    currentGambarIndex = 0;
    gambarScore = 0;
    
    // Update score display
    const scoreElement = document.getElementById('gambar-score');
    updateScore(scoreElement, gambarScore);
    
    // Display first question
    displayGambarQuestion(currentGambarIndex);
    
    // Add event listener to "Next" button
    document.getElementById('next-gambar').addEventListener('click', nextGambarQuestion);
}

// Display current question
function displayGambarQuestion(index) {
    if (index >= gambarShuffledData.length) {
        // End of game, restart
        endTebakGambar();
        return;
    }
    
    const currentQuestion = gambarShuffledData[index];
    
    // Update image
    const imageElement = document.getElementById('gambar-tebakan');
    imageElement.src = currentQuestion.image;
    imageElement.alt = 'Tebak gambar ini';
    
    // Create shuffled options
    const shuffledOptions = shuffleArray(currentQuestion.options);
    
    // Create option buttons
    createOptionButtons(shuffledOptions, 'gambar-options', handleGambarOptionClick);
    
    // Clear previous feedback
    const feedbackElement = document.getElementById('gambar-feedback');
    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback';
    
    // Hide Next button until answer is selected
    document.getElementById('next-gambar').style.display = 'none';
}

// Handle option click
function handleGambarOptionClick(event) {
    // Get selected option
    const selectedOption = event.target.textContent;
    const currentQuestion = gambarShuffledData[currentGambarIndex];
    const feedbackElement = document.getElementById('gambar-feedback');
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    // Disable all option buttons
    const optionButtons = document.querySelectorAll('#gambar-options .option-btn');
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
        gambarScore++;
        updateScore(document.getElementById('gambar-score'), gambarScore);
    } else {
        showFeedback(feedbackElement, false, `Salah! Jawaban yang benar adalah "${currentQuestion.correctAnswer}" 😞`);
    }
    
    // Show Next button
    document.getElementById('next-gambar').style.display = 'block';
}

// Move to next question
function nextGambarQuestion() {
    currentGambarIndex++;
    displayGambarQuestion(currentGambarIndex);
}

// End game and show results
function endTebakGambar() {
    // Create result container
    const gameContainer = document.querySelector('#tebak-gambar-section .game-container');
    
    // Hide game elements
    document.querySelector('.image-container').style.display = 'none';
    document.getElementById('gambar-options').style.display = 'none';
    document.getElementById('next-gambar').style.display = 'none';
    document.querySelector('#tebak-gambar-section .score-container').style.display = 'none';
    
    // Show result
    const feedbackElement = document.getElementById('gambar-feedback');
    feedbackElement.className = 'feedback';
    
    const totalQuestions = gambarShuffledData.length;
    const percentage = Math.round((gambarScore / totalQuestions) * 100);
    
    // Create result message with trophy animation for high scores
    let message = `<div class="result-container">`;
    
    // Add trophy for high scores
    if (percentage >= 80) {
        message += `<div class="trophy">🏆</div>`;
    }
    
    message += `<h3>Selamat! Permainan Selesai</h3>
               <div class="result-score">
                 <span class="score-number">${gambarScore}</span> dari ${totalQuestions} 
                 <span class="score-percentage">(${percentage}%)</span>
               </div>`;
    
    if (percentage >= 80) {
        message += '<p class="result-message">Hebat sekali! Kamu sangat pintar! 🌟</p>';
    } else if (percentage >= 60) {
        message += '<p class="result-message">Bagus! Terus berlatih ya! 👍</p>';
    } else {
        message += '<p class="result-message">Jangan menyerah! Coba lagi ya! 💪</p>';
    }
    
    message += '<button id="restart-gambar" class="next-btn">Main Lagi</button>';
    message += '</div>';
    
    feedbackElement.innerHTML = message;
    
    // Add event listener to restart button
    setTimeout(() => {
        document.getElementById('restart-gambar').addEventListener('click', () => {
            // Reset display
            document.querySelector('.image-container').style.display = 'flex';
            document.getElementById('gambar-options').style.display = 'grid';
            document.querySelector('#tebak-gambar-section .score-container').style.display = 'block';
            
            // Restart game
            initializeTebakGambar();
        });
    }, 100);
    
    // Add CSS rules for result screen
    if (!document.getElementById('result-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'result-styles';
        styleSheet.innerHTML = `
            .result-container {
                background: white;
                padding: 30px;
                border-radius: 15px;
                box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                text-align: center;
                position: relative;
                animation: scaleIn 0.5s ease;
                margin: 20px auto;
                max-width: 400px;
            }
            
            .trophy {
                font-size: 60px;
                animation: bounce 1s infinite alternate;
                margin-bottom: 20px;
            }
            
            .result-score {
                font-size: 24px;
                margin: 20px 0;
                font-weight: bold;
            }
            
            .score-number {
                font-size: 48px;
                color: var(--primary);
            }
            
            .score-percentage {
                color: var(--secondary);
                font-weight: bold;
            }
            
            .result-message {
                font-size: 20px;
                margin-bottom: 30px;
            }
            
            #restart-gambar {
                font-size: 18px;
                padding: 12px 30px;
                background: var(--primary);
                color: white;
                transition: transform 0.3s, box-shadow 0.3s;
            }
            
            #restart-gambar:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 15px rgba(0,0,0,0.2);
            }
            
            @keyframes bounce {
                0% { transform: translateY(0); }
                100% { transform: translateY(-15px); }
            }
            
            @keyframes scaleIn {
                0% { transform: scale(0.8); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(styleSheet);
    }
}
