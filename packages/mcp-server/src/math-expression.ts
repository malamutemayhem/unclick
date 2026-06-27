type TokenType = "number" | "op" | "lparen" | "rparen" | "func" | "comma";

interface Token {
  type: TokenType;
  value: string;
}

function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < expr.length) {
    if (expr[i] === " ") { i++; continue; }

    if (expr[i] === "-" && i + 1 < expr.length && (/\d/.test(expr[i + 1]) || expr[i + 1] === ".") &&
        (tokens.length === 0 || tokens[tokens.length - 1].type === "op" || tokens[tokens.length - 1].type === "lparen" || tokens[tokens.length - 1].type === "comma")) {
      let num = "-";
      i++;
      while (i < expr.length && (/\d/.test(expr[i]) || expr[i] === ".")) {
        num += expr[i++];
      }
      tokens.push({ type: "number", value: num });
      continue;
    }

    if (/\d/.test(expr[i]) || (expr[i] === "." && i + 1 < expr.length && /\d/.test(expr[i + 1]))) {
      let num = "";
      while (i < expr.length && (/\d/.test(expr[i]) || expr[i] === ".")) {
        num += expr[i++];
      }
      tokens.push({ type: "number", value: num });
      continue;
    }

    if (/[a-zA-Z]/.test(expr[i])) {
      let name = "";
      while (i < expr.length && /[a-zA-Z]/.test(expr[i])) {
        name += expr[i++];
      }
      tokens.push({ type: "func", value: name });
      continue;
    }

    if ("+-*/%^".includes(expr[i])) {
      tokens.push({ type: "op", value: expr[i++] });
      continue;
    }

    if (expr[i] === "(") { tokens.push({ type: "lparen", value: "(" }); i++; continue; }
    if (expr[i] === ")") { tokens.push({ type: "rparen", value: ")" }); i++; continue; }
    if (expr[i] === ",") { tokens.push({ type: "comma", value: "," }); i++; continue; }

    throw new Error(`Unexpected character: ${expr[i]}`);
  }
  return tokens;
}

function precedence(op: string): number {
  switch (op) {
    case "+": case "-": return 1;
    case "*": case "/": case "%": return 2;
    case "^": return 3;
    default: return 0;
  }
}

function isRightAssoc(op: string): boolean {
  return op === "^";
}

function toRPN(tokens: Token[]): Token[] {
  const output: Token[] = [];
  const stack: Token[] = [];

  for (const token of tokens) {
    switch (token.type) {
      case "number":
        output.push(token);
        break;
      case "func":
        stack.push(token);
        break;
      case "comma":
        while (stack.length > 0 && stack[stack.length - 1].type !== "lparen") {
          output.push(stack.pop()!);
        }
        break;
      case "op":
        while (
          stack.length > 0 &&
          stack[stack.length - 1].type === "op" &&
          (precedence(stack[stack.length - 1].value) > precedence(token.value) ||
            (precedence(stack[stack.length - 1].value) === precedence(token.value) && !isRightAssoc(token.value)))
        ) {
          output.push(stack.pop()!);
        }
        stack.push(token);
        break;
      case "lparen":
        stack.push(token);
        break;
      case "rparen":
        while (stack.length > 0 && stack[stack.length - 1].type !== "lparen") {
          output.push(stack.pop()!);
        }
        if (stack.length > 0) stack.pop();
        if (stack.length > 0 && stack[stack.length - 1].type === "func") {
          output.push(stack.pop()!);
        }
        break;
    }
  }
  while (stack.length > 0) output.push(stack.pop()!);
  return output;
}

const BUILTINS: Record<string, (...args: number[]) => number> = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  sqrt: Math.sqrt,
  abs: Math.abs,
  log: Math.log,
  log2: Math.log2,
  log10: Math.log10,
  floor: Math.floor,
  ceil: Math.ceil,
  round: Math.round,
  exp: Math.exp,
  min: Math.min,
  max: Math.max,
  pow: Math.pow,
};

const CONSTANTS: Record<string, number> = {
  pi: Math.PI,
  e: Math.E,
  tau: Math.PI * 2,
};

export function evaluate(expr: string, variables: Record<string, number> = {}): number {
  const tokens = tokenize(expr);

  const resolved: Token[] = tokens.map(t => {
    if (t.type === "func" && (CONSTANTS[t.value.toLowerCase()] !== undefined || variables[t.value] !== undefined)) {
      const val = variables[t.value] ?? CONSTANTS[t.value.toLowerCase()];
      return { type: "number" as TokenType, value: val.toString() };
    }
    return t;
  });

  const rpn = toRPN(resolved);
  const stack: number[] = [];

  for (const token of rpn) {
    if (token.type === "number") {
      stack.push(parseFloat(token.value));
    } else if (token.type === "op") {
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
    } else if (token.type === "func") {
      const fn = BUILTINS[token.value.toLowerCase()];
      if (!fn) throw new Error(`Unknown function: ${token.value}`);
      if (token.value.toLowerCase() === "min" || token.value.toLowerCase() === "max" || token.value.toLowerCase() === "pow") {
        const b = stack.pop()!;
        const a = stack.pop()!;
        stack.push(fn(a, b));
      } else {
        const a = stack.pop()!;
        stack.push(fn(a));
      }
    }
  }

  return stack[0];
}

export function validate(expr: string): { valid: boolean; error?: string } {
  try {
    evaluate(expr);
    return { valid: true };
  } catch (e) {
    return { valid: false, error: (e as Error).message };
  }
}

export { tokenize, toRPN };
