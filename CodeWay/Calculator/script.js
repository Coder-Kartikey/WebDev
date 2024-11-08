// Get DOM elements
const currentScreen = document.getElementById('currentOperationScreen');
const lastScreen = document.getElementById('lastOperationScreen');
const buttons = document.querySelectorAll('.number, .operator, .equal, .clear');

// Initialize calculator state
let currentInput = '';
let lastInput = '';
let operator = '';

// Add event listeners to buttons
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

function handleButtonClick(event) {
    const value = event.target.innerText;

    if (value === 'C') {
        clear();
    } else if (value === '=') {
        calculate();
    } else if (isOperator(value)) {
        setOperator(value);
    } else {
        appendNumber(value);
    }
}

function appendNumber(number) {
    currentInput += number;
    updateScreen();
}

function setOperator(op) {
    operator = op;
    lastInput = currentInput;
    currentInput = '';
    updateScreen();
}

function calculate() {
    const num1 = parseFloat(lastInput);
    const num2 = parseFloat(currentInput);

    if (operator === '+' ) {
        currentInput = (num1 + num2).toString();
    } else if (operator === '-') {
        currentInput = (num1 - num2).toString();
    } else if (operator === '*') {
        currentInput = (num1 * num2).toString();
    } else if (operator === '/') {
        currentInput = (num1 / num2).toString();
    }

    updateScreen();
}

function clear() {
    currentInput = '';
    lastInput = '';
    operator = '';
    updateScreen();
}

function updateScreen() {
    currentScreen.innerText = currentInput || '0';
    lastScreen.innerText = lastInput ? `${lastInput} ${operator}` : '';
}

function isOperator(value) {
    return value === '+' || value === '-' || value === '*' || value === '/';
}
