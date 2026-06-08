export function render(template: string, data: Record<string, unknown>): string {
  return template.replace(/\{\{([^}]+)\}\}/g, (_match, expr: string) => {
    const trimmed = expr.trim();
    if (trimmed.startsWith("#if ")) return "";
    if (trimmed === "/if") return "";
    if (trimmed.startsWith("#each ")) return "";
    if (trimmed === "/each") return "";
    const value = resolve(data, trimmed);
    return value === undefined || value === null ? "" : String(value);
  });
}

export function renderFull(template: string, data: Record<string, unknown>): string {
  let result = processEach(template, data);
  result = processIf(result, data);
  result = render(result, data);
  return result;
}

function processIf(template: string, data: Record<string, unknown>): string {
  const ifRegex = /\{\{#if\s+([^}]+)\}\}([\s\S]*?)(?:\{\{else\}\}([\s\S]*?))?\{\{\/if\}\}/g;
  return template.replace(ifRegex, (_match, condition: string, truthy: string, falsy: string) => {
    const value = resolve(data, condition.trim());
    if (isTruthy(value)) return truthy;
    return falsy || "";
  });
}

function processEach(template: string, data: Record<string, unknown>): string {
  const eachRegex = /\{\{#each\s+([^}]+)\}\}([\s\S]*?)\{\{\/each\}\}/g;
  return template.replace(eachRegex, (_match, key: string, body: string) => {
    const arr = resolve(data, key.trim());
    if (!Array.isArray(arr)) return "";
    return arr.map((item, index) => {
      const itemData: Record<string, unknown> = typeof item === "object" && item !== null
        ? { ...data, ...item as Record<string, unknown>, "@index": index, "@first": index === 0, "@last": index === arr.length - 1 }
        : { ...data, ".": item, "@index": index, "@first": index === 0, "@last": index === arr.length - 1 };
      let rendered = processIf(body, itemData);
      rendered = render(rendered, itemData);
      return rendered;
    }).join("");
  });
}

function resolve(data: Record<string, unknown>, path: string): unknown {
  if (path === ".") return data["."];
  const parts = path.split(".");
  let current: unknown = data;
  for (const part of parts) {
    if (current === null || current === undefined) return undefined;
    if (typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

function isTruthy(value: unknown): boolean {
  if (value === null || value === undefined || value === false || value === 0 || value === "") return false;
  if (Array.isArray(value) && value.length === 0) return false;
  return true;
}

export function escape(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function unescape(str: string): string {
  return str
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&");
}
