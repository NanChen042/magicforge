# 游戏开发指南

本指南详细介绍了基于DeepSeek API开发交互式文字游戏的方法，包括场景生成、角色关系管理和故事线构建。

## 游戏介绍

"最强剑魔是高三生"是一款基于AI生成的交互式文字冒险游戏，玩家扮演一位高三学生兼游戏主播，需要在学习和游戏之间寻找平衡。

### 核心特点

- **AI驱动的故事生成**：每个场景根据玩家选择动态生成
- **角色关系系统**：不同选择会影响与其他角色的关系
- **多维进度系统**：游戏成就、学习进度、社交关系三线并行
- **多样化场景类型**：从课堂学习到直播现场的丰富场景变化
- **特殊事件触发**：随机触发特殊事件增加游戏变数

## 技术实现

### 场景生成

场景生成是游戏的核心机制，DeepseekClient提供了专门的API：

```typescript
// 生成初始场景
const initialScene = await client.generateInitialScene();

// 生成后续场景
const nextScene = await client.generateScene({
  playerName: "玩家名",
  currentSceneId: 1,
  choiceText: "玩家的选择",
  currentScene: previousScene,
  previousChoices: ["历史选择1", "历史选择2"],
  storyProgress: gameProgress,
  // 可选：检查点ID用于恢复状态
  checkpointId: "checkpoint-123" 
});
```

### 场景结构

每个生成的场景包含以下结构：

```typescript
interface GameScene {
  id: number;
  image: string;             // 场景图片URL
  description: string;       // 场景描述
  dialog: string;            // 角色对话
  options: Array<{          // 玩家选项
    text: string;           // 选项文本
    next: number;           // 下一个场景ID
    hint?: string;          // 选项提示
    impact?: {              // 选项影响
      quest?: { 
        type: 'gaming' | 'study' | 'social'; 
        value: number 
      };
      relationship?: { 
        character: string; 
        value: number 
      };
      flag?: string;        // 故事标记
    };
  }>;
  isAIGenerated?: boolean;   // 是否由AI生成
  specialEvent?: string;     // 特殊事件
  context: {                 // 场景上下文
    mood: string;           // 情绪
    location: string;       // 位置
    timeOfDay: string;      // 时间
    previousEvents: string[]; // 之前事件
  };
  reasoning?: string;        // AI思维过程
  checkpointId?: string;     // 检查点ID
}
```

### 进度系统设计

游戏进度通过以下结构管理：

```typescript
interface StoryProgress {
  mainQuests: {
    gaming: number;     // 游戏成就进度 0-100
    study: number;      // 学习进度 0-100
    social: number;     // 社交进度 0-100
  };
  relationships: {
    [key: string]: Relationship;  // 角色关系
  };
  flags: Set<string>;   // 故事标记点
}

interface Relationship {
  character: string;    // 角色名称
  affinity: number;     // 好感度 -100 到 100
  events: string[];     // 相关事件列表
}
```

## 游戏流程集成

### 初始化游戏

```typescript
// 在 Vue 组件中
const gameStore = useGameStore();
const playerName = ref('');

// 开始游戏
const startGame = async () => {
  gameStore.setPlayerName(playerName.value);
  await gameStore.startNewGame();
};
```

### 处理玩家选择

```typescript
// 处理选择
const handleChoice = async (option: { text: string, next: number }) => {
  await gameStore.handleChoice(option);
};
```

### 监听API地址变化

```typescript
// 监听API地址变化
watch(() => props.apiBaseUrl, (newUrl) => {
  if (newUrl) {
    // 更新API配置
    updateApiConfig({ baseUrl: newUrl });
    console.log('游戏组件: API地址已更新为', newUrl);
  }
}, { immediate: true });
```

## 检查点系统

检查点系统允许保存和恢复游戏状态，便于分支探索和进度管理：

```typescript
// 状态保存
const checkpointId = CheckpointService.create({
  sceneHistory: sceneHistory,
  storyProgress: currentProgress,
  currentScene: currentScene,
  lastChoices: previousChoices
});

// 状态恢复
const checkpoint = CheckpointService.get(checkpointId);
if (checkpoint) {
  sceneHistory = checkpoint.sceneHistory;
  currentProgress = checkpoint.storyProgress;
  currentScene = checkpoint.currentScene;
  previousChoices = checkpoint.lastChoices;
}
```

## 场景类型和特殊事件

### 场景类型

游戏支持多种场景类型，每种类型有不同的描述风格和可用选项：

- 课堂学习
- 游戏训练
- 排位赛
- 直播现场
- 考试现场
- 社交互动
- 家庭生活
- 社团活动
- 比赛解说
- 粉丝互动
- 感情困惑
- 人生思考

### 特殊事件

特殊事件会随机触发，增加游戏变数：

- 炸麦警告（情绪激动导致麦克风爆音）
- 躺赢时刻（队友carry）
- 连招练习（剑魔技能连招）
- 偶遇李雪（暗恋对象）
- 王老师突袭（被抓打游戏）
- 高考倒计时（压力事件）
- 粉丝认出（身份暴露）
- 网络卡顿（比赛掉线）
- 家长谈话（成绩下滑）
- 赛事解说（受邀解说）

## 提示词工程

游戏的核心是合理设计提示词，以下是场景生成的示例提示词结构：

```
作为一个AI助手，你需要基于以下信息生成游戏的下一个场景。

思考步骤：
1. 分析当前场景和玩家选择
2. 考虑角色关系发展
3. 结合主线任务进度
4. 选择合适的场景发展方向
5. 设计有意义的选项
6. 整合特殊事件（如果有）

角色背景：
- 姓名：小明（游戏ID：最强剑魔）
- 身份：高三学生，知名游戏主播
- 游戏特长：英雄联盟剑魔玩家

当前进度：
游戏成就: 50/100
学习进度: 30/100
社交关系: 40/100

重要关系：
李雪（好感度：20）
王老师（好感度：-10）

历史场景：
[场景描述和对话记录]

当前情况：
场景类型: 课堂学习
特殊事件: 王老师突袭
玩家选择: 继续打游戏

请按照以下格式输出JSON：
{
  "description": "场景描述",
  "dialog": "小明的对话",
  "options": [...],
  "specialEvent": "特殊事件描述",
  "context": {...},
  "reasoning": "思维过程说明"
}
```

## 游戏平衡性设计

为了保持游戏的趣味性和挑战性，需要平衡以下几个方面：

1. **进度平衡**：确保三条主线任务进度不会过快或过慢
2. **选项设计**：每个选项都有利有弊，避免明显的最优解
3. **角色关系**：角色关系变化应该合理且有意义
4. **特殊事件**：特殊事件应该增加变数但不破坏游戏体验
5. **难度曲线**：游戏难度应随进度适当增加

## 相关API

- `client.generateInitialScene()`: 生成游戏初始场景
- `client.generateScene()`: 生成后续场景
- `CheckpointService.create()`: 创建检查点
- `CheckpointService.get()`: 获取检查点
- `gameStore.startNewGame()`: 开始新游戏
- `gameStore.handleChoice()`: 处理玩家选择
- `gameStore.resetGame()`: 重置游戏

## 调试技巧

1. 使用`scene.reasoning`字段查看AI的思考过程
2. 在困难情况下调整`temperature`参数增加或减少随机性
3. 通过检查点系统测试不同分支的游戏发展
4. 观察`context`字段了解场景连贯性

---

© 2023 Deepseek API 客户端 | 游戏开发指南
