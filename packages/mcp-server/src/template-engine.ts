export function render(
  template: string,
  vars: Record<string, unknown>,
  opts?: { open?: string; close?: string }
): string {
  const open = escapeRegex(opts?.open ?? "{{");
  const close = escapeRegex(opts?.close ?? "}}");
  const pattern = new RegExp(`${open}\\s*([\\w.]+)\\s*${close}`, "g");
  return template.replace(pattern, (_, key: string) => {
    const val = resolve(vars, key);
    return val === undefined ? "" : String(val);
  });
}

export function extractVars(
  template: string,
  opts?: { open?: string; close?: string }
): string[] {
  const open = escapeRegex(opts?.open ?? "{{");
  const close = escapeRegex(opts?.close ?? "}}");
  const pattern = new RegExp(`${open}\\s*([\\w.]+)\\s*${close}`, "g");
  const vars: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = pattern.exec(template)) !== null) {
    if (!vars.includes(m[1])) vars.push(m[1]);
  }
  return vars;
}

export function hasUnresolved(
  template: string,
  vars: Record<string, unknown>,
  opts?: { open?: string; close?: string }
): boolean {
  const keys = extractVars(template, opts);
  return keys.some((k) => resolve(vars, k) === undefined);
}

function resolve(obj: Record<string, unknown>, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
