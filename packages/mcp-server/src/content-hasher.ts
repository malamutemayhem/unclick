export function fnv1a(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = (hash * 0x01000193) >>> 0;
  }
  return hash;
}

export function djb2(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) + hash + input.charCodeAt(i)) & 0x7fffffff;
  }
  return hash;
}

export function simpleChecksum(input: string): string {
  const h1 = fnv1a(input);
  const h2 = djb2(input);
  return `${h1.toString(16).padStart(8, "0")}${h2.toString(16).padStart(8, "0")}`;
}

export function contentId(input: string): string {
  return `cid_${fnv1a(input).toString(36)}`;
}

export function consistentHash(key: string, buckets: number): number {
  return fnv1a(key) % buckets;
}

export function hashRing(keys: string[], nodes: string[]): Map<string, string> {
  const ring = new Map<string, string>();
  for (const key of keys) {
    const bucket = fnv1a(key) % nodes.length;
    ring.set(key, nodes[bucket]);
  }
  return ring;
}
