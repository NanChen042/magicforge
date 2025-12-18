<template>
  <div class="max-w-7xl mx-auto mb-12 px-4">
    
    <!-- 1. 窗口头部：模拟 IDE 标题栏 -->
    <div class="relative bg-zinc-900 rounded-t-xl border border-zinc-800 border-b-0 px-4 py-3 flex items-center justify-between">
      <!-- 窗口控制点 -->
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
        <div class="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
        <div class="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
      </div>

      <!-- 文件名/标题 -->
      <div class="absolute left-1/2 -translate-x-1/2 text-xs font-mono font-medium text-zinc-400 flex items-center gap-2">
        <svg class="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
        <span>example.ts</span>
      </div>

      <!-- API 风格标签 -->
      <div class="flex items-center">
        <span class="px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-300">
          {{ apiStyle === "openai" ? "OpenAI Standard" : "Vercel AI SDK" }}
        </span>
      </div>
    </div>

    <!-- 2. 代码区域 -->
    <div class="relative group bg-[#0d0d0d] rounded-b-xl border border-zinc-800 overflow-hidden">
      
      <!-- 复制按钮 (悬浮) -->
      <button 
        @click="copyCode"
        class="absolute top-4 right-4 p-2 rounded-lg bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-700 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 border border-zinc-700/50"
        title="Copy Code"
      >
        <svg v-if="!copied" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
        <svg v-else class="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
      </button>

      <!-- 代码内容 -->
      <div class="overflow-x-auto p-6">
        <pre class="font-mono text-sm leading-relaxed text-zinc-300 select-all scrollbar-hide"><code>{{ currentCode }}</code></pre>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { copyToClipboard } from '@/utils/clipboard'; // 假设你有这个工具函数

const props = defineProps<{
  apiStyle: 'openai' | 'adapter';
  userInput: string;
  streaming: boolean;
  temperature: number;
  maxTokens: number;
}>();

const copied = ref(false);

const copyCode = async () => {
  await copyToClipboard(currentCode.value);
  copied.value = true;
  setTimeout(() => copied.value = false, 2000);
};

const currentCode = computed(() => {
  if (props.apiStyle === "openai") {
    return `import DeepseekClient from './services/DeepseekClient';

// Initialize Client
const client = new DeepseekClient({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com',
  model: 'deepseek-chat'
});

// Create Completion
const stream = await client.chat.completions.create({
  messages: [
    { role: 'user', content: '${props.userInput || "Hello world"}' }
  ],
  stream: ${props.streaming},
  temperature: ${props.temperature},
  max_tokens: ${props.maxTokens}
});

// Handle Stream
for await (const chunk of stream) {
  const reasoning = chunk.choices?.[0]?.delta?.reasoning_content;
  if (reasoning) process.stdout.write(reasoning); // Output reasoning

  const content = chunk.choices?.[0]?.delta?.content;
  if (content) process.stdout.write(content); // Output answer
}`;
  } else {
    return `import { createDeepSeek } from '@ai-sdk/deepseek';
import { ${props.streaming ? 'streamText' : 'generateText'} } from 'ai';

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
});

// Execute Generation
${props.streaming 
? `const result = await streamText({
  model: deepseek('deepseek-chat'),
  messages: [
    { role: 'user', content: '${props.userInput || "Hello world"}' }
  ],
  temperature: ${props.temperature},
  maxTokens: ${props.maxTokens}
});

for await (const delta of result.fullStream) {
  // Handle mixed stream of reasoning and text
  console.log(delta); 
}`
: `const { text, reasoning } = await generateText({
  model: deepseek('deepseek-chat'),
  messages: [
    { role: 'user', content: '${props.userInput || "Hello world"}' }
  ],
  temperature: ${props.temperature},
  maxTokens: ${props.maxTokens}
});

console.log('Reasoning:', reasoning);
console.log('Response:', text);`
}`;
  }
});
</script>

<style scoped>
/* 隐藏代码块滚动条但保留功能 */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
