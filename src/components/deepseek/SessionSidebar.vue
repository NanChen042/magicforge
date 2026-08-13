<template>
  <div class="w-64 shrink-0 bg-white border-r border-slate-100 flex flex-col h-full min-h-0 select-none text-slate-800 font-sans shadow-[4px_0_24px_rgba(0,0,0,0.01)] relative z-20 overflow-hidden">
    
    <!-- Top Brand Header & Sidebar Toggle -->
    <div class="px-4 py-3.5 flex items-center justify-between border-b border-slate-100">
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 rounded-md overflow-hidden flex items-center justify-center border border-slate-100 bg-white shadow-sm">
          <img src="@/assets/ai.png" alt="MagicForge Logo" class="w-full h-full object-cover" />
        </div>
        <span class="font-bold text-sm text-zinc-900 tracking-tight">MagicForge</span>
      </div>

      <div class="flex items-center gap-1">
        <button
          @click="$emit('toggle-collapse')"
          class="p-1 text-zinc-400 hover:text-blue-600 rounded-sm hover:bg-blue-50 transition-colors cursor-pointer"
          title="收起边栏"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Primary Action: New Chat Button (DeepSeek Style Pill Button) -->
    <div class="px-3 py-3">
      <button
        @click="$emit('create-new')"
          class="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white hover:bg-blue-50 text-blue-600 border border-blue-200/80 rounded-sm text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
      >
        <svg class="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        <span>开启新对话</span>
      </button>
    </div>

    <!-- History Session List Grouped by Time (DeepSeek Official Style) -->
    <div class="flex-1 overflow-y-auto px-2 space-y-4 custom-scrollbar pb-4">
      <div v-if="groupedSessions.length === 0" class="text-center py-10 text-xs text-zinc-400 font-light">
        暂无历史对话
      </div>

      <div v-for="group in groupedSessions" :key="group.label" class="space-y-1">
        <div class="px-3 pt-2 text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono">
          {{ group.label }}
        </div>

        <div
          v-for="session in group.items"
          :key="session.id"
          @click="$emit('select-session', session.id)"
          class="group relative flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all cursor-pointer"
          :class="currentSessionId === session.id
            ? 'bg-blue-50 text-blue-700 font-bold border border-blue-100/50'
            : 'bg-transparent text-zinc-600 hover:bg-blue-50/50 hover:text-blue-600 border border-transparent'"
        >
          <span class="truncate tracking-tight flex-1 pr-2">{{ session.title || '新对话' }}</span>

          <!-- Delete Session Icon -->
          <button
            @click.stop="$emit('delete-session', session.id)"
            class="opacity-0 group-hover:opacity-100 p-1 text-zinc-400 hover:text-red-600 transition-opacity rounded-sm cursor-pointer"
            title="删除该会话"
          >
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Bottom Toolbar -->
    <div class="p-3 border-t border-slate-100 bg-white/50 flex items-center justify-between">
      <span class="text-[11px] font-mono text-zinc-400">历史会话 ({{ sessions.length }})</span>
      
      <button
        @click="$emit('clear-all')"
        class="text-[11px] text-zinc-400 hover:text-red-600 transition-colors cursor-pointer"
        title="清空所有会话"
      >
        清空全部
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ChatSession } from '@/composables/useSessionHistory';

const props = defineProps<{
  sessions: ChatSession[];
  currentSessionId: string;
}>();

defineEmits<{
  'create-new': [];
  'select-session': [sessionId: string];
  'delete-session': [sessionId: string];
  'clear-all': [];
  'toggle-collapse': [];
}>();

// 按时间（今天、昨天、更早）分组
const groupedSessions = computed(() => {
  if (!props.sessions || props.sessions.length === 0) return [];

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const yesterdayStart = todayStart - 86400000;

  const todayItems: ChatSession[] = [];
  const yesterdayItems: ChatSession[] = [];
  const earlierItems: ChatSession[] = [];

  props.sessions.forEach(s => {
    const time = s.updatedAt || s.createdAt || 0;
    if (time >= todayStart) {
      todayItems.push(s);
    } else if (time >= yesterdayStart) {
      yesterdayItems.push(s);
    } else {
      earlierItems.push(s);
    }
  });

  const result = [];
  if (todayItems.length > 0) result.push({ label: '今天', items: todayItems });
  if (yesterdayItems.length > 0) result.push({ label: '昨天', items: yesterdayItems });
  if (earlierItems.length > 0) result.push({ label: '此前', items: earlierItems });

  return result;
});
</script>
