import * as cm from "./index";

document.addEventListener("DOMContentLoaded", ()=>{  
  let container = document.getElementById("tbar");
  let menu = cm.createMenu(document, container, [
    {
      label: "TEST",
      content: (e)=>{console.log("TEST clicked.");}
    }, 
    {
      label: "TEST DEL",
      content: (e)=>{console.log("TEST clicked.");}
    }, 
    {
      label: "TEST 2",
      content: [
        {
          label: "TEST 3",
          content: (e)=>{console.log("TEST 3 clicked.");}
        },
        {
          label: "TEST DEL",
          content: (e)=>{console.log("TEST clicked.");}
        }, 
        {
          label: "TEST DEL 2",
          content: (e)=>{console.log("TEST clicked.");}
        }, 
      ]
    },
    {
      label: "TEST DEL 3",
      content: (e)=>{console.log("TEST clicked.");}
    }, 
  ]);

  menu.removeItem("TEST DEL");
  menu.removeItem("TEST DEL 2");
  menu.removeItem("TEST DEL 3");
  cm.patchDefaultStyle(document);
  document.body.addEventListener("contextmenu", (e)=>{
    menu.showAt(e.clientX, e.clientY);
    e.preventDefault();
  });
});