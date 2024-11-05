import {ComponentBase, createEl} from "../../../framework"

export class AppComponent extends ComponentBase {
    constructor() {
        super("App");

        this.replaceContent([
            [createEl("div", "title-large", ["It's Alive!!!"]), []]
        ])
    }
}