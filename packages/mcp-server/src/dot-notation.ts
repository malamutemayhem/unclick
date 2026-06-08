export class DotNotation {
  static get(obj: Record<string, unknown>, path: string): unknown {
    const keys = DotNotation.parsePath(path);
    let current: unknown = obj;
    for (const key of keys) {
      if (current === null || current === undefined) return undefined;
      if (typeof current !== "object") return undefined;
      current = (current as Record<string, unknown>)[key];
    }
    return current;
  }

  static set(obj: Record<string, unknown>, path: string, value: unknown): void {
    const keys = DotNotation.parsePath(path);
    let current: Record<string, unknown> = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in current) || typeof current[key] !== "object" || current[key] === null) {
        const nextKey = keys[i + 1];
        current[key] = /^\d+$/.test(nextKey) ? [] : {};
      }
      current = current[key] as Record<string, unknown>;
    }
    current[keys[keys.length - 1]] = value;
  }

  static has(obj: Record<string, unknown>, path: string): boolean {
    const keys = DotNotation.parsePath(path);
    let current: unknown = obj;
    for (const key of keys) {
      if (current === null || current === undefined || typeof current !== "object") return false;
      if (!(key in (current as Record<string, unknown>))) return false;
      current = (current as Record<string, unknown>)[key];
    }
    return true;
  }

  static remove(obj: Record<string, unknown>, path: string): boolean {
    const keys = DotNotation.parsePath(path);
    let current: unknown = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      if (current === null || current === undefined || typeof current !== "object") return false;
      current = (current as Record<string, unknown>)[keys[i]];
    }
    if (current === null || current === undefined || typeof current !== "object") return false;
    const lastKey = keys[keys.length - 1];
    if (!(lastKey in (current as Record<string, unknown>))) return false;
    delete (current as Record<string, unknown>)[lastKey];
    return true;
  }

  static flatten(obj: Record<string, unknown>, prefix: string = ""): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (value !== null && typeof value === "object" && !Array.isArray(value)) {
        Object.assign(result, DotNotation.flatten(value as Record<string, unknown>, fullKey));
      } else {
        result[fullKey] = value;
      }
    }
    return result;
  }

  static unflatten(obj: Record<string, unknown>): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const [path, value] of Object.entries(obj)) {
      DotNotation.set(result, path, value);
    }
    return result;
  }

  static keys(obj: Record<string, unknown>): string[] {
    return Object.keys(DotNotation.flatten(obj));
  }

  static pick(obj: Record<string, unknown>, paths: string[]): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const path of paths) {
      if (DotNotation.has(obj, path)) {
        DotNotation.set(result, path, DotNotation.get(obj, path));
      }
    }
    return result;
  }

  private static parsePath(path: string): string[] {
    return path.split(".").flatMap((part) => {
      const match = part.match(/^([^[]+)(?:\[(\d+)])?$/);
      if (match) {
        const parts = [match[1]];
        if (match[2] !== undefined) parts.push(match[2]);
        return parts;
      }
      return [part];
    });
  }
}
