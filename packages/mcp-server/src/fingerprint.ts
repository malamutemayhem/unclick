export function fingerprint(obj: unknown): string {
  const json = stableStringify(obj);
  return fnv1aStr(json);
}

export function fingerprintArray(items: unknown[]): string {
  return fingerprint(items.map(fingerprint));
}

export function isSameFingerprint(a: unknown, b: unknown): boolean {
  return fingerprint(a) === fingerprint(b);
}

function stableStringify(obj: unknown): string {
  if (obj === null || obj === undefined) return String(obj);
  if (typeof obj !== "object") return JSON.stringify(obj);
  if (Array.isArray(obj)) {
    return "[" + obj.map(stableStringify).join(",") + "]";
  }
  const keys = Object.keys(obj as Record<string, unknown>).sort();
  const pairs = keys.map(
    (k) => JSON.stringify(k) + ":" + stableStringify((obj as Record<string, unknown>)[k])
  );
  return "{" + pairs.join(",") + "}";
}

function fnv1aStr(data: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < data.length; i++) {
    hash ^= data.charCodeAt(i);
    hash = (hash * 0x01000193) >>> 0;
  }
  return hash.toString(36);
}
