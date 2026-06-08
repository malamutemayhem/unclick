export class RegexBuilder {
  private parts: string[] = [];
  private flags = "";

  literal(text: string): this {
    this.parts.push(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    return this;
  }

  raw(pattern: string): this {
    this.parts.push(pattern);
    return this;
  }

  digit(): this { this.parts.push("\\d"); return this; }
  digits(): this { this.parts.push("\\d+"); return this; }
  word(): this { this.parts.push("\\w"); return this; }
  words(): this { this.parts.push("\\w+"); return this; }
  whitespace(): this { this.parts.push("\\s"); return this; }
  whitespaces(): this { this.parts.push("\\s+"); return this; }
  any(): this { this.parts.push("."); return this; }
  anyOf(chars: string): this { this.parts.push(`[${chars.replace(/[\]\\]/g, "\\$&")}]`); return this; }
  noneOf(chars: string): this { this.parts.push(`[^${chars.replace(/[\]\\]/g, "\\$&")}]`); return this; }

  startOfLine(): this { this.parts.push("^"); return this; }
  endOfLine(): this { this.parts.push("$"); return this; }
  wordBoundary(): this { this.parts.push("\\b"); return this; }

  group(fn: (b: RegexBuilder) => void, name?: string): this {
    const inner = new RegexBuilder();
    fn(inner);
    const pattern = inner.parts.join("");
    this.parts.push(name ? `(?<${name}>${pattern})` : `(${pattern})`);
    return this;
  }

  nonCapture(fn: (b: RegexBuilder) => void): this {
    const inner = new RegexBuilder();
    fn(inner);
    this.parts.push(`(?:${inner.parts.join("")})`);
    return this;
  }

  optional(): this {
    const last = this.parts.pop();
    if (last) this.parts.push(`${last}?`);
    return this;
  }

  zeroOrMore(): this {
    const last = this.parts.pop();
    if (last) this.parts.push(`${last}*`);
    return this;
  }

  oneOrMore(): this {
    const last = this.parts.pop();
    if (last) this.parts.push(`${last}+`);
    return this;
  }

  repeat(n: number): this;
  repeat(min: number, max: number): this;
  repeat(min: number, max?: number): this {
    const last = this.parts.pop();
    if (last) {
      this.parts.push(max !== undefined ? `${last}{${min},${max}}` : `${last}{${min}}`);
    }
    return this;
  }

  or(fn: (b: RegexBuilder) => void): this {
    const inner = new RegexBuilder();
    fn(inner);
    const lastPart = this.parts.pop();
    if (lastPart) {
      this.parts.push(`(?:${lastPart}|${inner.parts.join("")})`);
    }
    return this;
  }

  lookahead(fn: (b: RegexBuilder) => void): this {
    const inner = new RegexBuilder();
    fn(inner);
    this.parts.push(`(?=${inner.parts.join("")})`);
    return this;
  }

  negativeLookahead(fn: (b: RegexBuilder) => void): this {
    const inner = new RegexBuilder();
    fn(inner);
    this.parts.push(`(?!${inner.parts.join("")})`);
    return this;
  }

  global(): this { this.flags += "g"; return this; }
  caseInsensitive(): this { this.flags += "i"; return this; }
  multiline(): this { this.flags += "m"; return this; }

  build(): RegExp {
    return new RegExp(this.parts.join(""), this.flags);
  }

  toString(): string {
    return this.parts.join("");
  }
}

export function regex(): RegexBuilder {
  return new RegexBuilder();
}
