export type FilterFn = (value: string, ...args: string[]) => string;

const BUILT_IN_FILTERS: Record<string, FilterFn> = {
  upper: (v) => v.toUpperCase(),
  lower: (v) => v.toLowerCase(),
  trim: (v) => v.trim(),
  capitalize: (v) => v.charAt(0).toUpperCase() + v.slice(1),
  reverse: (v) => v.split("").reverse().join(""),
  truncate: (v, len) => {
    const n = parseInt(len, 10) || 20;
    return v.length > n ? v.slice(0, n) + "..." : v;
  },
  replace: (v, from, to) => v.split(from).join(to ?? ""),
  default: (v, fallback) => v || fallback || "",
  pad: (v, len, char) => v.padStart(parseInt(len, 10) || 0, char || " "),
  padEnd: (v, len, char) => v.padEnd(parseInt(len, 10) || 0, char || " "),
};

export function interpolate(
  template: string,
  vars: Record<string, unknown>,
  customFilters?: Record<string, FilterFn>,
): string {
  const allFilters = { ...BUILT_IN_FILTERS, ...customFilters };
  return template.replace(/\{\{(.+?)\}\}/g, (_, expr: string) => {
    const parts = expr.trim().split("|").map((s) => s.trim());
    const key = parts[0];
    let value = String(resolve(vars, key) ?? "");
    for (let i = 1; i < parts.length; i++) {
      const filterParts = parts[i].split(":").map((s) => s.trim());
      const filterName = filterParts[0];
      const args = filterParts.slice(1);
      const filter = allFilters[filterName];
      if (filter) value = filter(value, ...args);
    }
    return value;
  });
}

function resolve(obj: Record<string, unknown>, path: string): unknown {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined) return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

export function listFilters(): string[] {
  return Object.keys(BUILT_IN_FILTERS);
}
