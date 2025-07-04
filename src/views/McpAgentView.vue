<template>
  <div class="mcp-agent-platform">
    <!-- 页面头部 -->
    <div class="platform-header">
      <el-card shadow="never" class="header-card">
        <div class="header-content">
          <div class="title-section">
            <h1 class="platform-title">MCP智能体管理中心</h1>
            <p class="platform-subtitle">Model Context Protocol Agent Management Center</p>
          </div>
          <div class="header-actions">
            <el-button type="primary" @click="showCreateAgent = true">
              <el-icon><Plus /></el-icon>
              创建智能体
            </el-button>
            <el-tag type="success" size="large">Beta v1.0</el-tag>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 主要内容区域 -->
    <div class="platform-content">
      <!-- 智能体概览卡片 -->
      <el-row :gutter="24" class="overview-cards">
        <el-col :xs="12" :sm="6">
          <el-card class="stat-card">
            <div class="stat-content">
              <div class="stat-number">{{ agentList.length }}</div>
              <div class="stat-label">我的智能体</div>
            </div>
            <el-icon class="stat-icon"><User /></el-icon>
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="6">
          <el-card class="stat-card">
            <div class="stat-content">
              <div class="stat-number">{{ activeAgents }}</div>
              <div class="stat-label">运行中</div>
            </div>
            <el-icon class="stat-icon active"><VideoPlay /></el-icon>
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="6">
          <el-card class="stat-card">
            <div class="stat-content">
              <div class="stat-number">{{ totalConversations }}</div>
              <div class="stat-label">总对话数</div>
            </div>
            <el-icon class="stat-icon"><ChatDotRound /></el-icon>
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="6">
          <el-card class="stat-card">
            <div class="stat-content">
              <div class="stat-number">{{ availableTools }}</div>
              <div class="stat-label">可用工具</div>
            </div>
            <el-icon class="stat-icon"><Tools /></el-icon>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <!-- 左侧：智能体列表 -->
        <el-col :xs="24" :lg="16">
          <el-card shadow="hover" class="agent-list-card">
            <template #header>
              <div class="card-header">
                <div class="header-left">
                  <el-icon><User /></el-icon>
                  <span>我的智能体</span>
                </div>
                <div class="header-right">
                  <el-input
                    v-model="searchKeyword"
                    placeholder="搜索智能体..."
                    style="width: 200px; margin-right: 12px;"
                    clearable
                  >
                    <template #prefix>
                      <el-icon><Search /></el-icon>
                    </template>
                  </el-input>
                  <el-button type="primary" @click="showCreateAgent = true">
                    <el-icon><Plus /></el-icon>
                    创建智能体
                  </el-button>
                </div>
              </div>
            </template>

            <!-- 智能体列表 -->
            <div class="agent-grid">
              <div
                v-for="agent in filteredAgents"
                :key="agent.id"
                class="agent-card"
                @click="selectAgent(agent)"
              >
                <div class="agent-avatar">
                  <el-avatar :size="60" :src="agent.avatar">
                    <el-icon><User /></el-icon>
                  </el-avatar>
                  <el-tag
                    :type="agent.status === 'active' ? 'success' : 'info'"
                    size="small"
                    class="agent-status"
                  >
                    {{ agent.status === 'active' ? '运行中' : '已停止' }}
                  </el-tag>
                </div>

                <div class="agent-info">
                  <h3 class="agent-name">{{ agent.name }}</h3>
                  <p class="agent-description">{{ agent.description }}</p>

                  <div class="agent-meta">
                    <el-tag size="small" type="primary">{{ agent.type }}</el-tag>
                    <span class="agent-tools">{{ agent.tools?.length || 0 }} 个工具</span>
                  </div>

                  <div class="agent-stats">
                    <span>对话: {{ agent.conversations || 0 }}</span>
                    <span>创建: {{ formatDate(agent.createdAt) }}</span>
                  </div>
                </div>

                <div class="agent-actions">
                  <el-button
                    size="small"
                    type="primary"
                    @click.stop="chatWithAgent(agent)"
                  >
                    对话
                  </el-button>
                  <el-dropdown @command="handleAgentAction">
                    <el-button size="small" link>
                      <el-icon><MoreFilled /></el-icon>
                    </el-button>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item :command="{action: 'edit', agent}">编辑</el-dropdown-item>
                        <el-dropdown-item :command="{action: 'clone', agent}">克隆</el-dropdown-item>
                        <el-dropdown-item :command="{action: 'export', agent}">导出</el-dropdown-item>
                        <el-dropdown-item :command="{action: 'delete', agent}" divided>删除</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </div>

              <!-- 空状态 -->
              <div v-if="filteredAgents.length === 0" class="empty-state">
                <el-empty description="暂无智能体">
                  <el-button type="primary" @click="showCreateAgent = true">
                    创建第一个智能体
                  </el-button>
                </el-empty>
              </div>
            </div>
          </el-card>
        </el-col>

        <!-- 右侧：智能体详情和快速操作 -->
        <el-col :xs="24" :lg="8">
          <el-card shadow="hover" class="agent-detail-card">
            <template #header>
              <div class="card-header">
                <el-icon><Setting /></el-icon>
                <span>快速操作</span>
              </div>
            </template>

            <div class="quick-actions">
              <el-button type="primary" size="large" @click="showCreateAgent = true" class="action-btn">
                <el-icon><Plus /></el-icon>
                创建新智能体
              </el-button>

              <el-button type="success" size="large" class="action-btn" @click="openToolMarket">
                <el-icon><Tools /></el-icon>
                工具市场
              </el-button>

              <el-button type="info" size="large" class="action-btn" @click="openTemplateLibrary">
                <el-icon><Document /></el-icon>
                模板库
              </el-button>

              <el-button type="warning" size="large" class="action-btn" @click="showApiConfig = true">
                <el-icon><Setting /></el-icon>
                API配置
              </el-button>
            </div>
          </el-card>

          <!-- 最近活动 -->
          <el-card shadow="hover" class="activity-card">
            <template #header>
              <div class="card-header">
                <el-icon><Clock /></el-icon>
                <span>最近活动</span>
              </div>
            </template>

            <el-timeline>
              <el-timeline-item timestamp="2024-01-18 15:30" type="primary">
                代码助手完成了一次代码审查
              </el-timeline-item>
              <el-timeline-item timestamp="2024-01-18 14:20" type="success">
                数据分析师生成了销售报表
              </el-timeline-item>
              <el-timeline-item timestamp="2024-01-18 13:15" type="info">
                文档写手更新了API文档
              </el-timeline-item>
            </el-timeline>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 创建/编辑智能体对话框 -->
    <el-dialog
      v-model="showCreateAgent"
      :title="isEditing ? '编辑智能体' : '创建智能体'"
      width="600px"
      :close-on-click-modal="false"
      class="agent-dialog"
    >
      <el-form
        ref="agentFormRef"
        :model="agentForm"
        :rules="agentFormRules"
        label-position="top"
        class="agent-form"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="智能体名称" prop="name">
              <el-input
                v-model="agentForm.name"
                placeholder="请输入智能体名称"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="智能体类型" prop="type">
              <el-select
                v-model="agentForm.type"
                placeholder="选择智能体类型"
                style="width: 100%"
              >
                <el-option label="编程助手" value="编程助手" />
                <el-option label="文档助手" value="文档助手" />
                <el-option label="数据分析" value="数据分析" />
                <el-option label="客服助手" value="客服助手" />
                <el-option label="创意助手" value="创意助手" />
                <el-option label="自定义" value="自定义" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="智能体描述" prop="description">
          <el-input
            v-model="agentForm.description"
            type="textarea"
            :rows="3"
            placeholder="请描述智能体的功能和用途"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>

        <el-form-item label="智能体头像">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            action="#"
            :auto-upload="false"
          >
            <img v-if="agentForm.avatar" :src="agentForm.avatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>

        <el-form-item label="工具配置">
          <div class="tools-config">
            <el-tag
              v-for="tool in agentForm.tools"
              :key="tool"
              closable
              @close="removeTool(tool)"
              class="tool-tag"
            >
              {{ getToolDisplayName(tool) }}
            </el-tag>
            <el-select
              v-model="selectedTool"
              placeholder="添加工具"
              @change="addTool"
              style="width: 200px; margin-top: 8px;"
            >
              <el-option
                v-for="tool in availableToolsList"
                :key="tool.value"
                :label="tool.label"
                :value="tool.value"
                :disabled="agentForm.tools.includes(tool.value)"
              />
            </el-select>
          </div>
        </el-form-item>

        <el-form-item label="高级配置">
          <el-collapse>
            <el-collapse-item title="模型配置" name="model">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="默认模型">
                    <el-select v-model="agentForm.config.model" placeholder="选择模型">
                      <el-option label="DeepSeek-R1-Distill-Qwen-7B" value="deepseek-ai/DeepSeek-R1-Distill-Qwen-7B" />
                      <el-option label="DeepSeek Chat" value="deepseek-chat" />
                      <el-option label="DeepSeek Coder" value="deepseek-coder" />
                      <el-option label="Qwen2.5-7B" value="Qwen/Qwen2.5-7B-Instruct" />
                      <el-option label="Qwen2.5-14B" value="Qwen/Qwen2.5-14B-Instruct" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="温度">
                    <el-slider
                      v-model="agentForm.config.temperature"
                      :min="0"
                      :max="2"
                      :step="0.1"
                      show-input
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="系统提示词" name="prompt">
              <el-input
                v-model="agentForm.config.systemPrompt"
                type="textarea"
                :rows="4"
                placeholder="输入系统提示词，定义智能体的行为和角色"
              />
            </el-collapse-item>
          </el-collapse>
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancelAgentForm">取消</el-button>
          <el-button type="primary" @click="submitAgentForm" :loading="submitting">
            {{ isEditing ? '保存修改' : '创建智能体' }}
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 智能体对话窗口 -->
    <el-dialog
      v-model="showChatDialog"
      :title="`与 ${currentChatAgent?.name} 对话`"
      width="800px"
      class="chat-dialog"
    >
      <div class="chat-container">
        <div class="chat-messages" ref="chatMessagesRef">
          <div
            v-for="message in chatMessages"
            :key="message.id"
            :class="['message', message.role]"
          >
            <div class="message-avatar">
              <el-avatar :size="32">
                <el-icon v-if="message.role === 'user'"><User /></el-icon>
                <el-icon v-else><User /></el-icon>
              </el-avatar>
            </div>
            <div class="message-content">
              <div class="message-text">
                {{ message.content }}
                <span v-if="message.streaming" class="streaming-indicator">▋</span>
              </div>
              <div class="message-time">{{ formatTime(message.timestamp) }}</div>
            </div>
          </div>
        </div>
        <div class="chat-input">
          <el-input
            v-model="chatInput"
            type="textarea"
            :rows="3"
            placeholder="输入消息..."
            @keydown.ctrl.enter="sendMessage"
          />
          <div class="chat-actions">
            <el-button @click="clearChat" size="small">清空</el-button>
            <el-button type="primary" @click="sendMessage" :loading="sending">
              发送 (Ctrl+Enter)
            </el-button>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 工具市场对话框 -->
    <el-dialog
      v-model="showToolMarket"
      title="工具市场"
      width="900px"
      class="tool-market-dialog"
    >
      <div class="tool-market">
        <el-row :gutter="20">
          <el-col
            v-for="tool in toolMarketList"
            :key="tool.id"
            :xs="24" :sm="12" :md="8"
          >
            <el-card class="tool-card" shadow="hover">
              <div class="tool-header">
                <el-icon class="tool-icon">
                  <component :is="tool.icon" />
                </el-icon>
                <h3 class="tool-name">{{ tool.name }}</h3>
              </div>
              <p class="tool-description">{{ tool.description }}</p>
              <div class="tool-footer">
                <el-tag :type="tool.category === 'free' ? 'success' : 'warning'" size="small">
                  {{ tool.category === 'free' ? '免费' : '付费' }}
                </el-tag>
                <el-button size="small" type="primary">安装</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-dialog>

    <!-- 模板库对话框 -->
    <el-dialog
      v-model="showTemplateLibrary"
      title="智能体模板库"
      width="900px"
      class="template-library-dialog"
    >
      <div class="template-library">
        <el-row :gutter="20">
          <el-col
            v-for="template in templateList"
            :key="template.id"
            :xs="24" :sm="12" :md="8"
          >
            <el-card class="template-card" shadow="hover">
              <div class="template-header">
                <el-avatar :size="50" :src="template.avatar">
                  <el-icon><User /></el-icon>
                </el-avatar>
                <div class="template-info">
                  <h3 class="template-name">{{ template.name }}</h3>
                  <el-tag size="small">{{ template.type }}</el-tag>
                </div>
              </div>
              <p class="template-description">{{ template.description }}</p>
              <div class="template-footer">
                <div class="template-stats">
                  <span>⭐ {{ template.rating }}</span>
                  <span>📥 {{ template.downloads }}</span>
                </div>
                <el-button size="small" type="primary" @click="useTemplate(template)">
                  使用模板
                </el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-dialog>

    <!-- API配置对话框 -->
    <el-dialog
      v-model="showApiConfig"
      title="API配置"
      width="500px"
      class="api-config-dialog"
    >
      <el-form :model="apiConfigForm" label-position="top">
        <el-form-item label="API密钥">
          <el-input
            v-model="apiConfigForm.apiKey"
            type="password"
            placeholder="请输入SiliconFlow API密钥"
            show-password
          />
          <div class="form-tip">
            获取API密钥：<a href="https://cloud.siliconflow.cn" target="_blank">SiliconFlow控制台</a>
          </div>
        </el-form-item>

        <el-form-item label="模型">
          <el-select v-model="apiConfigForm.model" style="width: 100%">
            <el-option label="DeepSeek-R1-Distill-Qwen-7B" value="deepseek-ai/DeepSeek-R1-Distill-Qwen-7B" />
            <el-option label="DeepSeek Chat" value="deepseek-chat" />
            <el-option label="DeepSeek Coder" value="deepseek-coder" />
            <el-option label="Qwen2.5-7B" value="Qwen/Qwen2.5-7B-Instruct" />
            <el-option label="Qwen2.5-14B" value="Qwen/Qwen2.5-14B-Instruct" />
          </el-select>
        </el-form-item>

        <el-form-item label="API端点">
          <el-input
            v-model="apiConfigForm.baseURL"
            placeholder="API端点URL"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showApiConfig = false">取消</el-button>
          <el-button type="primary" @click="saveApiConfig">保存配置</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Setting, Plus, User, ChatDotRound,
  Tools, Search, MoreFilled, Document, Clock
} from '@element-plus/icons-vue'

// 智能体管理
const showCreateAgent = ref(false)
const isEditing = ref(false)
const searchKeyword = ref('')
const agentFormRef = ref()
const submitting = ref(false)

// 智能体表单数据
const agentForm = ref({
  id: '',
  name: '',
  description: '',
  type: '',
  avatar: '',
  tools: [] as string[],
  config: {
    model: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
    temperature: 0.7,
    systemPrompt: ''
  }
})

// 表单验证规则
const agentFormRules = {
  name: [
    { required: true, message: '请输入智能体名称', trigger: 'blur' },
    { min: 2, max: 20, message: '名称长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  type: [
    { required: true, message: '请选择智能体类型', trigger: 'change' }
  ],
  description: [
    { required: true, message: '请输入智能体描述', trigger: 'blur' },
    { min: 10, max: 200, message: '描述长度在 10 到 200 个字符', trigger: 'blur' }
  ]
}

// 工具相关
const selectedTool = ref('')
const availableToolsList = ref([
  { label: '代码分析器', value: 'code_analyzer' },
  { label: 'Git助手', value: 'git_helper' },
  { label: '文档生成器', value: 'documentation' },
  { label: 'Markdown生成器', value: 'markdown_generator' },
  { label: 'API文档生成器', value: 'api_doc_generator' },
  { label: '数据处理器', value: 'data_processor' },
  { label: '图表生成器', value: 'chart_generator' },
  { label: 'SQL助手', value: 'sql_helper' },
  { label: '网络爬虫', value: 'web_scraper' },
  { label: '邮件助手', value: 'email_helper' }
])

// 对话相关
const showChatDialog = ref(false)
const currentChatAgent = ref<any>(null)
const chatMessages = ref<any[]>([])
const chatInput = ref('')
const sending = ref(false)
const chatMessagesRef = ref()

// API配置 - 动态配置
const getApiConfig = () => {
  const stored = localStorage.getItem('mcp-api-config')
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (error) {
      console.error('加载API配置失败:', error)
    }
  }
  return {
    baseURL: 'https://api.siliconflow.cn/v1/chat/completions',
    apiKey: 'sk-etybbrewlaafxjjqtlgfeqaaskzrmryfndjtjjecyixbsznw',
    model: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B'
  }
}

// 工具市场
const showToolMarket = ref(false)
const toolMarketList = ref([
  {
    id: 1,
    name: '代码审查助手',
    description: '自动检查代码质量、安全漏洞和最佳实践',
    icon: 'Document',
    category: 'free'
  },
  {
    id: 2,
    name: 'API文档生成器',
    description: '根据代码自动生成API文档和接口说明',
    icon: 'Document',
    category: 'free'
  },
  {
    id: 3,
    name: '数据可视化工具',
    description: '将数据转换为各种图表和可视化展示',
    icon: 'Document',
    category: 'paid'
  }
])

// 模板库
const showTemplateLibrary = ref(false)

// API配置
const showApiConfig = ref(false)
const apiConfigForm = ref({
  apiKey: 'sk-etybbrewlaafxjjqtlgfeqaaskzrmryfndjtjjecyixbsznw',
  model: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
  baseURL: 'https://api.siliconflow.cn/v1/chat/completions'
})
const templateList = ref([
  {
    id: 1,
    name: '全栈开发助手',
    type: '编程助手',
    description: '专业的全栈开发助手，支持前端、后端、数据库等全方位开发',
    avatar: '',
    rating: 4.8,
    downloads: '1.2k',
    tools: ['code_analyzer', 'git_helper', 'documentation'],
    config: {
      model: 'gpt-4',
      temperature: 0.3,
      systemPrompt: '你是一个专业的全栈开发助手...'
    }
  },
  {
    id: 2,
    name: '技术文档专家',
    type: '文档助手',
    description: '专注于技术文档编写、API文档生成和知识库管理',
    avatar: '',
    rating: 4.6,
    downloads: '856',
    tools: ['markdown_generator', 'api_doc_generator'],
    config: {
      model: 'gpt-3.5-turbo',
      temperature: 0.5,
      systemPrompt: '你是一个技术文档专家...'
    }
  }
])
const agentList = ref<any[]>([
  {
    id: '1',
    name: '代码助手',
    description: '专业的编程助手，支持多种编程语言和框架',
    type: '编程助手',
    status: 'active',
    avatar: '',
    tools: ['code_analyzer', 'git_helper', 'documentation'],
    conversations: 156,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: '文档写手',
    description: '智能文档生成和编辑助手，擅长技术文档和API文档',
    type: '文档助手',
    status: 'inactive',
    avatar: '',
    tools: ['markdown_generator', 'api_doc_generator'],
    conversations: 89,
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    name: '数据分析师',
    description: '专业的数据分析和可视化助手',
    type: '数据分析',
    status: 'active',
    avatar: '',
    tools: ['data_processor', 'chart_generator', 'sql_helper'],
    conversations: 234,
    createdAt: '2024-01-10'
  }
])
const selectedAgent = ref<any>(null)

// 计算属性
const activeAgents = computed(() =>
  agentList.value.filter(agent => agent.status === 'active').length
)

const totalConversations = computed(() =>
  agentList.value.reduce((total, agent) => total + (agent.conversations || 0), 0)
)

const availableTools = computed(() => {
  const allTools = agentList.value.flatMap(agent => agent.tools || [])
  return new Set(allTools).size
})

const filteredAgents = computed(() => {
  if (!searchKeyword.value) return agentList.value
  return agentList.value.filter(agent =>
    agent.name.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchKeyword.value.toLowerCase())
  )
})

// 智能体管理函数
const selectAgent = (agent: any) => {
  selectedAgent.value = agent
  console.log('选择智能体:', agent.name)
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('zh-CN')
}

const chatWithAgent = (agent: any) => {
  currentChatAgent.value = agent
  chatMessages.value = [
    {
      id: 1,
      role: 'assistant',
      content: `你好！我是 ${agent.name}，${agent.description}。有什么可以帮助你的吗？`,
      timestamp: new Date()
    }
  ]
  showChatDialog.value = true
}

const handleAgentAction = (command: any) => {
  const { action, agent } = command

  switch (action) {
    case 'edit':
      editAgent(agent)
      break
    case 'clone':
      ElMessage.info(`克隆智能体: ${agent.name}`)
      // TODO: 克隆智能体
      break
    case 'export':
      ElMessage.info(`导出智能体: ${agent.name}`)
      // TODO: 导出智能体配置
      break
    case 'delete':
      ElMessageBox.confirm(`确定要删除智能体 "${agent.name}" 吗？`, '确认删除', {
        type: 'warning'
      }).then(() => {
        const index = agentList.value.findIndex(a => a.id === agent.id)
        if (index > -1) {
          agentList.value.splice(index, 1)
          ElMessage.success('智能体已删除')
        }
      }).catch(() => {
        // 用户取消
      })
      break
  }
}

// 工具管理函数
const getToolDisplayName = (toolValue: string) => {
  const tool = availableToolsList.value.find(t => t.value === toolValue)
  return tool ? tool.label : toolValue
}

const addTool = () => {
  if (selectedTool.value && !agentForm.value.tools.includes(selectedTool.value)) {
    agentForm.value.tools.push(selectedTool.value)
    selectedTool.value = ''
  }
}

const removeTool = (tool: string) => {
  const index = agentForm.value.tools.indexOf(tool)
  if (index > -1) {
    agentForm.value.tools.splice(index, 1)
  }
}

// 头像上传
const handleAvatarSuccess = (_response: any, file: any) => {
  agentForm.value.avatar = URL.createObjectURL(file.raw)
}

const beforeAvatarUpload = (file: any) => {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG) {
    ElMessage.error('头像只能是 JPG/PNG 格式!')
  }
  if (!isLt2M) {
    ElMessage.error('头像大小不能超过 2MB!')
  }
  return isJPG && isLt2M
}

// 表单操作
const resetAgentForm = () => {
  agentForm.value = {
    id: '',
    name: '',
    description: '',
    type: '',
    avatar: '',
    tools: [],
    config: {
      model: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
      temperature: 0.7,
      systemPrompt: ''
    }
  }
  isEditing.value = false
}

const cancelAgentForm = () => {
  showCreateAgent.value = false
  resetAgentForm()
}

const submitAgentForm = async () => {
  if (!agentFormRef.value) return

  try {
    await agentFormRef.value.validate()
    submitting.value = true

    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (isEditing.value) {
      // 编辑模式
      const index = agentList.value.findIndex(agent => agent.id === agentForm.value.id)
      if (index > -1) {
        agentList.value[index] = {
          ...agentForm.value,
          conversations: agentList.value[index].conversations,
          createdAt: agentList.value[index].createdAt,
          status: agentList.value[index].status
        }
        ElMessage.success('智能体修改成功')
      }
    } else {
      // 创建模式
      const newAgent = {
        ...agentForm.value,
        id: Date.now().toString(),
        conversations: 0,
        createdAt: new Date().toISOString().split('T')[0],
        status: 'active'
      }
      agentList.value.unshift(newAgent)
      ElMessage.success('智能体创建成功')
    }

    // 保存到本地存储
    localStorage.setItem('mcp-agents', JSON.stringify(agentList.value))

    showCreateAgent.value = false
    resetAgentForm()
  } catch (error) {
    console.error('表单验证失败:', error)
  } finally {
    submitting.value = false
  }
}

// 编辑智能体
const editAgent = (agent: any) => {
  agentForm.value = {
    id: agent.id,
    name: agent.name,
    description: agent.description,
    type: agent.type,
    avatar: agent.avatar,
    tools: [...agent.tools],
    config: {
      model: agent.config?.model || 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
      temperature: agent.config?.temperature || 0.7,
      systemPrompt: agent.config?.systemPrompt || ''
    }
  }
  isEditing.value = true
  showCreateAgent.value = true
}

// 对话功能
const formatTime = (timestamp: Date) => {
  return new Date(timestamp).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const sendMessage = async () => {
  if (!chatInput.value.trim()) return

  const userMessage = {
    id: Date.now(),
    role: 'user',
    content: chatInput.value,
    timestamp: new Date()
  }

  chatMessages.value.push(userMessage)
  chatInput.value = ''
  sending.value = true

  // 创建AI消息占位符
  const aiMessage = {
    id: Date.now() + 1,
    role: 'assistant',
    content: '',
    timestamp: new Date(),
    streaming: true
  }
  chatMessages.value.push(aiMessage)

  try {
    // 构建对话历史
    const messages = chatMessages.value
      .filter(msg => !msg.streaming)
      .map(msg => ({
        role: msg.role,
        content: msg.content
      }))

    // 添加系统提示词
    const systemPrompt = currentChatAgent.value?.config?.systemPrompt ||
      `你是${currentChatAgent.value?.name}，${currentChatAgent.value?.description}。请以专业、友好的方式回答用户的问题。`

    messages.unshift({
      role: 'system',
      content: systemPrompt
    })

    // 获取API配置
    const apiConfig = getApiConfig()

    if (!apiConfig.apiKey) {
      ElMessage.warning('请先配置API密钥')
      showApiConfig.value = true
      // 移除AI消息占位符
      const messageIndex = chatMessages.value.findIndex(msg => msg.id === aiMessage.id)
      if (messageIndex !== -1) {
        chatMessages.value.splice(messageIndex, 1)
      }
      sending.value = false
      return
    }

    // 调用DeepSeek API
    console.log('发送API请求:', {
      url: apiConfig.baseURL,
      model: apiConfig.model,
      messages: messages,
      stream: true
    })

    const response = await fetch(apiConfig.baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiConfig.apiKey}`
      },
      body: JSON.stringify({
        model: apiConfig.model,
        messages: messages,
        stream: true,
        temperature: currentChatAgent.value?.config?.temperature || 0.7,
        max_tokens: 2000
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API请求失败:', response.status, response.statusText, errorText)
      throw new Error(`API请求失败: ${response.status} ${response.statusText}`)
    }

    console.log('API响应成功，开始处理流式数据')

    // 处理流式响应
    const reader = response.body?.getReader()
    const decoder = new TextDecoder()

    if (!reader) {
      throw new Error('无法读取响应流')
    }

    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()

      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        if (line.trim() === '') continue
        if (line.trim() === 'data: [DONE]') {
          console.log('流式输出完成')
          continue
        }

        if (line.startsWith('data: ')) {
          try {
            const jsonStr = line.slice(6)
            console.log('收到流式数据:', jsonStr)
            const data = JSON.parse(jsonStr)
            console.log('解析后的数据:', data)

            const delta = data.choices?.[0]?.delta
            console.log('Delta内容:', delta)

            if (delta?.content) {
              console.log('收到内容片段:', delta.content)
              // 更新AI消息内容
              const messageIndex = chatMessages.value.findIndex(msg => msg.id === aiMessage.id)
              console.log('找到消息索引:', messageIndex)
              if (messageIndex !== -1) {
                chatMessages.value[messageIndex].content += delta.content
                console.log('更新后的消息内容:', chatMessages.value[messageIndex].content)

                // 滚动到底部
                setTimeout(() => {
                  if (chatMessagesRef.value) {
                    chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight
                  }
                }, 10)
              }
            }
          } catch (e) {
            console.warn('解析SSE数据失败:', e, '原始数据:', line)
          }
        }
      }
    }

    // 完成流式输出
    const messageIndex = chatMessages.value.findIndex(msg => msg.id === aiMessage.id)
    if (messageIndex !== -1) {
      chatMessages.value[messageIndex].streaming = false
    }

    // 更新智能体对话统计
    if (currentChatAgent.value) {
      const agentIndex = agentList.value.findIndex(agent => agent.id === currentChatAgent.value.id)
      if (agentIndex !== -1) {
        agentList.value[agentIndex].conversations = (agentList.value[agentIndex].conversations || 0) + 1
        // 保存到本地存储
        localStorage.setItem('mcp-agents', JSON.stringify(agentList.value))
      }
    }

  } catch (error: any) {
    console.error('发送消息失败:', error)
    ElMessage.error(`发送消息失败: ${error.message}`)

    // 移除失败的AI消息
    const messageIndex = chatMessages.value.findIndex(msg => msg.id === aiMessage.id)
    if (messageIndex !== -1) {
      chatMessages.value.splice(messageIndex, 1)
    }
  } finally {
    sending.value = false
    // 确保移除AI消息占位符的streaming标记
    const messageIndex = chatMessages.value.findIndex(msg => msg.id === aiMessage.id)
    if (messageIndex !== -1 && chatMessages.value[messageIndex].streaming) {
      chatMessages.value[messageIndex].streaming = false
    }
  }
}

const clearChat = () => {
  chatMessages.value = [
    {
      id: 1,
      role: 'assistant',
      content: `你好！我是 ${currentChatAgent.value?.name}，${currentChatAgent.value?.description}。有什么可以帮助你的吗？`,
      timestamp: new Date()
    }
  ]
}

// 工具市场和模板库
const openToolMarket = () => {
  showToolMarket.value = true
}

const openTemplateLibrary = () => {
  showTemplateLibrary.value = true
}

const useTemplate = (template: any) => {
  agentForm.value = {
    id: '',
    name: template.name,
    description: template.description,
    type: template.type,
    avatar: template.avatar,
    tools: [...template.tools],
    config: { ...template.config }
  }
  isEditing.value = false
  showTemplateLibrary.value = false
  showCreateAgent.value = true
  ElMessage.success('模板已应用，请完善信息后创建')
}

// 数据持久化
const loadAgentsFromStorage = () => {
  const stored = localStorage.getItem('mcp-agents')
  if (stored) {
    try {
      const agents = JSON.parse(stored)
      agentList.value = agents
    } catch (error) {
      console.error('加载本地数据失败:', error)
    }
  }
}

// API配置管理
const saveApiConfig = () => {
  if (!apiConfigForm.value.apiKey.trim()) {
    ElMessage.warning('请输入API密钥')
    return
  }

  localStorage.setItem('mcp-api-config', JSON.stringify(apiConfigForm.value))
  ElMessage.success('API配置保存成功')
  showApiConfig.value = false
}

const loadApiConfig = () => {
  const config = getApiConfig()
  apiConfigForm.value = { ...config }
}

// 页面初始化
onMounted(() => {
  console.log('MCP智能体管理中心已加载')
  loadAgentsFromStorage()
  loadApiConfig()
})
</script>

<style scoped>
/* 平台整体样式 */
.mcp-agent-platform {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

/* 头部样式 */
.platform-header {
  margin-bottom: 24px;
}

.header-card {
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.platform-title {
  font-size: 28px;
  font-weight: bold;
  color: #1a202c;
  margin: 0;
}

.platform-subtitle {
  font-size: 14px;
  color: #718096;
  margin: 4px 0 0 0;
}

/* 内容区域 */
.platform-content {
  max-width: 1400px;
  margin: 0 auto;
}

/* 概览卡片样式 */
.overview-cards {
  margin-bottom: 24px;
}

.stat-card {
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.stat-content {
  text-align: center;
  padding: 8px 0;
}

.stat-number {
  font-size: 32px;
  font-weight: bold;
  color: #1a202c;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #718096;
}

.stat-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 24px;
  color: #cbd5e0;
}

.stat-icon.active {
  color: #48bb78;
}

/* 智能体列表卡片 */
.agent-list-card,
.agent-detail-card,
.activity-card {
  margin-bottom: 20px;
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.agent-list-card:hover,
.agent-detail-card:hover,
.activity-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

/* 卡片头部 */
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  color: #2d3748;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* 智能体网格 */
.agent-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.agent-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.agent-card:hover {
  border-color: #667eea;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
  transform: translateY(-2px);
}

.agent-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  position: relative;
}

.agent-status {
  position: absolute;
  top: -5px;
  right: -5px;
}

.agent-info {
  text-align: center;
  margin-bottom: 16px;
}

.agent-name {
  font-size: 18px;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 8px 0;
}

.agent-description {
  font-size: 14px;
  color: #718096;
  margin: 0 0 12px 0;
  line-height: 1.5;
}

.agent-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 8px;
}

.agent-tools {
  font-size: 12px;
  color: #a0aec0;
}

.agent-stats {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #a0aec0;
}

.agent-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

/* 快速操作 */
.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-btn {
  width: 100%;
  height: 48px;
  font-size: 14px;
  font-weight: 500;
}

/* 空状态 */
.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
}

/* 表单样式 */
.param-form {
  max-height: 600px;
  overflow-y: auto;
}

.code-editor :deep(.el-textarea__inner) {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  line-height: 1.5;
}

/* 数组输入样式 */
.array-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.array-tag {
  margin-right: 8px;
  margin-bottom: 4px;
}

.array-input-field {
  margin-top: 8px;
}

/* 文件上传样式 */
.file-upload {
  width: 100%;
}

.file-upload :deep(.el-upload-dragger) {
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  background: #f9fafb;
  transition: all 0.3s ease;
}

.file-upload :deep(.el-upload-dragger:hover) {
  border-color: #3b82f6;
  background: #eff6ff;
}

/* 调用按钮 */
.call-button {
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  transition: all 0.3s ease;
}

.call-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

/* 状态内容 */
.status-content {
  padding: 20px 0;
}

.error-section {
  margin-top: 20px;
}

/* 结果内容 */
.result-content {
  min-height: 300px;
}

.result-text :deep(.el-textarea__inner) {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  line-height: 1.6;
  background: #f8fafc;
}

.result-json :deep(.el-textarea__inner) {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
  line-height: 1.5;
  background: #1a202c;
  color: #e2e8f0;
}

.result-image {
  max-width: 200px;
  margin: 8px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.result-audio {
  width: 100%;
  margin: 16px 0;
}

/* 历史记录样式 */
.history-item {
  margin-bottom: 8px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.history-url {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
  color: #4a5568;
  word-break: break-all;
}

.history-params {
  display: flex;
  gap: 8px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .mcp-agent-platform {
    padding: 12px;
  }

  .platform-title {
    font-size: 24px;
  }

  .header-content {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }

  .card-header {
    flex-wrap: wrap;
    gap: 12px;
  }

  .result-image {
    max-width: 100%;
  }
}

/* 自定义滚动条 */
.param-form::-webkit-scrollbar {
  width: 6px;
}

.param-form::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.param-form::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

.param-form::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}

/* 对话框样式 */
.agent-dialog :deep(.el-dialog) {
  border-radius: 16px;
  overflow: hidden;
}

.agent-dialog :deep(.el-dialog__header) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 24px;
}

.agent-dialog :deep(.el-dialog__title) {
  color: white;
  font-weight: 600;
}

.agent-form {
  padding: 24px;
}

.tools-config {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tool-tag {
  margin-right: 8px;
  margin-bottom: 8px;
}

.avatar-uploader {
  display: flex;
  justify-content: center;
}

.avatar-uploader :deep(.el-upload) {
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-uploader :deep(.el-upload:hover) {
  border-color: #667eea;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 0 24px 24px;
}

/* 对话窗口样式 */
.chat-dialog :deep(.el-dialog) {
  border-radius: 16px;
  overflow: hidden;
}

.chat-container {
  height: 500px;
  display: flex;
  flex-direction: column;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background: #f8fafc;
}

.message {
  display: flex;
  margin-bottom: 16px;
  align-items: flex-start;
  gap: 12px;
}

.message.user {
  flex-direction: row-reverse;
}

.message-avatar {
  flex-shrink: 0;
}

.message-content {
  max-width: 70%;
  background: white;
  padding: 12px 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.message.user .message-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.message-text {
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 4px;
}

.message-time {
  font-size: 12px;
  opacity: 0.7;
}

.chat-input {
  padding: 16px;
  border-top: 1px solid #e2e8f0;
  background: white;
}

.chat-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

/* 工具市场样式 */
.tool-market {
  max-height: 600px;
  overflow-y: auto;
}

.tool-card {
  height: 100%;
  transition: all 0.3s ease;
}

.tool-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.tool-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.tool-icon {
  font-size: 24px;
  color: #667eea;
}

.tool-name {
  font-size: 16px;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
}

.tool-description {
  font-size: 14px;
  color: #718096;
  line-height: 1.5;
  margin-bottom: 16px;
}

.tool-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 模板库样式 */
.template-library {
  max-height: 600px;
  overflow-y: auto;
}

.template-card {
  height: 100%;
  transition: all 0.3s ease;
}

.template-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.template-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.template-info {
  flex: 1;
}

.template-name {
  font-size: 16px;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 4px 0;
}

.template-description {
  font-size: 14px;
  color: #718096;
  line-height: 1.5;
  margin-bottom: 16px;
}

.template-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.template-stats {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #a0aec0;
}

/* API配置对话框样式 */
.api-config-dialog :deep(.el-dialog) {
  border-radius: 16px;
  overflow: hidden;
}

.api-config-dialog :deep(.el-dialog__header) {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 20px 24px;
}

.api-config-dialog :deep(.el-dialog__title) {
  color: white;
  font-weight: 600;
}

.form-tip {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}

.form-tip a {
  color: #409eff;
  text-decoration: none;
}

.form-tip a:hover {
  text-decoration: underline;
}

/* 调用详情对话框 */
:deep(.call-details-dialog) {
  width: 80%;
  max-width: 800px;
}

:deep(.call-details-dialog .el-message-box__content) {
  max-height: 500px;
  overflow-y: auto;
}

:deep(.call-details-dialog pre) {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
  line-height: 1.5;
  background: #f8fafc;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
</style>
