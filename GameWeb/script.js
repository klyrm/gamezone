const memorySymbols = [
    "🎮",
    "🎮",
    "👾",
    "👾",
    "🚀",
    "🚀",
    "⚡",
    "⚡",
    "🔥",
    "🔥",
    "⭐",
    "⭐"
];

let firstCard = null;
let secondCard = null;

let lockBoard = false;

let moves = 0;
let matches = 0;


function openMemoryGame() {

    document
        .getElementById("memoryGame")
        .classList.add("active");

    startMemoryGame();
}


function closeMemoryGame() {

    document
        .getElementById("memoryGame")
        .classList.remove("active");
}


function shuffle(array) {

    return array.sort(() => Math.random() - 0.5);

}


function startMemoryGame() {

    const board = document.getElementById("memoryBoard");

    board.innerHTML = "";

    firstCard = null;
    secondCard = null;

    lockBoard = false;

    moves = 0;
    matches = 0;

    document.getElementById("moves").textContent = moves;

    document.getElementById("matches").textContent = matches;

    document.getElementById("winMessage").textContent = "";


    const shuffledSymbols = shuffle([...memorySymbols]);


    shuffledSymbols.forEach((symbol) => {

        const card = document.createElement("button");

        card.classList.add("memory-card");

        card.dataset.symbol = symbol;

        card.textContent = symbol;

        card.addEventListener("click", flipCard);

        board.appendChild(card);

    });

}


function flipCard() {

    if (lockBoard) return;

    if (this === firstCard) return;

    if (this.classList.contains("matched")) return;


    this.classList.add("flipped");


    if (!firstCard) {

        firstCard = this;

        return;

    }


    secondCard = this;

    moves++;

    document.getElementById("moves").textContent = moves;

    checkMatch();

}


function checkMatch() {

    const isMatch =
        firstCard.dataset.symbol === secondCard.dataset.symbol;


    if (isMatch) {

        firstCard.classList.add("matched");

        secondCard.classList.add("matched");

        matches++;

        document.getElementById("matches").textContent = matches;

        resetCards();

        if (matches === memorySymbols.length / 2) {

            document.getElementById("winMessage").textContent =
                "🎉 Congratulations! You matched everything!";

        }

    } else {

        lockBoard = true;

        setTimeout(() => {

            firstCard.classList.remove("flipped");

            secondCard.classList.remove("flipped");

            resetCards();

        }, 800);

    }

}


function resetCards() {

    firstCard = null;

    secondCard = null;

    lockBoard = false;

}
// ==============================
// TARGET CLICK GAME
// ==============================

let targetScore = 0;
let targetTime = 30;
let targetTimer = null;
let targetRunning = false;


function openTargetGame() {

    document
        .getElementById("targetGame")
        .classList.add("active");

    startTargetGame();
}


function closeTargetGame() {

    document
        .getElementById("targetGame")
        .classList.remove("active");

    stopTargetGame();
}


function startTargetGame() {

    clearInterval(targetTimer);

    targetScore = 0;
    targetTime = 30;
    targetRunning = true;


    document.getElementById("targetScore").textContent = targetScore;

    document.getElementById("targetTime").textContent = targetTime;

    document.getElementById("targetMessage").textContent = "";


    const target = document.getElementById("target");

    target.style.display = "flex";


    moveTarget();


    targetTimer = setInterval(() => {

        targetTime--;

        document.getElementById("targetTime").textContent = targetTime;


        if (targetTime <= 0) {

            endTargetGame();

        }

    }, 1000);

}


function hitTarget() {

    if (!targetRunning) return;


    targetScore++;

    document.getElementById("targetScore").textContent = targetScore;


    moveTarget();

}


function moveTarget() {

    const targetArea = document.getElementById("targetArea");

    const target = document.getElementById("target");


    const maxX =
        targetArea.clientWidth - target.offsetWidth;


    const maxY =
        targetArea.clientHeight - target.offsetHeight;


    const randomX =
        Math.floor(Math.random() * maxX);


    const randomY =
        Math.floor(Math.random() * maxY);


    target.style.left = randomX + "px";

    target.style.top = randomY + "px";

}


function endTargetGame() {

    targetRunning = false;

    clearInterval(targetTimer);


    document.getElementById("target").style.display = "none";


    document.getElementById("targetMessage").textContent =
        "🎉 Time's up! Your score: " + targetScore;

}


function stopTargetGame() {

    clearInterval(targetTimer);

    targetRunning = false;

}
// ==============================
// QUICK PUZZLE GAME
// ==============================

let puzzleTime = 30;
let puzzleMoves = 0;
let nextNumber = 1;

let puzzleTimer = null;
let puzzleRunning = false;


function openPuzzleGame() {

    document
        .getElementById("puzzleGame")
        .classList.add("active");

    startPuzzleGame();

}


function closePuzzleGame() {

    document
        .getElementById("puzzleGame")
        .classList.remove("active");

    clearInterval(puzzleTimer);

    puzzleRunning = false;

}


function startPuzzleGame() {

    clearInterval(puzzleTimer);

    puzzleTime = 30;

    puzzleMoves = 0;

    nextNumber = 1;

    puzzleRunning = true;


    document.getElementById("puzzleTime").textContent =
        puzzleTime;

    document.getElementById("puzzleMoves").textContent =
        puzzleMoves;

    document.getElementById("puzzleMessage").textContent =
        "";


    createPuzzleBoard();


    puzzleTimer = setInterval(() => {

        puzzleTime--;

        document.getElementById("puzzleTime").textContent =
            puzzleTime;


        if (puzzleTime <= 0) {

            endPuzzleGame();

        }

    }, 1000);

}


function createPuzzleBoard() {

    const board =
        document.getElementById("puzzleBoard");

    board.innerHTML = "";


    let numbers = [];

    for (let i = 1; i <= 8; i++) {

        numbers.push(i);

    }


    numbers.sort(() => Math.random() - 0.5);


    numbers.forEach(number => {

        const button =
            document.createElement("button");

        button.classList.add("puzzle-number");

        button.textContent = number;

        button.dataset.number = number;

        button.onclick = () => checkPuzzleNumber(button);

        board.appendChild(button);

    });

}


function checkPuzzleNumber(button) {

    if (!puzzleRunning) return;


    const number =
        Number(button.dataset.number);


    if (number === nextNumber) {

        button.classList.add("correct");

        button.disabled = true;

        nextNumber++;

        puzzleMoves++;


        document.getElementById("puzzleMoves").textContent =
            puzzleMoves;


        if (nextNumber > 8) {

            winPuzzleGame();

        }

    } else {

        button.classList.add("wrong");


        setTimeout(() => {

            button.classList.remove("wrong");

        }, 300);

    }

}


function winPuzzleGame() {

    puzzleRunning = false;

    clearInterval(puzzleTimer);


    document.getElementById("puzzleMessage").textContent =
        "🎉 Puzzle complete! Great job!";

}


function endPuzzleGame() {

    puzzleRunning = false;

    clearInterval(puzzleTimer);


    document.getElementById("puzzleMessage").textContent =
        "⏰ Time's up! Try again!";

}