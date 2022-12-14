const cellEle = document.querySelectorAll("[data-cell]");
const boardClass = document.querySelector("#board");
const x_turn = "x";
const circle_turn = "circle";
const winning_combination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const winning_Txt = document.querySelector("[data-winning-message-text]");
const winning_Msg = document.querySelector("#winningMessage");
const restartButton = document.querySelector("#restartButton");
let circleTurn;
cellEle.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
  restartButton.addEventListener("click", function (e) {
    winning_Msg.classList.remove("show");
    cell.classList.remove(x_turn);
    console.log(cell.classList.remove(x_turn));
    cell.classList.remove(circle_turn);
  });
});

function handleClick(e) {
  const cell = e.target;
  const curr_class = circleTurn ? circle_turn : x_turn;
  placeMark(cell, curr_class);
  if (checkWin(curr_class)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurn();
    setBoardClass();
  }

  // swapTurn();
  // setBoardClass();
}
function isDraw() {
  return [...cellEle].every((cell) => {
    return (
      cell.classList.contains(x_turn) || cell.classList.contains(circle_turn)
    );
  });
}

function endGame(draw) {
  if (draw) {
    winning_Msg.innerText = "Draw!";
  } else {
    winning_Txt.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winning_Msg.classList.add("show");
}
function placeMark(cell, curr_class) {
  cell.classList.add(curr_class);
}
function swapTurn() {
  circleTurn = !circleTurn;
}

function setBoardClass() {
  boardClass.classList.remove(x_turn);
  boardClass.classList.remove(circle_turn);
  if (circleTurn) {
    boardClass.classList.add(circle_turn);
  } else {
    boardClass.classList.add(x_turn);
  }
}

function checkWin(curr) {
  return winning_combination.some((combination) => {
    return combination.every((i) => {
      return cellEle[i].classList.contains(curr);
    });
  });
}
