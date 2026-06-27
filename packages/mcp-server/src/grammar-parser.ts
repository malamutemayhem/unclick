export interface Token {
  type: string;
  value: string;
  pos: number;
}

export interface GrammarRule {
  name: string;
  pattern: RegExp;
  skip?: boolean;
}

export class Lexer {
  private rules: GrammarRule[] = [];

  addRule(name: string, pattern: RegExp, skip = false): void {
    this.rules.push({ name, pattern, skip });
  }

  tokenize(input: string): Token[] {
    const tokens: Token[] = [];
    let pos = 0;

    while (pos < input.length) {
      let matched = false;
      for (const rule of this.rules) {
        const match = input.slice(pos).match(new RegExp(`^(?:${rule.pattern.source})`));
        if (match) {
          if (!rule.skip) {
            tokens.push({ type: rule.name, value: match[0], pos });
          }
          pos += match[0].length;
          matched = true;
          break;
        }
      }
      if (!matched) {
        throw new Error(`Unexpected character at position ${pos}: '${input[pos]}'`);
      }
    }

    return tokens;
  }
}

export interface ASTNode {
  type: string;
  value?: string;
  children: ASTNode[];
}

export class RecursiveDescentParser {
  private tokens: Token[] = [];
  private pos = 0;

  constructor(private lexer: Lexer) {}

  parse(input: string): ASTNode {
    this.tokens = this.lexer.tokenize(input);
    this.pos = 0;
    return this.parseExpression();
  }

  private parseExpression(): ASTNode {
    let left = this.parseTerm();
    while (this.pos < this.tokens.length && (this.peek()?.value === "+" || this.peek()?.value === "-")) {
      const op = this.advance();
      const right = this.parseTerm();
      left = { type: "BinaryOp", value: op.value, children: [left, right] };
    }
    return left;
  }

  private parseTerm(): ASTNode {
    let left = this.parseFactor();
    while (this.pos < this.tokens.length && (this.peek()?.value === "*" || this.peek()?.value === "/")) {
      const op = this.advance();
      const right = this.parseFactor();
      left = { type: "BinaryOp", value: op.value, children: [left, right] };
    }
    return left;
  }

  private parseFactor(): ASTNode {
    const token = this.peek();
    if (!token) throw new Error("Unexpected end of input");

    if (token.value === "(") {
      this.advance();
      const expr = this.parseExpression();
      if (this.peek()?.value !== ")") throw new Error("Expected closing parenthesis");
      this.advance();
      return expr;
    }

    if (token.value === "-") {
      this.advance();
      const operand = this.parseFactor();
      return { type: "UnaryOp", value: "-", children: [operand] };
    }

    if (token.type === "NUMBER") {
      this.advance();
      return { type: "Number", value: token.value, children: [] };
    }

    if (token.type === "IDENT") {
      this.advance();
      return { type: "Identifier", value: token.value, children: [] };
    }

    throw new Error(`Unexpected token: ${token.value}`);
  }

  private peek(): Token | undefined {
    return this.tokens[this.pos];
  }

  private advance(): Token {
    return this.tokens[this.pos++];
  }
}

export function evaluate(node: ASTNode, vars: Record<string, number> = {}): number {
  switch (node.type) {
    case "Number":
      return parseFloat(node.value!);
    case "Identifier":
      return vars[node.value!] ?? 0;
    case "UnaryOp":
      if (node.value === "-") return -evaluate(node.children[0], vars);
      return 0;
    case "BinaryOp": {
      const left = evaluate(node.children[0], vars);
      const right = evaluate(node.children[1], vars);
      switch (node.value) {
        case "+": return left + right;
        case "-": return left - right;
        case "*": return left * right;
        case "/": return right !== 0 ? left / right : 0;
        default: return 0;
      }
    }
    default:
      return 0;
  }
}
