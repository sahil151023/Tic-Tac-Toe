const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const startCells = ["", "", "", "", "", "", "", "", ""];
let go = "circle";
let gameActive = true;
infoDisplay.textContent = "Circle goes first";

function createBoard() {
    startCells.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('square');
        cellElement.id = index;
        cellElement.addEventListener('click', addGo);
        gameBoard.append(cellElement);
    });
}
createBoard();

function addGo(e) {
    if (!gameActive) {
        return;
    }

    const goDisplay = document.createElement('div');
    goDisplay.classList.add(go);
    e.target.append(goDisplay);
    go = go === "circle" ? "cross" : "circle";
    infoDisplay.textContent = "It is now " + go + "'s go.";
    e.target.removeEventListener("click", addGo);
    checkScore();
}

function checkScore() {
    const allSquares = document.querySelectorAll(".square");

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    let winner = null;

    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;

        if (
            allSquares[a].firstElementChild?.classList.contains("circle") &&
            allSquares[b].firstElementChild?.classList.contains("circle") &&
            allSquares[c].firstElementChild?.classList.contains("circle")
        ) {
            winner = "Circle";
        }

        if (
            allSquares[a].firstElementChild?.classList.contains("cross") &&
            allSquares[b].firstElementChild?.classList.contains("cross") &&
            allSquares[c].firstElementChild?.classList.contains("cross")
        ) {
            winner = "Cross";
        }
    });

    if (winner) {
        infoDisplay.textContent = winner + " wins!";
        gameActive = false;
    }
}

function resetGame() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.innerHTML = '';
        square.addEventListener('click', addGo);
    });
    gameActive = true;
    go = "circle";
    infoDisplay.textContent = "Circle goes first";
}
