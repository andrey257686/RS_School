const word = "солнце";
const hint = "Звезда, освещающая Землю и обеспечивающая тепло.";
const container = document.querySelector(".container");
const mapSVG = new Map([
  [1, "head.svg"],
  [2, "body.svg"],
  [3, "hand-one.svg"],
  [4, "hand-two.svg"],
  [5, "leg-one.svg"],
  [6, "leg-two.svg"],
]);

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

const checkLetter = function (buttonElem, letter) {
  const listLetterElem = document.querySelectorAll(".field__word_letter");
  if (word.toUpperCase().includes(letter)) {
    buttonElem.disabled = true;
    let index = word.toUpperCase().indexOf(letter);
    listLetterElem[index].innerText = letter;
  } else {
    wrongTry = wrongTry + 1;
    fieldGuessElem.innerHTML = `Неправильные попытки: <b>${wrongTry} / 6</b>`;
    console.log(mapSVG.get(wrongTry));
    gallowImg.src = `./img/${mapSVG.get(wrongTry)}`;
  }
};

const createKeyboard = function () {
  let letters = [];
  for (let i = 1040; i <= 1071; i++) {
    letters.push(String.fromCharCode(i));
  }
  letters.splice(6, 0, "Ё");
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
  console.log(keyboardField);
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
  fieldGuessElem.innerHTML = `Неправильные попытки: <b>0 / ${word.length}</b>`;
  fieldElem.appendChild(fieldGuessElem);
  fieldElem.appendChild(createKeyboard());
  return fieldElem;
};

container.appendChild(createField());

let wrongTry = 0;
const fieldGuessElem = document.querySelector(".field__guess");
const gallowImg = document.querySelector(".gallows__img");
