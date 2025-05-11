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
