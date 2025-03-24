import{j as ne,r as u,w as he,f as O,I as re,q as a,x as r,v as e,J as U,K as z,L,O as _,P as oe,Q as ie,E as m,B as v,G as C,M as K,R as ye,F as l,y as we}from"./vue-CK8Ph4lA.js";import{d as ke}from"./pinia-y9-SCy9m.js";import{D as _e,a as T,u as Se}from"./deepseekService-BQ7FS_Zp.js";import{_ as de}from"./vue-helper-DlAUqK2U.js";const Ie=ke("game",{state:()=>({playerName:"",currentSceneId:1,currentScene:void 0,isGenerating:!1,aiErrorMessage:"",gameLogs:[],storyProgress:{mainQuests:{gaming:0,study:0,social:0},relationships:{李雪:{character:"李雪",affinity:0,events:[]},王老师:{character:"王老师",affinity:0,events:[]}},flags:new Set},initialScene:{id:1,image:"https://source.unsplash.com/800x500/?classroom,student,chinese&t="+Date.now(),description:'高考倒计时30天，某市第一高中的教室里，小明正心不在焉地听着班主任王老师讲解数学题。但他的心思完全在今晚的游戏排位赛上 —— 作为服务器知名的剑魔玩家"最强剑魔"，他已经连续29天冲击王者失败了。昨晚的直播间里，他又因为激动地大喊"回答我！"把麦克风震炸了。',dialog:'（小明看着手机里的游戏战绩，自言自语）"怎么不找找自己的问题呢...这把打完我要是能拿MVP就好了。"',options:[{text:"专心听课",next:2,hint:"做一个好学生",impact:{quest:{type:"study",value:10},relationship:{character:"王老师",value:5}}},{text:"继续研究剑魔连招",next:3,hint:"今晚一定要上王者",impact:{quest:{type:"gaming",value:10},relationship:{character:"王老师",value:-5}}},{text:"给李雪递纸条",next:4,hint:"要不要约她双排？",impact:{quest:{type:"social",value:5},relationship:{character:"李雪",value:10}}}],context:{mood:"焦虑",location:"教室",timeOfDay:"上午",previousEvents:["昨晚直播麦克风炸了","连续29天冲击王者失败"]},specialEvent:"王老师正在讲解一道高考压轴题，黑板上写满了公式。小明的手机里还在循环播放着昨晚的直播片段。"}}),actions:{setPlayerName(g){this.playerName=g},async startNewGame(){this.currentScene=this.initialScene,this.currentSceneId=1,this.gameLogs=[],this.addGameLog(1,"游戏开始")},async handleChoice(g){try{this.isGenerating=!0,this.aiErrorMessage="";const d=g.text;this.addGameLog(this.currentSceneId,d),g.impact&&this.processImpact(g.impact);const i=await _e.generateScene({playerName:this.playerName,currentSceneId:this.currentSceneId,choiceText:d,currentScene:this.currentScene,storyProgress:this.storyProgress,streamCallbacks:{onReasoningUpdate:c=>{this.updateReasoningStream(c)},onDialogUpdate:c=>{this.updateDialogStream(c)}}});this.currentScene=i,this.currentSceneId=i.id}catch(d){console.error("处理选择时出错:",d),this.aiErrorMessage="生成场景失败: "+(d.message||"未知错误")}finally{this.isGenerating=!1}},processImpact(g){if(g.quest){const{type:d,value:i}=g.quest;d&&typeof i=="number"&&(d==="gaming"&&(this.storyProgress.mainQuests.gaming=Math.min(100,this.storyProgress.mainQuests.gaming+i)),d==="study"&&(this.storyProgress.mainQuests.study=Math.min(100,this.storyProgress.mainQuests.study+i)),d==="social"&&(this.storyProgress.mainQuests.social=Math.min(100,this.storyProgress.mainQuests.social+i)))}if(g.relationship){const{character:d,value:i}=g.relationship;if(d&&typeof i=="number"&&this.storyProgress.relationships[d]&&(this.storyProgress.relationships[d].affinity+=i,i!==0)){const c=i>0?"关系改善":"关系恶化";this.storyProgress.relationships[d].events.push(c)}}g.flag&&this.storyProgress.flags.add(g.flag)},updateReasoningStream(g){console.log("思维链更新:",g)},updateDialogStream(g){console.log("对话更新:",g)},addGameLog(g,d){this.gameLogs.push({sceneId:g,choiceText:d,timestamp:new Date().toISOString()})},resetGame(){this.currentScene=this.initialScene,this.currentSceneId=1,this.gameLogs=[],this.isGenerating=!1,this.aiErrorMessage="",this.storyProgress={mainQuests:{gaming:0,study:0,social:0},relationships:{李雪:{character:"李雪",affinity:0,events:[]},王老师:{character:"王老师",affinity:0,events:[]}},flags:new Set}}}}),Pe={class:"min-h-screen bg-slate-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(94,114,228,0.05),rgba(255,255,255,0))]"},Ce={key:0,class:"max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-12"},Me={class:"relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white p-6 sm:p-12 text-center min-h-[500px] sm:min-h-[600px] shadow-lg shadow-indigo-100/50 border border-slate-100"},Ge={class:"relative z-10 w-full max-w-md mx-auto mb-6 sm:mb-8"},Ae={class:"bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-100 shadow-sm"},je={class:"space-y-4"},Qe={class:"flex flex-wrap gap-2 mb-3"},De=["onClick"],Ne={class:"flex gap-2"},Ue={class:"relative z-10 w-full max-w-md mx-auto"},Ee={class:"bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm"},Be={class:"mb-6 sm:mb-8"},$e={class:"relative group"},Ve=["disabled"],ze={key:1,class:"max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-12"},Le={class:"rounded-xl sm:rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-lg shadow-indigo-100/50"},Te={class:"bg-slate-50 border-b border-slate-100 p-4 sm:p-6"},qe={class:"flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"},Re={class:"flex items-center gap-3 sm:gap-4"},Oe={class:"text-base sm:text-lg font-bold text-slate-800"},Ke={class:"flex flex-wrap items-center gap-2 sm:gap-4 w-full sm:w-auto"},Fe={class:"px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm"},He={class:"p-4 sm:p-8 space-y-4 sm:space-y-6 bg-white"},Je={class:"mb-4 sm:mb-6 border border-slate-100 rounded-2xl overflow-hidden bg-white"},We={class:"flex border-b border-slate-100"},Xe={key:0,class:"absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500"},Ye={class:"flex items-center justify-center gap-1 sm:gap-2"},Ze={key:0,class:"inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium"},et={key:0,class:"absolute bottom-0 left-0 w-full h-0.5 bg-purple-500"},tt={key:0,class:"absolute bottom-0 left-0 w-full h-0.5 bg-red-500"},st={class:"p-4 sm:p-6"},at={key:0,class:"animate-fadeIn"},lt={class:"flex gap-3 sm:gap-4"},ot={key:0,class:"text-slate-600 italic"},it={class:"text-slate-600 italic text-sm sm:text-base"},nt={key:1,class:"animate-fadeIn"},rt={class:"flex gap-3 sm:gap-4"},dt={key:0,class:"text-slate-600 italic"},ut={class:"text-slate-700 leading-relaxed text-sm sm:text-base"},mt={key:2,class:"animate-fadeIn"},pt={class:"bg-red-50 rounded-lg p-3 sm:p-4 border border-red-100"},gt={class:"flex items-start gap-2 sm:gap-3"},vt={class:"font-bold text-red-700 flex items-center gap-2 text-sm sm:text-base"},ct={key:0},xt={class:"text-red-600 mt-1 mb-2 text-xs sm:text-sm"},bt={key:0,class:"text-xs sm:text-sm space-y-2 text-slate-700"},ft={class:"relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/30 to-blue-50/30 rounded-xl sm:rounded-2xl p-5 sm:p-7 border border-indigo-100/50 mb-4 sm:mb-6 shadow-lg shadow-indigo-100/20 backdrop-blur-sm group"},ht={class:"relative flex items-start"},yt={class:"flex-1"},wt={class:"text-slate-700 text-sm sm:text-base leading-relaxed font-medium"},kt={class:"relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50/20 to-blue-50/20 rounded-xl sm:rounded-2xl p-5 sm:p-7 border border-indigo-200/50 mb-4 sm:mb-6 shadow-lg shadow-indigo-200/20 backdrop-blur-sm group"},_t={class:"relative flex items-start"},St={class:"flex-1"},It={class:"bg-white/40 backdrop-blur-sm rounded-lg p-4 border border-indigo-100/50 shadow-sm"},Pt={class:"text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line"},Ct={key:0,class:"relative overflow-hidden bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-indigo-100 mb-4 sm:mb-6"},Mt={class:"flex gap-3 sm:gap-4"},Gt={class:"text-slate-600 text-sm sm:text-base"},At={class:"grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6"},jt={class:"bg-white rounded-xl border border-slate-100 p-3 sm:p-4 relative overflow-hidden group"},Qt={class:"text-xs sm:text-sm text-slate-500 mb-1 flex justify-between items-center"},Dt={class:"w-full bg-slate-100 rounded-full h-2 overflow-hidden"},Nt={key:0,class:"absolute inset-0 pointer-events-none"},Ut={class:"bg-white rounded-xl border border-slate-100 p-3 sm:p-4 relative overflow-hidden group"},Et={class:"text-xs sm:text-sm text-slate-500 mb-1 flex justify-between items-center"},Bt={class:"w-full bg-slate-100 rounded-full h-2 overflow-hidden"},$t={key:0,class:"absolute inset-0 pointer-events-none"},Vt={class:"bg-white rounded-xl border border-slate-100 p-3 sm:p-4 relative overflow-hidden group"},zt={class:"text-xs sm:text-sm text-slate-500 mb-1 flex justify-between items-center"},Lt={class:"w-full bg-slate-100 rounded-full h-2 overflow-hidden"},Tt={key:0,class:"absolute inset-0 pointer-events-none"},qt=["onClick"],Rt={class:"relative bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-100 transform group-hover:-translate-y-1 transition-all duration-300 group-hover:shadow-md group-hover:shadow-indigo-100/50"},Ot={class:"text-slate-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base"},Kt={key:0,class:"text-slate-500 text-xs sm:text-sm italic"},Ft={class:"space-y-4"},Ht={class:"text-base sm:text-lg font-medium text-slate-800"},Jt={class:"mt-2 space-y-2"},Wt={key:0,class:"flex items-start gap-2"},Xt={key:1,class:"flex items-start gap-2"},Yt={key:2,class:"flex items-start gap-2"},Zt={key:3,class:"flex items-start gap-2"},es={key:3,class:"fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50"},ts={key:4,class:"fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-50"},ss={class:"relative"},as={class:"relative bg-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-red-100 text-red-500 flex items-center gap-2 sm:gap-3 shadow-lg shadow-red-100/50 text-sm sm:text-base"},ls={class:"font-medium"},os={key:5,class:"fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"},is={class:"relative max-w-lg w-full mx-4"},ns={class:"relative overflow-hidden bg-white/90 backdrop-blur-lg rounded-xl sm:rounded-2xl p-8 sm:p-10 shadow-xl border border-white/50"},rs={class:"text-white text-2xl"},ds={class:"text-slate-700 text-center"},us={class:"flex items-center justify-center gap-2"},ms=ne({__name:"GiaoGame",props:{apiBaseUrl:{type:String,default:""}},setup(g){const d=g,i=Ie(),c=u(""),M=u(!0),w=u("https://api.siliconflow.cn/v1/chat/completions"),G=u("sk-etybbrewlaafxjjqtlgfeqaaskzrmryfndjtjjecyixbsznw"),f=u("deepseek-ai/DeepSeek-R1-Distill-Qwen-7B");u("story"),u("");const F=u(!1),A=u(!1),S=u(""),E=u(!1),I=u(""),B=u(!1),j=u(""),k=u(!1),$=u(""),V=u(""),o=u(""),n=u({gaming:25,study:10,social:5});u([{role:"assistant",content:"欢迎来到 AI 互动游戏！请选择你想要的游戏模式，我们将开始一段奇妙的旅程。"}]);const H=u(!1),ue={400:{title:"格式错误",reason:"请求体格式错误",solution:"请根据错误信息提示修改请求体"},401:{title:"认证失败",reason:"API key 错误，认证失败",solution:"请检查您的 API key 是否正确，如没有 API key，请先创建 API key"},402:{title:"余额不足",reason:"账号余额不足",solution:"请确认账户余额，并前往充值页面进行充值"},422:{title:"参数错误",reason:"请求体参数错误",solution:"请根据错误信息提示修改相关参数"},429:{title:"请求速率达到上限",reason:"请求速率（TPM 或 RPM）达到上限",solution:"请合理规划您的请求速率"},500:{title:"服务器故障",reason:"服务器内部故障",solution:"请等待后重试。若问题一直存在，请联系我们解决"},503:{title:"服务器繁忙",reason:"服务器负载过高",solution:"请稍后重试您的请求"}},h=u({show:!1,code:"",message:"",details:null}),x=u("dialog");he(()=>d.apiBaseUrl,s=>{s&&(w.value=s,T({baseUrl:s}),console.log("游戏组件: API地址已更新为",s))},{immediate:!0});const y=O(()=>i.currentScene),Q=O(()=>i.isGenerating),J=O(()=>i.aiErrorMessage),q=s=>{f.value=s,T({baseUrl:w.value,apiKey:G.value,model:s}),console.log("模型已更新为:",s)},W=async()=>{if(!c.value){alert("请输入你的名字");return}w.value&&T({baseUrl:w.value,apiKey:G.value,model:f.value}),F.value=!0;try{i.setPlayerName(c.value),M.value=!1,await i.startNewGame(),pe()}catch(s){console.error("游戏启动错误:",s),alert("游戏启动失败，请检查API设置或稍后再试")}finally{F.value=!1}},X=()=>{i.$onAction(({name:s,args:t})=>{s==="updateReasoningStream"&&t[0]&&(S.value+=t[0],f.value!=="deepseek-chat"&&S.value&&x.value==="dialog"&&(x.value="reasoning")),s==="updateDialogStream"&&t[0]&&(I.value+=t[0],I.value&&x.value==="reasoning"&&(x.value="dialog"))}),H.value=!0,console.log("已设置流式监听器")},me=async s=>{try{if(S.value="",I.value="",E.value=f.value!=="deepseek-chat",B.value=!0,ee(),H.value||X(),s.impact)Y(s.impact);else{const t=s.text.toLowerCase();let b="social";t.includes("游戏")||t.includes("打")||t.includes("剑魔")||t.includes("技能")||t.includes("排位")||t.includes("连招")?b="gaming":(t.includes("学习")||t.includes("考试")||t.includes("上课")||t.includes("听讲")||t.includes("作业")||t.includes("专心"))&&(b="study");const P={quest:{type:b,value:5+Math.floor(Math.random()*5)}};Y(P)}f.value==="deepseek-chat"?x.value="dialog":x.value="reasoning",await i.handleChoice(s),E.value=!1,B.value=!1}catch(t){console.error("处理选择时出错:",t),E.value=!1,B.value=!1,xe(t)}},Y=s=>{if(s.quest){const{type:t,value:b}=s.quest;t==="gaming"&&(n.value.gaming=Math.min(100,n.value.gaming+b)),t==="study"&&(n.value.study=Math.min(100,n.value.study+b)),t==="social"&&(n.value.social=Math.min(100,n.value.social+b)),Z()}},Z=()=>{n.value.gaming>=100&&!k.value?($.value="游戏大师",V.value=`恭喜${c.value}！你在游戏技能方面达到了顶峰！你爸打游戏得了MVP，成为了传说中的电竞选手！`,o.value="gaming",k.value=!0):n.value.study>=100&&!k.value?($.value="学霸之路",V.value=`恭喜${c.value}！你在学业上取得了令人瞩目的成就！成为了学院最年轻的教授！`,o.value="study",k.value=!0):n.value.social>=100&&!k.value&&($.value="社交之星",V.value=`恭喜${c.value}！你的社交能力已经炉火纯青！成为了人际关系网络的中心，拥有无数忠实的朋友！`,o.value="social",k.value=!0)},pe=()=>{var s,t,b,P,D,N;n.value={gaming:((t=(s=i.storyProgress)==null?void 0:s.mainQuests)==null?void 0:t.gaming)||25,study:((P=(b=i.storyProgress)==null?void 0:b.mainQuests)==null?void 0:P.study)||10,social:((N=(D=i.storyProgress)==null?void 0:D.mainQuests)==null?void 0:N.social)||5},Z()},ge=()=>{confirm("确定要重置游戏进度吗？")&&(I.value="",i.resetGame(),n.value={gaming:25,study:10,social:5})},ve=()=>{A.value=!A.value},ce=()=>{const s=["deepseek-ai/DeepSeek-R1-Distill-Qwen-7B","deepseek-r1","deepseek-chat","QwQ-32B"],b=(s.indexOf(f.value)+1)%s.length;q(s[b]),A.value=!1},R=s=>{x.value=s},xe=s=>{var t;if((t=s==null?void 0:s.response)!=null&&t.status){const b=s.response.status.toString();h.value={show:!0,code:b,message:s.message||"未知错误",details:ue[b]||null},x.value="error"}else h.value={show:!0,code:"UNKNOWN",message:s.message||"未知错误",details:null},x.value="error"},ee=()=>{h.value.show=!1,x.value==="error"&&(x.value="dialog")};re(()=>{d.apiBaseUrl&&(w.value=d.apiBaseUrl),T({baseUrl:w.value,apiKey:G.value,model:f.value}),X()});const te=()=>{j.value&&(q(j.value),j.value="")},se=()=>{console.log("开始返回首页");try{I.value="",S.value="",i.resetGame(),n.value={gaming:25,study:10,social:5},M.value=!0,console.log("已返回游戏首页",M.value)}catch(s){console.error("返回首页出错:",s)}},be=()=>{k.value=!1,se()};return(s,t)=>{var b,P,D,N,ae,le;return l(),a("div",Pe,[M.value?(l(),a("div",Ce,[e("div",Me,[t[15]||(t[15]=U('<div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(94,114,228,0.05),rgba(255,255,255,0))]" data-v-651b1178></div><div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-100 to-transparent" data-v-651b1178></div><div class="relative z-10 mb-8 sm:mb-16" data-v-651b1178><div class="inline-block" data-v-651b1178><div class="relative" data-v-651b1178><h1 class="text-3xl sm:text-5xl md:text-6xl font-bold text-slate-800 pb-2 tracking-tight" data-v-651b1178> 小明是最强剑魔 </h1><div class="absolute -bottom-2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-200 to-transparent" data-v-651b1178></div></div><p class="mt-4 sm:mt-6 text-base sm:text-lg text-slate-500" data-v-651b1178>一段关于剑道、学业与青春的传奇</p></div></div>',3)),e("div",Ge,[e("div",Ae,[t[12]||(t[12]=e("h3",{class:"text-lg font-medium text-slate-700 mb-4"},"API 设置",-1)),e("div",je,[e("div",null,[t[9]||(t[9]=e("label",{class:"block text-sm text-slate-600 mb-1"},"API 地址",-1)),z(e("input",{"onUpdate:modelValue":t[0]||(t[0]=p=>w.value=p),type:"text",placeholder:"请输入API地址",class:"w-full px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 text-sm focus:outline-none focus:border-indigo-200 focus:ring-2 focus:ring-indigo-100"},null,512),[[L,w.value]])]),e("div",null,[t[10]||(t[10]=e("label",{class:"block text-sm text-slate-600 mb-1"},"API key",-1)),z(e("input",{"onUpdate:modelValue":t[1]||(t[1]=p=>G.value=p),type:"password",placeholder:"没有可以去deepseek官网注册",class:"w-full px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 text-sm focus:outline-none focus:border-indigo-200 focus:ring-2 focus:ring-indigo-100"},null,512),[[L,G.value]])]),e("div",null,[t[11]||(t[11]=e("label",{class:"block text-sm text-slate-600 mb-1"},"模型选择",-1)),e("div",Qe,[(l(),a(_,null,oe(["deepseek-ai/DeepSeek-R1-Distill-Qwen-7B","deepseek-r1","deepseek-chat","QwQ-32B"],p=>e("button",{key:p,onClick:fe=>q(p),class:v(["px-3 py-2 text-sm rounded-md transition-colors duration-200",f.value===p?"bg-indigo-100 text-indigo-700 border border-indigo-200":"bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"])},m(p),11,De)),64))]),e("div",Ne,[z(e("input",{"onUpdate:modelValue":t[2]||(t[2]=p=>j.value=p),type:"text",placeholder:"输入自定义模型名称",class:"flex-1 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 text-sm focus:outline-none focus:border-indigo-200 focus:ring-2 focus:ring-indigo-100",onKeyup:ie(te,["enter"])},null,544),[[L,j.value]]),e("button",{onClick:te,class:"px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-200 text-sm hover:bg-indigo-100 transition-colors"}," 设置 ")])])])])]),e("div",Ue,[e("div",Ee,[e("div",Be,[e("div",$e,[z(e("input",{"onUpdate:modelValue":t[3]||(t[3]=p=>c.value=p),type:"text",placeholder:"输入你的名字，剑客",class:"w-full px-10 sm:px-14 py-3 sm:py-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-200 focus:ring-2 focus:ring-indigo-100 transition-all duration-300",onKeyup:ie(W,["enter"])},null,544),[[L,c.value]]),t[13]||(t[13]=e("span",{class:"absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 text-xl sm:text-2xl text-slate-400 group-focus-within:text-indigo-400 transition-colors duration-300"},"⚔️",-1))])]),e("button",{onClick:W,disabled:!c.value,class:"relative w-full group"},t[14]||(t[14]=[e("div",{class:"relative bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl px-6 py-3 sm:py-4 text-white font-medium transform group-hover:-translate-y-1 group-active:translate-y-0 transition-all duration-300 shadow-md shadow-indigo-100"},[e("span",{class:"flex items-center justify-center gap-3"},[e("span",{class:"text-base sm:text-lg"},"开启传奇"),e("span",{class:"text-xl"},"🗡️")])],-1)]),8,Ve)])])])])):M.value?r("",!0):(l(),a("div",ze,[e("div",Le,[e("div",Te,[e("div",qe,[e("div",Re,[t[17]||(t[17]=e("div",{class:"w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 p-[1px]"},[e("div",{class:"w-full h-full rounded-[10px] bg-white flex items-center justify-center"},[e("span",{class:"text-xl sm:text-2xl"},"⚔️")])],-1)),e("div",null,[e("div",Oe,m(c.value),1),t[16]||(t[16]=e("div",{class:"text-xs sm:text-sm text-slate-500"},"见习剑客",-1))])]),e("div",Ke,[e("div",Fe," 第 "+m(((b=y.value)==null?void 0:b.id)||"?")+" 章 ",1),e("button",{onClick:ve,class:v(["px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border transition-colors duration-200 text-sm",[f.value==="deepseek-r1"?"bg-purple-50 text-purple-700 border-purple-200":"bg-blue-50 text-blue-700 border-blue-200"]])},m(f.value),3),e("button",{onClick:ge,class:"group px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all duration-300 text-sm"},t[18]||(t[18]=[e("span",{class:"flex items-center gap-2"},[e("span",{class:"text-base sm:text-lg group-hover:rotate-180 transition-transform duration-500"},"🔄"),e("span",{class:"hidden sm:inline"},"重新开始")],-1)])),e("button",{onClick:se,class:"group px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 hover:bg-indigo-100 transition-all duration-300 text-sm"},t[19]||(t[19]=[e("span",{class:"flex items-center gap-2"},[e("span",{class:"text-base sm:text-lg"},"🏠"),e("span",{class:"hidden sm:inline"},"返回首页")],-1)]))])])]),e("div",He,[e("div",Je,[e("div",We,[e("button",{onClick:t[4]||(t[4]=p=>R("dialog")),class:v(["flex-1 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors duration-200 relative",x.value==="dialog"?"text-indigo-600 bg-indigo-50/50":"text-slate-600 hover:text-slate-800 hover:bg-slate-50"])},[t[20]||(t[20]=e("span",{class:"flex items-center justify-center gap-1 sm:gap-2"},[e("span",{class:"text-base sm:text-lg"},"💭"),e("span",null,"对话内容")],-1)),x.value==="dialog"?(l(),a("span",Xe)):r("",!0)],2),f.value!=="deepseek-chat"?(l(),a("button",{key:0,onClick:t[5]||(t[5]=p=>R("reasoning")),class:v(["flex-1 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors duration-200 relative",x.value==="reasoning"?"text-purple-600 bg-purple-50/50":"text-slate-600 hover:text-slate-800 hover:bg-slate-50"])},[e("span",Ye,[t[22]||(t[22]=e("span",{class:"text-base sm:text-lg"},"🤔",-1)),t[23]||(t[23]=e("span",null,"思维过程",-1)),E.value&&!S.value?(l(),a("span",Ze,t[21]||(t[21]=[C(" 思考中 "),e("span",{class:"ml-1 flex space-x-1"},[e("span",{class:"w-1 h-1 bg-purple-700 rounded-full animate-bounce",style:{"animation-delay":"0s"}}),e("span",{class:"w-1 h-1 bg-purple-700 rounded-full animate-bounce",style:{"animation-delay":"0.1s"}}),e("span",{class:"w-1 h-1 bg-purple-700 rounded-full animate-bounce",style:{"animation-delay":"0.2s"}})],-1)]))):r("",!0)]),x.value==="reasoning"?(l(),a("span",et)):r("",!0)],2)):r("",!0),h.value.show?(l(),a("button",{key:1,onClick:t[6]||(t[6]=p=>R("error")),class:v(["flex-1 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors duration-200 relative",x.value==="error"?"text-red-600 bg-red-50/50":"text-slate-600 hover:text-slate-800 hover:bg-slate-50"])},[t[24]||(t[24]=e("span",{class:"flex items-center justify-center gap-1 sm:gap-2"},[e("span",{class:"text-base sm:text-lg"},"⚠️"),e("span",null,"错误信息")],-1)),x.value==="error"?(l(),a("span",tt)):r("",!0)],2)):r("",!0)]),e("div",st,[x.value==="dialog"?(l(),a("div",at,[e("div",lt,[t[26]||(t[26]=e("div",{class:"text-xl sm:text-2xl shrink-0"},"💭",-1)),Q.value&&!I.value?(l(),a("div",ot,t[25]||(t[25]=[U('<div class="flex items-center text-slate-500 text-sm sm:text-base" data-v-651b1178><span data-v-651b1178>AI正在生成对话</span><span class="ml-2 flex space-x-1" data-v-651b1178><span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay:0s;" data-v-651b1178></span><span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay:0.1s;" data-v-651b1178></span><span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay:0.2s;" data-v-651b1178></span></span></div>',1)]))):r("",!0),e("p",it,m(I.value||(y.value?y.value.dialog:"")),1)])])):x.value==="reasoning"?(l(),a("div",nt,[e("div",rt,[t[28]||(t[28]=e("div",{class:"text-xl sm:text-2xl shrink-0"},"🤔",-1)),Q.value&&!S.value?(l(),a("div",dt,t[27]||(t[27]=[U('<div class="flex items-center text-slate-500 text-sm sm:text-base" data-v-651b1178><span data-v-651b1178>AI正在生成思维过程</span><span class="ml-2 flex space-x-1" data-v-651b1178><span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay:0s;" data-v-651b1178></span><span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay:0.1s;" data-v-651b1178></span><span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay:0.2s;" data-v-651b1178></span></span></div>',1)]))):r("",!0),e("p",ut,m(S.value||(y.value?y.value.reasoning:"")),1)])])):x.value==="error"?(l(),a("div",mt,[e("div",pt,[e("div",gt,[t[31]||(t[31]=e("div",{class:"text-xl sm:text-2xl text-red-500 shrink-0"},"⚠️",-1)),e("div",null,[e("h3",vt,[e("span",null,"错误 "+m(h.value.code),1),h.value.details?(l(),a("span",ct,"- "+m(h.value.details.title),1)):r("",!0)]),e("p",xt,m(h.value.message),1),h.value.details?(l(),a("div",bt,[e("p",null,[t[29]||(t[29]=e("span",{class:"font-medium"},"原因：",-1)),e("span",null,m(h.value.details.reason),1)]),e("p",null,[t[30]||(t[30]=e("span",{class:"font-medium"},"解决方法：",-1)),e("span",null,m(h.value.details.solution),1)])])):r("",!0),e("div",{class:"mt-3 sm:mt-4"},[e("button",{onClick:ee,class:"px-3 py-1 text-xs rounded bg-red-100 text-red-700 hover:bg-red-200 transition-colors"}," 关闭错误提示 ")])])])])])):r("",!0)])]),e("div",ft,[t[34]||(t[34]=e("div",{class:"absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-300 to-transparent opacity-70"},null,-1)),t[35]||(t[35]=e("div",{class:"absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-r from-blue-300 via-transparent to-transparent opacity-70"},null,-1)),t[36]||(t[36]=e("div",{class:"absolute -top-20 -right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all duration-700"},null,-1)),t[37]||(t[37]=e("div",{class:"absolute -bottom-32 -left-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all duration-700"},null,-1)),e("div",ht,[t[33]||(t[33]=e("div",{class:"flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200/30 mr-4 sm:mr-5"},[e("span",{class:"text-white text-xl"},"📜")],-1)),e("div",yt,[t[32]||(t[32]=e("h3",{class:"font-bold text-indigo-700 text-lg sm:text-xl mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-700"},"当前场景",-1)),e("p",wt,m((P=y.value)==null?void 0:P.description),1)])])]),e("div",kt,[t[40]||(t[40]=U('<div class="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-r from-indigo-300 via-purple-300/70 to-transparent opacity-70" data-v-651b1178></div><div class="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-300/70 to-indigo-300 opacity-70" data-v-651b1178></div><div class="absolute -top-24 -left-20 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all duration-700" data-v-651b1178></div><div class="absolute -bottom-32 -right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-all duration-700" data-v-651b1178></div><div class="absolute top-4 right-4 text-4xl opacity-5 group-hover:opacity-10 transition-opacity duration-700 transform rotate-12" data-v-651b1178>💬</div>',5)),e("div",_t,[t[39]||(t[39]=e("div",{class:"flex-shrink-0 mr-4 sm:mr-5"},[e("div",{class:"w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-md shadow-indigo-200/30 p-0.5"},[e("div",{class:"w-full h-full rounded-full bg-white/90 flex items-center justify-center"},[e("span",{class:"text-indigo-600 text-xl"},"💭")])])],-1)),e("div",St,[t[38]||(t[38]=e("h3",{class:"font-bold text-purple-700 text-lg sm:text-xl mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"},"对话内容",-1)),e("div",It,[e("p",Pt,m((D=y.value)==null?void 0:D.dialog),1)])])])]),(N=y.value)!=null&&N.specialEvent?(l(),a("div",Ct,[t[43]||(t[43]=e("div",{class:"absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-indigo-200 to-blue-200"},null,-1)),e("div",Mt,[t[42]||(t[42]=e("div",{class:"text-xl sm:text-2xl"},"⚡",-1)),e("div",null,[t[41]||(t[41]=e("h3",{class:"font-bold text-slate-800 mb-2 text-sm sm:text-base"},"特殊事件",-1)),e("p",Gt,m((ae=y.value)==null?void 0:ae.specialEvent),1)])])])):r("",!0),e("div",At,[e("div",jt,[e("div",Qt,[t[44]||(t[44]=e("span",null,"游戏技能",-1)),e("span",{class:v(["font-medium",{"text-blue-600":n.value.gaming>=100}])},m(n.value.gaming)+"%",3)]),e("div",Dt,[e("div",{class:v(["h-2 rounded-full transition-all duration-700 ease-out",[n.value.gaming>=100?"bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 animate-pulse":"bg-blue-500"]]),style:K(`width: ${n.value.gaming}%`)},null,6)]),n.value.gaming>=100?(l(),a("div",Nt,t[45]||(t[45]=[e("div",{class:"absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-20 blur-xl"},null,-1),e("div",{class:"absolute top-1 right-2 text-xs font-bold text-blue-600 animate-bounce"},"满级!",-1)]))):r("",!0)]),e("div",Ut,[e("div",Et,[t[46]||(t[46]=e("span",null,"学习能力",-1)),e("span",{class:v(["font-medium",{"text-green-600":n.value.study>=100}])},m(n.value.study)+"%",3)]),e("div",Bt,[e("div",{class:v(["h-2 rounded-full transition-all duration-700 ease-out",[n.value.study>=100?"bg-gradient-to-r from-green-400 via-green-500 to-emerald-500 animate-pulse":"bg-green-500"]]),style:K(`width: ${n.value.study}%`)},null,6)]),n.value.study>=100?(l(),a("div",$t,t[47]||(t[47]=[e("div",{class:"absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 opacity-20 blur-xl"},null,-1),e("div",{class:"absolute top-1 right-2 text-xs font-bold text-green-600 animate-bounce"},"满级!",-1)]))):r("",!0)]),e("div",Vt,[e("div",zt,[t[48]||(t[48]=e("span",null,"社交关系",-1)),e("span",{class:v(["font-medium",{"text-purple-600":n.value.social>=100}])},m(n.value.social)+"%",3)]),e("div",Lt,[e("div",{class:v(["h-2 rounded-full transition-all duration-700 ease-out",[n.value.social>=100?"bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-500 animate-pulse":"bg-purple-500"]]),style:K(`width: ${n.value.social}%`)},null,6)]),n.value.social>=100?(l(),a("div",Tt,t[49]||(t[49]=[e("div",{class:"absolute -inset-1 bg-gradient-to-r from-purple-400 to-indigo-500 opacity-20 blur-xl"},null,-1),e("div",{class:"absolute top-1 right-2 text-xs font-bold text-purple-600 animate-bounce"},"满级!",-1)]))):r("",!0)])]),e("div",{class:v(["space-y-3 sm:space-y-4",{"opacity-50 pointer-events-none":Q.value}])},[(l(!0),a(_,null,oe(((le=y.value)==null?void 0:le.options)||[],p=>(l(),a("div",{key:p.text,class:"group cursor-pointer relative overflow-hidden touch-manipulation",onClick:fe=>!Q.value&&me(p)},[t[50]||(t[50]=e("div",{class:"absolute inset-0 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"},null,-1)),e("div",Rt,[e("div",Ot,m(p.text),1),p.hint?(l(),a("div",Kt,m(p.hint),1)):r("",!0)])],8,qt))),128))],2)])])])),A.value?(l(),a("div",{key:2,class:"fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50",onClick:t[8]||(t[8]=p=>A.value=!1)},[e("div",{class:"relative bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-xs sm:max-w-md w-full mx-4 shadow-xl",onClick:t[7]||(t[7]=ye(()=>{},["stop"]))},[t[58]||(t[58]=e("h2",{class:"text-xl sm:text-2xl font-bold text-slate-800 mb-4"},"AI模型信息",-1)),e("div",Ft,[e("div",null,[t[51]||(t[51]=e("h3",{class:"text-xs sm:text-sm font-medium text-slate-500"},"当前模型",-1)),e("p",Ht,m(f.value),1)]),e("div",null,[t[57]||(t[57]=e("h3",{class:"text-xs sm:text-sm font-medium text-slate-500"},"模型特点",-1)),e("ul",Jt,[f.value==="deepseek-r1"?(l(),a("li",Wt,t[52]||(t[52]=[e("span",{class:"text-purple-500 mt-0.5"},"✓",-1),e("span",{class:"text-slate-700 text-xs sm:text-sm"},"支持思维链展示，可观察AI思考过程",-1)]))):r("",!0),f.value==="deepseek-r1"?(l(),a("li",Xt,t[53]||(t[53]=[e("span",{class:"text-purple-500 mt-0.5"},"✓",-1),e("span",{class:"text-slate-700 text-xs sm:text-sm"},"更强的推理和剧情架构能力",-1)]))):r("",!0),f.value==="deepseek-chat"?(l(),a("li",Yt,t[54]||(t[54]=[e("span",{class:"text-blue-500 mt-0.5"},"✓",-1),e("span",{class:"text-slate-700 text-xs sm:text-sm"},"更流畅的对话体验",-1)]))):r("",!0),f.value==="QwQ-32B"?(l(),a("li",Zt,t[55]||(t[55]=[e("span",{class:"text-blue-500 mt-0.5"},"✓",-1),e("span",{class:"text-slate-700 text-xs sm:text-sm"},"更大模型参数，知识面更广",-1)]))):r("",!0),t[56]||(t[56]=e("li",{class:"flex items-start gap-2"},[e("span",{class:"text-green-500 mt-0.5"},"✓"),e("span",{class:"text-slate-700 text-xs sm:text-sm"},"实时流式生成，响应更快")],-1))])]),e("div",{class:"pt-4"},[e("button",{onClick:ce,class:"w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl font-medium text-sm sm:text-base"}," 切换模型 ")])])])])):r("",!0),Q.value&&!B.value?(l(),a("div",es,t[59]||(t[59]=[U('<div class="relative" data-v-651b1178><div class="relative bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-lg shadow-indigo-100/50" data-v-651b1178><div class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4" data-v-651b1178><svg class="animate-spin w-full h-full text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-651b1178><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-651b1178></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-651b1178></path></svg></div><p class="text-slate-800 text-base sm:text-lg font-medium text-center" data-v-651b1178>正在书写剧情...</p></div></div>',1)]))):r("",!0),J.value?(l(),a("div",ts,[e("div",ss,[e("div",as,[t[60]||(t[60]=e("span",{class:"text-lg sm:text-xl"},"❌",-1)),e("span",ls,m(J.value),1)])])])):r("",!0),k.value?(l(),a("div",os,[e("div",is,[e("div",{class:v(["absolute -inset-4 rounded-3xl",{"bg-gradient-to-br from-blue-600/20 to-indigo-600/20":o.value==="gaming","bg-gradient-to-br from-green-600/20 to-emerald-600/20":o.value==="study","bg-gradient-to-br from-purple-600/20 to-indigo-600/20":o.value==="social"}])},null,2),e("div",ns,[e("div",{class:v(["absolute top-0 left-0 w-full h-[2px]",{"bg-gradient-to-r from-transparent via-blue-400 to-transparent":o.value==="gaming","bg-gradient-to-r from-transparent via-green-400 to-transparent":o.value==="study","bg-gradient-to-r from-transparent via-purple-400 to-transparent":o.value==="social"}])},null,2),e("div",{class:v(["absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl animate-pulse-slow",{"bg-blue-500/10":o.value==="gaming","bg-green-500/10":o.value==="study","bg-purple-500/10":o.value==="social"}])},null,2),e("div",{class:v(["absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-3xl animate-pulse-slow",{"bg-blue-600/10":o.value==="gaming","bg-emerald-500/10":o.value==="study","bg-indigo-600/10":o.value==="social"}])},null,2),e("div",{class:v(["w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center",{"bg-gradient-to-br from-blue-500 to-indigo-600":o.value==="gaming","bg-gradient-to-br from-green-500 to-emerald-600":o.value==="study","bg-gradient-to-br from-purple-500 to-indigo-600":o.value==="social"}])},[e("span",rs,[o.value==="gaming"?(l(),a(_,{key:0},[C("🎮")],64)):o.value==="study"?(l(),a(_,{key:1},[C("🎓")],64)):(l(),a(_,{key:2},[C("👥")],64))])],2),e("h2",{class:v(["text-2xl sm:text-3xl font-bold text-center mb-2 bg-clip-text text-transparent",{"bg-gradient-to-r from-blue-600 to-indigo-600":o.value==="gaming","bg-gradient-to-r from-green-600 to-emerald-600":o.value==="study","bg-gradient-to-r from-purple-600 to-indigo-600":o.value==="social"}])},m($.value),3),e("div",{class:v(["w-1/3 h-[1px] mx-auto mb-6",{"bg-gradient-to-r from-transparent via-blue-300 to-transparent":o.value==="gaming","bg-gradient-to-r from-transparent via-green-300 to-transparent":o.value==="study","bg-gradient-to-r from-transparent via-purple-300 to-transparent":o.value==="social"}])},null,2),e("div",{class:v(["bg-white/60 rounded-lg p-4 mb-6 border",{"border-blue-100":o.value==="gaming","border-green-100":o.value==="study","border-purple-100":o.value==="social"}])},[e("p",ds,m(V.value),1)],2),e("button",{onClick:be,class:v(["w-full py-3 rounded-xl font-medium text-white transition transform hover:-translate-y-1 hover:shadow-lg",{"bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-blue-200/50":o.value==="gaming","bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-green-200/50":o.value==="study","bg-gradient-to-r from-purple-500 to-indigo-600 hover:shadow-purple-200/50":o.value==="social"}])},[e("span",us,[t[61]||(t[61]=e("span",null,"继续冒险",-1)),o.value==="gaming"?(l(),a(_,{key:0},[C("🎮")],64)):o.value==="study"?(l(),a(_,{key:1},[C("📚")],64)):(l(),a(_,{key:2},[C("🌟")],64))])],2)])])])):r("",!0)])}}}),ps=de(ms,[["__scopeId","data-v-651b1178"]]),gs={class:"game-view-container"},vs=ne({__name:"GameView",setup(g){const d=Se(),i=u(d.apiUrl);return re(()=>{const c=localStorage.getItem("apiUrl");c&&(i.value=c,d.setApiUrl(c))}),(c,M)=>(l(),a("div",gs,[we(ps,{"api-base-url":i.value},null,8,["api-base-url"])]))}}),hs=de(vs,[["__scopeId","data-v-a6fe369f"]]);export{hs as default};
