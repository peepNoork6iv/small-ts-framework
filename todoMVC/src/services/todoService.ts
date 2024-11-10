import {TodoModel} from "../models/todoModel.ts";
import {getUid} from "../../../framework";

export class TodoService {
    private _todos: Array<TodoModel> = []
    private todoListeners: Map<number, (value: Array<TodoModel>) => void> = new Map();

    public get todos(): Array<TodoModel> {
        return this._todos;
    }

    public set todos(todos: Array<TodoModel>) {
        this._todos = todos;
        this.todoListeners.forEach(listener => listener(todos));
    }

    constructor() {
    }

    public addTodo(content: string): boolean {
        const obj: TodoModel = {id: getUid(), content: content, isDone: false};
        if (obj.content !== "") {
            this.todos.push(obj);
            this.todos = this.todos;
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
                break;
            }
        }
        this.todos = this.todos;
    }

    public editTodo(id: number, content: string){
        for (let i = 0; i < this.todos.length; i++) {
            if (this.todos[i].id === id) {
                this.todos[i].content = content;
                break;
            }
        }
        this.todos = this.todos;
    }

    public removeTodo(id: number){
        for (let i = 0; i < this.todos.length; i++) {
            if (this.todos[i].id === id) {
                this.todos.splice(i, 1);
                break;
            }
        }
        this.todos = this.todos;
    }

    public attachTodoListener(id: number, callback:(todos: Array<TodoModel>) => void): void {
        this.todoListeners.set(id, callback);
    }

    public detachTodoListener(id: number): void {
        this.todoListeners.delete(id);
    }
}