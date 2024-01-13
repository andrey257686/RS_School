import data from "./words.js";

const body = document.querySelector(".body");
const mapSVG = new Map([
  [1, "head.svg"],
  [2, "body.svg"],
  [3, "hand-one.svg"],
  [4, "hand-two.svg"],
  [5, "leg-one.svg"],
  [6, "leg-two.svg"],
]);
let letters = [];
for (let i = 1040; i <= 1071; i++) {
  letters.push(String.fromCharCode(i));
}
letters.splice(6, 0, "Ё");
let bannedLetters = [];
let rightLetters = [];

const getRandowmWord = function () {
  return data[Math.floor(Math.random() * data.length)];
};
const randomData = getRandowmWord();
const word = randomData.word;
const hint = randomData.question;
console.log(word);
const wordLength = word.length;
let wrongTry = 0;

// ================================ ПРОВЕРКА БУКВЫ  =============================================

const checkLetter = function (buttonElem, letter) {
  const listLetterElem = document.querySelectorAll(".field__word_letter");
  const fieldGuessElem = document.querySelector(".field__guess");
  const gallowImg = document.querySelector(".gallows__img");
  const modal = document.querySelector(".modal");
  const modalResult = document.querySelector(".modal__result");
  const modalWord = document.querySelector(".modal__word");
  const overlay = document.querySelector(".overlay");
  buttonElem.disabled = true;
  bannedLetters.push(letter);
  if (word.toUpperCase().includes(letter)) {
    let index1 = word.toUpperCase().indexOf(letter);
    let indexArr = [];
    indexArr.push(index1);
    while (index1 !== -1) {
      index1 = word.toUpperCase().indexOf(letter, index1 + 1);
      indexArr.push(index1);
    }
    indexArr.pop();
    for (let i = 0; i < indexArr.length; i++) {
      listLetterElem[indexArr[i]].innerText = letter;
      listLetterElem[indexArr[i]].classList.add("right");
      rightLetters.push(letter);
    }
    if (rightLetters.length === wordLength) {
      modalResult.innerText = "Вы угадали слово!";
      modalWord.innerText = word.toUpperCase();
      modal.style.display = "flex";
      overlay.style.display = "block";
      document.removeEventListener("keydown", handleKeyboard);
    }
  } else {
    wrongTry = wrongTry + 1;
    gallowImg.src = `./img/${mapSVG.get(wrongTry)}`;
    fieldGuessElem.innerHTML = `Неправильные попытки: <b>${wrongTry} / 6</b>`;
    if (wrongTry === 6) {
      modalResult.innerText = "Вы не угадали слово :с";
      modalWord.innerText = word.toUpperCase();
      modal.style.display = "flex";
      overlay.style.display = "block";
      document.removeEventListener("keydown", handleKeyboard);
    }
  }
};

// ================================ РЕНДЕР HTML  =============================================

const createFieldWord = function () {
  const fieldWordElem = document.createElement("ul");
  fieldWordElem.className = "field__word";
  for (let i = 0; i < word.length; i++) {
    const wordLetter = document.createElement("li");
    wordLetter.className = "field__word_letter";
    fieldWordElem.appendChild(wordLetter);
  }
  return fieldWordElem;
};

const createKeyboard = function () {
  const keyboardField = document.createElement("div");
  keyboardField.className = "field__keyboard";
  const keyboardLine1 = document.createElement("div");
  keyboardLine1.className = "field__keyboard_line";
  const keyboardLine2 = document.createElement("div");
  keyboardLine2.className = "field__keyboard_line";
  const keyboardLine3 = document.createElement("div");
  keyboardLine3.className = "field__keyboard_line";

  for (let i = 0; i < letters.length; i++) {
    const buttonKey = document.createElement("button");
    buttonKey.innerText = letters[i];
    buttonKey.className = "field__keyboard_key";
    buttonKey.id = `key_${i}`;
    buttonKey.addEventListener("click", function (event) {
      checkLetter(event.target, letters[i]);
    });

    if (i >= 0 && i < 12) {
      keyboardLine1.appendChild(buttonKey);
    }
    if (i >= 12 && i < 24) {
      keyboardLine2.appendChild(buttonKey);
    }
    if (i >= 24) {
      keyboardLine3.appendChild(buttonKey);
    }
  }
  keyboardField.appendChild(keyboardLine1);
  keyboardField.appendChild(keyboardLine2);
  keyboardField.appendChild(keyboardLine3);
  return keyboardField;
};

const createField = function () {
  const fieldElem = document.createElement("section");
  fieldElem.className = "field";
  fieldElem.appendChild(createFieldWord());
  const fieldHintElem = document.createElement("p");
  fieldHintElem.className = "field__hint";
  fieldHintElem.innerHTML = `Подсказка: <b>${hint}</b>`;
  fieldElem.appendChild(fieldHintElem);
  const fieldGuessElem = document.createElement("p");
  fieldGuessElem.className = "field__guess";
  fieldGuessElem.innerHTML = `Неправильные попытки: <b>0 / 6</b>`;
  fieldElem.appendChild(fieldGuessElem);
  fieldElem.appendChild(createKeyboard());
  return fieldElem;
};

const createGallows = function () {
  const gallowsElem = document.createElement("section");
  gallowsElem.className = "gallows";
  const gallowsImg = document.createElement("img");
  gallowsImg.className = "gallows__img";
  gallowsImg.src = "./img/gallows.svg";
  gallowsImg.alt = "gallows";
  gallowsElem.appendChild(gallowsImg);
  return gallowsElem;
};

const createModal = function () {
  const modalElem = document.createElement("div");
  modalElem.className = "modal";
  const modalResultElem = document.createElement("p");
  modalResultElem.className = "modal__result";
  const modalWordElem = document.createElement("p");
  modalWordElem.className = "modal__word";
  const modalButtonElem = document.createElement("button");
  modalButtonElem.className = "modal__button";
  modalButtonElem.innerText = "Начать заново";
  modalButtonElem.addEventListener("click", () => {
    // body.innerHTML = "";
    // bannedLetters = [];
    // rightLetters = [];
    // wrongTry = 0;
    // renderHTML();
    location.reload();
  });
  modalElem.appendChild(modalResultElem);
  modalElem.appendChild(modalWordElem);
  modalElem.appendChild(modalButtonElem);
  return modalElem;
};

// ================================ СОБЫТИЯ КЛАВИТУРЫ  =========================================

const handleKeyboard = function (event) {
  const keyboardButton = event.key;
  const regexp = /[а-яёА-ЯЁ]/;
  if (regexp.test(keyboardButton)) {
    if (!bannedLetters.includes(keyboardButton.toUpperCase())) {
      const index = letters.indexOf(keyboardButton.toUpperCase());
      const buttonKeyElem = document.getElementById(`key_${index}`);
      checkLetter(buttonKeyElem, keyboardButton.toUpperCase());
    }
  } else {
    if (
      !(
        keyboardButton === "Shift" ||
        keyboardButton === "Control" ||
        keyboardButton === "Meta" ||
        keyboardButton === "Alt" ||
        keyboardButton === "CapsLock" ||
        keyboardButton === " "
      )
    ) {
      alert("Игра работает только на русском языке!");
    }
  }
};

const renderHTML = function () {
  // ----------------------------  header   -------------------------------
  const headerElem = document.createElement("header");
  headerElem.className = "header";
  const h1TitleElem = document.createElement("h1");
  h1TitleElem.className = "title";
  h1TitleElem.innerText = "HANGMAN GAME";
  headerElem.appendChild(h1TitleElem);
  // ----------------------------  main   -------------------------------
  const mainElem = document.createElement("main");
  mainElem.className = "main";
  const containerElem = document.createElement("div");
  containerElem.className = "container";
  containerElem.appendChild(createGallows());
  containerElem.appendChild(createField());
  mainElem.appendChild(containerElem);
  body.appendChild(headerElem);
  body.appendChild(mainElem);
  const overlayElem = document.createElement("div");
  overlayElem.className = "overlay";
  body.appendChild(overlayElem);
  body.appendChild(createModal());
  document.addEventListener("keydown", handleKeyboard);
};

renderHTML();
