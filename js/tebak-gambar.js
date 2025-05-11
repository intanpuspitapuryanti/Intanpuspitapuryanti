// Data for Tebak Gambar game
const tebakGambarData = [
    {
        image: 'assets/images/pisang.jpg', // Updated to actual image path
        correctAnswer: 'Pisang',
        options: ['Pisang', 'Apel', 'Jeruk', 'Mangga']
    },
    {
        image: 'assets/images/gajah.jpg', // Updated to actual image path
        correctAnswer: 'Gajah',
        options: ['Gajah', 'Jerapah', 'Kuda', 'Singa']
    },
    {
        image: 'assets/images/kucing.jpg', // Updated to actual image path
        correctAnswer: 'Kucing',
        options: ['Kucing', 'Anjing', 'Kelinci', 'Harimau']
    },
    {
        image: 'assets/images/mobil.jpg', // Updated to actual image path
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

// Rest of the code remains the same...
