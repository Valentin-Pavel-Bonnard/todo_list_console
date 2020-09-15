import { TodoCollection } from "./todoCollection";
import { TodoItem } from "./todoItem";
import * as inquirer from 'inquirer';


let todo: TodoItem[] = [
    new TodoItem(1, "Kiss Chloe"),
    new TodoItem(2, 'Buy flowers')
];

let collection: TodoCollection = new TodoCollection("Valentin", todo);
let showCompleted: boolean = true;

function displayTodoList(): void {
    console.log(
        `${collection.username}'s Todo List ` 
        + ( `${collection.getItemCounts().incomplete } items to do`));

        collection.getTodoItems(showCompleted).forEach(item => item.printDetails());

       
}

enum Commands {
    Toggle = 'Show/Hide Completed',
    Quit = 'Quit'
}

function prompUser(): void {
    console.clear();
    displayTodoList();
    inquirer.prompt({
        type: 'list',
        name: 'command',
        message: 'Choose options',
        choices: Object.values(Commands),
        //badProperty: true
    }).then(answers => {
       switch(answers["command"]) {
           case Commands.Toggle: 
                showCompleted = !showCompleted;
                prompUser();
                break;
       }
    })
}

prompUser();