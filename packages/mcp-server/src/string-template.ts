export function render(
  template: string,
  vars: Record<string, unknown>,
  options: { open?: string; close?: string } = {}
): string {
  const { open = "{{", close = "}}" } = options;
  const escaped = open.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedClose = close.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`${escaped}\\s*([\\w.]+)\\s*${escapedClose}`, "g");
  return template.replace(re, (_, key) => {
    const val = resolvePath(vars, key);
    return val !== undefined ? String(val) : "";
  });
}

function resolvePath(obj: any, path: string): unknown {
  const parts = path.split(".");
  let current = obj;
  for (const part of parts) {
    if (current == null) return undefined;
    current = current[part];
  }
  return current;
}

export function extractVars(
  template: string,
  options: { open?: string; close?: string } = {}
): string[] {
  const { open = "{{", close = "}}" } = options;
  const escaped = open.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedClose = close.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`${escaped}\\s*([\\w.]+)\\s*${escapedClose}`, "g");
  const vars: string[] = [];
  let match;
  while ((match = re.exec(template))) {
    if (!vars.includes(match[1])) vars.push(match[1]);
  }
  return vars;
}

export function compile(
  template: string,
  options: { open?: string; close?: string } = {}
): (vars: Record<string, unknown>) => string {
  return (vars) => render(template, vars, options);
}
