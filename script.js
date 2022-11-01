const buttons = document.querySelectorAll(".button");
const buttonsArray = [...buttons];

let bigText = document.querySelector('#big-screen-text');
let smallText = document.querySelector('#small-screen-text');

let currentString = "";
let operator = "";
let num1;
let num2;
let operatorClickedBool = false;

buttonsArray.forEach(button => {
    if (button.classList.contains('number')) {
        button.addEventListener('click', numberClicked);
    } 
    
    else if (button.classList.contains('operator')) {
        button.addEventListener('click', operatorClicked);
    }

    else if (button.id === "equals") {
        button.addEventListener('click', equalsClicked);
    }
})
function numberClicked(e) {
    if (operatorClickedBool) {
        bigText.innerHTML = "";
    }
    currentString += e.target.innerHTML;
    bigText.innerHTML += e.target.innerHTML;
}

function operatorClicked(e) {
    if(operatorClickedBool === true) {
        equalsClicked();
    }
    
    num1 = Number(currentString);
    operator = e.target.innerHTML;
    smallText.innerHTML = (currentString + " " + operator + " ");
    currentString = "";
    operatorClickedBool = true;
}

function equalsClicked(e) {
    console.log('equals');
    num2 = Number(currentString);
    smallText.innerHTML += currentString;
    result = operate(operator, num1, num2);
    currentString = result;
    bigText.innerHTML = result;
    operatorClickedBool = false;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '−':
            return subtract(num1, num2);
        case '×':
            return multiply(num1, num2);
        case '÷':
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