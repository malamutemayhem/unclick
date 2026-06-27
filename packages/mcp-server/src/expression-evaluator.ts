type TokenType = "number" | "operator" | "paren" | "function" | "variable";

interface Token {
  type: TokenType;
  value: string;
}

function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < expr.length) {
    if (expr[i] === " ") { i++; continue; }

    if (/[0-9.]/.test(expr[i])) {
      let num = "";
      while (i < expr.length && /[0-9.]/.test(expr[i])) {
        num += expr[i++];
      }
      tokens.push({ type: "number", value: num });
      continue;
    }

    if (/[a-zA-Z_]/.test(expr[i])) {
      let name = "";
      while (i < expr.length && /[a-zA-Z0-9_]/.test(expr[i])) {
        name += expr[i++];
      }
      if (i < expr.length && expr[i] === "(") {
        tokens.push({ type: "function", value: name });
      } else {
        tokens.push({ type: "variable", value: name });
      }
      continue;
    }

    if ("+-*/%^".includes(expr[i])) {
      tokens.push({ type: "operator", value: expr[i++] });
      continue;
    }

    if ("()".includes(expr[i])) {
      tokens.push({ type: "paren", value: expr[i++] });
      continue;
    }

    if (expr[i] === ",") { i++; continue; }

    throw new Error(`Unexpected character: ${expr[i]}`);
  }
  return tokens;
}

const PRECEDENCE: Record<string, number> = { "+": 1, "-": 1, "*": 2, "/": 2, "%": 2, "^": 3 };
const RIGHT_ASSOC = new Set(["^"]);

const BUILTINS: Record<string, (...args: number[]) => number> = {
  abs: Math.abs,
  sqrt: Math.sqrt,
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  log: Math.log,
  log2: Math.log2,
  log10: Math.log10,
  ceil: Math.ceil,
  floor: Math.floor,
  round: Math.round,
  min: Math.min,
  max: Math.max,
  pow: Math.pow,
  exp: Math.exp,
};

const CONSTANTS: Record<string, number> = {
  PI: Math.PI,
  E: Math.E,
  TAU: Math.PI * 2,
};

export function evaluate(
  expr: string,
  variables: Record<string, number> = {},
  functions: Record<string, (...args: number[]) => number> = {},
): number {
  const tokens = tokenize(expr);
  const allFns = { ...BUILTINS, ...functions };
  const allVars = { ...CONSTANTS, ...variables };

  let pos = 0;

  function parseExpression(minPrec = 0): number {
    let left = parseUnary();

    while (pos < tokens.length && tokens[pos].type === "operator") {
      const op = tokens[pos].value;
      const prec = PRECEDENCE[op] ?? 0;
      if (prec < minPrec) break;

      pos++;
      const nextPrec = RIGHT_ASSOC.has(op) ? prec : prec + 1;
      const right = parseExpression(nextPrec);

      switch (op) {
        case "+": left = left + right; break;
        case "-": left = left - right; break;
        case "*": left = left * right; break;
        case "/": left = left / right; break;
        case "%": left = left % right; break;
        case "^": left = Math.pow(left, right); break;
      }
    }

    return left;
  }

  function parseUnary(): number {
    if (pos < tokens.length && tokens[pos].type === "operator" && tokens[pos].value === "-") {
      pos++;
      return -parseUnary();
    }
    if (pos < tokens.length && tokens[pos].type === "operator" && tokens[pos].value === "+") {
      pos++;
      return parseUnary();
    }
    return parsePrimary();
  }

  function parsePrimary(): number {
    const token = tokens[pos];

    if (token.type === "number") {
      pos++;
      return parseFloat(token.value);
    }

    if (token.type === "function") {
      const name = token.value;
      pos++;
      if (tokens[pos]?.value !== "(") throw new Error("Expected ( after function");
      pos++;
      const args: number[] = [];
      while (tokens[pos]?.value !== ")") {
        args.push(parseExpression());
        if (tokens[pos]?.value === ",") pos++;
      }
      pos++;
      const fn = allFns[name];
      if (!fn) throw new Error(`Unknown function: ${name}`);
      return fn(...args);
    }

    if (token.type === "variable") {
      pos++;
      const val = allVars[token.value];
      if (val === undefined) throw new Error(`Unknown variable: ${token.value}`);
      return val;
    }

    if (token.type === "paren" && token.value === "(") {
      pos++;
      const result = parseExpression();
      if (tokens[pos]?.value !== ")") throw new Error("Missing closing parenthesis");
      pos++;
      return result;
    }

    throw new Error(`Unexpected token: ${token.value}`);
  }

  const result = parseExpression();
  if (pos < tokens.length) throw new Error(`Unexpected token: ${tokens[pos].value}`);
  return result;
}

export function validate(expr: string): { valid: boolean; error?: string } {
  try {
    evaluate(expr);
    return { valid: true };
  } catch (e) {
    return { valid: false, error: (e as Error).message };
  }
}
