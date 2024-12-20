function evaluatePrefix {
  let stack = [];
  expression = display.value.trim();
  let tokens = expression.split(' '); // Split by space

  showSteps(`<NEW EXPRESSION>  ${expression}`, []);

  //move from right to left
  for(let i = tokens.length - 1; i >= 0; i--){
    let token = tokens[i];

    //if number, push to stack
    if(!isNaN(token)) {
      stack.push(parseInt(token));  //parseint to get multiple digit numbers
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
              alert("Division by zero error");
              return;
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