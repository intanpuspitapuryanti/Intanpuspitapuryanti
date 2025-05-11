// Data for Tebak Gambar game
const tebakGambarData = [
    {
        image: 'assets/images/pisang.jpg',
        correctAnswer: 'Pisang',
        options: ['Pisang', 'Apel', 'Jeruk', 'Mangga']
    },
    {
        image: 'assets/images/gajah.jpg',
        correctAnswer: 'Gajah',
        options: ['Gajah', 'Jerapah', 'Kuda', 'Singa']
    },
    {
        image: 'assets/images/kucing.jpg',
        correctAnswer: 'Kucing',
        options: ['Kucing', 'Anjing', 'Kelinci', 'Harimau']
    },
    {
        image: 'assets/images/mobil.jpg',
        correctAnswer: 'Mobil',
        options: ['Mobil', 'Sepeda', 'Pesawat', 'Kapal']
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
    const selectedOption = event.target.textContent;
    const currentQuestion = gambarShuffledData[currentGambarIndex];
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
    const feedbackElement = document.getElementById('gambar-feedback');
    if (isCorrect) {
        showFeedback(feedbackElement, true, 'Benar!');
        gambarScore++;
        updateScore(document.getElementById('gambar-score'), gambarScore);
    } else {
        showFeedback(feedbackElement, false, 'Salah! Jawaban yang benar adalah ' + currentQuestion.correctAnswer);
    }
    
    // Show Next button
    document.getElementById('next-gambar').style.display = 'block';
}

// Move to next question
function nextGambarQuestion() {
    currentGambarIndex++;
    displayGambarQuestion(currentGambarIndex);
}

// End game and restart
function endTebakGambar() {
    // Show game over message
    const feedbackElement = document.getElementById('gambar-feedback');
    feedbackElement.textContent = `Game selesai! Skor Anda: ${gambarScore}/${gambarShuffledData.length}`;
    feedbackElement.className = 'feedback';
    
    // Clear options
    document.getElementById('gambar-options').innerHTML = '';
    
    // Change next button text to restart
    const nextButton = document.getElementById('next-gambar');
    nextButton.textContent = 'Main Lagi';
    nextButton.style.display = 'block';
    nextButton.removeEventListener('click', nextGambarQuestion);
    nextButton.addEventListener('click', function() {
        nextButton.textContent = 'Selanjutnya';
        nextButton.removeEventListener('click', arguments.callee);
        nextButton.addEventListener('click', nextGambarQuestion);
        initializeTebakGambar();
    });
}
