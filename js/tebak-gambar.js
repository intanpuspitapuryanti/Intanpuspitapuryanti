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
    if (scoreElement) {
        updateScore(scoreElement, gambarScore);
    }
    
    // Display first question
    displayGambarQuestion(currentGambarIndex);
    
    // Add event listener to "Next" button
    const nextButton = document.getElementById('next-gambar');
    if (nextButton) {
        nextButton.addEventListener('click', nextGambarQuestion);
        nextButton.style.display = 'none';
    }
}

// Display current question
function displayGambarQuestion(index) {
    if (index >= gambarShuffledData.length) {
        // End of game, show results
        endTebakGambar();
        return;
    }
    
    const currentQuestion = gambarShuffledData[index];
    
    // Update image
    const imageElement = document.getElementById('gambar-tebakan');
    if (imageElement) {
        imageElement.src = currentQuestion.image;
        imageElement.alt = 'Tebak gambar ini';
    }
    
    // Create shuffled options
    const shuffledOptions = shuffleArray(currentQuestion.options);
    
    // Create option buttons
    const optionsContainer = document.getElementById('gambar-options');
    if (optionsContainer) {
        createOptionButtons(shuffledOptions, 'gambar-options', handleGambarOptionClick);
    }
    
    // Clear previous feedback
    const feedbackElement = document.getElementById('gambar-feedback');
    if (feedbackElement) {
        feedbackElement.textContent = '';
        feedbackElement.className = 'feedback';
    }
    
    // Hide Next button until answer is selected
    const nextButton = document.getElementById('next-gambar');
    if (nextButton) {
        nextButton.style.display = 'none';
    }
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
    const nextButton = document.getElementById('next-gambar');
    if (nextButton) {
        nextButton.style.display = 'block';
    }
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
    const imageContainer = document.querySelector('.image-container');
    const optionsContainer = document.getElementById('gambar-options');
    const nextButton = document.getElementById('next-gambar');
    const scoreContainer = document.querySelector('#tebak-gambar-section .score-container');
    
    if (imageContainer) imageContainer.style.display = 'none';
    if (optionsContainer) optionsContainer.style.display = 'none';
    if (nextButton) nextButton.style.display = 'none';
    if (scoreContainer) scoreContainer.style.display = 'none';
    
    // Show result
    const feedbackElement = document.getElementById('gambar-feedback');
    if (!feedbackElement) return;
    
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
    
    // Tambahkan tombol untuk kembali ke menu utama dan tombol main lagi
    message += '<div class="result-buttons">';
    message += '<button id="kembali-menu" class="menu-btn">Kembali ke Menu</button>';
    message += '<button id="restart-gambar" class="next-btn">Main Lagi</button>';
    message += '</div>';
    message += '</div>';
    
    feedbackElement.innerHTML = message;
    
    // Add event listeners to buttons
    setTimeout(() => {
        // Event listener untuk tombol main lagi
        const restartButton = document.getElementById('restart-gambar');
        if (restartButton) {
            restartButton.addEventListener('click', () => {
                // Reset display
                if (imageContainer) imageContainer.style.display = 'flex';
                if (optionsContainer) optionsContainer.style.display = 'grid';
                if (scoreContainer) scoreContainer.style.display = 'block';
                
                // Restart game
                initializeTebakGambar();
            });
        }
        
        // Event listener untuk tombol kembali ke menu
        const menuButton = document.getElementById('kembali-menu');
        if (menuButton) {
            menuButton.addEventListener('click', () => {
                // Sembunyikan section Tebak Gambar
                const tebakGambarSection = document.getElementById('tebak-gambar-section');
                if (tebakGambarSection) {
                    tebakGambarSection.style.display = 'none';
                }
                
                // Tampilkan kembali menu utama
                document.querySelector('.main-menu').style.display = 'flex';
            });
        }
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
            
            .result-buttons {
                display: flex;
                justify-content: center;
                gap: 15px;
                flex-wrap: wrap;
            }
            
            #restart-gambar, #kembali-menu {
                font-size: 18px;
                padding: 12px 20px;
                border-radius: 10px;
                cursor: pointer;
                transition: transform 0.3s, box-shadow 0.3s;
            }
            
            #restart-gambar {
                background: var(--primary);
                color: white;
            }
            
            #kembali-menu {
                background: var(--secondary);
                color: white;
            }
            
            #restart-gambar:hover, #kembali-menu:hover {
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
