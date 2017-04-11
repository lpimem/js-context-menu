# js-context-menu

[![npm version](https://badge.fury.io/js/js-context-menu.svg)](https://badge.fury.io/js/js-context-menu)

## Install 

```Bash
npm install js-ctx-menu --save
```

## Usage
```TypeScript
import * as cm from "js-ctx-menu"

let menu = cm.createMenu(document, container, [
    {
      label: "TEST",
      content: (e)=>{console.log("TEST clicked.");}
    }, 
    {
      label: "TEST 2",
      content: [
        {
          label: "TEST 3",
          content: (e)=>{console.log("TEST 3 clicked.");}
        }
      ]
    }
  ]);
cm.patchDefaultStyle(document);

```

## Preview

![](https://raw.githubusercontent.com/lpimem/js-context-menu/master/demo.png)

