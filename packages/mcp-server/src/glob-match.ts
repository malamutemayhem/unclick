export function globMatch(pattern: string, text: string): boolean {
  return matchSegments(pattern.split("/"), text.split("/"));
}

function matchSegments(patterns: string[], texts: string[]): boolean {
  let pi = 0;
  let ti = 0;

  while (pi < patterns.length && ti < texts.length) {
    if (patterns[pi] === "**") {
      if (pi === patterns.length - 1) return true;
      for (let skip = ti; skip <= texts.length; skip++) {
        if (matchSegments(patterns.slice(pi + 1), texts.slice(skip))) return true;
      }
      return false;
    }
    if (!matchOne(patterns[pi], texts[ti])) return false;
    pi++;
    ti++;
  }

  while (pi < patterns.length && patterns[pi] === "**") pi++;
  return pi === patterns.length && ti === texts.length;
}

function matchOne(pattern: string, text: string): boolean {
  let pi = 0;
  let ti = 0;
  let starPi = -1;
  let starTi = -1;

  while (ti < text.length) {
    if (pi < pattern.length && (pattern[pi] === "?" || pattern[pi] === text[ti])) {
      pi++;
      ti++;
    } else if (pi < pattern.length && pattern[pi] === "*") {
      starPi = pi;
      starTi = ti;
      pi++;
    } else if (pi < pattern.length && pattern[pi] === "[") {
      const closeIdx = pattern.indexOf("]", pi);
      if (closeIdx === -1) return false;
      const negate = pattern[pi + 1] === "!";
      const chars = pattern.slice(pi + (negate ? 2 : 1), closeIdx);
      const match = charInRange(text[ti], chars);
      if (negate ? match : !match) {
        if (starPi >= 0) { pi = starPi + 1; ti = ++starTi; }
        else return false;
      } else {
        pi = closeIdx + 1;
        ti++;
      }
    } else if (starPi >= 0) {
      pi = starPi + 1;
      ti = ++starTi;
    } else {
      return false;
    }
  }

  while (pi < pattern.length && pattern[pi] === "*") pi++;
  return pi === pattern.length;
}

function charInRange(ch: string, range: string): boolean {
  for (let i = 0; i < range.length; i++) {
    if (i + 2 < range.length && range[i + 1] === "-") {
      if (ch >= range[i] && ch <= range[i + 2]) return true;
      i += 2;
    } else {
      if (ch === range[i]) return true;
    }
  }
  return false;
}

export function isGlob(str: string): boolean {
  return /[*?[\]{}]/.test(str);
}

export function escapeGlob(str: string): string {
  return str.replace(/[*?[\]{}\\]/g, "\\$&");
}
