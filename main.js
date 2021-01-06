
const numberButton = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const dataPreviousOperand = document.querySelector('[data-previous-operand]');
const dataCurrentOperand = document.querySelector('[data-current-operand]');





class Calculator {
  constructor(dataPreviousOperand, dataCurrentOperand) { // place display text for the calculator
    this.dataPreviousOperand = dataPreviousOperand;
    this.dataCurrentOperand = dataCurrentOperand;
    this.clearDisplay();
  }
  clearDisplay() { 
    this.currentOperand = ''; // set it default as ''
    this.previousOperand = ''; // set it default as ''
    this.operation = undefined; // no operation is choosen if the display is cleared
  }
  deleteDisplay() { // delete a single number
    this.currentOperand = this.currentOperand.toString().slice(0, -1); // convert the current number into string and remove a single character at the time from the last
  }
  // every time a number is pressed it will be appended on the screen
  addNumberToScreen(number) {
    // Check if the number has a period and allow just 1 period in the number.
    if (number === '.' && this.currentOperand.includes('.')) return; // stop the function from executing and not appending the number
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currentOperand === '') return; // if the currentOperand is empty the function won't execute
    if (this.previousOperand !== '') {
      this.calculate(); // calculate the pushed number
    }
    this.operation = operation; // set the operation we clicked on
    this.previousOperand = this.currentOperand;  //done typing the current number and pushing it to previousOperand
    this.currentOperand = ''; // clearing the currentOperand for the next input

  }
  calculate() {
    let calculation; // the result of the calculate function
    const previous = parseFloat(this.previousOperand); // converting the string to a number
    const current = parseFloat(this.currentOperand); // converting the string to a number
    if (isNaN(previous) || isNaN(current)) return // the function won't execute if the the 2 values are not numbers
    switch (this.operation) {
      case '+':
        calculation = previous + current;
        break;
      case '-':
        calculation = previous - current;
        break;
      case 'x':
        calculation = previous * current;
        break;
      case '/':
        calculation = previous / current;
        break;
      default:
        return; // there will be no calculation if noe of the cases match

    }
    this.currentOperand = calculation; //display the result at the bottom 
    this.operation = undefined;
    this.previousOperand = ''; // the upper display is cleared
  }

  getDisplayNumber(number) { // return the number to display value
    const stringNumber = number.toString(); // transform it to string so it can be splitted on the decimal characters inside of it 

    // parseFloat = parses a string and retuns a floating number
    // split = split a string into an array of substrings
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    }else {
      // toLocaleString = convert the numbers into a locale-specific number representation.
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      })
    }
    if (decimalDigits != null){
      return `${integerDisplay}.${decimalDigits}`;
    }else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.dataCurrentOperand.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {  // append the operation symbol to the upper display
      this.dataPreviousOperand.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    }else {
      this.dataPreviousOperand.innerText = '';
    } 
    
  }
}




const calculator = new Calculator(dataPreviousOperand, dataCurrentOperand);

// add event listener to buttons
numberButton.forEach(button => {
  button.addEventListener('click', () => {
    calculator.addNumberToScreen(button.innerText);
    calculator.updateDisplay();
  });
})
operationButton.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})
equalButton.addEventListener('click', button => {
  calculator.calculate();
  calculator.updateDisplay();

})
clearButton.addEventListener('click', button => {
  calculator.clearDisplay();
  calculator.updateDisplay();

})
deleteButton.addEventListener('click', button => {
  calculator.deleteDisplay();
  calculator.updateDisplay();

})
