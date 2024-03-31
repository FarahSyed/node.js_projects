#! /usr/bin/env node
import inquirer from "inquirer";

// Initial account balance
let balance = 20000;
let pin = 1234;    // Actual Pin

// User given pin
let userPin = await inquirer.prompt({
    name: "pin",
    type: "number",
    message: "Please enter your pin",
});

// Check if the user given pin is strictly equals to the actual pin
if (userPin.pin === pin) {
    console.log("Proceeding to the next step");

    // Give the user some options
    let operation = await inquirer.prompt({
        name: "action",
        type: "list",
        message: "Please select an operation",
        choices: ["Check Balance", "Withdraw"],
    });
    
    // Check user selected operation to perform the operation accordingly
    if (operation.action === "Check Balance") {
        console.log(`Your current balance is ${balance}`);
    } else if (operation.action === "Withdraw") {
        // If user selected withdraw give some more options
        let withdraw = await inquirer.prompt({
            name: "options",
            type: "list",
            message: "Please select an amount",
            choices: ["1000", "2000", "5000", "10000", "Enter Amount"],
        });
        // Check user selected options to deduct the amount accordingly
        if (withdraw.options === "Enter Amount") {
            let userAmount = await inquirer.prompt({
                name: "amount",
                type: "number",
                message: "Please enter an amount"
            });
            // If the user enters more amount than their balance OR less than or equal to 0 show message
            if (userAmount.amount > balance || userAmount.amount <= 0) {
                console.log(`You have insufficient balance`);
            } else {
                balance -= userAmount.amount;
                console.log(`${userAmount.amount} has been withdrawn from your account. Your current balance is ${balance}`);
            }
        } else {
            balance -= withdraw.options;
            console.log(`${withdraw.options} has been withdrawn from your account. Your current balance is ${balance}`);
        }
    }
} else {
    console.log("You've entered a wrong pin.");
}