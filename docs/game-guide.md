# 游戏开发指南

本指南详细介绍了基于大模型开发交互式文字游戏的方法，包括场景生成、角色关系管理和故事线构建。

## 游戏介绍

"最强剑魔是高三生"是一款基于AI生成的交互式文字冒险游戏，玩家扮演一位高三学生兼游戏主播，需要在学习和游戏之间寻找平衡。

### 核心特点

- **AI驱动的故事生成**：每个场景根据玩家选择动态生成
- **角色关系系统**：不同选择会影响与其他角色的关系
- **多维进度系统**：游戏成就、学习进度、社交关系、神秘能力四线并行
- **多样化场景类型**：从课堂学习到直播现场的丰富场景变化
- **特殊事件触发**：随机触发特殊事件增加游戏变数
- **游戏目标达成系统**：任一进度达到100%时游戏结束，提供成就反馈
- **现代化UI界面**：优化的视觉设计和动画效果，提升游戏体验
- **实时游戏手册**：详细记录游戏进度和选择分析

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
        type: 'gaming' | 'study' | 'social' | 'other'; 
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
    other: number;      // 神秘能力进度 0-100
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

### 游戏结束机制

当玩家的任一进度指标（游戏成就、学习进度、社交关系、神秘能力）达到100%时，游戏将自动结束并显示相应的成就信息：

```typescript
// 游戏结束状态管理
const showGameOver = ref(false);
const gameOverTitle = ref('');
const gameOverMessage = ref('');
const gameOverType = ref('');

// 检查游戏进度是否达到结束条件
const checkGameProgress = () => {
  const { gaming, study, social, other } = progress.value.mainQuests;
  
  if (gaming >= 100) {
    showGameOver.value = true;
    gameOverTitle.value = '游戏达人';
    gameOverMessage.value = '成为了传说中的电竞选手！';
    gameOverType.value = 'gaming';
    return true;
  }
  
  if (study >= 100) {
    showGameOver.value = true;
    gameOverTitle.value = '学霸养成';
    gameOverMessage.value = '成为了学院最年轻的教授！';
    gameOverType.value = 'study';
    return true;
  }
  
  if (social >= 100) {
    showGameOver.value = true;
    gameOverTitle.value = '社交达人';
    gameOverMessage.value = '成为了人际关系网络的中心，拥有无数忠实的朋友！';
    gameOverType.value = 'social';
    return true;
  }

  if (other >= 100) {
    showGameOver.value = true;
    gameOverTitle.value = '神秘技能';
    gameOverMessage.value = '掌握了一种无法言明的神秘能力！似乎命运的齿轮在你手中转动！';
    gameOverType.value = 'other';
    return true;
  }
  
  return false;
};

// 在处理选项影响时调用
const processImpact = (impact) => {
  if (impact.quest) {
    const { type, value } = impact.quest;
    progress.value.mainQuests[type] = Math.min(100, progress.value.mainQuests[type] + value);
  }
  
  if (impact.relationship) {
    // 处理关系变化
  }
  
  // 检查游戏是否结束
  checkGameProgress();
};
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

## UI设计与优化

游戏界面采用现代化设计风格，突出视觉吸引力和用户体验：

### 场景描述区域

场景描述区域使用渐变背景和动态效果，增强沉浸感：

```html
<div class="relative p-6 rounded-2xl overflow-hidden group">
  <!-- 渐变背景 -->
  <div class="absolute inset-0 bg-gradient-to-r from-slate-700/90 to-blue-700/90 rounded-2xl"></div>
  
  <!-- 装饰元素 -->
  <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400"></div>
  <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-blue-400"></div>
  
  <!-- 背景装饰圆 -->
  <div class="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/30 rounded-full blur-xl group-hover:bg-blue-400/40 transition-all duration-700"></div>
  <div class="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/30 rounded-full blur-xl group-hover:bg-purple-400/40 transition-all duration-700"></div>
  
  <!-- 标题区域 -->
  <div class="relative flex items-center mb-4">
    <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </div>
    <div class="ml-3">
      <h3 class="text-xl font-bold bg-gradient-to-r from-white to-blue-100 text-transparent bg-clip-text">当前场景</h3>
      <p class="text-xs text-blue-200">{{ currentScene?.context?.location || '未知位置' }}</p>
    </div>
  </div>
  
  <!-- 场景描述内容 -->
  <div class="relative bg-white/10 backdrop-blur-sm p-4 rounded-xl text-white shadow-lg">
    <p class="whitespace-pre-line">{{ currentScene?.description }}</p>
  </div>
</div>
```

### 对话内容区域

对话内容区域同样采用渐变设计，并添加动画效果：

```html
<div class="relative p-6 rounded-2xl overflow-hidden group">
  <!-- 渐变背景 -->
  <div class="absolute inset-0 bg-gradient-to-r from-purple-700/90 to-blue-700/90 rounded-2xl"></div>
  
  <!-- 装饰元素 -->
  <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-blue-400"></div>
  <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400"></div>
  
  <!-- 背景装饰圆 -->
  <div class="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/30 rounded-full blur-xl group-hover:bg-purple-400/40 transition-all duration-700"></div>
  <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/30 rounded-full blur-xl group-hover:bg-blue-400/40 transition-all duration-700"></div>
  
  <!-- 标题区域 -->
  <div class="relative flex items-center mb-4">
    <div class="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white shadow-lg">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    </div>
    <div class="ml-3">
      <h3 class="text-xl font-bold bg-gradient-to-r from-white to-purple-100 text-transparent bg-clip-text">对话内容</h3>
      <p class="text-xs text-purple-200">当前对话</p>
    </div>
  </div>
  
  <!-- 对话内容 -->
  <div class="relative bg-white/10 backdrop-blur-sm p-4 rounded-xl text-white shadow-lg">
    <p class="whitespace-pre-line">{{ currentScene?.dialog }}</p>
  </div>
  
  <!-- 装饰元素 -->
  <div class="absolute -bottom-2 -right-2 w-12 h-12 text-blue-200/30 transform rotate-12 group-hover:rotate-45 transition-all duration-700">
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.486 2 2 6.486 2 12v7a2 2 0 002 2h1a1 1 0 001-1v-8a8 8 0 0116 0v8a1 1 0 001 1h1a2 2 0 002-2v-7c0-5.514-4.486-10-10-10z"></path>
    </svg>
  </div>
</div>
```

### 游戏结束模态框

当游戏结束时，显示一个精美的结束界面：

```html
<!-- 游戏结束模态框 -->
<div v-if="showGameOver" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
  <div class="bg-gradient-to-r from-blue-800 to-purple-800 p-8 rounded-2xl max-w-md w-full text-center relative overflow-hidden shadow-2xl">
    <!-- 装饰元素 -->
    <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-purple-400"></div>
    <div class="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-xl"></div>
    <div class="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-xl"></div>
    
    <!-- 成就图标 -->
    <div class="w-24 h-24 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6 flex items-center justify-center shadow-xl">
      <svg v-if="gameOverType === 'gaming'" class="w-14 h-14 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 12h4v8H6zm8 0h4v8h-4zm-4-4h4v12h-4zm8-2V2M5 10V6" />
      </svg>
      <svg v-else-if="gameOverType === 'study'" class="w-14 h-14 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 3L2 9l10 6 10-6-10-6zM2 9v6m8 3v6m4-6v6m8-12v6" />
      </svg>
      <svg v-else-if="gameOverType === 'social'" class="w-14 h-14 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="7" r="4" />
        <path d="M5 21v-2a7 7 0 0114 0v2" />
      </svg>
    </div>
    
    <!-- 成就标题 -->
    <h2 class="text-3xl font-bold text-white mb-2">{{ gameOverTitle }}</h2>
    
    <!-- 成就描述 -->
    <p class="text-blue-100 mb-8">{{ gameOverMessage }}</p>
    
    <!-- 按钮 -->
    <button @click="returnToHomepage" class="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-bold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-xl">
      返回首页
    </button>
    
    <!-- 闪烁粒子效果 -->
    <div v-for="n in 20" :key="n" class="absolute w-1 h-1 bg-white rounded-full animate-ping" :style="{
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${1 + Math.random() * 3}s`
    }"></div>
  </div>
</div>
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
2. **选择平衡**：每个选择都应该有合理的代价和收益
3. **关系平衡**：角色关系不应该太容易提升或降低
4. **特殊事件平衡**：特殊事件应该为故事增添变数，而不是打乱游戏平衡
5. **难度曲线**：游戏难度应该随着进度逐渐提高，但不至于太过陡峭

## 结论

通过以上指南，开发者可以基于DeepSeek API构建出具有高度交互性和沉浸感的文字冒险游戏。合理设计场景生成、进度系统和UI界面，将带给玩家身临其境的游戏体验。

© 2025 Deepseek API 客户端 | 游戏开发指南

## 选项影响智能识别系统

游戏根据玩家选择的文本内容自动识别影响类型，通过关键词匹配决定提升哪种能力：

```typescript
// 关键词系统 - 优化后的关键词列表
const gamingKeywords = ['游戏', '剑魔', '技能', '排位', '连招', '对线', '比赛', '操作', '打野', 'MOBA', '直播', '玩家']; // 游戏相关
const studyKeywords = ['学习', '考试', '上课', '听讲', '作业', '专心', '知识', '复习', '笔记', '题目', '课本', '老师', '教授', '课堂']; // 学习相关 
const socialKeywords = ['约会', '聊天', '派对', '朋友圈', '社团', '人际关系', '交往', '互动', '沟通']; // 社交相关，避免过于通用的词
const otherKeywords = ['神秘', '命运', '思考', '冥想', '灵感', '直觉', '预感', '第六感', '超能力', '未知']; // 神秘能力相关

// 增强型关键词匹配逻辑
const handleChoice = (option) => {
  // 如果选项已有预设影响，直接使用
  if (option.impact && option.impact.quest) {
    processImpact(option.impact);
    return;
  }
  
  // 否则通过文本分析决定影响类型
  const text = option.text.toLowerCase();
  
  // 记录匹配到的关键词，用于游戏手册显示
  const matchedKeywords = {
    gaming: [],
    study: [],
    social: [],
    other: []
  };
  
  // 计算各类别匹配关键词数量
  const scores = {
    gaming: 0,
    study: 0,
    social: 0,
    other: 0
  };
  
  // 检查游戏关键词
  gamingKeywords.forEach(keyword => {
    if (text.includes(keyword)) {
      scores.gaming++;
      matchedKeywords.gaming.push(keyword);
    }
  });
  
  // 检查学习关键词
  studyKeywords.forEach(keyword => {
    if (text.includes(keyword)) {
      scores.study++;
      matchedKeywords.study.push(keyword);
    }
  });
  
  // 检查社交关键词 - 降低社交关键词的权重，避免过度匹配
  socialKeywords.forEach(keyword => {
    if (text.includes(keyword)) {
      scores.social++;
      matchedKeywords.social.push(keyword);
    }
  });
  
  // 检查其他关键词
  otherKeywords.forEach(keyword => {
    if (text.includes(keyword)) {
      scores.other++;
      matchedKeywords.other.push(keyword);
    }
  });
  
  // 特殊处理：检查选项提示(hint)中的关键词
  if (option.hint) {
    const hintText = option.hint.toLowerCase();
    
    gamingKeywords.forEach(keyword => {
      if (hintText.includes(keyword)) {
        scores.gaming += 0.5;
        if (!matchedKeywords.gaming.includes(keyword)) {
          matchedKeywords.gaming.push(keyword + "(hint)");
        }
      }
    });
    
    studyKeywords.forEach(keyword => {
      if (hintText.includes(keyword)) {
        scores.study += 0.5;
        if (!matchedKeywords.study.includes(keyword)) {
          matchedKeywords.study.push(keyword + "(hint)");
        }
      }
    });
    
    // 降低社交关键词的权重
    socialKeywords.forEach(keyword => {
      if (hintText.includes(keyword)) {
        scores.social += 0.5;
        if (!matchedKeywords.social.includes(keyword)) {
          matchedKeywords.social.push(keyword + "(hint)");
        }
      }
    });
    
    otherKeywords.forEach(keyword => {
      if (hintText.includes(keyword)) {
        scores.other += 0.5;
        if (!matchedKeywords.other.includes(keyword)) {
          matchedKeywords.other.push(keyword + "(hint)");
        }
      }
    });
  }
  
  // 智能处理无关键词匹配的情况
  const hasMatches = Object.values(scores).some(score => score > 0);
  
  if (!hasMatches) {
    // 特殊检测：如果选项文本中包含"学习"，优先识别为学习类型
    if (text.includes('学习')) {
      scores.study = 1;
      matchedKeywords.study.push('学习');
    }
    // 特殊检测：如果选项文本中包含"继续"和关联到学习的词，识别为学习类型
    else if (text.includes('继续') && (text.includes('课') || text.includes('读') || text.includes('写') || text.includes('复习'))) {
      scores.study = 1;
      matchedKeywords.study.push('继续学习');
    }
    // 特殊情况：当前能力值最低的类型得到提升
    else {
      // 检查当前进度，选择最低的能力值提升
      const currentProgress = getGameProgress();
      const types = ['gaming', 'study', 'social', 'other'];
      let lowestType = 'other';
      let lowestValue = currentProgress.other;
      
      types.forEach(type => {
        if (currentProgress[type] < lowestValue) {
          lowestType = type;
          lowestValue = currentProgress[type];
        }
      });
      
      scores[lowestType] = 0.5;
      matchedKeywords[lowestType].push('平衡提升');
    }
  }
  
  // 额外调试信息 - 在游戏手册的调试模式下可以看到
  console.log('关键词匹配结果:', {
    text: option.text,
    hint: option.hint || '无提示',
    matchedKeywords,
    scores
  });
  
  // 找出得分最高的类别
  let maxType = 'other';
  let maxScore = scores.other;
  
  // 得分优先级：学习 > 游戏 > 社交 > 神秘
  // 在得分相同的情况下，优先选择学习、游戏、社交，最后才是神秘能力
  if (scores.study >= maxScore) {
    maxType = 'study';
    maxScore = scores.study;
  }
  
  if (scores.gaming > maxScore) {
    maxType = 'gaming';
    maxScore = scores.gaming;
  }
  
  if (scores.social > maxScore) {
    maxType = 'social';
    maxScore = scores.social;
  }
  
  // 创建影响对象并处理
  const impact = {
    quest: { type: maxType, value: 5 + Math.floor(Math.random() * 5) }
  };
  
  // 保存分析结果到游戏手册
  saveAnalysisToGameGuide(option, matchedKeywords, maxType);
  
  // 处理影响
  processImpact(impact);
};

// 保存分析结果到游戏手册
const saveAnalysisToGameGuide = (option, matchedKeywords, impactType) => {
  lastChoiceAnalysis.value = {
    text: option.text,
    matchedKeywords,
    impactType,
    impactText: getImpactText(impactType)
  };
  
  // 更新调试信息
  if (debugMode.value) {
    debugInfo.value = {
      lastChoice: {
        text: option.text,
        hint: option.hint || '无提示',
        matchedKeywords,
        impactType,
        impactText: getImpactText(impactType)
      }
    };
  }
};
```

## 游戏手册功能增强

游戏内置了实时更新的游戏手册，帮助玩家了解游戏状态和选择分析：

```typescript
// 游戏手册组件
const showGameGuide = ref(false);
const lastChoiceAnalysis = ref({
  text: '',
  matchedKeywords: {
    gaming: [],
    study: [],
    social: [],
    other: []
  },
  impactType: '',
  impactText: ''
});

const debugMode = ref(false); // 调试模式开关
const debugInfo = ref(null); // 调试信息

// 更新选择分析
const updateChoiceAnalysis = (choice, matchedWords, impactType) => {
  lastChoiceAnalysis.value = {
    text: choice.text,
    matchedKeywords: matchedWords,
    impactType: impactType,
    impactText: getImpactText(impactType)
  };
};

// 获取影响类型文本
const getImpactText = (type) => {
  switch (type) {
    case 'gaming': return '游戏技能';
    case 'study': return '学习能力';
    case 'social': return '社交关系';
    case 'other': return '神秘能力';
    default: return '';
  }
};
```

### 游戏手册UI设计

游戏手册使用浮动面板设计，可随时打开查看：

```html
<!-- 游戏手册浮动按钮 -->
<div class="fixed bottom-4 right-4 z-40">
  <button 
    @click="showGameGuide = !showGameGuide" 
    class="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
  >
    <span class="text-white text-xl">📖</span>
  </button>
</div>

<!-- 游戏手册浮动面板 -->
<div v-if="showGameGuide" class="fixed right-4 bottom-20 w-72 bg-white rounded-xl border border-indigo-100 shadow-xl z-40 overflow-hidden">
  <div class="bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-3 flex justify-between items-center">
    <h3 class="text-white font-medium">游戏手册</h3>
    <button @click="showGameGuide = false" class="text-white hover:text-indigo-100">×</button>
  </div>
  
  <div class="p-4 max-h-96 overflow-y-auto">
    <!-- 当前状态 -->
    <div class="mb-4">
      <h4 class="font-bold text-slate-700 mb-2">当前状态</h4>
      <div class="bg-slate-50 rounded-lg p-3 text-sm">
        <div><span class="font-medium">玩家:</span> {{ playerName }}</div>
        <div><span class="font-medium">场景:</span> {{ currentScene?.id || '初始' }}</div>
        <div><span class="font-medium">模型:</span> {{ currentModel }}</div>
      </div>
    </div>
    
    <!-- 能力值进度 -->
    <div class="mb-4">
      <h4 class="font-bold text-slate-700 mb-2">能力值</h4>
      <div class="space-y-2">
        <!-- 游戏技能进度条 -->
        <div>
          <div class="flex justify-between text-xs mb-1">
            <span class="text-blue-600 font-medium">游戏技能</span>
            <span>{{ Math.round(progress.mainQuests.gaming) }}%</span>
          </div>
          <div class="bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div class="h-full bg-blue-500 rounded-full" :style="`width: ${progress.mainQuests.gaming}%`"></div>
          </div>
        </div>
        
        <!-- 学习能力进度条 -->
        <div>
          <div class="flex justify-between text-xs mb-1">
            <span class="text-emerald-600 font-medium">学习能力</span>
            <span>{{ Math.round(progress.mainQuests.study) }}%</span>
          </div>
          <div class="bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div class="h-full bg-emerald-500 rounded-full" :style="`width: ${progress.mainQuests.study}%`"></div>
          </div>
        </div>
        
        <!-- 社交关系进度条 -->
        <div>
          <div class="flex justify-between text-xs mb-1">
            <span class="text-amber-600 font-medium">社交关系</span>
            <span>{{ Math.round(progress.mainQuests.social) }}%</span>
          </div>
          <div class="bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div class="h-full bg-amber-500 rounded-full" :style="`width: ${progress.mainQuests.social}%`"></div>
          </div>
        </div>
        
        <!-- 神秘能力进度条 -->
        <div>
          <div class="flex justify-between text-xs mb-1">
            <span class="text-purple-600 font-medium">神秘能力</span>
            <span>{{ Math.round(progress.mainQuests.other) }}%</span>
          </div>
          <div class="bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div class="h-full bg-purple-500 rounded-full" :style="`width: ${progress.mainQuests.other}%`"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 上次选择分析 -->
    <div v-if="lastChoiceAnalysis.text">
      <h4 class="font-bold text-slate-700 mb-2">上次选择分析</h4>
      <div class="bg-slate-50 rounded-lg p-3 text-sm">
        <div class="mb-1 font-medium">选择: "{{ lastChoiceAnalysis.text }}"</div>
        <div class="text-xs text-slate-500">
          <!-- 显示匹配到的关键词 -->
          <div v-if="lastChoiceAnalysis.matchedKeywords.gaming.length > 0">
            <span class="text-blue-600">游戏关键词:</span> {{ lastChoiceAnalysis.matchedKeywords.gaming.join(', ') }}
          </div>
          <div v-if="lastChoiceAnalysis.matchedKeywords.study.length > 0">
            <span class="text-emerald-600">学习关键词:</span> {{ lastChoiceAnalysis.matchedKeywords.study.join(', ') }}
          </div>
          <div v-if="lastChoiceAnalysis.matchedKeywords.social.length > 0">
            <span class="text-amber-600">社交关键词:</span> {{ lastChoiceAnalysis.matchedKeywords.social.join(', ') }}
          </div>
          <div v-if="lastChoiceAnalysis.matchedKeywords.other.length > 0">
            <span class="text-purple-600">神秘关键词:</span> {{ lastChoiceAnalysis.matchedKeywords.other.join(', ') }}
          </div>
          
          <div class="mt-2 font-medium">
            增加了: <span class="text-indigo-600">{{ lastChoiceAnalysis.impactText }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 调试开关 -->
    <div class="mt-4 flex items-center">
      <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="debugMode" class="sr-only peer">
        <div class="relative w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
        <span class="ml-3 text-sm font-medium text-gray-600">调试模式</span>
      </label>
    </div>
    
    <!-- 调试信息 -->
    <div v-if="debugMode && debugInfo" class="mt-3">
      <h4 class="font-bold text-slate-700 mb-2">调试信息</h4>
      <div class="bg-gray-50 p-3 rounded-lg">
        <pre class="text-xs text-gray-700 whitespace-pre-wrap">{{ JSON.stringify(debugInfo, null, 2) }}</pre>
      </div>
    </div>
  </div>
</div>
```

### 深入理解游戏手册的功能

游戏手册提供了以下功能：

1. **实时游戏状态显示**
   - 当前玩家信息
   - 当前场景ID
   - 使用的AI模型

2. **能力值进度条**
   - 四种能力（游戏、学习、社交、神秘）的进度百分比
   - 直观的彩色进度条

3. **选择分析功能**
   - 记录上次选择的文本
   - 显示匹配到的关键词分类
   - 标明选择影响了哪种能力

4. **调试功能**
   - 可切换的调试模式
   - 详细的选择分析JSON输出
   - 方便开发者和玩家了解游戏机制

### 游戏手册的代码实现

在`GiaoGame.vue`组件中实现游戏手册的核心代码如下：

```typescript
// 初始化游戏手册相关数据
const showGameGuide = ref(false);
const lastChoiceAnalysis = ref({
  text: '',
  matchedKeywords: {
    gaming: [],
    study: [],
    social: [],
    other: []
  },
  impactType: '',
  impactText: ''
});
const debugMode = ref(false);
const debugInfo = ref(null);

// 保存选择分析到游戏手册
const saveAnalysisToGameGuide = (option, matchedKeywords, impactType) => {
  // 保存上次选择分析
  lastChoiceAnalysis.value = {
    text: option.text,
    matchedKeywords: {
      gaming: matchedKeywords.gaming || [],
      study: matchedKeywords.study || [],
      social: matchedKeywords.social || [],
      other: matchedKeywords.other || []
    },
    impactType: impactType,
    impactText: getImpactText(impactType)
  };
  
  // 如果调试模式开启，更新调试信息
  if (debugMode.value) {
    debugInfo.value = {
      lastChoice: {
        text: option.text,
        hint: option.hint || '无提示',
        matchedKeywords: matchedKeywords,
        impactType: impactType
      },
      currentScene: currentScene.value?.id,
      currentProgress: { ...progress.value.mainQuests }
    };
  }
};

// 获取能力类型的文本描述
const getImpactText = (type) => {
  switch (type) {
    case 'gaming': return '游戏技能';
    case 'study': return '学习能力';
    case 'social': return '社交关系';
    case 'other': return '神秘能力';
    default: return '未知能力';
  }
};

// 在handleChoice函数中，选项处理完成后调用
// saveAnalysisToGameGuide(selectedOption, matchedKeywords, impactType);
```

### 游戏手册的使用指南

1. **如何访问游戏手册**
   - 点击游戏界面右下角的浮动📖按钮
   - 手册面板将会弹出显示

2. **如何查看能力进度**
   - 打开游戏手册后，直接查看"能力值"部分
   - 四种能力的进度条会显示当前百分比

3. **如何分析上次选择**
   - 查看"上次选择分析"部分
   - 可以看到匹配到的关键词和影响的能力类型

4. **如何使用调试功能**
   - 打开游戏手册
   - 切换底部的"调试模式"开关
   - 调试信息区域将显示更详细的JSON数据

## 游戏手册开发示例

下面是开发游戏手册的示例流程：

1. **添加必要的响应式变量**
```typescript
import { ref } from 'vue';

// 游戏手册相关变量
const showGameGuide = ref(false);
const lastChoiceAnalysis = ref({
  text: '',
  matchedKeywords: {
    gaming: [],
    study: [],
    social: [],
    other: []
  },
  impactType: '',
  impactText: ''
});
const debugMode = ref(false);
const debugInfo = ref(null);
```

2. **集成到选择处理逻辑中**
```typescript
// 选择处理函数
const handleChoice = (option) => {
  // 原有的选择处理逻辑
  // ...
  
  // 分析关键词匹配
  const matchedKeywords = analyzeKeywords(option.text, option.hint);
  
  // 确定影响类型
  const impactType = determineImpactType(matchedKeywords);
  
  // 处理游戏进度
  processImpact({ quest: { type: impactType, value: 5 + Math.random() * 5 } });
  
  // 保存分析结果到游戏手册
  saveAnalysisToGameGuide(option, matchedKeywords, impactType);
  
  // 后续处理
  // ...
};
```

3. **添加HTML模板**

将前面的HTML代码添加到组件模板中，包括浮动按钮和手册面板。

## 游戏结局设计

游戏共有四种结局，对应四种不同的能力：

1. **游戏大师** - 游戏技能达到100%
   - 成为电竞选手，获得游戏大赛冠军

2. **学霸之路** - 学习能力达到100%
   - 成为学院最年轻的教授，学术成就斐然

3. **社交之星** - 社交关系达到100%
   - 成为社交网络中心，拥有庞大的人脉网络

4. **神秘技能** - 神秘能力达到100%
   - 掌握无法言明的神秘能力，命运的齿轮在手中转动
