<template>
  <div class="flex h-screen bg-[#F1F5F9] font-sans text-slate-800 overflow-hidden">
    
      <!-- 1. 左侧导航栏 (修复与增强版) -->
    <aside class="w-64 bg-[#0F172A] flex flex-col border-r border-slate-800 shrink-0 transition-all duration-300 z-20">
      
      <!-- Logo 区域 -->
      <div class="h-16 flex items-center px-6 border-b border-slate-800/50 bg-[#0F172A]">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mr-3 shadow-lg shadow-indigo-500/20 ring-1 ring-white/10">
          <el-icon class="text-white text-lg"><Connection /></el-icon>
        </div>
        <div>
          <h1 class="text-white font-bold text-lg tracking-tight leading-none">MCP Hub</h1>
          <span class="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Agent Platform</span>
        </div>
      </div>

      <!-- 导航菜单 -->
      <div class="flex-1 overflow-y-auto py-6 px-3 space-y-8 custom-scrollbar">
        
        <!-- 分组 1: Platform -->
        <div class="space-y-1">
          <div class="px-3 mb-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Platform</div>
          
          <div 
            v-for="item in menuGroup1" 
            :key="item.label"
            class="group flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200"
            :class="currentRoute === item.id ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'"
            @click="currentRoute = item.id"
          >
            <div class="flex items-center gap-3">
              <el-icon :size="18" :class="currentRoute === item.id ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'">
                <component :is="item.icon" />
              </el-icon>
              <span class="text-sm font-medium">{{ item.label }}</span>
            </div>
            <span v-if="item.badge" class="px-1.5 py-0.5 rounded-[4px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 text-[10px] font-bold">
              {{ item.badge }}
            </span>
          </div>
        </div>

        <!-- 分组 2: Resources -->
        <div class="space-y-1">
          <div class="px-3 mb-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Resources</div>
          
          <div 
            v-for="item in menuGroup2" 
            :key="item.label"
            class="group flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200"
            :class="currentRoute === item.id ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'"
            @click="currentRoute = item.id"
          >
            <div class="flex items-center gap-3">
              <el-icon :size="18" :class="currentRoute === item.id ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'">
                <component :is="item.icon" />
              </el-icon>
              <span class="text-sm font-medium">{{ item.label }}</span>
            </div>
          </div>
        </div>

        <!-- 分组 3: System -->
        <div class="space-y-1">
          <div class="px-3 mb-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">System</div>
          <div 
            class="group flex items-center px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
            @click="showApiConfig = true"
          >
            <div class="flex items-center gap-3">
              <el-icon :size="18" class="text-slate-500 group-hover:text-slate-300"><Setting /></el-icon>
              <span class="text-sm font-medium">API 配置</span>
            </div>
          </div>
        </div>

      </div>

      <!-- 底部用户信息 -->
      <div class="p-4 border-t border-slate-800/50 bg-[#0B1120]">
        <div class="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 transition-colors cursor-pointer border border-white/5 hover:border-white/10 group">
          <div class="relative">
             <el-avatar :size="36" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" class="ring-2 ring-slate-700 group-hover:ring-indigo-500 transition-all" />
             <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
          </div>
          <div class="flex flex-col overflow-hidden">
            <span class="text-sm font-semibold text-slate-200 truncate group-hover:text-white">Admin User</span>
            <span class="text-xs text-slate-500 truncate group-hover:text-indigo-300">Pro Workspace</span>
          </div>
          <el-icon class="ml-auto text-slate-500 group-hover:text-white"><ArrowRight /></el-icon>
        </div>
      </div>
    </aside>


    <!-- 2. 主内容区域 (Main Content) -->
    <main class="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
      <!-- 顶部工具栏 -->
      <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10">
        <div class="flex items-center gap-4">
          <h2 class="text-xl font-bold text-slate-800">智能体编排</h2>
          <el-tag type="info" size="small" effect="plain" class="!rounded-full px-3">Workspace: Default</el-tag>
        </div>
        <div class="flex items-center gap-3">
           <el-button type="primary" @click="showCreateAgent = true" class="!rounded-lg !px-5 !bg-indigo-600 !border-indigo-600 hover:!bg-indigo-700 hover:!shadow-lg hover:!shadow-indigo-500/20 transition-all">
             <el-icon class="mr-2"><Plus /></el-icon>新建智能体
           </el-button>
        </div>
      </header>

      <!-- 内容滚动区 -->
      <div class="flex-1 overflow-y-auto p-8">
        
        <!-- 统计概览 -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
           <stat-card title="运行中智能体" value="3" icon="VideoPlay" color="text-emerald-500" bg="bg-emerald-50" />
           <stat-card title="已连接 MCP Server" value="12" icon="Connection" color="text-blue-500" bg="bg-blue-50" />
           <stat-card title="今日调用次数" value="1,284" icon="DataLine" color="text-indigo-500" bg="bg-indigo-50" />
           <stat-card title="Token 消耗" value="850k" icon="Coin" color="text-orange-500" bg="bg-orange-50" />
        </div>

        <!-- 智能体列表 (Grid View) -->
        <div class="mb-6 flex justify-between items-center">
           <div class="relative w-72">
             <el-input v-model="searchKeyword" placeholder="搜索智能体..." prefix-icon="Search" class="!w-full" />
           </div>
           <div class="flex gap-2">
             <el-radio-group v-model="viewMode" size="small">
               <el-radio-button label="grid"><el-icon><Menu /></el-icon></el-radio-button>
               <el-radio-button label="list"><el-icon><List /></el-icon></el-radio-button>
             </el-radio-group>
           </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div 
            v-for="agent in filteredAgents" 
            :key="agent.id" 
            class="group bg-white rounded-xl border border-slate-200 p-6 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 cursor-pointer relative overflow-hidden"
            @click="selectAgent(agent)"
          >
            <!-- 顶部装饰条 -->
            <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div class="flex justify-between items-start mb-4">
               <div class="flex items-center gap-4">
                 <div class="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform">
                   {{ agent.avatar || '🤖' }}
                 </div>
                 <div>
                   <h3 class="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{{ agent.name }}</h3>
                   <div class="flex items-center gap-2 mt-1">
                     <span class="w-2 h-2 rounded-full" :class="agent.status === 'active' ? 'bg-emerald-500' : 'bg-slate-300'"></span>
                     <span class="text-xs text-slate-500">{{ agent.status === 'active' ? 'Online' : 'Offline' }}</span>
                   </div>
                 </div>
               </div>
               <el-dropdown trigger="click" @command="handleAgentAction">
                 <el-button link class="!text-slate-400 hover:!text-slate-600"><el-icon class="text-lg"><MoreFilled /></el-icon></el-button>
                 <template #dropdown>
                   <el-dropdown-menu>
                     <el-dropdown-item :command="{action: 'edit', agent}">配置</el-dropdown-item>
                     <el-dropdown-item :command="{action: 'debug', agent}">调试</el-dropdown-item>
                     <el-dropdown-item divided class="!text-red-500" :command="{action: 'delete', agent}">删除</el-dropdown-item>
                   </el-dropdown-menu>
                 </template>
               </el-dropdown>
            </div>

            <p class="text-sm text-slate-500 line-clamp-2 mb-6 h-10">{{ agent.description }}</p>

            <!-- 能力标签 -->
            <div class="flex flex-wrap gap-2 mb-6">
               <span v-for="tool in agent.tools.slice(0, 3)" :key="tool" class="px-2 py-1 rounded-md bg-slate-50 text-slate-600 text-xs font-medium border border-slate-100 flex items-center gap-1">
                 <el-icon><Tools /></el-icon> {{ getToolDisplayName(tool) }}
               </span>
               <span v-if="agent.tools.length > 3" class="px-2 py-1 rounded-md bg-slate-50 text-slate-400 text-xs font-medium border border-slate-100">+{{ agent.tools.length - 3 }}</span>
            </div>

            <div class="flex items-center justify-between pt-4 border-t border-slate-100">
               <div class="text-xs text-slate-400 font-mono">{{ agent.config.model.split('/').pop() }}</div>
               <el-button type="primary" plain size="small" class="!rounded-lg" @click.stop="chatWithAgent(agent)">
                 Start Chat <el-icon class="ml-1"><ArrowRight /></el-icon>
               </el-button>
            </div>
          </div>

          <!-- 创建卡片 (Placeholder) -->
          <div @click="showCreateAgent = true" class="group border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all min-h-[260px]">
             <div class="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
               <el-icon class="text-2xl"><Plus /></el-icon>
             </div>
             <div class="text-center">
               <h3 class="text-base font-bold text-slate-600 group-hover:text-indigo-600">创建新智能体</h3>
               <p class="text-xs text-slate-400 mt-1">集成 MCP 工具，构建超级助手</p>
             </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 3. 抽屉式调试控制台 (Debug Console) - 替代弹窗 -->
    <el-drawer
      v-model="showChatDialog"
      :title="null"
      :with-header="false"
      size="50%"
      class="!bg-white"
    >
      <div class="h-full flex flex-col">
        <!-- 调试头 -->
        <div class="h-14 border-b border-slate-200 flex items-center justify-between px-6 bg-slate-50">
           <div class="flex items-center gap-3">
             <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             <span class="font-bold text-slate-700">Debugging: {{ currentChatAgent?.name }}</span>
             <el-tag size="small" type="info">{{ currentChatAgent?.config.model }}</el-tag>
           </div>
           <div class="flex items-center gap-2">
              <el-button circle size="small" @click="clearChat"><el-icon><Delete /></el-icon></el-button>
              <el-button circle size="small" @click="showChatDialog = false"><el-icon><Close /></el-icon></el-button>
           </div>
        </div>

        <!-- 聊天区域 -->
        <div class="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50" ref="chatMessagesRef">
           <div v-for="msg in chatMessages" :key="msg.id" class="flex gap-4" :class="msg.role === 'user' ? 'flex-row-reverse' : ''">
              <!-- 头像 -->
              <div class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-lg shadow-sm" :class="msg.role === 'user' ? 'bg-indigo-100' : 'bg-white border border-slate-200'">
                {{ msg.role === 'user' ? '👤' : (currentChatAgent?.avatar || '🤖') }}
              </div>
              
              <!-- 消息体 -->
              <div class="max-w-[80%]">
                 <div class="text-xs text-slate-400 mb-1" :class="msg.role === 'user' ? 'text-right' : ''">{{ msg.role.toUpperCase() }} • {{ formatTime(msg.timestamp) }}</div>
                 <div class="p-4 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap" 
                      :class="msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'">
                    {{ msg.content }}
                    <span v-if="msg.streaming" class="inline-block w-2 h-4 align-middle bg-indigo-400 animate-pulse ml-1"></span>
                 </div>
                 
                 <!-- 工具调用日志 (Trace) -->
                 <div v-if="msg.toolCalls && msg.toolCalls.length" class="mt-2 space-y-2">
                    <div v-for="(tool, idx) in msg.toolCalls" :key="idx" class="bg-slate-100 border border-slate-200 rounded-lg p-3 text-xs font-mono">
                       <div class="flex items-center gap-2 text-indigo-600 font-bold mb-1">
                          <el-icon><Tools /></el-icon> {{ tool.name }}
                       </div>
                       <div class="text-slate-500 mb-1">Input: {{ tool.args }}</div>
                       <div class="text-emerald-600" v-if="tool.result">Output: {{ tool.result }}</div>
                       <div class="text-orange-500" v-if="!tool.result">Processing...</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <!-- 输入区域 -->
        <div class="p-6 bg-white border-t border-slate-200">
           <div class="relative">
             <el-input 
                v-model="chatInput" 
                type="textarea" 
                :rows="3" 
                placeholder="Type a message to test your agent..." 
                class="!text-sm"
                @keydown.ctrl.enter="sendMessage"
             />
             <div class="absolute bottom-2 right-2 flex items-center gap-2">
                <span class="text-xs text-slate-400 mr-2">Ctrl + Enter</span>
                <el-button type="primary" circle @click="sendMessage" :loading="sending" :disabled="!chatInput.trim()">
                  <el-icon><Position /></el-icon>
                </el-button>
             </div>
           </div>
        </div>
      </div>
    </el-drawer>

    <!-- 配置对话框 (保持原有逻辑，仅优化样式) -->
    <el-dialog v-model="showCreateAgent" :title="isEditing ? '配置智能体' : '创建智能体'" width="650px" class="!rounded-xl">
       <el-form :model="agentForm" label-position="top" class="p-2">
          <div class="flex gap-6 mb-6">
             <div class="w-24 flex-shrink-0 text-center">
                <el-upload class="avatar-uploader" action="#" :show-file-list="false" :auto-upload="false" :on-change="handleAvatarChange">
                   <div class="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-300 hover:border-indigo-500 flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-indigo-50 transition-colors overflow-hidden">
                      <span v-if="agentForm.avatar" class="text-4xl">{{ agentForm.avatar }}</span>
                      <el-icon v-else class="text-2xl text-slate-400 mb-2"><Camera /></el-icon>
                      <span v-if="!agentForm.avatar" class="text-xs text-slate-400">Upload</span>
                   </div>
                </el-upload>
             </div>
             <div class="flex-1 space-y-4">
                <el-form-item label="Name">
                   <el-input v-model="agentForm.name" placeholder="e.g. Code Reviewer" />
                </el-form-item>
                <el-form-item label="Role Description">
                   <el-input v-model="agentForm.description" type="textarea" :rows="2" placeholder="What does this agent do?" />
                </el-form-item>
             </div>
          </div>

          <el-tabs class="demo-tabs">
             <el-tab-pane label="Tools & Capabilities">
                <div class="bg-slate-50 rounded-lg p-4 border border-slate-200 mb-4">
                   <div class="text-sm font-bold text-slate-700 mb-3">已启用的 MCP 工具</div>
                   <div class="flex flex-wrap gap-2">
                      <el-tag v-for="tool in agentForm.tools" :key="tool" closable @close="removeTool(tool)" type="info" effect="light" class="!bg-white !border-slate-300">
                         {{ getToolDisplayName(tool) }}
                      </el-tag>
                      <el-dropdown trigger="click" @command="addTool">
                         <el-button size="small" circle><el-icon><Plus /></el-icon></el-button>
                         <template #dropdown>
                            <el-dropdown-menu>
                               <el-dropdown-item v-for="tool in availableToolsList" :key="tool.value" :command="tool.value" :disabled="agentForm.tools.includes(tool.value)">
                                  {{ tool.label }}
                               </el-dropdown-item>
                            </el-dropdown-menu>
                         </template>
                      </el-dropdown>
                   </div>
                </div>
             </el-tab-pane>
             <el-tab-pane label="Model Config">
                <el-form-item label="Model">
                   <el-select v-model="agentForm.config.model" class="w-full">
                      <el-option label="DeepSeek-R1-Distill-Qwen-7B" value="deepseek-ai/DeepSeek-R1-Distill-Qwen-7B" />
                      <el-option label="Qwen2.5-14B-Instruct" value="Qwen/Qwen2.5-14B-Instruct" />
                   </el-select>
                </el-form-item>
                <el-form-item label="System Prompt">
                   <el-input v-model="agentForm.config.systemPrompt" type="textarea" :rows="6" class="font-mono text-sm" />
                </el-form-item>
             </el-tab-pane>
          </el-tabs>
       </el-form>
       <template #footer>
          <div class="flex justify-end gap-3">
             <el-button @click="showCreateAgent = false">Cancel</el-button>
             <el-button type="primary" @click="submitAgentForm" :loading="submitting">Save Agent</el-button>
          </div>
       </template>
    </el-dialog>

    <!-- API Config Dialog (Minimalist) -->
    <el-dialog v-model="showApiConfig" title="API Configuration" width="500px">
       <!-- Form content same as before but styled -->
       <el-form :model="apiConfigForm" label-position="top">
          <el-form-item label="SiliconFlow API Key">
             <el-input v-model="apiConfigForm.apiKey" type="password" show-password />
          </el-form-item>
       </el-form>
       <template #footer>
          <el-button type="primary" @click="saveApiConfig">Save Configuration</el-button>
       </template>
    </el-dialog>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, h, defineComponent } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import * as Icons from '@element-plus/icons-vue' // Import all icons

// Re-export specific icons for template usage
const { 
  Connection, Monitor, Cpu, Briefcase, DocumentCopy, DataAnalysis, Setting, 
  Plus, Search, Menu, List, MoreFilled, Tools, ArrowRight, Delete, Close, Position, Camera,
  VideoPlay, DataLine, Coin
} = Icons

// --- UI Components (Inline for simplicity) ---

// 1. Nav Item Component
const NavItem = defineComponent({
  props: ['icon', 'label', 'active', 'badge'],
  setup(props, { emit }) {
    return () => h('div', {
      class: [
        'flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors mb-1 group',
        props.active ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      ],
      onClick: () => emit('click')
    }, [
      h('div', { class: 'flex items-center gap-3' }, [
        h(Icons[props.icon as keyof typeof Icons], { class: 'text-lg' }),
        h('span', { class: 'text-sm font-medium' }, props.label)
      ]),
      props.badge ? h('span', { class: 'px-1.5 py-0.5 rounded bg-indigo-500 text-white text-[10px] font-bold' }, props.badge) : null
    ])
  }
})

// 2. Stat Card Component
const StatCard = defineComponent({
  props: ['title', 'value', 'icon', 'color', 'bg'],
  setup(props) {
    return () => h('div', { class: 'bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center justify-between' }, [
      h('div', [
        h('div', { class: 'text-slate-500 text-xs font-medium uppercase tracking-wider mb-1' }, props.title),
        h('div', { class: 'text-2xl font-bold text-slate-800' }, props.value)
      ]),
      h('div', { class: `w-12 h-12 rounded-lg ${props.bg} flex items-center justify-center ${props.color}` }, [
        h(Icons[props.icon as keyof typeof Icons], { class: 'text-2xl' })
      ])
    ])
  }
})

// --- State Management ---
const viewMode = ref('grid')
const searchKeyword = ref('')
const showCreateAgent = ref(false)
const showChatDialog = ref(false)
const showApiConfig = ref(false)
const isEditing = ref(false)
const chatInput = ref('')
const sending = ref(false)
const submitting = ref(false)
const chatMessagesRef = ref<HTMLElement | null>(null)

// Forms
const agentForm = ref({
  id: '',
  name: '',
  description: '',
  avatar: '🤖', // Default emoji avatar
  tools: [] as string[],
  config: {
    model: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
    systemPrompt: 'You are a helpful AI assistant powered by MCP tools.'
  },
  status: 'active'
})

const apiConfigForm = ref({
  apiKey: 'sk-etybbrewlaafxjjqtlgfeqaaskzrmryfndjtjjecyixbsznw', // Default placeholder
  baseURL: 'https://api.siliconflow.cn/v1/chat/completions'
})

// Data Mock
const availableToolsList = [
  { label: 'Code Analyzer', value: 'code_analyzer' },
  { label: 'Git Helper', value: 'git_helper' },
  { label: 'Web Search', value: 'web_search' },
  { label: 'Database Connector', value: 'sql_helper' },
]
// ... 原有的 imports ...

// --- 导航数据 (新增) ---
const currentRoute = ref('dashboard')

const menuGroup1 = [
  { id: 'dashboard', label: '概览仪表盘', icon: 'Monitor' },
  { id: 'agents', label: '智能体管理', icon: 'Cpu' },
  { id: 'connectors', label: 'MCP 连接器', icon: 'Connection', badge: 'Beta' },
]

const menuGroup2 = [
  { id: 'market', label: '工具市场', icon: 'Briefcase' },
  { id: 'templates', label: '提示词模板', icon: 'DocumentCopy' },
  { id: 'logs', label: '调用日志', icon: 'DataAnalysis' },
]

// ... 原有的其他逻辑 ...


const agentList = ref([
  {
    id: '1',
    name: 'Fullstack Architect',
    description: 'Expert in frontend (Vue/React) and backend (Node/Go). Capable of reviewing PRs and generating boilerplate.',
    avatar: '👨‍💻',
    status: 'active',
    tools: ['code_analyzer', 'git_helper'],
    config: { model: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B', systemPrompt: '' }
  },
  {
    id: '2',
    name: 'Data Analyst',
    description: 'Turns CSVs into charts. Can write SQL queries and explain complex data trends.',
    avatar: '📊',
    status: 'active',
    tools: ['sql_helper'],
    config: { model: 'Qwen/Qwen2.5-14B-Instruct', systemPrompt: '' }
  },
  {
    id: '3',
    name: 'Marketing Copywriter',
    description: 'Generates SEO-friendly blog posts and social media captions.',
    avatar: '✍️',
    status: 'inactive',
    tools: ['web_search'],
    config: { model: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B', systemPrompt: '' }
  }
])

const currentChatAgent = ref<any>(null)
const chatMessages = ref<any[]>([])

// --- Computed ---
const filteredAgents = computed(() => {
  if (!searchKeyword.value) return agentList.value
  return agentList.value.filter(a => a.name.toLowerCase().includes(searchKeyword.value.toLowerCase()))
})

// --- Methods ---

const getToolDisplayName = (val: string) => availableToolsList.find(t => t.value === val)?.label || val

const formatTime = (date: Date) => new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

const handleAgentAction = ({ action, agent }: any) => {
  if (action === 'edit') {
    agentForm.value = JSON.parse(JSON.stringify(agent))
    isEditing.value = true
    showCreateAgent.value = true
  } else if (action === 'debug') {
    chatWithAgent(agent)
  } else if (action === 'delete') {
    ElMessageBox.confirm('Are you sure?', 'Warning', { type: 'warning' }).then(() => {
      agentList.value = agentList.value.filter(a => a.id !== agent.id)
      ElMessage.success('Deleted')
    })
  }
}

const chatWithAgent = (agent: any) => {
  currentChatAgent.value = agent
  chatMessages.value = [
    { id: 1, role: 'assistant', content: `Session started with ${agent.name}. Ready to debug.`, timestamp: new Date() }
  ]
  showChatDialog.value = true
}

const sendMessage = async () => {
  if (!chatInput.value.trim()) return
  
  const userMsg = { id: Date.now(), role: 'user', content: chatInput.value, timestamp: new Date() }
  chatMessages.value.push(userMsg)
  chatInput.value = ''
  sending.value = true

  // Simulate AI Response & Tool Call
  const aiMsg = { id: Date.now()+1, role: 'assistant', content: '', streaming: true, timestamp: new Date(), toolCalls: [] as any[] }
  chatMessages.value.push(aiMsg)

  // Mock Streaming Effect
  const responseText = "Thinking process initiated... \nI will now analyze your request."
  
  // Mock Tool Call if agent has tools
  if (currentChatAgent.value.tools.length > 0) {
    setTimeout(() => {
       aiMsg.toolCalls?.push({ name: currentChatAgent.value.tools[0], args: '{ "query": "test" }', result: null })
    }, 1000)
    setTimeout(() => {
       if(aiMsg.toolCalls) aiMsg.toolCalls[0].result = "Success: Data retrieved."
    }, 2500)
  }

  // Simulate text stream
  let i = 0
  const interval = setInterval(() => {
    aiMsg.content += responseText[i] || ''
    i++
    if (i >= responseText.length) {
      clearInterval(interval)
      aiMsg.streaming = false
      sending.value = false
    }
    // Scroll to bottom
    if(chatMessagesRef.value) chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight
  }, 50)
}

const submitAgentForm = () => {
  submitting.value = true
  setTimeout(() => {
    if (isEditing.value) {
      const idx = agentList.value.findIndex(a => a.id === agentForm.value.id)
      if(idx !== -1) agentList.value[idx] = { ...agentForm.value }
    } else {
      agentList.value.push({ ...agentForm.value, id: Date.now().toString(), status: 'active' })
    }
    showCreateAgent.value = false
    submitting.value = false
    ElMessage.success('Saved successfully')
  }, 800)
}

const handleAvatarChange = (file: any) => {
  // Simplification: In a real app, upload to server. Here we just pretend.
  agentForm.value.avatar = '🆕' 
}

const addTool = (cmd: string) => {
  if(!agentForm.value.tools.includes(cmd)) agentForm.value.tools.push(cmd)
}
const removeTool = (tool: string) => {
  agentForm.value.tools = agentForm.value.tools.filter(t => t !== tool)
}

const saveApiConfig = () => {
  localStorage.setItem('mcp-api-config', JSON.stringify(apiConfigForm.value))
  showApiConfig.value = false
  ElMessage.success('Config saved')
}

const clearChat = () => chatMessages.value = []

// Hooks
onMounted(() => {
  const stored = localStorage.getItem('mcp-api-config')
  if(stored) apiConfigForm.value = JSON.parse(stored)
})
</script>

<style scoped>
  /* 自定义侧边栏滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 2px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #475569;
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Tooltip animation fix for dropdowns */
.el-dropdown-menu__item {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
