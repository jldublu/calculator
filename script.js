let number1;
let number2;
let operator;
let displayElement = document.querySelector('.display');

window.onclick = function(e) {
  let element = e.target;
  console.log(element.className);
  switch (element.className) {
    case 'number':
    case 'operator':
      updateDisplay(element.outerText);
      break;
    case 'evaluate':
      parseValuesFromDisplay(displayElement.value);
      let result = operate(operator, number1, number2);
      clearDisplay();
      resetValues();
      updateDisplay(result);
      number1 = result;
      result = undefined;
      break;
    case 'clear':
      clearDisplay();
      resetValues();
      break;
    case 'backspace':
      break;        
    default: 
      console.log(`No action can be done on ${element}`);
  }

};

function add(number1, number2) {
  return Number(number1) + Number(number2);
}

function subtract(number1, number2) {
  return number1 - number2;
}

function multiply(number1, number2) {
  return number1 * number2;
}

function divide(number1, number2) {
  return number1 / number2;
}

function operate(operator, number1, number2) {
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
  }

}

function clearDisplay() {
  displayElement.value = '';
}

function parseValuesFromDisplay(displayText) {
  let splitValue;
  if (displayText.includes('+')) {
    splitValue = '+';
  } else if (displayText.includes('-')) {
    splitValue = '-';
  } else if (displayText.includes('*')) {
    splitValue = '*';
  } else if (displayText.includes('/')) {
    splitValue = '/';
  } 

  if (splitValue) {
    operator = splitValue;
    let displayArray = displayText.split(splitValue);
    if (isNaN(displayArray[0])) {
      clearDisplay();
      updateDisplay('Error');
    } else {
      number1 = displayArray[0];
    }

    if (isNaN(displayArray[1])) {
      clearDisplay();
      updateDisplay('Error');
    } else {
      number2 = displayArray[1];
    }

  } else {
    clearDisplay();
    updateDisplay('Error');
  }
  
}

function resetValues() {
  number1 = undefined;
  number2 = undefined;
  operator = undefined;
}

function updateDisplay(value) {
  displayElement.value = displayElement.value + value;
}
