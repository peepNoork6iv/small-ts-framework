import {ComponentBase, createEl, createInputEl} from "../../../framework";
import {TodoService} from "../services/todoService.ts";

export class CreateTodoComponent extends ComponentBase {
    private readonly todoService: TodoService;

    constructor(todoService: TodoService) {
        super("CreateTodo");

        this.todoService = todoService;

        this.updateContent();

        //language=CSS
        this.injectStyle(`
            form {
                display: flex;
            }
        `);
    }

    public updateContent() {
        const createTodo = createEl<HTMLButtonElement>("button", {className: "button", attributes: {type: "submit"}}, ["Create"]);

        const form = createEl<HTMLFormElement>("form", {}, [
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
            [createEl("div", {className: "card"}, [
                createEl("div", {className: "title"}, ["New todo"]),
                form,
            ]), []],
        ])
    }
}