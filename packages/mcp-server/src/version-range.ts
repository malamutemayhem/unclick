interface SemVer {
  major: number;
  minor: number;
  patch: number;
  prerelease: string[];
}

function parse(version: string): SemVer {
  const clean = version.replace(/^[v=]/, "");
  const [main, pre] = clean.split("-");
  const [major, minor, patch] = main.split(".").map(Number);
  return {
    major: major || 0,
    minor: minor || 0,
    patch: patch || 0,
    prerelease: pre ? pre.split(".") : [],
  };
}

function compare(a: SemVer, b: SemVer): number {
  if (a.major !== b.major) return a.major - b.major;
  if (a.minor !== b.minor) return a.minor - b.minor;
  if (a.patch !== b.patch) return a.patch - b.patch;
  if (a.prerelease.length === 0 && b.prerelease.length === 0) return 0;
  if (a.prerelease.length === 0) return 1;
  if (b.prerelease.length === 0) return -1;
  for (let i = 0; i < Math.max(a.prerelease.length, b.prerelease.length); i++) {
    if (i >= a.prerelease.length) return -1;
    if (i >= b.prerelease.length) return 1;
    const ai = a.prerelease[i];
    const bi = b.prerelease[i];
    const an = Number(ai);
    const bn = Number(bi);
    if (!isNaN(an) && !isNaN(bn)) {
      if (an !== bn) return an - bn;
    } else {
      if (ai < bi) return -1;
      if (ai > bi) return 1;
    }
  }
  return 0;
}

type Comparator = (v: SemVer) => boolean;

function parseRange(range: string): Comparator {
  const trimmed = range.trim();

  if (trimmed === "*" || trimmed === "") return () => true;

  if (trimmed.startsWith("^")) {
    const base = parse(trimmed.slice(1));
    return (v) => {
      if (compare(v, base) < 0) return false;
      if (base.major !== 0) return v.major === base.major;
      if (base.minor !== 0) return v.major === base.major && v.minor === base.minor;
      return v.major === base.major && v.minor === base.minor && v.patch === base.patch;
    };
  }

  if (trimmed.startsWith("~")) {
    const base = parse(trimmed.slice(1));
    return (v) => {
      if (compare(v, base) < 0) return false;
      return v.major === base.major && v.minor === base.minor;
    };
  }

  if (trimmed.startsWith(">=")) {
    const base = parse(trimmed.slice(2));
    return (v) => compare(v, base) >= 0;
  }
  if (trimmed.startsWith("<=")) {
    const base = parse(trimmed.slice(2));
    return (v) => compare(v, base) <= 0;
  }
  if (trimmed.startsWith(">")) {
    const base = parse(trimmed.slice(1));
    return (v) => compare(v, base) > 0;
  }
  if (trimmed.startsWith("<")) {
    const base = parse(trimmed.slice(1));
    return (v) => compare(v, base) < 0;
  }
  if (trimmed.startsWith("=")) {
    const base = parse(trimmed.slice(1));
    return (v) => compare(v, base) === 0;
  }

  if (trimmed.includes(" - ")) {
    const [lo, hi] = trimmed.split(" - ").map(parse);
    return (v) => compare(v, lo) >= 0 && compare(v, hi) <= 0;
  }

  const base = parse(trimmed);
  return (v) => compare(v, base) === 0;
}

export function satisfies(version: string, range: string): boolean {
  const v = parse(version);

  const orParts = range.split("||").map((s) => s.trim());
  return orParts.some((orPart) => {
    if (orPart.includes(" - ")) {
      return parseRange(orPart)(v);
    }
    const andParts = orPart.split(/\s+/).filter(Boolean);
    if (andParts.length <= 1) {
      return parseRange(orPart)(v);
    }
    return andParts.every((part) => parseRange(part)(v));
  });
}

export function maxSatisfying(versions: string[], range: string): string | null {
  const matching = versions.filter((v) => satisfies(v, range));
  if (matching.length === 0) return null;
  return matching.sort((a, b) => compare(parse(b), parse(a)))[0];
}

export function minSatisfying(versions: string[], range: string): string | null {
  const matching = versions.filter((v) => satisfies(v, range));
  if (matching.length === 0) return null;
  return matching.sort((a, b) => compare(parse(a), parse(b)))[0];
}

export function validRange(range: string): boolean {
  try {
    const parts = range.split("||").flatMap((s) => s.trim().split(/\s+/));
    for (const part of parts) {
      parseRange(part);
    }
    return true;
  } catch {
    return false;
  }
}
