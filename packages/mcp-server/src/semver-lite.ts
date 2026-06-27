export interface SemVer {
  major: number;
  minor: number;
  patch: number;
  prerelease?: string;
}

export function parse(version: string): SemVer {
  const match = version.match(/^v?(\d+)\.(\d+)\.(\d+)(?:-(.+))?$/);
  if (!match) throw new Error(`Invalid semver: ${version}`);
  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10),
    prerelease: match[4],
  };
}

export function format(ver: SemVer): string {
  const base = `${ver.major}.${ver.minor}.${ver.patch}`;
  return ver.prerelease ? `${base}-${ver.prerelease}` : base;
}

export function compare(a: string | SemVer, b: string | SemVer): number {
  const va = typeof a === "string" ? parse(a) : a;
  const vb = typeof b === "string" ? parse(b) : b;
  if (va.major !== vb.major) return va.major - vb.major;
  if (va.minor !== vb.minor) return va.minor - vb.minor;
  if (va.patch !== vb.patch) return va.patch - vb.patch;
  if (!va.prerelease && !vb.prerelease) return 0;
  if (!va.prerelease) return 1;
  if (!vb.prerelease) return -1;
  return va.prerelease.localeCompare(vb.prerelease);
}

export function gt(a: string, b: string): boolean { return compare(a, b) > 0; }
export function lt(a: string, b: string): boolean { return compare(a, b) < 0; }
export function eq(a: string, b: string): boolean { return compare(a, b) === 0; }
export function gte(a: string, b: string): boolean { return compare(a, b) >= 0; }
export function lte(a: string, b: string): boolean { return compare(a, b) <= 0; }

export function bump(version: string, part: "major" | "minor" | "patch"): string {
  const ver = parse(version);
  if (part === "major") return format({ major: ver.major + 1, minor: 0, patch: 0 });
  if (part === "minor") return format({ major: ver.major, minor: ver.minor + 1, patch: 0 });
  return format({ major: ver.major, minor: ver.minor, patch: ver.patch + 1 });
}

export function sort(versions: string[]): string[] {
  return [...versions].sort(compare);
}

export function isValid(version: string): boolean {
  try { parse(version); return true; } catch { return false; }
}
