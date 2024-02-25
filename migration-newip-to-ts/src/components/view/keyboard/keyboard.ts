import './keyboard.css';

class Keyboard {
    draw(): void {
        const letters: string[] = [];
        for (let i = 0; i < 26; i++) {
            letters.push(String.fromCharCode(i + 65));
        }
        const keyboardField = document.querySelector('.keyboard') as HTMLDivElement;
        keyboardField.innerHTML = '';
        const buttonKey = document.createElement('button');
        buttonKey.className = 'keyboard__key';
        buttonKey.id = 'key_all';
        buttonKey.innerText = 'ALL';
        keyboardField.appendChild(buttonKey);

        for (let i = 0; i < letters.length; i++) {
            const buttonKey = document.createElement('button');
            buttonKey.innerText = letters[i];
            buttonKey.className = 'keyboard__key';
            buttonKey.id = `key_${i}`;
            // buttonKey.addEventListener('click', function (event) {
            //     event.preventDefault();
            // });
            keyboardField.appendChild(buttonKey);
        }
    }
}

export default Keyboard;
