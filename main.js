// main.js - Logika utama dan navigasi aplikasi

// Elemen-elemen DOM untuk navigasi
const mainMenu = document.getElementById("main-menu");
const tebakGambarBtn = document.getElementById("tebak-gambar");
const tebakSuaraBtn = document.getElementById("tebak-suara");
const tebakGambarArea = document.getElementById("tebak-gambar-area");
const tebakSuaraArea = document.getElementById("tebak-suara-area");
const backButtons = document.querySelectorAll(".back-button");

// Event listener untuk navigasi
tebakGambarBtn.addEventListener("click", startImageGame);
tebakSuaraBtn.addEventListener("click", startSoundGame);

backButtons.forEach(button => {
    button.addEventListener("click", goToMainMenu);
});

// Fungsi untuk memulai permainan tebak gambar
function startImageGame() {
    mainMenu.classList.add("hidden");
    tebakGambarArea.classList.remove("hidden");
    
    // Reset skor jika diinginkan
    // resetImageScore();
    
    // Muat pertanyaan pertama
    loadImageQuestion(0);
}

// Fungsi untuk memulai permainan tebak suara
function startSoundGame() {
    mainMenu.classList.add("hidden");
    tebakSuaraArea.classList.remove("hidden");
    
    // Reset skor jika diinginkan
    // resetSoundScore();
    
    // Muat pertanyaan pertama
    loadSoundQuestion(0);
}

// Fungsi untuk kembali ke menu utama
function goToMainMenu() {
    tebakGambarArea.classList.add("hidden");
    tebakSuaraArea.classList.add("hidden");
    mainMenu.classList.remove("hidden");
}

// Fungsi untuk mengacak array (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
