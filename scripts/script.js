const display = document.querySelector(".display");
const steps = document.querySelector(".steps");

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
  expression = display.value.trim();
  let stack = [];

  showSteps(`<NEW EXPRESSION>  ${expression}`, []);

  for (let j = expression.length - 1; j >= 0; j--) {
    if (expression[j] == ' ') {
      continue;
    }

    if (!isNaN(expression[j])) {
      let num = '';
      while (j >= 0 && !isNaN(expression[j]) && expression[j] != ' ') {
        num = expression[j] + num;
        j--;
      }
      j++;
      stack.push(parseInt(num));
      showSteps(`Push ${num}`, stack);
    } else {
      if (stack.length < 2) {
        alert("Insufficient Operands");
        return ;
      }

      let A = stack.pop();
      let B = stack.pop();
      showSteps(`Pop ${A} & ${B} <--`, stack);

      switch (expression[j]) {
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
            alert("Division by zero error");
            return;
          }
          stack.push(A / B);
          showSteps(`Push ${A} / ${B} = ${A / B}`, stack);
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

  result = stack.pop();
  console.log("Final result:", result); // Debugging statement
  return result;
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