export function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export function stripTags(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

export function sanitizeFilename(input: string): string {
  return input
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, "")
    .replace(/^\.+/, "")
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

export function escapeShell(input: string): string {
  return "'" + input.replace(/'/g, "'\\''") + "'";
}

export function truncate(input: string, maxLen: number, suffix: string = "..."): string {
  if (input.length <= maxLen) return input;
  return input.slice(0, maxLen - suffix.length) + suffix;
}

export function normalizeWhitespace(input: string): string {
  return input.replace(/\s+/g, " ").trim();
}

export function removeNullBytes(input: string): string {
  return input.replace(/\0/g, "");
}
