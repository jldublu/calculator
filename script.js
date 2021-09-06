let number1;
let number2;
let operator;
let displayElement = document.querySelector('.display');

window.onclick = function(e) {
  let element = e.target;
  console.log(element.className);
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
  displayElement.innerHTML = '';
}

function resetValues() {
  number1 = undefined;
  number2 = undefined;
  operator = undefined;
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
  }
}
