#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';


const line = '='.repeat(10);
const circle = '●';
console.clear();
console.log(chalk.cyan.bold(`\n\t ${circle} ${line} "Welcome to Currency Converter" ${line} ${circle}\n`));

// Define the structure for the currencies object and allow any string keys with number values
interface Currencies {
    [key: string]: number,
}

// Exchange rates against the base currency (USD)
const currencies: Currencies = {
    USD: 1,  // Base Currency
    EUR: .94,
    CHF: .91,
    GBP: .81,
    INR: 83.38,
    PKR: 278.54,
    JPY: 154.74,
    KRW: 1380.64,
    KWD: .31,
    BHD: .38,
};


let userAnswer = await inquirer.prompt([
    {
        name: 'amount',
        message: 'Enter the amount',
        type: 'input',
        validate(num) {
            num = +num;
            return isNaN(num) ? "Please enter a valid amount" : num <= 0 ? "Please enter a valid amount" : true;
        },
    },
    {
        name: 'from',
        message: 'Select  the currency you want to convert from',
        type: 'list',
        choices: Object.keys(currencies),
    },
    {
        name: 'to',
        message: 'Select the currency you want to convert to',
        type: 'list',
        choices: Object.keys(currencies),
    },
])


let amount = Number(userAnswer.amount);   // Amount entered by the user
let from = userAnswer.from as keyof Currencies;   // User's currency
let to = userAnswer.to as keyof Currencies;   // Currency user wants to convert to

let fromAmount = currencies[from];
let toAmount = currencies[to];
let baseAmount = amount / fromAmount;   // Amount converted to USD as base currency
let convertedAmount = baseAmount * toAmount;   // Amount converted to the selected currency


// Display the converted amounts with proper formatting
console.log(chalk.cyan.bold(`\n\t${!Number.isInteger(amount) ? amount.toFixed(2) : amount} ${from} = ${!Number.isInteger(convertedAmount) ? convertedAmount.toFixed(2) : convertedAmount} ${to}`));