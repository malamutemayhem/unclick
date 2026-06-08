export function render(template: string, data: Record<string, unknown>): string {
  return template.replace(/\{\{(.*?)\}\}/g, (_: string, expr: string) => {
    const trimmed = expr.trim();
    if (trimmed.startsWith("#if ")) return "";
    if (trimmed === "/if") return "";
    if (trimmed.startsWith("#each ")) return "";
    if (trimmed === "/each") return "";
    const value = resolvePath(data, trimmed);
    return value === undefined ? "" : String(value);
  });
}

export function renderWithBlocks(template: string, data: Record<string, unknown>): string {
  let result = template;
  result = processEach(result, data);
  result = processIf(result, data);
  result = render(result, data);
  return result;
}

function processIf(template: string, data: Record<string, unknown>): string {
  const ifRegex = /\{\{#if\s+([\w.]+)\}\}([\s\S]*?)(?:\{\{else\}\}([\s\S]*?))?\{\{\/if\}\}/g;
  return template.replace(ifRegex, (_: string, key: string, truthy: string, falsy: string) => {
    const value = resolvePath(data, key);
    return value ? truthy : (falsy || "");
  });
}

function processEach(template: string, data: Record<string, unknown>): string {
  const eachRegex = /\{\{#each\s+([\w.]+)\}\}([\s\S]*?)\{\{\/each\}\}/g;
  return template.replace(eachRegex, (_: string, key: string, body: string) => {
    const arr = resolvePath(data, key);
    if (!Array.isArray(arr)) return "";
    return arr.map((item: unknown, index: number) => {
      let rendered = body;
      if (typeof item === "object" && item !== null) {
        const obj = item as Record<string, unknown>;
        for (const [k, v] of Object.entries(obj)) {
          rendered = rendered.replace(new RegExp(`\\{\\{${k}\\}\\}`, "g"), String(v ?? ""));
        }
      }
      rendered = rendered.replace(/\{\{this\}\}/g, String(item));
      rendered = rendered.replace(/\{\{@index\}\}/g, String(index));
      return rendered;
    }).join("");
  });
}

function resolvePath(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce((acc: unknown, key: string) => {
    if (acc === null || acc === undefined) return undefined;
    return (acc as Record<string, unknown>)[key];
  }, obj);
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
