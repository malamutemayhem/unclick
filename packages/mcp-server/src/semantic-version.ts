export interface SemVer {
  major: number;
  minor: number;
  patch: number;
  prerelease: string[];
  build: string[];
}

export function parse(version: string): SemVer | null {
  const match = version.match(
    /^v?(\d+)\.(\d+)\.(\d+)(?:-([a-zA-Z0-9.]+))?(?:\+([a-zA-Z0-9.]+))?$/
  );
  if (!match) return null;
  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10),
    prerelease: match[4] ? match[4].split(".") : [],
    build: match[5] ? match[5].split(".") : [],
  };
}

export function format(ver: SemVer): string {
  let s = `${ver.major}.${ver.minor}.${ver.patch}`;
  if (ver.prerelease.length > 0) s += `-${ver.prerelease.join(".")}`;
  if (ver.build.length > 0) s += `+${ver.build.join(".")}`;
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
    const ap = a.prerelease[i];
    const bp = b.prerelease[i];
    const an = parseInt(ap, 10);
    const bn = parseInt(bp, 10);
    if (!isNaN(an) && !isNaN(bn)) {
      if (an !== bn) return an - bn;
    } else {
      if (ap !== bp) return ap < bp ? -1 : 1;
    }
  }
  return 0;
}

export function gt(a: SemVer, b: SemVer): boolean { return compare(a, b) > 0; }
export function lt(a: SemVer, b: SemVer): boolean { return compare(a, b) < 0; }
export function eq(a: SemVer, b: SemVer): boolean { return compare(a, b) === 0; }
export function gte(a: SemVer, b: SemVer): boolean { return compare(a, b) >= 0; }
export function lte(a: SemVer, b: SemVer): boolean { return compare(a, b) <= 0; }

export function increment(ver: SemVer, type: "major" | "minor" | "patch" | "prerelease"): SemVer {
  switch (type) {
    case "major":
      return { major: ver.major + 1, minor: 0, patch: 0, prerelease: [], build: [] };
    case "minor":
      return { major: ver.major, minor: ver.minor + 1, patch: 0, prerelease: [], build: [] };
    case "patch":
      return { major: ver.major, minor: ver.minor, patch: ver.patch + 1, prerelease: [], build: [] };
    case "prerelease": {
      if (ver.prerelease.length === 0) {
        return { ...ver, patch: ver.patch + 1, prerelease: ["0"], build: [] };
      }
      const last = ver.prerelease[ver.prerelease.length - 1];
      const num = parseInt(last, 10);
      if (!isNaN(num)) {
        const pre = [...ver.prerelease];
        pre[pre.length - 1] = String(num + 1);
        return { ...ver, prerelease: pre, build: [] };
      }
      return { ...ver, prerelease: [...ver.prerelease, "0"], build: [] };
    }
  }
}

export function satisfies(ver: SemVer, range: string): boolean {
  if (range === "*") return true;

  if (range.startsWith("^")) {
    const base = parse(range.slice(1));
    if (!base) return false;
    if (ver.major !== base.major) return false;
    return compare(ver, base) >= 0;
  }

  if (range.startsWith("~")) {
    const base = parse(range.slice(1));
    if (!base) return false;
    if (ver.major !== base.major || ver.minor !== base.minor) return false;
    return compare(ver, base) >= 0;
  }

  if (range.startsWith(">=")) {
    const base = parse(range.slice(2));
    return base ? gte(ver, base) : false;
  }
  if (range.startsWith("<=")) {
    const base = parse(range.slice(2));
    return base ? lte(ver, base) : false;
  }
  if (range.startsWith(">")) {
    const base = parse(range.slice(1));
    return base ? gt(ver, base) : false;
  }
  if (range.startsWith("<")) {
    const base = parse(range.slice(1));
    return base ? lt(ver, base) : false;
  }

  const exact = parse(range);
  return exact ? eq(ver, exact) : false;
}

export function sort(versions: SemVer[]): SemVer[] {
  return [...versions].sort(compare);
}

export function maxVersion(versions: SemVer[]): SemVer | null {
  if (versions.length === 0) return null;
  return versions.reduce((max, v) => gt(v, max) ? v : max);
}
