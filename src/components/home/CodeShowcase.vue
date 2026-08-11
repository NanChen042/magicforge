<template>
  <!-- 5. 代码展示：IDE 风格窗口 -->
  <section class="max-w-5xl mx-auto mb-8 relative z-20">
    <!-- 标题区 -->
    <div class="text-center mb-10">
      <p class="text-xs font-bold text-blue-500 uppercase tracking-widest mb-3">Developer First</p>
      <h2 class="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
        几行代码，接入
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-600">全栈 AI 能力</span>
      </h2>
      <p class="text-slate-500 text-base max-w-xl mx-auto font-light">
        从流式对话到多模态理解，API 设计遵循直觉，让你专注于产品而非基础设施。
      </p>
    </div>
    <div class="bg-slate-900 rounded-md shadow-2xl shadow-slate-900/50 overflow-hidden ring-1 ring-white/10">

      <!-- 模拟 IDE 标题栏 -->
      <div class="flex items-center justify-between px-6 py-4 bg-slate-800/50 border-b border-white/5 backdrop-blur-sm">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div class="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <div class="text-xs font-mono text-slate-400">DeepseekIntegration.ts</div>
        <div class="w-10"></div> <!-- 占位 -->
      </div>

      <!-- 代码内容区，使用 grid 布局 -->
      <div class="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
        <!-- Left Code: 流式对话 + 思维链 -->
        <div class="p-6 md:p-8">
          <div class="flex items-center gap-2 mb-6">
            <span class="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs font-mono rounded border border-blue-500/30">流式对话 + 思维链</span>
          </div>
          <div class="relative group">
            <div class="absolute -inset-4 bg-blue-500/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <pre class="relative text-sm font-mono leading-relaxed text-slate-300 overflow-x-auto"><code><span class="text-blue-400">import</span> { DeepseekClient } <span class="text-blue-400">from</span> <span class="text-green-400">'@/services'</span>;

// 初始化客户端
const client = new DeepseekClient({
  apiKey: 'sk-xxx',
  baseURL: 'https://api.siliconflow.cn/v1'
});

// 流式对话，支持思维链
const stream = await client.streamChat({
  model: 'deepseek-r1',
  messages: [
    { role: 'user', content: '解释量子纠缠' }
  ],
  temperature: 0.7,
  onThinking: (reasoning) => {
    // 实时获取推理过程
    console.log('思考中:', reasoning);
  },
  onContent: (chunk) => {
    // 逐字输出回答
    process.stdout.write(chunk);
  }
});</code></pre>
          </div>
        </div>

        <!-- Right Code: 多模态 + 图像理解 -->
        <div class="p-6 md:p-8">
          <div class="flex items-center gap-2 mb-6">
            <span class="px-2 py-1 bg-sky-500/20 text-sky-300 text-xs font-mono rounded border border-sky-500/30">多模态图像理解</span>
          </div>
          <div class="relative group">
            <div class="absolute -inset-4 bg-sky-500/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <pre class="relative text-sm font-mono leading-relaxed text-slate-300 overflow-x-auto"><code><span class="text-blue-400">import</span> { imageService } from '@/services';

// 图像生成
const result = await imageService.generate({
  prompt: '赛博朋克风格的未来城市',
  model: 'kolors',
  size: '1024x1024',
  quality: 'hd'
});

// 视觉理解（OCR/图像分析）
const analysis = await client.analyzeImage({
  model: 'glm-4v',
  image: imageUrl,
  prompt: '描述这张图片的内容'
});

// 文档 OCR 转 Markdown
const markdown = await client.ocr({
  model: 'deepseek-ocr',
  image: documentImage
});

console.log(markdown);</code></pre>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
