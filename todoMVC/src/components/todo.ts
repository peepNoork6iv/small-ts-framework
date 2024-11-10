import {ComponentBase, ContentNode, createEl} from "../../../framework";
import {TodoService} from "../services/todoService.ts";
import {TodoModel} from "../models/todoModel.ts";

export class TodoComponent extends ComponentBase {
    private readonly todoService: TodoService;
    private readonly todo: TodoModel;

    constructor(todo: TodoModel, todoService: TodoService) {
        super("Todo");

        this.todoService = todoService;
        this.todo = todo;

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
        const todo: ContentNode = [
            createEl("div", "card", [this.todo.content]),
            []];

        this.replaceContent([
           todo,
        ]);
    }
}