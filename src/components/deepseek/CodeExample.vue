<template>
  <div class="max-w-7xl mx-auto bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mb-8 px-4">
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
      <div class="flex items-center space-x-3">
        <div class="bg-purple-100 p-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-800">代码示例</h3>
      </div>
      <div class="flex items-center space-x-2 text-gray-500 text-sm">
        <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
          {{ apiStyle === "openai" ? "OpenAI兼容格式" : "ai.createModel样式" }}
        </span>
      </div>
    </div>
    <div class="bg-gray-900 p-4 overflow-x-auto text-gray-300 text-sm font-mono whitespace-pre">
      {{ currentCode }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  apiStyle: 'openai' | 'adapter';
  userInput: string;
  streaming: boolean;
  temperature: number;
  maxTokens: number;
}>();

const currentCode = computed(() => {
  if (props.apiStyle === "openai") {
    return `import DeepseekClient from './services/DeepseekClient';

// 创建客户端
const client = new DeepseekClient({
  apiKey: 'YOUR_API_KEY',
  baseURL: 'YOUR_API_ENDPOINT',
  model: 'deepseek-r1'
});

// 创建聊天完成请求
const stream = await client.chat.completions.create({
  messages: [
    { role: 'user', content: '${props.userInput}' }
  ],
  stream: ${props.streaming},
  temperature: ${props.temperature},
  max_tokens: ${props.maxTokens}
});

// 处理流式响应
for await (const chunk of stream) {
  // 处理思维链内容
  const reasoning = chunk.choices?.[0]?.delta?.reasoning_content;
  if (reasoning) console.log('思考:', reasoning);

  // 处理生成内容
  const content = chunk.choices?.[0]?.delta?.content;
  if (content) console.log('回答:', content);
}`;
  } else {
    return `import ai from './services/DeepseekAdapter';

// 创建模型
const aiModel = ai.createModel("deepseek", {
  apiKey: 'YOUR_API_KEY',
  baseURL: 'YOUR_API_ENDPOINT'
});

// ${props.streaming ? "流式" : ""}文本生成
${props.streaming
        ? `const res = await aiModel.streamText({
  model: "deepseek-r1",
  messages: [
    { role: "user", content: "${props.userInput}" }
  ],
  temperature: ${props.temperature},
  max_tokens: ${props.maxTokens}
});

// 处理流式响应
for await (const data of res.dataStream) {
  // 思维链内容
  const think = (data?.choices?.[0]?.delta)?.reasoning_content;
  if (think) console.log('思考:', think);

  // 生成文本内容
  const text = (data?.choices?.[0]?.delta)?.content;
  if (text) console.log('回答:', text);
}`
        : `const res = await aiModel.generateText({
  model: "deepseek-r1",
  messages: [
    { role: "user", content: "${props.userInput}" }
  ],
  temperature: ${props.temperature},
  max_tokens: ${props.maxTokens}
});

console.log('回答:', res.text);
console.log('思考:', res.reasoning);`
      }`;
  }
});
</script>
