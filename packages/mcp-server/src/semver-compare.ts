export interface SemVer {
  major: number;
  minor: number;
  patch: number;
  prerelease: string[];
  build: string[];
}

export class SemverCompare {
  static parse(version: string): SemVer | null {
    const match = version.match(/^v?(\d+)\.(\d+)\.(\d+)(?:-([a-zA-Z0-9.]+))?(?:\+([a-zA-Z0-9.]+))?$/);
    if (!match) return null;
    return {
      major: parseInt(match[1]),
      minor: parseInt(match[2]),
      patch: parseInt(match[3]),
      prerelease: match[4] ? match[4].split(".") : [],
      build: match[5] ? match[5].split(".") : [],
    };
  }

  static format(v: SemVer): string {
    let s = `${v.major}.${v.minor}.${v.patch}`;
    if (v.prerelease.length > 0) s += `-${v.prerelease.join(".")}`;
    if (v.build.length > 0) s += `+${v.build.join(".")}`;
    return s;
  }

  static compare(a: string, b: string): -1 | 0 | 1 {
    const va = SemverCompare.parse(a);
    const vb = SemverCompare.parse(b);
    if (!va || !vb) return 0;

    if (va.major !== vb.major) return va.major > vb.major ? 1 : -1;
    if (va.minor !== vb.minor) return va.minor > vb.minor ? 1 : -1;
    if (va.patch !== vb.patch) return va.patch > vb.patch ? 1 : -1;

    if (va.prerelease.length === 0 && vb.prerelease.length > 0) return 1;
    if (va.prerelease.length > 0 && vb.prerelease.length === 0) return -1;

    const maxLen = Math.max(va.prerelease.length, vb.prerelease.length);
    for (let i = 0; i < maxLen; i++) {
      if (i >= va.prerelease.length) return -1;
      if (i >= vb.prerelease.length) return 1;
      const ai = parseInt(va.prerelease[i]);
      const bi = parseInt(vb.prerelease[i]);
      if (!isNaN(ai) && !isNaN(bi)) {
        if (ai !== bi) return ai > bi ? 1 : -1;
      } else {
        if (va.prerelease[i] !== vb.prerelease[i]) {
          return va.prerelease[i] > vb.prerelease[i] ? 1 : -1;
        }
      }
    }
    return 0;
  }

  static gt(a: string, b: string): boolean { return SemverCompare.compare(a, b) === 1; }
  static lt(a: string, b: string): boolean { return SemverCompare.compare(a, b) === -1; }
  static eq(a: string, b: string): boolean { return SemverCompare.compare(a, b) === 0; }
  static gte(a: string, b: string): boolean { return SemverCompare.compare(a, b) >= 0; }
  static lte(a: string, b: string): boolean { return SemverCompare.compare(a, b) <= 0; }

  static sort(versions: string[]): string[] {
    return [...versions].sort(SemverCompare.compare);
  }

  static max(versions: string[]): string | null {
    if (versions.length === 0) return null;
    return SemverCompare.sort(versions)[versions.length - 1];
  }

  static min(versions: string[]): string | null {
    if (versions.length === 0) return null;
    return SemverCompare.sort(versions)[0];
  }

  static bump(version: string, part: "major" | "minor" | "patch"): string | null {
    const v = SemverCompare.parse(version);
    if (!v) return null;
    if (part === "major") { v.major++; v.minor = 0; v.patch = 0; }
    else if (part === "minor") { v.minor++; v.patch = 0; }
    else { v.patch++; }
    v.prerelease = [];
    v.build = [];
    return SemverCompare.format(v);
  }

  static satisfies(version: string, range: string): boolean {
    if (range.startsWith("^")) {
      const min = SemverCompare.parse(range.slice(1));
      const v = SemverCompare.parse(version);
      if (!min || !v) return false;
      if (v.major !== min.major) return false;
      return SemverCompare.gte(version, range.slice(1));
    }
    if (range.startsWith("~")) {
      const min = SemverCompare.parse(range.slice(1));
      const v = SemverCompare.parse(version);
      if (!min || !v) return false;
      if (v.major !== min.major || v.minor !== min.minor) return false;
      return SemverCompare.gte(version, range.slice(1));
    }
    return SemverCompare.eq(version, range);
  }
}
