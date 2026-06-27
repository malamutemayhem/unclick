export function render(template: string, data: Record<string, unknown>): string {
  return template.replace(/\{\{([\w.]+)(\|([^}]+))?\}\}/g, (_match, path: string, _pipe: string, filters: string) => {
    const value = resolvePath(data, path);
    if (value === undefined || value === null) return "";
    let result = String(value);
    if (filters) {
      for (const f of filters.split("|").map((s) => s.trim())) {
        result = applyFilter(result, f);
      }
    }
    return result;
  });
}

export function renderConditional(template: string, data: Record<string, unknown>): string {
  let result = template.replace(/\{\{#if\s+([\w.]+)\}\}([\s\S]*?)(\{\{#else\}\}([\s\S]*?))?\{\{\/if\}\}/g,
    (_match, path: string, ifBlock: string, _elseMatch: string, elseBlock: string) => {
      const value = resolvePath(data, path);
      return isTruthy(value) ? ifBlock : (elseBlock || "");
    }
  );
  return render(result, data);
}

export function renderLoop(template: string, data: Record<string, unknown>): string {
  let result = template.replace(/\{\{#each\s+([\w.]+)\}\}([\s\S]*?)\{\{\/each\}\}/g,
    (_match, path: string, block: string) => {
      const arr = resolvePath(data, path);
      if (!Array.isArray(arr)) return "";
      return arr.map((item, index) => {
        const ctx = typeof item === "object" && item !== null
          ? { ...data, ...item as Record<string, unknown>, _index: index }
          : { ...data, _item: item, _index: index };
        return render(block, ctx);
      }).join("");
    }
  );
  return render(result, data);
}

function resolvePath(obj: Record<string, unknown>, path: string): unknown {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined) return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

function isTruthy(value: unknown): boolean {
  if (value === null || value === undefined || value === false || value === 0 || value === "") return false;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

function applyFilter(value: string, filter: string): string {
  switch (filter) {
    case "upper": return value.toUpperCase();
    case "lower": return value.toLowerCase();
    case "trim": return value.trim();
    case "capitalize": return value.charAt(0).toUpperCase() + value.slice(1);
    case "reverse": return value.split("").reverse().join("");
    default: return value;
  }
}
