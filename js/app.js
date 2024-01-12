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

const field = document.querySelector(".field");

field.appendChild(createKeyboard());
