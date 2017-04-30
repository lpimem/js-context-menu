define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function createMenu(doc, container, items) {
        var menu = new ContextMenu(doc, container);
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var it = items_1[_i];
            menu.addItem(it);
        }
        return menu;
    }
    exports.createMenu = createMenu;
    var ContextMenu = (function () {
        function ContextMenu(doc, container) {
            this.m_opened_sublists = [];
            this.m_doc = doc;
            this.m_root = this.root();
            container.appendChild(this.m_root);
        }
        ContextMenu.prototype.destroy = function () {
            if (this.m_root.parentElement) {
                this.m_root.parentElement.removeChild(this.m_root);
            }
        };
        ContextMenu.prototype.showAt = function (left, top, position) {
            if (position === void 0) { position = "fixed"; }
            show(this.m_root, left, top, position);
            this.m_left = left;
            this.m_top = top;
            this.m_open = true;
        };
        ContextMenu.prototype.hide = function () {
            hide(this.m_root);
            this.m_open = false;
            this.m_opened_sublists.forEach(function (v) {
                hide(v);
            });
            this.m_opened_sublists.length = 0;
        };
        ContextMenu.prototype.addItem = function (item) {
            this.item(item, this.m_root);
        };
        ContextMenu.prototype.removeItem = function (label) {
            var nodelist = this.m_root.querySelectorAll("div[" + ATTR_LABEL + "=\"" + label + "\"]");
            for (var i = 0; i < nodelist.length; i++) {
                var item = nodelist.item(i);
                console.debug("remove item " + label);
                if (item.parentElement) {
                    item.parentElement.removeChild(item);
                }
            }
        };
        ContextMenu.prototype.root = function () {
            var _this = this;
            var root = this.m_doc.createElement("div");
            root.className = "jscm_root";
            hide(root);
            this.m_doc.body.addEventListener("click", function (evt) {
                setTimeout(function () { _this.hide(); }, 50);
            });
            return root;
        };
        ContextMenu.prototype.registerOnBody = function () {
            var _this = this;
            this.m_doc.body.addEventListener("contextmenu", function (evt) {
                _this.showAt(evt.clientX, evt.clientY);
                evt.preventDefault();
            });
        };
        ContextMenu.prototype.item_wrapper = function (label) {
            var item = this.m_doc.createElement("div");
            item.innerText = label;
            item.setAttribute(ATTR_LABEL, label);
            item.className = "jscm_item";
            return item;
        };
        ContextMenu.prototype.callback = function (label, cb, p) {
            var item = this.item_wrapper(label);
            item.addEventListener("click", cb);
            p.appendChild(item);
        };
        ContextMenu.prototype.submenu = function (i, p) {
            var item = this.item_wrapper(i.label);
            var sublist = this.m_doc.createElement("div");
            sublist.className = "jscm_list";
            for (var _i = 0, _a = i.content; _i < _a.length; _i++) {
                var subitem = _a[_i];
                this.item(subitem, sublist);
            }
            this.submenuEvents(item, sublist);
            hide(sublist);
            p.appendChild(item);
            item.appendChild(sublist);
        };
        ContextMenu.prototype.submenuEvents = function (item, sublist) {
            var _this = this;
            var itemover, sublistover;
            item.addEventListener("mouseover", function (evt) {
                var rect = item.getBoundingClientRect();
                show(sublist, rect.left + width(item), rect.top);
                _this.m_opened_sublists.push(sublist);
                itemover = true;
            });
            item.addEventListener("mouseout", function () {
                itemover = false;
                if (!sublistover) {
                    hide(sublist);
                }
            });
            sublist.addEventListener("mouseover", function () {
                sublistover = true;
            });
            sublist.addEventListener("mouseout", function () {
                hide(sublist);
                sublistover = false;
            });
        };
        ContextMenu.prototype.item = function (i, p) {
            if (!i.content) {
                console.error("invalid item: " + i);
                return;
            }
            if (ContextMenu.isCb(i.content)) {
                this.callback(i.label, i.content, p);
            }
            else {
                this.submenu(i, p);
            }
        };
        ContextMenu.isCb = function (content) {
            return isFunction(content);
        };
        return ContextMenu;
    }());
    exports.ContextMenu = ContextMenu;
    function width(el) {
        return el.offsetWidth;
    }
    function height(el) {
        return el.offsetHeight;
    }
    function show(el, left, top, pos) {
        if (pos === void 0) { pos = "fixed"; }
        el.style.left = left + "px";
        el.style.top = top + "px";
        if (pos) {
            el.style.position = pos;
        }
        el.style.display = "block";
    }
    function hide(el) {
        el.style.display = "none";
    }
    function sublistOnMouseOver(sublist, anchor) {
        var left = parseInt(/(\d+)[^\d]/.exec(anchor.style.left)[1]) + width(anchor);
        var top = parseInt(/(\d+)[^\d]/.exec(anchor.style.top)[1]);
        show(sublist, left, top, anchor.style.position);
    }
    function isFunction(functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }
    function patchDefaultStyle(doc) {
        var style = doc.createElement("style");
        style.innerHTML = ".jscm_root,\n    .jscm_list {\n      padding: 0;\n      background-color: FFF;\n      border-radius: 3px;\n      box-shadow: 1px 0 5px #000;\n      user-select: none;\n    }\n\n    .jscm_item {\n      padding: 3px 5px 3px 5px;\n      font-family: sans-serif;\n      color: #000;\n      user-select: none;\n    }\n\n    div.jscm_item:hover {\n      padding: 3px 5px 3px 5px;\n      background-color: gray;\n      color: #FFF;\n    }";
        doc.head.appendChild(style);
    }
    exports.patchDefaultStyle = patchDefaultStyle;
    var ATTR_LABEL = "data-jcm-label";
});
