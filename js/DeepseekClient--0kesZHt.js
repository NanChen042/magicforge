import{C as y}from"./CheckpointService-iF4LxzxX.js";class f{apiKey;baseURL;model;temperature;maxTokens;topP;topK;frequencyPenalty;presencePenalty;sceneHistory=[];usedSpecialEvents=new Set;sceneTypes=["课堂学习","游戏训练","排位赛","直播现场","考试现场","社交互动","家庭生活","社团活动","比赛解说","粉丝互动","感情困惑","人生思考"];specialEvents=["炸麦警告（情绪激动导致麦克风爆音）","躺赢时刻（队友carry）","连招练习（剑魔技能连招）","偶遇李雪（暗恋对象）","王老师突袭（被抓打游戏）","高考倒计时（压力事件）","粉丝认出（身份暴露）","网络卡顿（比赛掉线）","家长谈话（成绩下滑）","赛事解说（受邀解说）","感情困惑（对话选择）","人生思考（价值观碰撞）"];characterBackground=`角色背景：
- 姓名：小明（游戏ID：最强剑魔）
- 身份：高三学生，知名游戏主播
- 游戏特长：英雄联盟剑魔玩家，连续29天冲击王者失败
- 性格特点：
  1. 游戏时激情四射，现实中是个普通学生
  2. 直播时经常情绪激动导致麦克风爆音
  3. 对游戏有着极强的执着
  4. 对感情和生活有独特见解`;constructor(e){this.apiKey=e.apiKey,this.baseURL=e.baseURL,this.model=e.model||"deepseek-r1",this.temperature=e.temperature||.8,this.maxTokens=e.maxTokens||2e3,this.topP=e.topP,this.topK=e.topK,this.frequencyPenalty=e.frequencyPenalty,this.presencePenalty=e.presencePenalty}async chatCompletion(e){try{const t=this.ensureCorrectApiUrl(this.baseURL),n={model:this.model,messages:e.messages,temperature:this.temperature,max_tokens:this.maxTokens,stream:e.stream||!1};this.topP!==void 0&&this.topP>0&&(n.top_p=this.topP),this.topK!==void 0&&this.topK>0&&(n.top_k=this.topK),this.frequencyPenalty!==void 0&&this.frequencyPenalty!==0&&(n.frequency_penalty=this.frequencyPenalty),this.presencePenalty!==void 0&&this.presencePenalty!==0&&(n.presence_penalty=this.presencePenalty);const r=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.apiKey}`},body:JSON.stringify(n)});if(!r.ok){const s=await r.json().catch(()=>null);throw new Error(`API请求失败: ${r.status} ${r.statusText}
${s?JSON.stringify(s):""}`)}return e.stream?this.handleStream(r):r.json()}catch(t){throw console.error("API请求失败:",t),t}}get completions(){return{create:e=>this.chatCompletion(e)}}get chat(){const e=this;return{completions:{create:t=>e.chatCompletion(t)}}}ensureCorrectApiUrl(e){return e.includes("/chat/completions")?e:`${e.endsWith("/")?e.slice(0,-1):e}/chat/completions`}async handleStream(e){return{[Symbol.asyncIterator](){const n=e.body.getReader(),r=new TextDecoder;let s="";const c=[],o=()=>{const i=[];let h=!1;const a=/data:\s*(\[DONE\]|\{[^]*?\})(?=\s*(?:data:|$))/g;let u,l=0;for(;(u=a.exec(s))!==null;){const p=u[1].trim();if(l=a.lastIndex,p==="[DONE]"){h=!0;break}try{const d=JSON.parse(p);i.push(d)}catch{console.warn("SSE JSON 解析失败，可能是不完整数据:",p.substring(0,100))}}return l>0&&(s=s.substring(l)),{chunks:i,isDone:h}};return{async next(){try{if(c.length>0)return{value:c.shift(),done:!1};const{done:i,value:h}=await n.read();if(i){if(s.trim().length>0){const{chunks:l,isDone:p}=o();if(l.length>0)return c.push(...l.slice(1)),{value:l[0],done:!1}}return{done:!0,value:void 0}}s+=r.decode(h,{stream:!0});const{chunks:a,isDone:u}=o();return u?{done:!0,value:void 0}:a.length>0?(c.push(...a.slice(1)),{value:a[0],done:!1}):this.next()}catch(i){return console.error("流式处理出错",i),{done:!0,value:void 0}}},async return(){return await n.cancel(),{done:!0,value:void 0}}}}}}async createStreamingResponse(e,t){const n=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.apiKey}`},body:JSON.stringify(t)});if(!n.ok){const r=await n.text();throw new Error(`API请求失败: ${n.status} - ${r}`)}return this.handleStream(n)}async generateInitialScene(){const e=this.sceneTypes[Math.floor(Math.random()*this.sceneTypes.length)],t=Math.random()>.7?this.specialEvents[Math.floor(Math.random()*this.specialEvents.length)]:void 0,n=`请以第一人称的视角，扮演小明（最强剑魔）生成游戏开场场景。

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
}`;try{const r=[{role:"system",content:"你现在是小明（游戏ID：最强剑魔），一个高三学生兼游戏主播。你要生动地讲述在学习和游戏之间的故事。确保输出是合法的JSON格式。"},{role:"user",content:n}],c=(await this.chatCompletion({messages:r,stream:!1})).choices[0].message.content;return this.parseResponse(c,1)}catch(r){throw console.error("生成初始场景失败:",r),r}}async generateScene(e){try{if(e.checkpointId){const a=y.get(e.checkpointId);a&&(this.sceneHistory=a.sceneHistory,console.log("从检查点恢复场景历史:",this.sceneHistory))}const t=this.getNextSceneType(e.choiceText,e.currentScene?.description,e.storyProgress),n=this.getNextSpecialEvent(e.storyProgress),r=this.generatePrompt({...e,sceneType:t,specialEvent:n,sceneHistory:this.sceneHistory.slice(-3)}),s=[{role:"system",content:"你是一个擅长通过思维链推理来生成故事情节的AI。你需要分析当前情况，考虑人物关系发展，并选择最合适的剧情走向。确保输出是合法的JSON格式。"},{role:"user",content:r}];if(e.stream)return this.chatCompletion({messages:s,stream:!0});const o=(await this.chatCompletion({messages:s,stream:!1})).choices[0].message.content,i=this.parseResponse(o,e.currentSceneId+1);this.updateSceneHistory(i);const h=y.create({sceneHistory:this.sceneHistory,storyProgress:e.storyProgress,currentScene:i,lastChoices:e.previousChoices||[]});return{...i,checkpointId:h}}catch(t){throw console.error("生成场景失败:",t),t}}generatePrompt(e){return`作为一个AI助手，你需要基于以下信息生成游戏的下一个场景。请注意故事的连贯性和角色关系发展。

思考步骤：
1. 分析当前场景和玩家选择
2. 考虑角色关系发展
3. 结合主线任务进度
4. 选择合适的场景发展方向
5. 设计有意义的选项
6. 整合特殊事件（如果有）

${this.characterBackground}

当前进度：
游戏成就: ${e.storyProgress.mainQuests.gaming}/100
学习进度: ${e.storyProgress.mainQuests.study}/100
社交关系: ${e.storyProgress.mainQuests.social}/100

重要关系：
${Object.entries(e.storyProgress.relationships).map(([t,n])=>`${t}（好感度：${n.affinity}）`).join(`
`)}

历史场景：
${e.sceneHistory.map((t,n)=>`场景${n+1}:
类型: ${t.type}
描述: ${t.description}
对话: ${t.dialog}`).join(`

`)}

当前情况：
场景类型: ${e.sceneType}
${e.specialEvent?`特殊事件: ${e.specialEvent}`:""}
玩家选择: ${e.choiceText}
${e.previousChoices?.length?`之前的选择: ${e.previousChoices.join(" -> ")}`:""}

要求：
1. 根据玩家的选择和当前情况，合理发展剧情
2. 考虑角色关系的发展，体现好感度变化
3. 根据主线任务进度调整剧情走向
4. 选项要能推动故事发展，并影响角色关系
5. 特殊事件要自然融入场景
6. 确保故事的连贯性和合理性
7. 避免与历史场景重复

请按照以下格式输出JSON：
{
  "description": "场景描述（200字以内）",
  "dialog": "小明的对话（50字以内）",
  "options": [
    {
      "text": "选项1（15字以内）",
      "hint": "选项提示（20字以内）",
      "impact": {
        "quest": {"type": "gaming|study|social", "value": number},
        "relationship": {"character": "string", "value": number},
        "flag": "string"
      }
    }
  ],
  "specialEvent": "特殊事件的具体描述（可选，50字以内）",
  "context": {
    "mood": "当前情绪",
    "location": "场景位置",
    "timeOfDay": "时间段",
    "previousEvents": ["重要历史事件"]
  },
  "reasoning": "思维过程说明（可选）"
}`}parseResponse(e,t){try{console.log("解析响应内容:",e);let n=e.replace(/```json\s*|\s*```/g,"").replace(/[\u0000-\u001F\u007F-\u009F]/g,"").replace(/\\n/g," ").replace(/\s+/g," ").trim();const r=n.match(/\{(?:[^{}]|(\{[^{}]*\}))*\}/);r&&(n=r[0]),n=n.replace(/,\s*([}\]])/g,"$1").replace(/([{,])\s*([^"'\s].*?):/g,'$1"$2":').replace(/:\s*'([^']*)'/g,':"$1"').replace(/"\s*\+\s*"/g,"").replace(/\\/g,"\\\\");let s;try{s=JSON.parse(n)}catch(o){console.error("第一次 JSON 解析失败，错误:",o),console.log("尝试进一步清理内容..."),n=n.replace(/[^\x20-\x7E]+/g,"").replace(/\s*:\s*/g,":").replace(/\s*,\s*/g,",").replace(/^\s*{\s*/,"{").replace(/\s*}\s*$/,"}"),s=JSON.parse(n)}if(!s.description||typeof s.description!="string")throw new Error("缺少场景描述或格式不正确");if(!s.dialog||typeof s.dialog!="string")throw new Error("缺少对话内容或格式不正确");for(Array.isArray(s.options)||(s.options=[]);s.options.length<2;)s.options.push({text:"继续探索",hint:"看看接下来会发生什么",impact:{quest:{type:"social",value:5},relationship:{character:"李雪",value:0}}});return{id:t,image:`https://source.unsplash.com/800x500/?${this.getImageKeywords(s.description)}&t=${Date.now()}`,description:s.description.slice(0,200),dialog:s.dialog.slice(0,50),options:s.options.slice(0,2).map(o=>({text:(o.text||"继续探索").slice(0,15),next:-1,hint:(o.hint||"看看接下来会发生什么").slice(0,20),impact:o.impact||{quest:{type:"social",value:5},relationship:{character:"李雪",value:0}}})),isAIGenerated:!0,specialEvent:s.specialEvent?.slice(0,50),context:s.context||{mood:"平静",location:"教室",timeOfDay:"上午",previousEvents:[]},reasoning:s.reasoning}}catch(n){return console.error("解析响应失败:",n),console.error("原始内容:",e),{id:t,image:"https://source.unsplash.com/800x500/?classroom,error&t="+Date.now(),description:"（系统：由于技术原因，无法生成新场景。）小明站在原地，思考着下一步该怎么办。",dialog:"（让我想想接下来该做什么...）",options:[{text:"重新尝试",next:-1,hint:"再试一次",impact:{quest:{type:"social",value:0},relationship:{character:"李雪",value:0}}},{text:"换个方向",next:-1,hint:"尝试其他选择",impact:{quest:{type:"social",value:0},relationship:{character:"李雪",value:0}}}],isAIGenerated:!0,context:{mood:"困惑",location:"当前位置",timeOfDay:"现在",previousEvents:["系统错误"]}}}}getImageKeywords(e){const t=new Set;return t.add("chinese"),t.add("student"),(e.includes("游戏")||e.includes("直播"))&&(t.add("gaming"),t.add("computer")),(e.includes("学习")||e.includes("考试"))&&(t.add("classroom"),t.add("study")),(e.includes("社交")||e.includes("朋友"))&&(t.add("friends"),t.add("people")),Array.from(t).slice(0,3).join(",")}getNextSceneType(e,t,n){const r=new Set;if(e.split(/\s+/).forEach(s=>r.add(s)),t?.split(/\s+/).forEach(s=>r.add(s)),n){const{gaming:s,study:c,social:o}=n.mainQuests;if(s<30&&r.has("游戏")){const i=["游戏训练","排位赛","直播现场"];return this.getRandomUnusedScene(i)}if(c<30&&r.has("学习")){const i=["课堂学习","考试现场","社团活动"];return this.getRandomUnusedScene(i)}if(o<30&&(r.has("社交")||r.has("朋友"))){const i=["社交互动","粉丝互动","感情困惑"];return this.getRandomUnusedScene(i)}}if(r.has("游戏")||r.has("直播")){const s=["游戏训练","排位赛","直播现场"];return this.getRandomUnusedScene(s)}else if(r.has("学习")||r.has("考试")){const s=["课堂学习","考试现场","社团活动"];return this.getRandomUnusedScene(s)}else if(r.has("社交")||r.has("朋友")){const s=["社交互动","粉丝互动","感情困惑"];return this.getRandomUnusedScene(s)}return this.getRandomUnusedScene(this.sceneTypes)}getRandomUnusedScene(e){const t=this.sceneHistory.slice(-3).map(r=>r.type),n=e.filter(r=>!t.includes(r));return n.length===0?e[Math.floor(Math.random()*e.length)]:n[Math.floor(Math.random()*n.length)]}getNextSpecialEvent(e){if(Math.random()<=.7)return;if(e){const{gaming:r,study:s,social:c}=e.mainQuests;if(r>70&&Math.random()<.4){const o=["炸麦警告（情绪激动导致麦克风爆音）","躺赢时刻（队友carry）","连招练习（剑魔技能连招）"];return o[Math.floor(Math.random()*o.length)]}if(s<30&&Math.random()<.4){const o=["王老师突袭（被抓打游戏）","高考倒计时（压力事件）","家长谈话（成绩下滑）"];return o[Math.floor(Math.random()*o.length)]}}const t=this.specialEvents.filter(r=>!this.usedSpecialEvents.has(r));if(t.length===0)return this.usedSpecialEvents.clear(),this.specialEvents[Math.floor(Math.random()*this.specialEvents.length)];const n=t[Math.floor(Math.random()*t.length)];return this.usedSpecialEvents.add(n),n}updateSceneHistory(e){this.sceneHistory.push({type:this.getSceneTypeFromDescription(e.description),description:e.description,dialog:e.dialog}),this.sceneHistory.length>10&&this.sceneHistory.shift()}getSceneTypeFromDescription(e){for(const t of this.sceneTypes)if(e.includes(t))return t;return"日常生活"}}export{f as D};
