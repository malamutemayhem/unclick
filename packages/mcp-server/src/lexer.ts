export interface Token {
  type: string;
  value: string;
  line: number;
  col: number;
}

export interface LexRule {
  type: string;
  pattern: RegExp;
  skip?: boolean;
}

export class Lexer {
  private rules: LexRule[] = [];

  addRule(type: string, pattern: RegExp, skip = false): void {
    const flags = pattern.flags.includes("y") ? pattern.flags : pattern.flags + "y";
    this.rules.push({ type, pattern: new RegExp(pattern.source, flags), skip });
  }

  tokenize(input: string): Token[] {
    const tokens: Token[] = [];
    let pos = 0;
    let line = 1;
    let col = 1;

    while (pos < input.length) {
      let matched = false;

      for (const rule of this.rules) {
        rule.pattern.lastIndex = pos;
        const m = rule.pattern.exec(input);
        if (m && m.index === pos) {
          if (!rule.skip) {
            tokens.push({ type: rule.type, value: m[0], line, col });
          }
          for (const ch of m[0]) {
            if (ch === "\n") {
              line++;
              col = 1;
            } else {
              col++;
            }
          }
          pos += m[0].length;
          matched = true;
          break;
        }
      }

      if (!matched) {
        throw new Error(`Unexpected character '${input[pos]}' at line ${line}, col ${col}`);
      }
    }

    return tokens;
  }

  static createSimple(): Lexer {
    const lex = new Lexer();
    lex.addRule("NUMBER", /\d+(\.\d+)?/);
    lex.addRule("STRING", /"[^"]*"/);
    lex.addRule("IDENT", /[a-zA-Z_]\w*/);
    lex.addRule("OP", /[+\-*/=<>!&|^~%]+/);
    lex.addRule("LPAREN", /\(/);
    lex.addRule("RPAREN", /\)/);
    lex.addRule("LBRACE", /\{/);
    lex.addRule("RBRACE", /\}/);
    lex.addRule("LBRACKET", /\[/);
    lex.addRule("RBRACKET", /\]/);
    lex.addRule("SEMI", /;/);
    lex.addRule("COMMA", /,/);
    lex.addRule("DOT", /\./);
    lex.addRule("COLON", /:/);
    lex.addRule("WS", /\s+/, true);
    return lex;
  }
}

export class TokenStream {
  private tokens: Token[];
  private pos = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  peek(): Token | null {
    return this.pos < this.tokens.length ? this.tokens[this.pos] : null;
  }

  next(): Token | null {
    return this.pos < this.tokens.length ? this.tokens[this.pos++] : null;
  }

  expect(type: string): Token {
    const tok = this.next();
    if (!tok || tok.type !== type) {
      throw new Error(`Expected ${type}, got ${tok ? tok.type : "EOF"}`);
    }
    return tok;
  }

  match(type: string): Token | null {
    const tok = this.peek();
    if (tok && tok.type === type) {
      this.pos++;
      return tok;
    }
    return null;
  }

  get done(): boolean {
    return this.pos >= this.tokens.length;
  }

  get position(): number {
    return this.pos;
  }

  get remaining(): number {
    return this.tokens.length - this.pos;
  }
}
