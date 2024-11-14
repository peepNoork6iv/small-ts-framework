# Mini Framework

This is a small framework project written in TypeScript. It contains as well a small to do list application as an example application.

## How to run?

### Prerequisites:

- Node and NPM must be installed 

### Run example:

- `cd todoMVC` Locate into todoMCV directory in terminal.
- `npm install` Install Node Modules.
- `npm run dev` Startup dev server.

### Use framework:

- Copy `framework` directory into your project.
- Setup file structure according to example program.

## Component Framework, Router and Utility Functions

### Overview
This library provides foundational classes and functions for building and managing UI components with structured lifecycle events, DOM rendering, and customizable styles. Key features include:

- `ComponentBase` class: Base class for creating structured, reusable components.
- `RouterBase` class: Base class for handling client-side routing for single-page applications (SPA).
- Utility functions: Simplify creation of HTML elements with flexible attributes and event handlers.

---

## `ComponentBase` Class

`ComponentBase` is an abstract class designed for creating reusable UI components with lifecycle management, unique identifiers, and scoped styling.

### Key Properties

- `componentName: string` - Name of the component, useful for debugging.
- `componentId: number` - Unique identifier for each instance, auto-generated.
- `rootNode: [HTMLDivElement, Array<ContentNode>]` - Root container element paired with nested content nodes (ContentNode), enabling flexible, recursive layouts.

### Methods

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

### Usage Example

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

## `RouterBase` Class
The `RouterBase` class handles client-side routing for single-page applications (SPA). It allows for setting and tracking the current route, updating the browser's URL without a page reload, and notifying listeners when the route changes.

### Class Structure

#### Properties

- `_currentRoute: RouteModel` - The current route represented by a RouteModel object, defaulting to the root path ("/").
- `routeListeners: Map<number, (value: RouteModel) => void>` - A map of listeners for route changes, keyed by unique listener IDs.
- `validPaths: Array<string>` - A list of valid paths for the application, which can be used to define the routes the app should handle.

#### Constructor

- `constructor()` - Initializes the router instance without any parameters.

#### Methods

##### `currentRoute` (Getter / Setter)

- `get currentRoute(): RouteModel` - Retrieves the current route.
- `set currentRoute(value: RouteModel)` - Sets the current route and triggers all registered route listeners. Also updates the browser's URL using pushState.

##### `setRoute`

- `public setRoute(path: string): void`
    - Sets the new route by updating the `currentRoute` property.
    - Uses `window.history.pushState` to change the URL without a page reload.
    - __Parameters__:
      - `path: string` - The new path to set as the current route.

##### `handleLocation`

- `public handleLocation(): void`
    - Determines the current path from the browser's `window.location.pathname` and sets it as the active route using setRoute.
    - Useful for initializing the correct route on page load or when navigating using the browser's back/forward buttons.

##### `attachRouteListener`

- `public attachRouteListener(id: number, callback: (value: RouteModel) => void): void`
    - Registers a listener for route changes.
    - Parameters:
      - `id: number` - A unique identifier for the listener.
      - `callback: (value: RouteModel) => void` - A function that will be called when the route changes.

##### `detachRouteListener`

- `public detachRouteListener(id: number): void`
    - Removes a route change listener based on its unique identifier.

    - Parameters:
      - `id: number` - The unique identifier of the listener to be removed.

#### Usage Example
```typescript

const router = new RouterBase();

// Initialize route listener
router.attachRouteListener(1, (route) => {
console.log(`Route changed to: ${route.pathName}`);
});

// Change the route
router.setRoute("/about");

// Update the route based on current location (e.g., on page load)
router.handleLocation();
```

### Summary

The `RouterBase` class provides:

- Client-side navigation management without reloading the page.
- Methods to manipulate and listen to route changes.
- Simplified way to handle browser history and navigation events for SPAs.

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
