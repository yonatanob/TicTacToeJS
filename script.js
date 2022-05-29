let game;

function startGame() {
  console.log("Strat game!");
  let player1 = new Player(getPlayerName("fname"), "&times");
  let player2 = new Player(getPlayerName("sname"), "◯");

  game = new Game(player1);

  console.log(player1, player2);
  const board = document.createElement("div");
  board.setAttribute("class", "boardGame");

  board.appendChild(
    clickableGrid(3, 3, game, player1, player2, function (el, row, col, i) {
      console.log("You clicked on element:", el);
      console.log("You clicked on row:", row);
      console.log("You clicked on col:", col);
      console.log("You clicked on item #:", i);

      el.classList.add("clicked");
      el.classList.add("disabled");
    })
  );
  const container = document.getElementsByClassName("container");
  container[0].appendChild(board);

  hideStartBtn();
  showResetBtn();
}

function clickableGrid(rows, cols, game, player1, player2, callback) {
  var i = 0;
  var grid = document.createElement("table");
  grid.className = "grid";
  for (var r = 0; r < rows; ++r) {
    var tr = grid.appendChild(document.createElement("tr"));
    for (var c = 0; c < cols; ++c) {
      var cell = tr.appendChild(document.createElement("td"));
      let cellObject = new Cell(r, c, ++i);
      game.board.push(cellObject);
      cell.addEventListener(
        "click",
        (function (el, r, c, i) {
          return function () {
            callback(el, r, c, i);
          };
        })(cell, r, c, i)
      );
      cell.addEventListener("click", function changeTurns() {
        cellObject.token = game.currentPlayer.token;

        document.getElementsByClassName("grid")[0].rows[cellObject.row].cells[
          cellObject.col
        ].innerHTML = cellObject.token;
        console.log(cellObject);

        game.currentPlayer = game.swapPlayers(
          game.currentPlayer,
          player1,
          player2
        );
      });
      cell.addEventListener("click", function incNumOfOccupiedCells() {
        ++game.occupiedCells;
      });

      cell.addEventListener("click", function checkForWinner() {
        if (game.checkWinnerWith(player1)) {
          ++player1.score;
          alert(player1.name + " Wins!!\n" + showScore(player1, player2));
          disableBoard();
        } else if (game.checkWinnerWith(player2)) {
          ++player2.score;
          alert(player2.name + " Wins!!\n" + showScore(player1, player2));
          disableBoard();
        } else if (game.isTie()) {
          alert("TIE!!");
          disableBoard();
        }
      });
    }
  }
  return grid;
}

class Player {
  constructor(name, token) {
    this.name = name;
    this.token = token;
    this.score = 0;
  }
}

class Cell {
  constructor(row, col, id) {
    this.row = row;
    this.col = col;
    this.id = id;
    this.token = "";
  }
}

class Game {
  constructor(currentPlayer) {
    this.currentPlayer = currentPlayer;
    this.board = [];
    this.occupiedCells = 0;
  }
  getCellById(id) {
    return this.board.find((cell) => cell.id === id);
  }

  checkWinnerWith(player) {
    const winRows = this.checkWinInRows(player);
    const winCols = this.checkWinInCols(player);
    const winDiagnols = this.checkWinInDiagnols(player);

    return winRows || winCols || winDiagnols;
  }

  checkWinInRows(player) {
    let isWon = false;

    if (
      (this.getCellById(1).token === player.token &&
        this.getCellById(2).token === player.token &&
        this.getCellById(3).token === player.token) ||
      (this.getCellById(4).token === player.token &&
        this.getCellById(5).token === player.token &&
        this.getCellById(6).token === player.token) ||
      (this.getCellById(7).token === player.token &&
        this.getCellById(8).token === player.token &&
        this.getCellById(9).token === player.token)
    ) {
      isWon = true;
    }
    return isWon;
  }

  checkWinInCols(player) {
    let isWon = false;

    if (
      (this.getCellById(1).token === player.token &&
        this.getCellById(4).token === player.token &&
        this.getCellById(7).token === player.token) ||
      (this.getCellById(2).token === player.token &&
        this.getCellById(5).token === player.token &&
        this.getCellById(8).token === player.token) ||
      (this.getCellById(3).token === player.token &&
        this.getCellById(6).token === player.token &&
        this.getCellById(9).token === player.token)
    ) {
      isWon = true;
    }
    return isWon;
  }

  checkWinInDiagnols(player) {
    let isWon = false;

    if (
      (this.getCellById(1).token === player.token &&
        this.getCellById(5).token === player.token &&
        this.getCellById(9).token === player.token) ||
      (this.getCellById(3).token === player.token &&
        this.getCellById(5).token === player.token &&
        this.getCellById(7).token === player.token)
    ) {
      isWon = true;
    }
    return isWon;
  }

  isTie() {
    return this.occupiedCells == 9;
  }

  swapPlayers(currentPlayer, player1, player2) {
    return currentPlayer === player1 ? player2 : player1;
  }

  resetGame() {
    this.occupiedCells = 0;
    this.board.forEach((cell) => (cell.token = ""));
    resetUI();
  }
}
