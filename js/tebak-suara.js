// Data for Tebak Suara game
const tebakSuaraData = [
    {
        sound: 'assets/sounds/suara_kucing.mp3', // Updated to actual sound path
        correctAnswer: 'Kucing',
        options: ['Kucing', 'Anjing', 'Singa', 'Harimau']
    },
    {
        sound: 'assets/sounds/suara_ayam.mp3', // Updated to actual sound path
        correctAnswer: 'Ayam',
        options: ['Ayam', 'Burung', 'Bebek', 'Angsa']
    },
    {
        sound: 'assets/sounds/suara_sapi.mp3', // Updated to actual sound path (you might need to create this)
        correctAnswer: 'Sapi',
        options: ['Sapi', 'Kambing', 'Kuda', 'Kerbau']
    },
    {
        sound: 'assets/sounds/suara_gajah.mp3', // Updated to actual sound path
        correctAnswer: 'Gajah',
        options: ['Gajah', 'Jerapah', 'Badak', 'Harimau']
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

// Rest of the code remains the same...
