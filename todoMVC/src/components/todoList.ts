import {ComponentBase, ContentNode, createEl} from "../../../framework";
import {TodoService} from "../services/todoService.ts";
import {TodoComponent} from "./todo.ts";

export class TodoListComponent extends ComponentBase {
    private readonly todoService: TodoService;

    constructor(todoService: TodoService) {
        super("TodoList");

        this.todoService = todoService;

        this.todoService.attachTodoListener(this.componentId, this.updateContent.bind(this));
        this.updateContent();

        //language=CSS
        this.injectStyle(``);
    }

    public onUnMount() {
        super.onUnMount();
        this.todoService.detachTodoListener(this.componentId);
    }

    public updateContent() {
        const todoNodes: Array<ContentNode> = [];
        for (const todo of this.todoService.todos) {
            todoNodes.push([new TodoComponent(todo, this.todoService), []])
        }

        this.replaceContent([
            [createEl("div", {className: "todo-container"}), todoNodes],
        ])
    }
}