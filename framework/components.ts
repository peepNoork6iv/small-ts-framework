import {getUid} from "./utils";
import {ElOptions} from "./models.ts";

export type ContentNode = [HTMLElement | ComponentBase, Array<ContentNode>];

const injectedStyles = new Set<string>();

function renderNode(node: ContentNode): HTMLElement {
    const [nodeParent, nodeChildren] = node;
    const el: HTMLElement = nodeParent instanceof HTMLElement ? nodeParent : nodeParent.render();
    for (const child of nodeChildren) {
        el.appendChild(renderNode(child));
    }
    return el;
}

function nodeCallOnUnMount(node: ContentNode): void {
    const [nodeParent, nodeChildren] = node;
    for (const child of nodeChildren) {
        nodeCallOnUnMount(child);
    }
    if (nodeParent instanceof HTMLElement) return;
    nodeCallOnUnMount(nodeParent.rootNode);
    nodeParent.onUnMount();
}

export abstract class ComponentBase {
    protected readonly componentName: string;
    protected readonly componentId: number;
    public readonly rootNode: [HTMLDivElement, Array<ContentNode>];

    protected constructor(componentName: string) {
        this.componentName = componentName;
        this.componentId = getUid();

        const el = document.createElement("div");
        this.rootNode = [el, []];
        el.setAttribute("data-component", this.componentName);
        el.setAttribute("data-component-id", `${this.componentId}`);

        console.debug(`CREATED ${this.componentName} (${this.componentId})`);
    }

    protected replaceContent(content: Array<ContentNode>): void {
        nodeCallOnUnMount(this.rootNode);
        this.rootNode[1] = content;
        this.rootNode[0].replaceChildren(...content.map(renderNode));
    }

    public mount(element: HTMLElement): void {
        element.replaceChildren(this.render());
        console.debug(`MOUNTED ${this.componentName} (${this.componentId}) to`, element);
    }

    public render(): HTMLElement {
        return renderNode(this.rootNode);
    }

    public onUnMount(): void {
        console.debug(`UNMOUNTED ${this.componentName} (${this.componentId})`);
    }

    public updateContent(): void {
    }

    protected injectStyle(style: string): void {
        if (injectedStyles.has(this.componentName)) return;
        injectedStyles.add(this.componentName);
        const el = document.createElement("style");
        el.textContent = `[data-component=${this.componentName}] { ${style} }`;
        document.head.appendChild(el);
    }
}

export function createEl<T extends HTMLElement>(tag: string, elOptions?: ElOptions, content?: (string | HTMLElement)[]): T {
    const el = document.createElement(tag);
    if (content) {
        for (const contentEl of content) {
            if (typeof contentEl === "string") {
                el.appendChild(document.createTextNode(contentEl));
            } else {
                el.appendChild(contentEl);
            }
        }
    }
    if (elOptions) {
        if(elOptions.className) {
            el.className = elOptions.className;
        }
        if(elOptions.onClick) {
            el.addEventListener("click", elOptions.onClick);
        }
        if(elOptions.onKeyDown) {
            el.addEventListener("keydown", elOptions.onKeyDown);
        }
        if(elOptions.attributes) {
            for (const [key, value] of Object.entries(elOptions.attributes)) {
                if (value !== undefined) {
                    if (typeof value === "boolean") {
                        (el as any)[key] = value;
                    } else {
                        el.setAttribute(key, value.toString());
                    }
                }
            }
        }
    }
    return el as T;
}

export function createInputEl(type: string, name: string, required: boolean = false, className?: string): HTMLInputElement {
    const elOptions: ElOptions = {
        className: className,
        attributes: {
            name: name,
            required: required,
            type: type,
        }
    }
    return createEl<HTMLInputElement>("input", elOptions);
}

export function createButton(label: string, className: string, onClick: () => void): HTMLButtonElement {
    const elOptions = {
        className: className,
        onClick: onClick,
        attributes: {
            type: "button",
        }
    }
    return createEl<HTMLButtonElement>("button", elOptions, [label]);
}

export function createSelectOption(value: string, label: string, initial?: boolean): HTMLOptionElement {
    const el = createEl<HTMLOptionElement>("option", {attributes: {value: value}}, [label]);
    if (initial) {
        el.disabled = true;
        el.selected = true;
    }
    return el;
}
