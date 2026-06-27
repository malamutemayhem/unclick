export function globToRegex(pattern: string): RegExp {
  let result = "^";
  let i = 0;

  while (i < pattern.length) {
    const c = pattern[i];

    if (c === "*") {
      if (pattern[i + 1] === "*") {
        if (pattern[i + 2] === "/") {
          result += "(?:.*/)?";
          i += 3;
        } else {
          result += ".*";
          i += 2;
        }
      } else {
        result += "[^/]*";
        i++;
      }
    } else if (c === "?") {
      result += "[^/]";
      i++;
    } else if (c === "[") {
      const end = pattern.indexOf("]", i);
      if (end === -1) {
        result += "\\[";
        i++;
      } else {
        result += pattern.slice(i, end + 1);
        i = end + 1;
      }
    } else if (c === "{") {
      const end = pattern.indexOf("}", i);
      if (end === -1) {
        result += "\\{";
        i++;
      } else {
        const alternatives = pattern.slice(i + 1, end).split(",");
        result += "(?:" + alternatives.map(escapeForRegex).join("|") + ")";
        i = end + 1;
      }
    } else if (".+^$|()\\".includes(c)) {
      result += "\\" + c;
      i++;
    } else {
      result += c;
      i++;
    }
  }

  result += "$";
  return new RegExp(result);
}

export function matchGlob(pattern: string, path: string): boolean {
  return globToRegex(pattern).test(path);
}

export function matchAny(patterns: string[], path: string): boolean {
  return patterns.some((p) => matchGlob(p, path));
}

export function filterPaths(patterns: string[], paths: string[]): string[] {
  return paths.filter((path) => matchAny(patterns, path));
}

export function isGlob(str: string): boolean {
  return /[*?[\]{}]/.test(str);
}

function escapeForRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
