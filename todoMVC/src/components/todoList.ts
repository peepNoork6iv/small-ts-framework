import {ComponentBase, ContentNode, createEl} from "../../../framework";
import {TodoService} from "../services/todoService.ts";
import {TodoComponent} from "./todo.ts";
import {RoutingService} from "../services/routingService.ts";

export class TodoListComponent extends ComponentBase {
    private readonly todoService: TodoService;
    private readonly routingService: RoutingService;

    constructor(todoService: TodoService, routingService: RoutingService) {
        super("TodoList");

        this.todoService = todoService;
        this.routingService = routingService

        this.todoService.attachTodoListener(this.componentId, this.updateContent.bind(this));
        this.routingService.attachRouteListener(this.componentId, this.updateContent.bind(this));
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
            if (this.routingService.currentRoute.pathName === "/") {
                todoNodes.push([new TodoComponent(todo, this.todoService), []]);
            } else if (this.routingService.currentRoute.pathName === "/active" && !todo.isDone) {
                todoNodes.push([new TodoComponent(todo, this.todoService), []]);
            } else if (this.routingService.currentRoute.pathName === "/completed" && todo.isDone) {
                todoNodes.push([new TodoComponent(todo, this.todoService), []]);
            }
        }

        this.replaceContent([
            [createEl("div", {className: "todo-container"}), todoNodes],
        ])
    }
}