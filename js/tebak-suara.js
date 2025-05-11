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

// Play current sound
function playCurrentSound() {
    if (currentSuaraIndex < suaraShuffledData.length) {
        audioElement.src = suaraShuffledData[currentSuaraIndex].sound;
        audioElement.play();
    }
}

// Display current question
function displaySuaraQuestion(index) {
    if (index >= suaraShuffledData.length) {
        // End of game, restart
        endTebakSuara();
        return;
    }
    
    const currentQuestion = suaraShuffledData[index];
    
    // Set up audio source
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

// Handle option click
function handleSuaraOptionClick(event) {
    const selectedOption = event.target.textContent;
    const currentQuestion = suaraShuffledData[currentSuaraIndex];
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
    const feedbackElement = document.getElementById('suara-feedback');
    if (isCorrect) {
        showFeedback(feedbackElement, true, 'Benar!');
        suaraScore++;
        updateScore(document.getElementById('suara-score'), suaraScore);
    } else {
        showFeedback(feedbackElement, false, 'Salah! Jawaban yang benar adalah ' + currentQuestion.correctAnswer);
    }
    
    // Show Next button
    document.getElementById('next-suara').style.display = 'block';
}

// Move to next question
function nextSuaraQuestion() {
    currentSuaraIndex++;
    displaySuaraQuestion(currentSuaraIndex);
}

// End game and restart
function endTebakSuara() {
    // Show game over message
    const feedbackElement = document.getElementById('suara-feedback');
    feedbackElement.textContent = `Game selesai! Skor Anda: ${suaraScore}/${suaraShuffledData.length}`;
    feedbackElement.className = 'feedback';
    
    // Clear options
    document.getElementById('suara-options').innerHTML = '';
    
    // Change next button text to restart
    const nextButton = document.getElementById('next-suara');
    nextButton.textContent = 'Main Lagi';
    nextButton.style.display = 'block';
    nextButton.removeEventListener('click', nextSuaraQuestion);
    nextButton.addEventListener('click', function() {
        nextButton.textContent = 'Selanjutnya';
        nextButton.removeEventListener('click', arguments.callee);
        nextButton.addEventListener('click', nextSuaraQuestion);
        initializeTebakSuara();
    });
}
