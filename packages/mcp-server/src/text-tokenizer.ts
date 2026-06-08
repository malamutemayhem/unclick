export interface Token {
  type: string;
  value: string;
  position: number;
}

export interface TokenRule {
  type: string;
  pattern: RegExp;
  skip?: boolean;
}

export class Tokenizer {
  private rules: TokenRule[];

  constructor(rules: TokenRule[]) {
    this.rules = rules.map((r) => ({
      ...r,
      pattern: new RegExp(r.pattern.source, "y"),
    }));
  }

  tokenize(input: string): Token[] {
    const tokens: Token[] = [];
    let pos = 0;

    while (pos < input.length) {
      let matched = false;

      for (const rule of this.rules) {
        rule.pattern.lastIndex = pos;
        const match = rule.pattern.exec(input);
        if (match) {
          if (!rule.skip) {
            tokens.push({ type: rule.type, value: match[0], position: pos });
          }
          pos += match[0].length;
          matched = true;
          break;
        }
      }

      if (!matched) {
        throw new Error(`Unexpected character '${input[pos]}' at position ${pos}`);
      }
    }

    return tokens;
  }
}

export function createJsonTokenizer(): Tokenizer {
  return new Tokenizer([
    { type: "WHITESPACE", pattern: /\s+/, skip: true },
    { type: "STRING", pattern: /"(?:[^"\\]|\\.)*"/ },
    { type: "NUMBER", pattern: /-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/ },
    { type: "TRUE", pattern: /true/ },
    { type: "FALSE", pattern: /false/ },
    { type: "NULL", pattern: /null/ },
    { type: "LBRACE", pattern: /\{/ },
    { type: "RBRACE", pattern: /\}/ },
    { type: "LBRACKET", pattern: /\[/ },
    { type: "RBRACKET", pattern: /\]/ },
    { type: "COLON", pattern: /:/ },
    { type: "COMMA", pattern: /,/ },
  ]);
}

export function createWordTokenizer(): Tokenizer {
  return new Tokenizer([
    { type: "WHITESPACE", pattern: /\s+/, skip: true },
    { type: "WORD", pattern: /[a-zA-Z_]\w*/ },
    { type: "NUMBER", pattern: /\d+(?:\.\d+)?/ },
    { type: "PUNCT", pattern: /[^\s\w]/ },
  ]);
}
