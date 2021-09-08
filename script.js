let number1;
let number2;
let operator;
let displayElement = document.querySelector('.display');
const error = 'Error';

window.onclick = function(e) {
  let element = e.target;
  switch (element.className) {
    case 'number':
      updateDisplay(element.outerText);
      updateNumber(element.outerText);
      break;
    case 'operator':
      updateDisplay(element.outerText);
      updateOperator(element.outerText);
      break;
    case 'evaluate':
      let result = operate(operator, number1, number2);
      clearDisplay();
      resetValues();
      updateDisplay(result);
      number1 = isNaN(result) ? undefined : result;
      result = undefined;
      break;
    case 'clear':
      clearDisplay();
      resetValues();
      break;
    case 'backspace':
      removeLastEntry(displayElement.innerHTML);
      break;
    case 'decimal':
      updateDecimal();
      break;          
    default: 
      console.log(`No action can be done on ${element}`);
  }

};

document.addEventListener('keydown', (e) => {
  let keyValue = e.key;
  if (keyValue.match(/^[0-9]/)) {
    updateDisplay(keyValue);
    updateNumber(keyValue);
  } else if (keyValue.match(/(\+|-|\*|\/)/)) {
    updateDisplay(keyValue);
    updateOperator(keyValue);
  } else if (keyValue === 'Enter') {
    let result = operate(operator, number1, number2);
    clearDisplay();
    resetValues();
    updateDisplay(result);
    number1 = isNaN(result) ? undefined : result;
    result = undefined;
  } else if (keyValue === 'Delete') {
    clearDisplay();
    resetValues();
  } else if (keyValue === 'Backspace') {
    removeLastEntry(displayElement.innerHTML);
  } else if (keyValue === '.') {
    updateDecimal();
  } else {
    console.log(`No action can be done on ${keyValue}`);
  }
});

function add(number1, number2) {
  return Number((Number(number1) + Number(number2)).toFixed(4)).toString();
}

function subtract(number1, number2) {
  return Number((number1 - number2).toFixed(4)).toString();
}

function multiply(number1, number2) {
  return Number((number1 * number2).toFixed(4)).toString();
}

function divide(number1, number2) {
  if (number2 == 0) {
    return error;
  }

  return Number((number1 / number2).toFixed(4)).toString();
}

function operate(operator, number1, number2) {
  if (operator === undefined || number1 === undefined || number2 === undefined) {
    return error;
  } else {
    switch (operator) {
      case '+': 
        return add(number1, number2);
        break;
      case '-':
        return subtract(number1, number2);
        break;
      case '*':
        return multiply(number1, number2);
        break;
      case '/':
        return divide(number1, number2);
        break;
      default:
        console.log('Operator not recognized...'); 
        return error; 
    }
  }
}

function clearDisplay() {
  displayElement.innerHTML = '';
}

function removeLastEntry() {
  let initialDisplay = displayElement.innerHTML;
  let newDisplay = initialDisplay.substring(0, initialDisplay.length - 1);
  clearDisplay();
  updateDisplay(newDisplay);
  if (operator === undefined) {
    number1 = newDisplay;
  } else if (number2 === undefined && operator !== undefined) {
    operator = undefined;
  } else {
    number2 = number2.substring(0, number2.length - 1);
  }
}

function resetValues() {
  number1 = undefined;
  number2 = undefined;
  operator = undefined;
}

function updateDecimal() {
  let decimal = '.';
  if (number1 === undefined) {
    number1 = decimal;
    updateDisplay(decimal);
  } else {
    if (operator === undefined && !number1.includes(decimal)) {
      number1 += decimal;
      updateDisplay(decimal)
    } else if (operator !== undefined && number2 === undefined) {
      number2 = decimal;
      updateDisplay(decimal);
    } else if (operator !== undefined && !number2.includes(decimal)) {
      number2 += decimal;
      updateDisplay(decimal);
    }
  } 
}

function updateDisplay(value) {
  displayElement.innerHTML += value;
}

function updateNumber(value) {
  if (number1 === undefined) {
    number1 = value;
  } else {
    if (operator === undefined) {
      number1 += value;
    } else {
      if (number2 === undefined) {
        number2 = value;
      } else {
        number2 += value;
      }
    }
  }
}

function updateOperator(value) {
  if (number1 !== undefined && operator === undefined) {
    operator = value;
  } else if (number1 !== undefined && number2 !== undefined && operator !== undefined) {
    let result = operate(operator, number1, number2);
    clearDisplay();
    resetValues();
    updateDisplay(result);
    number1 = result;
    result = undefined;
    operator = value;
    updateDisplay(value);
  } else if (value === '-' && number1 === undefined) {
    number1 = 0;
    operator = value;
    clearDisplay();
    updateDisplay(number1 + value);
  }
}
