type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export class JsonPath {
  static query(data: JsonValue, path: string): JsonValue[] {
    const tokens = this.parse(path);
    let current: JsonValue[] = [data];
    for (const token of tokens) {
      current = this.applyToken(current, token);
    }
    return current;
  }

  static value(data: JsonValue, path: string): JsonValue | undefined {
    const results = this.query(data, path);
    return results.length > 0 ? results[0] : undefined;
  }

  private static parse(path: string): PathToken[] {
    const tokens: PathToken[] = [];
    let remaining = path;
    if (remaining.startsWith("$")) remaining = remaining.slice(1);
    while (remaining.length > 0) {
      if (remaining.startsWith(".")) {
        remaining = remaining.slice(1);
        if (remaining.startsWith(".")) {
          remaining = remaining.slice(1);
          const match = remaining.match(/^(\w+|\*)/);
          if (match) {
            tokens.push({ type: "recursive", key: match[1] });
            remaining = remaining.slice(match[0].length);
          }
        } else {
          const match = remaining.match(/^(\w+|\*)/);
          if (match) {
            tokens.push({ type: "key", key: match[1] });
            remaining = remaining.slice(match[0].length);
          }
        }
      } else if (remaining.startsWith("[")) {
        const end = remaining.indexOf("]");
        if (end === -1) break;
        const inner = remaining.slice(1, end);
        if (inner === "*") {
          tokens.push({ type: "wildcard" });
        } else if (inner.includes(":")) {
          const parts = inner.split(":");
          tokens.push({
            type: "slice",
            start: parts[0] ? parseInt(parts[0]) : undefined,
            end: parts[1] ? parseInt(parts[1]) : undefined,
          });
        } else if (inner.startsWith("'") || inner.startsWith('"')) {
          tokens.push({ type: "key", key: inner.slice(1, -1) });
        } else {
          tokens.push({ type: "index", index: parseInt(inner) });
        }
        remaining = remaining.slice(end + 1);
      } else {
        break;
      }
    }
    return tokens;
  }

  private static applyToken(items: JsonValue[], token: PathToken): JsonValue[] {
    const results: JsonValue[] = [];
    for (const item of items) {
      switch (token.type) {
        case "key":
          if (token.key === "*") {
            if (Array.isArray(item)) {
              results.push(...item);
            } else if (item !== null && typeof item === "object") {
              results.push(...Object.values(item));
            }
          } else if (item !== null && typeof item === "object" && !Array.isArray(item)) {
            if (token.key! in item) results.push(item[token.key!]);
          }
          break;
        case "index":
          if (Array.isArray(item)) {
            const idx = token.index! < 0 ? item.length + token.index! : token.index!;
            if (idx >= 0 && idx < item.length) results.push(item[idx]);
          }
          break;
        case "wildcard":
          if (Array.isArray(item)) results.push(...item);
          else if (item !== null && typeof item === "object") results.push(...Object.values(item));
          break;
        case "slice":
          if (Array.isArray(item)) {
            const start = token.start ?? 0;
            const end = token.end ?? item.length;
            results.push(...item.slice(start, end));
          }
          break;
        case "recursive":
          this.recursiveSearch(item, token.key!, results);
          break;
      }
    }
    return results;
  }

  private static recursiveSearch(item: JsonValue, key: string, results: JsonValue[]): void {
    if (item === null || typeof item !== "object") return;
    if (Array.isArray(item)) {
      if (key === "*") results.push(...item);
      for (const el of item) this.recursiveSearch(el, key, results);
    } else {
      if (key === "*") results.push(...Object.values(item));
      else if (key in item) results.push(item[key]);
      for (const v of Object.values(item)) this.recursiveSearch(v, key, results);
    }
  }

  static paths(data: JsonValue, path: string): string[] {
    const tokens = this.parse(path);
    let current: { value: JsonValue; path: string }[] = [{ value: data, path: "$" }];
    for (const token of tokens) {
      const next: { value: JsonValue; path: string }[] = [];
      for (const item of current) {
        if (token.type === "key" && token.key !== "*" && item.value !== null && typeof item.value === "object" && !Array.isArray(item.value)) {
          if (token.key! in item.value) {
            next.push({ value: item.value[token.key!], path: `${item.path}.${token.key}` });
          }
        } else if (token.type === "index" && Array.isArray(item.value)) {
          const idx = token.index! < 0 ? item.value.length + token.index! : token.index!;
          if (idx >= 0 && idx < item.value.length) {
            next.push({ value: item.value[idx], path: `${item.path}[${idx}]` });
          }
        }
      }
      current = next;
    }
    return current.map((c) => c.path);
  }
}

interface PathToken {
  type: "key" | "index" | "wildcard" | "slice" | "recursive";
  key?: string;
  index?: number;
  start?: number;
  end?: number;
}
