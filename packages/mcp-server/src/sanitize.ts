const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
};

const ENTITY_DECODE: Record<string, string> = {
  "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&#x27;": "'", "&#x2F;": "/",
};

export function escapeHtml(input: string): string {
  return input.replace(/[&<>"']/g, (ch: string) => HTML_ENTITIES[ch] || ch);
}

export function unescapeHtml(input: string): string {
  return input.replace(/&(?:amp|lt|gt|quot|#39|#x27|#x2F);/g, (entity: string) => ENTITY_DECODE[entity] || entity);
}

export function stripTags(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

export function escapeRegex(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function sanitizeFilename(input: string): string {
  return input
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, "")
    .replace(/\.{2,}/g, ".")
    .replace(/^\.+|\.+$/g, "")
    .trim()
    .slice(0, 255);
}

export function sanitizeUrl(input: string): string {
  const trimmed = input.trim();
  if (/^javascript:/i.test(trimmed) || /^data:/i.test(trimmed) || /^vbscript:/i.test(trimmed)) {
    return "";
  }
  return trimmed;
}

export function truncate(input: string, maxLength: number, suffix = "..."): string {
  if (input.length <= maxLength) return input;
  return input.slice(0, maxLength - suffix.length) + suffix;
}
