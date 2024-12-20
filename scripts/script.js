const steps = document.querySelector(".steps");
const display = document.querySelector(".display");

// Initialized variables
let mode = "Prefix";  
const expression = display.value;

function clearDisplay() {
  display.value = "";
}

function addToDisplay(input) {
  if (display.value === "Invalid Expression" || display.value === "Invalid: space not found") {
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

    // error handling for space
    if (token.match(/[+*/-]/) && token.length > 1) {
      clearSteps();
      return result = "Invalid: space not found";
    }

    //if number, push to stack
    if(!isNaN(token)) {
      stack.push(parseFloat(token));  //parseFloat to get multiple digit numbers
      showSteps(`Push ${token}`, stack);
    }
    else {
      // check if there are two operands in stack
      if (isFinite(stack[stack.length - 1]) && isFinite(stack[stack.length - 2])) {
        
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
          case '**':
            stack.push(A ** B);
            showSteps(`Push ${A} ** ${B} = ${A ** B}`, stack);
            break;
          case '/':
            if (B == 0) {
              return result = "Division by zero error";
            }
            stack.push(A / B);
            showSteps(`Push ${A} / ${B} = ${A / B}`, stack);
            break;
        }
      } 
      else {
        console.log(stack);
        return result = "Invalid Expression";
      }
    }
  }
  
  if (stack.length > 1) {
    return result = "Invalid Expression";
  }
  
  //pop the result, return it 
  result = stack[stack.length - 1];
  return result;
}

function evaluatePostfix(expression) {
  let stack = [];
  expression = display.value.trim();
  let tokens = expression.split(' '); // Split by space

  showSteps(`<NEW EXPRESSION>  ${expression}`, []);

  // move from left to right
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];

    // error handling for space
    if (token.match(/[+*/-]/) && token.length > 1) {
      clearSteps();
      return result = "Invalid: space not found";
    }

    // if number, push to stack
    if (!isNaN(token)) {
      stack.push(parseFloat(token)); //parseFloat to get multiple digit numbers
      showSteps(`Push ${token}`, stack);
    } 
    else {
      // check if there are two operands in stack
      if (isFinite(stack[stack.length - 1]) && isFinite(stack[stack.length - 2])) {

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
        case '**':
          stack.push(B ** A);
          showSteps(`Push ${B} ** ${A} = ${B ** A}`, stack);
          break;
        case '/':
          if (A == 0) {
            return result = "Division by zero error";
          }
          stack.push(B / A);
          showSteps(`Push ${B} / ${A} = ${B / A}`, stack);
          break;
      }
    } 
    else {
      console.log(stack);
      return result = "Invalid Expression";
    }
  }
}

  if (stack.length > 1) {
    return result = "Invalid Expression";
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
  if (!display.value.match(/\d/) && !display.value.match(/[+*/-]/)) {
    return;
  }

  //check mode
  if (mode == "Prefix") evaluatePrefix(expression);  
  else evaluatePostfix(expression);
    
  // error handling after evaluation
  if (result == undefined || result == NaN || result == "Invalid Expression" || result == "Invalid: space not found") {
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
steps.addEventListener('click', (clearSteps))
