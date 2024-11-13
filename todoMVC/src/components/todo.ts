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
            
            .card {
                display: flex;
            }
            
            .todo-content {
                flex-grow: 1;
                font-size: var(--font-size-large);
            }
            
            .edit-form {
                display: flex;
                flex-direction: row;
                flex-grow: 1;
            }
            
            .form-text-input {
                flex-grow: 2;
            }
        `);
    }

    public onUnMount() {
        super.onUnMount();
        this.todoService.detachTodoListener(this.componentId);
    }

    public updateContent() {

        const deleteButton = createButton("🗑️", "button", () => this.todoService.removeTodo(this.todo.id));

        const markDoneButton = createButton("", "button", () => this.todoService.toggleDoneTodo(this.todo.id));

        const editSubmit = createEl<HTMLButtonElement>("button", {className: "button", attributes: {type: "submit"}}, ["Edit"]);

        const editInput = createInputEl("text", "todo", true, "form-text-input");
        editInput.value = this.todo.content;

        const editForm = createEl<HTMLFormElement>("form", {className: "edit-form"}, [
            editInput,
            editSubmit,
        ]);

        editForm.style.display = "none";

        const editTodo = () => {
            editForm.style.display = "flex";
            editButton.style.display = "none";
            todoContent.style.display = "none";
            deleteButton.style.display = "none";
            markDoneButton.style.display = "none";
        }

        const todoContent = createEl("div", {className: "todo-content"}, [this.todo.content]);


        editForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const data = new FormData(editForm);
            const todo = data.get("todo") as string;
            this.todoService.editTodo(this.todo.id, todo);
            this.updateContent();
        });

        const editButton = createButton("📝", "button", editTodo);

        const todo: HTMLElement =
            createEl("div", {className: "card", onDblClick: editTodo}, [
                markDoneButton,
                todoContent,
                deleteButton,
                editButton,
                editForm,
            ]);

        if (this.todo.isDone) {
            todo.classList.toggle("done-todo");
            todoContent.style.textDecoration = "line-through";
            markDoneButton.innerText = "X"
        }

        this.replaceContent([
            [todo, []],
        ]);
    }
}