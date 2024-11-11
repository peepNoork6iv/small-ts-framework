export interface ElOptions {
    className?: string;
    onClick?: () => void;
    onKeyDown?: () => void;
    attributes?: Attributes;
}

// Add any attributes
interface Attributes extends Partial<HTMLElement>{
    [key: string]: any;
}