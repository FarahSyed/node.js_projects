#! /usr/bin/env node
import inquirer from 'inquirer';


const randomNumber = Math.floor(Math.random() * 10 + 1);

console.log("Welcome to number guessing game");

const answer = await inquirer.prompt([
    {
        name: "userGuessedNumber",
        type: "number",
        message: "Please guess a number from 1 to 10",
    },
]);

if (answer.userGuessedNumber < 1 || answer.userGuessedNumber > 10) {
    console.log(`It should be a number from 1 to 10`);
} else if (answer.userGuessedNumber === randomNumber) {
    console.log(`Congratulations! You guessed it right`);
} else {
    console.log(`Oh! You guessed it wrong`);
}