export function template(str: string, vars: Record<string, unknown>): string {
  return str.replace(/\$\{([^}]+)\}/g, (_: string, key: string) => {
    const trimmed = key.trim();
    const value = resolve(vars, trimmed);
    return value === undefined ? "" : String(value);
  });
}

export function namedTemplate(str: string, vars: Record<string, unknown>): string {
  return str.replace(/:(\w+)/g, (_: string, key: string) => {
    const value = vars[key];
    return value === undefined ? `:${key}` : String(value);
  });
}

export function printf(format: string, ...args: unknown[]): string {
  let i = 0;
  return format.replace(/%([sdfo%])/g, (_: string, spec: string) => {
    if (spec === "%") return "%";
    const arg = args[i++];
    switch (spec) {
      case "s": return String(arg);
      case "d": return String(Number(arg));
      case "f": return String(Number(arg));
      case "o": return JSON.stringify(arg);
      default: return String(arg);
    }
  });
}

export function dedent(str: string): string {
  const lines = str.split("\n");
  if (lines[0].trim() === "") lines.shift();
  if (lines.length > 0 && lines[lines.length - 1].trim() === "") lines.pop();
  const indents = lines.filter((l) => l.trim().length > 0).map((l) => {
    const match = l.match(/^(\s+)/);
    return match ? match[1].length : 0;
  });
  const minIndent = indents.length > 0 ? Math.min(...indents) : 0;
  return lines.map((l) => l.slice(minIndent)).join("\n");
}

export function indent(str: string, spaces: number): string {
  const prefix = " ".repeat(spaces);
  return str.split("\n").map((line) => prefix + line).join("\n");
}

function resolve(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce((acc: unknown, key: string) => {
    if (acc === null || acc === undefined) return undefined;
    return (acc as Record<string, unknown>)[key];
  }, obj);
}
