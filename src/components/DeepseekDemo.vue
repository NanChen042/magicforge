<template>
  <div class="w-full flex-1 flex flex-row min-h-0 relative overflow-hidden bg-white">
    
    <!-- 左侧会话历史目录 Sidebar -->
    <div 
      class="hidden xl:flex flex-col border-r border-slate-100 bg-white min-h-0 z-20 overflow-hidden relative transition-all duration-300 ease-in-out shrink-0"
      :class="showSidebar ? 'w-64 opacity-100' : 'w-0 opacity-0 border-r-0 pointer-events-none'"
    >
      <div class="w-64 h-full flex flex-col">
        <SessionSidebar
          :sessions="sessions"
          :currentSessionId="currentSessionId"
          @create-new="handleCreateNewSession"
          @select-session="handleSelectSession"
          @delete-session="handleDeleteSession"
          @clear-all="handleClearAllSessions"
          @toggle-collapse="showSidebar = false"
        />
      </div>
    </div>

    <!-- 中间：配置参数栏 (Desktop) -->
    <div 
      class="hidden xl:flex flex-col border-r border-slate-200/60 bg-white min-h-0 z-10 overflow-hidden relative shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-300 ease-in-out"
      :class="showDesktopConfig ? 'w-[300px] opacity-100' : 'w-0 opacity-0 border-r-0 pointer-events-none'"
    >
      <div class="w-[300px] h-full flex flex-col">
        <ConfigPanel
          v-model:apiKey="apiKey"
          v-model:modelName="modelName"
          v-model:systemPrompt="systemPrompt"
          v-model:streaming="streaming"
          v-model:temperature="temperature"
          v-model:maxTokens="maxTokens"
          v-model:topP="topP"
          v-model:topK="topK"
          v-model:frequencyPenalty="frequencyPenalty"
          v-model:presencePenalty="presencePenalty"
          @close="showDesktopConfig = false"
        />
      </div>
    </div>

    <!-- 主内容区域：全屏沉浸式 Chat 界面 -->
    <div class="flex-1 w-full flex flex-col min-h-0 relative">
      <ChatPanel
        ref="chatPanelRef"
        v-model:modelName="modelName"
        :conversationHistory="conversationHistory"
        :reasoningContent="reasoningContent"
        :isProcessing="isProcessing"
        :isThinking="isThinking"
        :isLastMessageStopped="isLastMessageStopped"
        :error="error"
        :streamProgress="streamProgress"
        :userInput="userInput"
        :isTransforming="isTransforming"
        :hotTopics="hotTopics"
        :isLoadingTopics="isLoadingTopics"
        :showReasoningTab="showReasoningTab"
        :modelType="currentModelType"
        :availableModels="availableModels"
        :modelsLoading="isLoadingModels"
        :modelLoadError="modelLoadError"
        :followUpSuggestions="followUpSuggestions"
        :isLoadingFollowUp="isLoadingFollowUp"
        :showFollowUp="showFollowUp"
        :supportsVision="supportsVision"
        :uploadedImages="uploadedImages"
        :isDesktopConfigVisible="showDesktopConfig"
        :isSidebarVisible="showSidebar"
        @toggle-sidebar="showSidebar = !showSidebar"
        @refresh-models="loadAvailableModels"
        @open-settings="handleOpenSettings"
        @update:userInput="userInput = $event"
        @send="handleSendMessage"
        @clear="handleClearConversation"
        @optimize="handleOptimize"
        @stop="stopGeneration"
        @select-question="handleSelectQuestion"
        @refresh-topics="handleRefreshTopics"
        @scroll="handleScroll"
        @select-follow-up="handleSelectFollowUp"
        @refresh-follow-up="handleRefreshFollowUp"
        @upload-images="handleUploadImages"
        @remove-image="handleRemoveImage"
        @regenerate="handleRegenerate"
        @switch-free-model="handleSwitchFreeModel"
      />
    </div>

    <!-- Element Plus 左侧抽屉：系统配置与参数设置 -->
    <el-drawer
      v-model="showSettingsDrawer"
      title="系统配置与 API 参数"
      direction="ltr"
      size="380px"
      append-to-body
      :destroy-on-close="false"
      class="config-drawer"
    >
      <ConfigPanel
        v-model:apiKey="apiKey"
        v-model:modelName="modelName"
        v-model:systemPrompt="systemPrompt"
        v-model:streaming="streaming"
        v-model:temperature="temperature"
        v-model:maxTokens="maxTokens"
        v-model:topP="topP"
        v-model:topK="topK"
        v-model:frequencyPenalty="frequencyPenalty"
        v-model:presencePenalty="presencePenalty"
      />
    </el-drawer>

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
      @update:transformResult="updateTransformResult"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { ElMessageBox, ElMessage } from 'element-plus';
import ConfigPanel from './deepseek/ConfigPanel.vue';
import ChatPanel from './deepseek/ChatPanel.vue';
import SessionSidebar from './deepseek/SessionSidebar.vue';
import TransformModal from './deepseek/modals/TransformModal.vue';
import { useDeepseekApi } from '@/composables/useDeepseekApi';
import { useApiStore } from '@/stores/api';
import { SiliconFlowClient, type SiliconFlowModel } from '@/services/siliconFlowClient';
import { useSessionHistory } from '@/composables/useSessionHistory';
import { usePromptStore } from '@/stores/prompt';
import { useHotTopics } from '@/composables/useHotTopics';
import { useScroll } from '@/composables/useScroll';
import { useTransform } from '@/composables/useTransform';
import { useFollowUpSuggestions } from '@/composables/useFollowUpSuggestions';
import { isReasoningModel, getModelConfig, supportsVision as checkSupportsVision } from '@/constants/modelConfig';

// 图片上传接口
interface UploadedImage {
  file: File;
  preview: string;
  base64?: string;
}

// 定义属性
const props = defineProps({
  initialPrompt: {
    type: String,
    default: ''
  }
});

// 基本设置
const showSidebar = ref(true);
const showDesktopConfig = ref(true);
const userInput = ref("");
const streaming = ref(true);
const temperature = ref(0.7);
const maxTokens = ref(2000);
const topP = ref(0.9);
// SiliconFlow uses -1 to disable top_k. Zero is invalid and causes a 400 response.
const topK = ref(-1);
const frequencyPenalty = ref(0);
const presencePenalty = ref(0);
const systemPrompt = ref(localStorage.getItem('systemPrompt') || '');
// Older builds exposed a one-click JSON preset and persisted it indefinitely.
// Remove only that exact legacy value so ordinary conversations return natural language again.
if (systemPrompt.value.trim() === '仅输出合法 JSON，不要使用 Markdown，也不要补充解释。') {
  systemPrompt.value = '';
  localStorage.removeItem('systemPrompt');
}
watch(systemPrompt, (newVal) => {
  localStorage.setItem('systemPrompt', newVal || '');
});
const apiStore = useApiStore();
const { modelName } = storeToRefs(apiStore);
const availableModels = ref<SiliconFlowModel[]>([]);
const isLoadingModels = ref(false);
const modelLoadError = ref('');
watch(modelName, (newModel) => {
  if (newModel) {
    apiStore.setModelName(newModel);
    const config = getModelConfig(newModel);
    const name = config ? config.name : newModel;
    ElMessage.success({
      message: `已切换至 ${name}`,
      duration: 2000,
      plain: true
    });
  }
});
const isSending = ref(false);
const showSettingsDrawer = ref(false);

// 使用会话历史 Composable
const {
  sessions,
  currentSessionId,
  createNewSession,
  deleteSession,
  clearAllSessions,
  updateCurrentSession,
  switchSession
} = useSessionHistory();

// 判断当前模型是否支持思考过程
const showReasoningTab = computed(() => isReasoningModel(modelName.value));

// 获取当前模型类型
const currentModelType = computed(() => {
  const config = getModelConfig(modelName.value);
  return config?.type || 'chat';
});

// 判断当前模型是否支持视觉输入
const supportsVision = computed(() => checkSupportsVision(modelName.value));

const isAuthorizedModel = computed(() => {
  return !isLoadingModels.value && !modelLoadError.value && availableModels.value.some((model) => model.id === modelName.value);
});

// 上传的图片列表
const uploadedImages = ref<UploadedImage[]>([]);

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
  stopGeneration,
  clearHistory
} = useDeepseekApi();

const loadAvailableModels = async () => {
  if (!apiKey.value.trim()) {
    availableModels.value = [];
    modelLoadError.value = '请先填写 SiliconFlow API Key。';
    return;
  }

  isLoadingModels.value = true;
  modelLoadError.value = '';
  try {
    const client = new SiliconFlowClient({ apiUrl: apiUrl.value, apiKey: apiKey.value });
    const models = await client.listModels();
    availableModels.value = models.sort((a, b) => a.id.localeCompare(b.id));

    if (!availableModels.value.some((model) => model.id === modelName.value)) {
      const configuredDefault = import.meta.env.VITE_DEEPSEEK_MODEL;
      const nextModel = availableModels.value.find((model) => model.id === configuredDefault) || availableModels.value[0];
      if (nextModel) apiStore.setModelName(nextModel.id);
    }
  } catch (err) {
    availableModels.value = [];
    modelLoadError.value = err instanceof Error ? err.message : '无法获取模型列表。';
    console.warn('Unable to load the authorized model list.', err);
  } finally {
    isLoadingModels.value = false;
  }
};

watch([apiKey, apiUrl], () => {
  void loadAvailableModels();
});

// 初始化时将保存的当前会话消息同步至 conversationHistory
onMounted(() => {
  const current = sessions.value.find(s => s.id === currentSessionId.value);
  if (current && current.messages.length > 0) {
    conversationHistory.splice(0, conversationHistory.length, ...current.messages);
  }
});

// 监听对话历史更新并回写到 SessionHistory
watch(conversationHistory, (newMsgs) => {
  updateCurrentSession(newMsgs, modelName.value);
}, { deep: true });

// 切换选中的历史会话
const handleSelectSession = (sessionId: string) => {
  const s = switchSession(sessionId);
  if (s) {
    conversationHistory.splice(0, conversationHistory.length, ...s.messages);
  }
};

// 新建对话
const handleCreateNewSession = () => {
  createNewSession(modelName.value);
  conversationHistory.splice(0, conversationHistory.length);
};

// 删除单个会话
const handleDeleteSession = (sessionId: string) => {
  deleteSession(sessionId);
  const current = sessions.value.find(s => s.id === currentSessionId.value);
  if (current) {
    conversationHistory.splice(0, conversationHistory.length, ...current.messages);
  } else {
    conversationHistory.splice(0, conversationHistory.length);
  }
};

// 清空所有历史会话
const handleClearAllSessions = () => {
  ElMessageBox.confirm(
    '此操作将永久清空所有历史对话记录，不可恢复。',
    '清空全部历史会话',
    {
      confirmButtonText: '确定清空',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    clearAllSessions();
    conversationHistory.splice(0, conversationHistory.length);
  });
};

// 使用 Composables
const { hotTopics, isLoading: isLoadingTopics, fetchHotTopics, refreshHotTopics } = useHotTopics();
const { shouldAutoScroll, handleScroll: handleScrollEvent, scrollToBottom, resetAutoScroll } = useScroll();
const {
  showTransformModal,
  isTransforming,
  transformResult,
  selectedTransformMode,
  performTransform: performTransformInternal,
  applyTransform,
  updateTransformResult,
  openTransformModal,
  closeTransformModal
} = useTransform();

// 后续问题推荐
const {
  suggestions: followUpSuggestions,
  isLoading: isLoadingFollowUp,
  generateSuggestions,
  refreshSuggestions,
  clearSuggestions
} = useFollowUpSuggestions();

// 是否显示后续问题推荐
const showFollowUp = computed(() => {
  return conversationHistory.length > 0 
    && !isProcessing.value 
    && !isThinking.value 
    && followUpSuggestions.value.length > 0;
});

// 引用
const chatPanelRef = ref<InstanceType<typeof ChatPanel> | null>(null);

// 确保API Key从localStorage中加载
if (!apiKey.value) {
  const savedApiKey = '';
  if (savedApiKey) {
    apiKey.value = savedApiKey;
    console.log('从localStorage加载API Key成功');
  }
}

// 在组件挂载时初始化数据
onMounted(() => {
  // 确保初始状态下滚动到底部
  nextTick(() => {
    scrollToBottomHelper(true);
  });

  // 获取热搜话题
  fetchHotTopics();
  void loadAvailableModels();

  // 只有当prompt库中有提示词时才设置输入内容
  if (promptStore.promptText) {
    userInput.value = promptStore.promptText;
    promptStore.clearPromptText();
  } else if (props.initialPrompt) {
    userInput.value = props.initialPrompt;
  }
});

// 监听对话历史和思维内容变化
watch([conversationHistory, reasoningContent], async () => {
  await nextTick();

  // 只有在用户没有手动滚动离开底部时才自动滚动
  if (shouldAutoScroll.value) {
    scrollToBottomHelper(false);
  }
}, { deep: true });

/**
 * 滚动到底部辅助函数
 */
const scrollToBottomHelper = (forceScroll = false) => {
  if (!chatPanelRef.value) return;

  const container = chatPanelRef.value.chatContainerRef ?? null;
  scrollToBottom(container, forceScroll);
};

/**
 * 处理滚动事件
 */
const handleScroll = (event: Event) => {
  handleScrollEvent(event);
};

const handleOpenSettings = () => {
    if (window.innerWidth >= 1280) {
    showDesktopConfig.value = !showDesktopConfig.value;
  } else {
    showSettingsDrawer.value = true;
  }
};


/**
 * 刷新热门话题（使用 AI 生成）
 */
const handleRefreshTopics = () => {
  refreshHotTopics(apiKey.value, modelName.value);
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
      // 使用 composable 提供的 clearHistory 方法
      clearHistory();
      
      // 重置其他状态
      showTransformModal.value = false;
      isSending.value = false;
      userInput.value = '';
      
      // 清空后续问题推荐
      clearSuggestions();

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
 * 选择后续问题
 */
const handleSelectFollowUp = (question: string) => {
  userInput.value = question;
  // 清空当前推荐
  clearSuggestions();
  nextTick(() => {
    const inputElement = document.getElementById('message-input');
    if (inputElement) {
      inputElement.focus();
    }
  });
};

/**
 * 刷新后续问题推荐
 */
const handleRefreshFollowUp = () => {
  refreshSuggestions(apiKey.value, modelName.value);
};

/**
 * 处理图片上传
 */
const handleUploadImages = async (files: File[]) => {
  for (const file of files) {
    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      ElMessage.warning(`${file.name} 不是有效的图片文件`);
      continue;
    }

    // 检查文件大小 (限制 10MB)
    if (file.size > 10 * 1024 * 1024) {
      ElMessage.warning(`${file.name} 超过 10MB 大小限制`);
      continue;
    }

    // 创建预览 URL
    const preview = URL.createObjectURL(file);

    // 转换为 base64
    const base64 = await fileToBase64(file);

    uploadedImages.value.push({
      file,
      preview,
      base64
    });
  }

  // 限制最多 4 张图片
  if (uploadedImages.value.length > 4) {
    uploadedImages.value = uploadedImages.value.slice(-4);
    ElMessage.info('最多支持 4 张图片');
  }
};

/**
 * 移除上传的图片
 */
const handleRemoveImage = (index: number) => {
  const removed = uploadedImages.value.splice(index, 1);
  // 释放预览 URL
  if (removed[0]?.preview) {
    URL.revokeObjectURL(removed[0].preview);
  }
};

/**
 * 将文件转换为 base64
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // 移除 data:image/xxx;base64, 前缀
      const commaIndex = result.indexOf(',');
      const base64 = commaIndex >= 0 ? result.substring(commaIndex + 1) : result;
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * 清空上传的图片
 */
const clearUploadedImages = () => {
  uploadedImages.value.forEach(img => {
    if (img.preview) {
      URL.revokeObjectURL(img.preview);
    }
  });
  uploadedImages.value = [];
};

/**
 * 发送消息
 */
const handleSendMessage = async () => {
  if (isSending.value) {
    console.log("已经在发送过程中，忽略此次点击");
    return;
  }

  isSending.value = true;

  try {
    if (!userInput.value.trim()) {
      return;
    }

    if (!apiKey.value.trim()) {
      ElMessage.warning('请先在模型配置中填写 SiliconFlow API Key');
      handleOpenSettings();
      return;
    }

    const input = userInput.value;

    // 清除旧的思维内容
    reasoningContent.value = "";

    // 清空输入框
    userInput.value = "";

    // 重置自动滚动状态，确保新消息时滚动到底部
    resetAutoScroll();

    // 自动滚动到最新内容
    await nextTick();
    scrollToBottomHelper(true);

    // 根据是否流式处理选择不同的发送方法
    if (streaming.value) {
      isThinking.value = true;
      const originalInput = input;

      // 准备图片数据
      const images = uploadedImages.value
        .filter(img => img.base64)
        .map(img => ({
          base64: img.base64!,
          mimeType: img.file.type || 'image/jpeg'
        }));

      // 图片预览 URL 列表
      const imageUrls = uploadedImages.value.map(img => img.preview);

      await streamChatMessage(input, {
        onContent: () => {
          nextTick(() => {
            scrollToBottomHelper();
          });
        },
        onReasoning: () => {
          // 思维内容更新
        },
        onError: (error: any) => {
          console.error("流式请求出错:", error);
        },
        onComplete: () => {
          isThinking.value = false;
          // 生成后续问题推荐
          const lastMessage = conversationHistory[conversationHistory.length - 1];
          if (lastMessage && lastMessage.role === 'assistant') {
            generateSuggestions(
              originalInput,
              lastMessage.content,
              apiKey.value,
              modelName.value
            );
          }
        }
      }, {
        temperature: temperature.value,
        maxTokens: maxTokens.value,
        model: modelName.value,
        systemPrompt: systemPrompt.value,
        topP: topP.value,
        topK: topK.value,
        frequencyPenalty: frequencyPenalty.value,
        presencePenalty: presencePenalty.value,
        images: images.length > 0 ? images : undefined,
        imageUrls: imageUrls.length > 0 ? imageUrls : undefined
      });

      // 清空上传的图片
      uploadedImages.value = [];
    } else {
      // 准备图片数据
      const images = uploadedImages.value
        .filter(img => img.base64)
        .map(img => ({
          base64: img.base64!,
          mimeType: img.file.type || 'image/jpeg'
        }));

      // 图片预览 URL 列表
      const imageUrls = uploadedImages.value.map(img => img.preview);

      await sendChatMessage(input, {
        temperature: temperature.value,
        maxTokens: maxTokens.value,
        model: modelName.value,
        systemPrompt: systemPrompt.value,
        topP: topP.value,
        topK: topK.value,
        frequencyPenalty: frequencyPenalty.value,
        presencePenalty: presencePenalty.value,
        images: images.length > 0 ? images : undefined,
        imageUrls: imageUrls.length > 0 ? imageUrls : undefined
      });

      // 清空上传的图片
      uploadedImages.value = [];

      // 非流式模式也生成后续问题
      const lastMessage = conversationHistory[conversationHistory.length - 1];
      if (lastMessage && lastMessage.role === 'assistant') {
        generateSuggestions(
          input,
          lastMessage.content,
          apiKey.value,
          modelName.value
        );
      }
    }

    await nextTick();
    scrollToBottomHelper();
  } catch (err) {
    console.error("发送消息时出错:", err);
  } finally {
    isSending.value = false;
  }
};

/**
 * 重新生成最近一次回答
 */
const handleRegenerate = async () => {
  if (isSending.value || isProcessing.value) return;
  if (conversationHistory.length < 2) return;

  const lastIndex = conversationHistory.length - 1;
  if (conversationHistory[lastIndex].role !== 'assistant') return;

  const userMsgIndex = lastIndex - 1;
  if (userMsgIndex < 0 || conversationHistory[userMsgIndex].role !== 'user') return;

  const lastUserPrompt = conversationHistory[userMsgIndex].content;

  // 移除最近一条 AI 回答和对应用户消息，重新触发发送流程
  conversationHistory.splice(userMsgIndex, 2);

  userInput.value = lastUserPrompt;
  await handleSendMessage();
};

/**
 * 一键切换为全免费模型并重新发起推演
 */
const handleSwitchFreeModel = async () => {
  const freeModel = 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B';
  modelName.value = freeModel;
  apiStore.setModelName(freeModel);
  ElMessage({
    type: 'success',
    message: `已切换为全免费模型：DeepSeek R1 (Distill 7B)，正在重新请求...`
  });
  await handleRegenerate();
};
</script>

<style scoped>
/* 全局 Markdown 样式覆盖 */
:deep(.markdown-body) {
  font-family: -apple-system, BlinkMacSystemFont, "Microsoft YaHei", "微软雅黑", "PingFang SC", "Hiragino Sans GB", "Segoe UI", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.75;
  word-wrap: break-word;
  color: #374151;
  max-width: 100%;
}

/* 代码高亮主题 - VS Code Dark+ */
:deep(.hljs) {
  background: transparent !important;
  color: #d4d4d4 !important;
  padding: 0 !important;
}

:deep(.hljs-keyword) { color: #569cd6; }
:deep(.hljs-string) { color: #ce9178; }
:deep(.hljs-number) { color: #b5cea8; }
:deep(.hljs-function) { color: #dcdcaa; }
:deep(.hljs-comment) { color: #6a9955; font-style: italic; }
:deep(.hljs-class) { color: #4ec9b0; }
:deep(.hljs-variable) { color: #9cdcfe; }
:deep(.hljs-operator) { color: #d4d4d4; }
:deep(.hljs-punctuation) { color: #d4d4d4; }
:deep(.hljs-property) { color: #9cdcfe; }
:deep(.hljs-attr) { color: #9cdcfe; }
:deep(.hljs-selector-class) { color: #d7ba7d; }
:deep(.hljs-selector-id) { color: #d7ba7d; }
:deep(.hljs-tag) { color: #569cd6; }
:deep(.hljs-name) { color: #569cd6; }
:deep(.hljs-attribute) { color: #9cdcfe; }
:deep(.hljs-built_in) { color: #4ec9b0; }
:deep(.hljs-type) { color: #4ec9b0; }
:deep(.hljs-params) { color: #9cdcfe; }
:deep(.hljs-literal) { color: #569cd6; }
:deep(.hljs-symbol) { color: #b5cea8; }
:deep(.hljs-meta) { color: #9cdcfe; }
:deep(.hljs-title) { color: #dcdcaa; }

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

/* Element Plus Drawer 抽屉精细化封装覆写 */
:deep(.config-drawer .el-drawer__header) {
  margin-bottom: 0;
  padding: 16px 20px;
  border-bottom: 1px solid #e4e4e7;
  font-weight: 700;
  font-size: 14px;
  color: #09090b;
}

:deep(.config-drawer .el-drawer__body) {
  padding: 0;
  overflow-y: auto;
}
</style>
