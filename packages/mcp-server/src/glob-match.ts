export function globMatch(pattern: string, input: string): boolean {
  return regexFromGlob(pattern).test(input);
}

export function globFilter(pattern: string, inputs: string[]): string[] {
  const re = regexFromGlob(pattern);
  return inputs.filter((s) => re.test(s));
}

export function regexFromGlob(pattern: string): RegExp {
  let regex = "^";
  let i = 0;
  while (i < pattern.length) {
    const ch = pattern[i];
    if (ch === "*") {
      if (pattern[i + 1] === "*") {
        if (pattern[i + 2] === "/") {
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
      let bracket = "[";
      if (pattern[j] === "!") { bracket += "^"; j++; }
      while (j < pattern.length && pattern[j] !== "]") {
        bracket += pattern[j];
        j++;
      }
      bracket += "]";
      regex += bracket;
      i = j + 1;
    } else if (ch === "{") {
      let j = i + 1;
      const options: string[] = [];
      let current = "";
      while (j < pattern.length && pattern[j] !== "}") {
        if (pattern[j] === ",") {
          options.push(current);
          current = "";
        } else {
          current += pattern[j];
        }
        j++;
      }
      options.push(current);
      regex += "(?:" + options.map(escapeRegex).join("|") + ")";
      i = j + 1;
    } else {
      regex += escapeRegex(ch);
      i++;
    }
  }
  regex += "$";
  return new RegExp(regex);
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
