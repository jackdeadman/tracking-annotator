var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function i(t){return"function"==typeof t}function r(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function s(e,n,o){e.$$.on_destroy.push(function(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}(n,o))}function c(t,e,n,o){if(t){const i=l(t,e,n,o);return t[0](i)}}function l(t,e,n,o){return t[1]&&o?function(t,e){for(const n in e)t[n]=e[n];return t}(n.ctx.slice(),t[1](o(e))):n.ctx}function u(t,e,n,o,i,r,s){const c=function(t,e,n,o){if(t[2]&&o){const i=t[2](o(n));if(void 0===e.dirty)return i;if("object"==typeof i){const t=[],n=Math.max(e.dirty.length,i.length);for(let o=0;o<n;o+=1)t[o]=e.dirty[o]|i[o];return t}return e.dirty|i}return e.dirty}(e,o,i,r);if(c){const i=l(e,n,o,s);t.p(i,c)}}function a(t,e,n=e){return t.set(n),e}let d,f,p="undefined"!=typeof window?t=>requestAnimationFrame(t):t;function m(t,e){t.appendChild(e)}function $(t,e,n){t.insertBefore(e,n||null)}function h(t){t.parentNode.removeChild(t)}function g(t){return document.createElement(t)}function y(t){return document.createTextNode(t)}function v(){return y(" ")}function b(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function x(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function w(t,e){e=""+e,t.data!==e&&(t.data=e)}function k(t,e,n,o){t.style.setProperty(e,n,o?"important":"")}function E(){if(void 0===d){d=!1;try{"undefined"!=typeof window&&window.parent&&window.parent.document}catch(t){d=!0}}return d}function _(t,e,n){t.classList[n?"add":"remove"](e)}function z(t){f=t}function N(){if(!f)throw new Error("Function called outside component initialization");return f}function A(t){N().$$.on_mount.push(t)}const M=[],S=[],C=[],I=[],R=Promise.resolve();let T=!1;function B(t){C.push(t)}function P(t){I.push(t)}let j=!1;const D=new Set;function L(){if(!j){j=!0;do{for(let t=0;t<M.length;t+=1){const e=M[t];z(e),q(e.$$)}for(M.length=0;S.length;)S.pop()();for(let t=0;t<C.length;t+=1){const e=C[t];D.has(e)||(D.add(e),e())}C.length=0}while(M.length);for(;I.length;)I.pop()();T=!1,j=!1,D.clear()}}function q(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(B)}}const O=new Set;let W;function X(t,e){t&&t.i&&(O.delete(t),t.i(e))}function F(t,e,n,o){if(t&&t.o){if(O.has(t))return;O.add(t),W.c.push(()=>{O.delete(t),o&&(n&&t.d(1),o())}),t.o(e)}}function J(t,e){t.d(1),e.delete(t.key)}function U(t,e,n,o,i,r,s,c,l,u,a,d){let f=t.length,p=r.length,m=f;const $={};for(;m--;)$[t[m].key]=m;const h=[],g=new Map,y=new Map;for(m=p;m--;){const t=d(i,r,m),c=n(t);let l=s.get(c);l?o&&l.p(t,e):(l=u(c,t),l.c()),g.set(c,h[m]=l),c in $&&y.set(c,Math.abs(m-$[c]))}const v=new Set,b=new Set;function x(t){X(t,1),t.m(c,a),s.set(t.key,t),a=t.first,p--}for(;f&&p;){const e=h[p-1],n=t[f-1],o=e.key,i=n.key;e===n?(a=e.first,f--,p--):g.has(i)?!s.has(o)||v.has(o)?x(e):b.has(i)?f--:y.get(o)>y.get(i)?(b.add(o),x(e)):(v.add(i),f--):(l(n,s),f--)}for(;f--;){const e=t[f];g.has(e.key)||l(e,s)}for(;p;)x(h[p-1]);return h}function Y(t,e,n){const o=t.$$.props[e];void 0!==o&&(t.$$.bound[o]=n,n(t.$$.ctx[o]))}function H(t){t&&t.c()}function V(t,n,r){const{fragment:s,on_mount:c,on_destroy:l,after_update:u}=t.$$;s&&s.m(n,r),B(()=>{const n=c.map(e).filter(i);l?l.push(...n):o(n),t.$$.on_mount=[]}),u.forEach(B)}function G(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function K(t,e){-1===t.$$.dirty[0]&&(M.push(t),T||(T=!0,R.then(L)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Q(e,i,r,s,c,l,u=[-1]){const a=f;z(e);const d=i.props||{},p=e.$$={fragment:null,ctx:null,props:l,update:t,not_equal:c,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(a?a.$$.context:[]),callbacks:n(),dirty:u};let m=!1;if(p.ctx=r?r(e,d,(t,n,...o)=>{const i=o.length?o[0]:n;return p.ctx&&c(p.ctx[t],p.ctx[t]=i)&&(p.bound[t]&&p.bound[t](i),m&&K(e,t)),n}):[],p.update(),m=!0,o(p.before_update),p.fragment=!!s&&s(p.ctx),i.target){if(i.hydrate){const t=function(t){return Array.from(t.childNodes)}(i.target);p.fragment&&p.fragment.l(t),t.forEach(h)}else p.fragment&&p.fragment.c();i.intro&&X(e.$$.fragment),V(e,i.target,i.anchor),L()}z(a)}class Z{$destroy(){G(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}function tt(t){let e;return{c(){e=g("div"),k(e,"transform","translate("+t[2].x+"px, "+t[2].y+"px) scale("+t[3]+")"),x(e,"class","svelte-1eavhw6"),_(e,"pressed",t[0]),_(e,"scrubbing",t[1])},m(t,n){$(t,e,n)},p(t,n){12&n&&k(e,"transform","translate("+t[2].x+"px, "+t[2].y+"px) scale("+t[3]+")"),1&n&&_(e,"pressed",t[0]),2&n&&_(e,"scrubbing",t[1])},d(t){t&&h(e)}}}function et(e){let n,o=e[2]&&tt(e);return{c(){o&&o.c(),n=y("")},m(t,e){o&&o.m(t,e),$(t,n,e)},p(t,[e]){t[2]?o?o.p(t,e):(o=tt(t),o.c(),o.m(n.parentNode,n)):o&&(o.d(1),o=null)},i:t,o:t,d(t){o&&o.d(t),t&&h(n)}}}function nt(t,e,n){let o,i,r,{position:s}=e,{container:c}=e,{pressed:l}=e,{scrubbing:u}=e;return t.$set=t=>{"position"in t&&n(4,s=t.position),"container"in t&&n(5,c=t.container),"pressed"in t&&n(0,l=t.pressed),"scrubbing"in t&&n(1,u=t.scrubbing)},t.$$.update=()=>{16&t.$$.dirty&&n(2,o=function(t){return c?(i=c.getBoundingClientRect(),{x:t.x*i.width-10,y:t.y*i.height-10}):t}(s)),1&t.$$.dirty&&n(3,r=l?2:1)},[l,u,o,r,s,c]}class ot extends Z{constructor(t){super(),Q(this,t,nt,et,r,{position:4,container:5,pressed:0,scrubbing:1})}}const it=[];function rt(e,n=t){let o;const i=[];function s(t){if(r(e,t)&&(e=t,o)){const t=!it.length;for(let t=0;t<i.length;t+=1){const n=i[t];n[1](),it.push(n,e)}if(t){for(let t=0;t<it.length;t+=2)it[t][0](it[t+1]);it.length=0}}}return{set:s,update:function(t){s(t(e))},subscribe:function(r,c=t){const l=[r,c];return i.push(l),1===i.length&&(o=n(s)||t),r(e),()=>{const t=i.indexOf(l);-1!==t&&i.splice(t,1),0===i.length&&(o(),o=null)}}}}const st=function(){const{subscribe:t,set:e,update:n}=rt([]);return{subscribe:t,add:t=>n(e=>[...e,t]),reset:()=>e([])}}(),ct=rt([]);function lt(t){return Math.round(10*t)}function ut(t){let e;const n=new ot({props:{position:t[1],pressed:t[2],container:t[0],scrubbing:t[3]}});return{c(){H(n.$$.fragment)},m(t,o){V(n,t,o),e=!0},p(t,e){const o={};2&e&&(o.position=t[1]),4&e&&(o.pressed=t[2]),1&e&&(o.container=t[0]),8&e&&(o.scrubbing=t[3]),n.$set(o)},i(t){e||(X(n.$$.fragment,t),e=!0)},o(t){F(n.$$.fragment,t),e=!1},d(t){G(n,t)}}}function at(t){let e,n,r,s,l,a,d,f=t[4]&&ut(t);const p=t[16].default,y=c(p,t,t[15],null);return{c(){e=g("div"),n=g("div"),f&&f.c(),r=v(),s=g("div"),y&&y.c(),x(s,"class","svelte-knzzfp"),x(n,"class","video svelte-knzzfp"),x(e,"class","svelte-knzzfp")},m(o,c){var u;$(o,e,c),m(e,n),f&&f.m(n,null),m(n,r),m(n,s),y&&y.m(s,null),t[17](s),l=!0,a||(d=[b(window,"keydown",t[8]),b(window,"keyup",t[9]),b(window,"mousemove",t[5]),b(window,"mouseup",t[6]),b(e,"mousedown",t[7]),b(e,"contextmenu",(u=dt,function(t){return t.preventDefault(),u.call(this,t)})),b(e,"mouseleave",t[18]),b(e,"mouseenter",(function(){i(t[4]=!0)&&(t[4]=!0).apply(this,arguments)}))],a=!0)},p(e,[i]){(t=e)[4]?f?(f.p(t,i),16&i&&X(f,1)):(f=ut(t),f.c(),X(f,1),f.m(n,r)):f&&(W={r:0,c:[],p:W},F(f,1,1,()=>{f=null}),W.r||o(W.c),W=W.p),y&&y.p&&32768&i&&u(y,p,t,t[15],i,null,null)},i(t){l||(X(f),X(y,t),l=!0)},o(t){F(f),F(y,t),l=!1},d(n){n&&h(e),f&&f.d(),y&&y.d(n),t[17](null),a=!1,o(d)}}}function dt(){return!1}function ft(t,e,n){let o,i;s(t,ct,t=>n(13,o=t));let r,c,l,{container:u}=e,d=!1,f=0,{time:p}=e;function m(t){let e=u.getBoundingClientRect(),n=t.x-e.left,o=t.y-e.top;return{x:n/e.width,y:o/e.height}}let{$$slots:$={},$$scope:h}=e;return t.$set=t=>{"container"in t&&n(0,u=t.container),"time"in t&&n(10,p=t.time),"$$scope"in t&&n(15,h=t.$$scope)},[u,i,r,d,c,function(t){n(1,i=m({x:t.clientX,y:t.clientY})),r&&a(ct,o[lt(p)]={...i,track:f,time:p},o),d&&a(ct,o[lt(p)]=null,o),(r||d)&&st.add({...i,time:p,track:f,left:r,right:d})},function(t){n(2,r=!1),n(1,i=m({x:t.clientX,y:t.clientY})),clearInterval(l),l=null,n(3,d=!1)},function(t){1==t.buttons&&(n(2,r=!0),n(3,d=!1),f+=1),2==t.buttons&&(n(2,r=!1),n(3,d=!0)),l=setInterval(()=>{r&&a(ct,o[lt(p)]={...i,track:f,time:p},o),d&&a(ct,o[lt(p)]=null,o),st.add({...i,time:p,track:f,left:r,right:d})},50)},function(t){console.log(t.key),"Backspace"===t.key&&(n(3,d=!0),n(2,r=!1),l||(l=setInterval(()=>{d&&a(ct,o[lt(p)]=null,o),st.add({...i,time:p,track:f,left:r,right:d})},50)))},function(t){"Backspace"===t.key&&(n(3,d=!1),clearInterval(l),l=null)},p,f,l,o,m,h,$,function(t){S[t?"unshift":"push"](()=>{n(0,u=t)})},()=>n(4,c=!1)]}class pt extends Z{constructor(t){super(),Q(this,t,ft,at,r,{container:0,time:10})}}const mt=function(){const{subscribe:t,set:e,update:n}=rt({rate:1,src:"http://localhost:8080/dev/S02_U02_full.mp4",duration:0});return{subscribe:t,play:()=>n(t=>({...t,rate:1})),pause:()=>n(t=>({...t,rate:0})),setDuration:t=>n(e=>({...e,duration:t})),setSrc:t=>n(e=>({...e,src:t}))}}(),$t=function(){const{subscribe:t,set:e,update:n}=rt(1);return{subscribe:t,increase:()=>n(t=>Math.min(t+.5,4)),deccrease:()=>n(t=>Math.max(t-.5,0)),set:e}}();function ht(t,e,n){const o=t.slice();return o[9]=e[n],o}function gt(t,e){let n;return{key:t,first:null,c(){n=g("div"),x(n,"class","point svelte-b3oqht"),k(n,"left",e[9].index/e[3].length*100+"%"),this.first=n},m(t,e){$(t,n,e)},p(t,e){12&e&&k(n,"left",t[9].index/t[3].length*100+"%")},d(t){t&&h(n)}}}function yt(e){let n,o,i,r,s,c,l=[],u=new Map,a=e[2];const d=t=>t[9].index;for(let t=0;t<a.length;t+=1){let n=ht(e,a,t),o=d(n);u.set(o,l[t]=gt(o,n))}return{c(){n=v(),o=g("div"),i=g("div"),r=v();for(let t=0;t<l.length;t+=1)l[t].c();x(i,"class","inner svelte-b3oqht"),k(i,"width",100*e[1]+"%"),x(o,"class","outer svelte-b3oqht")},m(t,u){$(t,n,u),$(t,o,u),m(o,i),m(o,r);for(let t=0;t<l.length;t+=1)l[t].m(o,null);e[8](o),s||(c=b(document.body,"click",e[4]),s=!0)},p(t,[e]){if(2&e&&k(i,"width",100*t[1]+"%"),12&e){const n=t[2];l=U(l,e,d,1,t,n,u,o,J,gt,null,ht)}},i:t,o:t,d(t){t&&h(n),t&&h(o);for(let t=0;t<l.length;t+=1)l[t].d();e[8](null),s=!1,c()}}}function vt(t,e,n){let o,i,r;s(t,mt,t=>n(7,o=t)),s(t,ct,t=>n(3,i=t));let{videoElement:c}=e,{time:l}=e;let u=0,a=[];return t.$set=t=>{"videoElement"in t&&n(5,c=t.videoElement),"time"in t&&n(6,l=t.time)},t.$$.update=()=>{192&t.$$.dirty&&o.duration&&n(1,u=l/o.duration),8&t.$$.dirty&&n(2,a=i.map((t,e)=>({index:e,hasPosition:null!=t})).filter(({hasPosition:t})=>t))},[r,u,a,i,async function(t){if(t.target==r){let e=r.getBoundingClientRect(),i=(t.clientX-e.left)/e.width;console.log("String: ",(i*o.duration).toString()),n(5,c.currentTime=(i*o.duration).toString(),c),console.log(c.currentTime)}},c,l,o,function(t){S[t?"unshift":"push"](()=>{n(0,r=t)})}]}class bt extends Z{constructor(t){super(),Q(this,t,vt,yt,r,{videoElement:5,time:6})}}function xt(t,e,n){const o=t.slice();return o[15]=e[n],o}function wt(t,e){let n;return{key:t,first:null,c(){n=g("div"),x(n,"class","point svelte-ny096z"),k(n,"transform","translate("+e[15].position*e[4]/100+"px, -50%)"),this.first=n},m(t,e){$(t,n,e)},p(t,e){24&e&&k(n,"transform","translate("+t[15].position*t[4]/100+"px, -50%)")},d(t){t&&h(n)}}}function kt(e){let n,o,i,r,s,c,l,u,a,d,f,p,_,z,N,A,M=Et(e[0])+"",S=[],C=new Map,I=e[3];const R=t=>t[15].index;for(let t=0;t<I.length;t+=1){let n=xt(e,I,t),o=R(n);C.set(o,S[t]=wt(o,n))}return{c(){n=v(),o=g("div"),i=y(M),r=v(),s=g("div"),c=g("div"),l=v(),u=g("div"),a=v();for(let t=0;t<S.length;t+=1)S[t].c();d=v(),f=g("div"),f.textContent="-10",p=v(),_=g("div"),_.textContent="+10",x(o,"class","time svelte-ny096z"),x(c,"class","inner svelte-ny096z"),k(c,"width",100*e[2]+"%"),x(u,"class","centre svelte-ny096z"),x(f,"class","left svelte-ny096z"),x(_,"class","right svelte-ny096z"),x(s,"class","outer svelte-ny096z"),B(()=>e[14].call(s))},m(t,y){$(t,n,y),$(t,o,y),m(o,i),$(t,r,y),$(t,s,y),m(s,c),m(s,l),m(s,u),m(s,a);for(let t=0;t<S.length;t+=1)S[t].m(s,null);m(s,d),m(s,f),m(s,p),m(s,_),e[13](s),z=function(t,e){const n=getComputedStyle(t),o=(parseInt(n.zIndex)||0)-1;"static"===n.position&&(t.style.position="relative");const i=g("iframe");i.setAttribute("style",`display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: ${o};`),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const r=E();let s;return r?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",s=b(window,"message",t=>{t.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{s=b(i.contentWindow,"resize",e)}),m(t,i),()=>{(r||s&&i.contentWindow)&&s(),h(i)}}(s,e[14].bind(s)),N||(A=b(document.body,"click",e[5]),N=!0)},p(t,[e]){if(1&e&&M!==(M=Et(t[0])+"")&&w(i,M),4&e&&k(c,"width",100*t[2]+"%"),24&e){const n=t[3];S=U(S,e,R,1,t,n,C,s,J,wt,d,xt)}},i:t,o:t,d(t){t&&h(n),t&&h(o),t&&h(r),t&&h(s);for(let t=0;t<S.length;t+=1)S[t].d();e[13](null),z(),N=!1,A()}}}function Et(t){if(isNaN(t))return"...";const e=Math.floor(t/60);return(t=Math.floor(t%60))<10&&(t="0"+t),`${e}:${t}`}function _t(t,e,n){let o,i,r;s(t,mt,t=>n(9,o=t)),s(t,ct,t=>n(10,i=t));let{videoElement:c}=e,{time:l}=e,{context:u=5}=e,a=l;let d,f=0;function p(t,e){return 100*((function(t){return t/10}(t)-e)/u+.5)}let m=[];var $;let h;return A(()=>{d=setInterval(()=>{if(o.paused)return;let t=i.map((t,e)=>({...t,index:e,hasPosition:null!=t,position:p(e,l)})).filter(({hasPosition:t,position:e})=>t&&e>=0&&e<=100);n(3,m=t)},20)}),$=()=>{clearInterval(d)},N().$$.on_destroy.push($),t.$set=t=>{"videoElement"in t&&n(6,c=t.videoElement),"time"in t&&n(0,l=t.time),"context"in t&&n(7,u=t.context)},t.$$.update=()=>{513&t.$$.dirty&&o.duration&&n(2,f=l/o.duration)},[l,r,f,m,h,async function(t){if(t.target==r){let e=r.getBoundingClientRect(),o=(t.clientX-e.left)/e.width*u-u/2;n(6,c.currentTime+=o,c)}},c,u,d,o,i,a,p,function(t){S[t?"unshift":"push"](()=>{n(1,r=t)})},function(){h=this.clientWidth,n(4,h)}]}class zt extends Z{constructor(t){super(),Q(this,t,_t,kt,r,{videoElement:6,time:0,context:7})}}function Nt(t){let e;return{c(){e=g("div"),x(e,"class","point svelte-4t8lej"),k(e,"transform","translate("+t[2](t[1]).x+"px, "+t[2](t[1]).y+"px)")},m(t,n){$(t,e,n)},p(t,n){2&n&&k(e,"transform","translate("+t[2](t[1]).x+"px, "+t[2](t[1]).y+"px)")},d(t){t&&h(e)}}}function At(e){let n,o,i,r,s=JSON.stringify(e[1])+"",c=e[1]&&Nt(e);return{c(){c&&c.c(),n=v(),o=y(e[0]),i=v(),r=y(s)},m(t,e){c&&c.m(t,e),$(t,n,e),$(t,o,e),$(t,i,e),$(t,r,e)},p(t,[e]){t[1]?c?c.p(t,e):(c=Nt(t),c.c(),c.m(n.parentNode,n)):c&&(c.d(1),c=null),1&e&&w(o,t[0]),2&e&&s!==(s=JSON.stringify(t[1])+"")&&w(r,s)},i:t,o:t,d(t){c&&c.d(t),t&&h(n),t&&h(o),t&&h(i),t&&h(r)}}}function Mt(t,e,n){let o;s(t,ct,t=>n(5,o=t));let i,r,{time:c}=e,{container:l}=e;return t.$set=t=>{"time"in t&&n(3,c=t.time),"container"in t&&n(4,l=t.container)},t.$$.update=()=>{8&t.$$.dirty&&n(0,i=lt(c)),40&t.$$.dirty&&n(1,r=o[lt(c)])},[i,r,function(t){if(!l)return t;let e=l.getBoundingClientRect();return{x:t.x*e.width-5,y:t.y*e.height-5}},c,l]}class St extends Z{constructor(t){super(),Q(this,t,Mt,At,r,{time:3,container:4})}}function Ct(t){let e,n,i,r,s,c,l,u=!1,a=!0;function d(){cancelAnimationFrame(i),e.paused||(i=p(d),u=!0),t[10].call(e)}const f=new St({props:{container:t[2],time:t[3]}});return{c(){e=g("video"),r=v(),H(f.$$.fragment),e.src!==(n=t[6].src)&&x(e,"src",n),x(e,"class","svelte-15dmtw6"),void 0===t[1]&&B(()=>t[11].call(e)),void 0===t[4]&&B(()=>t[12].call(e))},m(n,o){$(n,e,o),t[13](e),isNaN(t[5])||(e.playbackRate=t[5]),$(n,r,o),V(f,n,o),s=!0,c||(l=[b(e,"timeupdate",d),b(e,"durationchange",t[11]),b(e,"seeking",t[12]),b(e,"seeked",t[12]),b(e,"play",t[14]),b(e,"pause",t[14]),b(e,"ratechange",t[15])],c=!0)},p(t,o){(!s||64&o&&e.src!==(n=t[6].src))&&x(e,"src",n),!u&&8&o&&!isNaN(t[3])&&(e.currentTime=t[3]),u=!1,1&o&&a!==(a=t[0])&&e[a?"pause":"play"](),32&o&&!isNaN(t[5])&&(e.playbackRate=t[5]);const i={};4&o&&(i.container=t[2]),8&o&&(i.time=t[3]),f.$set(i)},i(t){s||(X(f.$$.fragment,t),s=!0)},o(t){F(f.$$.fragment,t),s=!1},d(n){n&&h(e),t[13](null),n&&h(r),G(f,n),c=!1,o(l)}}}function It(t){let e,n,o,i,r,s,c,l,u;function a(e){t[9].call(null,e)}let d={videoElement:t[2]};void 0!==t[3]&&(d.time=t[3]);const f=new bt({props:d});function p(e){t[16].call(null,e)}S.push(()=>Y(f,"time",a));let y={container:t[2],$$slots:{default:[Ct]},$$scope:{ctx:t}};void 0!==t[3]&&(y.time=t[3]);const w=new pt({props:y});function k(e){t[17].call(null,e)}S.push(()=>Y(w,"time",p));let E={context:20,videoElement:t[2]};void 0!==t[3]&&(E.time=t[3]);const z=new zt({props:E});return S.push(()=>Y(z,"time",k)),{c(){e=g("div"),H(f.$$.fragment),o=v(),H(w.$$.fragment),r=v(),H(z.$$.fragment),x(e,"class","video svelte-15dmtw6"),_(e,"seeking",t[4])},m(n,i){$(n,e,i),V(f,e,null),m(e,o),V(w,e,null),m(e,r),V(z,e,null),c=!0,l||(u=b(window,"keydown",t[7]),l=!0)},p(t,[o]){const r={};4&o&&(r.videoElement=t[2]),!n&&8&o&&(n=!0,r.time=t[3],P(()=>n=!1)),f.$set(r);const c={};4&o&&(c.container=t[2]),262271&o&&(c.$$scope={dirty:o,ctx:t}),!i&&8&o&&(i=!0,c.time=t[3],P(()=>i=!1)),w.$set(c);const l={};4&o&&(l.videoElement=t[2]),!s&&8&o&&(s=!0,l.time=t[3],P(()=>s=!1)),z.$set(l),16&o&&_(e,"seeking",t[4])},i(t){c||(X(f.$$.fragment,t),X(w.$$.fragment,t),X(z.$$.fragment,t),c=!0)},o(t){F(f.$$.fragment,t),F(w.$$.fragment,t),F(z.$$.fragment,t),c=!1},d(t){t&&h(e),G(f),G(w),G(z),l=!1,u()}}}function Rt(t,e,n){let o,i,r;s(t,$t,t=>n(5,o=t)),s(t,ct,t=>n(8,i=t)),s(t,mt,t=>n(6,r=t));let c,l,u,d=!0,f=0;return A(async()=>{l.addEventListener("progress",(function(){var t=this.buffered.end(0)/this.duration;console.log(t)}))}),t.$$.update=()=>{2&t.$$.dirty&&mt.setDuration(c),2&t.$$.dirty&&c&&(a(ct,i=Array(lt(c)).fill(null)),console.log("Total frames",lt(c)),console.log("Duration",c))},[d,c,l,f,u,o,r,async function(t){" "==t.key&&(n(0,d=!d),t.preventDefault()),"ArrowLeft"==t.key&&n(2,l.currentTime=f-1,l),"ArrowRight"==t.key&&n(2,l.currentTime=f+1,l),console.log(o),"q"==t.key&&(console.log("Increase rate"),$t.increase()),"a"==t.key&&$t.decrease()},i,function(t){f=t,n(3,f)},function(){f=this.currentTime,n(3,f)},function(){c=this.duration,n(1,c)},function(){u=this.seeking,n(4,u)},function(t){S[t?"unshift":"push"](()=>{n(2,l=t)})},function(){d=this.paused,n(0,d)},function(){o=this.playbackRate,$t.set(o)},function(t){f=t,n(3,f)},function(t){f=t,n(3,f)}]}class Tt extends Z{constructor(t){super(),Q(this,t,Rt,It,r,{})}}function Bt(t){let e,n,o,i;const r=t[4].default,s=c(r,t,t[3],null);return{c(){e=g("button"),s&&s.c(),x(e,"class","svelte-1w5w4em")},m(r,c){$(r,e,c),s&&s.m(e,null),n=!0,o||(i=b(e,"click",t[0]),o=!0)},p(t,[e]){s&&s.p&&8&e&&u(s,r,t,t[3],e,null,null)},i(t){n||(X(s,t),n=!0)},o(t){F(s,t),n=!1},d(t){t&&h(e),s&&s.d(t),o=!1,i()}}}function Pt(t,e,n){let{data:o}=e,{filename:i="untitled.json"}=e;let{$$slots:r={},$$scope:s}=e;return t.$set=t=>{"data"in t&&n(1,o=t.data),"filename"in t&&n(2,i=t.filename),"$$scope"in t&&n(3,s=t.$$scope)},[function(){!function(t,e){let n=document.createElement("a");n.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(e)),n.setAttribute("download",t),n.style.display="none",document.body.appendChild(n),n.click(),document.body.removeChild(n)}(i,JSON.stringify(o))},o,i,s,r]}class jt extends Z{constructor(t){super(),Q(this,t,Pt,Bt,r,{data:1,filename:2})}}function Dt(t){let e;return{c(){e=g("div"),e.innerHTML='<span class="svelte-37n9hx">Please enter video url</span>',x(e,"class","blocker svelte-37n9hx")},m(t,n){$(t,e,n)},d(t){t&&h(e)}}}function Lt(t){let e;return{c(){e=y("Download raw input")},m(t,n){$(t,e,n)},d(t){t&&h(e)}}}function qt(t){let e;return{c(){e=y("Download labels")},m(t,n){$(t,e,n)},d(t){t&&h(e)}}}function Ot(t){let e,n,i,r,s,c,l,u,a,d,f,p,k,E,z=Wt(t[1].src)+"",N=(t[0]||""==t[1].src)&&Dt();const A=new jt({props:{data:t[2],filename:"log.json",$$slots:{default:[Lt]},$$scope:{ctx:t}}}),M=new jt({props:{data:t[3],filename:"labels.json",$$slots:{default:[qt]},$$scope:{ctx:t}}});return{c(){e=g("header"),N&&N.c(),n=v(),i=g("h1"),r=y(z),s=v(),c=g("div"),l=g("div"),u=g("input"),d=v(),H(A.$$.fragment),f=v(),H(M.$$.fragment),x(i,"class","svelte-37n9hx"),x(u,"placeholder","Location of mp4 file"),x(u,"type","text"),u.value=a=t[1].src,x(u,"class","svelte-37n9hx"),x(l,"class","svelte-37n9hx"),_(l,"focus",t[0]||""==t[1].src),x(c,"class","buttons svelte-37n9hx"),x(e,"class","svelte-37n9hx")},m(o,a){$(o,e,a),N&&N.m(e,null),m(e,n),m(e,i),m(i,r),m(e,s),m(e,c),m(c,l),m(l,u),m(c,d),V(A,c,null),m(c,f),V(M,c,null),p=!0,k||(E=[b(u,"keypress",Xt),b(u,"focus",t[5]),b(u,"blur",t[6]),b(u,"input",t[4])],k=!0)},p(t,[o]){t[0]||""==t[1].src?N||(N=Dt(),N.c(),N.m(e,n)):N&&(N.d(1),N=null),(!p||2&o)&&z!==(z=Wt(t[1].src)+"")&&w(r,z),(!p||2&o&&a!==(a=t[1].src)&&u.value!==a)&&(u.value=a),3&o&&_(l,"focus",t[0]||""==t[1].src);const i={};4&o&&(i.data=t[2]),128&o&&(i.$$scope={dirty:o,ctx:t}),A.$set(i);const s={};8&o&&(s.data=t[3]),128&o&&(s.$$scope={dirty:o,ctx:t}),M.$set(s)},i(t){p||(X(A.$$.fragment,t),X(M.$$.fragment,t),p=!0)},o(t){F(A.$$.fragment,t),F(M.$$.fragment,t),p=!1},d(t){t&&h(e),N&&N.d(),G(A),G(M),k=!1,o(E)}}}function Wt(t){let e=t.split("/");return e[e.length-1]}function Xt(t){t.stopImmediatePropagation(),"Enter"==t.key&&t.target.blur(),"Escape"==t.key&&t.target.blur()}function Ft(t,e,n){let o,i,r;s(t,mt,t=>n(1,o=t)),s(t,st,t=>n(2,i=t)),s(t,ct,t=>n(3,r=t));let c=!0;return[c,o,i,r,function(t){let e=t.target.value;e!=o.src&&mt.setSrc(e)},()=>n(0,c=!0),()=>n(0,c=!1)]}class Jt extends Z{constructor(t){super(),Q(this,t,Ft,Ot,r,{})}}function Ut(e){let n,o,i,r;const s=new Jt({}),c=new Tt({});return{c(){n=g("main"),H(s.$$.fragment),o=v(),i=g("div"),H(c.$$.fragment),x(i,"class","speed"),x(n,"class","svelte-1e10v0r")},m(t,e){$(t,n,e),V(s,n,null),m(n,o),m(n,i),V(c,i,null),r=!0},p:t,i(t){r||(X(s.$$.fragment,t),X(c.$$.fragment,t),r=!0)},o(t){F(s.$$.fragment,t),F(c.$$.fragment,t),r=!1},d(t){t&&h(n),G(s),G(c)}}}function Yt(t,e,n){let{name:o}=e;return t.$set=t=>{"name"in t&&n(0,o=t.name)},[o]}return new class extends Z{constructor(t){super(),Q(this,t,Yt,Ut,r,{name:0})}}({target:document.body,props:{name:"Video Annotator"}})}();
//# sourceMappingURL=bundle.js.map