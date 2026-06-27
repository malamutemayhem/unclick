export interface SanitizeOptions {
  allowedTags?: string[];
  allowedAttributes?: Record<string, string[]>;
  stripEmpty?: boolean;
}

const DEFAULT_ALLOWED_TAGS = [
  "p", "br", "b", "i", "em", "strong", "u", "s", "a",
  "ul", "ol", "li", "h1", "h2", "h3", "h4", "h5", "h6",
  "blockquote", "code", "pre", "span", "div", "img",
  "table", "thead", "tbody", "tr", "th", "td",
];

const DEFAULT_ALLOWED_ATTRS: Record<string, string[]> = {
  a: ["href", "title", "target"],
  img: ["src", "alt", "width", "height"],
  td: ["colspan", "rowspan"],
  th: ["colspan", "rowspan"],
};

export class MarkupSanitizer {
  static sanitize(html: string, options: SanitizeOptions = {}): string {
    const allowedTags = new Set(options.allowedTags || DEFAULT_ALLOWED_TAGS);
    const allowedAttrs = options.allowedAttributes || DEFAULT_ALLOWED_ATTRS;

    let result = html;

    result = result.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
    result = result.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");
    result = result.replace(/<!--[\s\S]*?-->/g, "");

    result = result.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g, (match, tag, attrs) => {
      const lowerTag = tag.toLowerCase();

      if (!allowedTags.has(lowerTag)) return "";

      if (match.startsWith("</")) return `</${lowerTag}>`;

      const cleanAttrs = MarkupSanitizer.sanitizeAttributes(lowerTag, attrs, allowedAttrs);
      const selfClosing = match.endsWith("/>") ? " /" : "";

      return cleanAttrs ? `<${lowerTag} ${cleanAttrs}${selfClosing}>` : `<${lowerTag}${selfClosing}>`;
    });

    if (options.stripEmpty) {
      result = result.replace(/<(\w+)(\s[^>]*)?>(\s*)<\/\1>/g, "");
    }

    return result;
  }

  private static sanitizeAttributes(
    tag: string,
    attrString: string,
    allowed: Record<string, string[]>,
  ): string {
    const tagAllowed = allowed[tag] || [];
    if (tagAllowed.length === 0) return "";

    const attrs: string[] = [];
    const attrRegex = /(\w+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\S+))/g;
    let match;

    while ((match = attrRegex.exec(attrString)) !== null) {
      const name = match[1].toLowerCase();
      const value = match[2] ?? match[3] ?? match[4] ?? "";

      if (!tagAllowed.includes(name)) continue;

      if (name === "href" || name === "src") {
        if (MarkupSanitizer.isDangerousUrl(value)) continue;
      }

      attrs.push(`${name}="${MarkupSanitizer.escapeAttr(value)}"`);
    }

    return attrs.join(" ");
  }

  static isDangerousUrl(url: string): boolean {
    const trimmed = url.trim().toLowerCase();
    return trimmed.startsWith("javascript:") || trimmed.startsWith("data:") || trimmed.startsWith("vbscript:");
  }

  static escapeHtml(text: string): string {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  static unescapeHtml(text: string): string {
    return text
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  }

  static stripTags(html: string): string {
    return html.replace(/<[^>]*>/g, "");
  }

  private static escapeAttr(value: string): string {
    return value.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
}
