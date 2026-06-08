export function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function stripTags(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

export function sanitizeFilename(input: string): string {
  return input
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, "")
    .replace(/^\.+/, "")
    .replace(/\.+$/, "")
    .replace(/\s+/g, "_")
    .slice(0, 255);
}

export function sanitizeUrl(input: string): string {
  const trimmed = input.trim();
  if (/^javascript:/i.test(trimmed)) return "";
  if (/^data:/i.test(trimmed)) return "";
  if (/^vbscript:/i.test(trimmed)) return "";
  return trimmed;
}

export function escapeRegex(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function escapeSql(input: string): string {
  return input.replace(/'/g, "''");
}

export function sanitizeHeaderValue(input: string): string {
  return input.replace(/[\r\n]/g, "");
}

export function normalizeWhitespace(input: string): string {
  return input.replace(/\s+/g, " ").trim();
}

export function truncate(input: string, maxLength: number, suffix = "..."): string {
  if (input.length <= maxLength) return input;
  return input.slice(0, maxLength - suffix.length) + suffix;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function camelToKebab(input: string): string {
  return input.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

export function kebabToCamel(input: string): string {
  return input.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}
