export function compare(a: string, b: string): -1 | 0 | 1 {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const na = pa[i] ?? 0;
    const nb = pb[i] ?? 0;
    if (na > nb) return 1;
    if (na < nb) return -1;
  }
  return 0;
}

export function gt(a: string, b: string): boolean {
  return compare(a, b) === 1;
}

export function gte(a: string, b: string): boolean {
  return compare(a, b) >= 0;
}

export function lt(a: string, b: string): boolean {
  return compare(a, b) === -1;
}

export function lte(a: string, b: string): boolean {
  return compare(a, b) <= 0;
}

export function eq(a: string, b: string): boolean {
  return compare(a, b) === 0;
}

export function isValid(version: string): boolean {
  return /^\d+(\.\d+)*$/.test(version);
}

export function parse(version: string): { major: number; minor: number; patch: number } {
  const parts = version.split(".").map(Number);
  return {
    major: parts[0] ?? 0,
    minor: parts[1] ?? 0,
    patch: parts[2] ?? 0,
  };
}

export function sort(versions: string[]): string[] {
  return [...versions].sort(compare);
}

export function satisfiesRange(version: string, min: string, max: string): boolean {
  return gte(version, min) && lte(version, max);
}
