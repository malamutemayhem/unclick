export type PatchOp =
  | { op: "add"; path: string; value: unknown }
  | { op: "remove"; path: string }
  | { op: "replace"; path: string; value: unknown }
  | { op: "move"; from: string; path: string }
  | { op: "copy"; from: string; path: string }
  | { op: "test"; path: string; value: unknown };

export function applyPatch<T>(doc: T, patches: PatchOp[]): T {
  let result = structuredClone(doc);
  for (const patch of patches) {
    result = applyOne(result, patch);
  }
  return result;
}

export function createPatch(before: unknown, after: unknown, path = ""): PatchOp[] {
  if (deepEqual(before, after)) return [];

  if (typeof before !== typeof after || before === null || after === null || typeof before !== "object") {
    return [{ op: "replace", path: path || "/", value: after }];
  }

  const patches: PatchOp[] = [];
  const beforeObj = before as Record<string, unknown>;
  const afterObj = after as Record<string, unknown>;

  for (const key of Object.keys(afterObj)) {
    const p = `${path}/${escapeKey(key)}`;
    if (!(key in beforeObj)) {
      patches.push({ op: "add", path: p, value: afterObj[key] });
    } else {
      patches.push(...createPatch(beforeObj[key], afterObj[key], p));
    }
  }

  for (const key of Object.keys(beforeObj)) {
    if (!(key in afterObj)) {
      patches.push({ op: "remove", path: `${path}/${escapeKey(key)}` });
    }
  }

  return patches;
}

export function testPatch(doc: unknown, patches: PatchOp[]): boolean {
  try {
    applyPatch(doc, patches);
    return true;
  } catch {
    return false;
  }
}

function applyOne<T>(doc: T, patch: PatchOp): T {
  const obj = doc as Record<string, unknown>;

  switch (patch.op) {
    case "add":
    case "replace": {
      const { parent, key } = resolve(obj, patch.path);
      (parent as Record<string, unknown>)[key] = patch.value;
      return doc;
    }
    case "remove": {
      const { parent, key } = resolve(obj, patch.path);
      if (Array.isArray(parent)) parent.splice(Number(key), 1);
      else delete (parent as Record<string, unknown>)[key];
      return doc;
    }
    case "move": {
      const { parent: fromParent, key: fromKey } = resolve(obj, patch.from);
      const value = (fromParent as Record<string, unknown>)[fromKey];
      if (Array.isArray(fromParent)) fromParent.splice(Number(fromKey), 1);
      else delete (fromParent as Record<string, unknown>)[fromKey];
      const { parent: toParent, key: toKey } = resolve(obj, patch.path);
      (toParent as Record<string, unknown>)[toKey] = value;
      return doc;
    }
    case "copy": {
      const { parent: fromParent, key: fromKey } = resolve(obj, patch.from);
      const value = structuredClone((fromParent as Record<string, unknown>)[fromKey]);
      const { parent: toParent, key: toKey } = resolve(obj, patch.path);
      (toParent as Record<string, unknown>)[toKey] = value;
      return doc;
    }
    case "test": {
      const { parent, key } = resolve(obj, patch.path);
      if (!deepEqual((parent as Record<string, unknown>)[key], patch.value)) {
        throw new Error(`Test failed at ${patch.path}`);
      }
      return doc;
    }
  }
}

function resolve(obj: unknown, path: string): { parent: unknown; key: string } {
  const parts = path.split("/").filter(Boolean).map(unescapeKey);
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    current = (current as Record<string, unknown>)[parts[i]];
  }
  return { parent: current, key: parts[parts.length - 1] };
}

function escapeKey(key: string): string {
  return key.replace(/~/g, "~0").replace(/\//g, "~1");
}

function unescapeKey(key: string): string {
  return key.replace(/~1/g, "/").replace(/~0/g, "~");
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a === null || b === null || typeof a !== typeof b) return false;
  if (typeof a !== "object") return false;
  const keysA = Object.keys(a as Record<string, unknown>);
  const keysB = Object.keys(b as Record<string, unknown>);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((k) => deepEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]));
}
