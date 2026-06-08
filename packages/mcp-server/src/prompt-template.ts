export interface TemplateOptions {
  openDelimiter?: string;
  closeDelimiter?: string;
  strict?: boolean;
}

const DEFAULT_OPEN = "{{";
const DEFAULT_CLOSE = "}}";

export function render(
  template: string,
  variables: Record<string, string | number | boolean>,
  options: TemplateOptions = {},
): string {
  const open = escapeRegex(options.openDelimiter ?? DEFAULT_OPEN);
  const close = escapeRegex(options.closeDelimiter ?? DEFAULT_CLOSE);
  const pattern = new RegExp(`${open}\\s*([\\w.]+)\\s*${close}`, "g");

  return template.replace(pattern, (_match, key: string) => {
    if (key in variables) return String(variables[key]);
    if (options.strict) throw new Error(`Missing variable: ${key}`);
    return _match;
  });
}

export function extractVariables(template: string, options: TemplateOptions = {}): string[] {
  const open = escapeRegex(options.openDelimiter ?? DEFAULT_OPEN);
  const close = escapeRegex(options.closeDelimiter ?? DEFAULT_CLOSE);
  const pattern = new RegExp(`${open}\\s*([\\w.]+)\\s*${close}`, "g");
  const vars: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(template)) !== null) {
    if (!vars.includes(match[1])) vars.push(match[1]);
  }
  return vars;
}

export function validate(
  template: string,
  variables: Record<string, string | number | boolean>,
  options: TemplateOptions = {},
): { valid: boolean; missing: string[] } {
  const needed = extractVariables(template, options);
  const missing = needed.filter((v) => !(v in variables));
  return { valid: missing.length === 0, missing };
}

export function buildPrompt(
  sections: Array<{ role: string; content: string }>,
  variables: Record<string, string | number | boolean> = {},
): string {
  return sections
    .map((s) => `[${s.role}]\n${render(s.content, variables)}`)
    .join("\n\n");
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
