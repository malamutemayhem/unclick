export interface SanitizeOptions {
  allowedTags?: string[];
  allowedAttributes?: Record<string, string[]>;
  stripEmpty?: boolean;
  maxLength?: number;
  allowedProtocols?: string[];
}

const DEFAULT_ALLOWED_TAGS = [
  "a", "b", "i", "em", "strong", "p", "br", "ul", "ol", "li",
  "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre", "code",
  "span", "div", "table", "thead", "tbody", "tr", "th", "td",
  "img", "hr", "sub", "sup", "dl", "dt", "dd",
];

const DEFAULT_ALLOWED_ATTRS: Record<string, string[]> = {
  a: ["href", "title", "target", "rel"],
  img: ["src", "alt", "width", "height"],
  td: ["colspan", "rowspan"],
  th: ["colspan", "rowspan"],
  "*": ["class", "id"],
};

const DEFAULT_PROTOCOLS = ["http:", "https:", "mailto:"];

export function sanitize(html: string, options: SanitizeOptions = {}): string {
  const allowedTags = new Set(options.allowedTags || DEFAULT_ALLOWED_TAGS);
  const allowedAttrs = options.allowedAttributes || DEFAULT_ALLOWED_ATTRS;
  const allowedProtocols = options.allowedProtocols || DEFAULT_PROTOCOLS;
  const maxLength = options.maxLength;

  let result = html;

  result = result.replace(/<!--[\s\S]*?-->/g, "");

  result = result.replace(/<script[\s\S]*?<\/script>/gi, "");
  result = result.replace(/<style[\s\S]*?<\/style>/gi, "");

  result = result.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)\/?\s*>/g, (match, tag, attrs) => {
    const lowerTag = tag.toLowerCase();
    if (!allowedTags.has(lowerTag)) return "";

    const cleanAttrs = sanitizeAttributes(lowerTag, attrs, allowedAttrs, allowedProtocols);
    const isVoid = ["br", "hr", "img", "input", "meta", "link"].includes(lowerTag);
    const isSelfClosing = match.endsWith("/>");
    const isClosing = match.startsWith("</");

    if (isClosing) return `</${lowerTag}>`;
    if (isVoid || isSelfClosing) return `<${lowerTag}${cleanAttrs} />`;
    return `<${lowerTag}${cleanAttrs}>`;
  });

  if (options.stripEmpty) {
    result = result.replace(/<([a-zA-Z]+)([^>]*)>\s*<\/\1>/g, "");
  }

  if (maxLength && result.length > maxLength) {
    result = result.slice(0, maxLength);
  }

  return result;
}

function sanitizeAttributes(
  tag: string,
  attrStr: string,
  allowedAttrs: Record<string, string[]>,
  allowedProtocols: string[]
): string {
  const tagAttrs = allowedAttrs[tag] || [];
  const globalAttrs = allowedAttrs["*"] || [];
  const allowed = new Set([...tagAttrs, ...globalAttrs]);

  const attrs: string[] = [];
  const attrRegex = /([a-zA-Z_][\w-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|(\S+)))?/g;
  let m;
  while ((m = attrRegex.exec(attrStr)) !== null) {
    const name = m[1].toLowerCase();
    const value = m[2] ?? m[3] ?? m[4] ?? "";

    if (!allowed.has(name)) continue;

    if (name === "href" || name === "src") {
      if (!isAllowedUrl(value, allowedProtocols)) continue;
    }

    if (/^on/i.test(name)) continue;

    if (/javascript:/i.test(value)) continue;

    attrs.push(` ${name}="${escapeAttr(value)}"`);
  }

  return attrs.join("");
}

function isAllowedUrl(url: string, protocols: string[]): boolean {
  const trimmed = url.trim().toLowerCase();
  if (trimmed.startsWith("javascript:")) return false;
  if (trimmed.startsWith("data:")) return false;
  if (trimmed.startsWith("vbscript:")) return false;
  if (trimmed.startsWith("/") || trimmed.startsWith("#") || trimmed.startsWith("?")) return true;
  for (const proto of protocols) {
    if (trimmed.startsWith(proto)) return true;
  }
  if (!trimmed.includes(":")) return true;
  return false;
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function stripTags(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, "");
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function unescapeHtml(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}
