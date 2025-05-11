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
    const gameContainer = document.querySelector('#tebak-gambar-section .game-container');
    
    // Hide elements
    document.getElementById('gambar-tebakan').style.display = 'none';
    document.getElementById('gambar-options').style.display = 'none';
    document.getElementById('next-gambar').style.display = 'none';
    
    // Show result
    const feedbackElement = document.getElementById('gambar-feedback');
    feedbackElement.className = 'feedback';
    
    const totalQuestions = gambarShuffledData.length;
    const percentage = Math.round((gambarScore / totalQuestions) * 100);
    
    let message = `<h3>Selamat! Permainan Selesai</h3>
                   <p>Skor Akhir: ${gambarScore} dari ${totalQuestions} (${percentage}%)</p>`;
    
    if (percentage >= 80) {
        message += '<p>Hebat sekali! Kamu sangat pintar! 🏆</p>';
    } else if (percentage >= 60) {
        message += '<p>Bagus! Terus berlatih ya! 👍</p>';
    } else {
        message += '<p>Jangan menyerah! Coba lagi ya! 💪</p>';
    }
    
    message += '<button id="restart-gambar" class="next-btn">Main Lagi</button>';
    
    feedbackElement.innerHTML = message;
    
    // Add event listener to restart button
    setTimeout(() => {
        document.getElementById('restart-gambar').addEventListener('click', () => {
            // Reset display
            document.getElementById('gambar-tebakan').style.display = 'block';
            document.getElementById('gambar-options').style.display = 'grid';
            
            // Restart game
            initializeTebakGambar();
        });
    }, 100);
}
