const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["js/ApiUrlInput-C4sch7JW.js","js/api-Dkp0HVh_.js","js/pinia-B-GcKEsP.js","js/vue-DxgGeFJl.js","js/vue-helper-DlAUqK2U.js","css/ApiUrlInput-V9aK-WBV.css","js/HomeView-BeFwieTK.js","js/vue-router-DonpkudU.js","css/HomeView-Snt8r08h.css","js/ApiDemoView-CdIdZK7W.js","js/deepseekService-BZ6cPSw1.js","js/prompt-Isuc_DMh.js","css/ApiDemoView-DFsY5bup.css","js/GameView-LZdEmqAx.js","css/GameView-CJ9WCByN.css","js/PromptLibraryView-DejVqFA5.js","css/PromptLibraryView-DxGL5JH8.css"])))=>i.map(i=>d[i]);
import{j as P,q as A,v as t,x as u,y as f,z as x,A as D,B as I,u as k,C as L,D as O,E as _,F as g,G as C}from"./vue-DxgGeFJl.js";import{c as S}from"./pinia-B-GcKEsP.js";import{c as V,a as R}from"./vue-router-DonpkudU.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const T="modulepreload",B=function(p){return"/magicforge/"+p},b={},d=function(i,n,s){let e=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));e=Promise.allSettled(n.map(l=>{if(l=B(l),l in b)return;b[l]=!0;const m=l.endsWith(".css"),y=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${y}`))return;const c=document.createElement("link");if(c.rel=m?"stylesheet":T,m||(c.as="script"),c.crossOrigin="",c.href=l,a&&c.setAttribute("nonce",a),document.head.appendChild(c),m)return new Promise((w,E)=>{c.addEventListener("load",w),c.addEventListener("error",()=>E(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return e.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return i().catch(r)})},N="/magicforge/img/user-Dki7TF9f.jpg",$={class:"min-h-screen bg-gray-50"},j={class:"bg-white/80 backdrop-blur-md border-b border-gray-100 fixed w-full top-0 z-50"},q={class:"max-w-7xl mx-auto"},F={class:"flex justify-between items-center h-20 px-6"},U={class:"flex items-center"},W={class:"flex space-x-2 bg-gray-100/80 backdrop-blur-sm p-1.5 rounded-xl"},z={class:"pt-28 pb-16 px-6"},G={class:"max-w-7xl mx-auto"},H={class:"bg-white border-t border-gray-100"},K={class:"max-w-7xl mx-auto px-6 py-4"},Y={class:"text-sm text-gray-500 text-center"},J=P({__name:"App",setup(p){const i=L(()=>d(()=>import("./ApiUrlInput-C4sch7JW.js"),__vite__mapDeps([0,1,2,3,4,5])));return(n,s)=>{const e=x("router-link"),r=x("router-view");return _(),A("div",$,[t("header",j,[t("div",q,[t("div",F,[s[4]||(s[4]=t("div",{class:"flex items-center gap-4"},[t("div",{class:"p-2 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl"},[t("img",{src:N,alt:"Deepseek API",class:"h-9 w-9"})]),t("h1",{class:"text-lg font-bold bg-gradient-to-br from-purple-600 to-blue-500 bg-clip-text text-transparent"}," 南辰——Deepseek API ")],-1)),t("nav",U,[t("div",W,[u(e,{to:"/",class:"relative px-4 py-2 rounded-lg text-gray-700 hover:text-purple-600 transition-colors duration-200 group","active-class":"text-purple-600 bg-white shadow-sm shadow-purple-100"},{default:f(()=>s[0]||(s[0]=[g(" 首页 "),t("div",{class:"absolute inset-x-0 -bottom-[6px] h-[2px] bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"},null,-1)])),_:1}),u(e,{to:"/api-demo",class:"relative px-4 py-2 rounded-lg text-gray-700 hover:text-purple-600 transition-colors duration-200 group","active-class":"text-purple-600 bg-white shadow-sm shadow-purple-100"},{default:f(()=>s[1]||(s[1]=[g(" API演示 "),t("div",{class:"absolute inset-x-0 -bottom-[6px] h-[2px] bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"},null,-1)])),_:1}),u(e,{to:"/game",class:"relative px-4 py-2 rounded-lg text-gray-700 hover:text-purple-600 transition-colors duration-200 group","active-class":"text-purple-600 bg-white shadow-sm shadow-purple-100"},{default:f(()=>s[2]||(s[2]=[g(" 游戏演示 "),t("div",{class:"absolute inset-x-0 -bottom-[6px] h-[2px] bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"},null,-1)])),_:1}),u(e,{to:"/prompt-library",class:"relative px-4 py-2 rounded-lg text-gray-700 hover:text-purple-600 transition-colors duration-200 group","active-class":"text-purple-600 bg-white shadow-sm shadow-purple-100"},{default:f(()=>s[3]||(s[3]=[g(" 提示库 "),t("div",{class:"absolute inset-x-0 -bottom-[6px] h-[2px] bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"},null,-1)])),_:1})])])])])]),t("main",z,[t("div",G,[n.$route.path!=="/"?(_(),D(k(i),{key:0,class:"mb-6"})):I("",!0),u(r)])]),t("footer",H,[t("div",K,[t("p",Y," © "+O(new Date().getFullYear())+" SouthernWind——Deepseek API 网页版 | 基于 Deepseek API 构建 ",1)])])])}}}),v=V({history:R("/magicforge/"),routes:[{path:"/",name:"home",component:()=>d(()=>import("./HomeView-BeFwieTK.js"),__vite__mapDeps([6,7,3,4,8])),meta:{title:"首页"}},{path:"/api-demo",name:"api-demo",component:()=>d(()=>import("./ApiDemoView-CdIdZK7W.js"),__vite__mapDeps([9,3,10,11,2,4,1,7,12])),meta:{title:"API演示"}},{path:"/game",name:"game",component:()=>d(()=>import("./GameView-LZdEmqAx.js"),__vite__mapDeps([13,3,2,10,4,1,14])),meta:{title:"游戏演示"}},{path:"/prompt-library",name:"prompt-library",component:()=>d(()=>import("./PromptLibraryView-DejVqFA5.js"),__vite__mapDeps([15,7,3,4,11,2,16])),meta:{title:"提示库"}},{path:"/:pathMatch(.*)*",redirect:"/"}]});v.beforeEach((p,i,n)=>{document.title=`${p.meta.title||"Deepseek API客户端"}`,n()});const h=C(J);h.use(S());h.use(v);h.mount("#app");export{N as _};
