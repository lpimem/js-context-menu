(function(a){function b(d){if(c[d])return c[d].exports;var f=c[d]={i:d,l:!1,exports:{}};return a[d].call(f.exports,f,f.exports,b),f.l=!0,f.exports}var c={};return b.m=a,b.c=c,b.i=function(d){return d},b.d=function(d,f,g){b.o(d,f)||Object.defineProperty(d,f,{configurable:!1,enumerable:!0,get:g})},b.n=function(d){var f=d&&d.__esModule?function(){return d['default']}:function(){return d};return b.d(f,'a',f),f},b.o=function(d,f){return Object.prototype.hasOwnProperty.call(d,f)},b.p='',b(b.s=1)})([function(a,b,c){var d,f;d=[c,b],f=function(g,h){'use strict';function k(u){return u.offsetWidth}function m(u,w,x,y){void 0===y&&(y='fixed'),u.style.left=w+'px',u.style.top=x+'px',y&&(u.style.position=y),u.style.display='block'}function n(u){u.style.display='none'}function q(u){return u&&'[object Function]'==={}.toString.call(u)}h.__esModule=!0,h.createMenu=function(u,w,x){for(var B,y=new s(u,w),z=0,A=x;z<A.length;z++)B=A[z],y.addItem(B);return y};var s=function(){function u(w,x){this.m_opened_sublists=[],this.m_doc=w,this.m_root=this.root(),x.appendChild(this.m_root)}return u.prototype.destroy=function(){this.m_root.parentElement&&this.m_root.parentElement.removeChild(this.m_root)},u.prototype.showAt=function(w,x,y){void 0===y&&(y='fixed'),m(this.m_root,w,x,y),this.m_left=w,this.m_top=x,this.m_open=!0},u.prototype.hide=function(){n(this.m_root),this.m_open=!1,this.m_opened_sublists.forEach(function(w){n(w)}),this.m_opened_sublists.length=0},u.prototype.addItem=function(w){this.item(w,this.m_root)},u.prototype.removeItem=function(w){for(var z,x=this.m_root.querySelectorAll('div['+t+'="'+w+'"]'),y=0;y<x.length;y++)z=x.item(y),console.debug('remove item '+w),z.parentElement&&z.parentElement.removeChild(z)},u.prototype.root=function(){var w=this,x=this.m_doc.createElement('div');return x.className='jscm_root',n(x),this.m_doc.body.addEventListener('click',function(){setTimeout(function(){w.hide()},50)}),x},u.prototype.registerOnBody=function(){var w=this;this.m_doc.body.addEventListener('contextmenu',function(x){w.showAt(x.clientX,x.clientY),x.preventDefault()})},u.prototype.item_wrapper=function(w){var x=this.m_doc.createElement('div');return x.innerText=w,x.setAttribute(t,w),x.className='jscm_item',x},u.prototype.callback=function(w,x,y){var z=this.item_wrapper(w);z.addEventListener('click',x),y.appendChild(z)},u.prototype.submenu=function(w,x){var y=this.item_wrapper(w.label),z=this.m_doc.createElement('div');z.className='jscm_list';for(var C,A=0,B=w.content;A<B.length;A++)C=B[A],this.item(C,z);this.submenuEvents(y,z),n(z),x.appendChild(y),y.appendChild(z)},u.prototype.submenuEvents=function(w,x){var z,A,y=this;w.addEventListener('mouseover',function(){var C=w.getBoundingClientRect();m(x,C.left+k(w),C.top),y.m_opened_sublists.push(x),z=!0}),w.addEventListener('mouseout',function(){z=!1,A||n(x)}),x.addEventListener('mouseover',function(){A=!0}),x.addEventListener('mouseout',function(){n(x),A=!1})},u.prototype.item=function(w,x){return w.content?void(u.isCb(w.content)?this.callback(w.label,w.content,x):this.submenu(w,x)):void console.error('invalid item: '+w)},u.isCb=function(w){return q(w)},u}();h.ContextMenu=s,h.patchDefaultStyle=function(u){var w=u.createElement('style');w.innerHTML='.jscm_root,\n    .jscm_list {\n      padding: 0;\n      background-color: FFF;\n      border-radius: 3px;\n      box-shadow: 1px 0 5px #000;\n      user-select: none;\n    }\n\n    .jscm_item {\n      padding: 3px 5px 3px 5px;\n      font-family: sans-serif;\n      color: #000;\n      user-select: none;\n    }\n\n    div.jscm_item:hover {\n      padding: 3px 5px 3px 5px;\n      background-color: gray;\n      color: #FFF;\n    }',u.head.appendChild(w)};var t='data-jcm-label'}.apply(b,d),!(f!==void 0&&(a.exports=f))},function(a,b,c){var d,f;d=[c,b,c(0)],f=function(g,h,j){'use strict';h.__esModule=!0,document.addEventListener('DOMContentLoaded',function(){var k=document.getElementById('tbar'),l=j.createMenu(document,k,[{label:'TEST',content:function(){console.log('TEST clicked.')}},{label:'TEST DEL',content:function(){console.log('TEST clicked.')}},{label:'TEST 2',content:[{label:'TEST 3',content:function(){console.log('TEST 3 clicked.')}},{label:'TEST DEL',content:function(){console.log('TEST clicked.')}},{label:'TEST DEL 2',content:function(){console.log('TEST clicked.')}}]},{label:'TEST DEL 3',content:function(){console.log('TEST clicked.')}},{label:'Destroy',content:function(){l.destroy()}}]);l.removeItem('TEST DEL'),l.removeItem('TEST DEL 2'),l.removeItem('TEST DEL 3'),j.patchDefaultStyle(document),document.body.addEventListener('contextmenu',function(m){l.showAt(m.clientX,m.clientY),m.preventDefault()})})}.apply(b,d),!(f!==void 0&&(a.exports=f))}]);