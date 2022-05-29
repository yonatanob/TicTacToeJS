function getPlayerName(inputId) {
  return document.getElementById(inputId).value;
}

function resetUI() {
  const grid = document.getElementsByClassName("grid")[0];
  for (var i = 0, row; (row = grid.rows[i]); i++) {
    for (var j = 0, col; (col = row.cells[j]); j++) {
      col.innerHTML = "";
      col.className = "";
    }
  }
}

function disableBoard() {
  const grid = document.getElementsByClassName("grid")[0];
  for (var i = 0, row; (row = grid.rows[i]); i++) {
    for (var j = 0, col; (col = row.cells[j]); j++) {
      col.classList.add("disabled");
    }
  }
}

function showScore(player1, player2) {
  return `The score is: ${player1.name} : ${player1.score} | ${player2.name} : ${player2.score}`;
}

function hideStartBtn() {
  const startBtn = document.getElementById("startBtn");
  startBtn.style.visibility = "hidden";
}

function showStartBtn() {
  const startBtn = document.getElementById("startBtn");
  startBtn.style.visibility = "visible";
}

function hideResetBtn() {
  const resetBtn = document.getElementById("resetBtn");
  resetBtn.style.visibility = "hidden";
}

function showResetBtn() {
  const resetBtn = document.getElementById("resetBtn");
  resetBtn.style.visibility = "visible";
}
