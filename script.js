const buttons = document.querySelectorAll('.button');
const buttonsArray = [...buttons];

let bigText = document.querySelector('#big-screen-text');
let smallText = document.querySelector('#small-screen-text');

let currentString = '';
let operator = '';
let num1 = null;
let num2 = null;
let operatorClickedBool = false;
let editing = true;

const symbolFor = { '+': '+', '-': '−', '*': '×', '/': '÷' };

// Limits and formatting helpers
const MAX_INPUT_LEN = 32;
const MAX_DIGITS = 15;
const MAX_DECIMALS = 12;

function trimZeros(str) {
  if (str.includes('.')) {
    str = str.replace(/\.0+$/, '').replace(/(\.[0-9]*?)0+$/, '$1');
    if (str.endsWith('.')) str = str.slice(0, -1);
  }
  return str;
}

function formatNumber(n) {
  if (n === 'Error') return 'Error';
  const num = Number(n);
  if (!isFinite(num)) return 'Error';
  const abs = Math.abs(num);
  const intLen = Math.trunc(abs).toString().length;
  if (intLen > MAX_DIGITS || (abs !== 0 && (abs >= 1e12 || abs < 1e-9))) {
    return num.toExponential(6);
  }
  const allowed = Math.min(MAX_DECIMALS, Math.max(0, MAX_DIGITS - intLen - 1));
  return trimZeros(num.toFixed(allowed));
}

function updateDisplaySize() {
  try {
    const t = bigText.innerHTML || '';
    const len = String(t).length;
    bigText.classList.remove('size-medium', 'size-small', 'size-xsmall');
    if (len > 24) bigText.classList.add('size-xsmall');
    else if (len > 18) bigText.classList.add('size-small');
    else if (len > 12) bigText.classList.add('size-medium');
  } catch {}
}

buttonsArray.forEach((button) => {
  if (button.classList.contains('number')) {
    button.addEventListener('click', numberClicked);
  } else if (button.classList.contains('operator')) {
    button.addEventListener('click', operatorClicked);
  } else if (button.id === 'equals') {
    button.addEventListener('click', equalsClicked);
  } else if (button.id === 'clear') {
    button.addEventListener('click', clearClicked);
  } else if (button.id === 'delete') {
    button.addEventListener('click', deleteClicked);
  } else if (button.id === 'dot') {
    button.addEventListener('click', dotClicked);
  }
});

function numberClicked(e, keyboardChar = null) {
  let toAdd;
  if (currentString === '' || !editing) {
    currentString = '';
    bigText.innerHTML = '';
    updateDisplaySize();
  }
  if (keyboardChar) {
    toAdd = keyboardChar;
  } else {
    toAdd = e.target.innerHTML;
  }
  if (currentString.length >= MAX_INPUT_LEN) return;
  editing = true;
  currentString += toAdd;
  bigText.innerHTML += toAdd;
  updateDisplaySize();
}

function operatorClicked(e, keyboardChar = null) {
  editing = false;
  let opValue;
  if (keyboardChar) {
    opValue = keyboardChar;
  } else {
    opValue = e.currentTarget.dataset.op || e.currentTarget.innerText.trim();
    if (opValue === '×') opValue = '*';
    if (opValue === '÷') opValue = '/';
    if (opValue === '−') opValue = '-';
  }

  if (operatorClickedBool === true) {
    equalsClicked();
  }

  if (currentString) {
    num1 = Number(currentString);
  } else {
    return;
  }
  operator = opValue;
  smallText.innerHTML = formatNumber(num1) + ' ' + (symbolFor[operator] || operator) + ' ';
  currentString = '';
  operatorClickedBool = true;
}

function equalsClicked(e) {
  if (!operatorClickedBool) {
    return;
  }

  if (currentString === '') {
    num2 = null;
  } else {
    num2 = Number(currentString);
  }

  if (!isNumber(num1) || !isNumber(num2) || !operator) {
    currentString = '';
    return;
  }

  smallText.innerHTML += currentString;
  let result = operate(operator, num1, num2);
  if (result === 'Error') {
    bigText.innerHTML = 'Error';
    currentString = '';
  } else {
    const display = formatNumber(result);
    currentString = display;
    bigText.innerHTML = display;
    updateDisplaySize();
  }
  editing = false;
  operatorClickedBool = false;
  operator = '';
}

function clearClicked(e) {
  bigText.innerHTML = '';
  smallText.innerHTML = '';
  currentString = '';
  operator = '';
  num1 = null;
  num2 = null;
  operatorClickedBool = false;
  editing = true;
  updateDisplaySize();
}

function deleteClicked(e) {
  if (editing && currentString !== '') {
    bigText.innerHTML = bigText.innerHTML.slice(0, -1);
    currentString = currentString.slice(0, -1);
    updateDisplaySize();
  } else if (operatorClickedBool && currentString === '') {
    // remove trailing space, symbol, space
    smallText.innerHTML = smallText.innerHTML.slice(0, -3);
    operatorClickedBool = false;
  }
}

document.addEventListener(
  'keydown',
  (event) => {
    const code = event.code;
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
      operatorClicked(event, '-');
    } else if (code === 'NumpadMultiply') {
      operatorClicked(event, '*');
    } else if (code === 'NumpadDivide') {
      operatorClicked(event, '/');
    } else if (code === 'NumpadEnter' || code === 'Enter') {
      equalsClicked(event);
    } else if (code === 'NumpadDecimal') {
      dotClicked(event);
    } else if (code === 'Backspace') {
      deleteClicked(event);
    }
  },
  false
);

function dotClicked(e) {
  if (currentString.includes('.')) {
    return;
  }
  if (!currentString) {
    currentString += '0.';
    bigText.innerHTML += '0.';
  } else {
    if (currentString.length >= MAX_INPUT_LEN) return;
    bigText.innerHTML += '.';
    currentString += '.';
  }
  updateDisplaySize();
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
      if (num2 === 0) {
        return 'Error';
      }
      return divide(num1, num2);
    default:
      return 'Error';
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

function isNumber(n) {
  return Number(n) === n;
}
