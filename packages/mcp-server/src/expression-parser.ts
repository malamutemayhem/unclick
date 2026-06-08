type Token = { type: "number"; value: number } | { type: "op"; value: string } | { type: "paren"; value: string };

function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < expr.length) {
    if (expr[i] === " ") { i++; continue; }
    if (expr[i] === "(" || expr[i] === ")") {
      tokens.push({ type: "paren", value: expr[i] });
      i++;
    } else if ("+-*/%^".includes(expr[i])) {
      tokens.push({ type: "op", value: expr[i] });
      i++;
    } else if (expr[i] >= "0" && expr[i] <= "9" || expr[i] === ".") {
      let num = "";
      while (i < expr.length && (expr[i] >= "0" && expr[i] <= "9" || expr[i] === ".")) {
        num += expr[i];
        i++;
      }
      tokens.push({ type: "number", value: parseFloat(num) });
    } else {
      throw new Error(`Unexpected character: ${expr[i]}`);
    }
  }
  return tokens;
}

const PRECEDENCE: Record<string, number> = { "+": 1, "-": 1, "*": 2, "/": 2, "%": 2, "^": 3 };
const RIGHT_ASSOC = new Set(["^"]);

function toRPN(tokens: Token[]): Token[] {
  const output: Token[] = [];
  const ops: Token[] = [];

  for (const token of tokens) {
    if (token.type === "number") {
      output.push(token);
    } else if (token.type === "op") {
      while (ops.length > 0) {
        const top = ops[ops.length - 1];
        if (
          top.type === "op" &&
          (PRECEDENCE[top.value] > PRECEDENCE[token.value] ||
            (PRECEDENCE[top.value] === PRECEDENCE[token.value] && !RIGHT_ASSOC.has(token.value)))
        ) {
          output.push(ops.pop()!);
        } else {
          break;
        }
      }
      ops.push(token);
    } else if (token.value === "(") {
      ops.push(token);
    } else if (token.value === ")") {
      while (ops.length > 0 && ops[ops.length - 1].value !== "(") {
        output.push(ops.pop()!);
      }
      if (ops.length === 0) throw new Error("Mismatched parentheses");
      ops.pop();
    }
  }

  while (ops.length > 0) {
    const op = ops.pop()!;
    if (op.value === "(") throw new Error("Mismatched parentheses");
    output.push(op);
  }

  return output;
}

function evalRPN(rpn: Token[]): number {
  const stack: number[] = [];
  for (const token of rpn) {
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

export function evaluate(expr: string): number {
  const tokens = tokenize(expr);
  const rpn = toRPN(tokens);
  return evalRPN(rpn);
}

export { tokenize, toRPN };
