export interface SemVer {
  major: number;
  minor: number;
  patch: number;
  prerelease: string[];
  build: string[];
}

export function parse(version: string): SemVer {
  const match = version.match(/^v?(\d+)\.(\d+)\.(\d+)(?:-([a-zA-Z0-9.]+))?(?:\+([a-zA-Z0-9.]+))?$/);
  if (!match) throw new Error(`Invalid semver: ${version}`);
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

export function compare(a: SemVer | string, b: SemVer | string): number {
  const va = typeof a === "string" ? parse(a) : a;
  const vb = typeof b === "string" ? parse(b) : b;
  if (va.major !== vb.major) return va.major - vb.major;
  if (va.minor !== vb.minor) return va.minor - vb.minor;
  if (va.patch !== vb.patch) return va.patch - vb.patch;
  if (va.prerelease.length === 0 && vb.prerelease.length === 0) return 0;
  if (va.prerelease.length === 0) return 1;
  if (vb.prerelease.length === 0) return -1;
  const len = Math.max(va.prerelease.length, vb.prerelease.length);
  for (let i = 0; i < len; i++) {
    if (i >= va.prerelease.length) return -1;
    if (i >= vb.prerelease.length) return 1;
    const ai = va.prerelease[i];
    const bi = vb.prerelease[i];
    const an = parseInt(ai, 10);
    const bn = parseInt(bi, 10);
    if (!isNaN(an) && !isNaN(bn)) {
      if (an !== bn) return an - bn;
    } else {
      if (ai < bi) return -1;
      if (ai > bi) return 1;
    }
  }
  return 0;
}

export function gt(a: SemVer | string, b: SemVer | string): boolean {
  return compare(a, b) > 0;
}

export function lt(a: SemVer | string, b: SemVer | string): boolean {
  return compare(a, b) < 0;
}

export function eq(a: SemVer | string, b: SemVer | string): boolean {
  return compare(a, b) === 0;
}

export function increment(v: SemVer | string, type: "major" | "minor" | "patch"): SemVer {
  const ver = typeof v === "string" ? parse(v) : { ...v };
  if (type === "major") { ver.major++; ver.minor = 0; ver.patch = 0; }
  else if (type === "minor") { ver.minor++; ver.patch = 0; }
  else { ver.patch++; }
  ver.prerelease = [];
  ver.build = [];
  return ver;
}

export function satisfies(version: SemVer | string, range: string): boolean {
  const v = typeof version === "string" ? parse(version) : version;
  if (range.startsWith("^")) {
    const base = parse(range.slice(1));
    if (v.major !== base.major) return false;
    return compare(v, base) >= 0;
  }
  if (range.startsWith("~")) {
    const base = parse(range.slice(1));
    if (v.major !== base.major || v.minor !== base.minor) return false;
    return compare(v, base) >= 0;
  }
  if (range.startsWith(">=")) return compare(v, range.slice(2)) >= 0;
  if (range.startsWith("<=")) return compare(v, range.slice(2)) <= 0;
  if (range.startsWith(">")) return compare(v, range.slice(1)) > 0;
  if (range.startsWith("<")) return compare(v, range.slice(1)) < 0;
  return eq(v, range);
}

export function sort(versions: string[]): string[] {
  return [...versions].sort(compare);
}
