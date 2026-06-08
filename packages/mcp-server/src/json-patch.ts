export type PatchOp =
  | { op: "add"; path: string; value: unknown }
  | { op: "remove"; path: string }
  | { op: "replace"; path: string; value: unknown }
  | { op: "move"; from: string; path: string }
  | { op: "copy"; from: string; path: string }
  | { op: "test"; path: string; value: unknown };

export function applyPatch<T>(doc: T, ops: PatchOp[]): T {
  let result = structuredClone(doc);
  for (const op of ops) {
    result = applyOp(result, op);
  }
  return result;
}

function applyOp<T>(doc: T, op: PatchOp): T {
  switch (op.op) {
    case "add":
      return setAtPath(doc, op.path, op.value);
    case "remove":
      return removeAtPath(doc, op.path);
    case "replace":
      return setAtPath(doc, op.path, op.value);
    case "move": {
      const val = getAtPath(doc, op.from);
      const removed = removeAtPath(doc, op.from);
      return setAtPath(removed, op.path, val);
    }
    case "copy": {
      const val = getAtPath(doc, op.from);
      return setAtPath(doc, op.path, structuredClone(val));
    }
    case "test": {
      const val = getAtPath(doc, op.path);
      if (JSON.stringify(val) !== JSON.stringify(op.value)) {
        throw new Error(`Test failed at ${op.path}`);
      }
      return doc;
    }
  }
}

function parsePath(path: string): string[] {
  if (path === "") return [];
  if (!path.startsWith("/")) throw new Error(`Invalid path: ${path}`);
  return path.slice(1).split("/").map((s) => s.replace(/~1/g, "/").replace(/~0/g, "~"));
}

function getAtPath(doc: unknown, path: string): unknown {
  const parts = parsePath(path);
  let current = doc;
  for (const part of parts) {
    if (Array.isArray(current)) {
      current = current[parseInt(part, 10)];
    } else if (typeof current === "object" && current !== null) {
      current = (current as Record<string, unknown>)[part];
    } else {
      throw new Error(`Cannot traverse path: ${path}`);
    }
  }
  return current;
}

function setAtPath<T>(doc: T, path: string, value: unknown): T {
  const parts = parsePath(path);
  if (parts.length === 0) return value as T;

  const result = structuredClone(doc) as unknown;
  let current = result;
  for (let i = 0; i < parts.length - 1; i++) {
    if (Array.isArray(current)) {
      current = current[parseInt(parts[i], 10)];
    } else {
      current = (current as Record<string, unknown>)[parts[i]];
    }
  }

  const last = parts[parts.length - 1];
  if (Array.isArray(current)) {
    if (last === "-") {
      current.push(value);
    } else {
      current.splice(parseInt(last, 10), 0, value);
    }
  } else {
    (current as Record<string, unknown>)[last] = value;
  }

  return result as T;
}

function removeAtPath<T>(doc: T, path: string): T {
  const parts = parsePath(path);
  if (parts.length === 0) throw new Error("Cannot remove root");

  const result = structuredClone(doc) as unknown;
  let current = result;
  for (let i = 0; i < parts.length - 1; i++) {
    if (Array.isArray(current)) {
      current = current[parseInt(parts[i], 10)];
    } else {
      current = (current as Record<string, unknown>)[parts[i]];
    }
  }

  const last = parts[parts.length - 1];
  if (Array.isArray(current)) {
    current.splice(parseInt(last, 10), 1);
  } else {
    delete (current as Record<string, unknown>)[last];
  }

  return result as T;
}

export function diff(a: unknown, b: unknown, path = ""): PatchOp[] {
  if (JSON.stringify(a) === JSON.stringify(b)) return [];

  if (typeof a !== typeof b || a === null || b === null || typeof a !== "object") {
    return [{ op: "replace", path, value: b }];
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    const ops: PatchOp[] = [];
    const max = Math.max(a.length, b.length);
    for (let i = 0; i < max; i++) {
      if (i >= a.length) {
        ops.push({ op: "add", path: `${path}/${i}`, value: b[i] });
      } else if (i >= b.length) {
        ops.push({ op: "remove", path: `${path}/${a.length - 1 - (i - b.length)}` });
      } else {
        ops.push(...diff(a[i], b[i], `${path}/${i}`));
      }
    }
    return ops;
  }

  const aObj = a as Record<string, unknown>;
  const bObj = b as Record<string, unknown>;
  const ops: PatchOp[] = [];

  for (const key of Object.keys(aObj)) {
    const escaped = key.replace(/~/g, "~0").replace(/\//g, "~1");
    if (!(key in bObj)) {
      ops.push({ op: "remove", path: `${path}/${escaped}` });
    } else {
      ops.push(...diff(aObj[key], bObj[key], `${path}/${escaped}`));
    }
  }
  for (const key of Object.keys(bObj)) {
    if (!(key in aObj)) {
      const escaped = key.replace(/~/g, "~0").replace(/\//g, "~1");
      ops.push({ op: "add", path: `${path}/${escaped}`, value: bObj[key] });
    }
  }

  return ops;
}
