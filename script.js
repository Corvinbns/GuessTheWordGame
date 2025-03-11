const words = [
    { word: "apple", hint: "A fruit that keeps the doctor away" },
    { word: "guitar", hint: "A musical instrument with strings" },
    { word: "ocean", hint: "A vast body of saltwater" },
    { word: "elephant", hint: "The largest land animal" }
];

let selectedWord = {};
let displayedWord = [];
let chances = 5;
let score = 0;


const bgMusic = document.getElementById("bg-music");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const gameOverSound = document.getElementById("game-over-sound");


const songs = [
    "assets/bg1.mp3",
    "assets/bg2.mp3",
    "assets/bg3.mp3"
];


const startMenu = document.getElementById("start-menu");
const gameContainer = document.getElementById("game-container");
const wordDisplay = document.getElementById("word-display");
const hintDisplay = document.getElementById("hint");
const keyboard = document.getElementById("keyboard");
const chancesDisplay = document.getElementById("chances");
const scoreDisplay = document.getElementById("score");


document.getElementById("start-btn").addEventListener("click", startGame);

function startGame() {
    startMenu.classList.add("hidden");
    gameContainer.classList.remove("hidden");

    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayedWord = Array(selectedWord.word.length).fill("_");
    wordDisplay.innerHTML = displayedWord.join(" ");
    hintDisplay.innerHTML = `Hint: ${selectedWord.hint}`;
    chances = 5;
    chancesDisplay.innerText = chances;
    
    playRandomMusic();
    generateKeyboard();
}


function playRandomMusic() {
    let randomSong = songs[Math.floor(Math.random() * songs.length)];
    bgMusic.src = randomSong;
    bgMusic.play();
}


function generateKeyboard() {
    keyboard.innerHTML = "";
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    alphabet.split("").forEach(letter => {
        let key = document.createElement("div");
        key.innerText = letter;
        key.classList.add("key");
        key.addEventListener("click", () => checkLetter(letter, key));
        keyboard.appendChild(key);
    });
}

function checkLetter(letter, keyElement) {
    if (selectedWord.word.includes(letter)) {
        correctSound.play();
        for (let i = 0; i < selectedWord.word.length; i++) {
            if (selectedWord.word[i] === letter) {
                displayedWord[i] = letter;
            }
        }
        wordDisplay.innerHTML = displayedWord.join(" ");
    } else {
        wrongSound.play();
        chances--;
        chancesDisplay.innerText = chances;
    }

    keyElement.style.pointerEvents = "none";
    keyElement.style.backgroundColor = "gray";

    checkWinOrLose();
}

function checkWinOrLose() {
    if (!displayedWord.includes("_")) {
        score += 10;
        scoreDisplay.innerText = score;
        setTimeout(startGame, 1000);
    } else if (chances === 0) {
        gameOverSound.play();
        alert("Game Over! Try again.");
        startGame();
    }
}