import { TodoItem } from "./todoItem";

type ItemCounts = {
  total: number;
  incomplete: number;
};

export class TodoCollection {
  private next_id: number = 1;
  private item_map = new Map<number, TodoItem>();

  constructor(public username: string, public todoItems: TodoItem[] = []) {
    todoItems.forEach((item) => this.item_map.set(item.id, item));
  }

  addTodo(task: string): number {
    while (this.getTodoById(this.next_id)) {
      this.next_id++;
    }

    this.item_map.set(this.next_id, new TodoItem(this.next_id, task));
    return this.next_id;
  }

  getTodoById(id: number): TodoItem {
    return this.item_map.get(id);
  }

  getTodoItems(includeComplete: boolean): TodoItem[] {
    return [...this.item_map.values()].filter(
      (item) => includeComplete || !item.complete
    );
  }

  markComplete(id: number, complete: boolean) {
    const todo_item = this.getTodoById(id);
    if (todo_item) todo_item.complete = complete;
  }

  removeComplete() {
    this.item_map.forEach((item) => {
      if (item.complete) this.item_map.delete(item.id);
    });
  }

  getItemCounts(): ItemCounts {
    return {
      total: this.item_map.size,
      incomplete: this.getTodoItems(false).length,
    };
  }
}
