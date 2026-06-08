export type Token = { type: "number"; value: number } | { type: "op"; value: string } | { type: "lparen" } | { type: "rparen" };

export class ShuntingYard {
  private static readonly PREC: Record<string, number> = {
    "+": 1, "-": 1, "*": 2, "/": 2, "^": 3,
  };

  private static readonly RIGHT_ASSOC = new Set(["^"]);

  static tokenize(expr: string): Token[] {
    const tokens: Token[] = [];
    let i = 0;
    while (i < expr.length) {
      if (expr[i] === " ") { i++; continue; }
      if (expr[i] === "(") { tokens.push({ type: "lparen" }); i++; continue; }
      if (expr[i] === ")") { tokens.push({ type: "rparen" }); i++; continue; }
      if ("+-*/^".includes(expr[i])) {
        tokens.push({ type: "op", value: expr[i] }); i++; continue;
      }
      let num = "";
      while (i < expr.length && (/[0-9.]/.test(expr[i]))) {
        num += expr[i]; i++;
      }
      if (num) tokens.push({ type: "number", value: parseFloat(num) });
    }
    return tokens;
  }

  static toPostfix(tokens: Token[]): Token[] {
    const output: Token[] = [];
    const ops: Token[] = [];

    for (const token of tokens) {
      if (token.type === "number") {
        output.push(token);
      } else if (token.type === "op") {
        while (ops.length > 0) {
          const top = ops[ops.length - 1];
          if (top.type !== "op") break;
          const topPrec = this.PREC[top.value] || 0;
          const curPrec = this.PREC[token.value] || 0;
          if (this.RIGHT_ASSOC.has(token.value)) {
            if (topPrec <= curPrec) break;
          } else {
            if (topPrec < curPrec) break;
          }
          output.push(ops.pop()!);
        }
        ops.push(token);
      } else if (token.type === "lparen") {
        ops.push(token);
      } else if (token.type === "rparen") {
        while (ops.length > 0 && ops[ops.length - 1].type !== "lparen") {
          output.push(ops.pop()!);
        }
        ops.pop();
      }
    }

    while (ops.length > 0) output.push(ops.pop()!);
    return output;
  }

  static evaluate(expr: string): number {
    const tokens = this.tokenize(expr);
    const postfix = this.toPostfix(tokens);
    return this.evalPostfix(postfix);
  }

  static evalPostfix(tokens: Token[]): number {
    const stack: number[] = [];

    for (const token of tokens) {
      if (token.type === "number") {
        stack.push(token.value);
      } else if (token.type === "op") {
        const b = stack.pop()!;
        const a = stack.pop()!;
        switch (token.value) {
          case "+": stack.push(a + b); break;
          case "-": stack.push(a - b); break;
          case "*": stack.push(a * b); break;
          case "/": stack.push(a / b); break;
          case "^": stack.push(Math.pow(a, b)); break;
        }
      }
    }

    return stack[0];
  }

  static toPostfixString(expr: string): string {
    const postfix = this.toPostfix(this.tokenize(expr));
    return postfix.map((t) => {
      if (t.type === "number") return String(t.value);
      if (t.type === "op") return t.value;
      return "";
    }).join(" ");
  }
}
