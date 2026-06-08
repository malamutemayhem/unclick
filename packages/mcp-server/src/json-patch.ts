export type PatchOp =
  | { op: "add"; path: string; value: unknown }
  | { op: "remove"; path: string }
  | { op: "replace"; path: string; value: unknown }
  | { op: "move"; from: string; path: string }
  | { op: "copy"; from: string; path: string }
  | { op: "test"; path: string; value: unknown };

export function apply(doc: unknown, patches: PatchOp[]): unknown {
  let result = structuredClone(doc);
  for (const patch of patches) {
    result = applyOp(result, patch);
  }
  return result;
}

function applyOp(doc: unknown, patch: PatchOp): unknown {
  switch (patch.op) {
    case "add": return setAtPath(doc, patch.path, patch.value);
    case "remove": return removeAtPath(doc, patch.path);
    case "replace": return setAtPath(doc, patch.path, patch.value);
    case "move": {
      const value = getAtPath(doc, patch.from);
      const removed = removeAtPath(doc, patch.from);
      return setAtPath(removed, patch.path, value);
    }
    case "copy": {
      const value = structuredClone(getAtPath(doc, patch.from));
      return setAtPath(doc, patch.path, value);
    }
    case "test": {
      const actual = getAtPath(doc, patch.path);
      if (!deepEqual(actual, patch.value)) {
        throw new Error(`Test failed: ${patch.path}`);
      }
      return doc;
    }
  }
}

export function diff(a: unknown, b: unknown, path = ""): PatchOp[] {
  if (deepEqual(a, b)) return [];
  if (a === null || b === null || typeof a !== "object" || typeof b !== "object") {
    return [{ op: "replace", path: path || "/", value: b }];
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    return diffArrays(a, b, path);
  }
  const aObj = a as Record<string, unknown>;
  const bObj = b as Record<string, unknown>;
  const ops: PatchOp[] = [];

  for (const key of Object.keys(bObj)) {
    const p = `${path}/${escapePointer(key)}`;
    if (!(key in aObj)) {
      ops.push({ op: "add", path: p, value: bObj[key] });
    } else if (!deepEqual(aObj[key], bObj[key])) {
      ops.push(...diff(aObj[key], bObj[key], p));
    }
  }
  for (const key of Object.keys(aObj)) {
    if (!(key in bObj)) {
      ops.push({ op: "remove", path: `${path}/${escapePointer(key)}` });
    }
  }
  return ops;
}

function diffArrays(a: unknown[], b: unknown[], path: string): PatchOp[] {
  const ops: PatchOp[] = [];
  const maxLen = Math.max(a.length, b.length);
  for (let i = 0; i < maxLen; i++) {
    const p = `${path}/${i}`;
    if (i >= a.length) ops.push({ op: "add", path: p, value: b[i] });
    else if (i >= b.length) ops.push({ op: "remove", path: p });
    else if (!deepEqual(a[i], b[i])) ops.push({ op: "replace", path: p, value: b[i] });
  }
  return ops;
}

function parsePath(path: string): string[] {
  if (!path || path === "/") return [];
  return path.split("/").slice(1).map(unescapePointer);
}

function getAtPath(doc: unknown, path: string): unknown {
  const keys = parsePath(path);
  let current = doc;
  for (const key of keys) {
    if (Array.isArray(current)) current = current[parseInt(key, 10)];
    else if (typeof current === "object" && current !== null) current = (current as Record<string, unknown>)[key];
    else throw new Error(`Path not found: ${path}`);
  }
  return current;
}

function setAtPath(doc: unknown, path: string, value: unknown): unknown {
  const keys = parsePath(path);
  if (keys.length === 0) return value;
  const result = structuredClone(doc) as Record<string, unknown>;
  let current: unknown = result;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (Array.isArray(current)) current = current[parseInt(key, 10)];
    else current = (current as Record<string, unknown>)[key];
  }
  const lastKey = keys[keys.length - 1];
  if (Array.isArray(current)) {
    if (lastKey === "-") current.push(value);
    else current[parseInt(lastKey, 10)] = value;
  } else {
    (current as Record<string, unknown>)[lastKey] = value;
  }
  return result;
}

function removeAtPath(doc: unknown, path: string): unknown {
  const keys = parsePath(path);
  if (keys.length === 0) return undefined;
  const result = structuredClone(doc) as Record<string, unknown>;
  let current: unknown = result;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (Array.isArray(current)) current = current[parseInt(key, 10)];
    else current = (current as Record<string, unknown>)[key];
  }
  const lastKey = keys[keys.length - 1];
  if (Array.isArray(current)) current.splice(parseInt(lastKey, 10), 1);
  else delete (current as Record<string, unknown>)[lastKey];
  return result;
}

function escapePointer(s: string): string {
  return s.replace(/~/g, "~0").replace(/\//g, "~1");
}

function unescapePointer(s: string): string {
  return s.replace(/~1/g, "/").replace(/~0/g, "~");
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a === null || b === null || typeof a !== typeof b) return false;
  if (typeof a !== "object") return false;
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return false;
    return a.every((v, i) => deepEqual(v, b[i]));
  }
  const ak = Object.keys(a as Record<string, unknown>);
  const bk = Object.keys(b as Record<string, unknown>);
  if (ak.length !== bk.length) return false;
  return ak.every((k) => deepEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]));
}
