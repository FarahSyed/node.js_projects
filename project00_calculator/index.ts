#! /usr/bin/env node

import inquirer from 'inquirer';

// Initialize a variable and assign the following value:
const answer = await inquirer.prompt([
    {message: "Enter first number", type: "number", name: "firstOperand"},
    {message: "Enter second number", type: "number", name: "secondOperand"},
    {message: "Select an operator to perform calculation", type: "list", name: "operator", choices: ["Addition", "Subtraction", "Multiplication", "Division"]},
]);
// console.log(answer); // Will return an object of user given answers including their names and values

// Using conditional statement check selected operator then perform the calculation accordingly
if (answer.operator === "Addition") {
	// This statement will be considered as string and will perform concatenation
    // console.log("Your value is " + answer.firstOperand +  answer.secondOperand);   
    // In order to perform mathematical operation calculate the numbers separately
	console.log(answer.firstOperand +  answer.secondOperand);
} else if (answer.operator === "Subtraction") {
	console.log(answer.firstOperand -  answer.secondOperand);
} else if (answer.operator === "Multiplication") {
	console.log(answer.firstOperand *  answer.secondOperand);
} else if (answer.operator === "Division") {
	console.log(answer.firstOperand /  answer.secondOperand);
} else {
    // Show this message if none of the above operators were selected
    console.log("Please select a valid operator");
};