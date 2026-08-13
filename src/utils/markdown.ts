import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  breaks: true
});

const LANGUAGE_HINTS = new Set([
  'bash', 'c', 'cpp', 'csharp', 'css', 'go', 'html', 'java', 'javascript',
  'json', 'kotlin', 'markdown', 'php', 'python', 'rust', 'sql', 'swift',
  'text', 'toml', 'tsx', 'typescript', 'xml', 'yaml', 'vue'
]);

function escapeHtml(value: string): string {
  return md.utils.escapeHtml(value);
}

function normalizeFence(token: { info: string; content: string }) {
  let language = token.info.trim().split(/\s+/)[0]?.toLowerCase() || '';
  let code = token.content;

  // Some model responses use ```text followed by the actual language on line 1.
  // Treat that line as metadata instead of rendering it as source code.
  if (!language || ['text', 'txt', 'plain', 'plaintext'].includes(language)) {
    const match = code.match(/^\s*([a-z][a-z0-9+#-]*)\s*\r?\n/i);
    const hintedLanguage = match?.[1]?.toLowerCase();
    if (hintedLanguage && LANGUAGE_HINTS.has(hintedLanguage) && hljs.getLanguage(hintedLanguage)) {
      language = hintedLanguage;
      code = code.slice(match![0].length);
    }
  }

  if (!language || !hljs.getLanguage(language)) {
    language = 'text';
  }

  // markdown-it includes the fence's terminal newline in token.content.
  // Removing only the fence padding prevents an empty visual row above the code.
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

// A custom fence renderer is important here: markdown-it's highlight callback
// is only allowed to return the contents of <code>, not another <pre>/<div>.
md.renderer.rules.fence = (tokens, index) => {
  const token = tokens[index];
  const { language, code } = normalizeFence(token);
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

export function formatMarkdown(text: string): string {
  return text ? md.render(text) : '';
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
