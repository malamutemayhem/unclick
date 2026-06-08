export type Token =
  | { type: "number"; value: number }
  | { type: "ident"; value: string }
  | { type: "op"; value: string }
  | { type: "lparen" }
  | { type: "rparen" }
  | { type: "eof" };

export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < input.length) {
    const ch = input[i];
    if (ch === " " || ch === "\t" || ch === "\n" || ch === "\r") {
      i++;
    } else if (ch === "(") {
      tokens.push({ type: "lparen" });
      i++;
    } else if (ch === ")") {
      tokens.push({ type: "rparen" });
      i++;
    } else if (ch >= "0" && ch <= "9") {
      let num = "";
      while (i < input.length && ((input[i] >= "0" && input[i] <= "9") || input[i] === ".")) {
        num += input[i];
        i++;
      }
      tokens.push({ type: "number", value: Number(num) });
    } else if ((ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z") || ch === "_") {
      let name = "";
      while (
        i < input.length &&
        ((input[i] >= "a" && input[i] <= "z") ||
          (input[i] >= "A" && input[i] <= "Z") ||
          (input[i] >= "0" && input[i] <= "9") ||
          input[i] === "_")
      ) {
        name += input[i];
        i++;
      }
      tokens.push({ type: "ident", value: name });
    } else {
      tokens.push({ type: "op", value: ch });
      i++;
    }
  }
  tokens.push({ type: "eof" });
  return tokens;
}

export type ASTNode =
  | { kind: "number"; value: number }
  | { kind: "ident"; name: string }
  | { kind: "unary"; op: string; operand: ASTNode }
  | { kind: "binary"; op: string; left: ASTNode; right: ASTNode }
  | { kind: "call"; name: string; args: ASTNode[] };

export interface PrecedenceTable {
  prefix: Map<string, number>;
  infix: Map<string, [number, "left" | "right"]>;
}

export function defaultPrecedence(): PrecedenceTable {
  return {
    prefix: new Map([
      ["-", 70],
      ["+", 70],
      ["!", 70],
    ]),
    infix: new Map([
      ["+", [10, "left"]],
      ["-", [10, "left"]],
      ["*", [20, "left"]],
      ["/", [20, "left"]],
      ["%", [20, "left"]],
      ["^", [30, "right"]],
    ]),
  };
}

export class Parser {
  private tokens: Token[];
  private pos = 0;
  private table: PrecedenceTable;

  constructor(tokens: Token[], table?: PrecedenceTable) {
    this.tokens = tokens;
    this.table = table ?? defaultPrecedence();
  }

  private peek(): Token {
    return this.tokens[this.pos];
  }

  private advance(): Token {
    return this.tokens[this.pos++];
  }

  private expect(type: string): Token {
    const t = this.advance();
    if (t.type !== type) {
      throw new Error(`Expected ${type} but got ${t.type}`);
    }
    return t;
  }

  parseExpression(minBp = 0): ASTNode {
    let left = this.parsePrefix();

    while (true) {
      const tok = this.peek();
      if (tok.type === "eof" || tok.type === "rparen") break;
      if (tok.type !== "op") break;

      const entry = this.table.infix.get(tok.value);
      if (!entry) break;

      const [bp, assoc] = entry;
      if (bp < minBp) break;

      this.advance();
      const nextBp = assoc === "left" ? bp + 1 : bp;
      const right = this.parseExpression(nextBp);
      left = { kind: "binary", op: tok.value, left, right };
    }

    return left;
  }

  private parsePrefix(): ASTNode {
    const tok = this.peek();

    if (tok.type === "number") {
      this.advance();
      return { kind: "number", value: tok.value };
    }

    if (tok.type === "ident") {
      this.advance();
      if (this.peek().type === "lparen") {
        this.advance();
        const args: ASTNode[] = [];
        if (this.peek().type !== "rparen") {
          args.push(this.parseExpression());
          while (this.peek().type === "op" && (this.peek() as { type: "op"; value: string }).value === ",") {
            this.advance();
            args.push(this.parseExpression());
          }
        }
        this.expect("rparen");
        return { kind: "call", name: tok.value, args };
      }
      return { kind: "ident", name: tok.value };
    }

    if (tok.type === "lparen") {
      this.advance();
      const expr = this.parseExpression();
      this.expect("rparen");
      return expr;
    }

    if (tok.type === "op") {
      const bp = this.table.prefix.get(tok.value);
      if (bp !== undefined) {
        this.advance();
        const operand = this.parseExpression(bp);
        return { kind: "unary", op: tok.value, operand };
      }
    }

    throw new Error(`Unexpected token: ${tok.type}`);
  }
}

export function parse(input: string, table?: PrecedenceTable): ASTNode {
  const tokens = tokenize(input);
  const parser = new Parser(tokens, table);
  return parser.parseExpression();
}

export function evaluate(node: ASTNode, vars?: Map<string, number>, fns?: Map<string, (...args: number[]) => number>): number {
  switch (node.kind) {
    case "number":
      return node.value;
    case "ident": {
      const v = vars?.get(node.name);
      if (v === undefined) throw new Error(`Undefined variable: ${node.name}`);
      return v;
    }
    case "unary":
      switch (node.op) {
        case "-": return -evaluate(node.operand, vars, fns);
        case "+": return +evaluate(node.operand, vars, fns);
        case "!": return evaluate(node.operand, vars, fns) === 0 ? 1 : 0;
        default: throw new Error(`Unknown unary op: ${node.op}`);
      }
    case "binary": {
      const l = evaluate(node.left, vars, fns);
      const r = evaluate(node.right, vars, fns);
      switch (node.op) {
        case "+": return l + r;
        case "-": return l - r;
        case "*": return l * r;
        case "/": return l / r;
        case "%": return l % r;
        case "^": return Math.pow(l, r);
        default: throw new Error(`Unknown binary op: ${node.op}`);
      }
    }
    case "call": {
      const fn = fns?.get(node.name);
      if (!fn) throw new Error(`Undefined function: ${node.name}`);
      const args = node.args.map((a) => evaluate(a, vars, fns));
      return fn(...args);
    }
  }
}

export function astToString(node: ASTNode): string {
  switch (node.kind) {
    case "number": return String(node.value);
    case "ident": return node.name;
    case "unary": return `(${node.op}${astToString(node.operand)})`;
    case "binary": return `(${astToString(node.left)} ${node.op} ${astToString(node.right)})`;
    case "call": return `${node.name}(${node.args.map(astToString).join(", ")})`;
  }
}
