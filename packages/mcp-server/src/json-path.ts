export function query(obj: unknown, path: string): unknown[] {
  const tokens = tokenize(path);
  let current: unknown[] = [obj];
  for (const token of tokens) {
    const next: unknown[] = [];
    for (const item of current) {
      next.push(...applyToken(item, token));
    }
    current = next;
  }
  return current;
}

type PathToken =
  | { type: "root" }
  | { type: "child"; key: string }
  | { type: "index"; idx: number }
  | { type: "wildcard" }
  | { type: "recursive"; key: string }
  | { type: "slice"; start?: number; end?: number };

function tokenize(path: string): PathToken[] {
  const tokens: PathToken[] = [];
  let i = 0;
  if (path[i] === "$") { tokens.push({ type: "root" }); i++; }
  while (i < path.length) {
    if (path[i] === ".") {
      i++;
      if (path[i] === ".") {
        i++;
        let key = "";
        while (i < path.length && path[i] !== "." && path[i] !== "[") key += path[i++];
        tokens.push({ type: "recursive", key: key || "*" });
      } else if (path[i] === "*") {
        tokens.push({ type: "wildcard" });
        i++;
      } else {
        let key = "";
        while (i < path.length && path[i] !== "." && path[i] !== "[") key += path[i++];
        if (key) tokens.push({ type: "child", key });
      }
    } else if (path[i] === "[") {
      i++;
      if (path[i] === "*") {
        tokens.push({ type: "wildcard" });
        i++;
      } else if (path[i] === "'" || path[i] === '"') {
        const quote = path[i++];
        let key = "";
        while (i < path.length && path[i] !== quote) key += path[i++];
        i++;
        tokens.push({ type: "child", key });
      } else {
        let numStr = "";
        while (i < path.length && path[i] !== "]") numStr += path[i++];
        if (numStr.includes(":")) {
          const parts = numStr.split(":");
          tokens.push({ type: "slice", start: parts[0] ? Number(parts[0]) : undefined, end: parts[1] ? Number(parts[1]) : undefined });
        } else {
          tokens.push({ type: "index", idx: Number(numStr) });
        }
      }
      if (path[i] === "]") i++;
    } else {
      i++;
    }
  }
  return tokens;
}

function applyToken(item: unknown, token: PathToken): unknown[] {
  if (token.type === "root") return [item];
  if (item === null || item === undefined) return [];

  if (token.type === "child") {
    if (typeof item === "object" && !Array.isArray(item)) {
      const val = (item as Record<string, unknown>)[token.key];
      return val !== undefined ? [val] : [];
    }
    return [];
  }

  if (token.type === "index") {
    if (Array.isArray(item)) {
      const idx = token.idx < 0 ? item.length + token.idx : token.idx;
      return idx >= 0 && idx < item.length ? [item[idx]] : [];
    }
    return [];
  }

  if (token.type === "wildcard") {
    if (Array.isArray(item)) return item;
    if (typeof item === "object" && item !== null) return Object.values(item);
    return [];
  }

  if (token.type === "slice") {
    if (!Array.isArray(item)) return [];
    const start = token.start ?? 0;
    const end = token.end ?? item.length;
    return item.slice(start, end);
  }

  if (token.type === "recursive") {
    return recursiveDescend(item, token.key);
  }

  return [];
}

function recursiveDescend(item: unknown, key: string): unknown[] {
  const results: unknown[] = [];
  if (typeof item === "object" && item !== null) {
    if (!Array.isArray(item)) {
      const obj = item as Record<string, unknown>;
      if (key === "*") {
        results.push(...Object.values(obj));
      } else if (key in obj) {
        results.push(obj[key]);
      }
      for (const val of Object.values(obj)) {
        results.push(...recursiveDescend(val, key));
      }
    } else {
      for (const val of item) {
        results.push(...recursiveDescend(val, key));
      }
    }
  }
  return results;
}

export function queryFirst(obj: unknown, path: string): unknown | undefined {
  const results = query(obj, path);
  return results.length > 0 ? results[0] : undefined;
}
