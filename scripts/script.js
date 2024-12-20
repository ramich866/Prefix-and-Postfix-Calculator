const steps = document.querySelector(".steps");
const display = document.querySelector(".display");

// Initialized variables
let mode = "Prefix";  
const expression = display.value;

function clearDisplay() {
  display.value = "";
}

function addToDisplay(input) {
  if (display.value === "Invalid Expression") {
    clearDisplay();
  }
  display.value += input;
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
  let stack = [];
  expression = display.value.trim();
  let tokens = expression.split(' '); // Split by space

  showSteps(`<NEW EXPRESSION>  ${expression}`, []);

  //move from right to left
  for(let i = tokens.length - 1; i >= 0; i--){
    let token = tokens[i];

    //if number, push to stack
    if(!isNaN(token)) {
      stack.push(parseInt(token));  //parseInt to get multiple digit numbers
      showSteps(`Push ${token}`, stack);
    }
    else {
      // pop two operands from stack
      let A = stack.pop();
      let B = stack.pop();
      showSteps(`Pop ${A} & ${B} <--`, stack);

      //operations
      switch(token) {
          case '+':
            stack.push(A + B);
            showSteps(`Push ${A} + ${B} = ${A + B}`, stack);
            break;
          case '-':
            stack.push(A - B);
            showSteps(`Push ${A} - ${B} = ${A - B}`, stack);
            break;
          case '*':
            stack.push(A * B);
            showSteps(`Push ${A} * ${B} = ${A * B}`, stack);
            break;
          case '/':
            if (B == 0) {
              return result = "Division by zero error";;
            }
            stack.push(A / B);
            showSteps(`Push ${A} / ${B} = ${A / B}`, stack);
            break;
      }
    }
  }
  //pop the result, return it
  result = stack[stack.length - 1];
  return result;
}

// insert space between operators and operands
function evaluatePostfix(expression) {
  let stack = [];
  expression = display.value.trim();
  let tokens = expression.split(' '); // Split by space

  showSteps(`<NEW EXPRESSION>  ${expression}`, []);
  // move from left to right
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];

    // if number, push to stack
    if (!isNaN(token)) {
      stack.push(parseInt(token)); //parseInt to get multiple digit numbers
      showSteps(`Push ${token}`, stack);
    } else {
      // pop two operands
      let A = stack.pop();
      let B = stack.pop();
      showSteps(`Pop ${A} & ${B} <--`, stack);

      // operations
      switch (token) {
        case '+':
          stack.push(B + A);
          showSteps(`Push ${B} + ${A} = ${B + A}`, stack);
          break;
        case '-':
          stack.push(B - A);
          showSteps(`Push ${B} - ${A} = ${B - A}`, stack);
          break;
        case '*':
          stack.push(B * A);
          showSteps(`Push ${B} * ${A} = ${B * A}`, stack);
          break;
        case '/':
          if (A == 0) {
            alert("Division by zero error");
            return;
          }
          stack.push(B / A);
          showSteps(`Push ${B} / ${A} = ${B / A}`, stack);
          break;
      }
    } 
  }

  // pop result, then return it
  result = stack[stack.length - 1];
  return result;
}

function calculateResult() {

  // error handling for smooth ride
  if (display.value == "") {
    return;
  }
  if (display.value.length == 1 || display.value.length == 2) {
    return;
  }
  if (!display.value.match(/\d/)) {
    return;
  }
  if (display.value == 0) { 
    return;
  }

  //check mode
  if (mode == "Prefix") evaluatePrefix(expression);  
  else evaluatePostfix(expression);
    
  // error handling after evaluation
  if (result == undefined || result == NaN || result == Infinity) {
    result = "Invalid Expression";
    clearDisplay();
    clearSteps();
  } 
  // display then reset result
  display.value = result;
  result = null;
}

function showSteps(step , current_stack) {
  const step_char = document.createElement("p"); // create <p>
  step_char.innerText = `${step} --> [ ${current_stack.join(", ")} ]`;

  // add to container
  steps.appendChild(step_char);

  //scroll to the latest step
  steps.scrollTop = steps.scrollHeight;
}

// clear steps box
function clearSteps() {
  document.querySelector(".steps").textContent = "";
}

// click steps box to clear
steps.addEventListener('click', () => {
  clearSteps();
})