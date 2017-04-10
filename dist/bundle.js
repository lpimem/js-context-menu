/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function createMenu(doc, container, items) {
        var menu = new StaticContextMenu(doc, container);
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var it = items_1[_i];
            menu.addItem(it);
        }
        return menu;
    }
    exports.createMenu = createMenu;
    var StaticContextMenu = (function () {
        function StaticContextMenu(doc, container) {
            this.m_opened_sublists = [];
            this.m_doc = doc;
            this.m_root = this.root();
            container.appendChild(this.m_root);
        }
        StaticContextMenu.prototype.showAt = function (left, top, position) {
            if (position === void 0) { position = "fixed"; }
            if (!this.m_open) {
                show(this.m_root, left, top, position);
                this.m_left = left;
                this.m_top = top;
                this.m_open = true;
            }
        };
        StaticContextMenu.prototype.hide = function () {
            hide(this.m_root);
            this.m_open = false;
            this.m_opened_sublists.forEach(function (v) {
                hide(v);
            });
            this.m_opened_sublists.length = 0;
        };
        StaticContextMenu.prototype.addItem = function (item) {
            this.item(item, this.m_root);
        };
        StaticContextMenu.prototype.root = function () {
            var _this = this;
            var root = this.m_doc.createElement("div");
            root.className = "jscm_root";
            hide(root);
            this.m_doc.body.addEventListener("click", function (evt) {
                setTimeout(function () { _this.hide(); }, 50);
            });
            this.m_doc.body.addEventListener("contextmenu", function (evt) {
                if (!_this.m_open) {
                    _this.showAt(evt.clientX, evt.clientY);
                    evt.preventDefault();
                }
            });
            return root;
        };
        StaticContextMenu.prototype.item_wrapper = function (label) {
            var item = this.m_doc.createElement("div");
            item.innerText = label;
            item.className = "jscm_item";
            return item;
        };
        StaticContextMenu.prototype.callback = function (label, cb, p) {
            var item = this.item_wrapper(label);
            item.addEventListener("click", cb);
            p.appendChild(item);
        };
        StaticContextMenu.prototype.item = function (i, p) {
            var _this = this;
            console.info(JSON.stringify(i));
            if (!i.content) {
                console.error("invalid item: " + i);
                return;
            }
            if (StaticContextMenu.isCb(i.content)) {
                this.callback(i.label, i.content, p);
            }
            else {
                var item_1 = this.item_wrapper(i.label);
                var sublist_1 = this.m_doc.createElement("div");
                sublist_1.className = "jscm_list";
                for (var _i = 0, _a = i.content; _i < _a.length; _i++) {
                    var subitem = _a[_i];
                    this.item(subitem, sublist_1);
                }
                var itemover_1, sublistover_1;
                item_1.addEventListener("mouseover", function (evt) {
                    var rect = item_1.getBoundingClientRect();
                    show(sublist_1, rect.left + width(item_1), rect.top);
                    _this.m_opened_sublists.push(sublist_1);
                    itemover_1 = true;
                });
                item_1.addEventListener("mouseout", function () {
                    itemover_1 = false;
                    if (!sublistover_1) {
                        hide(sublist_1);
                    }
                });
                sublist_1.addEventListener("mouseover", function () {
                    sublistover_1 = true;
                });
                sublist_1.addEventListener("mouseout", function () {
                    hide(sublist_1);
                    sublistover_1 = false;
                });
                hide(sublist_1);
                p.appendChild(item_1);
                item_1.appendChild(sublist_1);
            }
        };
        StaticContextMenu.isCb = function (content) {
            return isFunction(content);
        };
        return StaticContextMenu;
    }());
    exports.StaticContextMenu = StaticContextMenu;
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
        style.innerHTML = ".jscm_root,\n    .jscm_list {\n      padding: 0;\n      background-color: FFF;\n      border-radius: 3px;\n      box-shadow: 1px 0 5px #000;\n    }\n\n    .jscm_item {\n      padding: 3px 5px 3px 5px;\n      font-family: sans-serif;\n      color: #000;\n    }\n\n    div.jscm_item:hover {\n      padding: 3px 5px 3px 5px;\n      background-color: gray;\n      color: #FFF;\n    }";
        doc.head.appendChild(style);
    }
    exports.patchDefaultStyle = patchDefaultStyle;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, cm) {
    "use strict";
    exports.__esModule = true;
    document.addEventListener("DOMContentLoaded", function () {
        var container = document.getElementById("tbar");
        var menu = cm.createMenu(document, container, [
            {
                label: "TEST",
                content: function (e) { console.log("TEST clicked."); }
            },
            {
                label: "TEST 2",
                content: [
                    {
                        label: "TEST 3",
                        content: function (e) { console.log("TEST 3 clicked."); }
                    }
                ]
            }
        ]);
        cm.patchDefaultStyle(document);
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })
/******/ ]);