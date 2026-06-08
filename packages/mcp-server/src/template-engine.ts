export interface TemplateOptions {
  openTag?: string;
  closeTag?: string;
  escape?: boolean;
}

const DEFAULTS: Required<TemplateOptions> = {
  openTag: "{{",
  closeTag: "}}",
  escape: true,
};

export function render(
  template: string,
  data: Record<string, any>,
  options?: TemplateOptions
): string {
  const opts = { ...DEFAULTS, ...options };
  const open = escapeRegex(opts.openTag);
  const close = escapeRegex(opts.closeTag);
  const re = new RegExp(`${open}\\s*(.+?)\\s*${close}`, "g");
  return template.replace(re, (_match: string, key: string) => {
    if (key.startsWith("#if ")) return "";
    if (key === "/if") return "";
    if (key.startsWith("#each ")) return "";
    if (key === "/each") return "";
    const val = resolve(data, key.trim());
    if (val === undefined || val === null) return "";
    const str = String(val);
    return opts.escape ? escapeHtml(str) : str;
  });
}

export function compile(
  template: string,
  options?: TemplateOptions
): (data: Record<string, any>) => string {
  return (data: Record<string, any>) => render(template, data, options);
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function unescapeHtml(str: string): string {
  return str
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&");
}

function resolve(obj: Record<string, any>, path: string): any {
  return path.split(".").reduce((current: any, key: string) => {
    if (current === null || current === undefined) return undefined;
    return current[key];
  }, obj);
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
