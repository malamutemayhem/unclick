export type PatchOp =
  | { op: "add"; path: string; value: unknown }
  | { op: "remove"; path: string }
  | { op: "replace"; path: string; value: unknown }
  | { op: "move"; from: string; path: string }
  | { op: "copy"; from: string; path: string }
  | { op: "test"; path: string; value: unknown };

export function applyPatch(doc: unknown, patches: PatchOp[]): unknown {
  let result = structuredClone(doc);
  for (const patch of patches) {
    result = applyOp(result, patch);
  }
  return result;
}

function applyOp(doc: unknown, op: PatchOp): unknown {
  switch (op.op) {
    case "add": return setPath(doc, op.path, op.value);
    case "remove": return removePath(doc, op.path);
    case "replace": return setPath(doc, op.path, op.value);
    case "move": {
      const value = getPath(doc, op.from);
      doc = removePath(doc, op.from);
      return setPath(doc, op.path, value);
    }
    case "copy": {
      const value = getPath(doc, op.from);
      return setPath(doc, op.path, structuredClone(value));
    }
    case "test": {
      const actual = getPath(doc, op.path);
      if (JSON.stringify(actual) !== JSON.stringify(op.value)) {
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

export function getPath(doc: unknown, path: string): unknown {
  const keys = parsePath(path);
  let current = doc;
  for (const key of keys) {
    if (current === null || current === undefined) return undefined;
    if (Array.isArray(current)) {
      current = current[parseInt(key, 10)];
    } else {
      current = (current as Record<string, unknown>)[key];
    }
  }
  return current;
}

function setPath(doc: unknown, path: string, value: unknown): unknown {
  const keys = parsePath(path);
  if (keys.length === 0) return value;
  const root = structuredClone(doc) as Record<string, unknown>;
  let current: unknown = root;
  for (let i = 0; i < keys.length - 1; i++) {
    if (Array.isArray(current)) {
      current = current[parseInt(keys[i], 10)];
    } else {
      current = (current as Record<string, unknown>)[keys[i]];
    }
  }
  const lastKey = keys[keys.length - 1];
  if (Array.isArray(current)) {
    if (lastKey === "-") {
      current.push(value);
    } else {
      current.splice(parseInt(lastKey, 10), 0, value);
    }
  } else {
    (current as Record<string, unknown>)[lastKey] = value;
  }
  return root;
}

function removePath(doc: unknown, path: string): unknown {
  const keys = parsePath(path);
  if (keys.length === 0) return undefined;
  const root = structuredClone(doc) as Record<string, unknown>;
  let current: unknown = root;
  for (let i = 0; i < keys.length - 1; i++) {
    if (Array.isArray(current)) {
      current = current[parseInt(keys[i], 10)];
    } else {
      current = (current as Record<string, unknown>)[keys[i]];
    }
  }
  const lastKey = keys[keys.length - 1];
  if (Array.isArray(current)) {
    current.splice(parseInt(lastKey, 10), 1);
  } else {
    delete (current as Record<string, unknown>)[lastKey];
  }
  return root;
}
