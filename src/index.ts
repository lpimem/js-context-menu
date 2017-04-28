

export interface OnClickCallback{
  (e: MouseEvent) : void
}

export interface ContextMenuItem{
  icon?   : string
  label   : string
  content : OnClickCallback | ContextMenuItem[]
}

export interface ContextMenu{
  showAt(left: number, top: number, position?: string): void
  hide(): void
  addItem(item: ContextMenuItem): void
}

export function createMenu(doc: Document, container: HTMLElement, items: ContextMenuItem[]): ContextMenu{
  let menu = new StaticContextMenu(doc, container);
  for(let it of items){
    menu.addItem(it);
  }
  return menu;
}

export class StaticContextMenu implements ContextMenu{

  constructor(doc: Document, container: HTMLElement){
    this.m_doc = doc;
    this.m_root = this.root();
    container.appendChild(this.m_root);
  }

  public showAt(left: number, top: number, position: string = "fixed"): void {
    show(this.m_root, left, top, position);
    this.m_left = left;
    this.m_top = top;
    this.m_open = true;
  }

  public hide(): void {
    hide(this.m_root);
    this.m_open = false;
    this.m_opened_sublists.forEach((v)=>{
      hide(v);
    });
    this.m_opened_sublists.length = 0;
  }

  public addItem(item: ContextMenuItem): void {
    this.item(item, this.m_root);
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
    item.className = "jscm_item"
    return item;
  }

  private callback(label: string, cb: OnClickCallback, p: HTMLElement){
    let item = this.item_wrapper(label);
    item.addEventListener("click", cb);
    p.appendChild(item);
  }

  private item(i: ContextMenuItem, p: HTMLElement){
    console.info(JSON.stringify(i));
    if (! i.content){
      console.error(`invalid item: ${i}`);
      return;
    }
    if ( StaticContextMenu.isCb(i.content)) {
      this.callback(i.label, i.content, p);
    } else {
      let item = this.item_wrapper(i.label);
      let sublist = this.m_doc.createElement("div");
      sublist.className = "jscm_list";
      for (let subitem of i.content){
        this.item(subitem, sublist);
      }
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
      hide(sublist);
      p.appendChild(item)
      item.appendChild(sublist);
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