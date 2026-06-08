type Token = { type: "number"; value: number } | { type: "op"; value: string } | { type: "paren"; value: string };

export function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < expr.length) {
    if (expr[i] === " ") { i++; continue; }
    if ("0123456789.".includes(expr[i])) {
      let num = "";
      while (i < expr.length && "0123456789.".includes(expr[i])) {
        num += expr[i++];
      }
      tokens.push({ type: "number", value: parseFloat(num) });
      continue;
    }
    if ("+-*/%^".includes(expr[i])) {
      tokens.push({ type: "op", value: expr[i++] });
      continue;
    }
    if ("()".includes(expr[i])) {
      tokens.push({ type: "paren", value: expr[i++] });
      continue;
    }
    throw new Error(`Unexpected character: ${expr[i]}`);
  }
  return tokens;
}

const PRECEDENCE: Record<string, number> = { "+": 1, "-": 1, "*": 2, "/": 2, "%": 2, "^": 3 };
const RIGHT_ASSOC = new Set(["^"]);

export function toPostfix(tokens: Token[]): Token[] {
  const output: Token[] = [];
  const ops: Token[] = [];
  for (const token of tokens) {
    if (token.type === "number") {
      output.push(token);
    } else if (token.type === "op") {
      while (ops.length > 0) {
        const top = ops[ops.length - 1];
        if (top.type !== "op") break;
        const topPrec = PRECEDENCE[top.value] ?? 0;
        const curPrec = PRECEDENCE[token.value] ?? 0;
        if (topPrec > curPrec || (topPrec === curPrec && !RIGHT_ASSOC.has(token.value))) {
          output.push(ops.pop()!);
        } else break;
      }
      ops.push(token);
    } else if (token.value === "(") {
      ops.push(token);
    } else if (token.value === ")") {
      while (ops.length > 0 && ops[ops.length - 1].value !== "(") {
        output.push(ops.pop()!);
      }
      ops.pop();
    }
  }
  while (ops.length > 0) output.push(ops.pop()!);
  return output;
}

export function evaluate(expr: string): number {
  const tokens = tokenize(expr);
  const postfix = toPostfix(tokens);
  const stack: number[] = [];
  for (const token of postfix) {
    if (token.type === "number") {
      stack.push(token.value);
    } else {
      const b = stack.pop()!;
      const a = stack.pop()!;
      switch (token.value) {
        case "+": stack.push(a + b); break;
        case "-": stack.push(a - b); break;
        case "*": stack.push(a * b); break;
        case "/": stack.push(a / b); break;
        case "%": stack.push(a % b); break;
        case "^": stack.push(Math.pow(a, b)); break;
      }
    }
  }
  return stack[0];
}
