import { ref } from 'vue';
import webSearchService, { type SearchResult } from '@/services/webSearchService';

interface SearchStep {
  step: number;
  action: string;
  details: string;
  timestamp: string;
  status: 'processing' | 'completed' | 'failed';
}

/**
 * 联网搜索管理
 */
export function useWebSearch() {
  const isSearching = ref(false);
  const showSearchProcess = ref(false);
  const searchResult = ref<SearchResult | null>(null);
  const searchSteps = ref<SearchStep[]>([]);

  /**
   * 执行联网搜索
   */
  const performSearch = async (
    query: string,
    apiKey: string,
    apiUrl: string,
    modelName: string
  ): Promise<string> => {
    console.log('🔍 启用联网搜索，开始真实网络搜索...');
    isSearching.value = true;
    showSearchProcess.value = true;
    searchSteps.value = [];

    try {
      const result = await webSearchService.searchAndEnhance(query, {
        apiKey,
        apiUrl,
        model: modelName,
        maxResults: 5
      }, (steps) => {
        searchSteps.value = [...steps];
      });

      searchResult.value = result;

      // 使用增强后的查询
      if (result.enhancedQuery && result.enhancedQuery.length > query.length) {
        console.log('✅ 联网搜索增强完成，使用增强查询');
        return result.enhancedQuery;
      }

      return query;
    } catch (searchError: any) {
      console.error('联网搜索失败:', searchError.message);
      throw searchError;
    } finally {
      isSearching.value = false;
      // 保持搜索过程显示3秒后自动隐藏
      setTimeout(() => {
        showSearchProcess.value = false;
      }, 3000);
    }
  };

  /**
   * 关闭搜索过程显示
   */
  const closeSearchProcess = () => {
    showSearchProcess.value = false;
  };

  return {
    isSearching,
    showSearchProcess,
    searchResult,
    searchSteps,
    performSearch,
    closeSearchProcess
  };
}
