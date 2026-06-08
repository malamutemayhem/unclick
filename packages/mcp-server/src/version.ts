export interface SemVer {
  major: number;
  minor: number;
  patch: number;
  prerelease?: string;
  build?: string;
}

export function parse(version: string): SemVer | null {
  const match = version.match(/^v?(\d+)\.(\d+)\.(\d+)(?:-([\w.]+))?(?:\+([\w.]+))?$/);
  if (!match) return null;
  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10),
    prerelease: match[4],
    build: match[5],
  };
}

export function format(v: SemVer): string {
  let result = `${v.major}.${v.minor}.${v.patch}`;
  if (v.prerelease) result += `-${v.prerelease}`;
  if (v.build) result += `+${v.build}`;
  return result;
}

export function compare(a: SemVer, b: SemVer): number {
  if (a.major !== b.major) return a.major - b.major;
  if (a.minor !== b.minor) return a.minor - b.minor;
  if (a.patch !== b.patch) return a.patch - b.patch;
  if (a.prerelease && !b.prerelease) return -1;
  if (!a.prerelease && b.prerelease) return 1;
  if (a.prerelease && b.prerelease) {
    return a.prerelease < b.prerelease ? -1 : a.prerelease > b.prerelease ? 1 : 0;
  }
  return 0;
}

export function gt(a: SemVer, b: SemVer): boolean { return compare(a, b) > 0; }
export function lt(a: SemVer, b: SemVer): boolean { return compare(a, b) < 0; }
export function eq(a: SemVer, b: SemVer): boolean { return compare(a, b) === 0; }
export function gte(a: SemVer, b: SemVer): boolean { return compare(a, b) >= 0; }
export function lte(a: SemVer, b: SemVer): boolean { return compare(a, b) <= 0; }

export function bump(v: SemVer, type: "major" | "minor" | "patch"): SemVer {
  switch (type) {
    case "major": return { major: v.major + 1, minor: 0, patch: 0 };
    case "minor": return { major: v.major, minor: v.minor + 1, patch: 0 };
    case "patch": return { major: v.major, minor: v.minor, patch: v.patch + 1 };
  }
}

export function satisfies(version: SemVer, range: string): boolean {
  if (range === "*") return true;
  if (range.startsWith("^")) {
    const min = parse(range.slice(1));
    if (!min) return false;
    return version.major === min.major && gte(version, min);
  }
  if (range.startsWith("~")) {
    const min = parse(range.slice(1));
    if (!min) return false;
    return version.major === min.major && version.minor === min.minor && gte(version, min);
  }
  const exact = parse(range);
  if (!exact) return false;
  return eq(version, exact);
}

export function sort(versions: SemVer[]): SemVer[] {
  return [...versions].sort(compare);
}
