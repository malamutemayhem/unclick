// UnClick Doc -> HTML renderer.
//
// Deliberately dumb and constant: one stylesheet, one layout, for every doc.
// That is what makes every site look identical and load instantly. All text is
// escaped (no page-supplied markup or script can survive into the output), the
// content column is fixed, images are hard-capped, and media stays external.

import type { Block, Span, Theme, UnclickDoc } from "./format.js";

/** Hard ceiling on rendered image width, in px. Matches the converter default. */
export const MAX_IMAGE_WIDTH = 640;

export interface RenderOptions {
  theme?: Theme;
  /** Emit a full HTML document (default) or just the body fragment. */
  fragment?: boolean;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Only allow http(s) and mailto links; everything else (javascript:, data:) is dropped. */
function safeHref(href: string): string | undefined {
  const trimmed = href.trim();
  if (/^(https?:|mailto:)/i.test(trimmed)) return trimmed;
  if (/^\//.test(trimmed) || /^#/.test(trimmed)) return trimmed;
  return undefined;
}

function renderSpan(span: Span): string {
  let html = escapeHtml(span.text);
  if (span.code) html = `<code>${html}</code>`;
  if (span.bold) html = `<strong>${html}</strong>`;
  if (span.italic) html = `<em>${html}</em>`;
  if (span.href) {
    const href = safeHref(span.href);
    if (href) {
      html = `<a href="${escapeHtml(href)}" rel="noopener noreferrer">${html}</a>`;
    }
  }
  return html;
}

function renderSpans(spans: Span[]): string {
  return spans.map(renderSpan).join("");
}

function renderBlock(block: Block): string {
  switch (block.kind) {
    case "heading":
      return `<h${block.level}>${renderSpans(block.spans)}</h${block.level}>`;
    case "paragraph":
      return `<p>${renderSpans(block.spans)}</p>`;
    case "quote":
      return `<blockquote>${renderSpans(block.spans)}</blockquote>`;
    case "list": {
      const tag = block.ordered ? "ol" : "ul";
      const items = block.items.map((item) => `<li>${renderSpans(item)}</li>`).join("");
      return `<${tag}>${items}</${tag}>`;
    }
    case "code": {
      const lang = block.language ? ` class="language-${escapeHtml(block.language)}"` : "";
      return `<pre><code${lang}>${escapeHtml(block.text)}</code></pre>`;
    }
    case "table": {
      const head = block.head
        ? `<thead><tr>${block.head.map((c) => `<th>${escapeHtml(c)}</th>`).join("")}</tr></thead>`
        : "";
      const body = block.rows
        .map((row) => `<tr>${row.map((c) => `<td>${escapeHtml(c)}</td>`).join("")}</tr>`)
        .join("");
      return `<div class="uc-table-wrap"><table>${head}<tbody>${body}</tbody></table></div>`;
    }
    case "image": {
      const cap = Math.min(block.width ?? MAX_IMAGE_WIDTH, MAX_IMAGE_WIDTH);
      const alt = escapeHtml(block.alt ?? "");
      const dims = block.height !== undefined ? ` height="${block.height}"` : "";
      return `<img class="uc-img" src="${escapeHtml(block.src)}" alt="${alt}" loading="lazy" style="max-width:${cap}px"${dims}>`;
    }
    case "media": {
      const label = escapeHtml(block.title ?? block.provider ?? "Open media");
      const href = safeHref(block.url);
      const inner = `<span class="uc-media-icon">&#9654;</span><span>${label}</span><span class="uc-media-host">${escapeHtml(block.provider ?? "")}</span>`;
      return href
        ? `<a class="uc-media" href="${escapeHtml(href)}" rel="noopener noreferrer">${inner}</a>`
        : `<div class="uc-media">${inner}</div>`;
    }
    case "divider":
      return `<hr class="uc-divider">`;
    case "button":
      return `<button class="uc-button" type="button" disabled>${escapeHtml(block.label)}</button>`;
    case "input":
      return `<input class="uc-input" type="${escapeHtml(block.inputType)}" placeholder="${escapeHtml(block.placeholder ?? "")}" disabled>`;
    case "form":
      return `<form class="uc-form" onsubmit="return false">${block.blocks.map(renderBlock).join("")}</form>`;
  }
}

const STYLESHEET = `
:root{--bg:#ffffff;--fg:#1a1a1a;--muted:#5b5b5b;--rule:#e6e6e6;--link:#0b5bd3;--code-bg:#f3f3f3;--quote:#d0d0d0;--card:#f7f7f7}
[data-theme="dark"]{--bg:#16181c;--fg:#e6e7ea;--muted:#a0a3aa;--rule:#2b2f36;--link:#7ab0ff;--code-bg:#22262c;--quote:#3a3f47;--card:#1e2127}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--fg);font:18px/1.65 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
main{max-width:42rem;margin:0 auto;padding:2.5rem 1.25rem 6rem}
h1,h2,h3,h4,h5,h6{line-height:1.25;margin:2rem 0 .6rem;font-weight:650}
h1{font-size:2rem}h2{font-size:1.5rem}h3{font-size:1.25rem}h4,h5,h6{font-size:1.05rem}
p{margin:0 0 1.1rem}
a{color:var(--link);text-decoration:underline;text-underline-offset:2px}
ul,ol{margin:0 0 1.1rem;padding-left:1.4rem}
li{margin:.25rem 0}
blockquote{margin:1.2rem 0;padding:.2rem 0 .2rem 1rem;border-left:3px solid var(--quote);color:var(--muted)}
code{background:var(--code-bg);padding:.1em .35em;border-radius:4px;font-size:.9em;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
pre{background:var(--code-bg);padding:1rem;border-radius:8px;overflow:auto;margin:0 0 1.2rem}
pre code{background:none;padding:0}
.uc-img{display:block;height:auto;width:auto;margin:1.4rem auto;border-radius:8px}
.uc-table-wrap{overflow-x:auto;margin:0 0 1.3rem}
table{border-collapse:collapse;width:100%;font-size:.95rem}
th,td{border:1px solid var(--rule);padding:.5rem .65rem;text-align:left}
th{background:var(--card);font-weight:600}
.uc-divider{border:none;border-top:1px solid var(--rule);margin:2rem 0}
.uc-media{display:flex;align-items:center;gap:.6rem;background:var(--card);border:1px solid var(--rule);border-radius:8px;padding:.8rem 1rem;margin:0 0 1.3rem;text-decoration:none;color:var(--fg)}
.uc-media-icon{color:var(--link)}
.uc-media-host{margin-left:auto;color:var(--muted);font-size:.85rem}
.uc-button{font:inherit;padding:.5rem .9rem;border-radius:6px;border:1px solid var(--rule);background:var(--card);color:var(--muted);cursor:not-allowed}
.uc-input{font:inherit;padding:.5rem .7rem;border-radius:6px;border:1px solid var(--rule);background:var(--bg);color:var(--fg);width:100%;margin:0 0 1rem}
.uc-form{margin:0 0 1.3rem}
`.trim();

/** Render the body markup for a doc (no <html>/<head> wrapper). */
export function renderBody(doc: UnclickDoc): string {
  const title = doc.title ? `<h1 class="uc-title">${escapeHtml(doc.title)}</h1>` : "";
  return `<main>${title}${doc.blocks.map(renderBlock).join("")}</main>`;
}

/** Render a full, self-contained HTML document for a doc. */
export function renderUnclickDoc(doc: UnclickDoc, options: RenderOptions = {}): string {
  const theme: Theme = options.theme ?? "light";
  if (options.fragment) return renderBody(doc);
  const lang = doc.lang ? ` lang="${escapeHtml(doc.lang)}"` : "";
  const title = escapeHtml(doc.title ?? "UnClick Doc");
  return `<!doctype html>
<html data-theme="${theme}"${lang}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<style>${STYLESHEET}</style>
</head>
<body>${renderBody(doc)}</body>
</html>`;
}

/** The constant stylesheet, exposed so tests can assert look-consistency. */
export function stylesheet(): string {
  return STYLESHEET;
}
