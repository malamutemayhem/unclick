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

export function format(ver: SemVer): string {
  let result = `${ver.major}.${ver.minor}.${ver.patch}`;
  if (ver.prerelease.length > 0) result += `-${ver.prerelease.join(".")}`;
  if (ver.build.length > 0) result += `+${ver.build.join(".")}`;
  return result;
}

export function compare(a: string, b: string): number {
  const va = parse(a);
  const vb = parse(b);
  if (!va || !vb) throw new Error("Invalid semver");

  if (va.major !== vb.major) return va.major - vb.major;
  if (va.minor !== vb.minor) return va.minor - vb.minor;
  if (va.patch !== vb.patch) return va.patch - vb.patch;

  if (va.prerelease.length === 0 && vb.prerelease.length > 0) return 1;
  if (va.prerelease.length > 0 && vb.prerelease.length === 0) return -1;

  for (let i = 0; i < Math.max(va.prerelease.length, vb.prerelease.length); i++) {
    if (i >= va.prerelease.length) return -1;
    if (i >= vb.prerelease.length) return 1;
    const ai = va.prerelease[i];
    const bi = vb.prerelease[i];
    const aNum = /^\d+$/.test(ai);
    const bNum = /^\d+$/.test(bi);
    if (aNum && bNum) {
      const diff = parseInt(ai, 10) - parseInt(bi, 10);
      if (diff !== 0) return diff;
    } else if (aNum) return -1;
    else if (bNum) return 1;
    else if (ai !== bi) return ai < bi ? -1 : 1;
  }
  return 0;
}

export function gt(a: string, b: string): boolean { return compare(a, b) > 0; }
export function lt(a: string, b: string): boolean { return compare(a, b) < 0; }
export function eq(a: string, b: string): boolean { return compare(a, b) === 0; }
export function gte(a: string, b: string): boolean { return compare(a, b) >= 0; }
export function lte(a: string, b: string): boolean { return compare(a, b) <= 0; }

export function increment(version: string, type: "major" | "minor" | "patch"): string {
  const ver = parse(version);
  if (!ver) throw new Error("Invalid semver");
  switch (type) {
    case "major": return `${ver.major + 1}.0.0`;
    case "minor": return `${ver.major}.${ver.minor + 1}.0`;
    case "patch": return `${ver.major}.${ver.minor}.${ver.patch + 1}`;
  }
}

export function isValid(version: string): boolean {
  return parse(version) !== null;
}

export function sort(versions: string[]): string[] {
  return [...versions].sort(compare);
}
