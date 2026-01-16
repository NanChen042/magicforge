import { ref, nextTick } from 'vue';
import { debounce } from '@/utils/debounce';

/**
 * 滚动管理
 */
export function useScroll() {
  const shouldAutoScroll = ref(true);
  const isUserScrolling = ref(false);
  let scrollTimer: number | null = null;

  /**
   * 处理滚动事件
   */
  const handleScroll = (event: Event) => {
    const container = event.target as HTMLElement;
    const scrollOffset = container.scrollHeight - container.scrollTop - container.clientHeight;

    // 更精确地检测是否在底部
    const isAtBottom = scrollOffset < 50;

    // 当用户手动滚动离开底部时，禁用自动滚动
    // 只有当用户滚动回底部时，才重新启用自动滚动
    shouldAutoScroll.value = isAtBottom;

    // 标记用户正在滚动
    isUserScrolling.value = true;
    if (scrollTimer) clearTimeout(scrollTimer);

    // 设置滚动超时
    scrollTimer = setTimeout(() => {
      isUserScrolling.value = false;
    }, 1000) as unknown as number;
  };

  /**
   * 防抖处理的滚动到底部函数
   */
  const debouncedScrollToBottom = debounce((container: HTMLElement | null, forceScroll = false) => {
    if (!container) return;

    // 只有在以下情况才滚动：
    // 1. 强制滚动（如首次加载、清空对话等）
    // 2. 用户没有手动滚动离开底部（shouldAutoScroll 为 true）
    const shouldScroll = forceScroll || (shouldAutoScroll.value && !isUserScrolling.value);

    if (shouldScroll) {
      container.style.scrollBehavior = 'smooth';

      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 150;

      if (!isNearBottom) {
        container.style.scrollBehavior = 'auto';
        container.scrollTop = container.scrollHeight - container.clientHeight - 100;

        setTimeout(() => {
          container.style.scrollBehavior = 'smooth';
          container.scrollTop = container.scrollHeight;
        }, 10);
      } else {
        container.scrollTop = container.scrollHeight;
      }

      setTimeout(() => {
        if (container) {
          container.style.scrollBehavior = 'auto';
        }
      }, 500);
    }
  }, 50);

  /**
   * 滚动到底部
   * @param container 滚动容器
   * @param forceScroll 是否强制滚动（忽略用户滚动状态）
   */
  const scrollToBottom = (container: HTMLElement | null, forceScroll = false) => {
    nextTick(() => {
      debouncedScrollToBottom(container, forceScroll);
    });
  };

  /**
   * 重置自动滚动状态（用于新对话开始时）
   */
  const resetAutoScroll = () => {
    shouldAutoScroll.value = true;
    isUserScrolling.value = false;
  };

  return {
    shouldAutoScroll,
    isUserScrolling,
    handleScroll,
    scrollToBottom,
    resetAutoScroll
  };
}
