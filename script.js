document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("welcomeModal");
    const closeModal = document.getElementById("closeModal");
    const timeUpModal = document.getElementById("timeUpModal");
    const restartGameBtn = document.getElementById("restartGame");

    let gameStarted = false;
    let canPlay = true; // Flag to prevent clicks after time runs out

    // Show welcome modal on page load
    modal.classList.remove("hidden");

    // Close welcome modal and start game
    closeModal.addEventListener("click", () => {
        modal.classList.add("hidden");
        if (!gameStarted) {
            gameStarted = true;
            startGame();
        }
    });

    // Restart game from the modal
    restartGameBtn.addEventListener("click", () => {
        timeUpModal.classList.add("hidden");
        resetGame();
    });
});

// Game Elements
const colorBox = document.getElementById("colorBox");
const colorOptions = document.getElementById("colorOptions");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");
const timerDisplay = document.getElementById("timer");
const darkModeToggle = document.getElementById("darkModeToggle");

let score = 0;
let timeLeft = 10;
let interval;
let correctColor;
let colors = [];
let canPlay = true; // Prevents clicking after time is up

// Generate random colors
function generateColors() {
    colors = [];
    for (let i = 0; i < 6; i++) { // Increased to 10 colors
        colors.push(randomColor());
    }
    correctColor = colors[Math.floor(Math.random() * colors.length)];
    colorBox.style.backgroundColor = correctColor;
}

// Generate a random RGB color
function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Set up the game with color choices
function setupGame() {
    colorOptions.innerHTML = "";
    generateColors();
    colors.forEach((color) => {
        let btn = document.createElement("div");
        btn.classList.add("colorOption");
        btn.style.backgroundColor = color;
        btn.setAttribute("data-testid", "colorOption");
        btn.addEventListener("click", () => checkGuess(color));
        colorOptions.appendChild(btn);
    });
    startTimer();
}

// Check if the chosen color is correct
function checkGuess(color) {
    if (!canPlay) {
        timeUpModal.classList.remove("hidden"); // Show modal if time is up
        return;
    }
    
    if (color === correctColor) {
        gameStatus.textContent = "✅ Correct!";
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        resetGame();
    } else {
        gameStatus.textContent = "❌ Wrong! Try again.";
    }
}

// Start countdown timer
function startTimer() {
    clearInterval(interval);
    timeLeft = 10;
    canPlay = true;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    
    interval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;
        
        if (timeLeft === 0) {
            gameStatus.textContent = "⏳ Time's up!";
            canPlay = false;
            clearInterval(interval);
        }
    }, 1000);
}

// Reset the game
function resetGame() {
    clearInterval(interval);
    setupGame();
}

// New Game Button
newGameButton.addEventListener("click", () => {
    score = 0;
    scoreDisplay.textContent = "Score: 0";
    gameStatus.textContent = "";
    resetGame();
});

// Dark Mode Toggle
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Start the game
setupGame();
