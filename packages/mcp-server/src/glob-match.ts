export function globMatch(pattern: string, input: string): boolean {
  return regexFromGlob(pattern).test(input);
}

export function regexFromGlob(pattern: string): RegExp {
  let regex = "^";
  let i = 0;
  while (i < pattern.length) {
    const ch = pattern[i];
    if (ch === "*") {
      if (i + 1 < pattern.length && pattern[i + 1] === "*") {
        if (i + 2 < pattern.length && pattern[i + 2] === "/") {
          regex += "(?:.*/)?";
          i += 3;
        } else {
          regex += ".*";
          i += 2;
        }
      } else {
        regex += "[^/]*";
        i++;
      }
    } else if (ch === "?") {
      regex += "[^/]";
      i++;
    } else if (ch === "[") {
      let j = i + 1;
      while (j < pattern.length && pattern[j] !== "]") j++;
      regex += pattern.slice(i, j + 1);
      i = j + 1;
    } else if (".+^${}()|\\".includes(ch)) {
      regex += "\\" + ch;
      i++;
    } else {
      regex += ch;
      i++;
    }
  }
  regex += "$";
  return new RegExp(regex);
}

export function isGlob(str: string): boolean {
  return /[*?[\]{}]/.test(str);
}

export function matchMany(patterns: string[], input: string): boolean {
  return patterns.some((p: string) => globMatch(p, input));
}
