"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoItem_1 = require("./todoItem");
class TodoCollection {
    constructor(username, todoItems = []) {
        this.username = username;
        this.todoItems = todoItems;
        this.next_id = 1;
        this.item_map = new Map();
        todoItems.forEach((item) => this.item_map.set(item.id, item));
    }
    addTodo(task) {
        while (this.getTodoById(this.next_id)) {
            this.next_id++;
        }
        this.item_map.set(this.next_id, new todoItem_1.TodoItem(this.next_id, task));
        return this.next_id;
    }
    getTodoById(id) {
        return this.item_map.get(id);
    }
    getTodoItems(includeComplete) {
        return [...this.item_map.values()].filter((item) => includeComplete || !item.complete);
    }
    markComplete(id, complete) {
        const todo_item = this.getTodoById(id);
        if (todo_item)
            todo_item.complete = complete;
    }
    removeComplete() {
        this.item_map.forEach((item) => {
            if (item.complete)
                this.item_map.delete(item.id);
        });
    }
    getItemCounts() {
        return {
            total: this.item_map.size,
            incomplete: this.getTodoItems(false).length,
        };
    }
}
exports.TodoCollection = TodoCollection;
