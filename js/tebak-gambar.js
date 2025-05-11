// Updating the endTebakGambar function in js/tebak-gambar.js
function endTebakGambar() {
    const gameContainer = document.querySelector('#tebak-gambar-section .game-container');
    
    // Hide game elements
    document.getElementById('gambar-tebakan').style.display = 'none';
    document.getElementById('gambar-options').style.display = 'none';
    document.getElementById('next-gambar').style.display = 'none';
    document.querySelector('#tebak-gambar-section .score-container').style.display = 'none';
    
    // Show result
    const feedbackElement = document.getElementById('gambar-feedback');
    feedbackElement.className = 'end-game-result';
    
    const totalQuestions = gambarShuffledData.length;
    const percentage = Math.round((gambarScore / totalQuestions) * 100);
    
    let message = `
        <div class="result-container">
            <h3>🏆 Permainan Selesai! 🏆</h3>
            <div class="final-score">
                <div class="score-circle">
                    <span class="score-number">${gambarScore}</span>
                    <span class="score-total">/${totalQuestions}</span>
                </div>
                <p class="score-percentage">${percentage}%</p>
            </div>`;
    
    if (percentage >= 80) {
        message += '<p class="result-message">Hebat sekali! Kamu sangat pintar! 🌟🌟🌟</p>';
    } else if (percentage >= 60) {
        message += '<p class="result-message">Bagus! Terus berlatih ya! 🌟🌟</p>';
    } else {
        message += '<p class="result-message">Jangan menyerah! Coba lagi ya! 🌟</p>';
    }
    
    message += '<button id="restart-gambar" class="restart-btn">Mulai Lagi</button></div>';
    
    feedbackElement.innerHTML = message;
    
    // Add event listener to restart button
    setTimeout(() => {
        document.getElementById('restart-gambar').addEventListener('click', () => {
            // Reset display
            document.getElementById('gambar-tebakan').style.display = 'block';
            document.getElementById('gambar-options').style.display = 'grid';
            document.querySelector('#tebak-gambar-section .score-container').style.display = 'block';
            
            // Restart game
            initializeTebakGambar();
        });
    }, 100);
}

// Updating the endTebakSuara function in js/tebak-suara.js
function endTebakSuara() {
    const gameContainer = document.querySelector('#tebak-suara-section .game-container');
    
    // Hide elements
    document.getElementById('play-sound').style.display = 'none';
    document.getElementById('suara-options').style.display = 'none';
    document.getElementById('next-suara').style.display = 'none';
    document.querySelector('#tebak-suara-section .score-container').style.display = 'none';
    
    // Show result
    const feedbackElement = document.getElementById('suara-feedback');
    feedbackElement.className = 'end-game-result';
    
    const totalQuestions = suaraShuffledData.length;
    const percentage = Math.round((suaraScore / totalQuestions) * 100);
    
    let message = `
        <div class="result-container">
            <h3>🏆 Permainan Selesai! 🏆</h3>
            <div class="final-score">
                <div class="score-circle">
                    <span class="score-number">${suaraScore}</span>
                    <span class="score-total">/${totalQuestions}</span>
                </div>
                <p class="score-percentage">${percentage}%</p>
            </div>`;
    
    if (percentage >= 80) {
        message += '<p class="result-message">Hebat sekali! Kamu sangat pintar! 🌟🌟🌟</p>';
    } else if (percentage >= 60) {
        message += '<p class="result-message">Bagus! Terus berlatih ya! 🌟🌟</p>';
    } else {
        message += '<p class="result-message">Jangan menyerah! Coba lagi ya! 🌟</p>';
    }
    
    message += '<button id="restart-suara" class="restart-btn">Mulai Lagi</button></div>';
    
    feedbackElement.innerHTML = message;
    
    // Add event listener to restart button
    setTimeout(() => {
        document.getElementById('restart-suara').addEventListener('click', () => {
            // Reset display
            document.getElementById('play-sound').style.display = 'flex';
            document.getElementById('suara-options').style.display = 'grid';
            document.querySelector('#tebak-suara-section .score-container').style.display = 'block';
            
            // Restart game
            initializeTebakSuara();
        });
    }, 100);
}
