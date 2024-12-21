
![Website img](https://github.com/ramich866/RGB-Prefix-and-Postfix-Calculator/blob/main/images/RGB-P-P-Calculator.png)

# RGB Prefix & Postfix Calculator

[![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/navendu-pottekkat/awesome-readme?include_prereleases)](https://img.shields.io/github/v/release/navendu-pottekkat/awesome-readme?include_prereleases)
[![GitHub last commit](https://img.shields.io/github/last-commit/navendu-pottekkat/awesome-readme)](https://img.shields.io/github/last-commit/navendu-pottekkat/awesome-readme)
[![GitHub issues](https://img.shields.io/github/issues-raw/navendu-pottekkat/awesome-readme)](https://img.shields.io/github/issues-raw/navendu-pottekkat/awesome-readme)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/navendu-pottekkat/awesome-readme)](https://img.shields.io/github/issues-pr/navendu-pottekkat/awesome-readme)

Usually, humans do their calculations using infix notations. (e.g: 60 + 10 - 1).  
While it's harder for humans to read Prefix and Postfix notations. It's efficient in stack-based evaluation.  

## How the calculator works ?  
### Steps For evaluating prefix expressions:
1 - Split expression by spaces ' ', and initialize empty stack.  
2 - Iterate moving from right to left. Starting from last token.  
3 - If token is a number, push it to stack.  
4 - If token is an operator, pop two elements from the stack. Do operations, then push the result to stack.  
5 - Continue iterations until no tokens left.  
6 - Pop last element in stack, which is the final result.  

# Usage

Brief explanation included in the website.  
User should know how to use Prefix and Postfix notations.  
Or he/she can have fun with the rgb :)

While using the calculator, please make sure to separate the expression with **space** for optimal experience.  

e.g.:    
 **Correct form :**  + 9 * 30 8  
**Wrong form :** +9*30 8  



# Installation
[(Back to top)](#table-of-contents)

No Installation required.

