<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
    <!-- 头部区域 - 更现代的设计 -->
    <div class="relative bg-gradient-to-r from-rose-50 via-white to-indigo-50 dark:from-gray-800 dark:via-gray-900 dark:to-indigo-950 border-b border-gray-200 dark:border-gray-700 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div class="relative z-10 text-center md:text-left">
          <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 inline-block text-transparent bg-clip-text mb-4">提示词库</h1>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto md:mx-0">探索各种预设提示词模板，快速开始你的AI创作之旅。</p>
        </div>
      </div>
      <!-- 背景装饰 - 更复杂的图案 -->
      <div class="absolute inset-0 bg-grid-gray-100 opacity-20 dark:opacity-10"></div>
      <div class="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:40px_40px] opacity-10"></div>
    </div>

    <!-- 主要内容区域 - 闪光效果背景 -->
    <div class="relative py-16 overflow-hidden">
      <!-- 背景装饰元素 - 辐射渐变 -->
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#f9fafb,transparent)] dark:bg-[radial-gradient(ellipse_at_top,#111827_30%,transparent_70%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50 dark:opacity-30"></div>

      <!-- 随机装饰点 -->
      <div class="absolute top-1/4 left-10 w-24 h-24 bg-rose-200 dark:bg-rose-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div class="absolute top-1/3 right-10 w-32 h-32 bg-blue-200 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute bottom-1/3 left-1/2 w-36 h-36 bg-green-200 dark:bg-green-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <!-- 分类标签 - 更现代的设计 -->
        <div class="flex flex-wrap gap-3 mb-10 justify-center">
          <button
            @click="setActiveCategory('全部')"
            :class="[
              'px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 transform border shadow-sm',
              activeCategory === '全部'
                ? 'bg-gradient-to-r from-rose-100 to-rose-50 text-rose-600 border-rose-200 shadow-rose-100/50 scale-105 font-semibold dark:from-rose-900/30 dark:to-rose-800/30 dark:text-rose-300 dark:border-rose-800'
                : 'bg-white text-gray-600 border-gray-200 hover:scale-105 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
            ]"
          >
            全部分类
          </button>
          <button
            @click="setActiveCategory('代码')"
            :class="[
              'px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 transform border shadow-sm',
              activeCategory === '代码'
                ? 'bg-gradient-to-r from-rose-100 to-rose-50 text-rose-600 border-rose-200 shadow-rose-100/50 scale-105 font-semibold dark:from-rose-900/30 dark:to-rose-800/30 dark:text-rose-300 dark:border-rose-800'
                : 'bg-white text-gray-600 border-gray-200 hover:scale-105 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
            ]"
          >
            代码相关
          </button>
          <button
            @click="setActiveCategory('创作')"
            :class="[
              'px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 transform border shadow-sm',
              activeCategory === '创作'
                ? 'bg-gradient-to-r from-rose-100 to-rose-50 text-rose-600 border-rose-200 shadow-rose-100/50 scale-105 font-semibold dark:from-rose-900/30 dark:to-rose-800/30 dark:text-rose-300 dark:border-rose-800'
                : 'bg-white text-gray-600 border-gray-200 hover:scale-105 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
            ]"
          >
            创作辅助
          </button>
          <button
            @click="setActiveCategory('内容')"
            :class="[
              'px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 transform border shadow-sm',
              activeCategory === '内容'
                ? 'bg-gradient-to-r from-rose-100 to-rose-50 text-rose-600 border-rose-200 shadow-rose-100/50 scale-105 font-semibold dark:from-rose-900/30 dark:to-rose-800/30 dark:text-rose-300 dark:border-rose-800'
                : 'bg-white text-gray-600 border-gray-200 hover:scale-105 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
            ]"
          >
            内容处理
          </button>
        </div>

        <!-- 提示词卡片网格 - 更优美的布局 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <!-- 提示词卡片 - 全新设计 -->
          <div v-for="(example, type) in filteredExamples" :key="String(type)"
               class="group relative overflow-hidden rounded-2xl transition-all duration-500 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl dark:shadow-none dark:hover:shadow-gray-700/30 border border-gray-100/80 dark:border-gray-700/80 hover:-translate-y-1">

            <!-- 卡片顶部装饰 -->
            <div class="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500"></div>

            <!-- 闪光效果 - 模拟鼠标悬停时的光影 -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div class="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/30 dark:from-gray-900/10 dark:to-gray-800/5"></div>
              <div class="absolute -inset-px rounded-2xl border border-white/20 dark:border-gray-700/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            <!-- 卡片内容 -->
            <div class="p-6 pt-8 relative z-10">
              <div class="flex items-start space-x-4">
                <!-- 图标容器 - 更具立体感 -->
                <div class="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/20 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-500 border border-rose-100/50 dark:border-rose-800/30">
                  <svg class="w-7 h-7 text-rose-500 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>

                <!-- 内容区 - 更优雅的排版 -->
                <div class="flex-1 min-w-0">
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">{{ example.title }}</h3>
                  <p class="text-base text-gray-600 dark:text-gray-300 mb-5 line-clamp-2">{{ example.description }}</p>
                  <button @click="usePrompt(type)"
                          class="inline-flex items-center px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-gray-600 transition-all duration-300 group-hover:shadow-sm">
                    使用提示词
                    <svg class="w-4 h-4 ml-1.5 group-hover:ml-2.5 transition-all duration-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- 卡片装饰元素 -->
            <div class="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
              <!-- 底部装饰图案 -->
              <div class="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-gray-100/80 to-transparent dark:from-gray-700/20 rounded-tl-full"></div>
              <!-- 点阵装饰 -->
              <div class="absolute bottom-4 right-4 w-24 h-24 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:6px_6px] opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 弹窗组件 - 保持不变 -->
    <PromptExampleModal
      :is-open="isModalOpen"
      :title="currentPromptExample.title"
      :description="currentPromptExample.description"
      :user-prompt="currentPromptExample.userPrompt"
      :sample-output="currentPromptExample.sampleOutput"
      :analysis="currentPromptExample.analysis"
      @close="closeModal"
      @use-prompt="handleUsePrompt"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import PromptExampleModal from './PromptExampleModal.vue';
import { usePromptStore } from '../stores/prompt';

const router = useRouter();
const promptStore = usePromptStore();
const isModalOpen = ref(false);
const currentPromptExample = ref({
  title: '',
  description: '',
  userPrompt: '',
  sampleOutput: '',
  analysis: ''
});

interface PromptExample {
  title: string;
  description: string;
  userPrompt: string;
  sampleOutput: string;
  analysis: string;
  category: string;
}

type PromptExamples = Record<string, PromptExample>;

// 提示词示例数据
const promptExamples = ref<PromptExamples>({
  '代码改写': {
    title: '代码改写',
    description: '对代码进行修改，来实现纠错、注释、调优等。',
    userPrompt: '下面这段的代码的效率很低，且没有处理边界情况。请先解释这段代码的问题与解决方法，然后进行优化：\n```\ndef fib(n):\n    if n <= 2:\n        return n\n    return fib(n-1) + fib(n-2)\n```',
    sampleOutput: '这段代码存在以下问题：\n\n1. **效率问题**：使用了朴素递归实现斐波那契数列，导致大量重复计算，时间复杂度为O(2^n)。\n\n2. **边界问题**：\n   - 对于n=0应该返回0，而不是0。\n   - 对于n=2应该返回1，而不是2。\n   - 没有处理负数输入的情况。\n\n3. **缺少注释**：代码没有说明目的和参数含义。\n\n优化后的代码：\n\n```python\ndef fib(n):\n    \"\"\"\n    计算斐波那契数列的第n个数\n    使用动态规划（记忆化）避免重复计算\n    \n    参数:\n        n: 非负整数，表示需要计算的斐波那契数的位置\n        \n    返回:\n        第n个斐波那契数\n    \"\"\"\n    # 处理边界情况\n    if not isinstance(n, int) or n < 0:\n        raise ValueError("输入必须是非负整数")\n        \n    # 斐波那契数列的基本情况\n    if n == 0:\n        return 0\n    if n == 1 or n == 2:\n        return 1\n        \n    # 使用迭代方法计算，避免递归栈溢出和重复计算\n    a, b = 1, 1  # 初始化第1个和第2个斐波那契数\n    for _ in range(3, n + 1):\n        a, b = b, a + b  # 计算下一个斐波那契数\n        \n    return b\n```',
    analysis: '这个代码改写示例展示了如何优化一个低效的递归斐波那契函数。原代码使用简单递归导致指数级时间复杂度，还存在边界处理错误。优化版本采用迭代方法将时间复杂度降低到线性，正确处理了边界情况，并添加了完整注释，体现了代码改写的核心要点：提高效率、修复错误、增强可读性。',
    category: '代码'
  },
  '代码解释': {
    title: '代码解释',
    description: '对代码进行解释，来帮助理解代码内容。',
    userPrompt: '请解释以下React Hook代码的功能和实现原理：\n```jsx\nconst useDebounce = (value, delay) => {\n  const [debouncedValue, setDebouncedValue] = useState(value);\n\n  useEffect(() => {\n    const timer = setTimeout(() => setDebouncedValue(value), delay);\n    return () => clearTimeout(timer);\n  }, [value, delay]);\n\n  return debouncedValue;\n};\n```',
    sampleOutput: '这是一个自定义的React Hook，用于实现防抖功能。让我们逐步分析其工作原理：\n\n1. **功能说明**：\n   - 这个Hook接收两个参数：`value`（需要防抖的值）和`delay`（防抖延迟时间）\n   - 返回一个防抖后的值，该值会在输入值停止变化指定时间后才更新\n\n2. **实现原理**：\n   - 使用`useState`存储防抖后的值\n   - 使用`useEffect`监听输入值的变化\n   - 当输入值变化时，设置一个定时器，延迟更新防抖值\n   - 如果在延迟期间输入值再次变化，之前的定时器会被清除，重新开始计时\n\n3. **使用场景**：\n   - 搜索输入框：用户输入停止后才发起请求\n   - 表单实时验证：避免频繁验证\n   - 窗口大小调整：避免频繁计算和渲染',
    analysis: '这个示例展示了如何解释代码的功能和实现原理。解释分为三个层次：功能说明、实现原理和使用场景，让读者能够全面理解代码的作用和应用场景。解释采用了清晰的层级结构和专业术语，同时保持通俗易懂。',
    category: '代码'
  },
  '内容分类': {
    title: '内容分类',
    description: '对文本内容进行分析，并对其进行自动归类。',
    userPrompt: '请对以下用户反馈进行分类分析：\n\n1. "APP总是很卡，打开特别慢"\n2. "界面很漂亮，但是找功能太费劲了"\n3. "希望能添加暗色主题"\n4. "注册流程太复杂了"\n5. "经常莫名其妙闪退"\n6. "按钮太小了，不好点击"\n7. "希望能支持指纹登录"\n8. "界面字体太小"',
    sampleOutput: '根据用户反馈内容，可以归类为以下几个主要类别：\n\n1. 性能问题：\n   - APP启动速度慢\n   - 出现闪退问题\n\n2. UI/UX设计：\n   - 功能导航不清晰\n   - 按钮尺寸过小\n   - 字体大小不合适\n\n3. 功能需求：\n   - 暗色主题\n   - 指纹登录\n\n4. 用户流程：\n   - 注册流程复杂\n\n优先级建议：\n1. 首先解决性能问题，这直接影响用户体验\n2. 其次优化UI/UX设计问题\n3. 最后考虑新功能需求',
    analysis: '这个示例展示了如何对用户反馈进行系统性分类。通过将零散的反馈归类到不同类别，帮助产品团队更好地理解和处理用户反馈。同时提供了优先级建议，帮助团队合理安排开发计划。',
    category: '内容'
  },
  '结构化输出': {
    title: '结构化输出',
    description: '将内容转化为JSON格式，来方便后续程序处理。',
    userPrompt: '请将以下产品信息转换为JSON格式：\n\n产品名称：智能手表Pro\n价格：1299元\n颜色：黑色、银色、金色\n功能特点：\n- 心率监测\n- 睡眠分析\n- 运动追踪\n- 来电提醒\n防水等级：IP68\n续航时间：7天\n适用系统：iOS 12.0以上，Android 8.0以上',
    sampleOutput: '{\n  "productName": "智能手表Pro",\n  "price": 1299,\n  "currency": "CNY",\n  "colors": [\n    "黑色",\n    "银色",\n    "金色"\n  ],\n  "features": [\n    "心率监测",\n    "睡眠分析",\n    "运动追踪",\n    "来电提醒"\n  ],\n  "specifications": {\n    "waterResistance": "IP68",\n    "batteryLife": "7天",\n    "compatibility": {\n      "ios": "12.0以上",\n      "android": "8.0以上"\n    }\n  }\n}',
    analysis: '这个示例展示了如何将非结构化的产品信息转换为结构化的JSON格式。转换过程中注意以下几点：\n1. 合理组织数据层级\n2. 使用数组存储多个值\n3. 将相关信息分组\n4. 保持数据类型的一致性\n这样的结构化数据更易于程序处理和数据分析。',
    category: '内容'
  },
  '角色扮演（自定义人设）': {
    title: '角色扮演（自定义人设）',
    description: '自定义人设，来与用户进行角色扮演。',
    userPrompt: '请扮演一个资深前端工程师，并根据以下人设与我对话：\n\n背景：\n- 8年前端开发经验\n- 精通React、Vue等主流框架\n- 参与过多个大型项目开发\n- 热衷于技术分享和代码优化\n\n性格特点：\n- 严谨认真\n- 乐于助人\n- 善于用类比解释技术概念\n\n请以这个身份回答我的问题：\n"能否解释一下React中的虚拟DOM和实际DOM的区别？"',
    sampleOutput: '让我用一个简单的类比来解释虚拟DOM和实际DOM的区别。\n\n想象你在装修房子，有两种方式：\n\n1. 直接装修（实际DOM）：\n   - 每次改动都直接在真实房子上进行\n   - 即使是小改动也需要动用真实的工具和材料\n   - 过程耗时且成本高\n\n2. 先用3D模型规划（虚拟DOM）：\n   - 先在电脑上创建房子的3D模型\n   - 在模型上尝试各种改动，成本很低\n   - 确定最终方案后，一次性在真实房子上实施\n\n虚拟DOM就像这个3D模型：\n- 它是真实DOM的轻量级副本\n- 修改虚拟DOM的成本很低\n- React会比较虚拟DOM的变化，只更新必要的部分\n- 最后一次性更新实际DOM，提高性能\n\n这就是为什么React能够提供如此出色的性能。希望这个类比能帮助你更好地理解！',
    analysis: '这个示例展示了如何进行专业角色扮演。通过设定详细的人设背景和性格特点，使回答更加真实可信。回答中使用生动的类比，体现了人设中"善于用类比解释技术概念"的特点，同时展现了专业性和耐心。',
    category: '代码'
  },
  '诗歌创作': {
    title: '诗歌创作',
    description: '让模型根据提示词，创作诗歌。',
    userPrompt: '模仿李白的风格写一首七律.飞机',
    sampleOutput: '银翼翩翩上九霄，扶摇直上破云涛。\n长风万里送秋雁，对此可以酣高楼。\n天际茫茫如海色，日边红霞似火烧。\n俯瞰山河皆渺小，心随飞鸟共逍遥。',
    analysis: '这首作品以李白的豪放风格为基调，通过描绘飞机翱翔天际的壮丽景象，表达了乘机者俯瞰山河、心随飞鸟的逍遥情怀。诗中运用丰富的意象和生动的语言，如"银翼翩翩"、"破云涛"、"长风万里"等，展现了高空飞行的震撼与美感，体现了李白诗作中常见的超脱尘世、向往自由的精神境界。',
    category: '创作'
  },
  '代码生成': {
    title: '代码生成',
    description: '让模型生成一段完成特定功能的代码。',
    userPrompt: '请生成一个简单的React Todo List组件，包含添加、删除和标记完成的功能。要求使用函数组件和Hooks实现。',
    sampleOutput: '```jsx\nimport React, { useState } from \'react\';\n\nconst TodoList = () => {\n  const [todos, setTodos] = useState([]);\n  const [input, setInput] = useState(\'\');\n\n  const addTodo = () => {\n    if (input.trim()) {\n      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);\n      setInput(\'\');\n    }\n  };\n\n  const toggleTodo = (id) => {\n    setTodos(todos.map(todo =>\n      todo.id === id ? { ...todo, completed: !todo.completed } : todo\n    ));\n  };\n\n  const deleteTodo = (id) => {\n    setTodos(todos.filter(todo => todo.id !== id));\n  };\n\n  return (\n    <div className="p-4">\n      <div className="flex gap-2 mb-4">\n        <input\
          type="text"\
          value={input}\
          onChange={(e) => setInput(e.target.value)}\
          className="border p-2 rounded"\
          placeholder="添加新任务"\
        />\
        <button\
          onClick={addTodo}\
          className="bg-blue-500 text-white px-4 py-2 rounded"\
        >\
          添加\
        </button>\
      </div>\
      <ul className="space-y-2">\
        {todos.map(todo => (\
          <li key={todo.id} className="flex items-center gap-2">\
            <input\
              type="checkbox"\
              checked={todo.completed}\
              onChange={() => toggleTodo(todo.id)}\
            />\
            <span className={todo.completed ? \'line-through\' : \'\'}>\
              {todo.text}\
            </span>\
            <button\
              onClick={() => deleteTodo(todo.id)}\
              className="text-red-500"\
            >\
              删除\
            </button>\
          </li>\
        ))}\
      </ul>\
    </div>\
  );\
};\n\nexport default TodoList;```',
    analysis: '这个示例展示了如何生成一个完整的React组件。代码包含了：\n1. 状态管理：使用useState管理todos和输入框\n2. 核心功能：添加、删除、标记完成\n3. 样式处理：使用Tailwind CSS实现基础样式\n4. 代码组织：逻辑清晰，功能模块化\n生成的代码遵循React最佳实践，并包含了必要的类型检查和错误处理。',
    category: '代码'
  },
  '中英翻译专家': {
    title: '中英翻译专家',
    description: '中英文互译，对用户输入内容进行翻译。',
    userPrompt: '请将以下技术文档翻译成英文，保持专业术语的准确性：\n\n"React Hooks是React 16.8引入的新特性，它可以让你在不编写类组件的情况下使用状态和其他React特性。通过使用Hooks，你可以在函数组件中重用状态逻辑，而无需更改组件层次结构。"',
    sampleOutput: '"React Hooks is a new feature introduced in React 16.8 that allows you to use state and other React features without writing class components. With Hooks, you can reuse state logic in function components without changing your component hierarchy."\n\nKey terms translation:\n- Hooks -> Hooks (保持原文)\n- 状态 -> state\n- 类组件 -> class components\n- 函数组件 -> function components\n- 组件层次结构 -> component hierarchy',
    analysis: '这个翻译示例展示了如何准确翻译技术文档：\n1. 保留了专业术语的原始形式（如"Hooks"）\n2. 使用了对应的技术术语标准翻译\n3. 提供了关键术语对照表\n4. 保持了原文的技术准确性和可读性',
    category: '内容'
  },
  '文案大纲生成': {
    title: '文案大纲生成',
    description: '根据用户提供的主题，来生成文案大纲。',
    userPrompt: '请为一个新上线的在线教育平台生成一份产品介绍文案大纲，目标用户是想提升职业技能的年轻人。',
    sampleOutput: '# 产品介绍文案大纲\n\n## 1. 开篇引言\n- 当代职场痛点描述\n- 技能提升的重要性\n- 平台价值主张\n\n## 2. 产品核心优势\n### 2.1 专业课程体系\n- 行业专家授课\n- 体系化课程设计\n- 实战项目导向\n\n### 2.2 灵活学习模式\n- 随时随地学习\n- 个性化学习路径\n- 进度自主掌控\n\n### 2.3 互动学习体验\n- 实时答疑解惑\n- 学习社群支持\n- 作业点评反馈\n\n## 3. 学习效果保障\n- 阶段性测评\n- 项目实战演练\n- 就业指导服务\n\n## 4. 用户成功案例\n- 真实学员故事\n- 就业晋升数据\n- 能力提升反馈\n\n## 5. 产品权益介绍\n- 会员等级体系\n- 特权服务内容\n- 优惠活动策略\n\n## 6. 行动召唤\n- 限时优惠信息\n- 免费试听安排\n- 报名流程说明',
    analysis: '这个大纲示例展现了专业的文案结构：\n1. 符合AIDA营销模型：注意力、兴趣、欲望、行动\n2. 层次分明，逻辑清晰\n3. 突出产品核心价值\n4. 包含具体的数据支撑和案例\n5. 清晰的行动召唤设计',
    category: '内容'
  },
  '宣传标语生成': {
    title: '宣传标语生成',
    description: '让模型生成贴合商品信息的宣传标语。',
    userPrompt: '产品：一款智能降噪耳机\n特点：\n- 主动降噪\n- 40小时续航\n- AI通话降噪\n- 无线快充\n目标受众：商务人士和通勤族\n\n请生成5个吸引人的宣传标语。',
    sampleOutput: '1. "静享40小时，一路随行不打扰"\n2. "AI降噪护航，让每通电话都清晰动听"\n3. "商务出行的必备利器，地铁高铁都安静"\n4. "无线快充，续航无忧，专注工作不打断"\n5. "智能降噪，专业静音，让世界只剩下你想听的声音"',
    analysis: '这组标语的特点：\n1. 突出产品核心卖点（降噪、续航、快充）\n2. 结合目标用户场景（商务、通勤）\n3. 语言简洁有力，朗朗上口\n4. 情感共鸣（安静、专注、不打扰）\n5. 突出实际使用场景和价值',
    category: '内容'
  },
  '模型提示词生成': {
    title: '模型提示词生成',
    description: '根据用户需求，帮助生成高质量提示词。',
    userPrompt: '我需要一个能够帮助我写技术博客的提示词。要求：\n1. 文章结构清晰\n2. 包含代码示例\n3. 适合初学者阅读\n4. 有实际应用场景',
    sampleOutput: '以下是为您定制的提示词模板：\n\n"请帮我写一篇关于[技术主题]的技术博客文章。要求：\n\n1. 文章结构：\n- 简单的概念介绍（适合初学者）\n- 核心原理解释\n- 实际应用场景\n- 代码示例和讲解\n- 最佳实践建议\n\n2. 代码示例要求：\n- 提供完整的工作示例\n- 包含详细的注释\n- 展示常见使用场景\n\n3. 写作风格：\n- 使用通俗易懂的语言\n- 适当使用类比解释复杂概念\n- 添加图表辅助理解\n\n4. 实践指导：\n- 提供调试技巧\n- 说明常见陷阱和解决方案\n- 性能优化建议\n\n请确保文章对初学者友好，并包含实际工作中的应用示例。"',
    analysis: '这个提示词模板的优点：\n1. 结构完整，覆盖技术文章的关键要素\n2. 明确指定了目标受众和写作风格\n3. 强调实用性和可操作性\n4. 包含了具体的质量要求和评判标准',
    category: '内容'
  }
});

// 提示词模板数据
const promptTemplates = ref({
  '代码改写': '请帮我改写以下代码，优化性能并添加注释：\n\n```\n// 请在此粘贴您的代码\n```',
  '代码解释': '请解释以下代码的功能和实现原理：\n\n```\n// 请在此粘贴您的代码\n```',
  '代码生成': '请生成一个实现以下功能的代码：\n\n[请描述您需要实现的功能]',
  '内容分类': '请对以下文本内容进行分类分析：\n\n[请在此粘贴您的文本]',
  '结构化输出': '请将以下内容转换为JSON格式：\n\n[请在此粘贴您的内容]',
  '角色扮演（自定义人设）': '请扮演一个[角色]，并根据以下人设与我对话：\n\n[请描述角色人设]',
  '角色扮演（情景续写）': '场景：[请描述一个场景]\n\n请在这个场景下，模拟[角色]与我的对话。',
  '散文写作': '请以"[主题]"为主题，创作一篇散文。',
  '诗歌创作': '请以"[主题]"为主题，创作一首[诗歌类型]。',
  '文案大纲生成': '请为"[主题]"生成一份文案大纲，包括标题、引言、主要内容和总结部分。',
  '宣传标语生成': '产品/服务：[请描述您的产品或服务]\n目标受众：[请描述目标受众]\n\n请生成5个吸引人的宣传标语。',
  '模型提示词生成': '我需要一个能够[描述任务]的提示词。目标是[描述目标]。请帮我生成一个高质量的提示词模板。',
  '中英翻译专家': '请将以下[中文/英文]翻译成[英文/中文]：\n\n[请在此粘贴您需要翻译的内容]'
} as Record<string, string>);

// 使用特定提示词模板
function usePrompt(promptType: string) {
  if (promptExamples.value[promptType]) {
    currentPromptExample.value = promptExamples.value[promptType];
    isModalOpen.value = true;
  } else {
    // 如果没有示例，直接导航到API演示页
    router.push({
      path: '/api-demo',
      query: {
        prompt: promptTemplates.value[promptType]
      }
    });
  }
}

function closeModal() {
  isModalOpen.value = false;
}

function handleUsePrompt(prompt: string) {
  // 使用Pinia store存储提示词
  promptStore.setPromptText(prompt);
  console.log(prompt);


  // 导航到API演示页
  router.push({
    path: '/api-demo'
  });
}

const activeCategory = ref('全部');

function setActiveCategory(category: string) {
  activeCategory.value = category;
}

const filteredExamples = computed(() => {
  if (activeCategory.value === '全部') {
    return promptExamples.value;
  }

  const result: PromptExamples = {};

  Object.entries(promptExamples.value).forEach(([key, example]) => {
    if (example.category && example.category.includes(activeCategory.value)) {
      result[key] = example;
    }
  });

  return result;
});
</script>

<style scoped>
.bg-grid-gray-100 {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239BA3AF' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

/* 添加新的动画效果 */
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
