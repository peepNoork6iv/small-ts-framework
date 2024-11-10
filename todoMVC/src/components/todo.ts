import {ComponentBase, createButton, createEl} from "../../../framework";
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
        this.injectStyle(`
            .done-todo {
                background-color: darkseagreen;
            }
        `);
    }

    public onUnMount() {
        super.onUnMount();
        this.todoService.detachTodoListener(this.componentId);
    }

    public updateContent() {
        const deleteButton = createButton("Remove", "button", () => this.todoService.removeTodo(this.todo.id));

        const markDoneButton = createButton("Mark Done", "button", () => this.todoService.toggleDoneTodo(this.todo.id));

        const todo: HTMLElement =
            createEl("div", "card", [
                this.todo.content,
                deleteButton,
                markDoneButton,
            ]);

        if (this.todo.isDone) {
            todo.classList.toggle("done-todo");
        }

        this.replaceContent([
            [todo, []],
        ]);
    }
}