var app=function(){"use strict";function t(){}const e=t=>t;function n(t){return t()}function i(){return Object.create(null)}function o(t){t.forEach(n)}function s(t){return"function"==typeof t}function r(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(e,n,i){e.$$.on_destroy.push(function(e,...n){if(null==e)return t;const i=e.subscribe(...n);return i.unsubscribe?()=>i.unsubscribe():i}(n,i))}function l(t,e,n,i){if(t){const o=u(t,e,n,i);return t[0](o)}}function u(t,e,n,i){return t[1]&&i?function(t,e){for(const n in e)t[n]=e[n];return t}(n.ctx.slice(),t[1](i(e))):n.ctx}function a(t,e,n,i,o,s,r){const c=function(t,e,n,i){if(t[2]&&i){const o=t[2](i(n));if(void 0===e.dirty)return o;if("object"==typeof o){const t=[],n=Math.max(e.dirty.length,o.length);for(let i=0;i<n;i+=1)t[i]=e.dirty[i]|o[i];return t}return e.dirty|o}return e.dirty}(e,i,o,s);if(c){const o=u(e,n,i,r);t.p(o,c)}}function d(t,e,n=e){return t.set(n),e}const f="undefined"!=typeof window;let p=f?()=>window.performance.now():()=>Date.now(),m=f?t=>requestAnimationFrame(t):t;const h=new Set;function $(t){h.forEach(e=>{e.c(t)||(h.delete(e),e.f())}),0!==h.size&&m($)}function g(t){let e;return 0===h.size&&m($),{promise:new Promise(n=>{h.add(e={c:t,f:n})}),abort(){h.delete(e)}}}function v(t,e){t.appendChild(e)}function y(t,e,n){t.insertBefore(e,n||null)}function b(t){t.parentNode.removeChild(t)}function w(t){return document.createElement(t)}function x(t){return document.createTextNode(t)}function k(){return x(" ")}function _(){return x("")}function E(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function j(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function C(t,e){e=""+e,t.data!==e&&(t.data=e)}function R(t,e,n,i){t.style.setProperty(e,n,i?"important":"")}let A;function N(){if(void 0===A){A=!1;try{"undefined"!=typeof window&&window.parent&&window.parent.document}catch(t){A=!0}}return A}function M(t,e,n){t.classList[n?"add":"remove"](e)}const z=new Set;let q,B=0;function S(t,e,n,i,o,s,r,c=0){const l=16.666/i;let u="{\n";for(let t=0;t<=1;t+=l){const i=e+(n-e)*s(t);u+=100*t+`%{${r(i,1-i)}}\n`}const a=u+`100% {${r(n,1-n)}}\n}`,d=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(a)}_${c}`,f=t.ownerDocument;z.add(f);const p=f.__svelte_stylesheet||(f.__svelte_stylesheet=f.head.appendChild(w("style")).sheet),m=f.__svelte_rules||(f.__svelte_rules={});m[d]||(m[d]=!0,p.insertRule(`@keyframes ${d} ${a}`,p.cssRules.length));const h=t.style.animation||"";return t.style.animation=`${h?h+", ":""}${d} ${i}ms linear ${o}ms 1 both`,B+=1,d}function T(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")),o=n.length-i.length;o&&(t.style.animation=i.join(", "),B-=o,B||m(()=>{B||(z.forEach(t=>{const e=t.__svelte_stylesheet;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.__svelte_rules={}}),z.clear())}))}function D(t){q=t}function O(t){(function(){if(!q)throw new Error("Function called outside component initialization");return q})().$$.on_mount.push(t)}const P=[],F=[],I=[],L=[],X=Promise.resolve();let W=!1;function Y(t){I.push(t)}function J(t){L.push(t)}let U=!1;const H=new Set;function V(){if(!U){U=!0;do{for(let t=0;t<P.length;t+=1){const e=P[t];D(e),G(e.$$)}for(P.length=0;F.length;)F.pop()();for(let t=0;t<I.length;t+=1){const e=I[t];H.has(e)||(H.add(e),e())}I.length=0}while(P.length);for(;L.length;)L.pop()();W=!1,U=!1,H.clear()}}function G(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(Y)}}let K;function Q(){return K||(K=Promise.resolve(),K.then(()=>{K=null})),K}function Z(t,e,n){t.dispatchEvent(function(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}(`${e?"intro":"outro"}${n}`))}const tt=new Set;let et;function nt(){et={r:0,c:[],p:et}}function it(){et.r||o(et.c),et=et.p}function ot(t,e){t&&t.i&&(tt.delete(t),t.i(e))}function st(t,e,n,i){if(t&&t.o){if(tt.has(t))return;tt.add(t),et.c.push(()=>{tt.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}}const rt={duration:0};function ct(n,i,o){let r,c,l=i(n,o),u=!1,a=0;function d(){r&&T(n,r)}function f(){const{delay:i=0,duration:o=300,easing:s=e,tick:f=t,css:m}=l||rt;m&&(r=S(n,0,1,o,i,s,m,a++)),f(0,1);const h=p()+i,$=h+o;c&&c.abort(),u=!0,Y(()=>Z(n,!0,"start")),c=g(t=>{if(u){if(t>=$)return f(1,0),Z(n,!0,"end"),d(),u=!1;if(t>=h){const e=s((t-h)/o);f(e,1-e)}}return u})}let m=!1;return{start(){m||(T(n),s(l)?(l=l(),Q().then(f)):f())},invalidate(){m=!1},end(){u&&(d(),u=!1)}}}function lt(n,i,r){let c,l=i(n,r),u=!0;const a=et;function d(){const{delay:i=0,duration:s=300,easing:r=e,tick:d=t,css:f}=l||rt;f&&(c=S(n,1,0,s,i,r,f));const m=p()+i,h=m+s;Y(()=>Z(n,!1,"start")),g(t=>{if(u){if(t>=h)return d(0,1),Z(n,!1,"end"),--a.r||o(a.c),!1;if(t>=m){const e=r((t-m)/s);d(1-e,e)}}return u})}return a.r+=1,s(l)?Q().then(()=>{l=l(),d()}):d(),{end(t){t&&l.tick&&l.tick(1,0),u&&(c&&T(n,c),u=!1)}}}function ut(t,e){t.d(1),e.delete(t.key)}function at(t,e,n){const i=t.$$.props[e];void 0!==i&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function dt(t){t&&t.c()}function ft(t,e,i){const{fragment:r,on_mount:c,on_destroy:l,after_update:u}=t.$$;r&&r.m(e,i),Y(()=>{const e=c.map(n).filter(s);l?l.push(...e):o(e),t.$$.on_mount=[]}),u.forEach(Y)}function pt(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function mt(t,e){-1===t.$$.dirty[0]&&(P.push(t),W||(W=!0,X.then(V)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function ht(e,n,s,r,c,l,u=[-1]){const a=q;D(e);const d=n.props||{},f=e.$$={fragment:null,ctx:null,props:l,update:t,not_equal:c,bound:i(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(a?a.$$.context:[]),callbacks:i(),dirty:u};let p=!1;if(f.ctx=s?s(e,d,(t,n,...i)=>{const o=i.length?i[0]:n;return f.ctx&&c(f.ctx[t],f.ctx[t]=o)&&(f.bound[t]&&f.bound[t](o),p&&mt(e,t)),n}):[],f.update(),p=!0,o(f.before_update),f.fragment=!!r&&r(f.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);f.fragment&&f.fragment.l(t),t.forEach(b)}else f.fragment&&f.fragment.c();n.intro&&ot(e.$$.fragment),ft(e,n.target,n.anchor),V()}D(a)}class $t{$destroy(){pt(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}function gt(t){let e;return{c(){e=w("div"),R(e,"transform","translate("+t[2].x+"px, "+t[2].y+"px) scale("+t[3]+")"),j(e,"class","svelte-1eavhw6"),M(e,"pressed",t[0]),M(e,"scrubbing",t[1])},m(t,n){y(t,e,n)},p(t,n){12&n&&R(e,"transform","translate("+t[2].x+"px, "+t[2].y+"px) scale("+t[3]+")"),1&n&&M(e,"pressed",t[0]),2&n&&M(e,"scrubbing",t[1])},d(t){t&&b(e)}}}function vt(e){let n,i=e[2]&&gt(e);return{c(){i&&i.c(),n=_()},m(t,e){i&&i.m(t,e),y(t,n,e)},p(t,[e]){t[2]?i?i.p(t,e):(i=gt(t),i.c(),i.m(n.parentNode,n)):i&&(i.d(1),i=null)},i:t,o:t,d(t){i&&i.d(t),t&&b(n)}}}function yt(t,e,n){let i,o,s,{position:r}=e,{container:c}=e,{pressed:l}=e,{scrubbing:u}=e;return t.$set=t=>{"position"in t&&n(4,r=t.position),"container"in t&&n(5,c=t.container),"pressed"in t&&n(0,l=t.pressed),"scrubbing"in t&&n(1,u=t.scrubbing)},t.$$.update=()=>{16&t.$$.dirty&&n(2,i=function(t){return c?(o=c.getBoundingClientRect(),{x:t.x*o.width-10,y:t.y*o.height-10}):t}(r)),1&t.$$.dirty&&n(3,s=l?1.2:1)},[l,u,i,s,r,c]}class bt extends $t{constructor(t){super(),ht(this,t,yt,vt,r,{position:4,container:5,pressed:0,scrubbing:1})}}const wt=[];function xt(e,n=t){let i;const o=[];function s(t){if(r(e,t)&&(e=t,i)){const t=!wt.length;for(let t=0;t<o.length;t+=1){const n=o[t];n[1](),wt.push(n,e)}if(t){for(let t=0;t<wt.length;t+=2)wt[t][0](wt[t+1]);wt.length=0}}}return{set:s,update:function(t){s(t(e))},subscribe:function(r,c=t){const l=[r,c];return o.push(l),1===o.length&&(i=n(s)||t),r(e),()=>{const t=o.indexOf(l);-1!==t&&o.splice(t,1),0===o.length&&(i(),i=null)}}}}const kt=function(){const{subscribe:t,set:e,update:n}=xt([]);return{subscribe:t,add:t=>n(e=>(e.push(t),e=e)),reset:()=>e([])}}(),_t=xt([]);function Et(t){return Math.round(10*t)}function jt(t,e){t();let n=setTimeout((function i(){t(),n=setTimeout(i,e)}),e);return{clear(){clearInterval(n)}}}function Ct(t){let e;const n=new bt({props:{position:t[1],pressed:t[2],container:t[0],scrubbing:t[3]}});return{c(){dt(n.$$.fragment)},m(t,i){ft(n,t,i),e=!0},p(t,e){const i={};2&e&&(i.position=t[1]),4&e&&(i.pressed=t[2]),1&e&&(i.container=t[0]),8&e&&(i.scrubbing=t[3]),n.$set(i)},i(t){e||(ot(n.$$.fragment,t),e=!0)},o(t){st(n.$$.fragment,t),e=!1},d(t){pt(n,t)}}}function Rt(t){let e,n,i,r,c,u,d,f=t[4]&&Ct(t);const p=t[16].default,m=l(p,t,t[15],null);return{c(){e=w("div"),n=w("div"),i=w("div"),f&&f.c(),r=k(),m&&m.c(),j(i,"class","inner svelte-4zeg1e"),j(n,"class","video svelte-4zeg1e"),j(e,"class","main svelte-4zeg1e")},m(o,l){var a;y(o,e,l),v(e,n),v(n,i),f&&f.m(i,null),v(i,r),m&&m.m(i,null),t[17](i),c=!0,u||(d=[E(window,"keydown",t[8]),E(window,"keyup",t[9]),E(window,"mousemove",t[5]),E(window,"mouseup",t[6]),E(e,"mousedown",t[7]),E(e,"contextmenu",(a=At,function(t){return t.preventDefault(),a.call(this,t)})),E(e,"mouseleave",t[18]),E(e,"mouseenter",(function(){s(t[4]=!0)&&(t[4]=!0).apply(this,arguments)}))],u=!0)},p(e,[n]){(t=e)[4]?f?(f.p(t,n),16&n&&ot(f,1)):(f=Ct(t),f.c(),ot(f,1),f.m(i,r)):f&&(nt(),st(f,1,1,()=>{f=null}),it()),m&&m.p&&32768&n&&a(m,p,t,t[15],n,null,null)},i(t){c||(ot(f),ot(m,t),c=!0)},o(t){st(f),st(m,t),c=!1},d(n){n&&b(e),f&&f.d(),m&&m.d(n),t[17](null),u=!1,o(d)}}}function At(){return!1}function Nt(t,e,n){let i,o;c(t,_t,t=>n(13,i=t));let s,r,l,{container:u}=e,a=!1,f=0,{time:p}=e;function m(t){let e=u.getBoundingClientRect(),n=t.x-e.left,i=t.y-e.top;return{x:n/e.width,y:i/e.height}}let{$$slots:h={},$$scope:$}=e;return t.$set=t=>{"container"in t&&n(0,u=t.container),"time"in t&&n(10,p=t.time),"$$scope"in t&&n(15,$=t.$$scope)},[u,o,s,a,r,function(t){n(1,o=m({x:t.clientX,y:t.clientY})),s&&d(_t,i[Et(p)]={...o,track:f,time:p},i),a&&d(_t,i[Et(p)]="deleted",i),(s||a)&&kt.add({...o,time:p,track:f,left:s,right:a})},function(t){n(2,s=!1),n(1,o=m({x:t.clientX,y:t.clientY})),l&&l.clear(),l=null,n(3,a=!1)},function(t){1==t.buttons&&(n(2,s=!0),n(3,a=!1),f+=1),2==t.buttons&&(n(2,s=!1),n(3,a=!0)),l=jt(()=>{s&&d(_t,i[Et(p)]={...o,track:f,time:p},i),a&&d(_t,i[Et(p)]="deleted",i),kt.add({...o,time:p,track:f,left:s,right:a})},20)},function(t){"Backspace"===t.key&&(n(3,a=!0),n(2,s=!1),l||(l=jt(()=>{a&&d(_t,i[Et(p)]="deleted",i),kt.add({...o,time:p,track:f,left:s,right:a})},20)))},function(t){"Backspace"===t.key&&(n(3,a=!1),l.clear(),l=null)},p,f,l,i,m,$,h,function(t){F[t?"unshift":"push"](()=>{n(0,u=t)})},()=>n(4,r=!1)]}class Mt extends $t{constructor(t){super(),ht(this,t,Nt,Rt,r,{container:0,time:10})}}const zt=function(){const{subscribe:t,set:e,update:n}=xt({rate:1,src:"https://github.com/intel-iot-devkit/sample-videos/blob/master/people-detection.mp4?raw=true",duration:0});return{subscribe:t,play:()=>n(t=>({...t,rate:1})),pause:()=>n(t=>({...t,rate:0})),setDuration:t=>n(e=>({...e,duration:t})),setSrc:t=>n(e=>({...e,src:t}))}}(),qt=function(){const{subscribe:t,set:e,update:n}=xt(1);return{subscribe:t,increase:()=>n(t=>Math.min(t+.5,4)),decrease:()=>n(t=>Math.max(t-.5,0)),set:e}}();function Bt(t){return"[object Date]"===Object.prototype.toString.call(t)}function St(t,e={}){const n=xt(t),{stiffness:i=.15,damping:o=.8,precision:s=.01}=e;let r,c,l,u=t,a=t,d=1,f=0,m=!1;function h(e,i={}){a=e;const o=l={};if(null==t||i.hard||$.stiffness>=1&&$.damping>=1)return m=!0,r=p(),u=e,n.set(t=a),Promise.resolve();if(i.soft){const t=!0===i.soft?.5:+i.soft;f=1/(60*t),d=0}return c||(r=p(),m=!1,c=g(e=>{if(m)return m=!1,c=null,!1;d=Math.min(d+f,1);const i={inv_mass:d,opts:$,settled:!0,dt:60*(e-r)/1e3},o=function t(e,n,i,o){if("number"==typeof i||Bt(i)){const t=o-i,s=(i-n)/(e.dt||1/60),r=(s+(e.opts.stiffness*t-e.opts.damping*s)*e.inv_mass)*e.dt;return Math.abs(r)<e.opts.precision&&Math.abs(t)<e.opts.precision?o:(e.settled=!1,Bt(i)?new Date(i.getTime()+r):i+r)}if(Array.isArray(i))return i.map((s,r)=>t(e,n[r],i[r],o[r]));if("object"==typeof i){const s={};for(const r in i)s[r]=t(e,n[r],i[r],o[r]);return s}throw new Error(`Cannot spring ${typeof i} values`)}(i,u,t,a);return r=e,u=t,n.set(t=o),i.settled&&(c=null),!i.settled})),new Promise(t=>{c.promise.then(()=>{o===l&&t()})})}const $={set:h,update:(e,n)=>h(e(a,t),n),subscribe:n.subscribe,stiffness:i,damping:o,precision:s};return $}function Tt(t,{delay:n=0,duration:i=400,easing:o=e}){const s=+getComputedStyle(t).opacity;return{delay:n,duration:i,easing:o,css:t=>"opacity: "+t*s}}function Dt(t){let e;return{c(){e=x("Pause")},m(t,n){y(t,e,n)},d(t){t&&b(e)}}}function Ot(t){let e;return{c(){e=x("Play")},m(t,n){y(t,e,n)},d(t){t&&b(e)}}}function Pt(e){let n,i,o;function s(t,e){return t[0]?Ot:Dt}let r=s(e),c=r(e);return{c(){n=w("button"),c.c(),j(n,"class","svelte-17mag5t")},m(t,s){y(t,n,s),c.m(n,null),i||(o=E(n,"click",e[1]),i=!0)},p(t,[e]){r!==(r=s(t))&&(c.d(1),c=r(t),c&&(c.c(),c.m(n,null)))},i:t,o:t,d(t){t&&b(n),c.d(),i=!1,o()}}}function Ft(t,e,n){let{paused:i}=e;return t.$set=t=>{"paused"in t&&n(0,i=t.paused)},[i,()=>n(0,i=!i)]}class It extends $t{constructor(t){super(),ht(this,t,Ft,Pt,r,{paused:0})}}var Lt="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},Xt="object"==typeof Lt&&Lt&&Lt.Object===Object&&Lt,Wt="object"==typeof self&&self&&self.Object===Object&&self;Xt||Wt||Function("return this")();function Yt(t){let e,n,i,o,s,r,c=Ht(t[6].x/t[1].getBoundingClientRect().width*t[5].duration)+"";return{c(){e=w("div"),n=w("span"),i=x(c),j(n,"class","svelte-r81pn5"),j(e,"class","clock svelte-r81pn5"),R(e,"left",t[6].x/t[1].getBoundingClientRect().width*100+"%")},m(t,o){y(t,e,o),v(e,n),v(n,i),r=!0},p(t,n){(!r||98&n)&&c!==(c=Ht(t[6].x/t[1].getBoundingClientRect().width*t[5].duration)+"")&&C(i,c),(!r||66&n)&&R(e,"left",t[6].x/t[1].getBoundingClientRect().width*100+"%")},i(t){r||(Y(()=>{s&&s.end(1),o||(o=ct(e,Tt,{duration:200})),o.start()}),r=!0)},o(t){o&&o.invalidate(),s=lt(e,Tt,{duration:200}),r=!1},d(t){t&&b(e),t&&s&&s.end()}}}function Jt(t){let e,n,i,s,r,c,l,u,a,d,f,p,m,h,$;function g(e){t[13].call(null,e)}let x={};void 0!==t[0]&&(x.paused=t[0]);const _=new It({props:x});F.push(()=>at(_,"paused",g));let C=t[1]&&t[3]&&Yt(t);return{c(){e=k(),n=w("div"),i=w("div"),dt(_.$$.fragment),r=k(),c=w("div"),C&&C.c(),l=k(),u=w("div"),a=k(),d=w("canvas"),j(i,"class","play"),j(u,"class","inner svelte-r81pn5"),j(d,"height",f=1),j(d,"width",p=1920),j(d,"class","svelte-r81pn5"),j(c,"class","outer svelte-r81pn5"),j(n,"class","container svelte-r81pn5")},m(o,s){y(o,e,s),y(o,n,s),v(n,i),ft(_,i,null),v(n,r),v(n,c),C&&C.m(c,null),v(c,l),v(c,u),t[14](u),v(c,a),v(c,d),t[15](d),t[16](c),m=!0,h||($=[E(window,"mousemove",t[12]),E(document.body,"click",t[8]),E(c,"mouseleave",t[17]),E(c,"mouseenter",t[18])],h=!0)},p(t,[e]){const n={};!s&&1&e&&(s=!0,n.paused=t[0],J(()=>s=!1)),_.$set(n),t[1]&&t[3]?C?(C.p(t,e),10&e&&ot(C,1)):(C=Yt(t),C.c(),ot(C,1),C.m(c,l)):C&&(nt(),st(C,1,1,()=>{C=null}),it())},i(t){m||(ot(_.$$.fragment,t),ot(C),m=!0)},o(t){st(_.$$.fragment,t),st(C),m=!1},d(i){i&&b(e),i&&b(n),pt(_),C&&C.d(),t[14](null),t[15](null),t[16](null),h=!1,o($)}}}function Ut(t,e,n,i,o,s,r){let c=4*(e+4e3*n);t.data[c+0]=i,t.data[c+1]=o,t.data[c+2]=s,t.data[c+3]=r}function Ht(t){if(isNaN(t))return"...";const e=Math.floor(t/60);return(t=Math.floor(t%60))<10&&(t="0"+t),`${e}:${t}`}function Vt(t,e,n){let i,o,s;c(t,zt,t=>n(5,i=t)),c(t,_t,t=>n(11,o=t));let r,l,u=St({x:50,y:50},{stiffness:.5,damping:.95});c(t,u,t=>n(6,s=t));let a,d=!1,{videoElement:f}=e,{time:p}=e,{paused:m}=e;O(()=>{let t=a.getContext("2d");t.getImageData(0,0,1920,1);requestAnimationFrame((function e(){if(i.paused)return void requestAnimationFrame(e);let s=p/i.duration;n(2,l.style.width=100*s+"%",l);let r=o.length/1920;t.clearRect(0,0,1920,1);let c=t.getImageData(0,0,1920,1);for(let t=0;t<=1920;++t){let e=Math.round(r*t),n=o[e];null!=n&&"deleted"!=n&&Ut(c,t,0,255,255,255,255)}t.putImageData(c,0,0),requestAnimationFrame(e)}))});return t.$set=t=>{"videoElement"in t&&n(9,f=t.videoElement),"time"in t&&n(10,p=t.time),"paused"in t&&n(0,m=t.paused)},[m,r,l,d,a,i,s,u,async function(t){if(t.target==r){let e=r.getBoundingClientRect(),o=(t.clientX-e.left)/e.width;n(9,f.currentTime=(o*i.duration).toString(),f)}},f,p,o,t=>u.set({x:t.clientX-r.getBoundingClientRect().x,y:t.clientY}),function(t){m=t,n(0,m)},function(t){F[t?"unshift":"push"](()=>{n(2,l=t)})},function(t){F[t?"unshift":"push"](()=>{n(4,a=t)})},function(t){F[t?"unshift":"push"](()=>{n(1,r=t)})},()=>n(3,d=!1),()=>n(3,d=!0)]}class Gt extends $t{constructor(t){super(),ht(this,t,Vt,Jt,r,{videoElement:9,time:10,paused:0})}}function Kt(t,e,n){const i=t.slice();return i[23]=e[n],i}function Qt(t){let e,n,i,o,s,r,c=ee(t[8](t[6].x),!0)+"";return{c(){e=w("div"),n=w("span"),i=x(c),j(e,"class","clock svelte-1mqkjhh"),R(e,"left",t[6].x/t[2].getBoundingClientRect().width*100+"%")},m(t,o){y(t,e,o),v(e,n),v(n,i),r=!0},p(t,n){(!r||64&n)&&c!==(c=ee(t[8](t[6].x),!0)+"")&&C(i,c),(!r||68&n)&&R(e,"left",t[6].x/t[2].getBoundingClientRect().width*100+"%")},i(t){r||(Y(()=>{s&&s.end(1),o||(o=ct(e,Tt,{duration:200})),o.start()}),r=!0)},o(t){o&&o.invalidate(),s=lt(e,Tt,{duration:200}),r=!1},d(t){t&&b(e),t&&s&&s.end()}}}function Zt(t,e){let n;return{key:t,first:null,c(){n=w("div"),j(n,"class","point svelte-1mqkjhh"),R(n,"transform","translate("+e[23].position*e[5]/100+"px, -50%)"),this.first=n},m(t,e){y(t,n,e)},p(t,e){48&e&&R(n,"transform","translate("+t[23].position*t[5]/100+"px, -50%)")},d(t){t&&b(n)}}}function te(t){let e,n,i,s,r,c,l,u,a,d,f,p,m,h,$,g,_,A,M=ee(t[0])+"",z=[],q=new Map,B=t[2]&&t[1]&&Qt(t),S=t[4];const T=t=>t[23].index;for(let e=0;e<S.length;e+=1){let n=Kt(t,S,e),i=T(n);q.set(i,z[e]=Zt(i,n))}return{c(){e=k(),n=w("div"),i=x(M),s=k(),r=w("div"),c=w("div"),l=k(),u=w("div"),a=k(),B&&B.c(),d=k();for(let t=0;t<z.length;t+=1)z[t].c();f=k(),p=w("div"),p.textContent="-5",m=k(),h=w("div"),h.textContent="+5",j(n,"class","time svelte-1mqkjhh"),j(c,"class","inner svelte-1mqkjhh"),R(c,"width","100%"),j(u,"class","centre svelte-1mqkjhh"),j(p,"class","left svelte-1mqkjhh"),j(h,"class","right svelte-1mqkjhh"),j(r,"class","outer svelte-1mqkjhh"),Y(()=>t[20].call(r))},m(o,x){y(o,e,x),y(o,n,x),v(n,i),y(o,s,x),y(o,r,x),v(r,c),t[18](c),v(r,l),v(r,u),v(r,a),B&&B.m(r,null),v(r,d);for(let t=0;t<z.length;t+=1)z[t].m(r,null);v(r,f),v(r,p),v(r,m),v(r,h),t[19](r),$=function(t,e){const n=getComputedStyle(t),i=(parseInt(n.zIndex)||0)-1;"static"===n.position&&(t.style.position="relative");const o=w("iframe");o.setAttribute("style",`display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: ${i};`),o.setAttribute("aria-hidden","true"),o.tabIndex=-1;const s=N();let r;return s?(o.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",r=E(window,"message",t=>{t.source===o.contentWindow&&e()})):(o.src="about:blank",o.onload=()=>{r=E(o.contentWindow,"resize",e)}),v(t,o),()=>{(s||r&&o.contentWindow)&&r(),b(o)}}(r,t[20].bind(r)),g=!0,_||(A=[E(window,"mousemove",t[17]),E(document.body,"click",t[9]),E(r,"mouseleave",t[21]),E(r,"mouseenter",t[22])],_=!0)},p(t,[e]){if((!g||1&e)&&M!==(M=ee(t[0])+"")&&C(i,M),t[2]&&t[1]?B?(B.p(t,e),6&e&&ot(B,1)):(B=Qt(t),B.c(),ot(B,1),B.m(r,d)):B&&(nt(),st(B,1,1,()=>{B=null}),it()),48&e){const n=t[4];z=function(t,e,n,i,o,s,r,c,l,u,a,d){let f=t.length,p=s.length,m=f;const h={};for(;m--;)h[t[m].key]=m;const $=[],g=new Map,v=new Map;for(m=p;m--;){const t=d(o,s,m),c=n(t);let l=r.get(c);l?i&&l.p(t,e):(l=u(c,t),l.c()),g.set(c,$[m]=l),c in h&&v.set(c,Math.abs(m-h[c]))}const y=new Set,b=new Set;function w(t){ot(t,1),t.m(c,a),r.set(t.key,t),a=t.first,p--}for(;f&&p;){const e=$[p-1],n=t[f-1],i=e.key,o=n.key;e===n?(a=e.first,f--,p--):g.has(o)?!r.has(i)||y.has(i)?w(e):b.has(o)?f--:v.get(i)>v.get(o)?(b.add(i),w(e)):(y.add(o),f--):(l(n,r),f--)}for(;f--;){const e=t[f];g.has(e.key)||l(e,r)}for(;p;)w($[p-1]);return $}(z,e,T,1,t,n,q,r,ut,Zt,f,Kt)}},i(t){g||(ot(B),g=!0)},o(t){st(B),g=!1},d(i){i&&b(e),i&&b(n),i&&b(s),i&&b(r),t[18](null),B&&B.d();for(let t=0;t<z.length;t+=1)z[t].d();t[19](null),$(),_=!1,o(A)}}}function ee(t,e=!1){if(t<0)return"0:00";if(isNaN(t))return"...";let n=t-parseInt(t);n=(Math.round(100*n)/100).toString(),n=n.slice(2);const i=Math.floor(t/60);return(t=Math.floor(t%60))<10&&(t="0"+t),e?`${i}:${t}.${n}`:`${i}:${t}`}function ne(t,e,n){let i,o,s;c(t,zt,t=>n(13,i=t)),c(t,_t,t=>n(14,o=t));let r,l,u=!1,a=St({x:50,y:50},{stiffness:.5,damping:.95});c(t,a,t=>n(6,s=t));let{videoElement:d}=e,{time:f}=e,{context:p=5}=e,m=f;let h=0;function $(t,e){return 100*((function(t){return t/10}(t)-e)/p+.5)}let g,v=[];O(()=>{requestAnimationFrame((function t(){if(i.paused)return void requestAnimationFrame(t);let e=[],s=Et(f-p/2-1),r=Et(f+p/2+1);for(let t=0;t<r-s;++t)e[t]=[o[s+t],s+t];let c=e.map(([t,e])=>({...t,index:e,hasPosition:null!=t&&"deleted"!=t,position:$(e,f)})).filter(({hasPosition:t,position:e})=>t&&e>=0&&e<=100);n(4,v=c),requestAnimationFrame(t)}))});return t.$set=t=>{"videoElement"in t&&n(10,d=t.videoElement),"time"in t&&n(0,f=t.time),"context"in t&&n(11,p=t.context)},t.$$.update=()=>{8193&t.$$.dirty&&i.duration&&(h=f/i.duration)},[f,u,r,l,v,g,s,a,function(t){let e=t/l.getBoundingClientRect().width;return f+(e*p-p/2)},async function(t){if(t.target==l){let e=l.getBoundingClientRect(),i=(t.clientX-e.left)/e.width*p-p/2;n(10,d.currentTime+=i,d)}},d,p,h,i,o,m,$,t=>a.set({x:t.clientX-l.getBoundingClientRect().x,y:t.clientY}),function(t){F[t?"unshift":"push"](()=>{n(2,r=t)})},function(t){F[t?"unshift":"push"](()=>{n(3,l=t)})},function(){g=this.clientWidth,n(5,g)},()=>n(1,u=!1),()=>n(1,u=!0)]}class ie extends $t{constructor(t){super(),ht(this,t,ne,te,r,{videoElement:10,time:0,context:11})}}function oe(t){let e,n,i;return{c(){e=w("div"),j(e,"class","point svelte-jeb5oj"),R(e,"transform","translate("+t[2](t[1]).x+"px, "+t[2](t[1]).y+"px)")},m(t,n){y(t,e,n),i=!0},p(t,n){(!i||2&n)&&R(e,"transform","translate("+t[2](t[1]).x+"px, "+t[2](t[1]).y+"px)")},i(t){i||(n&&n.end(1),i=!0)},o(t){n=lt(e,Tt,{duration:100}),i=!1},d(t){t&&b(e),t&&n&&n.end()}}}function se(t){let e,n,i,o,s,r,c=JSON.stringify(t[1])+"",l=t[1]&&"deleted"!==t[1]&&oe(t);return{c(){l&&l.c(),e=k(),n=w("div"),i=x(t[0]),o=k(),s=x(c),j(n,"class","debug svelte-jeb5oj")},m(t,c){l&&l.m(t,c),y(t,e,c),y(t,n,c),v(n,i),v(n,o),v(n,s),r=!0},p(t,[n]){t[1]&&"deleted"!==t[1]?l?(l.p(t,n),2&n&&ot(l,1)):(l=oe(t),l.c(),ot(l,1),l.m(e.parentNode,e)):l&&(nt(),st(l,1,1,()=>{l=null}),it()),(!r||1&n)&&C(i,t[0]),(!r||2&n)&&c!==(c=JSON.stringify(t[1])+"")&&C(s,c)},i(t){r||(ot(l),r=!0)},o(t){st(l),r=!1},d(t){l&&l.d(t),t&&b(e),t&&b(n)}}}function re(t,e,n){let i;c(t,_t,t=>n(5,i=t));let o,s,{time:r}=e,{container:l}=e;return t.$set=t=>{"time"in t&&n(3,r=t.time),"container"in t&&n(4,l=t.container)},t.$$.update=()=>{8&t.$$.dirty&&n(0,o=Et(r)),40&t.$$.dirty&&n(1,s=i[Et(r)])},[o,s,function(t){if(!l)return t;let e=l.getBoundingClientRect();return{x:t.x*e.width-5,y:t.y*e.height-5}},r,l]}class ce extends $t{constructor(t){super(),ht(this,t,re,se,r,{time:3,container:4})}}function le(t){let e;return{c(){e=w("div"),e.textContent="Failed to load video.",j(e,"class","error svelte-izzdx1")},m(t,n){y(t,e,n)},d(t){t&&b(e)}}}function ue(t){let e;const n=new ce({props:{container:t[2],time:t[3]}});return{c(){dt(n.$$.fragment)},m(t,i){ft(n,t,i),e=!0},p(t,e){const i={};4&e&&(i.container=t[2]),8&e&&(i.time=t[3]),n.$set(i)},i(t){e||(ot(n.$$.fragment,t),e=!0)},o(t){st(n.$$.fragment,t),e=!1},d(t){pt(n,t)}}}function ae(t){let e,n,i,s,r,c,l,u,a,d=!1,f=!0;function p(){cancelAnimationFrame(i),e.paused||(i=m(p),d=!0),t[13].call(e)}let h=t[5]&&le(),$=t[6]&&!t[5]&&ue(t);return{c(){e=w("video"),s=k(),h&&h.c(),r=k(),$&&$.c(),c=_(),e.src!==(n=t[8].src)&&j(e,"src",n),j(e,"preload",""),j(e,"class","svelte-izzdx1"),void 0===t[1]&&Y(()=>t[14].call(e))},m(n,i){y(n,e,i),t[15](e),isNaN(t[7])||(e.playbackRate=t[7]),y(n,s,i),h&&h.m(n,i),y(n,r,i),$&&$.m(n,i),y(n,c,i),l=!0,u||(a=[E(e,"timeupdate",p),E(e,"durationchange",t[14]),E(e,"play",t[16]),E(e,"pause",t[16]),E(e,"ratechange",t[17])],u=!0)},p(t,i){(!l||256&i&&e.src!==(n=t[8].src))&&j(e,"src",n),!d&&8&i&&!isNaN(t[3])&&(e.currentTime=t[3]),d=!1,1&i&&f!==(f=t[0])&&e[f?"pause":"play"](),128&i&&!isNaN(t[7])&&(e.playbackRate=t[7]),t[5]?h||(h=le(),h.c(),h.m(r.parentNode,r)):h&&(h.d(1),h=null),t[6]&&!t[5]?$?($.p(t,i),96&i&&ot($,1)):($=ue(t),$.c(),ot($,1),$.m(c.parentNode,c)):$&&(nt(),st($,1,1,()=>{$=null}),it())},i(t){l||(ot($),l=!0)},o(t){st($),l=!1},d(n){n&&b(e),t[15](null),n&&b(s),h&&h.d(n),n&&b(r),$&&$.d(n),n&&b(c),u=!1,o(a)}}}function de(t){let e,n,i,o,s,r,c,l,u,a,d,f,p,m;function h(e){t[11].call(null,e)}function $(e){t[12].call(null,e)}let g={videoElement:t[2]};void 0!==t[0]&&(g.paused=t[0]),void 0!==t[3]&&(g.time=t[3]);const _=new Gt({props:g});function R(e){t[18].call(null,e)}F.push(()=>at(_,"paused",h)),F.push(()=>at(_,"time",$));let A={container:t[2],$$slots:{default:[ae]},$$scope:{ctx:t}};void 0!==t[3]&&(A.time=t[3]);const N=new Mt({props:A});function z(e){t[19].call(null,e)}F.push(()=>at(N,"time",R));let q={context:10,videoElement:t[2]};void 0!==t[3]&&(q.time=t[3]);const B=new ie({props:q});return F.push(()=>at(B,"time",z)),{c(){e=w("div"),dt(_.$$.fragment),o=k(),dt(N.$$.fragment),r=k(),c=w("div"),l=x(t[7]),u=x("x"),a=k(),dt(B.$$.fragment),j(c,"class","speed svelte-izzdx1"),j(e,"class","video svelte-izzdx1"),M(e,"seeking",t[4])},m(n,i){y(n,e,i),ft(_,e,null),v(e,o),ft(N,e,null),v(e,r),v(e,c),v(c,l),v(c,u),v(e,a),ft(B,e,null),f=!0,p||(m=E(window,"keydown",t[9]),p=!0)},p(t,[o]){const r={};4&o&&(r.videoElement=t[2]),!n&&1&o&&(n=!0,r.paused=t[0],J(()=>n=!1)),!i&&8&o&&(i=!0,r.time=t[3],J(()=>i=!1)),_.$set(r);const c={};4&o&&(c.container=t[2]),1049071&o&&(c.$$scope={dirty:o,ctx:t}),!s&&8&o&&(s=!0,c.time=t[3],J(()=>s=!1)),N.$set(c),(!f||128&o)&&C(l,t[7]);const u={};4&o&&(u.videoElement=t[2]),!d&&8&o&&(d=!0,u.time=t[3],J(()=>d=!1)),B.$set(u),16&o&&M(e,"seeking",t[4])},i(t){f||(ot(_.$$.fragment,t),ot(N.$$.fragment,t),ot(B.$$.fragment,t),f=!0)},o(t){st(_.$$.fragment,t),st(N.$$.fragment,t),st(B.$$.fragment,t),f=!1},d(t){t&&b(e),pt(_),pt(N),pt(B),p=!1,m()}}}function fe(t,e,n){let i,o,s;c(t,qt,t=>n(7,i=t)),c(t,_t,t=>n(10,o=t)),c(t,zt,t=>n(8,s=t));let r,l,u=!0,a=0,f=!1;let p=!1,m=!1;return O(()=>{l.addEventListener("error",()=>{n(5,p=!0),n(6,m=!1)}),l.addEventListener("seeking",t=>{n(4,f=t.target.currentTime!==a)}),l.addEventListener("seeked",t=>{n(4,f=!1)}),l.addEventListener("loadeddata",()=>{n(6,m=!0),n(5,p=!1)})}),t.$$.update=()=>{2&t.$$.dirty&&zt.setDuration(r),2&t.$$.dirty&&r&&d(_t,o=Array(Et(r)).fill(null))},[u,r,l,a,f,p,m,i,s,async function(t){if("INPUT"!=document.activeElement.nodeName){if(" "==t.key){if(u){let t=i;d(qt,i=.1),l.play(),setTimeout(()=>d(qt,i=t),200)}else l.pause();t.preventDefault()}"ArrowLeft"==t.key&&n(2,l.currentTime=a-1,l),"ArrowRight"==t.key&&n(2,l.currentTime=a+1,l),"q"==t.key&&qt.increase(),"a"==t.key&&qt.decrease()}},o,function(t){u=t,n(0,u)},function(t){a=t,n(3,a)},function(){a=this.currentTime,n(3,a)},function(){r=this.duration,n(1,r)},function(t){F[t?"unshift":"push"](()=>{n(2,l=t)})},function(){u=this.paused,n(0,u)},function(){i=this.playbackRate,qt.set(i)},function(t){a=t,n(3,a)},function(t){a=t,n(3,a)}]}class pe extends $t{constructor(t){super(),ht(this,t,fe,de,r,{})}}function me(t){let e,n,i,o;const s=t[4].default,r=l(s,t,t[3],null);return{c(){e=w("button"),r&&r.c(),j(e,"class","svelte-1w5w4em")},m(s,c){y(s,e,c),r&&r.m(e,null),n=!0,i||(o=E(e,"click",t[0]),i=!0)},p(t,[e]){r&&r.p&&8&e&&a(r,s,t,t[3],e,null,null)},i(t){n||(ot(r,t),n=!0)},o(t){st(r,t),n=!1},d(t){t&&b(e),r&&r.d(t),i=!1,o()}}}function he(t,e,n){let{data:i}=e,{filename:o="untitled.json"}=e;let{$$slots:s={},$$scope:r}=e;return t.$set=t=>{"data"in t&&n(1,i=t.data),"filename"in t&&n(2,o=t.filename),"$$scope"in t&&n(3,r=t.$$scope)},[function(){!function(t,e){let n=document.createElement("a");n.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(e)),n.setAttribute("download",t),n.style.display="none",document.body.appendChild(n),n.click(),document.body.removeChild(n)}(o,JSON.stringify(i))},i,o,r,s]}class $e extends $t{constructor(t){super(),ht(this,t,he,me,r,{data:1,filename:2})}}function ge(t){let e;return{c(){e=w("div"),e.innerHTML='<span class="svelte-1tinf72">Please enter video url</span>',j(e,"class","blocker svelte-1tinf72")},m(t,n){y(t,e,n)},d(t){t&&b(e)}}}function ve(t){let e;return{c(){e=x("Download raw input")},m(t,n){y(t,e,n)},d(t){t&&b(e)}}}function ye(t){let e;return{c(){e=x("Download labels")},m(t,n){y(t,e,n)},d(t){t&&b(e)}}}function be(t){let e,n,i,s,r,c,l,u,a,d,f,p,m,h,$=we(t[1].src)+"",g=(t[0]||""==t[1].src)&&ge();const _=new $e({props:{data:t[2],filename:"log.json",$$slots:{default:[ve]},$$scope:{ctx:t}}}),R=new $e({props:{data:t[3],filename:"labels.json",$$slots:{default:[ye]},$$scope:{ctx:t}}});return{c(){e=w("header"),g&&g.c(),n=k(),i=w("h1"),s=x($),r=k(),c=w("div"),l=w("div"),u=w("input"),d=k(),dt(_.$$.fragment),f=k(),dt(R.$$.fragment),j(i,"class","svelte-1tinf72"),u.autofocus=!0,j(u,"placeholder","Location of mp4 file"),j(u,"type","text"),u.value=a=t[1].src,j(u,"class","svelte-1tinf72"),j(l,"class","svelte-1tinf72"),M(l,"focus",t[0]||""==t[1].src),j(c,"class","buttons svelte-1tinf72"),j(e,"class","svelte-1tinf72")},m(o,a){y(o,e,a),g&&g.m(e,null),v(e,n),v(e,i),v(i,s),v(e,r),v(e,c),v(c,l),v(l,u),v(c,d),ft(_,c,null),v(c,f),ft(R,c,null),p=!0,u.focus(),m||(h=[E(u,"keydown",xe),E(u,"focus",t[5]),E(u,"blur",t[6]),E(u,"input",t[4])],m=!0)},p(t,[i]){t[0]||""==t[1].src?g||(g=ge(),g.c(),g.m(e,n)):g&&(g.d(1),g=null),(!p||2&i)&&$!==($=we(t[1].src)+"")&&C(s,$),(!p||2&i&&a!==(a=t[1].src)&&u.value!==a)&&(u.value=a),3&i&&M(l,"focus",t[0]||""==t[1].src);const o={};4&i&&(o.data=t[2]),128&i&&(o.$$scope={dirty:i,ctx:t}),_.$set(o);const r={};8&i&&(r.data=t[3]),128&i&&(r.$$scope={dirty:i,ctx:t}),R.$set(r)},i(t){p||(ot(_.$$.fragment,t),ot(R.$$.fragment,t),p=!0)},o(t){st(_.$$.fragment,t),st(R.$$.fragment,t),p=!1},d(t){t&&b(e),g&&g.d(),pt(_),pt(R),m=!1,o(h)}}}function we(t){let e=t.split("/");return e[e.length-1]}function xe(t){"Enter"==t.key&&t.target.blur(),console.log(t.key),"Escape"==t.key&&t.target.blur()}function ke(t,e,n){let i,o,s;c(t,zt,t=>n(1,i=t)),c(t,kt,t=>n(2,o=t)),c(t,_t,t=>n(3,s=t));let r=!0;return[r,i,o,s,function(t){let e=t.target.value;e!=i.src&&zt.setSrc(e)},function(t){n(0,r=!0)},()=>n(0,r=!1)]}class _e extends $t{constructor(t){super(),ht(this,t,ke,be,r,{})}}function Ee(e){let n,i,o,s;const r=new _e({}),c=new pe({});return{c(){n=w("main"),dt(r.$$.fragment),i=k(),o=w("div"),dt(c.$$.fragment),j(o,"class","speed svelte-oryjnn"),j(n,"class","svelte-oryjnn")},m(t,e){y(t,n,e),ft(r,n,null),v(n,i),v(n,o),ft(c,o,null),s=!0},p:t,i(t){s||(ot(r.$$.fragment,t),ot(c.$$.fragment,t),s=!0)},o(t){st(r.$$.fragment,t),st(c.$$.fragment,t),s=!1},d(t){t&&b(n),pt(r),pt(c)}}}function je(t,e,n){let{name:i}=e;return t.$set=t=>{"name"in t&&n(0,i=t.name)},[i]}return new class extends $t{constructor(t){super(),ht(this,t,je,Ee,r,{name:0})}}({target:document.body,props:{name:"Video Annotator"}})}();
//# sourceMappingURL=bundle.js.map
