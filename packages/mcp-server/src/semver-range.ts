export interface SemVer {
  major: number;
  minor: number;
  patch: number;
  prerelease: string;
  build: string;
}

export class SemVerRange {
  static parse(version: string): SemVer {
    const match = version.trim().replace(/^v/, "").match(
      /^(\d+)\.(\d+)\.(\d+)(?:-([a-zA-Z0-9.]+))?(?:\+([a-zA-Z0-9.]+))?$/,
    );
    if (!match) throw new Error(`Invalid semver: ${version}`);
    return {
      major: parseInt(match[1]),
      minor: parseInt(match[2]),
      patch: parseInt(match[3]),
      prerelease: match[4] || "",
      build: match[5] || "",
    };
  }

  static format(v: SemVer): string {
    let s = `${v.major}.${v.minor}.${v.patch}`;
    if (v.prerelease) s += `-${v.prerelease}`;
    if (v.build) s += `+${v.build}`;
    return s;
  }

  static compare(a: string, b: string): number {
    const va = SemVerRange.parse(a);
    const vb = SemVerRange.parse(b);
    if (va.major !== vb.major) return va.major - vb.major;
    if (va.minor !== vb.minor) return va.minor - vb.minor;
    if (va.patch !== vb.patch) return va.patch - vb.patch;
    if (va.prerelease && !vb.prerelease) return -1;
    if (!va.prerelease && vb.prerelease) return 1;
    return va.prerelease.localeCompare(vb.prerelease);
  }

  static satisfies(version: string, range: string): boolean {
    const v = SemVerRange.parse(version);
    const trimmed = range.trim();

    if (trimmed.startsWith("^")) {
      const base = SemVerRange.parse(trimmed.slice(1));
      if (v.major !== base.major) return false;
      if (v.minor < base.minor) return false;
      if (v.minor === base.minor && v.patch < base.patch) return false;
      return true;
    }

    if (trimmed.startsWith("~")) {
      const base = SemVerRange.parse(trimmed.slice(1));
      if (v.major !== base.major || v.minor !== base.minor) return false;
      return v.patch >= base.patch;
    }

    if (trimmed.startsWith(">=")) {
      return SemVerRange.compare(version, trimmed.slice(2).trim()) >= 0;
    }
    if (trimmed.startsWith("<=")) {
      return SemVerRange.compare(version, trimmed.slice(2).trim()) <= 0;
    }
    if (trimmed.startsWith(">")) {
      return SemVerRange.compare(version, trimmed.slice(1).trim()) > 0;
    }
    if (trimmed.startsWith("<")) {
      return SemVerRange.compare(version, trimmed.slice(1).trim()) < 0;
    }

    return SemVerRange.compare(version, trimmed) === 0;
  }

  static increment(version: string, part: "major" | "minor" | "patch"): string {
    const v = SemVerRange.parse(version);
    if (part === "major") return `${v.major + 1}.0.0`;
    if (part === "minor") return `${v.major}.${v.minor + 1}.0`;
    return `${v.major}.${v.minor}.${v.patch + 1}`;
  }

  static sort(versions: string[]): string[] {
    return [...versions].sort(SemVerRange.compare);
  }

  static maxSatisfying(versions: string[], range: string): string | null {
    const matching = versions.filter((v) => SemVerRange.satisfies(v, range));
    if (matching.length === 0) return null;
    return SemVerRange.sort(matching).pop()!;
  }

  static isStable(version: string): boolean {
    const v = SemVerRange.parse(version);
    return v.major > 0 && !v.prerelease;
  }

  static diff(a: string, b: string): "major" | "minor" | "patch" | "prerelease" | "none" {
    const va = SemVerRange.parse(a);
    const vb = SemVerRange.parse(b);
    if (va.major !== vb.major) return "major";
    if (va.minor !== vb.minor) return "minor";
    if (va.patch !== vb.patch) return "patch";
    if (va.prerelease !== vb.prerelease) return "prerelease";
    return "none";
  }
}
