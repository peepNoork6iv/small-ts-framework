# Mini Framework

This is a small framework project written in TypeScript. It contains as well a small to do list application as an example application.

## Import base component

```typescript
import {ComponentBase} from "./components";

export class NewComponent extends ComponentBase {
    constructor() {
        super("New");

        this.updateContent();

        //language=CSS
        this.injectStyle(``);
    }
    
    public updateContent() {
        this.replaceContent([
            
        ])
    }
}
```