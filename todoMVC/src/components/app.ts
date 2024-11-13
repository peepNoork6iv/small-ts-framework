import {ComponentBase, createEl} from "../../../framework"
import {TodoService} from "../services/todoService.ts";
import {AppHomeComponent} from "./appHome.ts";
import {RoutingService} from "../services/routingService.ts";
import {AppHeaderComponent} from "./appHeader.ts";

export class AppComponent extends ComponentBase {
    private readonly todoService: TodoService = new TodoService();
    private readonly routingService: RoutingService = new RoutingService();

    constructor() {
        super("App");

        this.updateContent();

        // this.replaceContent([
        //     [createEl("div", "title-large", ["It's Alive!!!"]), []],
        // ])
    }

    public updateContent() {
        if (this.routingService.validPaths.includes(window.location.pathname)) {
            this.replaceContent([
                [new AppHeaderComponent(this.routingService), []],
                [new AppHomeComponent(this.todoService, this.routingService), []],
            ])
        } else {
            this.replaceContent([
                [new AppHeaderComponent(this.routingService), []],
                [createEl("div", {className: "title"}, [`You have reached ${window.location.pathname}. Unfortunately there is nothing here.`]) ,[
                    [createEl("a", {onClick: () => history.back()}, ["Go Back"]),[]],
                ]]
            ])
        }
    }
}