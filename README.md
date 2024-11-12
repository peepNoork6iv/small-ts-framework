# Mini Framework

This is a small framework project written in TypeScript. It contains as well a small to do list application as an example application.

## Component Framework and Utility Functions

### Overview
This library provides foundational classes and functions for building and managing UI components with structured lifecycle events, DOM rendering, and customizable styles. Key features include:

- `ComponentBase` class: Base class for creating structured, reusable components.
- Utility functions: Simplify creation of HTML elements with flexible attributes and event handlers.

---

### `ComponentBase` Class

`ComponentBase` is an abstract class designed for creating reusable UI components with lifecycle management, unique identifiers, and scoped styling.

#### Key Properties

- `componentName: string` - Name of the component, useful for debugging.
- `componentId: number` - Unique identifier for each instance, auto-generated.
- `rootNode: [HTMLDivElement, Array<ContentNode>]` - Root container element paired with nested content nodes (ContentNode), enabling flexible, recursive layouts.

#### Methods

- `replaceContent(content: Array<ContentNode>): void`
Replaces current component content with new ContentNode items, enabling dynamic content updates.

- `mount(element: HTMLElement): void`
Mounts the component to a specified DOM element, replacing its children.

- `onUnMount(): void`
Cleanup method for unmounting, useful for overriding in extended components.

- `updateContent(): void`
Placeholder for custom content updates, to be implemented in derived classes.

- `injectStyle(style: string): void`
Injects component-specific CSS into the document head, scoped with data-component attributes.

#### Usage Example

```typescript
import {createEl} from "./components";

class MyComponent extends ComponentBase {
    constructor() {
        super("MyComponent");
        this.updateContent()
        //language=CSS
        this.injectStyle(`
            .hello {
                color: blue;
            }
        `);
        this.replaceContent([
            [createEl("div", {className: "hello"}, ["Hello, world!"]), []],
        ]);
    }

    public updateContent(): void {
        this.replaceContent([
            [createEl("div", {}, ["Updated content!"]), []],
        ]);
    }
}

// Usage
const component = new MyComponent();
component.mount(document.getElementById("app")!);
```

---

### Utility Functions for Dynamic Element Creation

These functions simplify DOM element creation with customizable attributes, classes, and event handlers.

#### Functions

1. `createEl<T extends HTMLElement>`
    Creates an HTML element with attributes, classes, event listeners, and content.

    ```typescript
    const div = createEl<HTMLDivElement>("div", {
        className: "container",
        attributes: { id: "main-container" }
    }, ["Hello, world!"]);
    ```

2. `createInputEl`
   Creates an `<input>` element with specified attributes and optional CSS class.

    ```typescript
    const input = createInputEl("text", "username", true, "form-input");
    ```

3. `createButton`
    Creates a `<button>` element with label, class, and click handler.

    ```typescript
    const button = createButton("Submit", "btn-primary", () => alert("Button clicked!"));
    ```

4. `createSelectOption`
    Creates an `<option>` element with specified value, label, and optional placeholder status.

    ```typescript
    const placeholderOption = createSelectOption("", "Select an option", true);
    ```

#### Types
- `ElOptions`

    - `className?: string` - CSS class name(s).
    - `attributes?: Attributes` - HTML attributes for the element.
    - `onClick?: () => void` - Click event handler.
    - `onKeyDown?: () => void` - Keydown event handler.

- `Attributes`

    - Flexible structure supporting common HTML attributes and custom ones via `[key: string]: any`.

- `ContentNode`

    - Represents a nested structure for component content.
    - Type: `[HTMLElement | ComponentBase, Array<ContentNode>]`
    - Supports both HTML elements and other components, enabling deeply nested layouts.

---
    
This structure provides a powerful, modular foundation for creating, managing, and updating UI components and DOM elements efficiently.
