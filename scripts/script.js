const display = document.querySelector(".display");

let stack = [];
let mode = "Prefix";

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
  if (mode == "postfix") {
    mode = "prefix";
    document.querySelector(".display").placeholder = `MODE: ${mode}`;
  } else {
    mode = "postfix";
    document.querySelector(".display").placeholder = `MODE: ${mode}`;
  }
  }

function evaluatePrefix(expression) {
  expression = display.value;
  console.log(expression);
}

function evaluatePostfix(expression) {

}

function evaluate() {
  if (mode == "prefix") return evaluatePrefix(expression);
  else return evaluatePostfix(expression);
}