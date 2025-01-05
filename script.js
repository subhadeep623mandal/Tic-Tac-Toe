const boxes = document.querySelectorAll(".box");
const resultDisplay = document.querySelector("#results");
const playAgainButton = document.querySelector("#play-again");
const turnIndicator = document.querySelector(".bg");

let turn = "X";
let isGameOver = false;

// Initial Setup
boxes.forEach((box) => {
    box.innerHTML = ""; // Clear the box
    box.addEventListener("click", handleBoxClick); // Add click listener
    box.classList.add('box-hover'); // Add hover class for styling
});

function handleBoxClick(event) {
    const box = event.target;

    // If the box is already filled or the game is over, do nothing
    if (box.innerHTML || isGameOver) return;

    box.innerHTML = turn; // Set the current player's symbol
    checkWin(); // Check if the current player wins
    checkDraw(); // Check if the game is a draw

    if (!isGameOver) changeTurn(); // Switch the turn if the game is ongoing
}

function changeTurn() {
    if (turn === "X") {
        turn = "O";
        turnIndicator.style.left = "85px";
        turnIndicator.style.backgroundColor = "#6A82FB"; // O's color
        updateHoverColor("#FFC857", "#6A82FB"); // Update hover colors for X and O
    } else {
        turn = "X";
        turnIndicator.style.left = "0";
        turnIndicator.style.backgroundColor = "#FFC857"; // X's color
        updateHoverColor("#6A82FB", "#FFC857"); // Update hover colors for O and X
    }
}

function updateHoverColor(xColor, oColor) {
    // Update the hover effects based on the current player's turn
    boxes.forEach((box) => {
        box.addEventListener("mouseenter", () => {
            if (box.innerHTML === "") {
                if (turn === "X") {
                    box.style.backgroundColor = xColor; // Hover color for X
                    box.style.color = "#fff";
                } else {
                    box.style.backgroundColor = oColor; // Hover color for O
                    box.style.color = "#fff";
                }
            }
        });

        box.addEventListener("mouseleave", () => {
            if (box.innerHTML === "") {
                box.style.backgroundColor = ""; // Reset hover color when leaving
                box.style.color = "#2C3E50"; // Reset text color
            }
        });
    });
}

function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    winConditions.forEach((condition) => {
        const [a, b, c] = condition;
        const values = [boxes[a].innerHTML, boxes[b].innerHTML, boxes[c].innerHTML];

        if (values.every((value) => value === turn && value)) {
            isGameOver = true;
            displayResult(`${turn} wins!`);
            highlightWinningBoxes(condition); // Highlight winning boxes
        }
    });
}

function checkDraw() {
    if (!isGameOver && Array.from(boxes).every((box) => box.innerHTML)) {
        isGameOver = true;
        displayResult("It's a draw!");
    }
}

function displayResult(message) {
    resultDisplay.innerHTML = message;
    playAgainButton.style.display = "inline"; // Show the Play Again button
}

function highlightWinningBoxes(condition) {
    condition.forEach((index) => {
        boxes[index].classList.add("winning-box");
    });
}

// Reset game state
playAgainButton.addEventListener("click", () => {
    isGameOver = false;
    turn = "X";
    turnIndicator.style.left = "0";
    turnIndicator.style.backgroundColor = "#FFC857"; // Reset to X's color
    resultDisplay.innerHTML = ""; // Clear the result display
    playAgainButton.style.display = "none"; // Hide the Play Again button

    boxes.forEach((box) => {
        box.innerHTML = ""; // Clear the box
        box.classList.remove("winning-box"); // Remove winning box styles
        box.style.backgroundColor = ""; // Reset background color
        box.style.color = "#2C3E50"; // Reset text color
    });
});
