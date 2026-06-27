export interface Token {
  type: string;
  value: string;
  line: number;
  column: number;
}

export interface TokenRule {
  type: string;
  pattern: RegExp;
  skip?: boolean;
}

export function createTokenizer(rules: TokenRule[]): (input: string) => Token[] {
  return (input: string): Token[] => {
    const tokens: Token[] = [];
    let pos = 0;
    let line = 1;
    let column = 1;

    while (pos < input.length) {
      let matched = false;
      for (const rule of rules) {
        rule.pattern.lastIndex = 0;
        const sticky = new RegExp(rule.pattern.source, "y");
        sticky.lastIndex = pos;
        const match = sticky.exec(input);
        if (match) {
          if (!rule.skip) {
            tokens.push({ type: rule.type, value: match[0], line, column });
          }
          for (const ch of match[0]) {
            if (ch === "\n") { line++; column = 1; }
            else column++;
          }
          pos += match[0].length;
          matched = true;
          break;
        }
      }
      if (!matched) {
        throw new Error(`Unexpected character '${input[pos]}' at line ${line}, column ${column}`);
      }
    }

    return tokens;
  };
}

export const jsonTokenizer = createTokenizer([
  { type: "whitespace", pattern: /\s+/, skip: true },
  { type: "string", pattern: /"(?:[^"\\]|\\.)*"/ },
  { type: "number", pattern: /-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/ },
  { type: "boolean", pattern: /true|false/ },
  { type: "null", pattern: /null/ },
  { type: "lbrace", pattern: /\{/ },
  { type: "rbrace", pattern: /\}/ },
  { type: "lbracket", pattern: /\[/ },
  { type: "rbracket", pattern: /\]/ },
  { type: "comma", pattern: /,/ },
  { type: "colon", pattern: /:/ },
]);

export const mathTokenizer = createTokenizer([
  { type: "whitespace", pattern: /\s+/, skip: true },
  { type: "number", pattern: /\d+(?:\.\d+)?/ },
  { type: "ident", pattern: /[a-zA-Z_]\w*/ },
  { type: "plus", pattern: /\+/ },
  { type: "minus", pattern: /-/ },
  { type: "star", pattern: /\*/ },
  { type: "slash", pattern: /\// },
  { type: "caret", pattern: /\^/ },
  { type: "lparen", pattern: /\(/ },
  { type: "rparen", pattern: /\)/ },
  { type: "comma", pattern: /,/ },
]);

export function tokenCount(tokens: Token[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const t of tokens) {
    counts.set(t.type, (counts.get(t.type) ?? 0) + 1);
  }
  return counts;
}

export function filterByType(tokens: Token[], type: string): Token[] {
  return tokens.filter((t) => t.type === type);
}
