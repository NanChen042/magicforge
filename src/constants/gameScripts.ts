export interface ScriptTrait {
  id: string
  name: string
  badge: string
  icon: string
  desc: string
  bonus: {
    gaming?: number
    study?: number
    social?: number
    other?: number
  }
}

export interface GameScript {
  id: string
  title: string
  subtitle: string
  tag: string
  genre: string
  badge: string
  icon: string
  description: string
  characterBackground: string
  attributeNames: {
    gaming: { label: string; icon: string; color: string }
    study: { label: string; icon: string; color: string }
    social: { label: string; icon: string; color: string }
    other: { label: string; icon: string; color: string }
  }
  traits: ScriptTrait[]
  initialScene: {
    id: number
    description: string
    dialog: string
    options: {
      text: string
      hint: string
      impact: {
        quest: { type: 'gaming' | 'study' | 'social' | 'other'; value: number }
        relationship?: { character: string; value: number }
      }
    }[]
  }
}

export const GAME_SCRIPTS: GameScript[] = [
  {
    id: 'lost_echo_zero',
    title: '失序回响 · 零号城：不存在的昨天',
    subtitle: '当整座城市都证明你从未存在，你还能相信自己的记忆吗？',
    tag: '都市科幻 · 身份悬疑 · 记忆调查',
    genre: '沉浸式科幻悬疑分支RPG',
    badge: '推荐首选',
    icon: '🌃',
    description: '从诡异的凌晨地铁逃离后，你第一次真正踏入镜海市。霓虹、无人驾驶车辆、城市广播与巨型全息广告让这里看起来与任何繁华都市没有区别，但当安全系统扫描你的身份时，整个终端却第一次出现了红色错误：不存在。没有姓名、没有出生记录、没有指纹档案，甚至连城市监控都无法确认你曾经进入过镜海。与此同时，那个浑身是血的女人留下了一句警告后消失，白裙女孩也再次不知所踪。城市中央人工智能 ORACLE 开始主动搜索一个代号为“ZERO”的异常目标，而你口袋中的07号金属牌似乎正在回应某个隐藏信号。为了弄清自己究竟是谁，你必须在安全局、地下记忆黑市以及城市深处被删除的秘密之间寻找答案。',
    characterBackground: '本章承接凌晨03:17地铁事件。玩家仍不知道ZERO和07真正含义。AI必须保持玩家身份谜团，不得提前明确玩家是人工人格。玩家从地铁事件中逃出后进入镜海市旧城区，并开始第一次接触三大势力。林鸦是地下记忆交易网络“渡鸦市场”的核心中间人，她可能因为玩家救助受伤女人、调查异常信息或追踪07信号而与玩家产生联系。她第一次面对玩家时会表现得非常警惕，因为她曾在一段来源未知的非法记忆中见过玩家死亡。顾沉舟作为镜海城市安全局异常事件调查官，正在追查凌晨地铁系统出现的无法解释的数据错误，他不知道玩家真实身份，但发现ORACLE无法预测玩家后，会将玩家列为最高优先级观察对象。沈栀暂时以旧城区电子维修店老板身份出现，她似乎对07金属牌存在异常反应，却会主动否认自己认识它。诺亚仍会不定期出现，并给出真假混杂的信息。第一章核心目标是让玩家发现三个事实：第一，城市数据库中不存在玩家；第二，镜海市存在非法交易的“未来记忆”；第三，部分陌生人正在开始记起从未发生的人生。AI推演中应允许玩家加入安全局、接触地下黑市、独立调查或同时欺骗多个阵营。任何阵营都不得被简单塑造成正派或反派。林鸦关系应重点记录信任、怀疑和兴趣；顾沉舟重点记录信任、威胁判断和控制欲；沈栀重点记录戒备、愧疚和秘密暴露程度；诺亚不采用传统好感，而记录玩家对她的相信程度。玩家如果频繁接触异常记忆，应逐渐产生既视感、幻听、陌生人物记忆和时间错位，但不能在第一章直接造成完全失控。',
    attributeNames: {
      gaming: { label: '行动执行', icon: '⚔️', color: 'blue' },
      study: { label: '真相解析', icon: '🔍', color: 'cyan' },
      social: { label: '关系影响', icon: '🎭', color: 'amber' },
      other: { label: '回声感知', icon: '🌌', color: 'purple' }
    },
    traits: [
      {
        id: 'gaming',
        name: '危机本能',
        badge: '行动强化',
        icon: '⚡',
        desc: '你会本能观察出口、危险源与他人的攻击意图，更容易在追捕和突发事件中抢占先机。',
        bonus: { gaming: 25, study: 5, social: 5, other: 0 }
      },
      {
        id: 'study',
        name: '记忆解构者',
        badge: '调查专精',
        icon: '🧩',
        desc: '你能够从数据矛盾、语言漏洞和异常记录中发现隐藏规律，更容易触发调查类线索。',
        bonus: { gaming: 5, study: 25, social: 5, other: 0 }
      },
      {
        id: 'balanced',
        name: '不可预测者',
        badge: '均衡发展',
        icon: '♟️',
        desc: '你的行动逻辑缺乏固定模式，更容易同时维持多方关系并进入隐藏剧情。',
        bonus: { gaming: 15, study: 15, social: 10, other: 0 }
      }
    ],
    initialScene: {
      id: 1,
      description: '清晨05:42，镜海市旧城区开始下雨。你站在一台公共身份终端前，雨水顺着外套滴落，身后的巨型屏幕正在播放ORACLE发布的晨间城市安全指数。终端已经连续扫描你七次，每一次结果都完全相同：公民身份不存在、面部记录不存在、DNA索引不存在。就在第八次扫描即将开始时，屏幕突然闪烁了一下，所有正常界面同时消失，只剩下一行黑底白字：“ZERO-07，异常变量确认。”不到一秒，文字再次消失。远处街口，两辆没有任何标识的黑色车辆突然改变路线向你驶来。与此同时，一个陌生通讯请求强制接入终端。画面中出现一个短发女人，她叼着棒棒糖，冷冷地看着你：“如果你不想十分钟后躺在安全局解剖台上，就把那块写着07的东西带来见我。地址我只发一次。”你还没回答，身后的玻璃橱窗里却映出了那个白裙女孩。她站在你身后轻声说道：“别去。她上一次杀过你。”',
      dialog: '一个陌生人说要救我，一个不存在的女孩说她杀过我，而整座城市正在告诉我——我根本不存在。',
      options: [
        {
          text: '立刻离开街道，利用旧城区复杂地形摆脱正在接近的黑色车辆，再决定下一步去向。',
          hint: '暂时不相信任何人，优先摆脱追踪并掌握行动主动权。',
          impact: {
            quest: { type: 'gaming', value: 10 }
          }
        },
        {
          text: '截取终端刚才出现的ZERO-07异常记录，同时追查黑色车辆和陌生通讯的信号来源。',
          hint: '冒着被锁定的风险收集第一批关于自己身份的真实数据。',
          impact: {
            quest: { type: 'study', value: 10 }
          }
        },
        {
          text: '接通陌生女人的通讯，但不立刻答应她，试探她为什么知道07以及安全局正在追捕自己的原因。',
          hint: '通过谈判获取信息，同时尝试建立与林鸦的第一次关系。',
          impact: {
            quest: { type: 'social', value: 10 }
          }
        },
        {
          text: '转身直视玻璃中的白裙女孩，追问她所谓的“上一次”究竟发生过什么。',
          hint: '主动接触异常存在，有机会提前获得被删除时间线的记忆碎片。',
          impact: {
            quest: { type: 'other', value: 10 }
          }
        }
      ]
    }
  },
  {
    id: 'sword_gaokao',
    title: '剑道传奇 · 最强剑魔的高考抉择',
    subtitle: '高考倒计时 30 天 × 连续 29 天冲击峡谷之巅失败',
    tag: '青春热血 · 电竞与学业',
    genre: '现实物语 / 现代竞技',
    badge: '经典热血',
    icon: '⚔️',
    description: '高考倒计时30天，某市第一高中的教室里，小明正心不在焉地听着课。作为知名剑魔玩家，他在现实与峡谷两难之境中抉择。是专心刷题逆风翻盘，还是拔出暗裔巨剑执掌荣耀？',
    characterBackground: `角色背景：
- 姓名：小明（游戏ID：最强剑魔）
- 身份：高三学生，知名游戏主播
- 游戏特长：英雄联盟剑魔玩家，连续29天冲击王者失败
- 核心人物关系：班主任王老师（严厉关切）、同桌李雪（学霸学委）、公会老铁/超管
- 抉择核心：平衡高三学业冲刺与电竞梦想追求。`,
    attributeNames: {
      gaming: { label: '剑道感悟', icon: '⚔️', color: 'blue' },
      study: { label: '备考学识', icon: '📚', color: 'emerald' },
      social: { label: '同窗羁绊', icon: '🤝', color: 'amber' },
      other: { label: '宿命顿悟', icon: '✨', color: 'purple' }
    },
    traits: [
      {
        id: 'gaming',
        name: '绝活剑魔',
        badge: '操作拉满',
        icon: '⚔️',
        desc: '初始剑道感悟 +20。直播与峡谷排位具有超常直觉，易触发电竞邀请与知名解说连麦。',
        bonus: { gaming: 25, study: 5, social: 5, other: 0 }
      },
      {
        id: 'study',
        name: '逆袭学霸',
        badge: '题海领悟',
        icon: '📚',
        desc: '初始备考学识 +20。思维缜密，刷卷效率翻倍，极易获得王老师与重点高校的保送线索。',
        bonus: { gaming: 5, study: 25, social: 5, other: 0 }
      },
      {
        id: 'balanced',
        name: '全能天秤',
        badge: '双界通吃',
        icon: '⚖️',
        desc: '各项初始属性均衡发展。情商与大局观极高，容易解锁高难度的「双料冠军」真结局。',
        bonus: { gaming: 15, study: 15, social: 10, other: 0 }
      }
    ],
    initialScene: {
      id: 1,
      description: '高考倒计时30天，某市第一高中的教室里，小明正心不在焉地听着班主任王老师讲解数学题。但他的心思完全在今晚的游戏排位赛上 —— 作为知名剑魔玩家"最强剑魔"，他已经连续29天冲击王者失败了。昨晚的直播间里，他又因为激动地大喊"回答我！"把麦克风震炸了。同桌李雪正悄悄把复习笔记推向你。',
      dialog: '（小明看着手机里的游戏战绩，自言自语）"怎么不找找自己的问题呢...这把打完我要是能拿MVP就好了。"',
      options: [
        {
          text: '专心听课，收起手机翻开李雪的笔记',
          hint: '做一个自律高三生，稳步提升学业成绩',
          impact: {
            quest: { type: 'study', value: 10 },
            relationship: { character: '王老师', value: 5 }
          }
        },
        {
          text: '偷偷在草稿纸上推演剑魔全新团战切入连招',
          hint: '专注游戏理解，备战今晚生死晋级赛',
          impact: {
            quest: { type: 'gaming', value: 10 },
            relationship: { character: '李雪', value: -2 }
          }
        },
        {
          text: '小声向李雪请教数学难题，顺便聊聊彼此的目标大学',
          hint: '增进同窗羁绊，寻找学业与心态的平衡点',
          impact: {
            quest: { type: 'social', value: 10 },
            relationship: { character: '李雪', value: 8 }
          }
        },
        {
          text: '望向窗外发呆，思考这 29 天冲击王者失败的玄学因果',
          hint: '心境顿悟，试图从命运底层寻找突破契机',
          impact: {
            quest: { type: 'other', value: 10 }
          }
        }
      ]
    }
  },
  {
    id: 'cyber_sword',
    title: '赛博剑修 · 斩断霓虹的因果之刃',
    subtitle: 'Neo-2088 义体飞升时代，你觉醒了绝迹千年的数字机械剑意',
    tag: '硬核科幻 · 赛博修真',
    genre: '赛博朋克 / 高武科幻',
    badge: '高燃科幻',
    icon: '⚡',
    description: '在被巨型财阀「昆仑神机」统治的下层九龙城寨，你只是一名负责维修义体神经的落魄剑客。一次偶然的数据侵入，你唤醒了潜藏在纳米光纤中的古老剑魂「诛仙底层协议」。',
    characterBackground: `角色背景：
- 姓名：林断（赛博代号：零式剑修）
- 身份：下层九龙城寨义体改装师、黑客剑客
- 装备：高频震荡等离子长刀「断流」、自制神经超频芯片
- 核心人物关系：情报贩子苏玖、财阀执法官雷蒙德、地下义体医师老鬼
- 抉择核心：是以力破法摧毁神机矩阵，还是融入义体飞升执掌巨企。`,
    attributeNames: {
      gaming: { label: '高频剑意', icon: '⚡', color: 'blue' },
      study: { label: '矩阵解析', icon: '💻', color: 'cyan' },
      social: { label: '暗网声望', icon: '🌐', color: 'indigo' },
      other: { label: '纳米飞升', icon: '🧬', color: 'purple' }
    },
    traits: [
      {
        id: 'gaming',
        name: '狂暴剑骨',
        badge: '斩击强化',
        icon: '🗡️',
        desc: '初始高频剑意 +20。近战等离子斩击伤害激增，擅长正面突入重型战警防线。',
        bonus: { gaming: 25, study: 5, social: 5, other: 0 }
      },
      {
        id: 'study',
        name: '协议骇客',
        badge: '代码瓦解',
        icon: '💻',
        desc: '初始矩阵解析 +20。可直接篡改机械造物的敌我识别协议，窥视财阀绝密数据库。',
        bonus: { gaming: 5, study: 25, social: 5, other: 0 }
      },
      {
        id: 'balanced',
        name: '无间行者',
        badge: '暗网游民',
        icon: '🕶️',
        desc: '各项数据均衡。在黑市各方势力中游刃有余，拥有更多暗线支援。',
        bonus: { gaming: 15, study: 15, social: 10, other: 0 }
      }
    ],
    initialScene: {
      id: 1,
      description: '霓虹冷雨浇注在九龙第三层的破旧铁皮雨檐上。林断在昏暗的工作台前擦拭着刚改装完的高频离子剑，警报蜂鸣突然刺穿雨夜 —— 财阀「昆仑神机」的执法浮空艇正投射出炽白探照灯，两只军用仿生机械犬撞破了防盗卷帘门。暗网终端上，一封来自未知加密节点的悬赏令正在闪烁。',
      dialog: '（林断握紧刀柄，瞳孔倒映出猩红的警报光芒）"终于还是找上门了...这把刀沉睡了三年，也该尝尝超导液的味道了。"',
      options: [
        {
          text: '拔刀前踏，以高频等离子剑瞬斩前导仿生犬的能源核心',
          hint: '正面迎敌，展示顶级近身剑术压制力',
          impact: {
            quest: { type: 'gaming', value: 12 },
            relationship: { character: '执法官雷蒙德', value: -5 }
          }
        },
        {
          text: '启动工作台电磁过载脉冲，趁乱黑入浮空艇导航矩阵',
          hint: '技术瓦解，通过数据入侵瘫痪敌人视野',
          impact: {
            quest: { type: 'study', value: 12 }
          }
        },
        {
          text: '联络暗网向导苏玖，启动下水道隐蔽逃生信标',
          hint: '借助人际暗线避其锋芒，保留底牌',
          impact: {
            quest: { type: 'social', value: 10 },
            relationship: { character: '苏玖', value: 6 }
          }
        },
        {
          text: '激活体内沉睡的「诛仙纳米基因」，尝试与矩阵共鸣',
          hint: '冒险激发未知神秘潜能，探索基因底层秘密',
          impact: {
            quest: { type: 'other', value: 12 }
          }
        }
      ]
    }
  },
  {
    id: 'abyss_beacon',
    title: '深渊信标 · 异常调查员的七日死局',
    subtitle: '深海科考站失联第 7 天，理智值与禁忌真理的极限博弈',
    tag: '悬疑惊悚 · 克苏鲁科幻',
    genre: '调查解谜 / 心理恐怖',
    badge: '烧脑推演',
    icon: '👁️',
    description: '作为特别危机调查员，你登上了位于马里亚纳海沟 8000 米深处的「阿刻罗俄斯」科考站。站内空无一人，唯有深海广播中不断循环着不知名语言的低语与古老符文。',
    characterBackground: `角色背景：
- 姓名：陆远（代号：渡鸦）
- 身份：异常事务管理局资深一级调查员
- 随身装备：重型动能手枪、便携式神经镇定剂、深渊测谎仪
- 核心机制：理智值（Sanity）、线索还原度、不可名状接触度
- 抉择核心：是在精神彻底崩溃前逃出生天，还是吞下禁忌知识揭开深渊真相。`,
    attributeNames: {
      gaming: { label: '生存搏杀', icon: '🔫', color: 'blue' },
      study: { label: '禁忌线索', icon: '🔍', color: 'emerald' },
      social: { label: '幸存联络', icon: '📻', color: 'amber' },
      other: { label: '理智心境', icon: '🧠', color: 'purple' }
    },
    traits: [
      {
        id: 'study',
        name: '洞察学者',
        badge: '线索直觉',
        icon: '🔍',
        desc: '初始禁忌线索 +20。对古老遗迹与异常数据拥有极高敏锐度，可轻松破译加密日志。',
        bonus: { gaming: 5, study: 25, social: 5, other: 0 }
      },
      {
        id: 'gaming',
        name: '特勤尖兵',
        badge: '战术决断',
        icon: '🛡️',
        desc: '初始生存搏杀 +20。面对异化生物体拥有极佳的战术射击与紧急回避能力。',
        bonus: { gaming: 25, study: 5, social: 5, other: 0 }
      },
      {
        id: 'balanced',
        name: '坚毅心智',
        badge: '理智锚定',
        icon: '🧠',
        desc: '心智如同磐石。极难受到幻觉侵蚀，在极端恐怖情境下仍能保持冷酷决断。',
        bonus: { gaming: 10, study: 10, social: 10, other: 10 }
      }
    ],
    initialScene: {
      id: 1,
      description: '气闸舱沉重的液压阀门缓缓闭合，将万吨深海压力隔绝在合金壁外。站内应急红光不断闪烁，地砖上残留着泛着荧光的深黑色黏液。中央主控台的大屏幕上，一行绿色字符正疯狂滚动："它们不是来自深海，它们就在你的视网膜背后"。通风管道深处传来了指甲刮擦金属的沉闷回响。',
      dialog: '（陆远给动能手枪上膛，深吸一口气）"检测到周围环境污染指数 42%...不论这里发生了什么，我必须找到黑匣子。"',
      options: [
        {
          text: '举枪戒备，沿着黏液痕迹突进中央生化实验室',
          hint: '战术突入，直面未知的物理威胁',
          impact: {
            quest: { type: 'gaming', value: 10 }
          }
        },
        {
          text: '连接主控台终端，强行读取失联前最后一小时的监控日志',
          hint: '收集硬核证据，查明灾难根源',
          impact: {
            quest: { type: 'study', value: 12 }
          }
        },
        {
          text: '使用短波对讲机呼叫各分舱，确认是否还有幸存科研人员',
          hint: '搜寻潜在同伴，组建生存小队',
          impact: {
            quest: { type: 'social', value: 10 }
          }
        },
        {
          text: '服用一支神经镇定剂，闭目聆听广播低语中的几何规律',
          hint: '以理智换取不可名状的终极启示',
          impact: {
            quest: { type: 'other', value: 15 }
          }
        }
      ]
    }
  }
]

export const AI_SCRIPT_PROMPT_TEMPLATE = `【角色扮演与互动游戏剧本生成指令 - MagicForge 互动引擎专版】

你是一位顶级游戏剧本设计师与叙事总监。请为基于大模型实时推演的文字交互式 RPG 游戏创作一套【全新完整剧本配置文件】。

### 1. 剧本必须包含以下 JSON 格式结构：
\`\`\`json
{
  "id": "unique_script_id",
  "title": "剧本名称（例如：失序回响 · 零号城：不存在的昨天）",
  "subtitle": "副标题（一句话悬念或核心世界观冲突）",
  "tag": "核心标签（例如：都市科幻 · 身份悬疑 · 记忆调查）",
  "genre": "题材流派",
  "badge": "剧本亮点标签（例如：第一章）",
  "icon": "代表性 Emoji（例如：🌃）",
  "description": "200字剧情背景介绍，包含主角处境与核心矛盾",
  "characterBackground": "主角背景与 NPC 关系设定，指导 AI 后续多轮分支推演",
  "attributeNames": {
    "gaming": { "label": "行动执行", "icon": "⚔️", "color": "blue" },
    "study": { "label": "真相解析", "icon": "🔍", "color": "cyan" },
    "social": { "label": "关系影响", "icon": "🎭", "color": "amber" },
    "other": { "label": "回声感知", "icon": "🌌", "color": "purple" }
  },
  "traits": [
    {
      "id": "gaming",
      "name": "危机本能",
      "badge": "行动强化",
      "icon": "⚡",
      "desc": "你会本能观察出口、危险源与他人的攻击意图，更容易在追捕和突发事件中抢占先机。",
      "bonus": { "gaming": 25, "study": 5, "social": 5, "other": 0 }
    },
    {
      "id": "study",
      "name": "记忆解构者",
      "badge": "调查专精",
      "icon": "🧩",
      "desc": "你能够从数据矛盾、语言漏洞和异常记录中发现隐藏规律，更容易触发调查类线索。",
      "bonus": { "gaming": 5, "study": 25, "social": 5, "other": 0 }
    },
    {
      "id": "balanced",
      "name": "不可预测者",
      "badge": "均衡发展",
      "icon": "♟️",
      "desc": "你的行动逻辑缺乏固定模式，更容易同时维持多方关系并进入隐藏剧情。",
      "bonus": { "gaming": 15, "study": 15, "social": 10, "other": 0 }
    }
  ],
  "initialScene": {
    "id": 1,
    "description": "第1幕开场环境与紧迫危机描写，字数约 150-250 字",
    "dialog": "主角的第一句内心独白或台词",
    "options": [
      {
        "text": "选项1（激进行动/核心专长）",
        "hint": "选项潜在后果或风格提示",
        "impact": { "quest": { "type": "gaming", "value": 10 } }
      },
      {
        "text": "选项2（缜密分析/技术破解）",
        "hint": "选项潜在后果或风格提示",
        "impact": { "quest": { "type": "study", "value": 10 } }
      },
      {
        "text": "选项3（人际沟通/求助同伴）",
        "hint": "选项潜在后果或风格提示",
        "impact": { "quest": { "type": "social", "value": 10 } }
      },
      {
        "text": "选项4（另辟蹊径/直觉神秘）",
        "hint": "选项潜在后果或风格提示",
        "impact": { "quest": { "type": "other", "value": 10 } }
      }
    ]
  }
}
\`\`\`

### 2. 设计原则：
1. **张力十足**：开场必须置身于紧迫矛盾（如倒计时、生死抉择、身份暴露、突发异变）。
2. **四个选项性格鲜明**：分别对应激进行动派、理智智谋派、社交人情派、直觉洞察派。
3. **输出要求**：请直接输出纯 JSON 代码块，确保格式严格有效，可直接复制解析。`
