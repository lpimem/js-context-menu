(function(a){function b(d){if(c[d])return c[d].exports;var f=c[d]={i:d,l:!1,exports:{}};return a[d].call(f.exports,f,f.exports,b),f.l=!0,f.exports}var c={};return b.m=a,b.c=c,b.i=function(d){return d},b.d=function(d,f,g){b.o(d,f)||Object.defineProperty(d,f,{configurable:!1,enumerable:!0,get:g})},b.n=function(d){var f=d&&d.__esModule?function(){return d['default']}:function(){return d};return b.d(f,'a',f),f},b.o=function(d,f){return Object.prototype.hasOwnProperty.call(d,f)},b.p='',b(b.s=1)})([function(a,b,c){var d,f;d=[c,b],f=function(g,h){'use strict';function k(t){return t.offsetWidth}function m(t,u,w,x){void 0===x&&(x='fixed'),t.style.left=u+'px',t.style.top=w+'px',x&&(t.style.position=x),t.style.display='block'}function n(t){t.style.display='none'}function q(t){return t&&'[object Function]'==={}.toString.call(t)}h.__esModule=!0,h.createMenu=function(t,u,w){for(var A,x=new s(t,u),y=0,z=w;y<z.length;y++)A=z[y],x.addItem(A);return x};var s=function(){function t(u,w){this.m_opened_sublists=[],this.m_doc=u,this.m_root=this.root(),w.appendChild(this.m_root)}return t.prototype.showAt=function(u,w,x){void 0===x&&(x='fixed'),m(this.m_root,u,w,x),this.m_left=u,this.m_top=w,this.m_open=!0},t.prototype.hide=function(){n(this.m_root),this.m_open=!1,this.m_opened_sublists.forEach(function(u){n(u)}),this.m_opened_sublists.length=0},t.prototype.addItem=function(u){this.item(u,this.m_root)},t.prototype.root=function(){var u=this,w=this.m_doc.createElement('div');return w.className='jscm_root',n(w),this.m_doc.body.addEventListener('click',function(){setTimeout(function(){u.hide()},50)}),w},t.prototype.registerOnBody=function(){var u=this;this.m_doc.body.addEventListener('contextmenu',function(w){u.showAt(w.clientX,w.clientY),w.preventDefault()})},t.prototype.item_wrapper=function(u){var w=this.m_doc.createElement('div');return w.innerText=u,w.className='jscm_item',w},t.prototype.callback=function(u,w,x){var y=this.item_wrapper(u);y.addEventListener('click',w),x.appendChild(y)},t.prototype.item=function(u,w){var x=this;if(console.info(JSON.stringify(u)),!u.content)return void console.error('invalid item: '+u);if(t.isCb(u.content))this.callback(u.label,u.content,w);else{var y=this.item_wrapper(u.label),z=this.m_doc.createElement('div');z.className='jscm_list';for(var C,A=0,B=u.content;A<B.length;A++)C=B[A],this.item(C,z);var D,E;y.addEventListener('mouseover',function(){var G=y.getBoundingClientRect();m(z,G.left+k(y),G.top),x.m_opened_sublists.push(z),D=!0}),y.addEventListener('mouseout',function(){D=!1,E||n(z)}),z.addEventListener('mouseover',function(){E=!0}),z.addEventListener('mouseout',function(){n(z),E=!1}),n(z),w.appendChild(y),y.appendChild(z)}},t.isCb=function(u){return q(u)},t}();h.StaticContextMenu=s,h.patchDefaultStyle=function(t){var u=t.createElement('style');u.innerHTML='.jscm_root,\n    .jscm_list {\n      padding: 0;\n      background-color: FFF;\n      border-radius: 3px;\n      box-shadow: 1px 0 5px #000;\n    }\n\n    .jscm_item {\n      padding: 3px 5px 3px 5px;\n      font-family: sans-serif;\n      color: #000;\n    }\n\n    div.jscm_item:hover {\n      padding: 3px 5px 3px 5px;\n      background-color: gray;\n      color: #FFF;\n    }',t.head.appendChild(u)}}.apply(b,d),!(f!==void 0&&(a.exports=f))},function(a,b,c){var d,f;d=[c,b,c(0)],f=function(g,h,j){'use strict';h.__esModule=!0,document.addEventListener('DOMContentLoaded',function(){var k=document.getElementById('tbar'),l=j.createMenu(document,k,[{label:'TEST',content:function(){console.log('TEST clicked.')}},{label:'TEST 2',content:[{label:'TEST 3',content:function(){console.log('TEST 3 clicked.')}}]}]);j.patchDefaultStyle(document),document.body.addEventListener('contextmenu',function(m){l.showAt(m.clientX,m.clientY),m.preventDefault()})})}.apply(b,d),!(f!==void 0&&(a.exports=f))}]);