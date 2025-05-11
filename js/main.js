// Event listeners for tab navigation
document.addEventListener('DOMContentLoaded', function() {
    // Get tab buttons and sections
    const tebakGambarBtn = document.getElementById('tebak-gambar-btn');
    const tebakSuaraBtn = document.getElementById('tebak-suara-btn');
    const tebakGambarSection = document.getElementById('tebak-gambar-section');
    const tebakSuaraSection = document.getElementById('tebak-suara-section');

    // Tab switching functionality
    tebakGambarBtn.addEventListener('click', function() {
        // Update active tab
        tebakGambarBtn.classList.add('active');
        tebakSuaraBtn.classList.remove('active');
        
        // Show/hide sections
        tebakGambarSection.classList.add('active');
        tebakSuaraSection.classList.remove('active');
    });

    tebakSuaraBtn.addEventListener('click', function() {
        // Update active tab
        tebakSuaraBtn.classList.add('active');
        tebakGambarBtn.classList.remove('active');
        
        // Show/hide sections
        tebakSuaraSection.classList.add('active');
        tebakGambarSection.classList.remove('active');
    });

    // Initialize both games when page loads
    initializeTebakGambar();
    initializeTebakSuara();
});

// Helper functions shared between both games
function shuffleArray(array) {
    // Create a copy of the array to avoid modifying the original
    const newArray = [...array];
    
    // Fisher-Yates shuffle algorithm
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    
    return newArray;
}

function createOptionButtons(options, containerId, onClickHandler) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';  // Clear existing options
    
    options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.textContent = option;
        button.dataset.index = index;
        button.addEventListener('click', onClickHandler);
        container.appendChild(button);
    });
}

function showFeedback(element, isCorrect, message) {
    element.textContent = message;
    element.classList.remove('correct', 'incorrect');
    
    if (isCorrect) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
    
    // Add animation class
    element.classList.add('animated');
    
    // Remove animation class after animation completes
    setTimeout(() => {
        element.classList.remove('animated');
    }, 1000);
}

function updateScore(scoreElement, scoreValue) {
    scoreElement.textContent = scoreValue;
}
// Add these debugging functions at the end of main.js
function debugGameState() {
    console.log("=== DEBUG GAME STATE ===");
    
    // Tebak Gambar state
    console.log("Tebak Gambar Index:", currentGambarIndex);
    console.log("Tebak Gambar Score:", gambarScore);
    console.log("Tebak Gambar Total Questions:", gambarShuffledData.length);
    
    // Tebak Suara state
    console.log("Tebak Suara Index:", currentSuaraIndex);
    console.log("Tebak Suara Score:", suaraScore);
    console.log("Tebak Suara Total Questions:", suaraShuffledData.length);
    
    // Check if elements exist
    console.log("Gambar Feedback Element:", !!document.getElementById('gambar-feedback'));
    console.log("Suara Feedback Element:", !!document.getElementById('suara-feedback'));
    
    // Check active tab
    console.log("Active tab:", document.querySelector('.menu button.active').textContent);
}

// Force end game for testing (add to end of initialization)
function forceEndGame() {
    const debugButton = document.createElement('button');
    debugButton.textContent = 'Force End Game (Debug)';
    debugButton.style.position = 'fixed';
    debugButton.style.bottom = '10px';
    debugButton.style.right = '10px';
    debugButton.style.zIndex = '9999';
    debugButton.style.background = '#ff0000';
    debugButton.style.color = 'white';
    debugButton.style.border = 'none';
    debugButton.style.padding = '5px 10px';
    debugButton.style.cursor = 'pointer';
    
    debugButton.addEventListener('click', function() {
        if (document.querySelector('#tebak-gambar-section.active')) {
            // For Tebak Gambar
            currentGambarIndex = gambarShuffledData.length - 1;
            nextGambarQuestion(); // This will trigger endTebakGambar()
        } else {
            // For Tebak Suara
            currentSuaraIndex = suaraShuffledData.length - 1;
            nextSuaraQuestion(); // This will trigger endTebakSuara()
        }
    });
    
    document.body.appendChild(debugButton);
}

// Add this to the end of the DOMContentLoaded event listener
// forceEndGame(); // Uncomment this line to add the debug button
