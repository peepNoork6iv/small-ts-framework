import {ComponentBase, createEl} from "../../../framework/components.ts"

export class AppComponent extends ComponentBase {
    constructor() {
        super("App");

        this.replaceContent([
            [createEl("div", "title-large", ["It's Alive!!!"]), []]
        ])
    }
}