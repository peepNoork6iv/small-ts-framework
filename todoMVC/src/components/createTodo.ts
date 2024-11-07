import {ComponentBase, createEl, createInputEl} from "../../../framework";
import {TodoService} from "../services/todoService.ts";

export class CreateTodoComponent extends ComponentBase {
    private readonly todoService: TodoService;

    constructor(todoService: TodoService) {
        super("CreateTodo");

        this.todoService = todoService;

        this.updateContent();

        //language=CSS
        this.injectStyle(``);
    }

    public updateContent() {
        const createTodo = createEl<HTMLButtonElement>("button", "", ["Create ToDo"]);
        createTodo.type = "submit";

        const form = createEl<HTMLFormElement>("form", "", [
            createInputEl("text", "content", true, "form-text-input"),
            createTodo,
        ]);

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const data = new FormData(form);
            const content = data.get("content") as string;
            const creationSuccess = this.todoService.addTodo(content);
            if (creationSuccess) {
                this.updateContent();
            }
        });

        this.replaceContent([
            [createEl("div", "card", [
                createEl("div", "title", ["New todo"]),
                form,
            ]), []],
        ])
    }
}