export interface PatchOp {
  op: "add" | "remove" | "replace" | "move" | "copy" | "test";
  path: string;
  value?: any;
  from?: string;
}

export function applyPatch(doc: any, ops: PatchOp[]): any {
  let result = structuredClone(doc);
  for (const op of ops) {
    result = applyOp(result, op);
  }
  return result;
}

function applyOp(doc: any, op: PatchOp): any {
  switch (op.op) {
    case "add": {
      const { parent, key } = resolve(doc, op.path, true);
      if (Array.isArray(parent)) {
        const idx = key === "-" ? parent.length : Number(key);
        parent.splice(idx, 0, op.value);
      } else {
        parent[key] = op.value;
      }
      return doc;
    }
    case "remove": {
      const { parent, key } = resolve(doc, op.path);
      if (Array.isArray(parent)) {
        parent.splice(Number(key), 1);
      } else {
        delete parent[key];
      }
      return doc;
    }
    case "replace": {
      const { parent, key } = resolve(doc, op.path);
      parent[key] = op.value;
      return doc;
    }
    case "move": {
      const { parent: srcParent, key: srcKey } = resolve(doc, op.from!);
      const val = Array.isArray(srcParent) ? srcParent.splice(Number(srcKey), 1)[0] : srcParent[srcKey];
      if (!Array.isArray(srcParent)) delete srcParent[srcKey];
      const { parent, key } = resolve(doc, op.path, true);
      if (Array.isArray(parent)) {
        parent.splice(key === "-" ? parent.length : Number(key), 0, val);
      } else {
        parent[key] = val;
      }
      return doc;
    }
    case "copy": {
      const { parent: srcParent, key: srcKey } = resolve(doc, op.from!);
      const val = structuredClone(Array.isArray(srcParent) ? srcParent[Number(srcKey)] : srcParent[srcKey]);
      const { parent, key } = resolve(doc, op.path, true);
      if (Array.isArray(parent)) {
        parent.splice(key === "-" ? parent.length : Number(key), 0, val);
      } else {
        parent[key] = val;
      }
      return doc;
    }
    case "test": {
      const { parent, key } = resolve(doc, op.path);
      const val = Array.isArray(parent) ? parent[Number(key)] : parent[key];
      if (JSON.stringify(val) !== JSON.stringify(op.value)) {
        throw new Error(`Test failed at "${op.path}"`);
      }
      return doc;
    }
    default:
      throw new Error(`Unknown op: ${(op as any).op}`);
  }
}

function resolve(doc: any, path: string, create = false): { parent: any; key: string } {
  const parts = path.split("/").slice(1).map((p) => p.replace(/~1/g, "/").replace(/~0/g, "~"));
  let current = doc;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (Array.isArray(current)) {
      current = current[Number(part)];
    } else {
      if (create && !(part in current)) {
        current[part] = {};
      }
      current = current[part];
    }
  }
  return { parent: current, key: parts[parts.length - 1] };
}
