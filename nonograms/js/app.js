const container = document.querySelector(".container");

// const generateMainTable = function () {
//   const field = document.createElement("table");
//   field.className = "field";
//   const fieldUp = document.createElement("tr");
//   fieldUp.className = "field__up";
//   const fieldUpNothing = document.createElement("td");
//   fieldUpNothing.className = "field__up_nothing";
//   const fieldUpClues = document.createElement("td");
//   fieldUpClues.className = "field__up_clues";
//   const cluesUp = document.createElement;
//   const fieldDown = document.createElement("tr");
//   fieldDown.className = "field__down";
// };
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

const generateInnerTable = function (table) {
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
      cell.className = cellClassName;
      row.appendChild(cell);
    }
    tableEl.appendChild(row);
  }
  return tableEl;
};

const cluesTableUpCellObj = { nums: 5, class: "cell clues__cell clues__cell_up" };
const cluesTableUpRowObj = {
  nums: 1,
  class: "clues__row clues__row_up",
  cells: cluesTableUpCellObj,
};
const cluesTableUpObj = { class: "clues", rows: cluesTableUpRowObj };

const fieldUpCluesEl = document.querySelector(".field__up_clues");
fieldUpCluesEl.appendChild(generateInnerTable(cluesTableUpObj));

const cluesTableLeftCellObj = { nums: 2, class: "cell clues__cell clues__cell_left" };
const cluesTableLeftRowObj = {
  nums: 5,
  class: "clues__row clues__row_left",
  cells: cluesTableLeftCellObj,
};
const cluesTableLeftObj = { class: "clues", rows: cluesTableLeftRowObj };

const fieldDownCluesEl = document.querySelector(".field__down_clues");
fieldDownCluesEl.appendChild(generateInnerTable(cluesTableLeftObj));

const gameTableCellObj = { nums: 5, class: "cell game__cell game__cell_" };
const gameTableRowObj = {
  nums: 5,
  class: "game__row game__row_",
  cells: gameTableCellObj,
};
const gameTableObj = { class: "game", rows: gameTableRowObj };

const fieldDownGameEl = document.querySelector(".field__down_game");
fieldDownGameEl.appendChild(generateInnerTable(gameTableObj));
