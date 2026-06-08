export type PatchOp =
  | { op: "add"; path: string; value: unknown }
  | { op: "remove"; path: string }
  | { op: "replace"; path: string; value: unknown }
  | { op: "move"; from: string; path: string }
  | { op: "copy"; from: string; path: string }
  | { op: "test"; path: string; value: unknown };

function parsePath(path: string): string[] {
  if (path === "") return [];
  if (!path.startsWith("/")) throw new Error(`Invalid path: ${path}`);
  return path.slice(1).split("/").map((s: string) => s.replace(/~1/g, "/").replace(/~0/g, "~"));
}

function getParentAndKey(obj: unknown, tokens: string[]): { parent: Record<string, unknown> | unknown[]; key: string } {
  let current = obj as Record<string, unknown>;
  for (let i = 0; i < tokens.length - 1; i++) {
    current = current[tokens[i]] as Record<string, unknown>;
    if (current === undefined || current === null) throw new Error(`Path not found: ${tokens.slice(0, i + 1).join("/")}`);
  }
  return { parent: current, key: tokens[tokens.length - 1] };
}

function getValue(obj: unknown, tokens: string[]): unknown {
  let current = obj as Record<string, unknown>;
  for (const token of tokens) {
    if (current === undefined || current === null) throw new Error("Path not found");
    current = current[token] as Record<string, unknown>;
  }
  return current;
}

function deepClone<T>(value: T): T {
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map((v: unknown) => deepClone(v)) as T;
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(value as Record<string, unknown>)) {
    result[key] = deepClone((value as Record<string, unknown>)[key]);
  }
  return result as T;
}

export function applyPatch<T>(document: T, patches: PatchOp[]): T {
  let doc = deepClone(document);
  for (const patch of patches) {
    doc = applyOp(doc, patch);
  }
  return doc;
}

function applyOp<T>(doc: T, patch: PatchOp): T {
  const tokens = parsePath(patch.path);

  switch (patch.op) {
    case "add": {
      if (tokens.length === 0) return patch.value as T;
      const { parent, key } = getParentAndKey(doc, tokens);
      if (Array.isArray(parent)) {
        const idx = key === "-" ? parent.length : parseInt(key, 10);
        parent.splice(idx, 0, patch.value);
      } else {
        (parent as Record<string, unknown>)[key] = patch.value;
      }
      return doc;
    }
    case "remove": {
      if (tokens.length === 0) throw new Error("Cannot remove root");
      const { parent, key } = getParentAndKey(doc, tokens);
      if (Array.isArray(parent)) {
        parent.splice(parseInt(key, 10), 1);
      } else {
        delete (parent as Record<string, unknown>)[key];
      }
      return doc;
    }
    case "replace": {
      if (tokens.length === 0) return patch.value as T;
      const { parent, key } = getParentAndKey(doc, tokens);
      if (Array.isArray(parent)) {
        parent[parseInt(key, 10)] = patch.value;
      } else {
        (parent as Record<string, unknown>)[key] = patch.value;
      }
      return doc;
    }
    case "move": {
      const fromTokens = parsePath(patch.from);
      const value = getValue(doc, fromTokens);
      doc = applyOp(doc, { op: "remove", path: patch.from });
      doc = applyOp(doc, { op: "add", path: patch.path, value });
      return doc;
    }
    case "copy": {
      const fromTokens = parsePath(patch.from);
      const value = deepClone(getValue(doc, fromTokens));
      doc = applyOp(doc, { op: "add", path: patch.path, value });
      return doc;
    }
    case "test": {
      const actual = getValue(doc, tokens);
      if (JSON.stringify(actual) !== JSON.stringify(patch.value)) {
        throw new Error(`Test failed: expected ${JSON.stringify(patch.value)}, got ${JSON.stringify(actual)}`);
      }
      return doc;
    }
  }
}
