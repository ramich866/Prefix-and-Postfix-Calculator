const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

function addToDisplay(input) {
  display.value += input;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1)
}