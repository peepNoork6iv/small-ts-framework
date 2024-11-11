# Mini Framework

This is a small framework project written in TypeScript. It contains as well a small to do list application as an example application.

## Creating Components with `ComponentBase` Class
> The ComponentBase abstract class provides a foundational structure for creating reusable UI components with lifecycle management, unique identifiers, DOM rendering, and style injection. Components extending this class can be easily mounted, unmounted, updated, and styled.

### Class Structure

#### Properties

- `componentName: string` - The name of the component, used for debugging and identification.
- `componentId: number` - A unique identifier for the component, generated at instantiation.
- `rootNode: [HTMLDivElement, Array<ContentNode>]` - A tuple where:
  - The first element is a `div` element that serves as the root node of the component in the DOM.
  - The second element is an array containing ContentNode items, representing the content of the component.

#### Constructor

```typescript
  protected constructor(componentName: string)
```  
- `componentName: string` - The name of the component.
- Initializes the component with a unique componentId and a root div element.
- Sets data attributes (data-component and data-component-id) on the root element for debugging purposes.

#### Methods

`replaceContent`

```typescript
  protected replaceContent(content: Array<ContentNode>): void
```

Replaces the current content of the component with a new set of ContentNode items.

- `content: Array<ContentNode>` - The new content to replace the current component’s content.
- Invokes `nodeCallOnUnMount` for any cleanup needed before content replacement.
- Calls `renderNode` to render the new content nodes in the `rootNode`.

`mount`

```typescript
public mount(element: HTMLElement): void
```

Mounts the component’s rendered output to a specified HTML element in the DOM.

- `element: HTMLElement` - The HTML element where the component will be mounted.
- Replaces all children of the target element with the component’s root node (`rootNode`).
- Logs a message to the console for debugging.

`render`

```typescript
public render(): HTMLElement
```

Returns the root HTML element of the component for rendering.

- Calls `renderNode` on `rootNode` to ensure all content nodes are rendered.
- __Returns__ - The root HTML element of the component.

`onUnMount`

```typescript
public onUnMount(): void
```

Invoked when the component is unmounted, allowing for cleanup or additional unmounting logic.

- Logs an "UNMOUNTED" message to the console, useful for debugging and tracking component lifecycle.

`updateContent`

```typescript
public updateContent(): void
```
A placeholder method for updating the component’s content. Override this method in child classes to provide custom update logic.

`injectStyle`

```typescript
protected injectStyle(style: string): void
```
Injects component-specific styles into the document head, scoped to the component using the `data-component` attribute.

- `style: string` - CSS style string to apply specifically to this component.
- Ensures each component’s style is injected only once by tracking injected styles in the `injectedStyles` set.

### Usage Example
> To use ComponentBase, create a new component class that extends it. Implement custom rendering, updating, or style-injection as needed.

```typescript
class MyComponent extends ComponentBase {
    constructor() {
        super("MyComponent");
        this.replaceContent([document.createTextNode("Hello, world!")]);
        this.injectStyle("color: blue;");
    }

    public updateContent(): void {
        // Custom update logic, e.g., modifying the content nodes
        this.replaceContent([document.createTextNode("Updated content!")]);
    }
}

// Usage
const component = new MyComponent();
component.mount(document.getElementById("app")!);
```

In this example:

- A new component `MyComponent` is created, which sets some initial content and injects a scoped style.
- The mount method mounts `MyComponent` to an HTML element with the ID `app`.

### Summary

The `ComponentBase` class provides a structure for:

- Managing component lifecycle events (mounting, updating, unmounting).
- Rendering and dynamically updating DOM content.
- Adding scoped CSS styles for each component.
- Generating unique IDs for each component instance for debugging and element targeting.

By extending `ComponentBase`, you can quickly create structured, reusable components with lifecycle and style management capabilities.

## Dynamic Element Creation

These utility functions simplify the creation of HTML elements with customizable attributes, classes, event handlers, and content. They are designed for a more streamlined approach to DOM manipulation in JavaScript and TypeScript projects.

### Functions
#### 1. `createEl<T extends HTMLElement>`
   > Creates an HTML element of any specified type with optional attributes, classes, event handlers, and child content.

__Parameters__:

- `tag: string` - The HTML tag name for the element (e.g., "div", "button", "input").
- `elOptions?: ElOptions` - Optional configuration object for attributes, event listeners, and CSS classes.
  - `className?: string` - CSS class name(s) to add to the element.
  - `attributes?: Attributes` - HTML attributes for the element (e.g., id, type, name, etc.).
  - `onClick?: () => void` - Optional click event handler.
  - `onKeyDown?: () => void` - Optional keydown event handler.
- `content?: (string | HTMLElement)[]` - Optional array of strings or elements to add as children.

__Returns__:
- `T` - The created HTML element with the specified type.
  Example Usage:
  ```typescript
  const div = createEl<HTMLDivElement>("div", {
    className: "container",
    attributes: { id: "main-container" }
  }, ["Hello, world!"]);
  ```
#### 2. `createInputEl`

   > Creates an `<input>` element with specified attributes and optional class.

__Parameters__:

- `type: string` - The type of input (e.g., "text", "password", "email").
- `name: string` - The name attribute of the input.
- `required: boolean (default: false)` - Whether the input is required.
- `className?: string` - Optional CSS class name(s).

__Returns__:

- `HTMLInputElement` - The created `<input>` element.

__Example Usage__:

```typescript
const input = createInputEl("text", "username", true, "form-input");
```

#### 3. `createButton`

   > Creates a `<button>` element with specified label, class, and click event handler.

__Parameters__:

- `label: string` - The text content for the button.
- `className: string` - CSS class name(s) to add to the button.
- `onClick: () => void` - The click event handler for the button.

__Returns__:

- `HTMLButtonElement` - The created `<button>` element.

__Example Usage__:
```typescript
const button = createButton("Submit", "btn-primary", () => alert("Button clicked!"));
```

#### 4. `createSelectOption`

> Creates an `<option>` element with a specified value, label, and optional `initial` state (for disabled and selected options).

__Parameters__:

- `value: string` - The value attribute of the option.
- `label: string` - The text content for the option.
- `initial?: boolean` - If true, sets the option as disabled and selected (useful for placeholder options).

__Returns__:

- `HTMLOptionElement` - The created <option> element.

__Example Usage__:

```typescript
const placeholderOption = createSelectOption("", "Select an option", true);
```

## Types

`ElOptions`

- `className?: string` - CSS class name(s).
- `attributes?: Attributes` - HTML attributes for the element.
- `onClick?: () => void` - Click event handler.
- `onKeyDown?: () => void` - Keydown event handler.

`Attributes`
- Flexible attribute structure based on common HTML attributes and event handlers. Includes [key: string]: any for custom attributes.

`ContentNode`

- Represents a nested structure for component content, enabling complex layouts.
- Type: `[HTMLElement | ComponentBase, Array<ContentNode>]`
  - __First element__: Either an `HTMLElement` or a `ComponentBase` instance.
  - __Second element__: An array of `ContentNode` items, allowing recursive nesting.
  
This structure allows components to contain both HTML elements and other components, supporting deeply nested content.
