import * as cm from "./index";

document.addEventListener("DOMContentLoaded", ()=>{  
  let container = document.getElementById("tbar");
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
});