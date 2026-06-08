export function globMatch(pattern: string, input: string): boolean {
  return matchSegments(pattern.split("/"), input.split("/"));
}

function matchSegments(patterns: string[], inputs: string[]): boolean {
  let pi = 0;
  let ii = 0;

  while (pi < patterns.length && ii < inputs.length) {
    if (patterns[pi] === "**") {
      if (pi === patterns.length - 1) return true;
      for (let skip = ii; skip <= inputs.length; skip++) {
        if (matchSegments(patterns.slice(pi + 1), inputs.slice(skip))) return true;
      }
      return false;
    }
    if (!matchSingle(patterns[pi], inputs[ii])) return false;
    pi++;
    ii++;
  }

  while (pi < patterns.length && patterns[pi] === "**") pi++;
  return pi === patterns.length && ii === inputs.length;
}

function matchSingle(pattern: string, input: string): boolean {
  let pi = 0;
  let ii = 0;
  let starPi = -1;
  let starIi = -1;

  while (ii < input.length) {
    if (pi < pattern.length && (pattern[pi] === "?" || pattern[pi] === input[ii])) {
      pi++;
      ii++;
    } else if (pi < pattern.length && pattern[pi] === "*") {
      starPi = pi;
      starIi = ii;
      pi++;
    } else if (pi < pattern.length && pattern[pi] === "[") {
      const close = pattern.indexOf("]", pi);
      if (close === -1) return false;
      const chars = pattern.slice(pi + 1, close);
      const negate = chars[0] === "!";
      const set = negate ? chars.slice(1) : chars;
      const inSet = set.includes(input[ii]);
      if (negate ? inSet : !inSet) {
        if (starPi >= 0) {
          pi = starPi + 1;
          ii = ++starIi;
        } else {
          return false;
        }
      } else {
        pi = close + 1;
        ii++;
      }
    } else if (starPi >= 0) {
      pi = starPi + 1;
      ii = ++starIi;
    } else {
      return false;
    }
  }

  while (pi < pattern.length && pattern[pi] === "*") pi++;
  return pi === pattern.length;
}

export function globFilter(pattern: string, inputs: string[]): string[] {
  return inputs.filter((input) => globMatch(pattern, input));
}

export function isGlob(str: string): boolean {
  return /[*?[\]{}]/.test(str);
}
