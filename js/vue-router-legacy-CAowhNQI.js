System.register(["./vue-legacy-wnYe26o5.js"],(function(e,t){"use strict";var n,r,o,a,c,s,l,i,u,f,p,h;return{setters:[e=>{n=e.s,r=e.j,o=e.u,a=e.k,c=e.f,s=e.p,l=e.r,i=e.w,u=e.l,f=e.n,p=e.i,h=e.a}],execute:function(){e({a:function(e){const n=function(e){const{history:t,location:n}=window,r={value:ne(e,n)},o={value:t.state};function a(r,a,c){const s=e.indexOf("#"),l=s>-1?(n.host&&document.querySelector("base")?e:e.slice(s))+r:te()+e+r;try{t[c?"replaceState":"pushState"](a,"",l),o.value=a}catch(i){n[c?"replace":"assign"](l)}}function c(e,n){a(e,m({},t.state,re(o.value.back,e,o.value.forward,!0),n,{position:o.value.position}),!0),r.value=e}function s(e,n){const c=m({},o.value,t.state,{forward:e,scroll:Z()});a(c.current,c,!0),a(e,m({},re(r.value,e,null),{position:c.position+1},n),!1),r.value=e}return o.value||a(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0),{location:r,state:o,push:s,replace:c}}(e=function(e){if(!e)if(t){const t=document.querySelector("base");e=(e=t&&t.getAttribute("href")||"/").replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return"/"!==e[0]&&"#"!==e[0]&&(e="/"+e),I(e)}(e)),r=function(e,t,n,r){let o=[],a=[],c=null;const s=({state:a})=>{const s=ne(e,location),l=n.value,i=t.value;let u=0;if(a){if(n.value=s,t.value=a,c&&c===l)return void(c=null);u=i?a.position-i.position:0}else r(s);o.forEach((e=>{e(n.value,l,{delta:u,type:K.pop,direction:u?u>0?Q.forward:Q.back:Q.unknown})}))};function l(){c=n.value}function i(e){o.push(e);const t=()=>{const t=o.indexOf(e);t>-1&&o.splice(t,1)};return a.push(t),t}function u(){const{history:e}=window;e.state&&e.replaceState(m({},e.state,{scroll:Z()}),"")}function f(){for(const e of a)e();a=[],window.removeEventListener("popstate",s),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",s),window.addEventListener("beforeunload",u,{passive:!0}),{pauseListeners:l,listen:i,destroy:f}}(e,n.state,n.location,n.replace),o=m({location:"",base:e,go:function(e,t=!0){t||r.pauseListeners(),history.go(e)},createHref:N.bind(null,e)},n,r);return Object.defineProperty(o,"location",{enumerable:!0,get:()=>n.location.value}),Object.defineProperty(o,"state",{enumerable:!0,get:()=>n.state.value}),o},c:function(e){const r=function(e,t){const n=[],r=new Map;function o(e){return r.get(e)}function a(e,n,r){const o=!r,s=we(e);s.aliasOf=r&&r.record;const i=Oe(t,e),u=[s];if("alias"in e){const t="string"==typeof e.alias?[e.alias]:e.alias;for(const e of t)u.push(we(m({},s,{components:r?r.record.components:s.components,path:e,aliasOf:r?r.record:s})))}let f,p;for(const t of u){const{path:u}=t;if(n&&"/"!==u[0]){const e=n.record.path,r="/"===e[e.length-1]?"":"/";t.path=n.record.path+(u&&r+u)}if(f=ye(t,n,i),r?r.alias.push(f):(p=p||f,p!==f&&p.alias.push(f),o&&e.name&&!Re(f)&&c(e.name)),xe(f)&&l(f),s.children){const e=s.children;for(let t=0;t<e.length;t++)a(e[t],f,r&&r.children[t])}r=r||f}return p?()=>{c(p)}:v}function c(e){if(oe(e)){const t=r.get(e);t&&(r.delete(e),n.splice(n.indexOf(t),1),t.children.forEach(c),t.alias.forEach(c))}else{const t=n.indexOf(e);t>-1&&(n.splice(t,1),e.record.name&&r.delete(e.record.name),e.children.forEach(c),e.alias.forEach(c))}}function s(){return n}function l(e){const t=function(e,t){let n=0,r=t.length;for(;n!==r;){const o=n+r>>1;de(e,t[o])<0?r=o:n=o+1}const o=function(e){let t=e;for(;t=t.parent;)if(xe(t)&&0===de(e,t))return t}(e);return o&&(r=t.lastIndexOf(o,r-1)),r}(e,n);n.splice(t,0,e),e.record.name&&!Re(e)&&r.set(e.record.name,e)}function i(e,t){let o,a,c,s={};if("name"in e&&e.name){if(o=r.get(e.name),!o)throw le(1,{location:e});c=o.record.name,s=m(be(t.params,o.keys.filter((e=>!e.optional)).concat(o.parent?o.parent.keys.filter((e=>e.optional)):[]).map((e=>e.name))),e.params&&be(e.params,o.keys.map((e=>e.name)))),a=o.stringify(s)}else if(null!=e.path)a=e.path,o=n.find((e=>e.re.test(a))),o&&(s=o.parse(a),c=o.record.name);else{if(o=t.name?r.get(t.name):n.find((e=>e.re.test(t.path))),!o)throw le(1,{location:e,currentLocation:t});c=o.record.name,s=m({},t.params,e.params),a=o.stringify(s)}const l=[];let i=o;for(;i;)l.unshift(i.record),i=i.parent;return{name:c,path:a,params:s,matched:l,meta:ke(l)}}function u(){n.length=0,r.clear()}return t=Oe({strict:!1,end:!0,sensitive:!1},t),e.forEach((e=>a(e))),{addRoute:a,resolve:i,removeRoute:c,clearRoutes:u,getRoutes:s,getRecordMatcher:o}}(e.routes,e),c=e.parseQuery||Pe,s=e.stringifyQuery||Ce,l=e.history,i=Me(),u=Me(),p=Me(),h=n(z);let d=z;t&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const b=g.bind(null,(e=>""+e)),w=g.bind(null,B),E=g.bind(null,G);function R(e,t){if(t=m({},t||h.value),"string"==typeof e){const n=T(c,e,t.path),o=r.resolve({path:n.path},t),a=l.createHref(n.fullPath);return m(n,o,{params:E(o.params),hash:G(n.hash),redirectedFrom:void 0,href:a})}let n;if(null!=e.path)n=m({},e,{path:T(c,e.path,t.path).path});else{const r=m({},e.params);for(const e in r)null==r[e]&&delete r[e];n=m({},e,{params:w(r)}),t.params=w(t.params)}const o=r.resolve(n,t),a=e.hash||"";o.params=b(E(o.params));const i=function(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}(s,m({},e,{hash:(u=a,L(u).replace($,"{").replace(A,"}").replace(C,"^")),path:o.path}));var u;const f=l.createHref(i);return m({fullPath:i,hash:a,query:s===Ce?je(e.query):e.query||{}},o,{redirectedFrom:void 0,href:f})}function k(e){return"string"==typeof e?T(c,e,h.value.path):m({},e)}function O(e,t){if(d!==e)return le(8,{from:t,to:e})}function x(e){return j(e)}function P(e){const t=e.matched[e.matched.length-1];if(t&&t.redirect){const{redirect:n}=t;let r="function"==typeof n?n(e):n;return"string"==typeof r&&(r=r.includes("?")||r.includes("#")?r=k(r):{path:r},r.params={}),m({query:e.query,hash:e.hash,params:null!=r.path?{}:e.params},r)}}function j(e,t){const n=d=R(e),r=h.value,o=e.state,a=e.force,c=!0===e.replace,l=P(n);if(l)return j(m(k(l),{state:"object"==typeof l?m({},o,l.state):o,force:a,replace:c}),t||n);const i=n;let u;return i.redirectedFrom=t,!a&&function(e,t,n){const r=t.matched.length-1,o=n.matched.length-1;return r>-1&&r===o&&D(t.matched[r],n.matched[o])&&U(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}(s,r,n)&&(u=le(16,{to:i,from:r}),N(r,r,!0,!1)),(u?Promise.resolve(u):M(i,r)).catch((e=>ie(e)?ie(e,2)?e:Y(e):X(e,i,r))).then((e=>{if(e){if(ie(e,2))return j(m({replace:c},k(e.to),{state:"object"==typeof e.to?m({},o,e.to.state):o,force:a}),t||i)}else e=I(i,r,!0,c,o);return _(i,r,e),e}))}function S(e,t){const n=O(e,t);return n?Promise.reject(n):Promise.resolve()}function q(e){const t=re.values().next().value;return t&&"function"==typeof t.runWithContext?t.runWithContext(e):e()}function M(e,t){let n;const[r,o,a]=function(e,t){const n=[],r=[],o=[],a=Math.max(t.matched.length,e.matched.length);for(let c=0;c<a;c++){const a=t.matched[c];a&&(e.matched.find((e=>D(e,a)))?r.push(a):n.push(a));const s=e.matched[c];s&&(t.matched.find((e=>D(e,s)))||o.push(s))}return[n,r,o]}(e,t);n=Ge(r.reverse(),"beforeRouteLeave",e,t);for(const s of r)s.leaveGuards.forEach((r=>{n.push(Be(r,e,t))}));const c=S.bind(null,e,t);return n.push(c),ce(n).then((()=>{n=[];for(const r of i.list())n.push(Be(r,e,t));return n.push(c),ce(n)})).then((()=>{n=Ge(o,"beforeRouteUpdate",e,t);for(const r of o)r.updateGuards.forEach((r=>{n.push(Be(r,e,t))}));return n.push(c),ce(n)})).then((()=>{n=[];for(const r of a)if(r.beforeEnter)if(y(r.beforeEnter))for(const o of r.beforeEnter)n.push(Be(o,e,t));else n.push(Be(r.beforeEnter,e,t));return n.push(c),ce(n)})).then((()=>(e.matched.forEach((e=>e.enterCallbacks={})),n=Ge(a,"beforeRouteEnter",e,t,q),n.push(c),ce(n)))).then((()=>{n=[];for(const r of u.list())n.push(Be(r,e,t));return n.push(c),ce(n)})).catch((e=>ie(e,8)?e:Promise.reject(e)))}function _(e,t,n){p.list().forEach((r=>q((()=>r(e,t,n)))))}function I(e,n,r,o,a){const c=O(e,n);if(c)return c;const s=n===z,i=t?history.state:{};r&&(o||s?l.replace(e.fullPath,m({scroll:s&&i&&i.scroll},a)):l.push(e.fullPath,a)),h.value=e,N(e,n,r,s),Y()}let W;function V(){W||(W=l.listen(((e,n,r)=>{if(!ae.listening)return;const o=R(e),a=P(o);if(a)return void j(m(a,{replace:!0,force:!0}),o).catch(v);d=o;const c=h.value;var s,i;t&&(s=J(c.fullPath,r.delta),i=Z(),ee.set(s,i)),M(o,c).catch((e=>ie(e,12)?e:ie(e,2)?(j(m(k(e.to),{force:!0}),o).then((e=>{ie(e,20)&&!r.delta&&r.type===K.pop&&l.go(-1,!1)})).catch(v),Promise.reject()):(r.delta&&l.go(-r.delta,!1),X(e,o,c)))).then((e=>{(e=e||I(o,c,!1))&&(r.delta&&!ie(e,8)?l.go(-r.delta,!1):r.type===K.pop&&ie(e,20)&&l.go(-1,!1)),_(o,c,e)})).catch(v)})))}let F,H=Me(),Q=Me();function X(e,t,n){Y(e);const r=Q.list();return r.length&&r.forEach((r=>r(e,t,n))),Promise.reject(e)}function Y(e){return F||(F=!e,V(),H.list().forEach((([t,n])=>e?n(e):t())),H.reset()),e}function N(n,r,o,a){const{scrollBehavior:c}=e;if(!t||!c)return Promise.resolve();const s=!o&&function(e){const t=ee.get(e);return ee.delete(e),t}(J(n.fullPath,0))||(a||!o)&&history.state&&history.state.scroll||null;return f().then((()=>c(n,r,s))).then((e=>e&&function(e){let t;if("el"in e){const n=e.el,r="string"==typeof n&&n.startsWith("#"),o="string"==typeof n?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!o)return;t=function(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}(o,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(null!=t.left?t.left:window.scrollX,null!=t.top?t.top:window.scrollY)}(e))).catch((e=>X(e,n,r)))}const te=e=>l.go(e);let ne;const re=new Set,ae={currentRoute:h,listening:!0,addRoute:function(e,t){let n,o;return oe(e)?(n=r.getRecordMatcher(e),o=t):o=e,r.addRoute(o,n)},removeRoute:function(e){const t=r.getRecordMatcher(e);t&&r.removeRoute(t)},clearRoutes:r.clearRoutes,hasRoute:function(e){return!!r.getRecordMatcher(e)},getRoutes:function(){return r.getRoutes().map((e=>e.record))},resolve:R,options:e,push:x,replace:function(e){return x(m(k(e),{replace:!0}))},go:te,back:()=>te(-1),forward:()=>te(1),beforeEach:i.add,beforeResolve:u.add,afterEach:p.add,onError:Q.add,isReady:function(){return F&&h.value!==z?Promise.resolve():new Promise(((e,t)=>{H.add([e,t])}))},install(e){e.component("RouterLink",Ie),e.component("RouterView",Ue),e.config.globalProperties.$router=this,Object.defineProperty(e.config.globalProperties,"$route",{enumerable:!0,get:()=>o(h)}),t&&!ne&&h.value===z&&(ne=!0,x(l.location).catch((e=>{})));const n={};for(const t in z)Object.defineProperty(n,t,{get:()=>h.value[t],enumerable:!0});e.provide(Ae,this),e.provide(qe,a(n)),e.provide(Le,h);const r=e.unmount;re.add(e),e.unmount=function(){re.delete(e),re.size<1&&(d=z,W&&W(),W=null,h.value=z,ne=!1,F=!1),r()}}};function ce(e){return e.reduce(((e,t)=>e.then((()=>q(t)))),Promise.resolve())}return ae},u:function(){return p(Ae)}});
/*!
              * vue-router v4.5.0
              * (c) 2024 Eduardo San Martin Morote
              * @license MIT
              */
const t="undefined"!=typeof document;function d(e){return"object"==typeof e||"displayName"in e||"props"in e||"__vccOpts"in e}const m=Object.assign;function g(e,t){const n={};for(const r in t){const o=t[r];n[r]=y(o)?o.map(e):e(o)}return n}const v=()=>{},y=Array.isArray,b=/#/g,w=/&/g,E=/\//g,R=/=/g,k=/\?/g,O=/\+/g,x=/%5B/g,P=/%5D/g,C=/%5E/g,j=/%60/g,$=/%7B/g,S=/%7C/g,A=/%7D/g,q=/%20/g;function L(e){return encodeURI(""+e).replace(S,"|").replace(x,"[").replace(P,"]")}function M(e){return L(e).replace(O,"%2B").replace(q,"+").replace(b,"%23").replace(w,"%26").replace(j,"`").replace($,"{").replace(A,"}").replace(C,"^")}function B(e){return null==e?"":function(e){return L(e).replace(b,"%23").replace(k,"%3F")}(e).replace(E,"%2F")}function G(e){try{return decodeURIComponent(""+e)}catch(t){}return""+e}const _=/\/$/,I=e=>e.replace(_,"");function T(e,t,n="/"){let r,o={},a="",c="";const s=t.indexOf("#");let l=t.indexOf("?");return s<l&&s>=0&&(l=-1),l>-1&&(r=t.slice(0,l),a=t.slice(l+1,s>-1?s:t.length),o=e(a)),s>-1&&(r=r||t.slice(0,s),c=t.slice(s,t.length)),r=function(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/"),o=r[r.length-1];".."!==o&&"."!==o||r.push("");let a,c,s=n.length-1;for(a=0;a<r.length;a++)if(c=r[a],"."!==c){if(".."!==c)break;s>1&&s--}return n.slice(0,s).join("/")+"/"+r.slice(a).join("/")}(null!=r?r:t,n),{fullPath:r+(a&&"?")+a+c,path:r,query:o,hash:G(c)}}function W(e,t){return t&&e.toLowerCase().startsWith(t.toLowerCase())?e.slice(t.length)||"/":e}function D(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function U(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!V(e[n],t[n]))return!1;return!0}function V(e,t){return y(e)?F(e,t):y(t)?F(t,e):e===t}function F(e,t){return y(t)?e.length===t.length&&e.every(((e,n)=>e===t[n])):1===e.length&&e[0]===t}const z={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};var K,H,Q,X;(H=K||(K={})).pop="pop",H.push="push",(X=Q||(Q={})).back="back",X.forward="forward",X.unknown="";const Y=/^[^#]+#/;function N(e,t){return e.replace(Y,"#")+t}const Z=()=>({left:window.scrollX,top:window.scrollY});function J(e,t){return(history.state?history.state.position-t:-1)+e}const ee=new Map;let te=()=>location.protocol+"//"+location.host;function ne(e,t){const{pathname:n,search:r,hash:o}=t,a=e.indexOf("#");if(a>-1){let t=o.includes(e.slice(a))?e.slice(a).length:1,n=o.slice(t);return"/"!==n[0]&&(n="/"+n),W(n,"")}return W(n,e)+r+o}function re(e,t,n,r=!1,o=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:o?Z():null}}function oe(e){return"string"==typeof e||"symbol"==typeof e}const ae=Symbol("");var ce,se;function le(e,t){return m(new Error,{type:e,[ae]:!0},t)}function ie(e,t){return e instanceof Error&&ae in e&&(null==t||!!(e.type&t))}(se=ce||(ce={}))[se.aborted=4]="aborted",se[se.cancelled=8]="cancelled",se[se.duplicated=16]="duplicated";const ue="[^/]+?",fe={sensitive:!1,strict:!1,start:!0,end:!0},pe=/[.+*?^${}()[\]/\\]/g;function he(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?1===e.length&&80===e[0]?-1:1:e.length>t.length?1===t.length&&80===t[0]?1:-1:0}function de(e,t){let n=0;const r=e.score,o=t.score;for(;n<r.length&&n<o.length;){const e=he(r[n],o[n]);if(e)return e;n++}if(1===Math.abs(o.length-r.length)){if(me(r))return 1;if(me(o))return-1}return o.length-r.length}function me(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const ge={type:0,value:""},ve=/[a-zA-Z0-9_]/;function ye(e,t,n){const r=function(e,t){const n=m({},fe,t),r=[];let o=n.start?"^":"";const a=[];for(const l of e){const e=l.length?[]:[90];n.strict&&!l.length&&(o+="/");for(let t=0;t<l.length;t++){const r=l[t];let c=40+(n.sensitive?.25:0);if(0===r.type)t||(o+="/"),o+=r.value.replace(pe,"\\$&"),c+=40;else if(1===r.type){const{value:e,repeatable:n,optional:i,regexp:u}=r;a.push({name:e,repeatable:n,optional:i});const f=u||ue;if(f!==ue){c+=10;try{new RegExp(`(${f})`)}catch(s){throw new Error(`Invalid custom RegExp for param "${e}" (${f}): `+s.message)}}let p=n?`((?:${f})(?:/(?:${f}))*)`:`(${f})`;t||(p=i&&l.length<2?`(?:/${p})`:"/"+p),i&&(p+="?"),o+=p,c+=20,i&&(c+=-8),n&&(c+=-20),".*"===f&&(c+=-50)}e.push(c)}r.push(e)}if(n.strict&&n.end){const e=r.length-1;r[e][r[e].length-1]+=.7000000000000001}n.strict||(o+="/?"),n.end?o+="$":n.strict&&!o.endsWith("/")&&(o+="(?:/|$)");const c=new RegExp(o,n.sensitive?"":"i");return{re:c,score:r,keys:a,parse:function(e){const t=e.match(c),n={};if(!t)return null;for(let r=1;r<t.length;r++){const e=t[r]||"",o=a[r-1];n[o.name]=e&&o.repeatable?e.split("/"):e}return n},stringify:function(t){let n="",r=!1;for(const o of e){r&&n.endsWith("/")||(n+="/"),r=!1;for(const e of o)if(0===e.type)n+=e.value;else if(1===e.type){const{value:a,repeatable:c,optional:s}=e,l=a in t?t[a]:"";if(y(l)&&!c)throw new Error(`Provided param "${a}" is an array but it is not repeatable (* or + modifiers)`);const i=y(l)?l.join("/"):l;if(!i){if(!s)throw new Error(`Missing required param "${a}"`);o.length<2&&(n.endsWith("/")?n=n.slice(0,-1):r=!0)}n+=i}}return n||"/"}}}(function(e){if(!e)return[[]];if("/"===e)return[[ge]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(e){throw new Error(`ERR (${n})/"${i}": ${e}`)}let n=0,r=n;const o=[];let a;function c(){a&&o.push(a),a=[]}let s,l=0,i="",u="";function f(){i&&(0===n?a.push({type:0,value:i}):1===n||2===n||3===n?(a.length>1&&("*"===s||"+"===s)&&t(`A repeatable param (${i}) must be alone in its segment. eg: '/:ids+.`),a.push({type:1,value:i,regexp:u,repeatable:"*"===s||"+"===s,optional:"*"===s||"?"===s})):t("Invalid state to consume buffer"),i="")}function p(){i+=s}for(;l<e.length;)if(s=e[l++],"\\"!==s||2===n)switch(n){case 0:"/"===s?(i&&f(),c()):":"===s?(f(),n=1):p();break;case 4:p(),n=r;break;case 1:"("===s?n=2:ve.test(s)?p():(f(),n=0,"*"!==s&&"?"!==s&&"+"!==s&&l--);break;case 2:")"===s?"\\"==u[u.length-1]?u=u.slice(0,-1)+s:n=3:u+=s;break;case 3:f(),n=0,"*"!==s&&"?"!==s&&"+"!==s&&l--,u="";break;default:t("Unknown state")}else r=n,n=4;return 2===n&&t(`Unfinished custom RegExp for param "${i}"`),f(),c(),o}(e.path),n),o=m(r,{record:e,parent:t,children:[],alias:[]});return t&&!o.record.aliasOf==!t.record.aliasOf&&t.children.push(o),o}function be(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function we(e){const t={path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:e.aliasOf,beforeEnter:e.beforeEnter,props:Ee(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}};return Object.defineProperty(t,"mods",{value:{}}),t}function Ee(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]="object"==typeof n?n[r]:n;return t}function Re(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function ke(e){return e.reduce(((e,t)=>m(e,t.meta)),{})}function Oe(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function xe({record:e}){return!!(e.name||e.components&&Object.keys(e.components).length||e.redirect)}function Pe(e){const t={};if(""===e||"?"===e)return t;const n=("?"===e[0]?e.slice(1):e).split("&");for(let r=0;r<n.length;++r){const e=n[r].replace(O," "),o=e.indexOf("="),a=G(o<0?e:e.slice(0,o)),c=o<0?null:G(e.slice(o+1));if(a in t){let e=t[a];y(e)||(e=t[a]=[e]),e.push(c)}else t[a]=c}return t}function Ce(e){let t="";for(let n in e){const r=e[n];(n=M(n).replace(R,"%3D"),null!=r)?(y(r)?r.map((e=>e&&M(e))):[r&&M(r)]).forEach((e=>{void 0!==e&&(t+=(t.length?"&":"")+n,null!=e&&(t+="="+e))})):void 0!==r&&(t+=(t.length?"&":"")+n)}return t}function je(e){const t={};for(const n in e){const r=e[n];void 0!==r&&(t[n]=y(r)?r.map((e=>null==e?null:""+e)):null==r?r:""+r)}return t}const $e=Symbol(""),Se=Symbol(""),Ae=Symbol(""),qe=Symbol(""),Le=Symbol("");function Me(){let e=[];return{add:function(t){return e.push(t),()=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)}},list:()=>e.slice(),reset:function(){e=[]}}}function Be(e,t,n,r,o,a=e=>e()){const c=r&&(r.enterCallbacks[o]=r.enterCallbacks[o]||[]);return()=>new Promise(((s,l)=>{const i=e=>{var a;!1===e?l(le(4,{from:n,to:t})):e instanceof Error?l(e):"string"==typeof(a=e)||a&&"object"==typeof a?l(le(2,{from:t,to:e})):(c&&r.enterCallbacks[o]===c&&"function"==typeof e&&c.push(e),s())},u=a((()=>e.call(r&&r.instances[o],t,n,i)));let f=Promise.resolve(u);e.length<3&&(f=f.then(i)),f.catch((e=>l(e)))}))}function Ge(e,t,n,r,o=e=>e()){const a=[];for(const c of e)for(const e in c.components){let s=c.components[e];if("beforeRouteEnter"===t||c.instances[e])if(d(s)){const l=(s.__vccOpts||s)[t];l&&a.push(Be(l,n,r,c,e,o))}else{let l=s();a.push((()=>l.then((a=>{if(!a)throw new Error(`Couldn't resolve component "${e}" at "${c.path}"`);const s=(l=a).__esModule||"Module"===l[Symbol.toStringTag]||l.default&&d(l.default)?a.default:a;var l;c.mods[e]=a,c.components[e]=s;const i=(s.__vccOpts||s)[t];return i&&Be(i,n,r,c,e,o)()}))))}}return a}function _e(e){const t=p(Ae),n=p(qe),r=c((()=>{const n=o(e.to);return t.resolve(n)})),a=c((()=>{const{matched:e}=r.value,{length:t}=e,o=e[t-1],a=n.matched;if(!o||!a.length)return-1;const c=a.findIndex(D.bind(null,o));if(c>-1)return c;const s=Te(e[t-2]);return t>1&&Te(o)===s&&a[a.length-1].path!==s?a.findIndex(D.bind(null,e[t-2])):c})),s=c((()=>a.value>-1&&function(e,t){for(const n in t){const r=t[n],o=e[n];if("string"==typeof r){if(r!==o)return!1}else if(!y(o)||o.length!==r.length||r.some(((e,t)=>e!==o[t])))return!1}return!0}(n.params,r.value.params))),l=c((()=>a.value>-1&&a.value===n.matched.length-1&&U(n.params,r.value.params)));return{route:r,href:c((()=>r.value.href)),isActive:s,isExactActive:l,navigate:function(n={}){if(function(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey||e.defaultPrevented||void 0!==e.button&&0!==e.button)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}(n)){const n=t[o(e.replace)?"replace":"push"](o(e.to)).catch(v);return e.viewTransition&&"undefined"!=typeof document&&"startViewTransition"in document&&document.startViewTransition((()=>n)),n}return Promise.resolve()}}}const Ie=r({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:_e,setup(e,{slots:t}){const n=h(_e(e)),{options:r}=p(Ae),o=c((()=>({[We(e.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[We(e.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive})));return()=>{const r=t.default&&(1===(a=t.default(n)).length?a[0]:a);var a;return e.custom?r:u("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:o.value},r)}}});function Te(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const We=(e,t,n)=>null!=e?e:null!=t?t:n;function De(e,t){if(!e)return null;const n=e(t);return 1===n.length?n[0]:n}const Ue=r({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const r=p(Le),a=c((()=>e.route||r.value)),f=p(Se,0),h=c((()=>{let e=o(f);const{matched:t}=a.value;let n;for(;(n=t[e])&&!n.components;)e++;return e})),d=c((()=>a.value.matched[h.value]));s(Se,c((()=>h.value+1))),s($e,d),s(Le,a);const g=l();return i((()=>[g.value,d.value,e.name]),(([e,t,n],[r,o,a])=>{t&&(t.instances[n]=e,o&&o!==t&&e&&e===r&&(t.leaveGuards.size||(t.leaveGuards=o.leaveGuards),t.updateGuards.size||(t.updateGuards=o.updateGuards))),!e||!t||o&&D(t,o)&&r||(t.enterCallbacks[n]||[]).forEach((t=>t(e)))}),{flush:"post"}),()=>{const r=a.value,o=e.name,c=d.value,s=c&&c.components[o];if(!s)return De(n.default,{Component:s,route:r});const l=c.props[o],i=l?!0===l?r.params:"function"==typeof l?l(r):l:null,f=u(s,m({},i,t,{onVnodeUnmounted:e=>{e.component.isUnmounted&&(c.instances[o]=null)},ref:g}));return De(n.default,{Component:f,route:r})||f}}})}}}));
