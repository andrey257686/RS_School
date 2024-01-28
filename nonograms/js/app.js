const container = document.querySelector(".container");

const fieldUpCells = ["nothing", "clues"];
const fieldDownCells = ["clues", "game"];
const fieldTableRowObj = { up: fieldUpCells, down: fieldDownCells, iterable: false };
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

container.appendChild(generateMainTable(fieldTableObj));

const generateInnerTable = function (table, figure) {
  const tableType = table.type;
  const tableClass = table.class;
  const tableRows = table.rows;
  const tableEl = document.createElement("table");
  tableEl.className = tableClass;
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
      row.appendChild(cell);
    }
    tableEl.appendChild(row);
  }
  return tableEl;
};

const sample = {
  up: { rows: 1, cols: 5, nums: [[4, 3, 4, 1, 1]] },
  left: {
    rows: 5,
    cols: 2,
    nums: [
      [null, 1],
      [3, 1],
      [null, 4],
      [1, 1],
      [1, 1],
    ],
  },
  table: [
    [0, 1, 0, 0, 0],
    [1, 1, 1, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 1, 0, 0],
  ],
};

const cluesTableUpCellObj = { nums: 5, class: "cell clues__cell clues__cell_up" };
const cluesTableUpRowObj = {
  nums: 1,
  class: "clues__row clues__row_up",
  cells: cluesTableUpCellObj,
};
const cluesTableUpObj = { class: "clues", rows: cluesTableUpRowObj, type: "up" };

const fieldUpCluesEl = document.querySelector(".field__up_clues");
fieldUpCluesEl.appendChild(generateInnerTable(cluesTableUpObj, sample));

const cluesTableLeftCellObj = { nums: 2, class: "cell clues__cell clues__cell_left" };
const cluesTableLeftRowObj = {
  nums: 5,
  class: "clues__row clues__row_left",
  cells: cluesTableLeftCellObj,
};
const cluesTableLeftObj = { class: "clues", rows: cluesTableLeftRowObj, type: "left" };

const fieldDownCluesEl = document.querySelector(".field__down_clues");
fieldDownCluesEl.appendChild(generateInnerTable(cluesTableLeftObj, sample));

const gameTableCellObj = { nums: 5, class: "cell game__cell game__cell_" };
const gameTableRowObj = {
  nums: 5,
  class: "game__row game__row_",
  cells: gameTableCellObj,
};
const gameTableObj = { class: "game", rows: gameTableRowObj, type: "game" };

const fieldDownGameEl = document.querySelector(".field__down_game");
fieldDownGameEl.appendChild(generateInnerTable(gameTableObj, sample));
