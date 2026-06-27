export interface Patch {
  path: string;
  op: "add" | "remove" | "replace" | "move" | "copy";
  value?: unknown;
  from?: string;
}

export class PatchSet {
  private patches: Patch[] = [];

  add(path: string, value: unknown): this {
    this.patches.push({ path, op: "add", value });
    return this;
  }

  remove(path: string): this {
    this.patches.push({ path, op: "remove" });
    return this;
  }

  replace(path: string, value: unknown): this {
    this.patches.push({ path, op: "replace", value });
    return this;
  }

  move(from: string, path: string): this {
    this.patches.push({ path, op: "move", from });
    return this;
  }

  copy(from: string, path: string): this {
    this.patches.push({ path, op: "copy", from });
    return this;
  }

  apply(target: Record<string, unknown>): Record<string, unknown> {
    const result = JSON.parse(JSON.stringify(target));
    for (const patch of this.patches) {
      const segments = this.parsePath(patch.path);
      switch (patch.op) {
        case "add":
        case "replace":
          this.setNested(result, segments, patch.value);
          break;
        case "remove":
          this.deleteNested(result, segments);
          break;
        case "move":
          if (patch.from) {
            const fromSegs = this.parsePath(patch.from);
            const val = this.getNested(result, fromSegs);
            this.deleteNested(result, fromSegs);
            this.setNested(result, segments, val);
          }
          break;
        case "copy":
          if (patch.from) {
            const fromSegs = this.parsePath(patch.from);
            const val = this.getNested(result, fromSegs);
            this.setNested(result, segments, JSON.parse(JSON.stringify(val)));
          }
          break;
      }
    }
    return result;
  }

  inverse(): PatchSet {
    const inv = new PatchSet();
    for (let i = this.patches.length - 1; i >= 0; i--) {
      const p = this.patches[i];
      switch (p.op) {
        case "add":
          inv.remove(p.path);
          break;
        case "remove":
          inv.add(p.path, undefined);
          break;
        case "replace":
          inv.replace(p.path, undefined);
          break;
        case "move":
          if (p.from) inv.move(p.path, p.from);
          break;
        case "copy":
          inv.remove(p.path);
          break;
      }
    }
    return inv;
  }

  toJSON(): Patch[] {
    return [...this.patches];
  }

  size(): number {
    return this.patches.length;
  }

  isEmpty(): boolean {
    return this.patches.length === 0;
  }

  private parsePath(path: string): string[] {
    return path.replace(/^\//, "").split("/").filter(Boolean);
  }

  private getNested(obj: Record<string, unknown>, path: string[]): unknown {
    let current: unknown = obj;
    for (const key of path) {
      if (current == null || typeof current !== "object") return undefined;
      current = (current as Record<string, unknown>)[key];
    }
    return current;
  }

  private setNested(obj: Record<string, unknown>, path: string[], value: unknown): void {
    let current: Record<string, unknown> = obj;
    for (let i = 0; i < path.length - 1; i++) {
      if (!(path[i] in current) || typeof current[path[i]] !== "object") {
        current[path[i]] = {};
      }
      current = current[path[i]] as Record<string, unknown>;
    }
    current[path[path.length - 1]] = value;
  }

  private deleteNested(obj: Record<string, unknown>, path: string[]): void {
    let current: Record<string, unknown> = obj;
    for (let i = 0; i < path.length - 1; i++) {
      if (typeof current[path[i]] !== "object") return;
      current = current[path[i]] as Record<string, unknown>;
    }
    delete current[path[path.length - 1]];
  }
}
