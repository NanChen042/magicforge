import { ref } from 'vue';
import DeepseekClient from '../services/DeepseekClient';
import { API_CONFIG } from '../services/deepseekService';

/**
 * 热搜话题管理
 * 支持预设话题和 AI 生成话题
 */
export function useHotTopics() {
  // 预设话题库（扩展更多有趣的话题）
  const defaultTopicPool = [
    // 技术类
    "人工智能最新应用",
    "如何提高工作效率",
    "深度学习算法解析",
    "大语言模型原理",
    "云计算架构设计",
    "自动驾驶技术进展",
    "量子计算的突破",
    "区块链应用场景",
    "Web3.0 发展趋势",
    "低代码开发平台",
    // 生活类
    "健康生活方式建议",
    "如何培养阅读习惯",
    "时间管理技巧",
    "远程办公最佳实践",
    "如何保持专注力",
    // 创意类
    "写一首关于春天的诗",
    "帮我想一个创业点子",
    "推荐几本好书",
    "如何学习一门新语言",
    "旅行目的地推荐",
    // 知识类
    "解释相对论的基本概念",
    "宇宙的起源是什么",
    "人类大脑如何工作",
    "气候变化的影响",
    "历史上最伟大的发明"
  ];

  const hotTopics = ref<string[]>([]);
  const isLoading = ref(false);
  let useAIGeneration = false; // 是否使用 AI 生成

  /**
   * 随机选取话题
   */
  const selectRandomTopics = (count: number = 6) => {
    const shuffled = [...defaultTopicPool].sort(() => Math.random() - 0.5);
    hotTopics.value = shuffled.slice(0, count);
  };

  /**
   * 使用 AI 生成话题
   */
  const generateTopicsWithAI = async (apiKey: string, apiUrl: string, model: string): Promise<string[]> => {
    const client = new DeepseekClient({
      apiKey,
      baseURL: apiUrl,
      model,
      temperature: 1.0, // 高温度增加随机性
      maxTokens: 500
    });

    const prompt = `请生成6个有趣且多样化的问题或话题，涵盖不同领域（如技术、生活、创意、知识等）。
要求：
1. 每个话题简短精炼，不超过20个字
2. 话题要有趣、有深度，能引发思考
3. 避免重复或相似的话题
4. 直接输出话题列表，每行一个，不要编号

示例格式：
如何用AI提升创作效率
宇宙中是否存在外星生命
推荐一部改变人生的电影`;

    try {
      const response = await client.chatCompletion({
        messages: [
          { role: 'system', content: '你是一个创意助手，擅长提出有趣的问题和话题。' },
          { role: 'user', content: prompt }
        ],
        stream: false
      });

      const content = response.choices?.[0]?.message?.content || '';
      const topics = content
        .split('\n')
        .map((line: string) => line.trim())
        .filter((line: string) => line.length > 0 && line.length <= 30)
        .slice(0, 6);

      if (topics.length >= 3) {
        return topics;
      }
      return [];
    } catch (error) {
      console.error('AI 生成话题失败:', error);
      return [];
    }
  };

  /**
   * 获取热搜话题（首次使用预设）
   */
  const fetchHotTopics = async () => {
    isLoading.value = true;
    await new Promise(resolve => setTimeout(resolve, 100));
    selectRandomTopics(6);
    isLoading.value = false;
  };

  /**
   * 刷新热门话题（使用 AI 生成）
   */
  const refreshHotTopics = async (apiKey?: string, apiUrl?: string, model?: string) => {
    isLoading.value = true;
    
    // 如果提供了 API 配置，尝试使用 AI 生成
    const key = apiKey || API_CONFIG.apiKey;
    const url = apiUrl || API_CONFIG.baseUrl;
    const modelName = model || API_CONFIG.model;

    if (key && url && useAIGeneration) {
      try {
        const aiTopics = await generateTopicsWithAI(key, url, modelName);
        if (aiTopics.length >= 3) {
          hotTopics.value = aiTopics;
          isLoading.value = false;
          return;
        }
      } catch (error) {
        console.warn('AI 生成失败，使用预设话题');
      }
    }

    // 回退到预设话题
    await new Promise(resolve => setTimeout(resolve, 300));
    selectRandomTopics(6);
    isLoading.value = false;
    
    // 下次刷新尝试使用 AI
    useAIGeneration = true;
  };

  return {
    hotTopics,
    isLoading,
    fetchHotTopics,
    refreshHotTopics
  };
}
