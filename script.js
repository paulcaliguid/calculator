const buttons = document.querySelectorAll(".button");
const buttonsArray = [...buttons];

let bigText = document.querySelector('#big-screen-text');
let smallText = document.querySelector('#small-screen-text');

let currentString = "";
let operator = "";
let num1 = null;
let num2 = null;
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

    else if (button.id === "clear") {
        button.addEventListener('click', clearClicked);
    }
})

function numberClicked(e) {
    if (currentString === "") {
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
    num2 = Number(currentString);
    if (!isNumber(num1) || !isNumber(num2) || num2 === 0 || !operator) {
        currentString = "";
        return;
    }

    smallText.innerHTML += currentString;
    result = operate(operator, num1, num2);
    currentString = result;
    bigText.innerHTML = result;
    operatorClickedBool = false;
    operator = "";
}

function clearClicked(e) {
    bigText.innerHTML = "";
    smallText.innerHTML = "";
    currentString = "";
    operator = "";
    num1 = null;
    num2 = null;
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

function isNumber(n){
    return Number(n) === n;
}