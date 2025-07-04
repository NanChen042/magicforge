import axios from 'axios'

/**
 * 关键词转换服务
 * 将用户输入的中文描述转换为更精准的AI提示词
 */

export interface TransformOptions {
  mode: 'dialogue' | 'professional' | 'creative' | 'analytical'
  apiKey: string
  apiUrl: string
  model?: string
}

export interface TransformResult {
  originalText: string
  transformedText: string
  suggestions: string[]
  mode: string
}

class KeywordTransformService {
  /**
   * 转换用户输入为更精准的AI提示词
   */
  async transformKeywords(
    inputText: string,
    options: TransformOptions
  ): Promise<TransformResult> {
    if (!inputText.trim()) {
      throw new Error('输入文本不能为空')
    }

    const prompt = this.generateTransformPrompt(inputText, options.mode)

    try {
      const response = await axios.post(
        this.ensureCorrectApiUrl(options.apiUrl),
        {
          model: options.model || 'doubao-seed-1-6-250615',
          messages: [
            {
              role: 'system',
              content: '你是一个专业的AI提示词优化专家，擅长将用户的简单描述转换为更精准、更有效的AI提示词。'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${options.apiKey}`
          }
        }
      )

      const content = response.data.choices[0].message.content
      return this.parseTransformResult(inputText, content, options.mode)
    } catch (error: any) {
      console.error('关键词转换失败:', error)
      throw new Error(`转换失败: ${error.response?.data?.error?.message || error.message}`)
    }
  }

  /**
   * 生成转换提示词
   */
  private generateTransformPrompt(inputText: string, mode: string): string {
    const modePrompts = {
      dialogue: `
请将以下用户输入优化为更适合AI对话的提示词：

原始输入："${inputText}"

优化要求：
1. 保持原意不变，但表达更清晰
2. 添加必要的上下文信息
3. 使问题更具体、更有针对性
4. 如果是问题，确保问题明确易懂
5. 如果是任务，确保任务描述完整

请按以下JSON格式返回：
{
  "transformedText": "优化后的提示词",
  "suggestions": ["建议1", "建议2", "建议3"],
  "explanation": "优化说明"
}`,

      professional: `
请将以下用户输入转换为更专业、更准确的表达：

原始输入："${inputText}"

优化要求：
1. 使用更专业的术语和表达
2. 增加技术细节和准确性
3. 确保表达严谨、逻辑清晰
4. 适合专业领域的讨论
5. 保持内容的完整性和准确性

请按以下JSON格式返回：
{
  "transformedText": "专业化后的提示词",
  "suggestions": ["专业建议1", "专业建议2", "专业建议3"],
  "explanation": "专业化说明"
}`,

      creative: `
请将以下用户输入转换为更有创意、更富想象力的表达：

原始输入："${inputText}"

优化要求：
1. 增加创意元素和想象空间
2. 使用更生动、更有趣的表达
3. 激发AI的创造性回答
4. 保持原始意图的同时增加趣味性
5. 适合创意性讨论和头脑风暴

请按以下JSON格式返回：
{
  "transformedText": "创意化后的提示词",
  "suggestions": ["创意建议1", "创意建议2", "创意建议3"],
  "explanation": "创意化说明"
}`,

      analytical: `
请将以下用户输入转换为更适合深度分析的提示词：

原始输入："${inputText}"

优化要求：
1. 引导进行深入分析和思考
2. 添加分析维度和框架
3. 鼓励多角度、多层次的回答
4. 适合复杂问题的探讨
5. 促进批判性思维

请按以下JSON格式返回：
{
  "transformedText": "分析型提示词",
  "suggestions": ["分析建议1", "分析建议2", "分析建议3"],
  "explanation": "分析化说明"
}`
    }

    return modePrompts[mode as keyof typeof modePrompts] || modePrompts.dialogue
  }

  /**
   * 解析转换结果
   */
  private parseTransformResult(
    originalText: string,
    content: string,
    mode: string
  ): TransformResult {
    try {
      // 尝试解析JSON响应
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        return {
          originalText,
          transformedText: parsed.transformedText || originalText,
          suggestions: parsed.suggestions || [],
          mode
        }
      }
    } catch (error) {
      console.warn('解析JSON失败，使用文本解析:', error)
    }

    // 如果JSON解析失败，尝试文本解析
    return {
      originalText,
      transformedText: content.trim() || originalText,
      suggestions: [],
      mode
    }
  }

  /**
   * 确保API地址格式正确
   */
  private ensureCorrectApiUrl(url: string): string {
    // 如果是字节跳动的API，确保使用正确的路径
    if (url.includes('ark.cn-beijing.volces.com')) {
      if (url.includes('/bots/chat/completions')) {
        return url
      }
      const baseUrl = url.replace('/api/v3/chat/completions', '').replace('/api/v3', '')
      return `${baseUrl}/api/v3/bots/chat/completions`
    }

    // 其他API的处理
    if (url.includes('/chat/completions')) {
      return url
    }
    const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url
    return `${baseUrl}/chat/completions`
  }
}

export const keywordTransformService = new KeywordTransformService()
export default keywordTransformService
