export function deepMerge(...sources: Record<string, unknown>[]): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const source of sources) {
    for (const [key, value] of Object.entries(source)) {
      if (isPlainObject(value) && isPlainObject(result[key])) {
        result[key] = deepMerge(result[key] as Record<string, unknown>, value as Record<string, unknown>);
      } else {
        result[key] = value;
      }
    }
  }
  return result;
}

export function withEnvOverrides<T extends Record<string, unknown>>(
  config: T,
  prefix: string,
  env: Record<string, string | undefined>,
): T {
  const result = { ...config };
  const prefixUpper = prefix.toUpperCase() + "_";
  for (const [key, value] of Object.entries(env)) {
    if (key.startsWith(prefixUpper) && value !== undefined) {
      const path = key.slice(prefixUpper.length).toLowerCase().split("__");
      setNestedValue(result, path, parseValue(value));
    }
  }
  return result;
}

function setNestedValue(obj: Record<string, unknown>, path: string[], value: unknown): void {
  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    if (!isPlainObject(current[path[i]])) {
      current[path[i]] = {};
    }
    current = current[path[i]] as Record<string, unknown>;
  }
  current[path[path.length - 1]] = value;
}

function parseValue(value: string): unknown {
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "null") return null;
  const num = Number(value);
  if (!isNaN(num) && value.trim() !== "") return num;
  return value;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function freeze<T extends Record<string, unknown>>(config: T): Readonly<T> {
  Object.freeze(config);
  for (const value of Object.values(config)) {
    if (isPlainObject(value)) freeze(value as Record<string, unknown>);
  }
  return config;
}

export function validate<T extends Record<string, unknown>>(config: T, required: string[]): string[] {
  const missing: string[] = [];
  for (const key of required) {
    const parts = key.split(".");
    let current: unknown = config;
    for (const part of parts) {
      if (!isPlainObject(current)) { missing.push(key); break; }
      current = (current as Record<string, unknown>)[part];
      if (current === undefined) { missing.push(key); break; }
    }
  }
  return missing;
}
