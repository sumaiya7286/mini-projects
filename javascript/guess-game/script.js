const guessInput = document.querySelector("#inputNo");
const checkBtn = document.querySelector("#check-btn");
const restartBtn = document.querySelector("#restart-btn");

const messageBox = document.querySelector(".message p");
const scoreBox = document.querySelector("#score");
const attemptsBox = document.querySelector("#attempts");

let actualNo;
let score;
let attempts;

// ---------- Event Listeners ----------

checkBtn.addEventListener("click", handleGuess);
restartBtn.addEventListener("click", restartGame);

// ---------- Initialize Game ----------

restartGame();

// ---------- Functions ----------

function handleGuess() {

    const text = guessInput.value.trim();

    if (text === "") {
        alert("Please enter a number.");
        return;
    }

    const guess = Number(text);

    if (guess < 1 || guess > 100) {
        alert("Please enter a number between 1 and 100.");
        return;
    }

    updateScore(guess);
    showOutput(guess);

    guessInput.value = "";
    guessInput.focus();
}

function showOutput(guess) {

    if (guess === actualNo) {

        messageBox.textContent = `🎉 Correct! The number was ${actualNo}`;
        checkBtn.disabled = true;
        restartBtn.style.display = "inline-block";

        return;
    }

    if (guess < actualNo) {
        messageBox.textContent = `The number is greater than ${guess}`;
    } else {
        messageBox.textContent = `The number is less than ${guess}`;
    }
}

function updateScore(guess) {

    attempts++;

    if (guess !== actualNo) {
        score = Math.max(score - 10, 0);
    }

    attemptsBox.textContent = `Attempts: ${attempts}`;
    scoreBox.textContent = `Score: ${score}`;
}

function restartGame() {

    actualNo = Math.floor(Math.random() * 100) + 1;

    score = 100;
    attempts = 0;

    scoreBox.textContent = "Score: 100";
    attemptsBox.textContent = "Attempts: 0";

    messageBox.textContent = "Make your first guess!";

    guessInput.value = "";

    checkBtn.disabled = false;

    restartBtn.style.display = "none";

    guessInput.focus();

    console.log(actualNo); // Remove this after testing
}