export interface OnClickCallback{
  (e: MouseEvent) : void
}

export interface ContextMenuItem{
  icon?   : string
  label   : string
  content : OnClickCallback | ContextMenuItem[]
}

export function createMenu(doc: Document, container: HTMLElement, items: ContextMenuItem[]): ContextMenu{
  let menu = new ContextMenu(doc, container);
  for(let it of items){
    menu.addItem(it);
  }
  return menu;
}

export class ContextMenu{

  constructor(doc: Document, container: HTMLElement){
    this.m_doc = doc;
    this.m_root = this.root();
    container.appendChild(this.m_root);
  }

  /**
   * uninstall context menu from document
   */
  public destroy(): void{
    if (this.m_root.parentElement){
      this.m_root.parentElement.removeChild(this.m_root);
    }
  }

  /**
   * show menu at the given position
   */
  public showAt(left: number, top: number, position: string = "fixed"): void {
    show(this.m_root, left, top, position);
    this.m_left = left;
    this.m_top = top;
    this.m_open = true;
  }

  /**
   * Hide the menu
   */
  public hide(): void {
    hide(this.m_root);
    this.m_open = false;
    this.m_opened_sublists.forEach((v)=>{
      hide(v);
    });
    this.m_opened_sublists.length = 0;
  }

  /**
   * Add a new @param item to the root menu
   */
  public addItem(item: ContextMenuItem): void {
    this.item(item, this.m_root);
  }

  /**
   * Remove all items with label: @param label 
   */
  public removeItem(label: string): void{
    let nodelist = this.m_root.querySelectorAll(`div[${ATTR_LABEL}="${label}"]`);
    for (let i=0; i<nodelist.length; i++){
      let item = nodelist.item(i);
      console.debug(`remove item ${label}`);
      if (item.parentElement){
        item.parentElement.removeChild(item);
      }
    }
  }

  private root(){
    let root = this.m_doc.createElement("div");
    root.className = "jscm_root";
    hide(root);

    this.m_doc.body.addEventListener("click", (evt)=>{
      setTimeout(()=>{this.hide();}, 50);
    });
    return root;
  }

  registerOnBody(){
    this.m_doc.body.addEventListener("contextmenu", (evt)=>{
      this.showAt(evt.clientX, evt.clientY);
      evt.preventDefault();
    });
  }

  private item_wrapper(label: string){
    let item = this.m_doc.createElement("div");
    item.innerText = label;
    item.setAttribute(ATTR_LABEL, label);
    item.className = "jscm_item"
    return item;
  }

  private callback(label: string, cb: OnClickCallback, p: HTMLElement){
    let item = this.item_wrapper(label);
    item.addEventListener("click", cb);
    p.appendChild(item);
  }

  private submenu(i: ContextMenuItem, p: HTMLElement){
      let item = this.item_wrapper(i.label);
      let sublist = this.m_doc.createElement("div");
      sublist.className = "jscm_list";
      for (let subitem of i.content as ContextMenuItem[]){
        this.item(subitem, sublist);
      }
      this.submenuEvents(item, sublist);
      hide(sublist);
      p.appendChild(item)
      item.appendChild(sublist);
  }
  
  private submenuEvents(item: HTMLElement, sublist: HTMLElement){
    let itemover, sublistover: boolean;
    item.addEventListener("mouseover", (evt)=>{
      let rect = item.getBoundingClientRect();
      show(sublist, rect.left + width(item), rect.top);
      this.m_opened_sublists.push(sublist);
      itemover = true;
    });
    item.addEventListener("mouseout", ()=>{
      itemover = false;
      if (!sublistover){
        hide(sublist);
      }
    });
    sublist.addEventListener("mouseover", ()=>{
      sublistover = true;
    });
    sublist.addEventListener("mouseout", ()=>{
      hide(sublist);
      sublistover = false;
    });
  }

  private item(i: ContextMenuItem, p: HTMLElement){
    if (! i.content){
      console.error(`invalid item: ${i}`);
      return;
    }
    if ( ContextMenu.isCb(i.content)) {
      this.callback(i.label, i.content, p);
    } else {
      this.submenu(i, p);
    }
  }

  private static isCb(content: OnClickCallback | ContextMenuItem[] ): content is OnClickCallback{
    return isFunction(content);
  }

  private m_doc : Document;
  private m_root : HTMLElement;
  private m_left : number;
  private m_top: number;
  private m_open : boolean;
  private m_opened_sublists: HTMLElement[] = [];
}

function width(el: HTMLElement): number{
  return el.offsetWidth;
}

function height(el: HTMLElement): number{
  return el.offsetHeight;
}

function show(el: HTMLElement, left: number, top: number, pos:string = "fixed"){
  el.style.left = `${left}px`;
  el.style.top  = `${top}px`;
  if (pos){
    el.style.position = pos;
  }
  el.style.display = "block";
}

function hide(el: HTMLElement){
  el.style.display = "none";
}

function sublistOnMouseOver(sublist: HTMLElement, anchor: HTMLElement){
    let left = parseInt(/(\d+)[^\d]/.exec(anchor.style.left)[1]) + width(anchor);
    let top = parseInt(/(\d+)[^\d]/.exec(anchor.style.top)[1]);
    show(sublist, left, top, anchor.style.position);
  }

function isFunction(functionToCheck: any) : boolean{
 var getType = {};
 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

export function patchDefaultStyle(doc :Document){
  let style = doc.createElement("style");
  style.innerHTML = `.jscm_root,
    .jscm_list {
      padding: 0;
      background-color: FFF;
      border-radius: 3px;
      box-shadow: 1px 0 5px #000;
      user-select: none;
    }

    .jscm_item {
      padding: 3px 5px 3px 5px;
      font-family: sans-serif;
      color: #000;
      user-select: none;
    }

    div.jscm_item:hover {
      padding: 3px 5px 3px 5px;
      background-color: gray;
      color: #FFF;
    }`;
  doc.head.appendChild(style);
}

const ATTR_LABEL = "data-jcm-label";