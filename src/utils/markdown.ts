import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

// 创建 markdown-it 实例
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight: function (str: string, lang: string): string {
    const langLabel = lang || 'text';
    const langClass = lang ? `language-${lang}` : '';
    
    // 生成唯一ID用于复制功能
    const codeId = `code-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    let highlightedCode = '';
    if (lang && hljs.getLanguage(lang)) {
      try {
        highlightedCode = hljs.highlight(str, { language: lang, ignoreIllegals: true }).value;
      } catch (__) {
        highlightedCode = md.utils.escapeHtml(str);
      }
    } else {
      highlightedCode = md.utils.escapeHtml(str);
    }

    // ChatGPT 风格的代码块：带语言标签和复制按钮
    return `<div class="code-block-wrapper">
      <div class="code-block-header">
        <span class="code-lang-label">${langLabel}</span>
        <button class="code-copy-btn" data-code-id="${codeId}" onclick="copyCodeBlock(this)">
          <svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <svg class="check-icon hidden" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span class="copy-text">复制代码</span>
        </button>
      </div>
      <pre class="code-block ${langClass}"><code id="${codeId}">${highlightedCode}</code></pre>
    </div>`;
  }
});

// 自定义渲染规则 - 链接在新窗口打开
const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, _env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  const aIndex = tokens[idx].attrIndex('target');
  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank']);
  } else {
    tokens[idx].attrs![aIndex][1] = '_blank';
  }
  
  const relIndex = tokens[idx].attrIndex('rel');
  if (relIndex < 0) {
    tokens[idx].attrPush(['rel', 'noopener noreferrer']);
  }
  
  return defaultRender(tokens, idx, options, env, self);
};

/**
 * 格式化文本（使用 markdown-it 处理 Markdown）
 */
export function formatMarkdown(text: string): string {
  if (!text) return '';

  // 渲染 markdown
  const rendered = md.render(text);

  return rendered;
}

// 全局复制函数 - 挂载到 window
if (typeof window !== 'undefined') {
  (window as any).copyCodeBlock = function(btn: HTMLButtonElement) {
    const codeId = btn.getAttribute('data-code-id');
    const codeElement = document.getElementById(codeId || '');
    
    if (codeElement) {
      const code = codeElement.textContent || '';
      navigator.clipboard.writeText(code).then(() => {
        // 切换图标
        const copyIcon = btn.querySelector('.copy-icon');
        const checkIcon = btn.querySelector('.check-icon');
        const copyText = btn.querySelector('.copy-text');
        
        if (copyIcon && checkIcon && copyText) {
          copyIcon.classList.add('hidden');
          checkIcon.classList.remove('hidden');
          copyText.textContent = '已复制';
          
          setTimeout(() => {
            copyIcon.classList.remove('hidden');
            checkIcon.classList.add('hidden');
            copyText.textContent = '复制代码';
          }, 2000);
        }
      });
    }
  };
}
