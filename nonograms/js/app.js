const body = document.querySelector(".body");
import figures from "./figures.js";

let sample = figures[0];
let timerId = 0;
let seconds = 0;
let minutes = 0;
let timerFlag = false;
let winArr = JSON.parse(localStorage.getItem("resultTable")) || [];
let selectedSize = "easy";
const mapSelectedSize = { 0: "easy", 1: "medium", 2: "hard" };
let isSoundOn = true;
let isSolutionShowed = false;

const winAudio = new Audio("./assets/sounds/win.mp3");
const blackAudio = new Audio("./assets/sounds/black.mp3");
const whiteAudio = new Audio("./assets/sounds/white.mp3");
const crossAudio = new Audio("./assets/sounds/cross.mp3");

let playerTable = new Array(sample.table.length).fill(0).map(() => {
  const arr = new Array(sample.table.length).fill(0);
  return arr;
});

const fieldUpCells = ["nothing", "clues"];
const fieldDownCells = ["clues", "game"];
const fieldTableRowObj = { up: fieldUpCells, down: fieldDownCells };
const fieldTableObj = { class: "gamifield__play field", rows: fieldTableRowObj };

function soundHandler(cell) {
  if (!isSoundOn) {
    return 0;
  }
  if (cell.classList.contains("game__cell_black")) {
    if (blackAudio.paused) {
      blackAudio.play();
    } else {
      blackAudio.currentTime = 0;
    }
    return 0;
  } else if (cell.classList.contains("game__cell_cross")) {
    if (crossAudio.paused) {
      crossAudio.play();
    } else {
      crossAudio.currentTime = 0;
    }
    return 0;
  }
  if (whiteAudio.paused) {
    whiteAudio.play();
  } else {
    whiteAudio.currentTime = 0;
  }
}

function generateResultTable() {
  const tableResultEl = document.createElement("table");
  tableResultEl.className = "bestResults__table results";
  const tableResultLineEl = document.createElement("tr");
  tableResultLineEl.className = "results__line";
  for (let j = 0; j < 3; j += 1) {
    const tableResultCellEl = document.createElement("th");
    tableResultCellEl.className = "results__cell";
    switch (j) {
      case 0:
        tableResultCellEl.innerText = "Название";
        break;
      case 1:
        tableResultCellEl.innerText = "Сложность";
        break;
      case 2:
        tableResultCellEl.innerText = "Время";
        break;
    }
    tableResultLineEl.appendChild(tableResultCellEl);
  }
  tableResultEl.appendChild(tableResultLineEl);
  for (let i = 0; i < 5; i += 1) {
    const tableResultLineEl = document.createElement("tr");
    tableResultLineEl.className = "results__line";
    for (let j = 0; j < 3; j += 1) {
      const tableResultCellEl = document.createElement("td");
      tableResultCellEl.className = "results__cell";
      switch (j) {
        case 0:
          if (winArr && winArr[i] !== undefined) {
            tableResultCellEl.innerText = `${winArr[i].name}`;
          } else {
            tableResultCellEl.innerText = "";
          }
          break;
        case 1:
          if (winArr && winArr[i] !== undefined) {
            tableResultCellEl.innerText = `${winArr[i].difficulty}`;
          } else {
            tableResultCellEl.innerText = "";
          }
          break;
        case 2:
          if (winArr && winArr[i] !== undefined) {
            tableResultCellEl.innerText = `${winArr[i].time}`;
          } else {
            tableResultCellEl.innerText = "";
          }
          break;
      }
      tableResultLineEl.appendChild(tableResultCellEl);
    }
    tableResultEl.appendChild(tableResultLineEl);
  }
  return tableResultEl;
}

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
        if (playerTable[i - 1][j - 1] === 1) {
          cell.classList.add("game__cell_black");
        }
        if (playerTable[i - 1][j - 1] === 2) {
          cell.classList.add("game__cell_cross");
        }
        cell.addEventListener("click", (event) => {
          handleCellClick(event, i, j, figure);
        });
        cell.addEventListener("contextmenu", (event) => {
          event.preventDefault();
          if (playerTable[i - 1][j - 1] === 0 || playerTable[i - 1][j - 1] === 1) {
            playerTable[i - 1][j - 1] = 2;
          } else if (playerTable[i - 1][j - 1] === 2) {
            playerTable[i - 1][j - 1] = 0;
          }
          event.target.classList.remove("game__cell_black");
          event.target.classList.toggle("game__cell_cross");
          soundHandler(event.target);
        });
      }
      row.appendChild(cell);
    }
    tableEl.appendChild(row);
  }
  return tableEl;
};

function renderSelection3() {
  const selectionEl = document.createElement("div");
  selectionEl.className = "selection";
  const sizeEl = document.createElement("div");
  sizeEl.className = "selection__size size";
  const sizeButtonEl = document.createElement("button");
  sizeButtonEl.className = "size__button";
  sizeButtonEl.innerHTML = `Выберите уровень <img class="arrow" src='./assets/img/arrow.svg'></img>`;
  const sizeVariantsEl = document.createElement("div");
  sizeVariantsEl.className = "size__variants";
  for (let i = 0; i < 3; i += 1) {
    const sizeVariantEl = document.createElement("p");
    sizeVariantEl.className = "size__variant";
    if (i === 0) {
      sizeVariantEl.innerText = "5x5";
    }
    if (i === 1) {
      sizeVariantEl.innerText = "10x10";
    }
    if (i === 2) {
      sizeVariantEl.innerText = "15x15";
    }
    sizeVariantEl.addEventListener("click", () => {
      handleClickSizeVariant(i);
    });
    sizeVariantsEl.appendChild(sizeVariantEl);
  }
  const figuresEl = document.createElement("div");
  figuresEl.className = "selection__figures figures";
  const figuresListEl = document.createElement("ul");
  figuresListEl.className = "figures__list";
  const selectedFigures = figures.filter((figure) => {
    return figure.size === selectedSize;
  });
  for (let i = 0; i < selectedFigures.length; i += 1) {
    const figuresListItemEl = document.createElement("li");
    figuresListItemEl.className = "figures__list_item";
    const figuresListButtonEl = document.createElement("button");
    figuresListButtonEl.className = "figures__list_button";
    figuresListButtonEl.innerText = selectedFigures[i].description;
    figuresListButtonEl.addEventListener("click", () => {
      if (selectedSize === "easy") {
        handleSelectionButtonClick(i);
      }
      if (selectedSize === "medium") {
        handleSelectionButtonClick(i + 5);
      }
      if (selectedSize === "hard") {
        handleSelectionButtonClick(i + 10);
      }
    });
    figuresListItemEl.appendChild(figuresListButtonEl);
    figuresListEl.appendChild(figuresListItemEl);
  }
  figuresEl.appendChild(figuresListEl);
  sizeEl.appendChild(sizeButtonEl);
  sizeEl.appendChild(sizeVariantsEl);
  selectionEl.appendChild(sizeEl);
  selectionEl.appendChild(figuresEl);
  return selectionEl;
}

function resetTimer() {
  clearInterval(timerId);
  seconds = 0;
  minutes = 0;
  timerFlag = false;
}

function countdownTimer() {
  seconds++;
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }
  const timerMinutesEl = document.querySelector(".timer__minutes");
  const timerSecondsEl = document.querySelector(".timer__seconds");
  timerSecondsEl.innerText = String(seconds).padStart(2, "0");
  timerMinutesEl.innerText = String(minutes).padStart(2, "0");
}

function handleClickSizeVariant(i) {
  selectedSize = mapSelectedSize[i];
  const selectedFigures = figures.filter((figure) => {
    return figure.size === selectedSize;
  });
  sample = selectedFigures[0];
  body.innerHTML = "";
  playerTable = new Array(sample.table.length).fill(0).map(() => {
    const arr = new Array(sample.table.length).fill(0);
    return arr;
  });
  resetTimer();
  renderHTML();
}

function handleCellClick(event, i, j, figure) {
  if (isSolutionShowed) {
    alert("Начните заново!!!");
    return 0;
  }
  if (!timerFlag) {
    timerId = setInterval(countdownTimer, 1000);
    timerFlag = true;
  }
  if (playerTable[i - 1][j - 1] === 0 || playerTable[i - 1][j - 1] === 2) {
    playerTable[i - 1][j - 1] = 1;
  } else if (playerTable[i - 1][j - 1] === 1) {
    playerTable[i - 1][j - 1] = 0;
  }
  let win = true;
  event.target.classList.toggle("game__cell_black");
  event.target.classList.remove("game__cell_cross");
  soundHandler(event.target);
  for (let i = 0; i < playerTable.length; i++) {
    for (let j = 0; j < playerTable.length; j++) {
      const tmpValue = playerTable[i][j] === 2 ? 0 : playerTable[i][j];
      if (tmpValue !== figure.table[i][j]) {
        win = false;
      }
    }
  }
  if (win) {
    if (isSoundOn) {
      winAudio.play();
    }
    const winResult = createWinObject();
    if (winArr.length === 0) {
      winArr.push(winResult);
      localStorage.setItem("resultTable", JSON.stringify(winArr));
    } else {
      winArr = JSON.parse(localStorage.getItem("resultTable"));
      winArr.push(winResult);
      const sortedWinArr = sortWinArr(winArr);
      localStorage.setItem("resultTable", JSON.stringify(sortedWinArr));
    }
    let resultsTableEl = document.querySelector(".results");
    resultsTableEl.remove();
    const bestResultsEl = document.querySelector(".bestResults");
    bestResultsEl.appendChild(generateResultTable());
    setTimeout(showModal, 500, minutes, seconds);
    resetTimer();
  }
}

function showModal(minutes, seconds) {
  const overlayEl = document.querySelector(".overlay");
  const modalEl = document.querySelector(".modal");
  const modalTimeEl = document.querySelector(".modal__time");
  modalTimeEl.innerText = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  modalEl.style.display = "flex";
  overlayEl.style.display = "block";
}

function sortWinArr(arr) {
  arr.sort((a, b) => {
    const timeA = a.minutes + a.seconds;
    const timeB = b.minutes + b.seconds;
    return timeA - timeB;
  });
  return arr.slice(0, 5);
}

function createWinObject() {
  const winName = sample.description;
  const winMinutes = minutes;
  const winSeconds = seconds;
  const winDifficulty = sample.size;
  const winResult = {
    name: winName,
    minutes: winMinutes,
    seconds: winSeconds,
    time: `${String(winMinutes).padStart(2, "0")}:${String(winSeconds).padStart(2, "0")}`,
    difficulty: winDifficulty,
  };
  return winResult;
}
function handleModalButtonClick() {
  // sample = sample;
  body.innerHTML = "";
  playerTable = new Array(sample.table.length).fill(0).map(() => {
    const arr = new Array(sample.table.length).fill(0);
    return arr;
  });
  resetTimer();
  renderHTML();
}

function handleSelectionButtonClick(index) {
  sample = figures[index];
  body.innerHTML = "";
  playerTable = new Array(sample.table.length).fill(0).map(() => {
    const arr = new Array(sample.table.length).fill(0);
    return arr;
  });
  resetTimer();
  renderHTML();
}

function handleSaveButton() {
  localStorage.setItem("sample", JSON.stringify(sample));
  localStorage.setItem("playerTable", JSON.stringify(playerTable));
}

function handleResumeButton() {
  sample = JSON.parse(localStorage.getItem("sample"));
  playerTable = JSON.parse(localStorage.getItem("playerTable"));
  body.innerHTML = "";
  resetTimer();
  renderHTML();
}

function handleRandomButton() {
  sample = figures[Math.floor(Math.random() * figures.length)];
  body.innerHTML = "";
  playerTable = new Array(sample.table.length).fill(0).map(() => {
    const arr = new Array(sample.table.length).fill(0);
    return arr;
  });
  resetTimer();
  renderHTML();
}

function handleSolutionButton() {
  playerTable = sample.table;
  body.innerHTML = "";
  resetTimer();
  renderHTML();
  isSolutionShowed = true;
}

const renderHTML = function () {
  isSolutionShowed = false;
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
  containerEl.appendChild(renderSelection3());
  const gameFieldEl = document.createElement("div");
  gameFieldEl.className = "gamefield";
  gameFieldEl.appendChild(mainTable);
  containerEl.appendChild(gameFieldEl);
  // ========================   Генерация блока с кнопками   =========================
  const buttonsFieldEl = document.createElement("div");
  buttonsFieldEl.className = "gamefield__buttons";
  gameFieldEl.appendChild(buttonsFieldEl);
  // ------------------------   генерация таймера   ---------------------------
  const timerEl = document.createElement("div");
  timerEl.className = "timer";
  const timerMinutesEl = document.createElement("div");
  timerMinutesEl.className = "timer__minutes";
  timerMinutesEl.innerText = "00";
  const timerSecondsEl = document.createElement("div");
  timerSecondsEl.className = "timer__seconds";
  timerSecondsEl.innerText = "00";
  timerEl.appendChild(timerMinutesEl);
  timerEl.appendChild(timerSecondsEl);
  buttonsFieldEl.appendChild(timerEl);
  // ------------------------   генерация кнопки Рестарт   ---------------------------
  const restartButtonEl = document.createElement("button");
  restartButtonEl.className = "button restart";
  restartButtonEl.innerText = "Начать заново";
  restartButtonEl.addEventListener("click", (event) => {
    event.preventDefault();
    body.innerHTML = "";
    playerTable = new Array(sample.table.length).fill(0).map(() => {
      const arr = new Array(sample.table.length).fill(0);
      return arr;
    });
    resetTimer();
    renderHTML();
  });
  buttonsFieldEl.appendChild(restartButtonEl);
  // ------------------------   генерация кнопки Продолжить   ---------------------------
  const resumeButtonEl = document.createElement("button");
  resumeButtonEl.className = "button resume";
  resumeButtonEl.innerText = "Продолжить игру";
  resumeButtonEl.addEventListener("click", () => {
    handleResumeButton();
  });
  buttonsFieldEl.appendChild(resumeButtonEl);
  // ------------------------   генерация кнопки Сохранить   ---------------------------
  const saveButtonEl = document.createElement("button");
  saveButtonEl.className = "button save";
  saveButtonEl.innerText = "Сохранить игру";
  saveButtonEl.addEventListener("click", (event) => {
    handleSaveButton();
  });
  buttonsFieldEl.appendChild(saveButtonEl);
  // ------------------------   генерация кнопки Случайная фигура   ---------------------------
  const randomButtonEl = document.createElement("button");
  randomButtonEl.className = "button random";
  randomButtonEl.innerText = "Случайная фигура";
  randomButtonEl.addEventListener("click", (event) => {
    handleRandomButton();
  });
  buttonsFieldEl.appendChild(randomButtonEl);
  // ------------------------   генерация кнопки Решение   ---------------------------
  const solutionButtonEl = document.createElement("button");
  solutionButtonEl.className = "button solution";
  solutionButtonEl.innerText = "Решение";
  solutionButtonEl.addEventListener("click", (event) => {
    handleSolutionButton();
  });
  buttonsFieldEl.appendChild(solutionButtonEl);
  // ------------------------   генерация кнопки Смена цвета   ---------------------------
  const colorButtonEl = document.createElement("button");
  colorButtonEl.className = "button color";
  // colorButtonEl.innerText = "Цвет";
  colorButtonEl.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20V4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20Z" fill="#212121"/></svg>`;
  colorButtonEl.addEventListener("click", () => {
    const colorScheme = document.body.getAttribute("dark");
    if (!colorScheme) {
      document.body.setAttribute("dark", "true");
    } else {
      document.body.removeAttribute("dark");
    }
    body.classList.toggle("body__dark");
  });
  buttonsFieldEl.appendChild(colorButtonEl);
  // ------------------------   генерация кнопки вкл/выкл Звук   ---------------------------
  const soundButtonEl = document.createElement("button");
  soundButtonEl.className = "button sound";
  // soundButtonEl.innerText = "Звук";
  soundButtonEl.innerHTML = `<svg width="24" height="24" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:#101820;}</style></defs><title/><g data-name="Layer 34" id="Layer_34"><path class="cls-1" d="M18,29a1,1,0,0,1-.57-.18l-10-7A1,1,0,0,1,7,21V11a1,1,0,0,1,.43-.82l10-7a1,1,0,0,1,1-.07A1,1,0,0,1,19,4V28a1,1,0,0,1-.54.89A1,1,0,0,1,18,29ZM9,20.48l8,5.6V5.92l-8,5.6Z"/><path class="cls-1" d="M8,22H4a3,3,0,0,1-3-3V13a3,3,0,0,1,3-3H8a1,1,0,0,1,1,1V21A1,1,0,0,1,8,22ZM4,12a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1H7V12Z"/><path class="cls-1" d="M18,21V19a3,3,0,0,0,2.12-5.12l1.42-1.42A5,5,0,0,1,18,21Z"/><path class="cls-1" d="M26.48,25.48a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42,11,11,0,0,0,0-15.54,1,1,0,1,1,1.42-1.42,13,13,0,0,1,0,18.38A1,1,0,0,1,26.48,25.48Z"/><path class="cls-1" d="M23.65,22.65a1,1,0,0,1-.7-.29A1,1,0,0,1,23,21a7,7,0,0,0,0-9.9,1,1,0,0,1,1.41-1.41,9,9,0,0,1,0,12.72A1,1,0,0,1,23.65,22.65Z"/></g></svg>`;
  soundButtonEl.addEventListener("click", (event) => {
    isSoundOn = isSoundOn === true ? false : true;
    if (isSoundOn) {
      soundButtonEl.innerHTML = `<svg width="24" height="24" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:#101820;}</style></defs><title/><g data-name="Layer 34" id="Layer_34"><path class="cls-1" d="M18,29a1,1,0,0,1-.57-.18l-10-7A1,1,0,0,1,7,21V11a1,1,0,0,1,.43-.82l10-7a1,1,0,0,1,1-.07A1,1,0,0,1,19,4V28a1,1,0,0,1-.54.89A1,1,0,0,1,18,29ZM9,20.48l8,5.6V5.92l-8,5.6Z"/><path class="cls-1" d="M8,22H4a3,3,0,0,1-3-3V13a3,3,0,0,1,3-3H8a1,1,0,0,1,1,1V21A1,1,0,0,1,8,22ZM4,12a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1H7V12Z"/><path class="cls-1" d="M18,21V19a3,3,0,0,0,2.12-5.12l1.42-1.42A5,5,0,0,1,18,21Z"/><path class="cls-1" d="M26.48,25.48a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42,11,11,0,0,0,0-15.54,1,1,0,1,1,1.42-1.42,13,13,0,0,1,0,18.38A1,1,0,0,1,26.48,25.48Z"/><path class="cls-1" d="M23.65,22.65a1,1,0,0,1-.7-.29A1,1,0,0,1,23,21a7,7,0,0,0,0-9.9,1,1,0,0,1,1.41-1.41,9,9,0,0,1,0,12.72A1,1,0,0,1,23.65,22.65Z"/></g></svg>`;
    } else {
      soundButtonEl.innerHTML = `<svg  width="24" height="24" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:#101820;}</style></defs><title/><g data-name="Layer 35" id="Layer_35"><path class="cls-1" d="M18,29a1,1,0,0,1-.57-.18l-10-7A1,1,0,0,1,7,21V11a1,1,0,0,1,.43-.82l10-7a1,1,0,0,1,1-.07A1,1,0,0,1,19,4V28a1,1,0,0,1-.54.89A1,1,0,0,1,18,29ZM9,20.48l8,5.6V5.92l-8,5.6Z"/><path class="cls-1" d="M8,22H4a3,3,0,0,1-3-3V13a3,3,0,0,1,3-3H8a1,1,0,0,1,1,1V21A1,1,0,0,1,8,22ZM4,12a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1H7V12Z"/><rect class="cls-1" height="12" transform="translate(-3.77 22.9) rotate(-45)" width="2" x="24.76" y="10"/><rect class="cls-1" height="2" transform="translate(-3.77 22.9) rotate(-45)" width="12" x="19.76" y="15"/></g></svg>`;
    }
  });
  buttonsFieldEl.appendChild(soundButtonEl);
  mainEl.appendChild(containerEl);
  body.appendChild(mainEl);
  const fieldUpCluesEl = document.querySelector(".field__up_clues");
  fieldUpCluesEl.appendChild(generateInnerTable(cluesTableUpObj, sample));
  const fieldDownCluesEl = document.querySelector(".field__down_clues");
  fieldDownCluesEl.appendChild(generateInnerTable(cluesTableLeftObj, sample));
  const fieldDownGameEl = document.querySelector(".field__down_game");
  fieldDownGameEl.appendChild(generateInnerTable(gameTableObj, sample));
  const bestResultsEl = document.createElement("div");
  bestResultsEl.className = "bestResults";
  const bestResultsTagEl = document.createElement("p");
  bestResultsTagEl.innerText = "Лучшие результаты";
  bestResultsTagEl.className = "bestResults__tag";
  bestResultsEl.appendChild(bestResultsTagEl);
  bestResultsEl.appendChild(generateResultTable());
  containerEl.appendChild(bestResultsEl);
  // ------------------------   генерация модального окна   ---------------------------
  const overlayEl = document.createElement("div");
  overlayEl.className = "overlay";
  containerEl.appendChild(overlayEl);
  const modalEl = document.createElement("div");
  modalEl.className = "modal";
  const modalMessageEl = document.createElement("p");
  modalMessageEl.className = "modal__message";
  modalMessageEl.innerText = "Поздравялем! Вы решили нонограмму!";
  const modalTimeEl = document.createElement("p");
  modalTimeEl.className = "modal__time";
  const modalButtonEl = document.createElement("button");
  modalButtonEl.className = "modal__button";
  modalButtonEl.innerText = "Начать заново";
  modalButtonEl.addEventListener("click", (event) => {
    handleModalButtonClick();
  });
  modalEl.appendChild(modalMessageEl);
  modalEl.appendChild(modalTimeEl);
  modalEl.appendChild(modalButtonEl);
  containerEl.appendChild(modalEl);
};

renderHTML();
