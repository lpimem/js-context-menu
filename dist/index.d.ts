export interface OnClickCallback {
    (e: MouseEvent): void;
}
export interface ContextMenuItem {
    icon?: string;
    label: string;
    content: OnClickCallback | ContextMenuItem[];
}
export interface ContextMenu {
    showAt(left: number, top: number, position?: string): void;
    hide(): void;
    addItem(item: ContextMenuItem): void;
}
export declare function createMenu(doc: Document, container: HTMLElement, items: ContextMenuItem[]): ContextMenu;
export declare class StaticContextMenu implements ContextMenu {
    constructor(doc: Document, container: HTMLElement);
    showAt(left: number, top: number, position?: string): void;
    hide(): void;
    addItem(item: ContextMenuItem): void;
    private root();
    registerOnBody(): void;
    private item_wrapper(label);
    private callback(label, cb, p);
    private item(i, p);
    private static isCb(content);
    private m_doc;
    private m_root;
    private m_left;
    private m_top;
    private m_open;
    private m_opened_sublists;
}
export declare function patchDefaultStyle(doc: Document): void;
