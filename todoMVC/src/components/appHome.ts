import {ComponentBase, createEl} from "../../../framework";
import {TodoService} from "../services/todoService.ts";
import {ContentNode} from "../../../framework";
import {CreateTodoComponent} from "./createTodo.ts";
import {TodoListComponent} from "./todoList.ts";
import {RoutingService} from "../services/routingService.ts";

export class AppHomeComponent extends ComponentBase {
    private readonly todoService: TodoService;
    private readonly routingService: RoutingService;

    constructor(todoService: TodoService, routingService: RoutingService) {
        super("AppHome");

        this.todoService = todoService;
        this.routingService = routingService;

        this.updateContent();

        //language=CSS
        this.injectStyle(`
        
        `);
    }

    public updateContent() {
        const content: Array<ContentNode> = [
            [new CreateTodoComponent(this.todoService), []],
            [new TodoListComponent(this.todoService, this.routingService), []],
        ];

        this.replaceContent([
            [createEl("div", {className: "container container-narrow"}), content],
        ])
    }
}