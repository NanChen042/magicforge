var M=Object.defineProperty;var I=(S,e,t)=>e in S?M(S,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):S[e]=t;var y=(S,e,t)=>I(S,typeof e!="symbol"?e+"":e,t);class E{static init(){try{const e=localStorage.getItem(this.STORAGE_KEY);if(e){const t=JSON.parse(e);this.checkpoints=new Map(Object.entries(t));const n=Date.now();for(const[s,r]of this.checkpoints.entries())n-r.timestamp>24*60*60*1e3&&this.checkpoints.delete(s);this.saveToStorage()}}catch(e){console.error("初始化检查点服务失败:",e),this.checkpoints.clear()}}static create(e){const t=`cp_${Date.now()}_${Math.floor(Math.random()*1e3)}`;return this.checkpoints.set(t,{timestamp:Date.now(),...e}),t}static get(e){return this.checkpoints.get(e)}static getLatest(){return Array.from(this.checkpoints.values()).sort((t,n)=>n.timestamp-t.timestamp)[0]}static delete(e){this.checkpoints.delete(e),this.saveToStorage()}static clear(){this.checkpoints.clear(),this.saveToStorage()}static saveToStorage(){try{const e=Object.fromEntries(this.checkpoints);localStorage.setItem(this.STORAGE_KEY,JSON.stringify(e))}catch(e){console.error("保存检查点失败:",e)}}static generateId(){return Date.now().toString(36)+Math.random().toString(36).substr(2)}static async saveCheckpoint(e){const t=`cp_${Date.now()}_${Math.floor(Math.random()*1e3)}`;return this.checkpoints.set(t,{timestamp:Date.now(),scene:e}),console.log("已创建检查点:",t),t}static async loadCheckpoint(e){const t=this.checkpoints.get(e);return t?(console.log("已加载检查点:",e),t.scene):(console.log("检查点不存在:",e),null)}static cleanupExpiredCheckpoints(e=60){const t=Date.now(),n=e*60*1e3;let s=0;this.checkpoints.forEach((r,o)=>{t-r.timestamp>n&&(this.checkpoints.delete(o),s++)}),s>0&&console.log(`已清除 ${s} 个过期检查点`)}}y(E,"STORAGE_KEY","game_checkpoints"),y(E,"MAX_CHECKPOINTS",5),y(E,"checkpoints",new Map);const h={apiKey:"123",baseUrl:"http://106.14.176.242:9998/v1/chat/completions",model:"QwQ-32B",temperature:.8,maxTokens:2e3};function A(S){Object.assign(h,S)}class k{static setModelVersion(e){e==="r1"?(h.model="deepseek-r1",console.log("已切换到DeepSeek-R1模型")):e==="v3"?(h.model="deepseek-chat",console.log("已切换到DeepSeek-Chat模型")):console.error("不支持的模型版本:",e)}static getModelVersion(){return h.model==="deepseek-chat"?"v3":"r1"}static async sendRequest(e){var t,n,s;try{if(console.log("发送请求到Deepseek API..."),console.log("使用模型:",h.model),console.log("API地址:",h.baseUrl),!h.baseUrl||!h.baseUrl.startsWith("http"))throw new Error("无效的API地址: "+h.baseUrl);const r={model:h.model,messages:e,temperature:h.temperature,max_tokens:h.maxTokens,stream:!1,stop:null};console.log("请求体:",JSON.stringify(r,null,2));const o=await fetch(h.baseUrl,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h.apiKey}`},body:JSON.stringify(r)});if(!o.ok){const a=await o.text();throw console.error("API错误响应:",a),new Error(`API请求失败: ${o.status} - ${a}`)}const c=await o.json();if(console.log("API响应:",c),!((s=(n=(t=c.choices)==null?void 0:t[0])==null?void 0:n.message)!=null&&s.content))throw console.error("API响应格式异常:",c),new Error("API响应格式不正确: "+JSON.stringify(c));return c}catch(r){throw console.error("API请求失败:",r),r}}static async generateInitialScene(){const e=this.sceneTypes[Math.floor(Math.random()*this.sceneTypes.length)],t=Math.random()>.7?this.specialEvents[Math.floor(Math.random()*this.specialEvents.length)]:void 0,n=`请以第一人称的视角，扮演小明（最强剑魔）生成游戏开场场景。

${this.characterBackground}

场景类型：${e}
${t?`特殊事件：${t}`:""}

要求：
1. 场景描述要生动有趣，突出高中生活和游戏双重身份的冲突
2. 对话要用小明的语气，多用游戏梗和台词
3. 描述要有细节，包括天气、环境、人物心情等
4. 选项要有趣且符合人物性格
5. 如果有特殊事件，要自然地融入场景中

输出格式：
{
  "description": "场景描述（200字以内）",
  "dialog": "小明的对话（50字以内）",
  "options": [
    {"text": "选项1（15字以内）", "hint": "选项提示（20字以内）"},
    {"text": "选项2（15字以内）", "hint": "选项提示（20字以内）"}
  ],
  "specialEvent": "特殊事件的具体描述（可选，50字以内）"
}`;try{const s=[{role:"system",content:"你现在是小明（游戏ID：最强剑魔），一个高三学生兼游戏主播。你要生动地讲述在学习和游戏之间的故事。确保输出是合法的JSON格式。"},{role:"user",content:n}],o=(await this.sendRequest(s)).choices[0].message.content;return this.parseResponse(o,1)}catch(s){throw console.error("生成初始场景失败:",s),s}}static createModel(e={}){return{streamText:async({messages:t,model:n=h.model,temperature:s=h.temperature,max_tokens:r=h.maxTokens})=>{console.log("使用模型:",n);try{const o=await fetch(h.baseUrl,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h.apiKey}`},body:JSON.stringify({model:n,messages:t,temperature:s,max_tokens:r,stream:!0})});if(!o.ok){const c=await o.text();throw new Error(`API响应错误 ${o.status}: ${c}`)}return{dataStream:this._createAsyncIterator(o)}}catch(o){throw console.error("流式请求失败:",o),o}}}}static async*_createAsyncIterator(e){if(!e.body)throw new Error("响应没有可读的正文");const t=e.body.getReader(),n=new TextDecoder;let s="";try{for(;;){const{done:r,value:o}=await t.read();if(r)break;s+=n.decode(o,{stream:!0});const c=s.split(`
`);s=c.pop()||"";for(const a of c)if(a.trim()!==""&&a.trim()!=="data: [DONE]"&&a.startsWith("data: "))try{yield JSON.parse(a.substring(5))}catch(l){console.error("解析流数据时出错:",l,"Line:",a)}}}finally{t.releaseLock()}}static async generateScene(e){var t,n,s,r,o,c,a,l,w,p;try{if(e.checkpointId)try{const d=await E.loadCheckpoint(e.checkpointId);if(d)return console.log("已从检查点恢复场景:",e.checkpointId),d}catch(d){console.error("恢复检查点失败:",d)}e.currentScene&&this.updateSceneHistory(e.currentScene);const i=[{role:"system",content:this.characterBackground},{role:"user",content:`玩家选择了: "${e.choiceText}"。请为"最强剑魔是高三生"游戏生成下一个场景，场景ID ${e.currentSceneId+1}。

          请以JSON格式返回以下内容：
          1. description: 场景描述 (200字以内)
          2. dialog: 主角内心独白或对话 (50字以内)
          3. options: 3个选项，每个包含text(文本)、hint(提示)、next(下一场景ID)
          4. specialEvent: 特殊事件 (可选)

          注意考虑当前游戏进度：gaming=${e.storyProgress.mainQuests.gaming}, study=${e.storyProgress.mainQuests.study}, social=${e.storyProgress.mainQuests.social}`}];if((t=e.streamCallbacks)!=null&&t.onReasoningUpdate||(n=e.streamCallbacks)!=null&&n.onDialogUpdate){const m=await this.createModel().streamText({messages:i});let u="",f="";for await(let g of m.dataStream){const v=(o=(r=(s=g==null?void 0:g.choices)==null?void 0:s[0])==null?void 0:r.delta)==null?void 0:o.reasoning_content;v&&((c=e.streamCallbacks)!=null&&c.onReasoningUpdate)&&(f+=v,e.streamCallbacks.onReasoningUpdate(v));const $=(w=(l=(a=g==null?void 0:g.choices)==null?void 0:a[0])==null?void 0:l.delta)==null?void 0:w.content;$&&(u+=$,(p=e.streamCallbacks)!=null&&p.onDialogUpdate&&e.streamCallbacks.onDialogUpdate($))}const x=this.parseResponse(u,e.currentSceneId+1);f&&(x.reasoning=f);try{const g=await E.saveCheckpoint(x);g&&(x.checkpointId=g)}catch(g){console.error("保存检查点失败:",g)}return x}else{const d=await this.sendRequest(i),m=this.parseResponse(d.choices[0].message.content,e.currentSceneId+1);try{const u=await E.saveCheckpoint(m);u&&(m.checkpointId=u)}catch(u){console.error("保存检查点失败:",u)}return m}}catch(i){throw console.error("生成场景失败:",i),i}}static getMoodBasedOnProgress(e){const{gaming:t,study:n,social:s}=e.mainQuests;return t>80?"自信":n>80?"充实":s>80?"开心":t<20&&n<20?"迷茫":t>60&&n<30?"焦虑":n>60&&t<30?"压抑":"平静"}static getNextSceneType(e,t,n){const s=new Set;if(e.split(/\s+/).forEach(r=>s.add(r)),t==null||t.split(/\s+/).forEach(r=>s.add(r)),n){const{gaming:r,study:o,social:c}=n.mainQuests;if(r<30&&s.has("游戏")){const a=["游戏训练","排位赛","直播现场"];return this.getRandomUnusedScene(a)}if(o<30&&s.has("学习")){const a=["课堂学习","考试现场","社团活动"];return this.getRandomUnusedScene(a)}if(c<30&&(s.has("社交")||s.has("朋友"))){const a=["社交互动","粉丝互动","感情困惑"];return this.getRandomUnusedScene(a)}for(const[a,l]of Object.entries(n.relationships))if(l.affinity<-20&&Math.random()<.3)return a==="李雪"?"社交互动":"课堂学习"}if(s.has("游戏")||s.has("直播")){const r=["游戏训练","排位赛","直播现场"];return this.getRandomUnusedScene(r)}else if(s.has("学习")||s.has("考试")){const r=["课堂学习","考试现场","社团活动"];return this.getRandomUnusedScene(r)}else if(s.has("社交")||s.has("朋友")){const r=["社交互动","粉丝互动","感情困惑"];return this.getRandomUnusedScene(r)}return this.getRandomUnusedScene(this.sceneTypes)}static getNextSpecialEvent(e){if(Math.random()<=.7)return;if(e){const{gaming:s,study:r,social:o}=e.mainQuests;if(s>70&&Math.random()<.4){const c=["炸麦警告（情绪激动导致麦克风爆音）","躺赢时刻（队友carry）","连招练习（剑魔技能连招）"];return c[Math.floor(Math.random()*c.length)]}if(r<30&&Math.random()<.4){const c=["王老师突袭（被抓打游戏）","高考倒计时（压力事件）","家长谈话（成绩下滑）"];return c[Math.floor(Math.random()*c.length)]}for(const[c,a]of Object.entries(e.relationships))if(a.affinity>50&&Math.random()<.3)return c==="李雪"?"偶遇李雪（暗恋对象）":void 0}const t=this.specialEvents.filter(s=>!this.usedSpecialEvents.has(s));if(t.length===0)return this.usedSpecialEvents.clear(),this.specialEvents[Math.floor(Math.random()*this.specialEvents.length)];const n=t[Math.floor(Math.random()*t.length)];return this.usedSpecialEvents.add(n),n}static getDialogueType(e,t){return e.includes("游戏")||e.includes("直播")?"gaming":e.includes("社交")||e.includes("感情")?"relationship":e.includes("生活")||e.includes("思考")?"life":"advice"}static getRandomUnusedScene(e){const t=this.sceneHistory.slice(-3).map(s=>s.type),n=e.filter(s=>!t.includes(s));return n.length===0?e[Math.floor(Math.random()*e.length)]:n[Math.floor(Math.random()*n.length)]}static formatSceneHistory(){return this.sceneHistory.slice(-3).map((e,t)=>`场景${t+1}:
类型: ${e.type}
描述: ${e.description}
对话: ${e.dialog}`).join(`

`)}static updateSceneHistory(e){this.sceneHistory.push({type:this.getSceneTypeFromDescription(e.description),description:e.description,dialog:e.dialog}),this.sceneHistory.length>10&&this.sceneHistory.shift()}static getSceneTypeFromDescription(e){for(const t of this.sceneTypes)if(e.includes(t))return t;return"日常生活"}static parseResponse(e,t){var n;try{console.log("解析响应内容:",e);let s=e;const r=e.match(/```(?:json)?\s*([\s\S]*?)\s*```/);r&&r[1]&&(s=r[1],console.log("从代码块中提取的JSON:",s)),s=s.replace(/[\u0000-\u001F\u007F-\u009F]/g,"").replace(/:\s*\+(\d+)/g,": $1").replace(/,\s*}/g,"}").replace(/,\s*]/g,"]").replace(/([{,][^,{]*?)(\w+)(\s*:)/g,'$1"$2"$3').replace(/:\s*([^",\[\]{}][^,\[\]{}]*?)(\s*[,}])/g,':"$1"$2'),console.log("清理后的JSON内容:",s);let o;try{o=JSON.parse(s),console.log("成功解析JSON:",o)}catch(a){console.error("JSON解析失败，错误:",a);try{s=s.replace(/\s*:\s*/g,":").replace(/\s*,\s*/g,",").replace(/([{,][^,{]*?)(\w+)(\s*:)/g,'$1"$2"$3').replace(/:\s*([^",\[\]{}][^,\[\]{}]*?)(\s*[,}])/g,':"$1"$2'),console.log("进一步清理后的JSON:",s),o=JSON.parse(s)}catch(l){if(console.error("更激进清理后仍解析失败:",l),e.match(/(\{[\s\S]*\})/))try{console.log("尝试手动构造JSON...");const p=e.match(/"description"\s*:\s*"([^"]+)"/),i=e.match(/"dialog"\s*:\s*"([^"]+)"/);o={description:p?p[1]:"无法解析场景描述",dialog:i?i[1]:"（系统错误，无法获取对话）",options:[],context:{mood:"困惑",location:"当前位置",timeOfDay:"现在",previousEvents:["解析错误"]}};const d=e.match(/"options"\s*:\s*\[([\s\S]*?)\]/);if(d){const m=d[1].match(/"text"\s*:\s*"([^"]+)"/g),u=d[1].match(/"hint"\s*:\s*"([^"]+)"/g);if(m&&m.length>0){o.options=[];for(let f=0;f<m.length;f++){const x=m[f].match(/"text"\s*:\s*"([^"]+)"/);if(!x)continue;const g=x[1];let v="继续";if(u&&f<u.length){const $=u[f].match(/"hint"\s*:\s*"([^"]+)"/);$&&(v=$[1])}o.options.push({text:g,hint:v,impact:{quest:{type:"social",value:5},relationship:{character:"李雪",value:0}}})}}}console.log("手动构造的JSON:",o)}catch(p){throw console.error("手动构造JSON失败:",p),new Error("无法解析JSON响应: "+a.message)}else throw new Error("响应中未找到有效的JSON结构")}}for((!o.description||typeof o.description!="string")&&(console.warn("缺少场景描述或格式不正确，使用默认描述"),o.description="小明站在教室里，思考着下一步该怎么做。周围的同学们各忙各的，有人看书，有人聊天，还有人偷偷玩手机。"),(!o.dialog||typeof o.dialog!="string")&&(console.warn("缺少对话内容或格式不正确，使用默认对话"),o.dialog="我该怎么选择呢？游戏和学习，这是个问题..."),Array.isArray(o.options)||(console.warn("缺少选项或格式不正确，使用默认选项"),o.options=[]);o.options.length<2;)o.options.push({text:o.options.length===0?"专注于学习":"打会游戏放松",hint:o.options.length===0?"提高成绩是当务之急":"游戏也很重要",impact:{quest:{type:o.options.length===0?"study":"gaming",value:5},relationship:{character:"李雪",value:0}}});return{id:t,image:`https://source.unsplash.com/800x500/?${this.getImageKeywords(o.description)}&t=${Date.now()}`,description:o.description.slice(0,300),dialog:o.dialog.slice(0,80),options:o.options.slice(0,3).map(a=>({text:(a.text||"继续探索").slice(0,20),next:-1,hint:(a.hint||"看看接下来会发生什么").slice(0,30),impact:a.impact||{quest:{type:"social",value:5},relationship:{character:"李雪",value:0}}})),isAIGenerated:!0,specialEvent:(n=o.specialEvent)==null?void 0:n.slice(0,50),context:o.context||{mood:"平静",location:"教室",timeOfDay:"上午",previousEvents:[]},reasoning:o.reasoning}}catch(s){return console.error("解析响应失败:",s),console.error("原始内容:",e),{id:t,image:"https://source.unsplash.com/800x500/?classroom,error&t="+Date.now(),description:"（系统：由于技术原因，无法生成新场景。）小明站在原地，思考着下一步该怎么办。",dialog:"（让我想想接下来该做什么...）",options:[{text:"重新尝试",next:-1,hint:"再试一次",impact:{quest:{type:"social",value:0},relationship:{character:"李雪",value:0}}},{text:"换个方向",next:-1,hint:"尝试其他选择",impact:{quest:{type:"social",value:0},relationship:{character:"李雪",value:0}}}],isAIGenerated:!0,context:{mood:"困惑",location:"当前位置",timeOfDay:"现在",previousEvents:["系统错误"]}}}}static getImageKeywords(e){const t=new Set;return t.add("chinese"),t.add("student"),(e.includes("游戏")||e.includes("直播"))&&(t.add("gaming"),t.add("computer")),(e.includes("学习")||e.includes("考试"))&&(t.add("classroom"),t.add("study")),(e.includes("社交")||e.includes("朋友"))&&(t.add("friends"),t.add("people")),Array.from(t).slice(0,3).join(",")}handleDeepSeekResponse(e){let t=e.replace(/\+(\d+)/g,"$1");t=t.replace(/([{,]\s*)(\w+)(\s*:)/g,'$1"$2"$3'),t=t.replace(/,\s*([}\]])/g,"$1");try{return JSON.parse(t)}catch(n){return console.error("处理DeepSeek响应出错:",n),this.parseResponse(e)}}async handleChoice(e,t){var r;if(console.log(`处理选项: ${e}, 当前场景ID: ${t.currentScene}`),!t.scenes.find(o=>o.id===t.currentScene))throw new Error(`找不到当前场景: ${t.currentScene}`);if(!this.apiBaseUrl)throw console.error("API基础URL未设置"),new Error("API基础URL未设置，无法生成场景");const s={model:this.model,prompt:this.generatePrompt(t,e),temperature:.7,max_tokens:1e3,stream:!1};try{console.log("发送API请求:",{url:`${this.apiBaseUrl}/v1/chat/completions`,model:s.model,temperature:s.temperature,max_tokens:s.max_tokens}),console.log("提示文本:",s.prompt);const o=await fetch(`${this.apiBaseUrl}/v1/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.apiKey}`},body:JSON.stringify({model:s.model,messages:[{role:"user",content:s.prompt}],temperature:s.temperature,max_tokens:s.max_tokens,stream:s.stream})});if(!o.ok){const i=await o.text();throw console.error("API请求失败:",o.status,i),new Error(`API请求失败: ${o.status} ${i}`)}const c=await o.json();if(console.log("API响应:",c),!c.choices||c.choices.length===0)throw console.error("API响应中没有选择内容:",c),new Error("API响应中没有选择内容");const a=c.choices[0].message.content;console.log("生成的内容:",a);const l=this.handleDeepSeekResponse(a),p={id:t.nextSceneId,image:`https://source.unsplash.com/800x500/?${this.getImageKeywords(l.description)}&t=${Date.now()}`,description:(l.description||"你继续你的旅程...").slice(0,300),dialog:(l.dialog||"（你思考着下一步行动）").slice(0,120),options:(l.options||[]).slice(0,3).map(i=>({text:(i.text||"继续").slice(0,30),next:-1,hint:(i.hint||"看看接下来会发生什么").slice(0,40),impact:i.impact||{quest:{type:"social",value:0},relationship:{character:"李雪",value:0}}})),isAIGenerated:!0,specialEvent:(r=l.specialEvent)==null?void 0:r.slice(0,50),context:l.context||{mood:"平静",location:"教室",timeOfDay:"上午",previousEvents:["开始游戏"]}};for(console.log("生成的场景:",p);p.options.length<2;)p.options.push({text:p.options.length===0?"仔细观察四周":"继续前进",next:-1,hint:p.options.length===0?"寻找线索":"勇往直前",impact:{quest:{type:"exploration",value:5},relationship:{character:"李雪",value:0}}});return p}catch(o){throw console.error("处理选项时出错:",o),o}}parseResponse(e){console.log("解析响应...");try{let t=e.trim();t=t.replace(/\+(\d+)/g,"$1"),t=t.replace(/,\s*([}\]])/g,"$1"),t=t.replace(/'/g,'"'),t=t.replace(/([{,]\s*)(\w+)(\s*:)/g,'$1"$2"$3'),console.log("清理后的内容:",t);try{const n=JSON.parse(t);return console.log("成功解析完整JSON"),n}catch(n){console.log("无法解析完整JSON，尝试提取部分内容:",n.message);const s={description:"",dialog:"",options:[]},r=t.match(/"description"\s*:\s*"([^"]+)"/);r&&(s.description=r[1]);const o=t.match(/"dialog"\s*:\s*"([^"]+)"/);o&&(s.dialog=o[1]);const c=t.match(/"options"\s*:\s*\[([\s\S]*?)\]/);if(c){const w=c[1].match(/"text"\s*:\s*"([^"]+)"/g),p=c[1].match(/"hint"\s*:\s*"([^"]+)"/g);if(w&&w.length>0){s.options=[];for(let i=0;i<w.length;i++){const d=w[i].match(/"text"\s*:\s*"([^"]+)"/);if(!d)continue;const m=d[1];let u="继续";if(p&&i<p.length){const f=p[i].match(/"hint"\s*:\s*"([^"]+)"/);f&&(u=f[1])}s.options.push({text:m,hint:u,impact:{quest:{type:"social",value:5},relationship:{character:"李雪",value:0}}})}}}const a=t.match(/"specialEvent"\s*:\s*"([^"]+)"/);a&&(s.specialEvent=a[1]);const l=t.match(/"context"\s*:\s*(\{[\s\S]*?\})/);return l&&(s.context=JSON.parse(l[1])),console.log("解析后的场景数据:",s),s}}catch(t){throw console.error("解析响应失败:",t),console.error("原始内容:",e),new Error("无法解析API响应")}}}y(k,"sceneHistory",[]),y(k,"usedSpecialEvents",new Set),y(k,"characterBackground",`角色背景：
- 姓名：小明（游戏ID：最强剑魔）
- 身份：高三学生，知名游戏主播
- 游戏特长：英雄联盟剑魔玩家，连续29天冲击王者失败
- 性格特点：
  1. 游戏时激情四射，现实中是个普通学生
  2. 直播时经常情绪激动导致麦克风爆音
  3. 对游戏有着极强的执着
  4. 对感情和生活有独特见解
- 说话特点：
  1. 游戏相关：
     - "回答我！我Q会不会空？"
     - "这把打完我得了MVP！"
     - "躺赢狗！"
     - "炸麦警告！"
     - "你们可能不知道，我学凯南学得有多像"
  2. 生活感悟：
     - "怎么不找找自己的问题？"
     - "我要采一朵花送给妈妈"
     - "去洗了点阳光青提"
     - "我真的很不明白"
  3. 情感态度：
     - "你很不稳重"
     - "你这三观还是存在点问题"
     - "不要被表面现象所迷惑"
     - "看破不说破，没啥疑不疑惑的"
- 生活环境：
  1. 正在备战高考
  2. 暗恋同学李雪（游戏ID：疯狂打野）
  3. 被班主任王老师重点关注
- 日常挑战：
  1. 平衡学习和游戏时间
  2. 控制直播时的情绪
  3. 处理同学和粉丝关系
  4. 应对高考压力`),y(k,"sceneTypes",["课堂学习","游戏训练","排位赛","直播现场","考试现场","社交互动","家庭生活","社团活动","比赛解说","粉丝互动","感情困惑","人生思考"]),y(k,"specialEvents",["炸麦警告（情绪激动导致麦克风爆音）","躺赢时刻（队友carry）","连招练习（剑魔技能连招）","偶遇李雪（暗恋对象）","王老师突袭（被抓打游戏）","高考倒计时（压力事件）","粉丝认出（身份暴露）","网络卡顿（比赛掉线）","家长谈话（成绩下滑）","赛事解说（受邀解说）","感情困惑（对话选择）","人生思考（价值观碰撞）"]),y(k,"classicQuotes",["回答我！我Q会不会空？","这把打完我得了MVP！","躺赢狗！","炸麦警告！","你们可能不知道，我学凯南学得有多像","我要抽陀螺了！","怎么不找找自己的问题？","我要采一朵花送给妈妈","去洗了点阳光青提","我真的很不明白","你很不稳重","你这三观还是存在点问题","你越大度你对另一半就是不负责的表现","如果要谈你这个年纪就要考虑下半辈子","不要被表面现象所迷惑","看破不说破，没啥疑不疑惑的","你俩能聊就聊","你管她干哈","你俩成不成都不好说","漂亮的玩的花","想这么多干啥","这不是很正常的行为吗","我等会就要骂你了","逆天言论","你真是人才","我干了","既然跟你谈了你们就要自己有边界感","能不能听进去我说的","我只能管好我自己","你不是在找个合作租房的室友，你是在找个可以一起面对生活互相扶持的伴侣"]),y(k,"dialogueTypes",{gaming:["回答我！我Q会不会空？","这把打完我得了MVP！","躺赢狗！","炸麦警告！","你们可能不知道，我学凯南学得有多像"],life:["怎么不找找自己的问题？","我要采一朵花送给妈妈","去洗了点阳光青提","我真的很不明白"],relationship:["你很不稳重","你这三观还是存在点问题","不要被表面现象所迷惑","看破不说破，没啥疑不疑惑的"],advice:["你俩能聊就聊","你管她干哈","想这么多干啥","这不是很正常的行为吗"]});export{h as A,E as C,k as D,A as u};
