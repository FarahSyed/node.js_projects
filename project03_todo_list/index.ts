#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';

let todos: string[] = [];
let condition = true;
const line = '━'.repeat(9);
const circle = '●';

console.clear();
console.log(`\n\t${chalk.cyan.bold(`●●●●●   ●●●     ●●●●    ●●●     ●     ●   ●●● ●●●●●`)}
          ${chalk.cyan(`●    ●   ●    ●   ●  ●   ●    ●     ●  ●      ●`)}
          ${chalk.blue.bold(`●    ●   ●    ●   ●  ●   ●    ●     ●     ●   ●`)}
          ${chalk.blue(`●     ●●●     ●●●●    ●●●     ●●●●● ●  ●●●    ●`)}`);
console.log(chalk.cyan.bold(`\n\t ${circle} ${line} "Welcome to Todo List App" ${line} ${circle}\n`));


while(condition) {
    const { action } = await inquirer.prompt(
        {
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add a new todo",
                "Show todo list",
                "Update a todo",
                "Delete a todo",
                "Delete all todos",
                "Exit",
            ],
        }
    );

    switch (action) {
        case "Add a new todo":
            const addTodo = await inquirer.prompt([
                {
                    name: "newTodo",
                    type: "input",
                    message: "Enter todo",
                    validate(input: string) {
                        return input ? todos.includes(input) ? chalk.red("Duplicate Entry!") : true : chalk.red("Invalid Entry!");
                    },
                },
            ]);
            
            todos.unshift(addTodo.newTodo);
            console.log(`  ${chalk.cyan.bold(`"${addTodo.newTodo}"`)} Added successfully!`);
            
            break;
    
        case "Show todo list":
            if (todos.length === 0) {
                console.log(chalk.yellowBright.bold("\n  You've nothing to do!\n"));
            } else {
                console.log(chalk.cyan.bold("\n  Here's your Todo List:\n"));
                for (const todo of todos) {
                    console.log(`   ${circle} ${todo}`);
                };
                console.log(``);
            }
            break;

        case "Update a todo":
            if (todos.length === 0) {
                console.log(chalk.yellowBright.bold("\n  You've nothing to do!\n"));
            } else {
                const updateTodo = await inquirer.prompt([
                    {
                        name: "select",
                        type: "list",
                        message: "Select the one you want to update",
                        choices: todos,
                    },
                    {
                        name: "update",
                        type: "input",
                        message: "Enter the updated todo",
                        validate(input: string) {
                            return input ? todos.includes(input) ? chalk.red("Duplicate Entry!") : true : chalk.red("Invalid Entry!");
                        },
                    },
                ]);

                const index = todos.indexOf(updateTodo.select);
                todos[index] = updateTodo.update;
                console.log(`  ${chalk.cyan.bold(`"${updateTodo.update}"`)} Updated successfully!`);
            }
            break;
    
        case "Delete a todo":
            if (todos.length === 0) {
                console.log(chalk.yellowBright.bold("\n  You've nothing to do!\n"));
            } else {
                const deleteTodo = await inquirer.prompt(
                    {
                        name: "select",
                        type: "list",
                        message: "Select the one you want to delete",
                        choices: todos,
                    },
                );

                const indexOf = todos.indexOf(deleteTodo.select);
                todos.splice(indexOf, 1);
                console.log(`  ${chalk.gray(`${deleteTodo.select}`)} Deleted successfully!`);
            }

            break;
    
        case "Delete all todos":
            if (todos.length === 0) {
                console.log(chalk.yellowBright.bold("\n  Your list is already empty!\n"));
            } else {
                const { deleteAll } = await inquirer.prompt({
                    name: "deleteAll",
                    type: "confirm",
                    message: "Are you sure you want to delete all todos",
                    default: false,
                });

                if (deleteAll) {
                    todos = [];
                    console.log(chalk.gray("  Deleted all Todos! You've nothing to do"));
                };
            }
            break;
    
        case "Exit":
            condition = false;
            break;
    }   
}