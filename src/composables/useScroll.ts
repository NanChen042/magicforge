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

    // 只有当用户手动滚动且不在底部时，才禁用自动滚动
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
  const debouncedScrollToBottom = debounce((container: HTMLElement | null, forceScroll = false, isProcessing = false, isThinking = false) => {
    if (!container) return;

    const shouldScroll = forceScroll ||
                        (shouldAutoScroll.value && !isUserScrolling.value) ||
                        isThinking ||
                        isProcessing;

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
   */
  const scrollToBottom = (container: HTMLElement | null, forceScroll = false, isProcessing = false, isThinking = false) => {
    nextTick(() => {
      debouncedScrollToBottom(container, forceScroll, isProcessing, isThinking);
    });
  };

  return {
    shouldAutoScroll,
    isUserScrolling,
    handleScroll,
    scrollToBottom
  };
}
