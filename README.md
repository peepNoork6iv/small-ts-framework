# Mini Framework

This is a small framework project written in TypeScript. It contains as well a small to do list application as an example application.

## Components

Create a new component by extending ComponentBase. Gives a good 

```typescript
import {ComponentBase} from "./framework";

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

## Create elements 

- __Create Element__ use createEl to create basic elements. Parameter tag id for HTML tag name. Optional parameter className takes i

```
createEl<T extends HTMLElement>(tag: string, className?: string, content?: (string | HTMLElement)[]): T
```