const display = document.querySelector(".display");

let stack = [];

let mode = "prefix";
const expression = display.value;

function addToDisplay(input) {
  display.value += input;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1) 
}

function changeMode() {
  clearDisplay();
  if (mode == "Postfix") {
    mode = "Prefix";
  } else {
    mode = "Postfix";
  }
  document.querySelector(".display").placeholder = `MODE: ${mode}`;
}

function evaluatePrefix(expression) {
  expression = display.value;
  
  if (expression.length > 1 && !expression.includes(" ")) {
    expression = "yolo"
    console.log(expression)
  return clearDisplay();
}

  for (let i = expression.length - 1; i >= 0; i--) {
    if (expression[i] == ' ') continue; // skip if character is space
    
    if (expression[i] >= '0' && expression[i] <= '9') {
      let number = 0;
      let j = i;

      while (i < expression.length && expression[i] >= '0' && expression[i] <= '9') {
        i--;
      } 
      i++;

      for (let v = i; v <= j; v++) {
        number = number * 10 + (expression[v] - '0');
        }
      stack.push(number); 
    } 
    else { // found operator ==> pop two elements
        let A = stack[stack.length - 1];
        stack.pop();
        let B = stack[stack.length - 1];
        stack.pop();

        switch (expression[i]) { // calculate operations  
          case "+": stack.push(A + B);
          break;
          case "-": stack.push(A - B);
          break;
          case "*": stack.push(A * B);
          break;
          case "/": stack.push(A / B);
          break;
      }
    }
  }
  console.log(stack);
  console.log(expression);
  return stack[stack.length - 1];
}

//not finished
function evaluatePostfix(expression) {
  expression = display.value;
}

function calculateResult() {
  if (mode == "prefix") evaluatePrefix(expression);
  else evaluatePostfix(expression);
  clearDisplay();
  display.value = stack;
  stack = [];
}