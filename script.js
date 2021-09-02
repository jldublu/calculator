window.onclick = function(e) {
  let element = e.target;
  console.log(element.className);
  switch (element.className) {
    case 'number':
    case 'operator':
      updateUserInput(element.outerText);
      break;
    case 'evaluate':
      break;
    case 'clear':
      break;
    case 'backspace':
      break;        
    default: 
      console.log(`No action can be done on ${element}`);
  }
};

function add(number1, number2) {
  return number1 + number2;
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

function updateUserInput(value) {
  let element = document.querySelector('.user-input');
  let currentInput = element.value;
  document.querySelector('.user-input').value = currentInput + value;
  let attributes = document.querySelector('.user-input').attributes;
}