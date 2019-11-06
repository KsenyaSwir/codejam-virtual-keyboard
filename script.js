const startLanguage = localStorage.getItem('language') || 'en';

const jsKeyboard = new Keyboard(keysObject, startLanguage);

let htmlKeyboard = null;
let htmlKeys = null;
let textarea = null;


function initialize(keyboard) {
    document.body.insertAdjacentHTML('afterbegin', '<div id="wrapper" class="wrapper">' +
        '<label class="label" for="input">codejam-virtual-keyboard</label><textarea id="textarea" ' +
        'class="textarea" name="textarea" rows="3"></textarea><div class="keyboard"><div ' +
        'class="keyboard__row"></div><div class="keyboard__row"></div><div class="keyboard__row">' +
        '</div><div class="keyboard__row"></div><div class="keyboard__row"></div></div> </div>');

    htmlKeyboard = document.querySelector('.keyboard');
    textarea = document.querySelector('.textarea');

    const language = keyboard.checkLanguage();
    const rows = document.querySelectorAll('.keyboard__row');
    const keySet = keyboard.keySet();
    const keyboardKeysArray = Object.keys(keySet); // массив из собственных перечисляемых свойст переанного  объекта

    let rowNum = 0;

    keyboardKeysArray.forEach((key, index) => {
        if (index >= 0 && index <= 13) rowNum = 0;
        if (index >= 14 && index <= 27) rowNum = 1;
        if (index >= 28 && index <= 40) rowNum = 2;
        if (index >= 41 && index <= 52) rowNum = 3;
        if (index >= 53 && index <= 60) rowNum = 4;

        rows[rowNum].insertAdjacentHTML('beforeend',
            `<div class="keyboard__key ${key}">${keySet[key][language].lowKey}</div>`);
    });

    htmlKeys = document.querySelectorAll('.keyboard__key'); //получить все клавиши


}

initialize(jsKeyboard);

function fillKeyboard() {
    htmlKeys.forEach((htmlKey) => {
        const key = htmlKey;
        key.textContent = jsKeyboard.key();

    });
}

function toggleLanguage(event) {
    const { altKey, shiftKey } = event;
    if (altKey && shiftKey) {
        jsKeyboard.toggleLanguage();
        localStorage.setItem('language', language);

        fillKeyboard();

    }
}

function toggleCapsLock(htmlKey) {
    htmlKey.classList.addClass('active');

    jsKeyboard.toggleCapsLock();
}

function toggleShift(htmlKey) {
    htmlKey.classList.addClass('active');

    jsKeyboard.toggleShift();
}

function handlerMouse(event) {
    textarea.focus();
    let code;

    code = event.code;

    const htmlKey = htmlKeyboard.querySelector(`.${code}`);

    htmlKey.classList.add('active');

}

function handlerKey(event) {

    // const keySet = jsKeyboard.keySet(); //массив объeктов

    let code;

    textarea.focus();
    code = event.code;

    const htmlKey = htmlKeyboard.querySelector(`.${code}`);
    console.log(htmlKey);

    htmlKey.classList.add('active');
}

function press(event) {

    const { type } = event;
    let code = event.code;
    const htmlKey = htmlKeyboard.querySelector(`.${code}`);
    if (type.match(/key/)) {
        code = event.code;
    }
    if (type.match(/mouse/)) {

    }
    if (type.match(/CapsLock/)) {
        toggleCapsLock(htmlKey);
    }
    if (type.match(/Shift/)) {
        toggleCapsLock(htmlKey);
    }

}


document.addEventListener('keydown', toggleLanguage);
document.addEventListener('keydown', handlerKey);
document.addEventListener('keyup', handlerKey);
htmlKeyboard.addEventListener('mousedown', handlerKey);
htmlKeyboard.addEventListener('mouseup', handlerKey);