var t=Object.defineProperty,e=(e,s,n)=>((e,s,n)=>s in e?t(e,s,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[s]=n)(e,"symbol"!=typeof s?s+"":s,n);class s{static init(){try{const t=localStorage.getItem(this.STORAGE_KEY);if(t){const e=JSON.parse(t);this.checkpoints=new Map(Object.entries(e));const s=Date.now();for(const[t,n]of this.checkpoints.entries())s-n.timestamp>864e5&&this.checkpoints.delete(t);this.saveToStorage()}}catch(t){this.checkpoints.clear()}}static create(t){const e="cp_".concat(Date.now(),"_").concat(Math.floor(1e3*Math.random()));return this.checkpoints.set(e,{timestamp:Date.now(),...t}),e}static get(t){return this.checkpoints.get(t)}static getLatest(){return Array.from(this.checkpoints.values()).sort(((t,e)=>e.timestamp-t.timestamp))[0]}static delete(t){this.checkpoints.delete(t),this.saveToStorage()}static clear(){this.checkpoints.clear(),this.saveToStorage()}static saveToStorage(){try{const t=Object.fromEntries(this.checkpoints);localStorage.setItem(this.STORAGE_KEY,JSON.stringify(t))}catch(t){}}static generateId(){return Date.now().toString(36)+Math.random().toString(36).substr(2)}static async saveCheckpoint(t){const e="cp_".concat(Date.now(),"_").concat(Math.floor(1e3*Math.random()));return this.checkpoints.set(e,{timestamp:Date.now(),scene:t}),e}static async loadCheckpoint(t){const e=this.checkpoints.get(t);return e?e.scene:null}static cleanupExpiredCheckpoints(t=60){const e=Date.now(),s=60*t*1e3;this.checkpoints.forEach(((t,n)=>{e-t.timestamp>s&&this.checkpoints.delete(n)}))}}e(s,"STORAGE_KEY","game_checkpoints"),e(s,"MAX_CHECKPOINTS",5),e(s,"checkpoints",new Map);const n={apiKey:"eyJhbGciOiJSUzI1NiIsImtpZCI6IjlkMWRjMzFlLWI0ZDAtNDQ4Yi1hNzZmLWIwY2M2M2Q4MTQ5OCJ9.eyJhdWQiOiJ0ZXN0LWFwcDAtOWd5dXBrbWkxMGVkMjY1NCIsImV4cCI6MjUzNDAyMzAwNzk5LCJpYXQiOjE3NDI0MzY1NTIsImF0X2hhc2giOiJVVDF4a1FVd0VmQ0U5MUpVQUdrb2xRIiwicHJvamVjdF9pZCI6InRlc3QtYXBwMC05Z3l1cGttaTEwZWQyNjU0IiwibWV0YSI6eyJwbGF0Zm9ybSI6IkFwaUtleSJ9fQ.iJ2AlVeFSgyUP9K2ntHahG91TXtG57N86MT12UVpca7fWCZJ4Zqox5cdNJ3uj97DZbzN4q6wah0dZgVt_xqNZrMIvQMfgFc0uiA4gZiUOA6lJKgi33voC4dLWxqJ-_dYr_9XuHI6PPWW5Wy70jGotrVrrFFtUdxB0CJR3-mGHmlTemWMlDcIH3Ot7KZloBSTpC4MITr1i3xYSix8hHp_ClSf1ORKqAj7WXyBjwte7YBf8EIzehnlbpN_Z9sSwv8R_W4zcmEKAs_rTnWdTXGSFKLEl7lbHmpH3n5M4iRoGH9x3YVnZ8i8BXRMp6rBj2n2jqaIrcBrDJTd1ECGNF59tA",baseUrl:"https://test-app0-9gyupkmi10ed2654.api.tcloudbasegateway.com/v1/ai/deepseek/v1",model:"QwQ-32B",temperature:.8,maxTokens:2e3};function a(t){Object.assign(n,t)}class o{static setModelVersion(t){"r1"===t?n.model="deepseek-r1":"v3"===t&&(n.model="deepseek-chat")}static getModelVersion(){return"deepseek-chat"===n.model?"v3":"r1"}static async sendRequest(t){var e,s,a;try{if(!n.baseUrl||!n.baseUrl.startsWith("http"))throw new Error("无效的API地址: "+n.baseUrl);const o={model:n.model,messages:t,temperature:n.temperature,max_tokens:n.maxTokens,stream:!1,stop:null},c=await fetch(n.baseUrl,{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(n.apiKey)},body:JSON.stringify(o)});if(!c.ok){const t=await c.text();throw new Error("API请求失败: ".concat(c.status," - ").concat(t))}const i=await c.json();if(!(null==(a=null==(s=null==(e=i.choices)?void 0:e[0])?void 0:s.message)?void 0:a.content))throw new Error("API响应格式不正确: "+JSON.stringify(i));return i}catch(o){throw o}}static async generateInitialScene(){const t=this.sceneTypes[Math.floor(Math.random()*this.sceneTypes.length)],e=Math.random()>.7?this.specialEvents[Math.floor(Math.random()*this.specialEvents.length)]:void 0,s="请以第一人称的视角，扮演小明（最强剑魔）生成游戏开场场景。\n\n".concat(this.characterBackground,"\n\n场景类型：").concat(t,"\n").concat(e?"特殊事件：".concat(e):"",'\n\n要求：\n1. 场景描述要生动有趣，突出高中生活和游戏双重身份的冲突\n2. 对话要用小明的语气，多用游戏梗和台词\n3. 描述要有细节，包括天气、环境、人物心情等\n4. 选项要有趣且符合人物性格\n5. 如果有特殊事件，要自然地融入场景中\n\n输出格式：\n{\n  "description": "场景描述（200字以内）",\n  "dialog": "小明的对话（50字以内）",\n  "options": [\n    {"text": "选项1（15字以内）", "hint": "选项提示（20字以内）"},\n    {"text": "选项2（15字以内）", "hint": "选项提示（20字以内）"}\n  ],\n  "specialEvent": "特殊事件的具体描述（可选，50字以内）"\n}');try{const t=[{role:"system",content:"你现在是小明（游戏ID：最强剑魔），一个高三学生兼游戏主播。你要生动地讲述在学习和游戏之间的故事。确保输出是合法的JSON格式。"},{role:"user",content:s}],e=(await this.sendRequest(t)).choices[0].message.content;return this.parseResponse(e,1)}catch(n){throw n}}static createModel(t={}){return{streamText:async({messages:t,model:e=n.model,temperature:s=n.temperature,max_tokens:a=n.maxTokens})=>{try{const o=await fetch(n.baseUrl,{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(n.apiKey)},body:JSON.stringify({model:e,messages:t,temperature:s,max_tokens:a,stream:!0})});if(!o.ok){const t=await o.text();throw new Error("API响应错误 ".concat(o.status,": ").concat(t))}return{dataStream:this._createAsyncIterator(o)}}catch(o){throw o}}}}static async*_createAsyncIterator(t){if(!t.body)throw new Error("响应没有可读的正文");const e=t.body.getReader(),s=new TextDecoder;let n="";try{for(;;){const{done:t,value:o}=await e.read();if(t)break;n+=s.decode(o,{stream:!0});const c=n.split("\n");n=c.pop()||"";for(const e of c)if(""!==e.trim()&&"data: [DONE]"!==e.trim()&&e.startsWith("data: "))try{const t=JSON.parse(e.substring(5));yield t}catch(a){}}}finally{e.releaseLock()}}static async generateScene(t){var e,n,a,o,c,i,r,l,h,p;try{if(t.checkpointId)try{const e=await s.loadCheckpoint(t.checkpointId);if(e)return e}catch(d){}t.currentScene&&this.updateSceneHistory(t.currentScene);const u=[{role:"system",content:this.characterBackground},{role:"user",content:'玩家选择了: "'.concat(t.choiceText,'"。请为"最强剑魔是高三生"游戏生成下一个场景，场景ID ').concat(t.currentSceneId+1,"。\n\n          请以JSON格式返回以下内容：\n          1. description: 场景描述 (200字以内)\n          2. dialog: 主角内心独白或对话 (50字以内)\n          3. options: 3个选项，每个包含text(文本)、hint(提示)、next(下一场景ID)\n          4. specialEvent: 特殊事件 (可选)\n\n          注意考虑当前游戏进度：gaming=").concat(t.storyProgress.mainQuests.gaming,", study=").concat(t.storyProgress.mainQuests.study,", social=").concat(t.storyProgress.mainQuests.social)}];if((null==(e=t.streamCallbacks)?void 0:e.onReasoningUpdate)||(null==(n=t.streamCallbacks)?void 0:n.onDialogUpdate)){const e=this.createModel(),n=await e.streamText({messages:u});let m="",g="";for await(let s of n.dataStream){const e=null==(c=null==(o=null==(a=null==s?void 0:s.choices)?void 0:a[0])?void 0:o.delta)?void 0:c.reasoning_content;e&&(null==(i=t.streamCallbacks)?void 0:i.onReasoningUpdate)&&(g+=e,t.streamCallbacks.onReasoningUpdate(e));const n=null==(h=null==(l=null==(r=null==s?void 0:s.choices)?void 0:r[0])?void 0:l.delta)?void 0:h.content;n&&(m+=n,(null==(p=t.streamCallbacks)?void 0:p.onDialogUpdate)&&t.streamCallbacks.onDialogUpdate(n))}const y=this.parseResponse(m,t.currentSceneId+1);g&&(y.reasoning=g);try{const t=await s.saveCheckpoint(y);t&&(y.checkpointId=t)}catch(d){}return y}{const e=await this.sendRequest(u),n=this.parseResponse(e.choices[0].message.content,t.currentSceneId+1);try{const t=await s.saveCheckpoint(n);t&&(n.checkpointId=t)}catch(d){}return n}}catch(d){throw d}}static getMoodBasedOnProgress(t){const{gaming:e,study:s,social:n}=t.mainQuests;return e>80?"自信":s>80?"充实":n>80?"开心":e<20&&s<20?"迷茫":e>60&&s<30?"焦虑":s>60&&e<30?"压抑":"平静"}static getNextSceneType(t,e,s){const n=new Set;if(t.split(/\s+/).forEach((t=>n.add(t))),null==e||e.split(/\s+/).forEach((t=>n.add(t))),s){const{gaming:t,study:e,social:a}=s.mainQuests;if(t<30&&n.has("游戏")){const t=["游戏训练","排位赛","直播现场"];return this.getRandomUnusedScene(t)}if(e<30&&n.has("学习")){const t=["课堂学习","考试现场","社团活动"];return this.getRandomUnusedScene(t)}if(a<30&&(n.has("社交")||n.has("朋友"))){const t=["社交互动","粉丝互动","感情困惑"];return this.getRandomUnusedScene(t)}for(const[n,o]of Object.entries(s.relationships))if(o.affinity<-20&&Math.random()<.3)return"李雪"===n?"社交互动":"课堂学习"}if(n.has("游戏")||n.has("直播")){const t=["游戏训练","排位赛","直播现场"];return this.getRandomUnusedScene(t)}if(n.has("学习")||n.has("考试")){const t=["课堂学习","考试现场","社团活动"];return this.getRandomUnusedScene(t)}if(n.has("社交")||n.has("朋友")){const t=["社交互动","粉丝互动","感情困惑"];return this.getRandomUnusedScene(t)}return this.getRandomUnusedScene(this.sceneTypes)}static getNextSpecialEvent(t){if(Math.random()<=.7)return;if(t){const{gaming:e,study:s,social:n}=t.mainQuests;if(e>70&&Math.random()<.4){const t=["炸麦警告（情绪激动导致麦克风爆音）","躺赢时刻（队友carry）","连招练习（剑魔技能连招）"];return t[Math.floor(Math.random()*t.length)]}if(s<30&&Math.random()<.4){const t=["王老师突袭（被抓打游戏）","高考倒计时（压力事件）","家长谈话（成绩下滑）"];return t[Math.floor(Math.random()*t.length)]}for(const[a,o]of Object.entries(t.relationships))if(o.affinity>50&&Math.random()<.3)return"李雪"===a?"偶遇李雪（暗恋对象）":void 0}const e=this.specialEvents.filter((t=>!this.usedSpecialEvents.has(t)));if(0===e.length)return this.usedSpecialEvents.clear(),this.specialEvents[Math.floor(Math.random()*this.specialEvents.length)];const s=e[Math.floor(Math.random()*e.length)];return this.usedSpecialEvents.add(s),s}static getDialogueType(t,e){return t.includes("游戏")||t.includes("直播")?"gaming":t.includes("社交")||t.includes("感情")?"relationship":t.includes("生活")||t.includes("思考")?"life":"advice"}static getRandomUnusedScene(t){const e=this.sceneHistory.slice(-3).map((t=>t.type)),s=t.filter((t=>!e.includes(t)));return 0===s.length?t[Math.floor(Math.random()*t.length)]:s[Math.floor(Math.random()*s.length)]}static formatSceneHistory(){return this.sceneHistory.slice(-3).map(((t,e)=>"场景".concat(e+1,":\n类型: ").concat(t.type,"\n描述: ").concat(t.description,"\n对话: ").concat(t.dialog))).join("\n\n")}static updateSceneHistory(t){this.sceneHistory.push({type:this.getSceneTypeFromDescription(t.description),description:t.description,dialog:t.dialog}),this.sceneHistory.length>10&&this.sceneHistory.shift()}static getSceneTypeFromDescription(t){for(const e of this.sceneTypes)if(t.includes(e))return e;return"日常生活"}static parseResponse(t,e){var s;try{let c=t;const i=t.match(/```(?:json)?\s*([\s\S]*?)\s*```/);let r;i&&i[1]&&(c=i[1]),c=c.replace(/[\u0000-\u001F\u007F-\u009F]/g,"").replace(/:\s*\+(\d+)/g,": $1").replace(/,\s*}/g,"}").replace(/,\s*]/g,"]").replace(/([{,][^,{]*?)(\w+)(\s*:)/g,'$1"$2"$3').replace(/:\s*([^",\[\]{}][^,\[\]{}]*?)(\s*[,}])/g,':"$1"$2');try{r=JSON.parse(c)}catch(n){try{c=c.replace(/\s*:\s*/g,":").replace(/\s*,\s*/g,",").replace(/([{,][^,{]*?)(\w+)(\s*:)/g,'$1"$2"$3').replace(/:\s*([^",\[\]{}][^,\[\]{}]*?)(\s*[,}])/g,':"$1"$2'),r=JSON.parse(c)}catch(a){if(!t.match(/(\{[\s\S]*\})/))throw new Error("响应中未找到有效的JSON结构");try{const e=t.match(/"description"\s*:\s*"([^"]+)"/),s=t.match(/"dialog"\s*:\s*"([^"]+)"/);r={description:e?e[1]:"无法解析场景描述",dialog:s?s[1]:"（系统错误，无法获取对话）",options:[],context:{mood:"困惑",location:"当前位置",timeOfDay:"现在",previousEvents:["解析错误"]}};const n=t.match(/"options"\s*:\s*\[([\s\S]*?)\]/);if(n){const t=n[1].match(/"text"\s*:\s*"([^"]+)"/g),e=n[1].match(/"hint"\s*:\s*"([^"]+)"/g);if(t&&t.length>0){r.options=[];for(let s=0;s<t.length;s++){const n=t[s].match(/"text"\s*:\s*"([^"]+)"/);if(!n)continue;const a=n[1];let o="继续";if(e&&s<e.length){const t=e[s].match(/"hint"\s*:\s*"([^"]+)"/);t&&(o=t[1])}r.options.push({text:a,hint:o,impact:{quest:{type:"social",value:5},relationship:{character:"李雪",value:0}}})}}}}catch(o){throw new Error("无法解析JSON响应: "+n.message)}}}for(r.description&&"string"==typeof r.description||(r.description="小明站在教室里，思考着下一步该怎么做。周围的同学们各忙各的，有人看书，有人聊天，还有人偷偷玩手机。"),r.dialog&&"string"==typeof r.dialog||(r.dialog="我该怎么选择呢？游戏和学习，这是个问题..."),Array.isArray(r.options)||(r.options=[]);r.options.length<2;)r.options.push({text:0===r.options.length?"专注于学习":"打会游戏放松",hint:0===r.options.length?"提高成绩是当务之急":"游戏也很重要",impact:{quest:{type:0===r.options.length?"study":"gaming",value:5},relationship:{character:"李雪",value:0}}});return{id:e,image:"https://source.unsplash.com/800x500/?".concat(this.getImageKeywords(r.description),"&t=").concat(Date.now()),description:r.description.slice(0,300),dialog:r.dialog.slice(0,80),options:r.options.slice(0,3).map((t=>({text:(t.text||"继续探索").slice(0,20),next:-1,hint:(t.hint||"看看接下来会发生什么").slice(0,30),impact:t.impact||{quest:{type:"social",value:5},relationship:{character:"李雪",value:0}}}))),isAIGenerated:!0,specialEvent:null==(s=r.specialEvent)?void 0:s.slice(0,50),context:r.context||{mood:"平静",location:"教室",timeOfDay:"上午",previousEvents:[]},reasoning:r.reasoning}}catch(c){return{id:e,image:"https://source.unsplash.com/800x500/?classroom,error&t="+Date.now(),description:"（系统：由于技术原因，无法生成新场景。）小明站在原地，思考着下一步该怎么办。",dialog:"（让我想想接下来该做什么...）",options:[{text:"重新尝试",next:-1,hint:"再试一次",impact:{quest:{type:"social",value:0},relationship:{character:"李雪",value:0}}},{text:"换个方向",next:-1,hint:"尝试其他选择",impact:{quest:{type:"social",value:0},relationship:{character:"李雪",value:0}}}],isAIGenerated:!0,context:{mood:"困惑",location:"当前位置",timeOfDay:"现在",previousEvents:["系统错误"]}}}}static getImageKeywords(t){const e=new Set;return e.add("chinese"),e.add("student"),(t.includes("游戏")||t.includes("直播"))&&(e.add("gaming"),e.add("computer")),(t.includes("学习")||t.includes("考试"))&&(e.add("classroom"),e.add("study")),(t.includes("社交")||t.includes("朋友"))&&(e.add("friends"),e.add("people")),Array.from(e).slice(0,3).join(",")}handleDeepSeekResponse(t){let e=t.replace(/\+(\d+)/g,"$1");e=e.replace(/([{,]\s*)(\w+)(\s*:)/g,'$1"$2"$3'),e=e.replace(/,\s*([}\]])/g,"$1");try{return JSON.parse(e)}catch(s){return this.parseResponse(t)}}async handleChoice(t,e){var s;if(!e.scenes.find((t=>t.id===e.currentScene)))throw new Error("找不到当前场景: ".concat(e.currentScene));if(!this.apiBaseUrl)throw new Error("API基础URL未设置，无法生成场景");const n={model:this.model,prompt:this.generatePrompt(e,t),temperature:.7,max_tokens:1e3,stream:!1};try{const t=await fetch("".concat(this.apiBaseUrl,"/v1/chat/completions"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(this.apiKey)},body:JSON.stringify({model:n.model,messages:[{role:"user",content:n.prompt}],temperature:n.temperature,max_tokens:n.max_tokens,stream:n.stream})});if(!t.ok){const e=await t.text();throw new Error("API请求失败: ".concat(t.status," ").concat(e))}const a=await t.json();if(!a.choices||0===a.choices.length)throw new Error("API响应中没有选择内容");const o=a.choices[0].message.content,c=this.handleDeepSeekResponse(o),i={id:e.nextSceneId,image:"https://source.unsplash.com/800x500/?".concat(this.getImageKeywords(c.description),"&t=").concat(Date.now()),description:(c.description||"你继续你的旅程...").slice(0,300),dialog:(c.dialog||"（你思考着下一步行动）").slice(0,120),options:(c.options||[]).slice(0,3).map((t=>({text:(t.text||"继续").slice(0,30),next:-1,hint:(t.hint||"看看接下来会发生什么").slice(0,40),impact:t.impact||{quest:{type:"social",value:0},relationship:{character:"李雪",value:0}}}))),isAIGenerated:!0,specialEvent:null==(s=c.specialEvent)?void 0:s.slice(0,50),context:c.context||{mood:"平静",location:"教室",timeOfDay:"上午",previousEvents:["开始游戏"]}};for(;i.options.length<2;)i.options.push({text:0===i.options.length?"仔细观察四周":"继续前进",next:-1,hint:0===i.options.length?"寻找线索":"勇往直前",impact:{quest:{type:"exploration",value:5},relationship:{character:"李雪",value:0}}});return i}catch(a){throw a}}parseResponse(t){try{let s=t.trim();s=s.replace(/\+(\d+)/g,"$1"),s=s.replace(/,\s*([}\]])/g,"$1"),s=s.replace(/'/g,'"'),s=s.replace(/([{,]\s*)(\w+)(\s*:)/g,'$1"$2"$3');try{return JSON.parse(s)}catch(e){const t={description:"",dialog:"",options:[]},n=s.match(/"description"\s*:\s*"([^"]+)"/);n&&(t.description=n[1]);const a=s.match(/"dialog"\s*:\s*"([^"]+)"/);a&&(t.dialog=a[1]);const o=s.match(/"options"\s*:\s*\[([\s\S]*?)\]/);if(o){const e=o[1].match(/"text"\s*:\s*"([^"]+)"/g),s=o[1].match(/"hint"\s*:\s*"([^"]+)"/g);if(e&&e.length>0){t.options=[];for(let n=0;n<e.length;n++){const a=e[n].match(/"text"\s*:\s*"([^"]+)"/);if(!a)continue;const o=a[1];let c="继续";if(s&&n<s.length){const t=s[n].match(/"hint"\s*:\s*"([^"]+)"/);t&&(c=t[1])}t.options.push({text:o,hint:c,impact:{quest:{type:"social",value:5},relationship:{character:"李雪",value:0}}})}}}const c=s.match(/"specialEvent"\s*:\s*"([^"]+)"/);c&&(t.specialEvent=c[1]);const i=s.match(/"context"\s*:\s*(\{[\s\S]*?\})/);return i&&(t.context=JSON.parse(i[1])),t}}catch(s){throw new Error("无法解析API响应")}}}e(o,"sceneHistory",[]),e(o,"usedSpecialEvents",new Set),e(o,"characterBackground",'角色背景：\n- 姓名：小明（游戏ID：最强剑魔）\n- 身份：高三学生，知名游戏主播\n- 游戏特长：英雄联盟剑魔玩家，连续29天冲击王者失败\n- 性格特点：\n  1. 游戏时激情四射，现实中是个普通学生\n  2. 直播时经常情绪激动导致麦克风爆音\n  3. 对游戏有着极强的执着\n  4. 对感情和生活有独特见解\n- 说话特点：\n  1. 游戏相关：\n     - "回答我！我Q会不会空？"\n     - "这把打完我得了MVP！"\n     - "躺赢狗！"\n     - "炸麦警告！"\n     - "你们可能不知道，我学凯南学得有多像"\n  2. 生活感悟：\n     - "怎么不找找自己的问题？"\n     - "我要采一朵花送给妈妈"\n     - "去洗了点阳光青提"\n     - "我真的很不明白"\n  3. 情感态度：\n     - "你很不稳重"\n     - "你这三观还是存在点问题"\n     - "不要被表面现象所迷惑"\n     - "看破不说破，没啥疑不疑惑的"\n- 生活环境：\n  1. 正在备战高考\n  2. 暗恋同学李雪（游戏ID：疯狂打野）\n  3. 被班主任王老师重点关注\n- 日常挑战：\n  1. 平衡学习和游戏时间\n  2. 控制直播时的情绪\n  3. 处理同学和粉丝关系\n  4. 应对高考压力'),e(o,"sceneTypes",["课堂学习","游戏训练","排位赛","直播现场","考试现场","社交互动","家庭生活","社团活动","比赛解说","粉丝互动","感情困惑","人生思考"]),e(o,"specialEvents",["炸麦警告（情绪激动导致麦克风爆音）","躺赢时刻（队友carry）","连招练习（剑魔技能连招）","偶遇李雪（暗恋对象）","王老师突袭（被抓打游戏）","高考倒计时（压力事件）","粉丝认出（身份暴露）","网络卡顿（比赛掉线）","家长谈话（成绩下滑）","赛事解说（受邀解说）","感情困惑（对话选择）","人生思考（价值观碰撞）"]),e(o,"classicQuotes",["回答我！我Q会不会空？","这把打完我得了MVP！","躺赢狗！","炸麦警告！","你们可能不知道，我学凯南学得有多像","我要抽陀螺了！","怎么不找找自己的问题？","我要采一朵花送给妈妈","去洗了点阳光青提","我真的很不明白","你很不稳重","你这三观还是存在点问题","你越大度你对另一半就是不负责的表现","如果要谈你这个年纪就要考虑下半辈子","不要被表面现象所迷惑","看破不说破，没啥疑不疑惑的","你俩能聊就聊","你管她干哈","你俩成不成都不好说","漂亮的玩的花","想这么多干啥","这不是很正常的行为吗","我等会就要骂你了","逆天言论","你真是人才","我干了","既然跟你谈了你们就要自己有边界感","能不能听进去我说的","我只能管好我自己","你不是在找个合作租房的室友，你是在找个可以一起面对生活互相扶持的伴侣"]),e(o,"dialogueTypes",{gaming:["回答我！我Q会不会空？","这把打完我得了MVP！","躺赢狗！","炸麦警告！","你们可能不知道，我学凯南学得有多像"],life:["怎么不找找自己的问题？","我要采一朵花送给妈妈","去洗了点阳光青提","我真的很不明白"],relationship:["你很不稳重","你这三观还是存在点问题","不要被表面现象所迷惑","看破不说破，没啥疑不疑惑的"],advice:["你俩能聊就聊","你管她干哈","想这么多干啥","这不是很正常的行为吗"]});export{n as A,s as C,o as D,a as u};
