import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

// 创建 markdown-it 实例
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight: function (str: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs language-' + lang + '"><code>' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          '</code></pre>';
      } catch (__) {
        // 捕获错误但不处理
      }
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

/**
 * 格式化文本（使用 markdown-it 处理 Markdown）
 */
export function formatMarkdown(text: string): string {
  if (!text) return '';

  // 为确保代码块正确渲染，先处理特殊字符
  let processedText = text
    // 确保代码块中的反引号被正确处理
    .replace(/```([a-z]*)\n([\s\S]*?)```/g, (_, lang, code) => {
      // 替换代码中可能导致HTML解析问题的字符
      const safeCode = code
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      return `\`\`\`${lang}\n${safeCode}\`\`\``;
    });

  // 渲染markdown
  const rendered = md.render(processedText);

  // 确保代码块具有正确的样式和类名
  return rendered
    // 改进代码块的CSS类
    .replace(/<pre class="hljs/g, '<pre class="hljs code-block')
    // 添加行号和复制按钮等增强功能
    .replace(/<pre class="hljs code-block([^>]*)><code>/g,
      '<pre class="hljs code-block$1"><div class="code-header"><span class="language-badge">$1</span></div><code>');
}
