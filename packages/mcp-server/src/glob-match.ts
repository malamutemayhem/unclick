export function globMatch(pattern: string, text: string): boolean {
  return matchSegments(pattern, text, 0, 0);
}

function matchSegments(pattern: string, text: string, pi: number, ti: number): boolean {
  while (pi < pattern.length && ti < text.length) {
    if (pattern[pi] === "*") {
      if (pattern[pi + 1] === "*") {
        pi += 2;
        if (pi < pattern.length && pattern[pi] === "/") pi++;
        for (let i = ti; i <= text.length; i++) {
          if (matchSegments(pattern, text, pi, i)) return true;
        }
        return false;
      }
      pi++;
      for (let i = ti; i <= text.length; i++) {
        if (i > ti && text[i - 1] === "/") break;
        if (matchSegments(pattern, text, pi, i)) return true;
      }
      return false;
    }
    if (pattern[pi] === "?") {
      if (text[ti] === "/") return false;
      pi++;
      ti++;
    } else if (pattern[pi] === "[") {
      const close = pattern.indexOf("]", pi);
      if (close === -1) return false;
      const negate = pattern[pi + 1] === "!";
      const chars = pattern.slice(pi + (negate ? 2 : 1), close);
      const matches = charInRange(text[ti], chars);
      if (negate ? matches : !matches) return false;
      pi = close + 1;
      ti++;
    } else {
      if (pattern[pi] !== text[ti]) return false;
      pi++;
      ti++;
    }
  }
  while (pi < pattern.length && pattern[pi] === "*") pi++;
  return pi === pattern.length && ti === text.length;
}

function charInRange(ch: string, range: string): boolean {
  for (let i = 0; i < range.length; i++) {
    if (range[i + 1] === "-" && i + 2 < range.length) {
      if (ch >= range[i] && ch <= range[i + 2]) return true;
      i += 2;
    } else {
      if (ch === range[i]) return true;
    }
  }
  return false;
}

export function globFilter(pattern: string, items: string[]): string[] {
  return items.filter((item) => globMatch(pattern, item));
}
