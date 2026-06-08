export function get(obj: unknown, pointer: string): unknown {
  if (pointer === "" || pointer === "/") return obj;
  const tokens = parse(pointer);
  let current: unknown = obj;
  for (const token of tokens) {
    if (current === null || current === undefined) return undefined;
    if (Array.isArray(current)) {
      const idx = parseInt(token, 10);
      current = current[idx];
    } else if (typeof current === "object") {
      current = (current as Record<string, unknown>)[token];
    } else {
      return undefined;
    }
  }
  return current;
}

export function set(obj: unknown, pointer: string, value: unknown): void {
  const tokens = parse(pointer);
  if (tokens.length === 0) return;
  let current: any = obj;
  for (let i = 0; i < tokens.length - 1; i++) {
    const token = tokens[i];
    if (Array.isArray(current)) current = current[parseInt(token, 10)];
    else current = current[token];
  }
  const lastToken = tokens[tokens.length - 1];
  if (Array.isArray(current)) {
    if (lastToken === "-") current.push(value);
    else current[parseInt(lastToken, 10)] = value;
  } else {
    current[lastToken] = value;
  }
}

export function has(obj: unknown, pointer: string): boolean {
  const tokens = parse(pointer);
  let current: unknown = obj;
  for (const token of tokens) {
    if (current === null || current === undefined) return false;
    if (Array.isArray(current)) {
      const idx = parseInt(token, 10);
      if (idx < 0 || idx >= current.length) return false;
      current = current[idx];
    } else if (typeof current === "object") {
      if (!Object.prototype.hasOwnProperty.call(current, token)) return false;
      current = (current as Record<string, unknown>)[token];
    } else {
      return false;
    }
  }
  return true;
}

export function remove(obj: unknown, pointer: string): void {
  const tokens = parse(pointer);
  if (tokens.length === 0) return;
  let current: any = obj;
  for (let i = 0; i < tokens.length - 1; i++) {
    const token = tokens[i];
    if (Array.isArray(current)) current = current[parseInt(token, 10)];
    else current = current[token];
  }
  const lastToken = tokens[tokens.length - 1];
  if (Array.isArray(current)) {
    current.splice(parseInt(lastToken, 10), 1);
  } else {
    delete current[lastToken];
  }
}

function parse(pointer: string): string[] {
  if (!pointer.startsWith("/")) throw new Error("Pointer must start with /");
  return pointer.slice(1).split("/").map((t: string) => t.replace(/~1/g, "/").replace(/~0/g, "~"));
}

export function compile(pointer: string): {
  get: (obj: unknown) => unknown;
  set: (obj: unknown, value: unknown) => void;
  has: (obj: unknown) => boolean;
} {
  return {
    get: (obj: unknown) => get(obj, pointer),
    set: (obj: unknown, value: unknown) => set(obj, pointer, value),
    has: (obj: unknown) => has(obj, pointer),
  };
}
