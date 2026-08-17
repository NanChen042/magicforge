import { ref, watch, onMounted } from 'vue';

export interface Message {
  role: string;
  content: string;
  images?: string[];
  reasoning?: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    cache_hit_tokens?: number;
  };
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: Message[];
  modelName?: string;
}

const SESSIONS_KEY = 'magicforge_chat_sessions';
const CURRENT_SESSION_ID_KEY = 'magicforge_current_session_id';

export function useSessionHistory() {
  const sessions = ref<ChatSession[]>([]);
  const currentSessionId = ref<string>('');

  // 从 localStorage 加载
  const loadSessions = () => {
    try {
      const stored = localStorage.getItem(SESSIONS_KEY);
      if (stored) {
        sessions.value = JSON.parse(stored);
      }
      const savedId = localStorage.getItem(CURRENT_SESSION_ID_KEY);
      if (savedId && sessions.value.some(s => s.id === savedId)) {
        currentSessionId.value = savedId;
      } else if (sessions.value.length > 0) {
        currentSessionId.value = sessions.value[0].id;
      }
    } catch (e) {
      console.error('加载历史会话失败:', e);
      sessions.value = [];
    }
  };

  // 保存到 localStorage
  const saveSessions = () => {
    try {
      localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions.value));
      if (currentSessionId.value) {
        localStorage.setItem(CURRENT_SESSION_ID_KEY, currentSessionId.value);
      }
    } catch (e) {
      console.error('保存历史会话失败:', e);
    }
  };

  // 创建新会话
  const createNewSession = (initialModel?: string): ChatSession => {
    const newSession: ChatSession = {
      id: 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      title: '新对话',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [],
      modelName: initialModel
    };
    sessions.value.unshift(newSession);
    currentSessionId.value = newSession.id;
    saveSessions();
    return newSession;
  };

  // 删除某个会话
  const deleteSession = (sessionId: string) => {
    sessions.value = sessions.value.filter(s => s.id !== sessionId);
    if (currentSessionId.value === sessionId) {
      if (sessions.value.length > 0) {
        currentSessionId.value = sessions.value[0].id;
      } else {
        createNewSession();
      }
    }
    saveSessions();
  };

  // 清空所有历史会话
  const clearAllSessions = () => {
    sessions.value = [];
    localStorage.removeItem(SESSIONS_KEY);
    localStorage.removeItem(CURRENT_SESSION_ID_KEY);
    createNewSession();
  };

  // 更新当前会话的消息列表并更新标题
  const updateCurrentSession = (messages: Message[], modelName?: string) => {
    if (!currentSessionId.value) {
      createNewSession(modelName);
    }
    const session = sessions.value.find(s => s.id === currentSessionId.value);
    if (session) {
      // Object URLs are valid only for the live page. Persist text history, not stale image URLs.
      session.messages = messages.map(({ role, content, reasoning, usage }) => ({
        role,
        content,
        reasoning,
        usage
      }));
      session.updatedAt = Date.now();
      if (modelName) session.modelName = modelName;

      // 自动生成标题：取第一条 user 消息前 24 字
      const firstUserMsg = messages.find(m => m.role === 'user');
      if (firstUserMsg && (session.title === '新对话' || !session.title)) {
        session.title = firstUserMsg.content.trim().slice(0, 24) || '新对话';
      }
      saveSessions();
    }
  };

  // 切换选中会话
  const switchSession = (sessionId: string): ChatSession | undefined => {
    const found = sessions.value.find(s => s.id === sessionId);
    if (found) {
      currentSessionId.value = sessionId;
      saveSessions();
      return found;
    }
  };

  onMounted(() => {
    loadSessions();
    if (sessions.value.length === 0) {
      createNewSession();
    }
  });

  watch(sessions, saveSessions, { deep: true });

  return {
    sessions,
    currentSessionId,
    createNewSession,
    deleteSession,
    clearAllSessions,
    updateCurrentSession,
    switchSession
  };
}
