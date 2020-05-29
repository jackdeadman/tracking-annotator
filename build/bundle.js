var app=function(){"use strict";function t(){}const e=t=>t;function n(t){return t()}function i(){return Object.create(null)}function o(t){t.forEach(n)}function s(t){return"function"==typeof t}function r(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(e,n,i){e.$$.on_destroy.push(function(e,...n){if(null==e)return t;const i=e.subscribe(...n);return i.unsubscribe?()=>i.unsubscribe():i}(n,i))}function l(t,e,n,i){if(t){const o=u(t,e,n,i);return t[0](o)}}function u(t,e,n,i){return t[1]&&i?function(t,e){for(const n in e)t[n]=e[n];return t}(n.ctx.slice(),t[1](i(e))):n.ctx}function a(t,e,n,i,o,s,r){const c=function(t,e,n,i){if(t[2]&&i){const o=t[2](i(n));if(void 0===e.dirty)return o;if("object"==typeof o){const t=[],n=Math.max(e.dirty.length,o.length);for(let i=0;i<n;i+=1)t[i]=e.dirty[i]|o[i];return t}return e.dirty|o}return e.dirty}(e,i,o,s);if(c){const o=u(e,n,i,r);t.p(o,c)}}function d(t,e,n=e){return t.set(n),e}const f="undefined"!=typeof window;let p=f?()=>window.performance.now():()=>Date.now(),m=f?t=>requestAnimationFrame(t):t;const h=new Set;function $(t){h.forEach(e=>{e.c(t)||(h.delete(e),e.f())}),0!==h.size&&m($)}function g(t){let e;return 0===h.size&&m($),{promise:new Promise(n=>{h.add(e={c:t,f:n})}),abort(){h.delete(e)}}}function v(t,e){t.appendChild(e)}function y(t,e,n){t.insertBefore(e,n||null)}function x(t){t.parentNode.removeChild(t)}function b(t){return document.createElement(t)}function w(t){return document.createTextNode(t)}function k(){return w(" ")}function _(){return w("")}function E(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function C(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function R(t,e){e=""+e,t.data!==e&&(t.data=e)}function N(t,e,n,i){t.style.setProperty(e,n,i?"important":"")}let M;function S(){if(void 0===M){M=!1;try{"undefined"!=typeof window&&window.parent&&window.parent.document}catch(t){M=!0}}return M}function A(t,e,n){t.classList[n?"add":"remove"](e)}const B=new Set;let I,T=0;function D(t,e,n,i,o,s,r,c=0){const l=16.666/i;let u="{\n";for(let t=0;t<=1;t+=l){const i=e+(n-e)*s(t);u+=100*t+`%{${r(i,1-i)}}\n`}const a=u+`100% {${r(n,1-n)}}\n}`,d=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(a)}_${c}`,f=t.ownerDocument;B.add(f);const p=f.__svelte_stylesheet||(f.__svelte_stylesheet=f.head.appendChild(b("style")).sheet),m=f.__svelte_rules||(f.__svelte_rules={});m[d]||(m[d]=!0,p.insertRule(`@keyframes ${d} ${a}`,p.cssRules.length));const h=t.style.animation||"";return t.style.animation=`${h?h+", ":""}${d} ${i}ms linear ${o}ms 1 both`,T+=1,d}function P(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")),o=n.length-i.length;o&&(t.style.animation=i.join(", "),T-=o,T||m(()=>{T||(B.forEach(t=>{const e=t.__svelte_stylesheet;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.__svelte_rules={}}),B.clear())}))}function j(t){I=t}function L(){if(!I)throw new Error("Function called outside component initialization");return I}function O(t){L().$$.on_mount.push(t)}const z=[],q=[],X=[],F=[],W=Promise.resolve();let Y=!1;function J(t){X.push(t)}function U(t){F.push(t)}let H=!1;const V=new Set;function G(){if(!H){H=!0;do{for(let t=0;t<z.length;t+=1){const e=z[t];j(e),K(e.$$)}for(z.length=0;q.length;)q.pop()();for(let t=0;t<X.length;t+=1){const e=X[t];V.has(e)||(V.add(e),e())}X.length=0}while(z.length);for(;F.length;)F.pop()();Y=!1,H=!1,V.clear()}}function K(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(J)}}let Q;function Z(){return Q||(Q=Promise.resolve(),Q.then(()=>{Q=null})),Q}function tt(t,e,n){t.dispatchEvent(function(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}(`${e?"intro":"outro"}${n}`))}const et=new Set;let nt;function it(){nt={r:0,c:[],p:nt}}function ot(){nt.r||o(nt.c),nt=nt.p}function st(t,e){t&&t.i&&(et.delete(t),t.i(e))}function rt(t,e,n,i){if(t&&t.o){if(et.has(t))return;et.add(t),nt.c.push(()=>{et.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}}const ct={duration:0};function lt(n,i,o){let r,c,l=i(n,o),u=!1,a=0;function d(){r&&P(n,r)}function f(){const{delay:i=0,duration:o=300,easing:s=e,tick:f=t,css:m}=l||ct;m&&(r=D(n,0,1,o,i,s,m,a++)),f(0,1);const h=p()+i,$=h+o;c&&c.abort(),u=!0,J(()=>tt(n,!0,"start")),c=g(t=>{if(u){if(t>=$)return f(1,0),tt(n,!0,"end"),d(),u=!1;if(t>=h){const e=s((t-h)/o);f(e,1-e)}}return u})}let m=!1;return{start(){m||(P(n),s(l)?(l=l(),Z().then(f)):f())},invalidate(){m=!1},end(){u&&(d(),u=!1)}}}function ut(n,i,r){let c,l=i(n,r),u=!0;const a=nt;function d(){const{delay:i=0,duration:s=300,easing:r=e,tick:d=t,css:f}=l||ct;f&&(c=D(n,1,0,s,i,r,f));const m=p()+i,h=m+s;J(()=>tt(n,!1,"start")),g(t=>{if(u){if(t>=h)return d(0,1),tt(n,!1,"end"),--a.r||o(a.c),!1;if(t>=m){const e=r((t-m)/s);d(1-e,e)}}return u})}return a.r+=1,s(l)?Z().then(()=>{l=l(),d()}):d(),{end(t){t&&l.tick&&l.tick(1,0),u&&(c&&P(n,c),u=!1)}}}function at(t,e){t.d(1),e.delete(t.key)}function dt(t,e,n){const i=t.$$.props[e];void 0!==i&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function ft(t){t&&t.c()}function pt(t,e,i){const{fragment:r,on_mount:c,on_destroy:l,after_update:u}=t.$$;r&&r.m(e,i),J(()=>{const e=c.map(n).filter(s);l?l.push(...e):o(e),t.$$.on_mount=[]}),u.forEach(J)}function mt(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function ht(t,e){-1===t.$$.dirty[0]&&(z.push(t),Y||(Y=!0,W.then(G)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function $t(e,n,s,r,c,l,u=[-1]){const a=I;j(e);const d=n.props||{},f=e.$$={fragment:null,ctx:null,props:l,update:t,not_equal:c,bound:i(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(a?a.$$.context:[]),callbacks:i(),dirty:u};let p=!1;if(f.ctx=s?s(e,d,(t,n,...i)=>{const o=i.length?i[0]:n;return f.ctx&&c(f.ctx[t],f.ctx[t]=o)&&(f.bound[t]&&f.bound[t](o),p&&ht(e,t)),n}):[],f.update(),p=!0,o(f.before_update),f.fragment=!!r&&r(f.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);f.fragment&&f.fragment.l(t),t.forEach(x)}else f.fragment&&f.fragment.c();n.intro&&st(e.$$.fragment),pt(e,n.target,n.anchor),G()}j(a)}class gt{$destroy(){mt(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}function vt(t){let e;return{c(){e=b("div"),N(e,"transform","translate("+t[2].x+"px, "+t[2].y+"px) scale("+t[3]+")"),C(e,"class","svelte-1eavhw6"),A(e,"pressed",t[0]),A(e,"scrubbing",t[1])},m(t,n){y(t,e,n)},p(t,n){12&n&&N(e,"transform","translate("+t[2].x+"px, "+t[2].y+"px) scale("+t[3]+")"),1&n&&A(e,"pressed",t[0]),2&n&&A(e,"scrubbing",t[1])},d(t){t&&x(e)}}}function yt(e){let n,i=e[2]&&vt(e);return{c(){i&&i.c(),n=_()},m(t,e){i&&i.m(t,e),y(t,n,e)},p(t,[e]){t[2]?i?i.p(t,e):(i=vt(t),i.c(),i.m(n.parentNode,n)):i&&(i.d(1),i=null)},i:t,o:t,d(t){i&&i.d(t),t&&x(n)}}}function xt(t,e,n){let i,o,s,{position:r}=e,{container:c}=e,{pressed:l}=e,{scrubbing:u}=e;return t.$set=t=>{"position"in t&&n(4,r=t.position),"container"in t&&n(5,c=t.container),"pressed"in t&&n(0,l=t.pressed),"scrubbing"in t&&n(1,u=t.scrubbing)},t.$$.update=()=>{16&t.$$.dirty&&n(2,i=function(t){return c?(o=c.getBoundingClientRect(),{x:t.x*o.width-10,y:t.y*o.height-10}):t}(r)),1&t.$$.dirty&&n(3,s=l?1.2:1)},[l,u,i,s,r,c]}class bt extends gt{constructor(t){super(),$t(this,t,xt,yt,r,{position:4,container:5,pressed:0,scrubbing:1})}}const wt=[];function kt(e,n=t){let i;const o=[];function s(t){if(r(e,t)&&(e=t,i)){const t=!wt.length;for(let t=0;t<o.length;t+=1){const n=o[t];n[1](),wt.push(n,e)}if(t){for(let t=0;t<wt.length;t+=2)wt[t][0](wt[t+1]);wt.length=0}}}return{set:s,update:function(t){s(t(e))},subscribe:function(r,c=t){const l=[r,c];return o.push(l),1===o.length&&(i=n(s)||t),r(e),()=>{const t=o.indexOf(l);-1!==t&&o.splice(t,1),0===o.length&&(i(),i=null)}}}}const _t=function(){const{subscribe:t,set:e,update:n}=kt([]);return{subscribe:t,add:t=>n(e=>[...e,t]),reset:()=>e([])}}(),Et=kt([]);function Ct(t){return Math.round(15*t)}function Rt(t){let e;const n=new bt({props:{position:t[1],pressed:t[2],container:t[0],scrubbing:t[3]}});return{c(){ft(n.$$.fragment)},m(t,i){pt(n,t,i),e=!0},p(t,e){const i={};2&e&&(i.position=t[1]),4&e&&(i.pressed=t[2]),1&e&&(i.container=t[0]),8&e&&(i.scrubbing=t[3]),n.$set(i)},i(t){e||(st(n.$$.fragment,t),e=!0)},o(t){rt(n.$$.fragment,t),e=!1},d(t){mt(n,t)}}}function Nt(t){let e,n,i,r,c,u,d,f=t[4]&&Rt(t);const p=t[16].default,m=l(p,t,t[15],null);return{c(){e=b("div"),n=b("div"),f&&f.c(),i=k(),r=b("div"),m&&m.c(),C(r,"class","inner svelte-1h3ku8q"),C(n,"class","video svelte-1h3ku8q"),C(e,"class","main svelte-1h3ku8q")},m(o,l){var a;y(o,e,l),v(e,n),f&&f.m(n,null),v(n,i),v(n,r),m&&m.m(r,null),t[17](r),c=!0,u||(d=[E(window,"keydown",t[8]),E(window,"keyup",t[9]),E(window,"mousemove",t[5]),E(window,"mouseup",t[6]),E(e,"mousedown",t[7]),E(e,"contextmenu",(a=Mt,function(t){return t.preventDefault(),a.call(this,t)})),E(e,"mouseleave",t[18]),E(e,"mouseenter",(function(){s(t[4]=!0)&&(t[4]=!0).apply(this,arguments)}))],u=!0)},p(e,[o]){(t=e)[4]?f?(f.p(t,o),16&o&&st(f,1)):(f=Rt(t),f.c(),st(f,1),f.m(n,i)):f&&(it(),rt(f,1,1,()=>{f=null}),ot()),m&&m.p&&32768&o&&a(m,p,t,t[15],o,null,null)},i(t){c||(st(f),st(m,t),c=!0)},o(t){rt(f),rt(m,t),c=!1},d(n){n&&x(e),f&&f.d(),m&&m.d(n),t[17](null),u=!1,o(d)}}}function Mt(){return!1}function St(t,e,n){let i,o;c(t,Et,t=>n(13,i=t));let s,r,l,{container:u}=e,a=!1,f=0,{time:p}=e;function m(t){let e=u.getBoundingClientRect(),n=t.x-e.left,i=t.y-e.top;return{x:n/e.width,y:i/e.height}}let{$$slots:h={},$$scope:$}=e;return t.$set=t=>{"container"in t&&n(0,u=t.container),"time"in t&&n(10,p=t.time),"$$scope"in t&&n(15,$=t.$$scope)},[u,o,s,a,r,function(t){n(1,o=m({x:t.clientX,y:t.clientY})),s&&d(Et,i[Ct(p)]={...o,track:f,time:p},i),a&&d(Et,i[Ct(p)]="deleted",i),(s||a)&&_t.add({...o,time:p,track:f,left:s,right:a})},function(t){n(2,s=!1),n(1,o=m({x:t.clientX,y:t.clientY})),clearInterval(l),l=null,n(3,a=!1)},function(t){1==t.buttons&&(n(2,s=!0),n(3,a=!1),f+=1),2==t.buttons&&(n(2,s=!1),n(3,a=!0)),l=setInterval(()=>{s&&d(Et,i[Ct(p)]={...o,track:f,time:p},i),a&&d(Et,i[Ct(p)]="deleted",i),_t.add({...o,time:p,track:f,left:s,right:a})},25)},function(t){console.log(t.key),"Backspace"===t.key&&(n(3,a=!0),n(2,s=!1),l||(l=setInterval(()=>{a&&d(Et,i[Ct(p)]="deleted",i),_t.add({...o,time:p,track:f,left:s,right:a})},25)))},function(t){"Backspace"===t.key&&(n(3,a=!1),clearInterval(l),l=null)},p,f,l,i,m,$,h,function(t){q[t?"unshift":"push"](()=>{n(0,u=t)})},()=>n(4,r=!1)]}class At extends gt{constructor(t){super(),$t(this,t,St,Nt,r,{container:0,time:10})}}const Bt=function(){const{subscribe:t,set:e,update:n}=kt({rate:1,src:"https://github.com/intel-iot-devkit/sample-videos/blob/master/people-detection.mp4?raw=true",duration:0});return{subscribe:t,play:()=>n(t=>({...t,rate:1})),pause:()=>n(t=>({...t,rate:0})),setDuration:t=>n(e=>({...e,duration:t})),setSrc:t=>n(e=>({...e,src:t}))}}(),It=function(){const{subscribe:t,set:e,update:n}=kt(1);return{subscribe:t,increase:()=>n(t=>Math.min(t+.5,4)),decrease:()=>n(t=>Math.max(t-.5,1)),set:e}}();function Tt(t){return"[object Date]"===Object.prototype.toString.call(t)}function Dt(t,e={}){const n=kt(t),{stiffness:i=.15,damping:o=.8,precision:s=.01}=e;let r,c,l,u=t,a=t,d=1,f=0,m=!1;function h(e,i={}){a=e;const o=l={};if(null==t||i.hard||$.stiffness>=1&&$.damping>=1)return m=!0,r=p(),u=e,n.set(t=a),Promise.resolve();if(i.soft){const t=!0===i.soft?.5:+i.soft;f=1/(60*t),d=0}return c||(r=p(),m=!1,c=g(e=>{if(m)return m=!1,c=null,!1;d=Math.min(d+f,1);const i={inv_mass:d,opts:$,settled:!0,dt:60*(e-r)/1e3},o=function t(e,n,i,o){if("number"==typeof i||Tt(i)){const t=o-i,s=(i-n)/(e.dt||1/60),r=(s+(e.opts.stiffness*t-e.opts.damping*s)*e.inv_mass)*e.dt;return Math.abs(r)<e.opts.precision&&Math.abs(t)<e.opts.precision?o:(e.settled=!1,Tt(i)?new Date(i.getTime()+r):i+r)}if(Array.isArray(i))return i.map((s,r)=>t(e,n[r],i[r],o[r]));if("object"==typeof i){const s={};for(const r in i)s[r]=t(e,n[r],i[r],o[r]);return s}throw new Error(`Cannot spring ${typeof i} values`)}(i,u,t,a);return r=e,u=t,n.set(t=o),i.settled&&(c=null),!i.settled})),new Promise(t=>{c.promise.then(()=>{o===l&&t()})})}const $={set:h,update:(e,n)=>h(e(a,t),n),subscribe:n.subscribe,stiffness:i,damping:o,precision:s};return $}function Pt(t,{delay:n=0,duration:i=400,easing:o=e}){const s=+getComputedStyle(t).opacity;return{delay:n,duration:i,easing:o,css:t=>"opacity: "+t*s}}function jt(t){let e,n,i,o,s,r,c=Ot(t[5].x/t[0].getBoundingClientRect().width*t[4].duration)+"";return{c(){e=b("div"),n=b("span"),i=w(c),C(n,"class","svelte-1sgtn0h"),C(e,"class","clock svelte-1sgtn0h"),N(e,"left",t[5].x/t[0].getBoundingClientRect().width*100+"%")},m(t,o){y(t,e,o),v(e,n),v(n,i),r=!0},p(t,n){(!r||49&n)&&c!==(c=Ot(t[5].x/t[0].getBoundingClientRect().width*t[4].duration)+"")&&R(i,c),(!r||33&n)&&N(e,"left",t[5].x/t[0].getBoundingClientRect().width*100+"%")},i(t){r||(J(()=>{s&&s.end(1),o||(o=lt(e,Pt,{duration:200})),o.start()}),r=!0)},o(t){o&&o.invalidate(),s=ut(e,Pt,{duration:200}),r=!1},d(t){t&&x(e),t&&s&&s.end()}}}function Lt(t){let e,n,i,s,r,c,l,u,a,d,f,p=t[0]&&t[1]&&jt(t);return{c(){e=k(),p&&p.c(),n=k(),i=b("div"),s=b("div"),r=k(),c=b("canvas"),C(s,"class","inner svelte-1sgtn0h"),N(s,"width",100*t[2]+"%"),C(c,"height",l=1),C(c,"width",u=1920),C(c,"class","svelte-1sgtn0h"),C(i,"class","outer svelte-1sgtn0h")},m(o,l){y(o,e,l),p&&p.m(o,l),y(o,n,l),y(o,i,l),v(i,s),v(i,r),v(i,c),t[14](c),t[15](i),a=!0,d||(f=[E(window,"mousemove",t[13]),E(document.body,"click",t[7]),E(i,"mouseleave",t[16]),E(i,"mouseenter",t[17])],d=!0)},p(t,[e]){t[0]&&t[1]?p?(p.p(t,e),3&e&&st(p,1)):(p=jt(t),p.c(),st(p,1),p.m(n.parentNode,n)):p&&(it(),rt(p,1,1,()=>{p=null}),ot()),(!a||4&e)&&N(s,"width",100*t[2]+"%")},i(t){a||(st(p),a=!0)},o(t){rt(p),a=!1},d(s){s&&x(e),p&&p.d(s),s&&x(n),s&&x(i),t[14](null),t[15](null),d=!1,o(f)}}}function Ot(t){if(isNaN(t))return"...";const e=Math.floor(t/60);return(t=Math.floor(t%60))<10&&(t="0"+t),`${e}:${t}`}function zt(t,e,n){let i,o,s;c(t,Bt,t=>n(4,i=t)),c(t,Et,t=>n(12,o=t));let r,l=Dt({x:50,y:50},{stiffness:.5,damping:.95});c(t,l,t=>n(5,s=t));let u=!1,{videoElement:a}=e,{time:d}=e;let f,p,m=0,h=[];var $;O(()=>{f=p.getContext("2d")}),$=()=>{if(p){f.clearRect(0,0,1920,1);var t=f.getImageData(0,0,1920,1);h.forEach(e=>{let n=e.index/o.length,i=Math.round(1920*n);var s,r,c,l,u;s=255,r=255,c=255,l=255,u=4*(i+0),t.data[u+0]=s,t.data[u+1]=r,t.data[u+2]=c,t.data[u+3]=l}),f.putImageData(t,0,0)}},L().$$.after_update.push($);return t.$set=t=>{"videoElement"in t&&n(8,a=t.videoElement),"time"in t&&n(9,d=t.time)},t.$$.update=()=>{528&t.$$.dirty&&i.duration&&n(2,m=d/i.duration),4096&t.$$.dirty&&(h=o.map((t,e)=>({index:e,hasPosition:null!=t&&"deleted"!=t})).filter(({hasPosition:t})=>t))},[r,u,m,p,i,s,l,async function(t){if(t.target==r){let e=r.getBoundingClientRect(),o=(t.clientX-e.left)/e.width;console.log("String: ",(o*i.duration).toString()),n(8,a.currentTime=(o*i.duration).toString(),a),console.log(a.currentTime)}},a,d,h,f,o,t=>l.set({x:t.clientX-r.getBoundingClientRect().x,y:t.clientY}),function(t){q[t?"unshift":"push"](()=>{n(3,p=t)})},function(t){q[t?"unshift":"push"](()=>{n(0,r=t)})},()=>n(1,u=!1),()=>n(1,u=!0)]}class qt extends gt{constructor(t){super(),$t(this,t,zt,Lt,r,{videoElement:8,time:9})}}function Xt(t,e,n){const i=t.slice();return i[24]=e[n],i}function Ft(t){let e,n,i,o,s,r,c=Jt(t[8](t[6].x))+"";return{c(){e=b("div"),n=b("span"),i=w(c),C(e,"class","clock svelte-xocd95"),N(e,"left",t[6].x/t[2].getBoundingClientRect().width*100+"%")},m(t,o){y(t,e,o),v(e,n),v(n,i),r=!0},p(t,n){(!r||64&n)&&c!==(c=Jt(t[8](t[6].x))+"")&&R(i,c),(!r||68&n)&&N(e,"left",t[6].x/t[2].getBoundingClientRect().width*100+"%")},i(t){r||(J(()=>{s&&s.end(1),o||(o=lt(e,Pt,{duration:200})),o.start()}),r=!0)},o(t){o&&o.invalidate(),s=ut(e,Pt,{duration:200}),r=!1},d(t){t&&x(e),t&&s&&s.end()}}}function Wt(t,e){let n;return{key:t,first:null,c(){n=b("div"),C(n,"class","point svelte-xocd95"),N(n,"transform","translate("+e[24].position*e[5]/100+"px, -50%)"),this.first=n},m(t,e){y(t,n,e)},p(t,e){48&e&&N(n,"transform","translate("+t[24].position*t[5]/100+"px, -50%)")},d(t){t&&x(n)}}}function Yt(t){let e,n,i,s,r,c,l,u,a,d,f,p,m,h,$,g,_,M,A=Jt(t[0])+"",B=[],I=new Map,T=t[2]&&t[1]&&Ft(t),D=t[4];const P=t=>t[24].index;for(let e=0;e<D.length;e+=1){let n=Xt(t,D,e),i=P(n);I.set(i,B[e]=Wt(i,n))}return{c(){e=k(),n=b("div"),i=w(A),s=k(),r=b("div"),c=b("div"),l=k(),u=b("div"),a=k(),T&&T.c(),d=k();for(let t=0;t<B.length;t+=1)B[t].c();f=k(),p=b("div"),p.textContent="-5",m=k(),h=b("div"),h.textContent="+5",C(n,"class","time svelte-xocd95"),C(c,"class","inner svelte-xocd95"),N(c,"width","100%"),C(u,"class","centre svelte-xocd95"),C(p,"class","left svelte-xocd95"),C(h,"class","right svelte-xocd95"),C(r,"class","outer svelte-xocd95"),J(()=>t[21].call(r))},m(o,w){y(o,e,w),y(o,n,w),v(n,i),y(o,s,w),y(o,r,w),v(r,c),t[19](c),v(r,l),v(r,u),v(r,a),T&&T.m(r,null),v(r,d);for(let t=0;t<B.length;t+=1)B[t].m(r,null);v(r,f),v(r,p),v(r,m),v(r,h),t[20](r),$=function(t,e){const n=getComputedStyle(t),i=(parseInt(n.zIndex)||0)-1;"static"===n.position&&(t.style.position="relative");const o=b("iframe");o.setAttribute("style",`display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: ${i};`),o.setAttribute("aria-hidden","true"),o.tabIndex=-1;const s=S();let r;return s?(o.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",r=E(window,"message",t=>{t.source===o.contentWindow&&e()})):(o.src="about:blank",o.onload=()=>{r=E(o.contentWindow,"resize",e)}),v(t,o),()=>{(s||r&&o.contentWindow)&&r(),x(o)}}(r,t[21].bind(r)),g=!0,_||(M=[E(window,"mousemove",t[18]),E(document.body,"click",t[9]),E(r,"mouseleave",t[22]),E(r,"mouseenter",t[23])],_=!0)},p(t,[e]){if((!g||1&e)&&A!==(A=Jt(t[0])+"")&&R(i,A),t[2]&&t[1]?T?(T.p(t,e),6&e&&st(T,1)):(T=Ft(t),T.c(),st(T,1),T.m(r,d)):T&&(it(),rt(T,1,1,()=>{T=null}),ot()),48&e){const n=t[4];B=function(t,e,n,i,o,s,r,c,l,u,a,d){let f=t.length,p=s.length,m=f;const h={};for(;m--;)h[t[m].key]=m;const $=[],g=new Map,v=new Map;for(m=p;m--;){const t=d(o,s,m),c=n(t);let l=r.get(c);l?i&&l.p(t,e):(l=u(c,t),l.c()),g.set(c,$[m]=l),c in h&&v.set(c,Math.abs(m-h[c]))}const y=new Set,x=new Set;function b(t){st(t,1),t.m(c,a),r.set(t.key,t),a=t.first,p--}for(;f&&p;){const e=$[p-1],n=t[f-1],i=e.key,o=n.key;e===n?(a=e.first,f--,p--):g.has(o)?!r.has(i)||y.has(i)?b(e):x.has(o)?f--:v.get(i)>v.get(o)?(x.add(i),b(e)):(y.add(o),f--):(l(n,r),f--)}for(;f--;){const e=t[f];g.has(e.key)||l(e,r)}for(;p;)b($[p-1]);return $}(B,e,P,1,t,n,I,r,at,Wt,f,Xt)}},i(t){g||(st(T),g=!0)},o(t){rt(T),g=!1},d(i){i&&x(e),i&&x(n),i&&x(s),i&&x(r),t[19](null),T&&T.d();for(let t=0;t<B.length;t+=1)B[t].d();t[20](null),$(),_=!1,o(M)}}}function Jt(t){if(t<0)return"0:00";if(isNaN(t))return"...";let e=t-parseInt(t);e=(Math.round(100*e)/100).toString(),e=e.slice(2);const n=Math.floor(t/60);return(t=Math.floor(t%60))<10&&(t="0"+t),`${n}:${t}.${e}`}function Ut(t,e,n){let i,o,s;c(t,Bt,t=>n(14,i=t)),c(t,Et,t=>n(15,o=t));let r,l,u=!1,a=Dt({x:50,y:50},{stiffness:.5,damping:.95});c(t,a,t=>n(6,s=t));let{videoElement:d}=e,{time:f}=e,{context:p=5}=e,m=f;let h,$=0;function g(t,e){return 100*((function(t){return t/15}(t)-e)/p+.5)}let v=[];var y;let x;O(()=>{h=setInterval(()=>{if(i.paused)return;let t=o.map((t,e)=>({...t,index:e,hasPosition:null!=t&&"deleted"!=t,position:g(e,f)})).filter(({hasPosition:t,position:e})=>t&&e>=0&&e<=100);n(4,v=t)},20)}),y=()=>{clearInterval(h)},L().$$.on_destroy.push(y);return t.$set=t=>{"videoElement"in t&&n(10,d=t.videoElement),"time"in t&&n(0,f=t.time),"context"in t&&n(11,p=t.context)},t.$$.update=()=>{16385&t.$$.dirty&&i.duration&&($=f/i.duration)},[f,u,r,l,v,x,s,a,function(t){let e=t/l.getBoundingClientRect().width*p-p/2;return d.currentTime+e},async function(t){if(t.target==l){let e=l.getBoundingClientRect(),i=(t.clientX-e.left)/e.width*p-p/2;n(10,d.currentTime+=i,d)}},d,p,$,h,i,o,m,g,t=>a.set({x:t.clientX-l.getBoundingClientRect().x,y:t.clientY}),function(t){q[t?"unshift":"push"](()=>{n(2,r=t)})},function(t){q[t?"unshift":"push"](()=>{n(3,l=t)})},function(){x=this.clientWidth,n(5,x)},()=>n(1,u=!1),()=>n(1,u=!0)]}class Ht extends gt{constructor(t){super(),$t(this,t,Ut,Yt,r,{videoElement:10,time:0,context:11})}}function Vt(t){let e,n,i;return{c(){e=b("div"),C(e,"class","point svelte-4t8lej"),N(e,"transform","translate("+t[2](t[1]).x+"px, "+t[2](t[1]).y+"px)")},m(t,n){y(t,e,n),i=!0},p(t,n){(!i||2&n)&&N(e,"transform","translate("+t[2](t[1]).x+"px, "+t[2](t[1]).y+"px)")},i(t){i||(n&&n.end(1),i=!0)},o(t){n=ut(e,Pt,{duration:100}),i=!1},d(t){t&&x(e),t&&n&&n.end()}}}function Gt(t){let e,n,i,o,s,r=JSON.stringify(t[1])+"",c=t[1]&&"deleted"!==t[1]&&Vt(t);return{c(){c&&c.c(),e=k(),n=w(t[0]),i=k(),o=w(r)},m(t,r){c&&c.m(t,r),y(t,e,r),y(t,n,r),y(t,i,r),y(t,o,r),s=!0},p(t,[i]){t[1]&&"deleted"!==t[1]?c?(c.p(t,i),2&i&&st(c,1)):(c=Vt(t),c.c(),st(c,1),c.m(e.parentNode,e)):c&&(it(),rt(c,1,1,()=>{c=null}),ot()),(!s||1&i)&&R(n,t[0]),(!s||2&i)&&r!==(r=JSON.stringify(t[1])+"")&&R(o,r)},i(t){s||(st(c),s=!0)},o(t){rt(c),s=!1},d(t){c&&c.d(t),t&&x(e),t&&x(n),t&&x(i),t&&x(o)}}}function Kt(t,e,n){let i;c(t,Et,t=>n(5,i=t));let o,s,{time:r}=e,{container:l}=e;return t.$set=t=>{"time"in t&&n(3,r=t.time),"container"in t&&n(4,l=t.container)},t.$$.update=()=>{8&t.$$.dirty&&n(0,o=Ct(r)),40&t.$$.dirty&&n(1,s=i[Ct(r)])},[o,s,function(t){if(!l)return t;let e=l.getBoundingClientRect();return{x:t.x*e.width-5,y:t.y*e.height-5}},r,l]}class Qt extends gt{constructor(t){super(),$t(this,t,Kt,Gt,r,{time:3,container:4})}}function Zt(t){let e;return{c(){e=b("div"),e.textContent="Failed to load video.",C(e,"class","error svelte-1mkwhif")},m(t,n){y(t,e,n)},d(t){t&&x(e)}}}function te(t){let e;const n=new Qt({props:{container:t[2],time:t[3]}});return{c(){ft(n.$$.fragment)},m(t,i){pt(n,t,i),e=!0},p(t,e){const i={};4&e&&(i.container=t[2]),8&e&&(i.time=t[3]),n.$set(i)},i(t){e||(st(n.$$.fragment,t),e=!0)},o(t){rt(n.$$.fragment,t),e=!1},d(t){mt(n,t)}}}function ee(t){let e,n,i,s,r,c,l,u,a,d=!1,f=!0;function p(){cancelAnimationFrame(i),e.paused||(i=m(p),d=!0),t[12].call(e)}let h=t[5]&&Zt(),$=t[6]&&!t[5]&&te(t);return{c(){e=b("video"),s=k(),h&&h.c(),r=k(),$&&$.c(),c=_(),e.src!==(n=t[8].src)&&C(e,"src",n),C(e,"preload",""),C(e,"class","svelte-1mkwhif"),void 0===t[1]&&J(()=>t[13].call(e))},m(n,i){y(n,e,i),t[14](e),isNaN(t[7])||(e.playbackRate=t[7]),y(n,s,i),h&&h.m(n,i),y(n,r,i),$&&$.m(n,i),y(n,c,i),l=!0,u||(a=[E(e,"timeupdate",p),E(e,"durationchange",t[13]),E(e,"play",t[15]),E(e,"pause",t[15]),E(e,"ratechange",t[16])],u=!0)},p(t,i){(!l||256&i&&e.src!==(n=t[8].src))&&C(e,"src",n),!d&&8&i&&!isNaN(t[3])&&(e.currentTime=t[3]),d=!1,1&i&&f!==(f=t[0])&&e[f?"pause":"play"](),128&i&&!isNaN(t[7])&&(e.playbackRate=t[7]),t[5]?h||(h=Zt(),h.c(),h.m(r.parentNode,r)):h&&(h.d(1),h=null),t[6]&&!t[5]?$?($.p(t,i),96&i&&st($,1)):($=te(t),$.c(),st($,1),$.m(c.parentNode,c)):$&&(it(),rt($,1,1,()=>{$=null}),ot())},i(t){l||(st($),l=!0)},o(t){rt($),l=!1},d(n){n&&x(e),t[14](null),n&&x(s),h&&h.d(n),n&&x(r),$&&$.d(n),n&&x(c),u=!1,o(a)}}}function ne(t){let e,n,i,o,s,r,c,l,u,a,d,f,p;function m(e){t[11].call(null,e)}let h={videoElement:t[2]};void 0!==t[3]&&(h.time=t[3]);const $=new qt({props:h});function g(e){t[17].call(null,e)}q.push(()=>dt($,"time",m));let _={container:t[2],$$slots:{default:[ee]},$$scope:{ctx:t}};void 0!==t[3]&&(_.time=t[3]);const N=new At({props:_});function M(e){t[18].call(null,e)}q.push(()=>dt(N,"time",g));let S={context:10,videoElement:t[2]};void 0!==t[3]&&(S.time=t[3]);const B=new Ht({props:S});return q.push(()=>dt(B,"time",M)),{c(){e=b("div"),ft($.$$.fragment),i=k(),ft(N.$$.fragment),s=k(),r=b("div"),c=w(t[7]),l=w("x"),u=k(),ft(B.$$.fragment),C(r,"class","speed svelte-1mkwhif"),C(e,"class","video svelte-1mkwhif"),A(e,"seeking",t[4])},m(n,o){y(n,e,o),pt($,e,null),v(e,i),pt(N,e,null),v(e,s),v(e,r),v(r,c),v(r,l),v(e,u),pt(B,e,null),d=!0,f||(p=E(window,"keydown",t[9]),f=!0)},p(t,[i]){const s={};4&i&&(s.videoElement=t[2]),!n&&8&i&&(n=!0,s.time=t[3],U(()=>n=!1)),$.$set(s);const r={};4&i&&(r.container=t[2]),524783&i&&(r.$$scope={dirty:i,ctx:t}),!o&&8&i&&(o=!0,r.time=t[3],U(()=>o=!1)),N.$set(r),(!d||128&i)&&R(c,t[7]);const l={};4&i&&(l.videoElement=t[2]),!a&&8&i&&(a=!0,l.time=t[3],U(()=>a=!1)),B.$set(l),16&i&&A(e,"seeking",t[4])},i(t){d||(st($.$$.fragment,t),st(N.$$.fragment,t),st(B.$$.fragment,t),d=!0)},o(t){rt($.$$.fragment,t),rt(N.$$.fragment,t),rt(B.$$.fragment,t),d=!1},d(t){t&&x(e),mt($),mt(N),mt(B),f=!1,p()}}}function ie(t,e,n){let i,o,s;c(t,It,t=>n(7,i=t)),c(t,Et,t=>n(10,o=t)),c(t,Bt,t=>n(8,s=t));let r,l,u=!0,a=0,f=!1;let p=!1,m=!1;return O(()=>{l.addEventListener("error",()=>{n(5,p=!0),n(6,m=!1)}),l.addEventListener("seeking",t=>{n(4,f=t.target.currentTime!==a)}),l.addEventListener("seeked",t=>{n(4,f=!1)}),l.addEventListener("loadeddata",()=>{n(6,m=!0),n(5,p=!1)})}),t.$$.update=()=>{2&t.$$.dirty&&Bt.setDuration(r),2&t.$$.dirty&&r&&d(Et,o=Array(Ct(r)).fill(null))},[u,r,l,a,f,p,m,i,s,async function(t){if(console.log(document.activeElement),"INPUT"!=document.activeElement.nodeName){if(" "==t.key){if(u){let t=i;d(It,i=.1),l.play(),setTimeout(()=>d(It,i=t),200)}else l.pause();t.preventDefault()}"ArrowLeft"==t.key&&n(2,l.currentTime=a-1,l),"ArrowRight"==t.key&&n(2,l.currentTime=a+1,l),"q"==t.key&&(console.log("Increase rate"),It.increase()),"a"==t.key&&It.decrease()}},o,function(t){a=t,n(3,a)},function(){a=this.currentTime,n(3,a)},function(){r=this.duration,n(1,r)},function(t){q[t?"unshift":"push"](()=>{n(2,l=t)})},function(){u=this.paused,n(0,u)},function(){i=this.playbackRate,It.set(i)},function(t){a=t,n(3,a)},function(t){a=t,n(3,a)}]}class oe extends gt{constructor(t){super(),$t(this,t,ie,ne,r,{})}}function se(t){let e,n,i,o;const s=t[4].default,r=l(s,t,t[3],null);return{c(){e=b("button"),r&&r.c(),C(e,"class","svelte-1w5w4em")},m(s,c){y(s,e,c),r&&r.m(e,null),n=!0,i||(o=E(e,"click",t[0]),i=!0)},p(t,[e]){r&&r.p&&8&e&&a(r,s,t,t[3],e,null,null)},i(t){n||(st(r,t),n=!0)},o(t){rt(r,t),n=!1},d(t){t&&x(e),r&&r.d(t),i=!1,o()}}}function re(t,e,n){let{data:i}=e,{filename:o="untitled.json"}=e;let{$$slots:s={},$$scope:r}=e;return t.$set=t=>{"data"in t&&n(1,i=t.data),"filename"in t&&n(2,o=t.filename),"$$scope"in t&&n(3,r=t.$$scope)},[function(){!function(t,e){let n=document.createElement("a");n.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(e)),n.setAttribute("download",t),n.style.display="none",document.body.appendChild(n),n.click(),document.body.removeChild(n)}(o,JSON.stringify(i))},i,o,r,s]}class ce extends gt{constructor(t){super(),$t(this,t,re,se,r,{data:1,filename:2})}}function le(t){let e;return{c(){e=b("div"),e.innerHTML='<span class="svelte-1tinf72">Please enter video url</span>',C(e,"class","blocker svelte-1tinf72")},m(t,n){y(t,e,n)},d(t){t&&x(e)}}}function ue(t){let e;return{c(){e=w("Download raw input")},m(t,n){y(t,e,n)},d(t){t&&x(e)}}}function ae(t){let e;return{c(){e=w("Download labels")},m(t,n){y(t,e,n)},d(t){t&&x(e)}}}function de(t){let e,n,i,s,r,c,l,u,a,d,f,p,m,h,$=fe(t[1].src)+"",g=(t[0]||""==t[1].src)&&le();const _=new ce({props:{data:t[2],filename:"log.json",$$slots:{default:[ue]},$$scope:{ctx:t}}}),N=new ce({props:{data:t[3],filename:"labels.json",$$slots:{default:[ae]},$$scope:{ctx:t}}});return{c(){e=b("header"),g&&g.c(),n=k(),i=b("h1"),s=w($),r=k(),c=b("div"),l=b("div"),u=b("input"),d=k(),ft(_.$$.fragment),f=k(),ft(N.$$.fragment),C(i,"class","svelte-1tinf72"),u.autofocus=!0,C(u,"placeholder","Location of mp4 file"),C(u,"type","text"),u.value=a=t[1].src,C(u,"class","svelte-1tinf72"),C(l,"class","svelte-1tinf72"),A(l,"focus",t[0]||""==t[1].src),C(c,"class","buttons svelte-1tinf72"),C(e,"class","svelte-1tinf72")},m(o,a){y(o,e,a),g&&g.m(e,null),v(e,n),v(e,i),v(i,s),v(e,r),v(e,c),v(c,l),v(l,u),v(c,d),pt(_,c,null),v(c,f),pt(N,c,null),p=!0,u.focus(),m||(h=[E(u,"keydown",pe),E(u,"focus",t[5]),E(u,"blur",t[6]),E(u,"input",t[4])],m=!0)},p(t,[i]){t[0]||""==t[1].src?g||(g=le(),g.c(),g.m(e,n)):g&&(g.d(1),g=null),(!p||2&i)&&$!==($=fe(t[1].src)+"")&&R(s,$),(!p||2&i&&a!==(a=t[1].src)&&u.value!==a)&&(u.value=a),3&i&&A(l,"focus",t[0]||""==t[1].src);const o={};4&i&&(o.data=t[2]),128&i&&(o.$$scope={dirty:i,ctx:t}),_.$set(o);const r={};8&i&&(r.data=t[3]),128&i&&(r.$$scope={dirty:i,ctx:t}),N.$set(r)},i(t){p||(st(_.$$.fragment,t),st(N.$$.fragment,t),p=!0)},o(t){rt(_.$$.fragment,t),rt(N.$$.fragment,t),p=!1},d(t){t&&x(e),g&&g.d(),mt(_),mt(N),m=!1,o(h)}}}function fe(t){let e=t.split("/");return e[e.length-1]}function pe(t){"Enter"==t.key&&t.target.blur(),console.log(t.key),"Escape"==t.key&&t.target.blur()}function me(t,e,n){let i,o,s;c(t,Bt,t=>n(1,i=t)),c(t,_t,t=>n(2,o=t)),c(t,Et,t=>n(3,s=t));let r=!0;return[r,i,o,s,function(t){let e=t.target.value;e!=i.src&&Bt.setSrc(e)},function(t){n(0,r=!0)},()=>n(0,r=!1)]}class he extends gt{constructor(t){super(),$t(this,t,me,de,r,{})}}function $e(e){let n,i,o,s;const r=new he({}),c=new oe({});return{c(){n=b("main"),ft(r.$$.fragment),i=k(),o=b("div"),ft(c.$$.fragment),C(o,"class","speed"),C(n,"class","svelte-1puf08s")},m(t,e){y(t,n,e),pt(r,n,null),v(n,i),v(n,o),pt(c,o,null),s=!0},p:t,i(t){s||(st(r.$$.fragment,t),st(c.$$.fragment,t),s=!0)},o(t){rt(r.$$.fragment,t),rt(c.$$.fragment,t),s=!1},d(t){t&&x(n),mt(r),mt(c)}}}function ge(t,e,n){let{name:i}=e;return t.$set=t=>{"name"in t&&n(0,i=t.name)},[i]}return new class extends gt{constructor(t){super(),$t(this,t,ge,$e,r,{name:0})}}({target:document.body,props:{name:"Video Annotator"}})}();
//# sourceMappingURL=bundle.js.map
