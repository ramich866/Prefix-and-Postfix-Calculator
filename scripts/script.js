const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let stack = []
let mode = "Prefix"

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
  if (mode == "postfix") {
    mode = "prefix";
    document.querySelector(".display").placeholder = `MODE: ${mode}`;
  } else {
    mode = "postfix";
    document.querySelector(".display").placeholder = `MODE: ${mode}`;
  }
  }

function evaluatePrefix(expression) {
  expression = display.value
}

function evaluatePostfix(expression) {

}

function evaluate() {
  if (mode == "prefix") return evaluatePrefix
  else return evaluatePostfix;
}