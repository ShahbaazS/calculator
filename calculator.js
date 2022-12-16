function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    return operator(a, b);
}

function handleDisplay(e) {
    switch (e.target.textContent) {
        case '+':
            if (operator) evaluate();
            operator = add;
            addText(e.target.textContent);
            break;
        case '-':
            if (operator) evaluate();
            operator = subtract;
            addText(e.target.textContent);
            break;
        case '×':
            if (operator) evaluate();
            operator = multiply;
            addText(e.target.textContent);
            break;
        case '÷':
            if (operator) evaluate();
            operator = divide;
            addText(e.target.textContent);
            break;
        case '=':
            evaluate();
            break;
        case '.':
            if (!operator && !containsDecimal(a)) {
                a += e.target.textContent;
                addText(e.target.textContent);
            } else if (operator && !containsDecimal(b)) {
                b += e.target.textContent;
                addText(e.target.textContent);
            }
            break;
        case 'C':
            clear();
            break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
            !operator ? a += e.target.textContent : b += e.target.textContent;
            addText(e.target.textContent);
            break;
        default:
            return;
    }
}

function addText(text) {
    displayContent += text;
    display.textContent = displayContent;
}

function evaluate() {
    if (!operator) return;
    if (operator === divide && Number(b) === 0) {
        displayContent = 'undefined';
        display.textContent = displayContent;
        operator = null;
        a = '';
        b = '';
        displayContent = '';
        return;
    }
    displayContent = operate(operator, Number(a), Number(b));
    displayContent = Math.round(displayContent * 1000000) / 1000000;
    display.textContent = displayContent;
    operator = null;
    a = displayContent;
    b = '';
}

function clear() {
    displayContent = '';
    display.textContent = displayContent;
    operator = null;
    a = '';
    b = '';
}

function handleKeyboard(e) {
    switch (e.key) {
        case '+':
            if (operator) evaluate();
            operator = add;
            addText(e.key);
            break;
        case '-':
            if (operator) evaluate();
            operator = subtract;
            addText(e.key);
            break;
        case '*':
            if (operator) evaluate();
            operator = multiply;
            addText(e.key);
            break;
        case '/':
            if (operator) evaluate();
            operator = divide;
            addText(e.key);
            break;
        case 'Enter':
            evaluate();
            break;
        case '.':
            if (!operator && !containsDecimal(a)) {
                a += e.key;
                addText(e.key);
            } else if (operator && !containsDecimal(b)) {
                b += e.key;
                addText(e.key);
            }
            break;
        case 'c':
            clear();
            break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
            !operator ? a += e.key : b += e.key;
            addText(e.key);
            break;
        default:
            return;
    }
}

const containsDecimal = (number) => number.toString().includes('.') ? true : false;

const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");
let displayContent = '';
let operator = null;
let a = '';
let b = '';
let hasDecimal = false;
buttons.forEach((button) => button.addEventListener('click', handleDisplay));
document.addEventListener('keydown', handleKeyboard);