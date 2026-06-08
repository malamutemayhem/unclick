export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export function unescapeHtml(input: string): string {
  return input
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'");
}

export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

export function escapeRegex(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function sanitizeFilename(input: string): string {
  return input
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, "")
    .replace(/\s+/g, "_")
    .replace(/^\.+/, "")
    .slice(0, 255);
}

export function truncate(input: string, maxLength: number, suffix = "..."): string {
  if (input.length <= maxLength) return input;
  return input.slice(0, maxLength - suffix.length) + suffix;
}

export function normalizeWhitespace(input: string): string {
  return input.replace(/\s+/g, " ").trim();
}

export function removeControlChars(input: string): string {
  return input.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, "");
}

export function sanitizeSql(input: string): string {
  return input.replace(/'/g, "''");
}

export function escapeShell(input: string): string {
  return "'" + input.replace(/'/g, "'\\''") + "'";
}
