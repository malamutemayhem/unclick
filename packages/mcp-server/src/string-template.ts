export function template(str: string, values: Record<string, unknown>): string {
  return str.replace(/\$\{([^}]+)\}/g, (_, key: string) => {
    const trimmed = key.trim();
    const value = resolve(values, trimmed);
    return value === undefined || value === null ? "" : String(value);
  });
}

export function tagged(strings: TemplateStringsArray, ...keys: string[]): (values: Record<string, unknown>) => string {
  return (values: Record<string, unknown>) => {
    let result = strings[0];
    for (let i = 0; i < keys.length; i++) {
      const value = resolve(values, keys[i]);
      result += (value === undefined || value === null ? "" : String(value)) + strings[i + 1];
    }
    return result;
  };
}

export function dedent(str: string): string {
  const lines = str.split("\n");
  if (lines[0].trim() === "") lines.shift();
  if (lines.length > 0 && lines[lines.length - 1].trim() === "") lines.pop();

  let minIndent = Infinity;
  for (const line of lines) {
    if (line.trim() === "") continue;
    const match = line.match(/^(\s*)/);
    if (match) minIndent = Math.min(minIndent, match[1].length);
  }

  if (minIndent === Infinity) minIndent = 0;
  return lines.map((line) => line.slice(minIndent)).join("\n");
}

export function indent(str: string, spaces: number): string {
  const prefix = " ".repeat(spaces);
  return str.split("\n").map((line) => prefix + line).join("\n");
}

export function stripIndent(str: string): string {
  return dedent(str);
}

export function oneLine(str: string): string {
  return str.replace(/\s*\n\s*/g, " ").trim();
}

export function commaList(items: string[], conjunction = "and"): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} ${conjunction} ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, ${conjunction} ${items[items.length - 1]}`;
}

export function pluralize(count: number, singular: string, plural?: string): string {
  const p = plural || singular + "s";
  return `${count} ${count === 1 ? singular : p}`;
}

function resolve(obj: Record<string, unknown>, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current === null || current === undefined) return undefined;
    if (typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}
