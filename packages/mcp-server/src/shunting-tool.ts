import { stampMeta, ConnectorMeta } from "./connector-meta.js";

const PRECEDENCE: Record<string, number> = {
  "+": 2,
  "-": 2,
  "*": 3,
  "/": 3,
  "^": 4,
};

const RIGHT_ASSOC = new Set(["^"]);

function tokenize(expr: string): string[] {
  const tokens: string[] = [];
  let i = 0;
  while (i < expr.length) {
    const ch = expr[i];
    if (ch === " ") {
      i++;
      continue;
    }
    if (ch === "(" || ch === ")") {
      tokens.push(ch);
      i++;
      continue;
    }
    if (ch in PRECEDENCE) {
      // Handle unary minus: at start, after '(' or after an operator
      if (
        ch === "-" &&
        (tokens.length === 0 ||
          tokens[tokens.length - 1] === "(" ||
          tokens[tokens.length - 1] in PRECEDENCE)
      ) {
        let num = "-";
        i++;
        while (i < expr.length && (isDigitOrDot(expr[i]))) {
          num += expr[i];
          i++;
        }
        if (num === "-") {
          throw new Error("Invalid expression: lone minus sign");
        }
        tokens.push(num);
        continue;
      }
      tokens.push(ch);
      i++;
      continue;
    }
    if (isDigitOrDot(ch)) {
      let num = "";
      while (i < expr.length && isDigitOrDot(expr[i])) {
        num += expr[i];
        i++;
      }
      tokens.push(num);
      continue;
    }
    throw new Error(`Unexpected character: '${ch}'`);
  }
  return tokens;
}

function isDigitOrDot(ch: string): boolean {
  return (ch >= "0" && ch <= "9") || ch === ".";
}

function shuntingYardParse(tokens: string[]): string[] {
  const output: string[] = [];
  const ops: string[] = [];

  for (const token of tokens) {
    if (token in PRECEDENCE) {
      while (
        ops.length > 0 &&
        ops[ops.length - 1] !== "(" &&
        ops[ops.length - 1] in PRECEDENCE &&
        ((!RIGHT_ASSOC.has(token) &&
          PRECEDENCE[token] <= PRECEDENCE[ops[ops.length - 1]]) ||
          (RIGHT_ASSOC.has(token) &&
            PRECEDENCE[token] < PRECEDENCE[ops[ops.length - 1]]))
      ) {
        output.push(ops.pop()!);
      }
      ops.push(token);
    } else if (token === "(") {
      ops.push(token);
    } else if (token === ")") {
      while (ops.length > 0 && ops[ops.length - 1] !== "(") {
        output.push(ops.pop()!);
      }
      if (ops.length === 0) {
        throw new Error("Mismatched parentheses: extra closing paren");
      }
      ops.pop(); // remove the '('
    } else {
      // number
      output.push(token);
    }
  }

  while (ops.length > 0) {
    const op = ops.pop()!;
    if (op === "(") {
      throw new Error("Mismatched parentheses: extra opening paren");
    }
    output.push(op);
  }

  return output;
}

function evaluateRPN(postfix: string[]): number {
  const stack: number[] = [];

  for (const token of postfix) {
    if (token in PRECEDENCE) {
      if (stack.length < 2) {
        throw new Error("Invalid expression: not enough operands");
      }
      const b = stack.pop()!;
      const a = stack.pop()!;
      switch (token) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          if (b === 0) throw new Error("Division by zero");
          stack.push(a / b);
          break;
        case "^":
          stack.push(Math.pow(a, b));
          break;
      }
    } else {
      const num = parseFloat(token);
      if (isNaN(num)) {
        throw new Error(`Invalid token: '${token}'`);
      }
      stack.push(num);
    }
  }

  if (stack.length !== 1) {
    throw new Error("Invalid expression: too many operands");
  }

  return stack[0];
}

export async function shuntingYard(args: Record<string, unknown>) {
  const expression = args.expression as string;

  if (typeof expression !== "string" || expression.trim().length === 0) {
    throw new Error("expression must be a non-empty string");
  }
  if (expression.length > 10_000) {
    throw new Error("expression must not exceed 10,000 characters");
  }

  const tokens = tokenize(expression);
  const postfix = shuntingYardParse(tokens);
  const result = evaluateRPN(postfix);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Use postfix notation for stack-based evaluation",
      "Combine with expression tree construction for symbolic math",
    ],
  };

  return stampMeta(
    {
      expression,
      postfix: postfix.join(" "),
      result,
      tokens: postfix,
    },
    meta,
  );
}
