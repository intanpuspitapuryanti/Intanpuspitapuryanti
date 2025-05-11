// Event listeners untuk navigasi tab dan inisialisasi game
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded. Initializing game...');
    
    // Ambil elemen-elemen tab dan section
    const tebakGambarBtn = document.getElementById('tebak-gambar-btn');
    const tebakSuaraBtn = document.getElementById('tebak-suara-btn');
    const tebakGambarSection = document.getElementById('tebak-gambar-section');
    const tebakSuaraSection = document.getElementById('tebak-suara-section');

    // Pastikan semua elemen berhasil dipilih
    if (!tebakGambarBtn || !tebakSuaraBtn || !tebakGambarSection || !tebakSuaraSection) {
        console.error('Error: Required elements not found!');
        return;
    }

    // Fungsi untuk perpindahan tab
    tebakGambarBtn.addEventListener('click', function() {
        // Update active tab
        tebakGambarBtn.classList.add('active');
        tebakSuaraBtn.classList.remove('active');
        
        // Show/hide sections
        tebakGambarSection.classList.add('active');
        tebakSuaraSection.classList.remove('active');
        
        console.log('Switched to Tebak Gambar tab');
    });

    tebakSuaraBtn.addEventListener('click', function() {
        // Update active tab
        tebakSuaraBtn.classList.add('active');
        tebakGambarBtn.classList.remove('active');
        
        // Show/hide sections
        tebakSuaraSection.classList.add('active');
        tebakGambarSection.classList.remove('active');
        
        console.log('Switched to Tebak Suara tab');
    });

    // Inisialisasi kedua game
    initializeTebakGambar();
    initializeTebakSuara();
});

// Fungsi bantuan yang digunakan kedua game
function shuffleArray(array) {
    if (!array || !Array.isArray(array)) {
        console.error('Error: Invalid array provided to shuffleArray:', array);
        return [];
    }
    
    // Buat salinan array untuk menghindari modifikasi array asli
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
    
    if (!container) {
        console.error(`Error: Container element with ID ${containerId} not found!`);
        return;
    }
    
    container.innerHTML = '';  // Kosongkan container
    
    if (!options || !Array.isArray(options)) {
        console.error('Error: Invalid options provided:', options);
        return;
    }
    
    console.log(`Creating ${options.length} option buttons for ${containerId}`);
    
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
    if (!element) {
        console.error('Error: Feedback element not found!');
        return;
    }
    
    element.textContent = message;
    element.classList.remove('correct', 'incorrect');
    
    if (isCorrect) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

function updateScore(scoreElement, scoreValue) {
    if (!scoreElement) {
        console.error('Error: Score element not found!');
        return;
    }
    
    scoreElement.textContent = scoreValue;
}
