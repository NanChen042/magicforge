import { ref } from 'vue';
import axios from 'axios';

/**
 * 热搜话题管理
 */
export function useHotTopics() {
  const hotTopics = ref<string[]>([]);
  const isLoading = ref(false);

  /**
   * 获取热搜话题
   */
  const fetchHotTopics = async () => {
    try {
      isLoading.value = true;
      // 使用公开的第三方API
      const response = await axios.get('https://api.vvhan.com/api/hotlist/all');
      if (response.data && response.data.data) {
        // 查找热门平台数据
        const platforms = ['微博', '知乎热榜', '百度热点'];
        let hotPlatform = null;

        for (const platform of platforms) {
          hotPlatform = response.data.data.find((item: any) => item.name === platform);
          if (hotPlatform && hotPlatform.data && Array.isArray(hotPlatform.data)) {
            break;
          }
        }

        if (hotPlatform && hotPlatform.data && Array.isArray(hotPlatform.data)) {
          hotTopics.value = hotPlatform.data.slice(0, 6).map((item: any) => {
            return item.title || item.content || item.desc || item.text || '热门话题';
          });
        } else {
          useDefaultTopics();
        }
      } else {
        useDefaultTopics();
      }
    } catch (error) {
      console.error('获取热搜话题失败:', error);
      useDefaultTopics();
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * 使用默认热门话题
   */
  const useDefaultTopics = () => {
    hotTopics.value = [
      "人工智能最新应用",
      "如何提高工作效率",
      "可再生能源的发展",
      "健康生活方式建议",
      "深度学习算法解析",
      "元宇宙未来展望"
    ];
  };

  /**
   * 随机化热门话题数组顺序
   */
  const randomizeHotTopics = () => {
    const array = [...hotTopics.value];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    hotTopics.value = array;
  };

  /**
   * 刷新热门话题
   */
  const refreshHotTopics = async () => {
    if (Math.random() > 0.5) {
      await fetchHotTopics();
    } else {
      randomizeHotTopics();
    }
  };

  return {
    hotTopics,
    isLoading,
    fetchHotTopics,
    refreshHotTopics
  };
}
