export function get(obj: unknown, pointer: string): unknown {
  if (pointer === "" || pointer === "/") return obj;
  const tokens = parsePointer(pointer);
  let current = obj;
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

export function set(obj: unknown, pointer: string, value: unknown): unknown {
  if (pointer === "") return value;
  const tokens = parsePointer(pointer);
  const root = structuredClone(obj) as Record<string, unknown>;
  let current: unknown = root;

  for (let i = 0; i < tokens.length - 1; i++) {
    const token = tokens[i];
    if (Array.isArray(current)) {
      current = current[parseInt(token, 10)];
    } else if (typeof current === "object" && current !== null) {
      current = (current as Record<string, unknown>)[token];
    }
  }

  const lastToken = tokens[tokens.length - 1];
  if (Array.isArray(current)) {
    if (lastToken === "-") {
      current.push(value);
    } else {
      current[parseInt(lastToken, 10)] = value;
    }
  } else if (typeof current === "object" && current !== null) {
    (current as Record<string, unknown>)[lastToken] = value;
  }

  return root;
}

export function has(obj: unknown, pointer: string): boolean {
  if (pointer === "") return true;
  const tokens = parsePointer(pointer);
  let current = obj;
  for (const token of tokens) {
    if (current === null || current === undefined) return false;
    if (Array.isArray(current)) {
      const idx = parseInt(token, 10);
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

export function remove(obj: unknown, pointer: string): unknown {
  if (pointer === "") return undefined;
  const tokens = parsePointer(pointer);
  const root = structuredClone(obj) as Record<string, unknown>;
  let current: unknown = root;

  for (let i = 0; i < tokens.length - 1; i++) {
    const token = tokens[i];
    if (Array.isArray(current)) {
      current = current[parseInt(token, 10)];
    } else if (typeof current === "object" && current !== null) {
      current = (current as Record<string, unknown>)[token];
    }
  }

  const lastToken = tokens[tokens.length - 1];
  if (Array.isArray(current)) {
    current.splice(parseInt(lastToken, 10), 1);
  } else if (typeof current === "object" && current !== null) {
    delete (current as Record<string, unknown>)[lastToken];
  }

  return root;
}

export function flatten(obj: unknown, prefix = ""): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      const path = `${prefix}/${i}`;
      if (typeof item === "object" && item !== null) {
        Object.assign(result, flatten(item, path));
      } else {
        result[path] = item;
      }
    });
  } else if (typeof obj === "object" && obj !== null) {
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      const escapedKey = key.replace(/~/g, "~0").replace(/\//g, "~1");
      const path = `${prefix}/${escapedKey}`;
      if (typeof value === "object" && value !== null) {
        Object.assign(result, flatten(value, path));
      } else {
        result[path] = value;
      }
    }
  } else {
    result[prefix || "/"] = obj;
  }

  return result;
}

function parsePointer(pointer: string): string[] {
  if (!pointer.startsWith("/")) throw new Error("Invalid JSON Pointer: must start with /");
  return pointer.slice(1).split("/").map((t) => t.replace(/~1/g, "/").replace(/~0/g, "~"));
}
