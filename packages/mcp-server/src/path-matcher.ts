export function match(pattern: string, input: string): boolean {
  return new RegExp(`^${patternToRegex(pattern)}$`).test(input);
}

export function matchAny(patterns: string[], input: string): boolean {
  return patterns.some((p) => match(p, input));
}

export function filter<T>(patterns: string[], items: T[], key: (item: T) => string): T[] {
  return items.filter((item) => matchAny(patterns, key(item)));
}

export function extractGroups(pattern: string, input: string): string[] | null {
  const re = new RegExp(`^${patternToRegex(pattern)}$`);
  const m = re.exec(input);
  if (!m) return null;
  return m.slice(1);
}

function patternToRegex(pattern: string): string {
  let result = "";
  let i = 0;
  while (i < pattern.length) {
    const ch = pattern[i];
    if (ch === "*" && pattern[i + 1] === "*") {
      result += "(.*)";
      i += 2;
      if (pattern[i] === "/") i++;
    } else if (ch === "*") {
      result += "([^/]*)";
      i++;
    } else if (ch === "?") {
      result += "([^/])";
      i++;
    } else if (".+^${}()|[]\\".includes(ch)) {
      result += "\\" + ch;
      i++;
    } else {
      result += ch;
      i++;
    }
  }
  return result;
}
