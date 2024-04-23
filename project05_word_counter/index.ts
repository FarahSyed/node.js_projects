#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';


const line = '='.repeat(10);
const circle = '●';

console.clear();
console.log(chalk.cyan.bold(`\n\t${circle} ${line} "Welcome to Word Counter" ${line} ${circle}\n`));

interface Sentence {
    sentence: string
}

const { sentence }: Sentence = await inquirer.prompt(
    {
        name: 'sentence',
        type: 'input',
        message: 'Enter a sentence',
        validate(input: string) {
            if (!input) {
                return 'Invalid Entry! Please enter something';
            }
            return true;
        },
    },
);

const words = sentence.replace(/\s+/g, ' ').trim().split(' ');
const wordsCount = words.length;

console.log(chalk.cyan.bold(`\tYour sentence includes ${wordsCount} ${wordsCount === 1 ? 'word' : 'words'}.`));