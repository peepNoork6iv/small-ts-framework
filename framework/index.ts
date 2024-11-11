import {ComponentBase, createEl, createInputEl, createButton, createSelectOption, ContentNode} from "./components.ts";
import {getUid} from "./utils.ts";
import {ElOptions} from "./models.ts";

/**
 * @class ComponentBase - Base component
 *
 * @function createEl - create basic elements
 *
 * @function createInputEl - create input elements
 *
 * @function createButton - create buttons
 *
 * @function createSelectOption - create select options
 */
export {ComponentBase, createEl, createInputEl, createButton, createSelectOption};

export type {ContentNode, ElOptions};

export {getUid};