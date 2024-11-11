import {ComponentBase, createEl} from "../../../framework"
import {TodoService} from "../services/todoService.ts";
import {AppHomeComponent} from "./appHome.ts";

export class AppComponent extends ComponentBase {
    private readonly todoService: TodoService = new TodoService();

    constructor() {
        super("App");

        this.updateContent();

        // this.replaceContent([
        //     [createEl("div", "title-large", ["It's Alive!!!"]), []],
        // ])
    }

    public onUnMount() {
        super.onUnMount();
        this.todoService.detachTodoListener(this.componentId);
    }

    public updateContent() {
        this.replaceContent([
            [createEl("h1", {className: "title"}, ["todo app"]),[]],
            [new AppHomeComponent(this.todoService), []],
        ])
    }
}