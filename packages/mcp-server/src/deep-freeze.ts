export function deepFreeze<T extends object>(obj: T): Readonly<T> {
  Object.freeze(obj);
  for (const key of Object.getOwnPropertyNames(obj)) {
    const val = (obj as Record<string, unknown>)[key];
    if (val !== null && typeof val === "object" && !Object.isFrozen(val)) {
      deepFreeze(val as object);
    }
  }
  return obj;
}

export function isDeepFrozen(obj: unknown): boolean {
  if (obj === null || typeof obj !== "object") return true;
  if (!Object.isFrozen(obj)) return false;
  for (const key of Object.getOwnPropertyNames(obj)) {
    if (!isDeepFrozen((obj as Record<string, unknown>)[key])) return false;
  }
  return true;
}

export function frozenCopy<T extends object>(obj: T): Readonly<T> {
  const copy = JSON.parse(JSON.stringify(obj)) as T;
  return deepFreeze(copy);
}
