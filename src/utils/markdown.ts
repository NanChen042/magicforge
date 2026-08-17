import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import mermaid from 'mermaid';

// Initialize mermaid once
if (typeof window !== 'undefined') {
  try {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'neutral',
      securityLevel: 'strict',
      fontFamily: 'Inter, system-ui, sans-serif',
      themeVariables: {
        primaryColor: '#eff6ff',
        primaryTextColor: '#1e3a8a',
        primaryBorderColor: '#93c5fd',
        lineColor: '#64748b',
        secondaryColor: '#f8fafc',
        tertiaryColor: '#ffffff'
      }
    });
  } catch (e) {
    console.warn('Failed to initialize mermaid', e);
  }
}

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  breaks: true
});

const LANGUAGE_HINTS = new Set([
  'bash', 'c', 'cpp', 'csharp', 'css', 'go', 'html', 'java', 'javascript',
  'json', 'kotlin', 'markdown', 'php', 'python', 'rust', 'sql', 'swift',
  'text', 'toml', 'tsx', 'typescript', 'xml', 'yaml', 'vue', 'mermaid'
]);

function escapeHtml(value: string): string {
  return md.utils.escapeHtml(value);
}

/**
 * Render Math Formula with KaTeX
 */
function renderMath(content: string, displayMode: boolean): string {
  try {
    return katex.renderToString(content.trim(), {
      displayMode,
      throwOnError: false,
      output: 'htmlAndMathml'
    });
  } catch (e) {
    return escapeHtml(content);
  }
}

/**
 * Pre-process LaTeX Math before Markdown-it parses paragraphs and escapes characters
 */
function preprocessMath(text: string): { processedText: string; mathPlaceholders: Map<string, string> } {
  const mathPlaceholders = new Map<string, string>();
  let placeholderId = 0;

  // 1. Block Math: $$ ... $$ or \[ ... \]
  let processedText = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
    const id = `__KATEX_BLOCK_${placeholderId++}__`;
    const rendered = `<div class="katex-block-wrapper my-3 text-center overflow-x-auto py-2">${renderMath(math, true)}</div>`;
    mathPlaceholders.set(id, rendered);
    return id;
  });

  processedText = processedText.replace(/\\\[([\s\S]+?)\\\]/g, (_, math) => {
    const id = `__KATEX_BLOCK_${placeholderId++}__`;
    const rendered = `<div class="katex-block-wrapper my-3 text-center overflow-x-auto py-2">${renderMath(math, true)}</div>`;
    mathPlaceholders.set(id, rendered);
    return id;
  });

  // 2. Inline Math: $ ... $ (avoiding $$ and escaped \$) or \( ... \)
  processedText = processedText.replace(/(?<!\\)\$([^\$\n]+?)(?<!\\)\$/g, (_, math) => {
    // Basic heuristic: check if math contains standard math characters
    const id = `__KATEX_INLINE_${placeholderId++}__`;
    const rendered = `<span class="katex-inline-wrapper">${renderMath(math, false)}</span>`;
    mathPlaceholders.set(id, rendered);
    return id;
  });

  processedText = processedText.replace(/\\\(([\s\S]+?)\\\)/g, (_, math) => {
    const id = `__KATEX_INLINE_${placeholderId++}__`;
    const rendered = `<span class="katex-inline-wrapper">${renderMath(math, false)}</span>`;
    mathPlaceholders.set(id, rendered);
    return id;
  });

  return { processedText, mathPlaceholders };
}

function normalizeFence(token: { info: string; content: string }) {
  let language = token.info.trim().split(/\s+/)[0]?.toLowerCase() || '';
  let code = token.content;

  // Some model responses use ```text followed by the actual language on line 1.
  if (!language || ['text', 'txt', 'plain', 'plaintext'].includes(language)) {
    const match = code.match(/^\s*([a-z][a-z0-9+#-]*)\s*\r?\n/i);
    const hintedLanguage = match?.[1]?.toLowerCase();
    if (hintedLanguage && LANGUAGE_HINTS.has(hintedLanguage) && (hljs.getLanguage(hintedLanguage) || hintedLanguage === 'mermaid')) {
      language = hintedLanguage;
      code = code.slice(match![0].length);
    }
  }

  if (language !== 'mermaid' && (!language || !hljs.getLanguage(language))) {
    language = 'text';
  }

  code = code.replace(/^\r?\n/, '').replace(/\r?\n$/, '');

  return { language, code };
}

function highlightCode(code: string, language: string): string {
  if (language === 'text') return escapeHtml(code);

  try {
    return hljs.highlight(code, { language, ignoreIllegals: true }).value;
  } catch {
    return escapeHtml(code);
  }
}

let codeBlockId = 0;
let mermaidBlockId = 0;

// Keep a table from being rendered while its last row is still arriving over SSE.
// This prevents half-written pipes from becoming stray paragraphs during streaming.
function stabilizeStreamingMarkdown(text: string): string {
  const lines = text.split(/\r?\n/);
  const tableStart = lines.findIndex((line) => /^\s*\|.*\|\s*$/.test(line));
  if (tableStart < 0) return text;

  const separatorOffset = lines
    .slice(tableStart + 1)
    .findIndex((line) => /^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line));
  if (separatorOffset < 0) return text;

  const separatorIndex = tableStart + 1 + separatorOffset;
  let stableEnd = separatorIndex + 1;
  for (let index = stableEnd; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.trim() || !line.includes('|')) break;
    if (/\|\s*$/.test(line)) stableEnd = index + 1;
  }

  if (stableEnd <= separatorIndex + 1) {
    return lines.slice(0, tableStart).join('\n').trimEnd();
  }

  return [...lines.slice(0, tableStart), ...lines.slice(tableStart, stableEnd)].join('\n');
}

md.renderer.rules.table_open = () => '<div class="markdown-table-wrap"><table class="markdown-table">';
md.renderer.rules.table_close = () => '</table></div>\n';

// Custom fence renderer for code blocks and mermaid
md.renderer.rules.fence = (tokens, index) => {
  const token = tokens[index];
  const { language, code } = normalizeFence(token);

  // Special handling for Mermaid diagrams
  if (language === 'mermaid') {
    const mId = `mermaid-chart-${Date.now()}-${mermaidBlockId++}`;
    return `<div class="mermaid-diagram-wrapper my-4">
      <div class="mermaid-diagram-container bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs overflow-x-auto">
        <div class="mermaid-chart flex justify-center" id="${mId}" data-mermaid="${escapeHtml(code)}">${escapeHtml(code)}</div>
      </div>
    </div>\n`;
  }

  const codeId = `code-block-${Date.now()}-${codeBlockId++}`;
  const highlighted = highlightCode(code, language);

  return `<div class="code-block-wrapper">
    <div class="code-block-header">
      <span class="code-lang-label">${escapeHtml(language)}</span>
      <button type="button" class="code-copy-btn" data-code-id="${codeId}" aria-label="复制代码">
        <svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <svg class="check-icon hidden" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span class="copy-text">复制代码</span>
      </button>
    </div>
    <pre class="code-block language-${escapeHtml(language)}"><code id="${codeId}">${highlighted}</code></pre>
  </div>\n`;
};

const defaultLinkOpen = md.renderer.rules.link_open || ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options));
md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const targetIndex = tokens[idx].attrIndex('target');
  if (targetIndex < 0) tokens[idx].attrPush(['target', '_blank']);
  else tokens[idx].attrs![targetIndex][1] = '_blank';

  const relIndex = tokens[idx].attrIndex('rel');
  if (relIndex < 0) tokens[idx].attrPush(['rel', 'noopener noreferrer']);

  return defaultLinkOpen(tokens, idx, options, env, self);
};

function convertSceneJsonToScript(parsed: Record<string, any>): string {
  let scriptMarkdown = '';
  if (parsed.description) {
    scriptMarkdown += `> **🎬 场景实况**\n> \n> ${parsed.description}\n\n`;
  }
  if (parsed.dialog) {
    scriptMarkdown += `💬 **心声独白**\n> 「${parsed.dialog}」\n\n`;
  }
  if (parsed.specialEvent) {
    const eventType = typeof parsed.specialEvent === 'object' ? parsed.specialEvent.type || '突发异动' : '突发异动';
    const eventDesc = typeof parsed.specialEvent === 'object' ? (parsed.specialEvent.description || JSON.stringify(parsed.specialEvent)) : parsed.specialEvent;
    scriptMarkdown += `⚡ **突发异动【${eventType}】**：${eventDesc}\n\n`;
  }
  if (Array.isArray(parsed.options) && parsed.options.length > 0) {
    scriptMarkdown += `### 🧭 抉择分支\n`;
    parsed.options.forEach((opt: any, idx: number) => {
      const text = typeof opt === 'object' ? opt.text : opt;
      const hint = typeof opt === 'object' && opt.hint ? ` *(${opt.hint})*` : '';
      scriptMarkdown += `${idx + 1}. **${text}**${hint}\n`;
    });
  }
  return scriptMarkdown.trim();
}

/**
 * 自动识别并拆解大模型意外输出的 JSON 包装外壳 (如 {"response": "..."}, {"content": "..."}, 或剧本场景 JSON)
 */
export function unwrapJsonEnvelope(text: string): string {
  if (!text) return '';
  let candidate = text.trim();

  // 1. 如果是以 ```json ... ``` 或 ``` ... ``` 包裹的代码块
  const jsonBlockMatch = candidate.match(/^```(?:json)?\s*\n?([\s\S]+?)\n?```$/i);
  if (jsonBlockMatch) {
    candidate = jsonBlockMatch[1].trim();
  }

  // 2. 检测是否为 JSON 对象
  if (candidate.startsWith('{') && candidate.endsWith('}')) {
    try {
      const parsed = JSON.parse(candidate);
      if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
        // A. 检查是否为剧本场景对象 (具有 description 或 options 字段)
        if (parsed.description || (parsed.options && Array.isArray(parsed.options))) {
          const scriptText = convertSceneJsonToScript(parsed);
          if (scriptText) return scriptText;
        }

        // B. 检查单一字段包装 (如 { "response": "..." })
        const keys = Object.keys(parsed);
        if (keys.length === 1 && typeof parsed[keys[0]] === 'string') {
          const key = keys[0].toLowerCase();
          if (['response', 'content', 'answer', 'text', 'message', 'result', 'reply', 'output'].includes(key)) {
            return unwrapJsonEnvelope(parsed[keys[0]]);
          }
        }
      }
    } catch {
      // 非标准 JSON 或流式不完整，保持原文
    }
  }

  return text;
}

export function formatMarkdown(text: string, options?: { streaming?: boolean }): string {
  if (!text) return '';
  const source = options?.streaming ? stabilizeStreamingMarkdown(text) : text;
  const unwrapped = unwrapJsonEnvelope(source);
  const { processedText, mathPlaceholders } = preprocessMath(unwrapped);
  let html = md.render(processedText);

  // Restore KaTeX placeholders
  mathPlaceholders.forEach((renderedMath, placeholder) => {
    html = html.replace(placeholder, renderedMath);
  });

  return html;
}

/**
 * Trigger Mermaid rendering on all unrendered .mermaid-chart elements
 */
export async function renderMermaidCharts(container?: HTMLElement): Promise<void> {
  if (typeof window === 'undefined') return;
  const root = container || document;
  const elements = root.querySelectorAll<HTMLElement>('.mermaid-chart:not([data-processed="true"])');
  if (!elements || elements.length === 0) return;

  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    const code = el.getAttribute('data-mermaid') || el.textContent || '';
    const id = `mermaid-svg-${Date.now()}-${i}`;
    try {
      el.setAttribute('data-processed', 'true');
      const { svg } = await mermaid.render(id, code);
      el.innerHTML = svg;
    } catch (err) {
      console.warn('Mermaid rendering failed:', err);
      el.innerHTML = `<pre class="text-xs text-rose-500 font-mono p-2 bg-rose-50 rounded">${escapeHtml(code)}</pre>`;
    }
  }
}

async function copyCodeButton(button: HTMLButtonElement): Promise<void> {
  const codeId = button.dataset.codeId;
  const codeElement = codeId ? document.getElementById(codeId) : null;
  if (!codeElement) return;

  const text = codeElement.textContent || '';
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  }

  const copyIcon = button.querySelector('.copy-icon');
  const checkIcon = button.querySelector('.check-icon');
  const copyText = button.querySelector('.copy-text');
  copyIcon?.classList.add('hidden');
  checkIcon?.classList.remove('hidden');
  if (copyText) copyText.textContent = '已复制';

  window.setTimeout(() => {
    copyIcon?.classList.remove('hidden');
    checkIcon?.classList.add('hidden');
    if (copyText) copyText.textContent = '复制代码';
  }, 1800);
}

if (typeof window !== 'undefined') {
  // Event delegation keeps buttons inside v-html functional without inline JS.
  if (!(window as Window & { __magicforgeCodeCopyBound?: boolean }).__magicforgeCodeCopyBound) {
    document.addEventListener('click', (event) => {
      const target = event.target as Element | null;
      const button = target?.closest<HTMLButtonElement>('.code-copy-btn');
      if (button) void copyCodeButton(button);
    });
    (window as Window & { __magicforgeCodeCopyBound?: boolean }).__magicforgeCodeCopyBound = true;
  }
}
