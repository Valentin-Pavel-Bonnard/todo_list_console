"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoCollection_1 = require("./todoCollection");
const todoItem_1 = require("./todoItem");
const inquirer = require("inquirer");
let todo = [
    new todoItem_1.TodoItem(1, "Kiss Chloe"),
    new todoItem_1.TodoItem(2, 'Buy flowers')
];
let collection = new todoCollection_1.TodoCollection("Valentin", todo);
let showCompleted = true;
function displayTodoList() {
    console.log(`${collection.username}'s Todo List `
        + (`${collection.getItemCounts().incomplete} items to do`));
    collection.getTodoItems(showCompleted).forEach(item => item.printDetails());
}
var Commands;
(function (Commands) {
    Commands["Toggle"] = "Show/Hide Completed";
    Commands["Quit"] = "Quit";
})(Commands || (Commands = {}));
function prompUser() {
    console.clear();
    displayTodoList();
    inquirer.prompt({
        type: 'list',
        name: 'command',
        message: 'Choose options',
        choices: Object.values(Commands),
    }).then(answers => {
        switch (answers["command"]) {
            case Commands.Toggle:
                showCompleted = !showCompleted;
                prompUser();
                break;
        }
    });
}
prompUser();
