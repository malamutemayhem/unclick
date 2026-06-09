export interface SemVer {
  major: number;
  minor: number;
  patch: number;
  prerelease: string[];
  build: string[];
}

export function parse(version: string): SemVer | null {
  const match = version.match(/^v?(\d+)\.(\d+)\.(\d+)(?:-([a-zA-Z0-9.]+))?(?:\+([a-zA-Z0-9.]+))?$/);
  if (!match) return null;
  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10),
    prerelease: match[4] ? match[4].split(".") : [],
    build: match[5] ? match[5].split(".") : [],
  };
}

export function format(v: SemVer): string {
  let s = `${v.major}.${v.minor}.${v.patch}`;
  if (v.prerelease.length > 0) s += `-${v.prerelease.join(".")}`;
  if (v.build.length > 0) s += `+${v.build.join(".")}`;
  return s;
}

export function compare(a: SemVer, b: SemVer): number {
  if (a.major !== b.major) return a.major - b.major;
  if (a.minor !== b.minor) return a.minor - b.minor;
  if (a.patch !== b.patch) return a.patch - b.patch;

  if (a.prerelease.length === 0 && b.prerelease.length === 0) return 0;
  if (a.prerelease.length === 0) return 1;
  if (b.prerelease.length === 0) return -1;

  const len = Math.max(a.prerelease.length, b.prerelease.length);
  for (let i = 0; i < len; i++) {
    if (i >= a.prerelease.length) return -1;
    if (i >= b.prerelease.length) return 1;
    const ai = a.prerelease[i];
    const bi = b.prerelease[i];
    const an = parseInt(ai, 10);
    const bn = parseInt(bi, 10);
    if (!isNaN(an) && !isNaN(bn)) {
      if (an !== bn) return an - bn;
    } else if (!isNaN(an)) {
      return -1;
    } else if (!isNaN(bn)) {
      return 1;
    } else {
      const cmp = ai.localeCompare(bi);
      if (cmp !== 0) return cmp;
    }
  }
  return 0;
}

export function gt(a: SemVer, b: SemVer): boolean { return compare(a, b) > 0; }
export function lt(a: SemVer, b: SemVer): boolean { return compare(a, b) < 0; }
export function eq(a: SemVer, b: SemVer): boolean { return compare(a, b) === 0; }
export function gte(a: SemVer, b: SemVer): boolean { return compare(a, b) >= 0; }
export function lte(a: SemVer, b: SemVer): boolean { return compare(a, b) <= 0; }

export function increment(v: SemVer, part: "major" | "minor" | "patch"): SemVer {
  const result = { ...v, prerelease: [], build: [] };
  switch (part) {
    case "major":
      result.major++;
      result.minor = 0;
      result.patch = 0;
      break;
    case "minor":
      result.minor++;
      result.patch = 0;
      break;
    case "patch":
      result.patch++;
      break;
  }
  return result;
}

export function satisfies(version: SemVer, range: string): boolean {
  const trimmed = range.trim();

  if (trimmed.startsWith("^")) {
    const target = parse(trimmed.substring(1));
    if (!target) return false;
    if (version.major !== target.major) return false;
    if (target.major === 0) {
      if (version.minor !== target.minor) return false;
      return version.patch >= target.patch;
    }
    return compare(version, target) >= 0;
  }

  if (trimmed.startsWith("~")) {
    const target = parse(trimmed.substring(1));
    if (!target) return false;
    return version.major === target.major &&
      version.minor === target.minor &&
      version.patch >= target.patch;
  }

  if (trimmed.startsWith(">=")) {
    const target = parse(trimmed.substring(2).trim());
    if (!target) return false;
    return compare(version, target) >= 0;
  }

  if (trimmed.startsWith(">")) {
    const target = parse(trimmed.substring(1).trim());
    if (!target) return false;
    return compare(version, target) > 0;
  }

  if (trimmed.startsWith("<=")) {
    const target = parse(trimmed.substring(2).trim());
    if (!target) return false;
    return compare(version, target) <= 0;
  }

  if (trimmed.startsWith("<")) {
    const target = parse(trimmed.substring(1).trim());
    if (!target) return false;
    return compare(version, target) < 0;
  }

  if (trimmed.startsWith("=")) {
    const target = parse(trimmed.substring(1).trim());
    if (!target) return false;
    return compare(version, target) === 0;
  }

  const target = parse(trimmed);
  if (!target) return false;
  return compare(version, target) === 0;
}

export function sort(versions: SemVer[]): SemVer[] {
  return [...versions].sort(compare);
}
