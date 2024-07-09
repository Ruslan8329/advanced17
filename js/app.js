document.addEventListener("DOMContentLoaded", () => {
  const playerGrid = document.getElementById("player-grid");
  const computerGrid = document.getElementById("computer-grid");
  const startGameBtn = document.getElementById("start-game");
  const stopGameBtn = document.getElementById("stop-game");
  const pauseGameBtn = document.getElementById("pause-game");
  const themeSelect = document.getElementById("theme-select");

  let playerShips = [];
  let computerShips = [];
  let gamePaused = false;
  let currentPlayer = "player"; // 'player' or 'computer'

  function createGrid(grid) {
    for (let i = 0; i < 100; i++) {
      const cell = document.createElement("div");
      grid.appendChild(cell);
    }
  }

  function placeShipsRandomly(grid) {
    const ships = [];
    for (let i = 0; i < 5; i++) {
      let cellIndex;
      do {
        cellIndex = Math.floor(Math.random() * 100);
      } while (ships.includes(cellIndex));
      ships.push(cellIndex);
      grid.children[cellIndex].classList.add("ship");
    }
    return ships;
  }

  function resetGrid(grid) {
    for (let i = 0; i < grid.children.length; i++) {
      grid.children[i].className = "";
    }
  }

  function startGame() {
    resetGrid(playerGrid);
    resetGrid(computerGrid);
    playerShips = placeShipsRandomly(playerGrid);
    computerShips = placeShipsRandomly(computerGrid);
    currentPlayer = "player";
    updateTurn();
  }

  function stopGame() {
    resetGrid(playerGrid);
    resetGrid(computerGrid);
    playerShips = [];
    computerShips = [];
    currentPlayer = "player";
    updateTurn();
  }

  function pauseGame() {
    gamePaused = !gamePaused;
    pauseGameBtn.textContent = gamePaused
      ? "Продолжить игру"
      : "Приостановить игру";
  }

  function updateTurn() {
    if (currentPlayer === "player") {
      computerGrid.classList.add("active");
      playerGrid.classList.remove("active");
    } else {
      computerGrid.classList.remove("active");
      playerGrid.classList.add("active");
      computerTurn();
    }
  }

  function playerTurn(e) {
    if (!gamePaused && currentPlayer === "player") {
      const index = Array.from(computerGrid.children).indexOf(e.target);
      if (
        !e.target.classList.contains("hit") &&
        !e.target.classList.contains("miss")
      ) {
        if (computerShips.includes(index)) {
          e.target.classList.add("hit");
        } else {
          e.target.classList.add("miss");
        }
        currentPlayer = "computer";
        updateTurn();
      }
    }
  }

  function computerTurn() {
    if (!gamePaused && currentPlayer === "computer") {
      setTimeout(() => {
        let index;
        do {
          index = Math.floor(Math.random() * 100);
        } while (
          playerGrid.children[index].classList.contains("hit") ||
          playerGrid.children[index].classList.contains("miss")
        );

        if (playerShips.includes(index)) {
          playerGrid.children[index].classList.add("hit");
        } else {
          playerGrid.children[index].classList.add("miss");
        }
        currentPlayer = "player";
        updateTurn();
      }, 1000);
    }
  }

  themeSelect.addEventListener("change", (event) => {
    document.body.className = event.target.value === "dark" ? "dark-theme" : "";
  });

  startGameBtn.addEventListener("click", startGame);
  stopGameBtn.addEventListener("click", stopGame);
  pauseGameBtn.addEventListener("click", pauseGame);

  computerGrid.addEventListener("click", playerTurn);

  createGrid(playerGrid);
  createGrid(computerGrid);
});
