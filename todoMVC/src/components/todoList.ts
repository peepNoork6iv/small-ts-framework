import {ComponentBase, ContentNode, createEl} from "../../../framework";
import {TodoService} from "../services/todoService.ts";

export class TodoListComponent extends ComponentBase {
    private readonly todoService: TodoService;

    constructor(todoService: TodoService) {
        super("TodoList");

        this.todoService = todoService;

        this.todoService.attachTodoListener(this.componentId, this.updateContent.bind(this));
        console.log(this.todoService.todos, "before update")
        this.updateContent();
        console.log(this.todoService.todos, "after update")

        //language=CSS
        this.injectStyle(``);
    }

    public onUnMount() {
        super.onUnMount();
        this.todoService.detachTodoListener(this.componentId);
    }

    public updateContent() {
        const data = this.todoService.todos;
        console.log("List component:",data)
        const todoNodes: Array<ContentNode> = [
            [createEl("div", "todo-list card", [
                createEl("ul", "",
                    data.map(item => createEl("li", "list-item", [item.content])),
                ),
            ]), []],
        ]


        this.replaceContent([
            [createEl("div", "todo-container"), todoNodes],
        ])
    }
}