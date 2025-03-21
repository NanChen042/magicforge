# API 参考文档

本文档详细描述了Deepseek API客户端提供的所有接口、参数和返回值。

## DeepseekClient 类

DeepseekClient是与Deepseek API交互的主要接口，提供聊天完成和场景生成功能。

### 构造函数

```typescript
constructor(options: {
  apiKey: string;
  baseURL: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
})
```

**参数**:
- `apiKey`: Deepseek API密钥
- `baseURL`: API基础URL，应包含`/chat/completions`路径
- `model`: 使用的模型名称，默认为`'deepseek-r1'`
- `temperature`: 温度参数，控制随机性，默认为`0.8`
- `maxTokens`: 最大生成令牌数，默认为`2000`

### 聊天完成

#### chatCompletion

```typescript
async chatCompletion(params: {
  messages: Array<{role: string; content: string}>;
  stream?: boolean;
}): Promise<any>
```

**参数**:
- `messages`: 聊天消息数组，每条消息包含`role`和`content`
- `stream`: 是否使用流式响应，默认为`false`

**返回值**:
- 非流式模式: 返回完整的API响应对象
- 流式模式: 返回一个`AsyncIterable`对象，可以用`for await`遍历获取每个数据块

**示例**:
```typescript
// 非流式请求
const response = await client.chatCompletion({
  messages: [
    { role: "user", content: "你好，请介绍一下自己" }
  ]
});

// 流式请求
const stream = await client.chatCompletion({
  messages: [
    { role: "user", content: "你好，请介绍一下自己" }
  ],
  stream: true
});

for await (const chunk of stream) {
  console.log(chunk.choices[0].delta.content);
}
```

#### OpenAI兼容接口

为了兼容OpenAI风格的API调用，DeepseekClient提供了以下两种调用方式：

##### completions.create

```typescript
get completions() {
  return {
    create: (params) => this.chatCompletion(params)
  };
}
```

**示例**:
```typescript
const response = await client.completions.create({
  messages: [
    { role: "user", content: "你好" }
  ]
});
```

##### chat.completions.create

```typescript
get chat() {
  return {
    completions: {
      create: (params) => this.chatCompletion(params)
    }
  };
}
```

**示例**:
```typescript
const response = await client.chat.completions.create({
  messages: [
    { role: "user", content: "你好" }
  ]
});
```

### 场景生成

#### generateInitialScene

生成游戏的初始场景。

```typescript
async generateInitialScene(): Promise<GameScene>
```

**返回值**:
- 返回一个`GameScene`对象，包含初始场景的所有信息

**示例**:
```typescript
const initialScene = await client.generateInitialScene();
```

#### generateScene

根据当前状态生成新的游戏场景。

```typescript
async generateScene(params: {
  playerName: string;
  currentSceneId: number;
  choiceText: string;
  currentScene?: GameScene;
  previousChoices?: string[];
  storyProgress: StoryProgress;
  checkpointId?: string;
  stream?: boolean;
}): Promise<GameScene | AsyncIterable<any>>
```

**参数**:
- `playerName`: 玩家名称
- `currentSceneId`: 当前场景ID
- `choiceText`: 玩家选择的文本
- `currentScene`: (可选) 当前场景对象
- `previousChoices`: (可选) 之前选择的历史记录
- `storyProgress`: 故事进度对象
- `checkpointId`: (可选) 检查点ID，用于恢复状态
- `stream`: (可选) 是否使用流式响应

**返回值**:
- 非流式模式: 返回`GameScene`对象
- 流式模式: 返回一个`AsyncIterable`对象

**示例**:
```typescript
const scene = await client.generateScene({
  playerName: "玩家名",
  currentSceneId: 1,
  choiceText: "继续探索",
  storyProgress: {
    mainQuests: { gaming: 50, study: 30, social: 40 },
    relationships: { /* ... */ },
    flags: new Set<string>()
  }
});
```

## useDeepseekApi Hook

`useDeepseekApi`是一个Vue Composition API Hook，提供状态管理和API交互功能。

### 基本用法

```typescript
const {
  apiKey,
  apiUrl,
  isProcessing,
  error,
  streamProgress,
  conversationHistory,
  reasoningContent,
  sendChatMessage,
  streamChatMessage,
  clearHistory
} = useDeepseekApi();
```

### 返回值

- `apiKey`: API密钥，可响应式更新
- `apiUrl`: API地址，可响应式更新
- `isProcessing`: 是否正在处理请求
- `error`: 错误信息
- `streamProgress`: 流式请求进度（0-100）
- `conversationHistory`: 对话历史记录
- `reasoningContent`: 思维链内容

### 方法

#### sendChatMessage

发送非流式聊天消息。

```typescript
const sendChatMessage = async (
  message: string,
  options?: {
    temperature?: number;
    maxTokens?: number;
    model?: string;
    systemPrompt?: string;
  }
) => Promise<{
  content: string;
  reasoning: string;
} | null>
```

**参数**:
- `message`: 用户消息
- `options`: (可选) 请求选项
  - `temperature`: 温度参数
  - `maxTokens`: 最大令牌数
  - `model`: 模型名称
  - `systemPrompt`: 系统提示

**返回值**:
- 成功时返回包含`content`和`reasoning`的对象
- 失败时返回`null`

**示例**:
```typescript
const result = await sendChatMessage(
  "你好，请介绍一下自己",
  {
    temperature: 0.7,
    systemPrompt: "你是一个友好的助手"
  }
);
```

#### streamChatMessage

发送流式聊天消息。

```typescript
const streamChatMessage = async (
  message: string,
  callbacks: {
    onContent?: (content: string) => void;
    onReasoning?: (reasoning: string) => void;
    onComplete?: () => void;
    onError?: (error: any) => void;
    onProgress?: (progress: number) => void;
  },
  options?: {
    temperature?: number;
    maxTokens?: number;
    model?: string;
    systemPrompt?: string;
  }
) => Promise<void>
```

**参数**:
- `message`: 用户消息
- `callbacks`: 回调函数对象
  - `onContent`: 接收内容的回调
  - `onReasoning`: 接收思维链的回调
  - `onComplete`: 完成时的回调
  - `onError`: 错误处理回调
  - `onProgress`: 进度更新回调
- `options`: (可选) 请求选项，同`sendChatMessage`

**示例**:
```typescript
await streamChatMessage(
  "讲个故事",
  {
    onContent: (content) => console.log("内容:", content),
    onReasoning: (reasoning) => console.log("思考:", reasoning),
    onComplete: () => console.log("完成")
  },
  { temperature: 0.8 }
);
```

#### clearHistory

清空对话历史和思维链内容。

```typescript
const clearHistory = () => void
```

**示例**:
```typescript
clearHistory();
```

#### stopGeneration

终止当前正在进行的AI文本生成。

```typescript
const stopGeneration = () => void
```

**说明**:
此方法会立即中断正在进行的流式文本生成请求，并标记最后一条消息为"手动停止"状态。

**使用场景**:
- 当AI生成的回答过长时
- 当生成内容不符合预期需要重新提问时
- 当用户不再需要当前的回答时

**示例**:
```typescript
// 在UI中添加停止按钮
<button v-if="isProcessing" @click="stopGeneration" class="stop-btn">
  停止生成
</button>

// 检查消息是否被手动停止
<div v-if="isLastMessageStopped && index === lastIndex" class="stopped-indicator">
  回答已被手动停止
</div>
```

## CheckpointService

`CheckpointService`提供游戏状态的保存和恢复功能。

### create

创建一个新的检查点。

```typescript
static create(checkpoint: {
  sceneHistory: Array<{
    type: string;
    description: string;
    dialog: string;
  }>;
  storyProgress: StoryProgress;
  currentScene: GameScene;
  lastChoices: string[];
}): string
```

**参数**:
- `checkpoint`: 检查点数据对象
  - `sceneHistory`: 场景历史记录
  - `storyProgress`: 故事进度
  - `currentScene`: 当前场景
  - `lastChoices`: 最近的选择历史

**返回值**:
- 返回检查点ID字符串

**示例**:
```typescript
const checkpointId = CheckpointService.create({
  sceneHistory: [ /* ... */ ],
  storyProgress: { /* ... */ },
  currentScene: currentScene,
  lastChoices: ["选择1", "选择2"]
});
```

### get

获取一个检查点。

```typescript
static get(id: string): {
  sceneHistory: Array<{
    type: string;
    description: string;
    dialog: string;
  }>;
  storyProgress: StoryProgress;
  currentScene: GameScene;
  lastChoices: string[];
} | null
```

**参数**:
- `id`: 检查点ID

**返回值**:
- 成功时返回检查点数据对象
- 失败时返回`null`

**示例**:
```typescript
const checkpoint = CheckpointService.get("checkpoint-123");
if (checkpoint) {
  // 恢复状态
}
```

## 数据类型

### GameScene

```typescript
interface GameScene {
  id: number;
  image: string;
  description: string;
  dialog: string;
  options: Array<{
    text: string;
    next: number;
    hint?: string;
    impact?: {
      quest?: { type: 'gaming' | 'study' | 'social'; value: number };
      relationship?: { character: string; value: number };
      flag?: string;
    };
  }>;
  isAIGenerated?: boolean;
  specialEvent?: string;
  context: {
    mood: string;
    location: string;
    timeOfDay: string;
    previousEvents: string[];
  };
  reasoning?: string;
  checkpointId?: string;
}
```

### StoryProgress

```typescript
interface StoryProgress {
  mainQuests: {
    gaming: number;     // 游戏成就进度 0-100
    study: number;      // 学习进度 0-100
    social: number;     // 社交进度 0-100
  };
  relationships: {
    [key: string]: Relationship;
  };
  flags: Set<string>;   // 故事标记点
}
```

### Relationship

```typescript
interface Relationship {
  character: string;
  affinity: number;  // -100 到 100
  events: string[];
}
```

### GameLog

```typescript
interface GameLog {
  sceneId: number;
  choiceText: string;
  timestamp: string;
}
```

## 错误处理

所有API调用都应该使用try-catch处理可能的错误：

```typescript
try {
  const result = await client.chatCompletion({
    messages: [{ role: "user", content: "Hello" }]
  });
} catch (error) {
  console.error("API调用失败:", error);
  // 处理错误...
}
```

常见错误类型：
- 网络连接错误
- API密钥无效
- 请求超时
- 请求格式错误
- 服务器错误

---

© 2023 Deepseek API 客户端 | API参考文档 
