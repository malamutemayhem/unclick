export interface SemVer {
  major: number;
  minor: number;
  patch: number;
  prerelease: string[];
  build: string[];
}

export function parse(version: string): SemVer {
  const match = version.match(
    /^v?(\d+)\.(\d+)\.(\d+)(?:-([a-zA-Z0-9.]+))?(?:\+([a-zA-Z0-9.]+))?$/
  );
  if (!match) throw new Error(`Invalid semver: ${version}`);
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

export function compare(a: string, b: string): number {
  const va = parse(a);
  const vb = parse(b);
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

export function gt(a: string, b: string): boolean { return compare(a, b) > 0; }
export function lt(a: string, b: string): boolean { return compare(a, b) < 0; }
export function eq(a: string, b: string): boolean { return compare(a, b) === 0; }
export function gte(a: string, b: string): boolean { return compare(a, b) >= 0; }
export function lte(a: string, b: string): boolean { return compare(a, b) <= 0; }

export function increment(version: string, part: "major" | "minor" | "patch"): string {
  const v = parse(version);
  if (part === "major") { v.major++; v.minor = 0; v.patch = 0; }
  else if (part === "minor") { v.minor++; v.patch = 0; }
  else { v.patch++; }
  v.prerelease = [];
  v.build = [];
  return format(v);
}

export function valid(version: string): boolean {
  try { parse(version); return true; } catch { return false; }
}
