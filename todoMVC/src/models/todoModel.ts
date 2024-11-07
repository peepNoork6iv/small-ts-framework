export interface Todos {
    todos: Array<TodoModel>;
}

export interface TodoModel {
    id: number;
    content: string;
    isDone: boolean;
}