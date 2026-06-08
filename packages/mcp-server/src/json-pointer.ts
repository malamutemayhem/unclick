function parsePath(pointer: string): string[] {
  if (pointer === "" || pointer === "/") return [];
  if (!pointer.startsWith("/")) throw new Error("JSON pointer must start with /");
  return pointer
    .slice(1)
    .split("/")
    .map((s) => s.replace(/~1/g, "/").replace(/~0/g, "~"));
}

function escape(token: string): string {
  return token.replace(/~/g, "~0").replace(/\//g, "~1");
}

export function get(obj: unknown, pointer: string): unknown {
  const tokens = parsePath(pointer);
  let current: unknown = obj;
  for (const token of tokens) {
    if (current === null || current === undefined) return undefined;
    if (Array.isArray(current)) {
      const idx = Number(token);
      if (Number.isNaN(idx)) return undefined;
      current = current[idx];
    } else if (typeof current === "object") {
      current = (current as Record<string, unknown>)[token];
    } else {
      return undefined;
    }
  }
  return current;
}

export function set(obj: unknown, pointer: string, value: unknown): unknown {
  if (pointer === "" || pointer === "/") return value;
  const tokens = parsePath(pointer);
  const root = structuredClone(obj) as Record<string, unknown>;
  let current: unknown = root;
  for (let i = 0; i < tokens.length - 1; i++) {
    const token = tokens[i];
    if (Array.isArray(current)) {
      current = current[Number(token)];
    } else if (typeof current === "object" && current !== null) {
      current = (current as Record<string, unknown>)[token];
    }
  }
  const lastToken = tokens[tokens.length - 1];
  if (Array.isArray(current)) {
    if (lastToken === "-") {
      current.push(value);
    } else {
      current[Number(lastToken)] = value;
    }
  } else if (typeof current === "object" && current !== null) {
    (current as Record<string, unknown>)[lastToken] = value;
  }
  return root;
}

export function remove(obj: unknown, pointer: string): unknown {
  const tokens = parsePath(pointer);
  if (tokens.length === 0) return undefined;
  const root = structuredClone(obj) as Record<string, unknown>;
  let current: unknown = root;
  for (let i = 0; i < tokens.length - 1; i++) {
    const token = tokens[i];
    if (Array.isArray(current)) {
      current = current[Number(token)];
    } else if (typeof current === "object" && current !== null) {
      current = (current as Record<string, unknown>)[token];
    }
  }
  const lastToken = tokens[tokens.length - 1];
  if (Array.isArray(current)) {
    current.splice(Number(lastToken), 1);
  } else if (typeof current === "object" && current !== null) {
    delete (current as Record<string, unknown>)[lastToken];
  }
  return root;
}

export function has(obj: unknown, pointer: string): boolean {
  const tokens = parsePath(pointer);
  let current: unknown = obj;
  for (const token of tokens) {
    if (current === null || current === undefined) return false;
    if (Array.isArray(current)) {
      const idx = Number(token);
      if (idx < 0 || idx >= current.length) return false;
      current = current[idx];
    } else if (typeof current === "object") {
      if (!(token in (current as Record<string, unknown>))) return false;
      current = (current as Record<string, unknown>)[token];
    } else {
      return false;
    }
  }
  return true;
}

export function compile(pointer: string): string {
  return "/" + pointer.split(".").map(escape).join("/");
}

export function toPointer(path: string[]): string {
  return "/" + path.map(escape).join("/");
}
