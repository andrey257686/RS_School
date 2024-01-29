const body = document.querySelector(".body");
import figures from "./figures.js";

let sample = figures[0];

// function parserFigure(matrix) {
//   let resultMatrix = [];
//   let cluesLeftMatrix = [];
//   for (let i = 0; i < matrix.length; i++) {
//     let resNums = [];
//     matrix[i].reduce((acc, el, index, matrixNums) => {
//       if (el === 1) {
//         acc = acc + 1;
//       } else {
//         acc = 0;
//       }
//       resNums.push(acc);
//       if (index === matrix[i].length - 1) {
//         cluesLeftMatrix.push(resNums);
//       }
//       return acc;
//     }, 0);
//   }
//   console.log(cluesLeftMatrix);
// }

// const sample = {
//   up: {
//     rows: 1,
//     cols: 5,
//     nums: [[4, 3, 4, 1, 1]],
//   },
//   left: {
//     rows: 5,
//     cols: 2,
//     nums: [
//       [null, 1],
//       [3, 1],
//       [null, 4],
//       [1, 1],
//       [1, 1],
//     ],
//   },
//   table: [
//     [0, 1, 0, 0, 0],
//     [1, 1, 1, 0, 1],
//     [1, 1, 1, 1, 0],
//     [1, 0, 1, 0, 0],
//     [1, 0, 1, 0, 0],
//   ],
// };

// parserFigure(sample.table);

// const sample = {
//   up: {
//     rows: 3,
//     cols: 15,
//     nums: [
//       [null, null, null, null, null, 7, null, 1, 1, null, null, null, null, null, null],
//       [null, 2, 1, 2, 2, 1, 3, 4, 2, 7, 5, 2, 1, 2, null],
//       [5, 2, 1, 2, 5, 2, 1, 1, 1, 1, 2, 5, 2, 3, 7],
//     ],
//   },
//   left: {
//     rows: 15,
//     cols: 4,
//     nums: [
//       [null, null, null, 3],
//       [null, null, 2, 1],
//       [null, null, null, 6],
//       [null, null, 1, 4],
//       [null, 1, 1, 2],
//       [null, 2, 1, 2],
//       [null, null, 3, 3],
//       [3, 1, 1, 3],
//       [null, null, 2, 2],
//       [null, 1, 1, 1],
//       [1, 1, 1, 1],
//       [1, 1, 1, 1],
//       [2, 1, 1, 2],
//       [null, null, 5, 5],
//       [null, null, null, 12],
//     ],
//   },
//   table: [
//     [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0],
//     [0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0],
//     [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
//     [0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0],
//     [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
//     [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//     [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
//     [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
//     [1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1],
//     [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
//     [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   ],
// };

let playerTable = new Array(sample.table.length).fill(0).map((el, index) => {
  const arr = new Array(sample.table.length).fill(0);
  return arr;
});

const fieldUpCells = ["nothing", "clues"];
const fieldDownCells = ["clues", "game"];
const fieldTableRowObj = { up: fieldUpCells, down: fieldDownCells };
const fieldTableObj = { class: "field", rows: fieldTableRowObj };

const generateMainTable = function (table) {
  const tableClass = table.class;
  const tableRows = table.rows;
  const tableEl = document.createElement("table");
  tableEl.className = tableClass;
  for (let rowClass in tableRows) {
    const row = document.createElement("tr");
    row.className = `${tableClass}__${rowClass}`;
    const cellClasses = tableRows[rowClass];
    for (let i = 0; i < cellClasses.length; i++) {
      const cell = document.createElement("td");
      cell.className = `${tableClass}__${rowClass}_${cellClasses[i]}`;
      row.appendChild(cell);
    }
    tableEl.appendChild(row);
  }
  return tableEl;
};

const generateInnerTable = function (table, figure) {
  const tableType = table.type;
  const tableClass = table.class;
  const tableRows = table.rows;
  const tableEl = document.createElement("table");
  tableEl.className = tableClass;
  console.log(tableRows.nums);
  for (let i = 1; i <= tableRows.nums; i++) {
    const row = document.createElement("tr");
    const rowClassName = `${tableRows.class}${i}`;
    const rowCells = tableRows.cells;
    row.className = rowClassName;
    for (let j = 1; j <= rowCells.nums; j++) {
      const cell = document.createElement("td");
      const cellClassName = `${rowCells.class}${i}${j}`;
      if (tableType === "left") {
        const cellValue = figure.left.nums[i - 1][j - 1];
        cell.innerText = cellValue;
      }
      if (tableType === "up") {
        const cellValue = figure.up.nums[i - 1][j - 1];
        cell.innerText = cellValue;
      }
      cell.className = cellClassName;
      if (tableType === "game") {
        cell.addEventListener("click", (event) => {
          handleCellClick(event, i, j, figure);
        });
      }
      row.appendChild(cell);
    }
    tableEl.appendChild(row);
  }
  return tableEl;
};

function renderSelection() {
  const selectionEl = document.createElement("div");
  selectionEl.className = "selection";
  const selectionListEl = document.createElement("ul");
  selectionListEl.className = "selection__list";
  for (let i = 0; i < figures.length; i++) {
    const selectionListItemEl = document.createElement("li");
    selectionListItemEl.className = "selection__list_item";
    const selectionListButtonEl = document.createElement("button");
    selectionListButtonEl.className = "selection__list_button";
    selectionListButtonEl.innerText = figures[i].description;
    selectionListButtonEl.addEventListener("click", () => {
      handleSelectionButtonClick(i);
    });
    selectionListItemEl.appendChild(selectionListButtonEl);
    selectionListEl.appendChild(selectionListItemEl);
  }
  selectionEl.appendChild(selectionListEl);
  return selectionEl;
}

function handleSelectionButtonClick(index) {
  sample = figures[index];
  body.innerHTML = "";
  playerTable = new Array(sample.table.length).fill(0).map((el, index) => {
    const arr = new Array(sample.table.length).fill(0);
    return arr;
  });
  renderHTML();
}

const renderHTML = function () {
  const cluesTableUpCellObj = {
    nums: sample.up.cols,
    class: "cell clues__cell clues__cell_up clues__cell_",
  };
  const cluesTableUpRowObj = {
    nums: sample.up.rows,
    class: "clues__row clues__up clues__row_up",
    cells: cluesTableUpCellObj,
  };
  const cluesTableUpObj = { class: "clues", rows: cluesTableUpRowObj, type: "up" };

  const cluesTableLeftCellObj = {
    nums: sample.left.cols,
    class: "cell clues__cell clues__cell_left clues__cell_",
  };
  const cluesTableLeftRowObj = {
    nums: sample.left.rows,
    class: "clues__row clues__left clues__row_left",
    cells: cluesTableLeftCellObj,
  };
  const cluesTableLeftObj = { class: "clues", rows: cluesTableLeftRowObj, type: "left" };

  const gameTableCellObj = { nums: sample.table.length, class: "cell game__cell game__cell_" };
  const gameTableRowObj = {
    nums: sample.table.length,
    class: "game__row game__row_",
    cells: gameTableCellObj,
  };
  const gameTableObj = { class: "game", rows: gameTableRowObj, type: "game" };
  const mainTable = generateMainTable(fieldTableObj);
  const mainEl = document.createElement("main");
  mainEl.className = "main";
  const containerEl = document.createElement("div");
  containerEl.className = "container";
  const titleEl = document.createElement("h1");
  titleEl.className = "title";
  titleEl.innerText = "Nonograms Game";
  containerEl.appendChild(titleEl);
  containerEl.appendChild(mainTable);
  mainEl.appendChild(containerEl);
  body.appendChild(mainEl);
  const fieldUpCluesEl = document.querySelector(".field__up_clues");
  fieldUpCluesEl.appendChild(generateInnerTable(cluesTableUpObj, sample));

  const fieldDownCluesEl = document.querySelector(".field__down_clues");
  fieldDownCluesEl.appendChild(generateInnerTable(cluesTableLeftObj, sample));

  const fieldDownGameEl = document.querySelector(".field__down_game");
  fieldDownGameEl.appendChild(generateInnerTable(gameTableObj, sample));
  containerEl.insertBefore(renderSelection(), mainTable);
};

renderHTML();

function handleCellClick(event, i, j, figure) {
  if (playerTable[i - 1][j - 1] === 0) {
    playerTable[i - 1][j - 1] = 1;
  } else if (playerTable[i - 1][j - 1] === 1) {
    playerTable[i - 1][j - 1] = 0;
  }
  let win = true;
  event.target.classList.toggle("game__cell_black");
  for (let i = 0; i < playerTable.length; i++) {
    for (let j = 0; j < playerTable.length; j++) {
      if (playerTable[i][j] !== figure.table[i][j]) {
        win = false;
      }
    }
  }
  if (win) {
    console.log("solved nonogram");
  }
}
