const board = document.getElementById("board") as HTMLElement;
const statusText = document.getElementById("status") as HTMLElement;
const restartBtn = document.getElementById("restart") as HTMLButtonElement;

type Player = "X" | "O";
let currentPlayer: Player = "X";
let gameBoard: (Player | "")[] = ["", "", "", "", "", "", "", "", ""];
let gameActive: boolean = true;

const createBoard = (): void => {
  board.innerHTML = "";
  gameBoard.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.dataset.index = index.toString();
    cellElement.textContent = cell;
    cellElement.addEventListener("click", handleCellClick);
    board.appendChild(cellElement);
  });
};

const handleCellClick = (event: Event): void => {
  const target = event.target as HTMLElement;
  const index = parseInt(target.dataset.index as string, 10);

  if (gameBoard[index] !== "" || !gameActive) return;

  gameBoard[index] = currentPlayer;
  target.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `Gracz ${currentPlayer} wygrywa!`;
    gameActive = false;
    return;
  }

  if (gameBoard.every((cell) => cell !== "")) {
    statusText.textContent = "Remis!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Ruch gracza ${currentPlayer}`;
};

const checkWin = (): boolean => {
  const winPatterns: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some((pattern) => {
    const [a, b, c] = pattern;
    return gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
  });
};

const restartGame = (): void => {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Ruch gracza X";
  createBoard();
};

restartBtn.addEventListener("click", restartGame);

createBoard();
