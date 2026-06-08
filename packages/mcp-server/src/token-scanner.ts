export interface TokenDef {
  type: string;
  pattern: RegExp;
  skip?: boolean;
}

export interface Token {
  type: string;
  value: string;
  offset: number;
  line: number;
  column: number;
}

export class Scanner {
  private defs: TokenDef[];

  constructor(defs: TokenDef[]) {
    this.defs = defs.map((d) => ({
      ...d,
      pattern: new RegExp(d.pattern.source, "y"),
    }));
  }

  scan(input: string): Token[] {
    const tokens: Token[] = [];
    let pos = 0;
    let line = 1;
    let lineStart = 0;

    while (pos < input.length) {
      let matched = false;

      for (const def of this.defs) {
        def.pattern.lastIndex = pos;
        const m = def.pattern.exec(input);
        if (m) {
          if (!def.skip) {
            tokens.push({
              type: def.type,
              value: m[0],
              offset: pos,
              line,
              column: pos - lineStart + 1,
            });
          }
          const newlines = m[0].split("\n");
          if (newlines.length > 1) {
            line += newlines.length - 1;
            lineStart = pos + m[0].length - newlines[newlines.length - 1].length;
          }
          pos += m[0].length;
          matched = true;
          break;
        }
      }

      if (!matched) {
        throw new Error(`Unexpected character '${input[pos]}' at line ${line}, column ${pos - lineStart + 1}`);
      }
    }

    return tokens;
  }
}

export function createJsonScanner(): Scanner {
  return new Scanner([
    { type: "ws", pattern: /\s+/, skip: true },
    { type: "string", pattern: /"(?:[^"\\]|\\.)*"/ },
    { type: "number", pattern: /-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/ },
    { type: "true", pattern: /true/ },
    { type: "false", pattern: /false/ },
    { type: "null", pattern: /null/ },
    { type: "lbrace", pattern: /\{/ },
    { type: "rbrace", pattern: /\}/ },
    { type: "lbracket", pattern: /\[/ },
    { type: "rbracket", pattern: /\]/ },
    { type: "comma", pattern: /,/ },
    { type: "colon", pattern: /:/ },
  ]);
}
