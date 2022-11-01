const buttons = document.querySelectorAll(".button");
const buttonsArray = [...buttons];

let bigText = document.querySelector('#big-screen-text');
let smallText = document.querySelector('#small-screen-text');

let currentString = "";
let operator = "";
let num1 = null;
let num2 = null;
let operatorClickedBool = false;
let editing = true;
let keyClicked = "";

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

    else if (button.id === "delete") {
        button.addEventListener('click', deleteClicked);
    }

    else if (button.id === "dot") {
        button.addEventListener('click', dotClicked);
    }
})

function numberClicked(e, keyboardChar = null) {
    let toAdd;
    if (currentString === "" || !editing) {
        currentString = "";
        bigText.innerHTML = "";
    }
    if(keyboardChar) {
        toAdd = keyboardChar;
    } else {
        toAdd = e.target.innerHTML
    }
    editing = true;
    currentString += toAdd;
    bigText.innerHTML += toAdd;
}

function operatorClicked(e, keyboardChar = null) {
    editing = false;
    let toAdd;
    if(keyboardChar) {
        toAdd = keyboardChar;
    } else {
        toAdd = e.target.innerHTML
    }

    if(operatorClickedBool === true) {
        equalsClicked();
    }

    if(currentString) {
        num1 = Number(currentString);
    } else {
        return;
    }
    operator = toAdd;
    smallText.innerHTML = (num1 + " " + operator + " ");
    currentString = "";
    operatorClickedBool = true;
}

function equalsClicked(e) {
    if(!operatorClickedBool) {
        return;
    }

    if (currentString === "") {Clear

        num2 = null;
    } else {
        num2 = Number(currentString);
    }

    if (!isNumber(num1) || !isNumber(num2) || !operator) {
        currentString = "";
        return;
    }

    smallText.innerHTML += currentString;
    result = operate(operator, num1, num2);
    currentString = result;
    bigText.innerHTML = result;
    editing = false;
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
    editing = true;
}

function deleteClicked(e) {     
    if(editing && currentString !== ""){
        bigText.innerHTML = bigText.innerHTML.slice(0,-1);
        currentString = currentString.slice(0,-1);
    }

    else if(operatorClickedBool && currentString === "") {
        smallText.innerHTML = smallText.innerHTML.slice(0,-2);
        operatorClickedBool = false;
    }
}

document.addEventListener('keydown', (event) => {
    var code = event.code;
    if (code === 'Digit0' || code === 'Numpad0') {
        numberClicked(event, '0');
    } else if (code === 'Digit1' || code === 'Numpad1') {
        numberClicked(event, '1');
    } else if (code === 'Digit2' || code === 'Numpad2') {
        numberClicked(event, '2');
    } else if (code === 'Digit3' || code === 'Numpad3') {
        numberClicked(event, '3');
    } else if (code === 'Digit4' || code === 'Numpad4') {
        numberClicked(event, '4');
    } else if (code === 'Digit5' || code === 'Numpad5') {
        numberClicked(event, '5');
    } else if (code === 'Digit6' || code === 'Numpad6') {
        numberClicked(event, '6');
    } else if (code === 'Digit7' || code === 'Numpad7') {
        numberClicked(event, '7');
    } else if (code === 'Digit8' || code === 'Numpad8') {
        numberClicked(event, '8');
    } else if (code === 'Digit9' || code === 'Numpad9') {
        numberClicked(event, '9');
    } else if (code === 'NumpadAdd') {
        operatorClicked(event, '+');
    } else if (code === 'NumpadSubtract') {
        operatorClicked(event, '−');
    } else if (code === 'NumpadMultiply') {
        operatorClicked(event, '×');
    } else if (code === 'NumpadDivide') {
        operatorClicked(event, '÷');
    } else if (code === 'NumpadEnter' || code === 'Enter') {
        equalsClicked(event);
    } else if (code === 'NumpadDecimal') {
        dotClicked(event);
    } else if (code === 'Backspace') {
        deleteClicked(event);
    } 
    
  }, false);

function dotClicked(e) {
    if (currentString.includes(".")) {
        return;
    }
    if(!currentString) {
        currentString += "0.";
        bigText.innerHTML += "0.";
    } else {
        bigText.innerHTML += ".";
        currentString += ".";
    }
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
            if (num2 === 0) {
                return "Error";
            }
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