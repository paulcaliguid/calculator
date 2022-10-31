const buttons = document.querySelectorAll(".button");
const buttonsArray = [...buttons];

let bigText = document.querySelector('#big-screen-text');
let smallText = document.querySelector('#small-screen-text');

buttonsArray.forEach(button => {
    button.addEventListener('click',buttonClicked)
})

function buttonClicked(e) {
    bigText.innerHTML += e.target.innerHTML;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return "Error";
    }
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}