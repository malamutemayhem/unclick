export interface CaptureGroup {
  index: number;
  start: number;
  end: number;
  value: string;
  name?: string;
}

export interface MatchResult {
  matched: boolean;
  value: string;
  start: number;
  end: number;
  groups: CaptureGroup[];
  named: Record<string, string>;
}

interface NState {
  type: "literal" | "dot" | "charClass" | "start" | "end" | "groupStart" | "groupEnd" | "split" | "match";
  char?: string;
  chars?: Set<string>;
  negate?: boolean;
  groupIndex?: number;
  out1?: NState;
  out2?: NState;
}

export class RegexCapture {
  private pattern: string;
  private groupCount: number;

  constructor(pattern: string) {
    this.pattern = pattern;
    this.groupCount = 0;
  }

  exec(input: string): MatchResult | null {
    for (let i = 0; i <= input.length; i++) {
      const result = this.tryMatch(input, i);
      if (result) return result;
    }
    return null;
  }

  execAll(input: string): MatchResult[] {
    const results: MatchResult[] = [];
    let pos = 0;
    while (pos <= input.length) {
      const result = this.tryMatch(input, pos);
      if (!result) {
        pos++;
        continue;
      }
      results.push(result);
      pos = result.end > pos ? result.end : pos + 1;
    }
    return results;
  }

  test(input: string): boolean {
    return this.exec(input) !== null;
  }

  private tryMatch(input: string, startPos: number): MatchResult | null {
    this.groupCount = 0;
    const tokens = this.tokenize();
    const groups: Map<number, { start: number; end: number }> = new Map();
    const pos = this.matchTokens(tokens, input, startPos, 0, groups);
    if (pos === -1) return null;

    const captures: CaptureGroup[] = [];
    const named: Record<string, string> = {};
    for (const [idx, g] of groups) {
      const value = input.slice(g.start, g.end);
      captures.push({ index: idx, start: g.start, end: g.end, value });
    }
    captures.sort((a, b) => a.index - b.index);

    return {
      matched: true,
      value: input.slice(startPos, pos),
      start: startPos,
      end: pos,
      groups: captures,
      named,
    };
  }

  private tokenize(): Token[] {
    const tokens: Token[] = [];
    let i = 0;
    const p = this.pattern;

    while (i < p.length) {
      if (p[i] === "(") {
        this.groupCount++;
        tokens.push({ type: "groupStart", groupIndex: this.groupCount });
        i++;
      } else if (p[i] === ")") {
        tokens.push({ type: "groupEnd" });
        i++;
      } else if (p[i] === "[") {
        i++;
        let negate = false;
        if (p[i] === "^") {
          negate = true;
          i++;
        }
        const chars = new Set<string>();
        while (i < p.length && p[i] !== "]") {
          if (i + 2 < p.length && p[i + 1] === "-" && p[i + 2] !== "]") {
            const from = p.charCodeAt(i);
            const to = p.charCodeAt(i + 2);
            for (let c = from; c <= to; c++) chars.add(String.fromCharCode(c));
            i += 3;
          } else {
            chars.add(p[i]);
            i++;
          }
        }
        i++;
        tokens.push({ type: "charClass", chars, negate });
        this.applyQuantifier(tokens, p, i, (ni) => { i = ni; });
      } else if (p[i] === ".") {
        tokens.push({ type: "dot" });
        i++;
        this.applyQuantifier(tokens, p, i, (ni) => { i = ni; });
      } else if (p[i] === "^") {
        tokens.push({ type: "anchor", anchor: "start" });
        i++;
      } else if (p[i] === "$") {
        tokens.push({ type: "anchor", anchor: "end" });
        i++;
      } else if (p[i] === "|") {
        tokens.push({ type: "alt" });
        i++;
      } else if (p[i] === "\\") {
        i++;
        const shorthand = this.expandShorthand(p[i]);
        if (shorthand) {
          tokens.push(shorthand);
        } else {
          tokens.push({ type: "literal", char: p[i] });
        }
        i++;
        this.applyQuantifier(tokens, p, i, (ni) => { i = ni; });
      } else {
        tokens.push({ type: "literal", char: p[i] });
        i++;
        this.applyQuantifier(tokens, p, i, (ni) => { i = ni; });
      }
    }
    return tokens;
  }

  private expandShorthand(c: string): Token | null {
    const digits = new Set("0123456789".split(""));
    const word = new Set("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_".split(""));
    const space = new Set(" \t\n\r\f\v".split(""));
    switch (c) {
      case "d": return { type: "charClass", chars: digits, negate: false };
      case "D": return { type: "charClass", chars: digits, negate: true };
      case "w": return { type: "charClass", chars: word, negate: false };
      case "W": return { type: "charClass", chars: word, negate: true };
      case "s": return { type: "charClass", chars: space, negate: false };
      case "S": return { type: "charClass", chars: space, negate: true };
      default: return null;
    }
  }

  private applyQuantifier(tokens: Token[], p: string, i: number, setI: (n: number) => void): void {
    if (i >= p.length) return;
    if (p[i] === "*") {
      const last = tokens.pop()!;
      tokens.push({ type: "star", inner: last });
      setI(i + 1);
    } else if (p[i] === "+") {
      const last = tokens.pop()!;
      tokens.push({ type: "plus", inner: last });
      setI(i + 1);
    } else if (p[i] === "?") {
      const last = tokens.pop()!;
      tokens.push({ type: "optional", inner: last });
      setI(i + 1);
    }
  }

  private matchTokens(
    tokens: Token[],
    input: string,
    pos: number,
    tokenIdx: number,
    groups: Map<number, { start: number; end: number }>
  ): number {
    if (tokenIdx >= tokens.length) return pos;

    const token = tokens[tokenIdx];

    if (token.type === "alt") {
      const right = this.matchTokens(tokens, input, pos, tokenIdx + 1, groups);
      return right;
    }

    if (token.type === "anchor") {
      if (token.anchor === "start" && pos !== 0) return -1;
      if (token.anchor === "end" && pos !== input.length) return -1;
      return this.matchTokens(tokens, input, pos, tokenIdx + 1, groups);
    }

    if (token.type === "groupStart") {
      const savedGroups = new Map(groups);
      groups.set(token.groupIndex!, { start: pos, end: pos });
      const result = this.matchTokens(tokens, input, pos, tokenIdx + 1, groups);
      if (result === -1) {
        for (const [k, v] of savedGroups) groups.set(k, v);
        for (const k of groups.keys()) {
          if (!savedGroups.has(k)) groups.delete(k);
        }
      }
      return result;
    }

    if (token.type === "groupEnd") {
      const lastGroup = this.findLastOpenGroup(tokens, tokenIdx, groups);
      if (lastGroup !== -1) {
        const g = groups.get(lastGroup)!;
        groups.set(lastGroup, { start: g.start, end: pos });
      }
      return this.matchTokens(tokens, input, pos, tokenIdx + 1, groups);
    }

    if (token.type === "star") {
      for (let count = this.maxStarMatch(token.inner!, input, pos); count >= 0; count--) {
        const afterStar = this.consumeN(token.inner!, input, pos, count);
        if (afterStar === -1) continue;
        const result = this.matchTokens(tokens, input, afterStar, tokenIdx + 1, groups);
        if (result !== -1) return result;
      }
      return -1;
    }

    if (token.type === "plus") {
      for (let count = this.maxStarMatch(token.inner!, input, pos); count >= 1; count--) {
        const afterPlus = this.consumeN(token.inner!, input, pos, count);
        if (afterPlus === -1) continue;
        const result = this.matchTokens(tokens, input, afterPlus, tokenIdx + 1, groups);
        if (result !== -1) return result;
      }
      return -1;
    }

    if (token.type === "optional") {
      const withOpt = this.matchSingle(token.inner!, input, pos);
      if (withOpt !== -1) {
        const result = this.matchTokens(tokens, input, withOpt, tokenIdx + 1, groups);
        if (result !== -1) return result;
      }
      return this.matchTokens(tokens, input, pos, tokenIdx + 1, groups);
    }

    const next = this.matchSingle(token, input, pos);
    if (next === -1) return -1;
    return this.matchTokens(tokens, input, next, tokenIdx + 1, groups);
  }

  private matchSingle(token: Token, input: string, pos: number): number {
    if (pos >= input.length) return -1;
    if (token.type === "literal") {
      return input[pos] === token.char ? pos + 1 : -1;
    }
    if (token.type === "dot") {
      return pos + 1;
    }
    if (token.type === "charClass") {
      const has = token.chars!.has(input[pos]);
      return (token.negate ? !has : has) ? pos + 1 : -1;
    }
    return -1;
  }

  private maxStarMatch(token: Token, input: string, pos: number): number {
    let count = 0;
    let p = pos;
    while (p < input.length) {
      const next = this.matchSingle(token, input, p);
      if (next === -1) break;
      count++;
      p = next;
    }
    return count;
  }

  private consumeN(token: Token, input: string, pos: number, n: number): number {
    let p = pos;
    for (let i = 0; i < n; i++) {
      const next = this.matchSingle(token, input, p);
      if (next === -1) return -1;
      p = next;
    }
    return p;
  }

  private findLastOpenGroup(tokens: Token[], endIdx: number, groups: Map<number, { start: number; end: number }>): number {
    let depth = 0;
    for (let i = endIdx; i >= 0; i--) {
      if (tokens[i].type === "groupEnd") depth++;
      if (tokens[i].type === "groupStart") {
        depth--;
        if (depth === 0) return tokens[i].groupIndex!;
      }
    }
    return -1;
  }
}

interface Token {
  type: "literal" | "dot" | "charClass" | "anchor" | "groupStart" | "groupEnd" | "star" | "plus" | "optional" | "alt";
  char?: string;
  chars?: Set<string>;
  negate?: boolean;
  anchor?: "start" | "end";
  groupIndex?: number;
  inner?: Token;
}

export function match(pattern: string, input: string): MatchResult | null {
  return new RegexCapture(pattern).exec(input);
}

export function matchAll(pattern: string, input: string): MatchResult[] {
  return new RegexCapture(pattern).execAll(input);
}

export function testPattern(pattern: string, input: string): boolean {
  return new RegexCapture(pattern).test(input);
}
