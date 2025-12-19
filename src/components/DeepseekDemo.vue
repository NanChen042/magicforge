<template>
  <div class="w-full h-full flex flex-col bg-slate-50 overflow-hidden">
    <!-- 主内容区域：配置面板和聊天面板 -->
    <div class="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 px-4 overflow-hidden min-h-0">
      <ConfigPanel
        v-model:apiKey="apiKey"
        v-model:apiUrl="apiUrl"
        v-model:modelName="modelName"
        v-model:apiStyle="apiStyle"
        v-model:streaming="streaming"
        v-model:temperature="temperature"
        v-model:maxTokens="maxTokens"
      />

      <ChatPanel
        ref="chatPanelRef"
        :conversationHistory="conversationHistory"
        :reasoningContent="reasoningContent"
        :isProcessing="isProcessing"
        :isThinking="isThinking"
        :isLastMessageStopped="isLastMessageStopped"
        :error="error"
        :streamProgress="streamProgress"
        :userInput="userInput"
        :isSearching="isSearching"
        :isTransforming="isTransforming"
        :enableWebSearch="enableWebSearch"
        :hotTopics="hotTopics"
        :isLoadingTopics="isLoadingTopics"
        @update:userInput="userInput = $event"
        @update:enableWebSearch="enableWebSearch = $event"
        @send="handleSendMessage"
        @clear="handleClearConversation"
        @optimize="handleOptimize"
        @stop="stopGeneration"
        @select-question="handleSelectQuestion"
        @refresh-topics="refreshHotTopics"
        @scroll="handleScroll"
      />
    </div>

    <!-- 搜索过程展示 -->
    <SearchProcessModal
      v-if="showSearchProcess"
      :steps="searchSteps"
      @close="showSearchProcess = false"
    />

    <!-- 关键词转换模态框 -->
    <TransformModal
      v-if="showTransformModal"
      :userInput="userInput"
      :selectedMode="selectedTransformMode"
      :transformResult="transformResult"
      :isTransforming="isTransforming"
      @close="closeTransformModal"
      @transform="performTransform"
      @apply="handleApplyTransform"
      @update:selectedMode="selectedTransformMode = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import PageHeader from './deepseek/PageHeader.vue';
import ConfigPanel from './deepseek/ConfigPanel.vue';
import ChatPanel from './deepseek/ChatPanel.vue';
import SearchProcessModal from './deepseek/modals/SearchProcessModal.vue';
import TransformModal from './deepseek/modals/TransformModal.vue';
import { useDeepseekApi } from '@/composables/useDeepseekApi';
import { usePromptStore } from '@/stores/prompt';
import { useHotTopics } from '@/composables/useHotTopics';
import { useScroll } from '@/composables/useScroll';
import { useWebSearch } from '@/composables/useWebSearch';
import { useTransform } from '@/composables/useTransform';

// 定义属性
const props = defineProps({
  apiBaseUrl: {
    type: String,
    default: "",
  },
  initialPrompt: {
    type: String,
    default: ''
  }
});

// 基本设置
const userInput = ref("");
const streaming = ref(true);
const temperature = ref(0.7);
const maxTokens = ref(2000);
const apiStyle = ref<'openai' | 'adapter'>("openai");
const modelName = ref(localStorage.getItem('modelName') || "deepseek-ai/DeepSeek-R1-Distill-Qwen-7B");
const isSending = ref(false);
const enableWebSearch = ref(false);

// 获取提示词store
const promptStore = usePromptStore();

// 使用API Hooks
const {
  apiKey,
  apiUrl,
  isProcessing,
  error,
  streamProgress,
  conversationHistory,
  reasoningContent,
  isThinking,
  isLastMessageStopped,
  sendChatMessage,
  streamChatMessage,
  stopGeneration
} = useDeepseekApi();

// 使用 Composables
const { hotTopics, isLoading: isLoadingTopics, fetchHotTopics, refreshHotTopics } = useHotTopics();
const { shouldAutoScroll, handleScroll: handleScrollEvent, scrollToBottom } = useScroll();
const {
  isSearching,
  showSearchProcess,
  searchResult,
  searchSteps,
  performSearch
} = useWebSearch();
const {
  showTransformModal,
  isTransforming,
  transformResult,
  selectedTransformMode,
  performTransform: performTransformInternal,
  applyTransform,
  openTransformModal,
  closeTransformModal
} = useTransform();

// 引用
const chatPanelRef = ref<InstanceType<typeof ChatPanel> | null>(null);

// 确保API Key从localStorage中加载
if (!apiKey.value) {
  const savedApiKey = localStorage.getItem('apiKey');
  if (savedApiKey) {
    apiKey.value = savedApiKey;
    console.log('从localStorage加载API Key成功');
  }
}

// 在组件挂载时初始化数据
onMounted(() => {
  // 设置API URL
  if (props.apiBaseUrl) {
    apiUrl.value = props.apiBaseUrl;
  }

  // 确保初始状态下滚动到底部
  nextTick(() => {
    scrollToBottomHelper(true);
  });

  // 获取热搜话题
  fetchHotTopics();

  // 只有当prompt库中有提示词时才设置输入内容
  if (promptStore.promptText) {
    userInput.value = promptStore.promptText;
    promptStore.clearPromptText();
  } else if (props.initialPrompt) {
    userInput.value = props.initialPrompt;
  }
});

// 监听apiBaseUrl变化
watch(
  () => props.apiBaseUrl,
  (newUrl) => {
    if (newUrl) {
      apiUrl.value = newUrl;
    }
  },
  { immediate: true }
);

// 监听对话历史和思维内容变化
watch([conversationHistory, reasoningContent], async () => {
  await nextTick();

  if (conversationHistory.length <= 1 || !shouldAutoScroll.value) {
    scrollToBottomHelper(true);
  } else if (shouldAutoScroll.value || isProcessing.value || isThinking.value) {
    scrollToBottomHelper(true);
  }
}, { deep: true });

// 监听标签切换
watch(() => chatPanelRef.value?.activeTab, async () => {
  await nextTick();
  scrollToBottomHelper(true);
});

/**
 * 滚动到底部辅助函数
 */
const scrollToBottomHelper = (forceScroll = false) => {
  if (!chatPanelRef.value) return;

  const activeTab = chatPanelRef.value.activeTab;
  const container = activeTab === 'output'
    ? chatPanelRef.value.chatContainerRef?.containerRef ?? null
    : chatPanelRef.value.thinkingContainerRef?.containerRef ?? null;

  scrollToBottom(container, forceScroll, isProcessing.value, isThinking.value);
};

/**
 * 处理滚动事件
 */
const handleScroll = (event: Event) => {
  handleScrollEvent(event);
};

/**
 * 设置示例问题
 */
const handleSelectQuestion = (question: string) => {
  userInput.value = question;
  nextTick(() => {
    const inputElement = document.getElementById('message-input');
    if (inputElement) {
      inputElement.focus();
    }
  });
};

/**
 * 清空对话确认
 */
const handleClearConversation = () => {
  if (conversationHistory.length === 0) {
    ElMessage({
      type: 'info',
      message: '当前没有对话记录'
    });
    return;
  }

  ElMessageBox.confirm(
    '此操作将删除所有对话历史、思维过程和输入内容，且不可撤销。',
    '清空所有对话',
    {
      confirmButtonText: '确定清空',
      cancelButtonText: '取消',
      type: 'warning',
      dangerouslyUseHTMLString: false
    }
  )
    .then(() => {
      conversationHistory.length = 0;
      reasoningContent.value = '';
      isThinking.value = false;
      isSearching.value = false;
      showSearchProcess.value = false;
      showTransformModal.value = false;
      isProcessing.value = false;
      isSending.value = false;
      userInput.value = '';

      ElMessage({
        type: 'success',
        message: '对话已清空'
      });

      console.log('对话已清空');
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消清空操作'
      });
    });
};

/**
 * 执行关键词转换
 */
const performTransform = async () => {
  await performTransformInternal(
    userInput.value,
    apiKey.value,
    apiUrl.value,
    modelName.value
  );
};

/**
 * 应用转换结果
 */
const handleApplyTransform = () => {
  const text = applyTransform();
  if (text) {
    userInput.value = text;
    nextTick(() => {
      const inputElement = document.getElementById('message-input');
      if (inputElement) {
        inputElement.focus();
      }
    });
  }
};

/**
 * 打开优化模态框
 */
const handleOptimize = () => {
  openTransformModal();
};

/**
 * 发送消息
 */
const handleSendMessage = async () => {
  if (isSending.value || isSearching.value) {
    console.log("已经在发送或搜索过程中，忽略此次点击");
    return;
  }

  isSending.value = true;

  try {
    if (!userInput.value.trim()) {
      return;
    }

    if (!apiKey.value) {
      apiKey.value = "temp_key_for_testing";
      console.log("使用临时API Key");
    }

    let input = userInput.value;

    // 如果启用了联网搜索，先进行搜索增强
    if (enableWebSearch.value && apiKey.value && apiUrl.value) {
      try {
        input = await performSearch(input, apiKey.value, apiUrl.value, modelName.value);

        // 在对话历史中添加搜索信息
        if (searchResult.value) {
          const searchInfo = `🔍 **联网搜索增强完成**

**原始查询：** ${userInput.value}

**搜索结果：** 找到 ${searchResult.value.searchResults.length} 个相关结果
${searchResult.value.searchResults.map((item, index) =>
  `${index + 1}. [${item.title}](${item.url}) - ${item.source}`
).join('\n')}

**搜索摘要：** ${searchResult.value.searchSummary}

**增强查询：** ${searchResult.value.enhancedQuery}

**相关建议：** ${searchResult.value.suggestions.join('、')}`;

          conversationHistory.push({
            role: 'system',
            content: searchInfo
          });
        }
      } catch (searchError: any) {
        console.error('联网搜索失败，停止发送:', searchError.message);

        conversationHistory.push({
          role: 'system',
          content: `❌ 联网搜索失败：${searchError.message}\n\n请检查网络连接或稍后重试。`
        });

        return;
      }
    }

    // 清除旧的思维内容
    reasoningContent.value = "";

    // 清空输入框
    userInput.value = "";

    // 自动滚动到最新内容
    await nextTick();
    scrollToBottomHelper();

    // 根据是否流式处理选择不同的发送方法
    if (streaming.value) {
      isThinking.value = true;
      await streamChatMessage(input, {
        onContent: (_: string) => {
          nextTick(() => {
            scrollToBottomHelper();
          });
        },
        onReasoning: (content: string) => {
          // 思维内容更新
        },
        onError: (error: any) => {
          console.error("流式请求出错:", error);
        },
        onComplete: () => {
          isThinking.value = false;
        }
      }, {
        temperature: temperature.value,
        maxTokens: maxTokens.value,
        model: modelName.value
      });
    } else {
      await sendChatMessage(input, {
        temperature: temperature.value,
        maxTokens: maxTokens.value,
        model: modelName.value
      });
    }

    await nextTick();
    scrollToBottomHelper();
  } catch (err) {
    console.error("发送消息时出错:", err);
  } finally {
    isSending.value = false;
  }
};
</script>

<style scoped>
/* Markdown 优化样式 */
:deep(.markdown-body) {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.7;
  word-wrap: break-word;
  color: #24292e;
  max-width: 100%;
}

:deep(.markdown-body h1),
:deep(.markdown-body h2),
:deep(.markdown-body h3),
:deep(.markdown-body h4),
:deep(.markdown-body h5),
:deep(.markdown-body h6) {
  margin-top: 28px;
  margin-bottom: 18px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: #1a202c;
}

:deep(.markdown-body h1) {
  font-size: 1.9em;
  padding-bottom: 0.3em;
  border-bottom: 1px solid #edf2f7;
}

:deep(.markdown-body h2) {
  font-size: 1.5em;
  padding-bottom: 0.3em;
  border-bottom: 1px solid #edf2f7;
}

:deep(.markdown-body p) {
  margin-top: 0;
  margin-bottom: 18px;
}

:deep(.markdown-body ul),
:deep(.markdown-body ol) {
  padding-left: 2em;
  margin-top: 0;
  margin-bottom: 18px;
}

:deep(.markdown-body blockquote) {
  padding: 0.75em 1em;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 18px;
  color: #4a5568;
  background-color: #f8fafc;
  border-left: 4px solid #e2e8f0;
  border-radius: 0 4px 4px 0;
}

:deep(.markdown-body pre) {
  margin-top: 0;
  margin-bottom: 18px;
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.5;
  background-color: #f8fafc;
  border-radius: 6px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
}

:deep(.markdown-body code) {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(226, 232, 240, 0.5);
  border-radius: 4px;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
}

:deep(.hljs) {
  background: #0d1117 !important;
  color: #c9d1d9 !important;
  padding: 1rem !important;
  border-radius: 0 !important;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace !important;
  font-size: 0.9rem !important;
  line-height: 1.5 !important;
  tab-size: 2;
}

/* 思维过程样式优化 */
.thinking-process {
  background: linear-gradient(to bottom right, rgb(248 250 252), rgb(255 255 255));
}

/* 动画效果 */
@keyframes thinking {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.animate-thinking {
  animation: thinking 2s ease-in-out infinite;
}

/* 代码块增强样式 */
:deep(.code-block) {
  margin: 1.25rem 0;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* 思考状态提示框动画 */
@keyframes pulse-soft {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.animate-pulse {
  animation: pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* 打字指示器球体动画优化 */
@keyframes bounce-subtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

.animate-bounce {
  animation: bounce-subtle 1.2s infinite;
}

/* 思考状态指示器的闪烁效果 */
@keyframes glow {
  0%, 100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
  50% { box-shadow: 0 0 15px rgba(59, 130, 246, 0.8); }
}

.thinking-indicator {
  animation: glow 1.5s ease-in-out infinite;
}
</style>
