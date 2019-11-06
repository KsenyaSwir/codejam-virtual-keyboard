class Keyboard {
    constructor(keySet, language) {

        this.isCapsLock = false;
        this.isShift = false;
        this.language = language;
        this.keys = keySet;
        this.controlKeys = [
            'Backspace',
            'Tab',
            'CapsLock',
            'Enter',
            'ShiftLeft',
            'ShiftRight',
            'ControlLeft',
            'ControlRight',
            'ContextMenu',
            'AltLeft',
            'AltRight',
        ];
    }

    keySet() {
        return this.keys;
    }


    checkControlKey(code) { /////////////////////////////
        return this.controlKeys.some((controlKey) => controlKey === code); // some проверяет на соответствие условия заданного в передаваемой функции

    }

    checkCapsLock() {
        return this.isCapsLock;
    }

    toggleCapsLock() {
        this.isCapsLock = !this.isCapsLock;
    }


    checkShift() {
        return this.isShift;
    }

    toggleShift() {
        this.isShift = !this.isShift;
    }

    checkLanguage() {
        return this.language;
    }

    toggleLanguage() {
        if (this.language === 'en') {
            this.language = 'ru';
        } else {
            this.language = 'en';
        }

        return this.language;
    }
    key(code) {
        if (!this.keys[code]) return null;
        return this.keys[code][this.language][this.isCapsLock || this.isShift ? 'upKey' : 'lowKey'];
    }

}