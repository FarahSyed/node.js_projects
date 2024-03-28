import inquirer from "inquirer";

let balance = 200000;
let pin = 1234;

let userPin = await inquirer.prompt({
    name: "pin",
    type: "number",
    message: "Please enter your pin",
});

if (userPin.pin === pin) {
    console.log("Proceeding to the next step");

    let operation = await inquirer.prompt({
        name: "action",
        type: "list",
        message: "Please select an operation",
        choices: ["Check Balance", "Withdraw"],
    });
    if (operation.action === "Check Balance") {
        console.log(`Your current balance is ${balance}`);
    } else if (operation.action === "Withdraw") {
        let withdraw = await inquirer.prompt({
            name: "options",
            type: "list",
            message: "Please select an amount",
            choices: ["1000", "2000", "5000", "10000", "Enter Amount"],
        });
        if (withdraw.options === "Enter Amount") {
            let userAmount = await inquirer.prompt({
                name: "amount",
                type: "number",
                message: "Please enter an amount"
            });
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