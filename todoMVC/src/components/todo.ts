import {ComponentBase, createButton, createEl, createInputEl} from "../../../framework";
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

        const editSubmit = createEl<HTMLButtonElement>("button", "button", ["Edit todo"]);
        editSubmit.type = "submit";

        const editInput = createInputEl("text", "todo", true, "form-text-input");
        editInput.value = this.todo.content;

        const editForm = createEl<HTMLFormElement>("form", "", [
            createEl("label", "form-label", [
                "Edit Todo",
                editInput,
            ]),
            editSubmit,
        ]);

        editForm.style.display = "none";

        editForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const data = new FormData(editForm);
            const todo = data.get("todo") as string;
            this.todoService.editTodo(this.todo.id, todo);
            this.updateContent();
        });

        const editButton = createButton("Edit", "button", () => editForm.style.display = "block");

        const todo: HTMLElement =
            createEl("div", "card", [
                this.todo.content,
                deleteButton,
                markDoneButton,
                editButton,
                editForm,
            ]);

        if (this.todo.isDone) {
            todo.classList.toggle("done-todo");
        }

        this.replaceContent([
            [todo, []],
        ]);
    }
}