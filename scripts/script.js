const display = document.querySelector(".display");
const steps = document.querySelector(".steps");

let stack = [];

let mode = "Prefix";
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
  showSteps(`<NEW EXPRESSION>  ${expression}`, []);

  // skip if character is space
  for (let i = expression.length - 1; i >= 0; i--) {
    if (e == ' ') continue; 
    
    // check if digit
    if (e >= '0' && e <= '9') { 

      // for multiple integers
      let number = 0; 
      let j = i;  // keep i value in j for later

      // identify substring traversing backwards
      while (i < expression.length && e >= '0' && e <= '9') {
        i--;
      } 
      i++;

      // shift value of number to the left 
      // and - 0 to get numeric value
      for (let v = i; v <= j; v++) {
        number = number * 10 + (expression[v] - '0'); 
        }   

      stack.push(number); 
      showSteps(`Push ${number}`, stack);
    } 
    else { // found operator ==> pop two elements
        let A = stack[stack.length - 1];
        stack.pop();
        let B = stack[stack.length - 1];
        stack.pop();
        showSteps(`Pop ${A} & ${B} <--`, stack);

        switch (e) { // calculate operations  
          case "+": stack.push(A + B);
          showSteps(`Push ${A} + ${B} = ${A + B}`, stack); 
            break;
          case "-": stack.push(A - B);
          showSteps(`Push ${A} - ${B} = ${A - B}`, stack);
            break;
          case "*": stack.push(A * B); 
          showSteps(`Push ${A} * ${B} = ${A * B}`, stack);
            break;
          case "/": if (B == 0) {   // division by zero
            alert("Don't divide by zero");
            return;
          }
            stack.push(A / B);
              showSteps(`Push ${A} / ${B} = ${A / B}`, stack);
                break;
      }
    }
  }
  return stack[stack.length - 1];
}


function evaluatePostfix(expression) {
  expression = display.value.trim();
  let stack = [];
  let tokens = expression.split(/\s+/); // Split by whitespace

  showSteps(`<NEW EXPRESSION>  ${expression}`, []);

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];

  
    if (!isNaN(token)) {
      stack.push(parseInt(token));
      showSteps(`Push ${token}`, stack);
    } else {
      if (stack.length < 2) {
        alert("Insufficient Operands");
        return ;
      }

      let A = stack.pop();
      let B = stack.pop();
      showSteps(`Pop ${A} & ${B} <--`, stack);

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
        default:
          alert("Invalid character in expression");
          return;
      }
    }
  }

  if (stack.length != 1) {
    alert("Invalid expression: too many operands");
    return;
  }
  
  result = stack[stack.length - 1];
  
  return result;
}

function calculateResult() {
  
  if (mode == "Prefix") evaluatePrefix(expression);  //check mode
  else evaluatePostfix(expression);

    clearDisplay(); // clear the expression
    console.log(result);
    display.value = result; // print answer to display
    result = null;   // reset result
}

function showSteps(step , current_stack) {
  const step_char = document.createElement("p"); // create <p>
  step_char.innerText = `${step} --> [ ${current_stack.join(", ")} ]`;

  // add to container
  steps.appendChild(step_char);

  //scroll to the latest step
  steps.scrollTop = steps.scrollHeight;
}

function clearSteps() {
  document.querySelector(".steps").textContent = "";
}

steps.addEventListener('click', () => {
  clearSteps();
})