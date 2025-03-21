# Deepseek API 使用说明

## 最新更新

### 添加文本生成终止功能
- **功能描述**：添加了在AI生成回答过程中随时终止生成的功能
- **使用方法**：在AI正在输出内容时，界面将显示"停止生成"按钮，点击即可立即终止
- **视觉标识**：被手动终止的消息会显示明显的"回答已被手动停止"标识
- **技术实现**：使用AbortController API实现请求中断，保证资源释放
- **应用场景**：适用于输出内容过长或不符合预期时，无需等待完成即可终止

```javascript
// 终止生成功能的实现
const stopGeneration = () => {
  if (isProcessing.value) {
    isProcessing.value = false;
    isLastMessageStopped.value = true; // 标记消息被手动终止
    
    if (abortController.value) {
      abortController.value.abort(); // 中断网络请求
      abortController.value = null;
    }
    
    streamProgress.value = 100;
    isThinking.value = false;
  }
};
```

### 修复数据发送重复问题
- **消息发送优化**：修复了每次发送消息时会重复发送数据的问题
- **原因分析**：之前的实现中，消息会在两处添加到对话历史，导致重复
- **优化方案**：统一由API钩子内部管理消息添加，确保每条消息只被添加一次
- **性能提升**：减少了不必要的网络请求，提高了响应速度和资源利用率

### 防止重复点击发送
- **问题描述**：在发送消息过程中，如果用户多次点击发送按钮，会导致重复发送相同消息
- **解决方案**：添加发送状态锁定机制，在消息处理完成前禁止再次发送
- **实现细节**：
  ```javascript
  // 添加发送状态标志
  const isSending = ref(false);
  
  // 防止重复发送
  async function sendMessage() {
    // 如果已经在发送过程中，直接返回
    if (isSending.value) {
      console.log("已经在发送过程中，忽略此次点击");
      return;
    }
    
    // 设置发送状态为true
    isSending.value = true;
    
    // ... 消息处理逻辑 ...
    
    // 完成后重置状态
    isSending.value = false;
  }
  ```
- **额外改进**：移除了默认的输入内容，避免页面加载时自动填充可能导致的意外提交

### 示例问题功能优化
- **原有问题**：点击示例问题按钮会直接更改输入框内容，可能导致与发送操作冲突
- **优化方案**：引入专门的示例问题设置函数，将设置输入内容与发送操作分离
- **用户体验提升**：设置示例问题后自动聚焦到输入框，引导用户手动发送，避免意外触发
- **实现代码**：
  ```javascript
  function setExampleQuestion(question) {
    userInput.value = question;
    // 将焦点设置到输入框，供用户确认后手动发送
    const inputElement = document.getElementById('message-input');
    if (inputElement) {
      inputElement.focus();
    }
  }
  ```

## 聊天界面更新

我们对聊天界面进行了全面优化，带来更流畅的用户体验：

### 优化的消息显示流程

- **即时响应**：消息发送后立即显示在对话内容区域
- **实时生成**：文本生成过程中实时显示，无需等待完整回复
- **平滑滚动**：优化的滚动机制确保长消息也能正确显示
- **思维链查看**：可随时切换到思维过程标签页，查看AI的推理过程

### 增强的思考状态显示

- **双重思考提示**：同时在页面顶部和对话气泡中显示AI思考状态
- **实时反馈**：通过动画效果（加载指示器、脉冲动画）提供视觉反馈
- **状态集成**：思考状态直接整合到消息流中，提供更自然的交互体验
- **平滑过渡**：思考完成后自动切换到内容显示，无需用户干预

### 智能滚动机制

- **防抖滚动实现**：优化的滚动逻辑，避免频繁触发导致的卡顿问题
- **自适应滚动策略**：根据内容位置智能判断是否需要滚动
- **平滑过渡效果**：先跳转到接近底部位置，再平滑滚动到最新内容
- **智能底部检测**：使用更大的检测区域判断是否在底部，避免微小滚动触发自动滚动的关闭

#### 防抖滚动功能实现

```js
// 防抖函数工具
function debounce(fn, delay = 300) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}

// 防抖处理的滚动到底部函数
const debouncedScrollToBottom = debounce((forceScroll = false) => {
  const container = activeTab.value === 'output' ? chatContainer.value : thinkingContainer.value;
  if (!container) return;
  
  // 如果强制滚动或者应该自动滚动，则执行滚动
  if (forceScroll || shouldAutoScroll.value) {
    // 添加平滑滚动效果
    container.style.scrollBehavior = 'smooth';
    
    // 计算是否已经接近底部
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 150;
    
    // 如果不在底部附近，先跳转到接近底部的位置，再平滑滚动到底部
    if (!isNearBottom) {
      container.style.scrollBehavior = 'auto';
      container.scrollTop = container.scrollHeight - container.clientHeight - 100;
      
      // 短暂延迟后平滑滚动到底部
      setTimeout(() => {
        container.style.scrollBehavior = 'smooth';
        container.scrollTop = container.scrollHeight;
      }, 10);
    } else {
      // 已经在底部附近，直接平滑滚动
      container.scrollTop = container.scrollHeight;
    }
  }
}, 100);
```

### 思考状态实现示例

```js
<!-- 对话消息中的思考状态 -->
<div v-if="isThinking && item.role === 'assistant' && index === conversationHistory.length - 1" 
     class="flex flex-col space-y-2 mb-2">
  <div class="flex items-center space-x-2 text-sm text-blue-600 font-medium">
    <svg class="h-4 w-4 animate-spin" ... />
    <span>正在思考...</span>
  </div>
  <div class="bg-blue-50 border border-blue-100 rounded-lg p-3 ...">
    <div class="flex items-center space-x-1.5 mb-2">
      <!-- 动画效果的加载指示器 -->
      <div class="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
      <div class="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style="animation-delay: 300ms"></div>
      <div class="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style="animation-delay: 600ms"></div>
    </div>
    <p class="text-xs">AI正在分析您的问题，并构建解答思路，请稍候...</p>
  </div>
</div>
```

### 技术实现细节

```js
// 发送消息时立即切换到对话内容标签页
activeTab.value = "output";

// 增强的滚动机制确保内容可见
function scrollToBottom() {
  const container = activeTab.value === 'output' ? chatContainer.value : thinkingContainer.value;
  if (container) {
    // 平滑滚动效果
    container.style.scrollBehavior = 'smooth';
    container.scrollTop = container.scrollHeight;
    
    // 多层滚动保障
    requestAnimationFrame(() => {
      container.scrollTop = container.scrollHeight;
    });
    
    setTimeout(() => { /* 再次尝试滚动 */ }, 50);
    setTimeout(() => { /* 最终保障滚动 */ }, 150);
  }
}
```

## API集成说明

### DeepseekClient 使用方法

DeepseekClient支持两种API风格：

1. **OpenAI兼容格式**:

```javascript
import DeepseekClient from './services/DeepseekClient';

// 创建客户端
const client = new DeepseekClient({
  apiKey: 'YOUR_API_KEY',
  baseURL: 'YOUR_API_ENDPOINT',
  model: 'deepseek-r1'
});

// 创建聊天完成请求
const stream = await client.chat.completions.create({
  messages: [{ role: 'user', content: '你好' }],
  stream: true,
  temperature: 0.7,
  max_tokens: 2000
});

// 处理流式响应
for await (const chunk of stream) {
  // 处理思维链内容
  const reasoning = chunk.choices?.[0]?.delta?.reasoning_content;
  if (reasoning) console.log('思考:', reasoning);

  // 处理生成内容
  const content = chunk.choices?.[0]?.delta?.content;
  if (content) console.log('回答:', content);
}
```

2. **适配器风格**:

```javascript
import ai from './services/DeepseekAdapter';

// 创建模型
const aiModel = ai.createModel("deepseek", {
  apiKey: 'YOUR_API_KEY',
  baseURL: 'YOUR_API_ENDPOINT'
});

// 流式文本生成
const res = await aiModel.streamText({
  model: "deepseek-r1",
  messages: [{ role: "user", content: "你好" }],
  temperature: 0.7,
  max_tokens: 2000
});

// 处理流式响应
for await (const data of res.dataStream) {
  // 思维链内容
  const think = (data?.choices?.[0]?.delta)?.reasoning_content;
  if (think) console.log('思考:', think);

  // 生成文本内容
  const text = (data?.choices?.[0]?.delta)?.content;
  if (text) console.log('回答:', text);
}
```

## 常见问题

### 1. 如何停止AI生成过程？

在AI正在生成回答时，发送按钮会变为"停止生成"按钮。点击该按钮可以立即中断生成过程，已生成的部分内容将保留并标记为"回答已被手动停止"。这在生成内容冗长或不符合预期时特别有用。

### 2. 如何切换查看思维过程？

您可以在消息发送后随时点击"思维过程"标签页，查看AI的推理分析。思维内容会随着生成实时更新。

### 3. API密钥配置问题

请确保您提供了正确的API密钥。密钥配置后会保存在应用中，无需每次都重新输入。

### 4. 消息不自动滚动？

如果遇到消息不自动滚动的情况，可能是您手动滚动过消息区域。重新点击消息输入框或发送新消息后，自动滚动功能会重新激活。 
