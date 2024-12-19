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
    alert("Invalid Format") // check error
  return ;
}
  // skip if character is space
  for (let i = expression.length - 1; i >= 0; i--) {
    if (expression[i] == ' ') continue; 
    
    //check if digit
    if (expression[i] >= '0' && expression[i] <= '9') { 

      //for multiple integers
      let number = 0; 
      let j = i; //keep i value in j for later

      // identify substring traversing backwards
      while (i < expression.length && expression[i] >= '0' && expression[i] <= '9') {
        i--;
      } 
      i++;

      // shift value of number to the left 
      // and - 0 to get numeric value
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
          case "+": stack.push(A + B); break;
          case "-": stack.push(A - B); break;
          case "*": stack.push(A * B); break;
          case "/": if (B == 0) {   // division by zero
            alert("Don't divide by zero");
            return;
          }
            stack.push(A / B); break;
      }
    }
  }
  return stack[stack.length - 1];
}

//working on it
function evaluatePostfix(expression) {
  expression = display.value;
}

function calculateResult() {
  if (mode == "prefix") evaluatePrefix(expression);  //check mode
  else evaluatePostfix(expression);
  clearDisplay();   // clear the expression
  display.value = stack; // print answer
  stack = [];   // empty the stack
}