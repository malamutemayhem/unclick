export function template(str: string, vars: Record<string, unknown>, opts: { open?: string; close?: string } = {}): string {
  const open = opts.open ?? "{{";
  const close = opts.close ?? "}}";
  const escaped = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`${escaped(open)}\\s*(\\w+(?:\\.\\w+)*)\\s*${escaped(close)}`, "g");
  return str.replace(pattern, (_: string, path: string) => {
    const value = resolvePath(vars, path);
    return value !== undefined ? String(value) : `${open}${path}${close}`;
  });
}

function resolvePath(obj: Record<string, unknown>, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

export function strip(str: string, opts: { open?: string; close?: string } = {}): string {
  const open = opts.open ?? "{{";
  const close = opts.close ?? "}}";
  const escaped = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`${escaped(open)}\\s*\\w+(?:\\.\\w+)*\\s*${escaped(close)}`, "g");
  return str.replace(pattern, "");
}

export function extractVars(str: string, opts: { open?: string; close?: string } = {}): string[] {
  const open = opts.open ?? "{{";
  const close = opts.close ?? "}}";
  const escaped = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`${escaped(open)}\\s*(\\w+(?:\\.\\w+)*)\\s*${escaped(close)}`, "g");
  const vars: string[] = [];
  let match = pattern.exec(str);
  while (match) {
    if (!vars.includes(match[1])) vars.push(match[1]);
    match = pattern.exec(str);
  }
  return vars;
}
