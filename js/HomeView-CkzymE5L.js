import{u as e}from"./vue-router-DjSvNRrw.js";import{j as t,q as a,v as r,I as o,E as d,x as s}from"./vue-DJBEoy3g.js";import{_ as l}from"./vue-helper-BCo6x5W8.js";const n={class:"min-h-screen bg-gradient-to-br from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8"},i=l(t({__name:"HomePage",emits:["change-tab"],setup(e,{emit:t}){const s=t;function l(){s("change-tab","demo")}function i(){s("change-tab","game")}function v(){s("change-tab","prompt-library")}return(e,t)=>(d(),a("div",n,[r("div",{class:"max-w-7xl mx-auto"},[t[3]||(t[3]=o('<div class="text-center mb-16" data-v-db418534><div class="relative inline-block" data-v-db418534><div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur-3xl" data-v-db418534></div><h1 class="relative text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 mb-4" data-v-db418534> Deepseek 接口演示 </h1></div><p class="mt-4 text-xl text-gray-600 max-w-2xl mx-auto" data-v-db418534> 探索AI的无限可能，体验智能对话的未来 </p></div><div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-12" data-v-db418534><div class="max-w-3xl mx-auto text-center" data-v-db418534><p class="text-lg text-gray-600 mb-6" data-v-db418534>本项目提供了两种使用 Deepseek API 的方法：</p><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-db418534><div class="p-6 bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-100" data-v-db418534><h3 class="text-lg font-semibold text-purple-700 mb-2" data-v-db418534>DeepseekClient</h3><p class="text-gray-600" data-v-db418534>兼容 OpenAI 格式的客户端</p></div><div class="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100" data-v-db418534><h3 class="text-lg font-semibold text-blue-700 mb-2" data-v-db418534>DeepseekAdapter</h3><p class="text-gray-600" data-v-db418534>兼容 ai.createModel 风格的适配器</p></div></div><p class="mt-6 text-gray-600" data-v-db418534>两种方式都支持流式输出和思维链展示，让您可以看到模型的推理过程。</p></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" data-v-db418534><div class="group bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl" data-v-db418534><div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-2xl text-white mb-4" data-v-db418534> 🔄 </div><h3 class="text-lg font-semibold text-gray-800 mb-2" data-v-db418534>流式输出</h3><p class="text-gray-600" data-v-db418534>实时显示生成内容，提供更好的用户体验</p></div><div class="group bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl" data-v-db418534><div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-2xl text-white mb-4" data-v-db418534> 🤔 </div><h3 class="text-lg font-semibold text-gray-800 mb-2" data-v-db418534>思维链展示</h3><p class="text-gray-600" data-v-db418534>查看模型的推理过程，了解模型如何思考</p></div><div class="group bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl" data-v-db418534><div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-2xl text-white mb-4" data-v-db418534> 🔌 </div><h3 class="text-lg font-semibold text-gray-800 mb-2" data-v-db418534>简洁接口</h3><p class="text-gray-600" data-v-db418534>兼容您熟悉的接口风格，减少学习成本</p></div><div class="group bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl" data-v-db418534><div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-2xl text-white mb-4" data-v-db418534> ⚙️ </div><h3 class="text-lg font-semibold text-gray-800 mb-2" data-v-db418534>完全可配置</h3><p class="text-gray-600" data-v-db418534>调整温度、最大生成长度等参数</p></div></div>',3)),r("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"},[r("div",{onClick:l,class:"group cursor-pointer relative overflow-hidden"},t[0]||(t[0]=[o('<div class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out rounded-2xl" data-v-db418534></div><div class="relative bg-white p-8 rounded-2xl shadow-lg border border-gray-100 group-hover:translate-y-[-2px] group-hover:shadow-purple-100/50 group-hover:shadow-xl group-hover:border-purple-100 transition-all duration-500 ease-out" data-v-db418534><div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" data-v-db418534></div><h3 class="text-xl font-semibold text-gray-800 group-hover:text-purple-700 mb-4 transition-colors duration-300" data-v-db418534>API 演示</h3><p class="text-gray-600 group-hover:text-gray-700 mb-6 transition-colors duration-300" data-v-db418534>体验 Deepseek API 的流式输出与思维链</p><div class="flex items-center text-purple-600 group-hover:text-purple-700 transition-all duration-300" data-v-db418534><span class="font-medium" data-v-db418534>立即体验</span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 transform group-hover:translate-x-2 transition-all duration-300" viewBox="0 0 20 20" fill="currentColor" data-v-db418534><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" data-v-db418534></path></svg></div></div>',2)])),r("div",{onClick:i,class:"group cursor-pointer relative overflow-hidden"},t[1]||(t[1]=[o('<div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out rounded-2xl" data-v-db418534></div><div class="relative bg-white p-8 rounded-2xl shadow-lg border border-gray-100 group-hover:translate-y-[-2px] group-hover:shadow-blue-100/50 group-hover:shadow-xl group-hover:border-blue-100 transition-all duration-500 ease-out" data-v-db418534><div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" data-v-db418534></div><h3 class="text-xl font-semibold text-gray-800 group-hover:text-blue-700 mb-4 transition-colors duration-300" data-v-db418534>游戏演示</h3><p class="text-gray-600 group-hover:text-gray-700 mb-6 transition-colors duration-300" data-v-db418534>体验基于大语言模型的交互式游戏</p><div class="flex items-center text-blue-600 group-hover:text-blue-700 transition-all duration-300" data-v-db418534><span class="font-medium" data-v-db418534>立即体验</span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 transform group-hover:translate-x-2 transition-all duration-300" viewBox="0 0 20 20" fill="currentColor" data-v-db418534><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" data-v-db418534></path></svg></div></div>',2)])),r("div",{onClick:v,class:"group cursor-pointer relative overflow-hidden"},t[2]||(t[2]=[o('<div class="absolute inset-0 bg-gradient-to-r from-green-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out rounded-2xl" data-v-db418534></div><div class="relative bg-white p-8 rounded-2xl shadow-lg border border-gray-100 group-hover:translate-y-[-2px] group-hover:shadow-green-100/50 group-hover:shadow-xl group-hover:border-green-100 transition-all duration-500 ease-out" data-v-db418534><div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" data-v-db418534></div><h3 class="text-xl font-semibold text-gray-800 group-hover:text-green-700 mb-4 transition-colors duration-300" data-v-db418534>提示库</h3><p class="text-gray-600 group-hover:text-gray-700 mb-6 transition-colors duration-300" data-v-db418534>探索 DeepSeek 提示词样例，挖掘更多可能</p><div class="flex items-center text-green-600 group-hover:text-green-700 transition-all duration-300" data-v-db418534><span class="font-medium" data-v-db418534>立即体验</span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 transform group-hover:translate-x-2 transition-all duration-300" viewBox="0 0 20 20" fill="currentColor" data-v-db418534><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" data-v-db418534></path></svg></div></div>',2)]))]),t[4]||(t[4]=o('<div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden" data-v-db418534><div class="bg-gray-50 border-b border-gray-100 p-6" data-v-db418534><h2 class="text-2xl font-semibold text-gray-800 mb-2" data-v-db418534>快速开始</h2><p class="text-gray-600" data-v-db418534>选择您喜欢的方式开始使用</p></div><div class="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-100" data-v-db418534><div class="p-6" data-v-db418534><h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center" data-v-db418534><span class="w-2 h-2 bg-purple-500 rounded-full mr-2" data-v-db418534></span> 使用 DeepseekClient </h4><div class="bg-gray-900 rounded-xl p-6 overflow-x-auto" data-v-db418534><pre class="text-sm font-mono text-gray-300" data-v-db418534><code data-v-db418534>import DeepseekClient from &#39;./services/DeepseekClient&#39;;\n\n// 创建客户端\nconst client = new DeepseekClient({\n  apiKey: &#39;YOUR_API_KEY&#39;, // 请替换为您的API密钥\n  baseURL: &#39;YOUR_API_ENDPOINT&#39;, // 请替换为您的API端点\n  model: &#39;deepseek-r1&#39;\n});\n\n// 创建聊天完成请求\nconst stream = await client.chat.completions.create({\n  messages: [\n    { role: &#39;user&#39;, content: &#39;请介绍一下李白&#39; }\n  ],\n  stream: true\n});\n\n// 处理流式响应\nfor await (const chunk of stream) {\n  // 处理思维链内容\n  const reasoning = chunk.choices?.[0]?.delta?.reasoning_content;\n  if (reasoning) console.log(&#39;思考:&#39;, reasoning);\n\n  // 处理生成内容\n  const content = chunk.choices?.[0]?.delta?.content;\n  if (content) console.log(&#39;回答:&#39;, content);\n}</code></pre></div></div><div class="p-6" data-v-db418534><h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center" data-v-db418534><span class="w-2 h-2 bg-blue-500 rounded-full mr-2" data-v-db418534></span> 使用 DeepseekAdapter </h4><div class="bg-gray-900 rounded-xl p-6 overflow-x-auto" data-v-db418534><pre class="text-sm font-mono text-gray-300" data-v-db418534><code data-v-db418534>import ai from &#39;./services/DeepseekAdapter&#39;;\n\n// 创建模型\nconst aiModel = ai.createModel(&quot;deepseek&quot;, {\n  apiKey: &#39;YOUR_API_KEY&#39;, // 请替换为您的API密钥\n  baseURL: &#39;YOUR_API_ENDPOINT&#39; // 请替换为您的API端点\n});\n\n// 流式文本生成\nconst res = await aiModel.streamText({\n  model: &quot;deepseek-r1&quot;,\n  messages: [\n    { role: &quot;user&quot;, content: &quot;请介绍一下李白&quot; }\n  ]\n});\n\n// 处理流式响应\nfor await (const data of res.dataStream) {\n  // 思维链内容\n  const think = (data?.choices?.[0]?.delta)?.reasoning_content;\n  if (think) console.log(&#39;思考:&#39;, think);\n\n  // 生成文本内容\n  const text = (data?.choices?.[0]?.delta)?.content;\n  if (text) console.log(&#39;回答:&#39;, text);\n}</code></pre></div></div></div></div>',1))])]))}}),[["__scopeId","data-v-db418534"]]),v={class:"home-view-container"},b=l(t({__name:"HomeView",setup(t){const r=e(),o=e=>{switch(e){case"api":r.push("/api-demo");break;case"game":r.push("/game");break;case"prompt-library":r.push("/prompt-library");break;default:r.push("/")}};return(e,t)=>(d(),a("div",v,[s(i,{onChangeTab:o})]))}}),[["__scopeId","data-v-1ae23fba"]]);export{b as default};
