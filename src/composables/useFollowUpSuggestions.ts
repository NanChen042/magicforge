import { ref } from 'vue';
import DeepseekClient from '../services/DeepseekClient';

/**
 * 相关问题推荐
 * 根据对话内容生成后续问题建议
 */
export function useFollowUpSuggestions() {
  const suggestions = ref<string[]>([]);
  const isLoading = ref(false);
  const lastContext = ref('');

  /**
   * 根据对话内容生成相关问题
   */
  const generateSuggestions = async (
    userQuestion: string,
    aiAnswer: string,
    apiKey: string,
    apiUrl: string,
    model: string
  ): Promise<void> => {
    if (!apiKey || !apiUrl) {
      suggestions.value = [];
      return;
    }

    isLoading.value = true;
    lastContext.value = `${userQuestion}\n${aiAnswer}`;

    const client = new DeepseekClient({
      apiKey,
      baseURL: apiUrl,
      model,
      temperature: 0.9,
      maxTokens: 300
    });

    const prompt = `基于以下对话，生成3个用户可能感兴趣的后续问题。

用户问题：${userQuestion}

AI回答摘要：${aiAnswer.slice(0, 500)}${aiAnswer.length > 500 ? '...' : ''}

要求：
1. 问题要与对话主题相关，是对话的自然延伸
2. 问题要简短精炼，不超过20个字
3. 问题要有深度，能引发进一步思考
4. 直接输出问题，每行一个，不要编号或其他格式`;

    try {
      const response = await client.chatCompletion({
        messages: [
          { role: 'system', content: '你是一个善于提问的助手，擅长根据对话内容提出有价值的后续问题。' },
          { role: 'user', content: prompt }
        ],
        stream: false
      });

      const content = response.choices?.[0]?.message?.content || '';
      const newSuggestions = content
        .split('\n')
        .map((line: string) => line.replace(/^[\d\.\-\*\s]+/, '').trim())
        .filter((line: string) => line.length > 0 && line.length <= 30)
        .slice(0, 4);

      if (newSuggestions.length > 0) {
        suggestions.value = newSuggestions;
      } else {
        // 如果生成失败，使用通用问题
        suggestions.value = getDefaultSuggestions(userQuestion);
      }
    } catch (error) {
      console.error('生成相关问题失败:', error);
      suggestions.value = getDefaultSuggestions(userQuestion);
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * 刷新推荐（重新生成）
   */
  const refreshSuggestions = async (
    apiKey: string,
    apiUrl: string,
    model: string
  ): Promise<void> => {
    if (!lastContext.value) return;
    
    const [userQuestion, aiAnswer] = lastContext.value.split('\n');
    await generateSuggestions(userQuestion || '', aiAnswer || '', apiKey, apiUrl, model);
  };

  /**
   * 获取默认推荐问题
   */
  const getDefaultSuggestions = (topic: string): string[] => {
    const keywords = topic.slice(0, 10);
    return [
      `能详细解释一下吗？`,
      `有什么实际应用案例？`,
      `还有其他相关的内容吗？`
    ];
  };

  /**
   * 清空推荐
   */
  const clearSuggestions = () => {
    suggestions.value = [];
    lastContext.value = '';
  };

  return {
    suggestions,
    isLoading,
    generateSuggestions,
    refreshSuggestions,
    clearSuggestions
  };
}
