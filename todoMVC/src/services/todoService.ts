import {TodoModel} from "../models/todoModel.ts";
import {getUid} from "../../../framework/utils.ts";

export class TodoService {
    private _todos: Array<TodoModel> = []
    private todoListeners: Map<number, (value: Array<TodoModel>) => void> = new Map();

    public get todos(): Array<TodoModel> {
        return this._todos;
    }

    constructor() {
    }

    public addTodo(content: string): boolean {
        const obj: TodoModel = {id: getUid(), content: content, isDone: false};
        if (obj.content !== "") {
            this._todos.push(obj);
            return true;
        } else {
            console.log("todo not added");
            return false;
        }
    }

    public markDoneTodo(id: number) {
        for (let i = 0; i < this.todos.length; i++) {
            if (this.todos[i].id === id) {
                this.todos[i].isDone = true;
            }
        }
    }

    public editTodo(id: number, content: string){
        for (let i = 0; i < this.todos.length; i++) {
            if (this.todos[i].id === id) {
                this.todos[i].content = content;
            }
        }
    }

    public removeTodo(id: number){
        for (let i = 0; i < this.todos.length; i++) {
            if (this.todos[i].id === id) {
                this.todos.splice(i, 1);
            }
        }
    }

    public attachTodoListener(id: number, callback:(todos: Array<TodoModel>) => void): void {
        this.todoListeners.set(id, callback);
    }

    public detachTodoListener(id: number): void {
        this.todoListeners.delete(id);
    }
}