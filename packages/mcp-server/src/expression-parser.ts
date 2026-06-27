type Token = { type: "number"; value: number }
  | { type: "op"; value: string }
  | { type: "paren"; value: string }
  | { type: "ident"; value: string };

function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < expr.length) {
    if (expr[i] === " ") { i++; continue; }
    if ("0123456789.".includes(expr[i])) {
      let num = "";
      while (i < expr.length && "0123456789.".includes(expr[i])) { num += expr[i++]; }
      tokens.push({ type: "number", value: parseFloat(num) });
    } else if ("+-*/%^".includes(expr[i])) {
      tokens.push({ type: "op", value: expr[i++] });
    } else if ("()".includes(expr[i])) {
      tokens.push({ type: "paren", value: expr[i++] });
    } else if (/[a-zA-Z_]/.test(expr[i])) {
      let ident = "";
      while (i < expr.length && /[a-zA-Z0-9_]/.test(expr[i])) { ident += expr[i++]; }
      tokens.push({ type: "ident", value: ident });
    } else {
      throw new Error("Unexpected character: " + expr[i]);
    }
  }
  return tokens;
}

const PRECEDENCE: Record<string, number> = { "+": 1, "-": 1, "*": 2, "/": 2, "%": 2, "^": 3 };
const RIGHT_ASSOC = new Set(["^"]);

const FUNCTIONS: Record<string, (n: number) => number> = {
  abs: Math.abs,
  sqrt: Math.sqrt,
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  floor: Math.floor,
  ceil: Math.ceil,
  round: Math.round,
  log: Math.log,
  ln: Math.log,
  log2: Math.log2,
  log10: Math.log10,
  exp: Math.exp,
};

export function evaluate(expr: string, vars: Record<string, number> = {}): number {
  const tokens = tokenize(expr);
  let pos = 0;

  function parseExpr(minPrec = 0): number {
    let left = parseAtom();
    while (pos < tokens.length && tokens[pos].type === "op") {
      const op = tokens[pos].value as string;
      const prec = PRECEDENCE[op];
      if (prec === undefined || prec < minPrec) break;
      pos++;
      const nextMin = RIGHT_ASSOC.has(op) ? prec : prec + 1;
      const right = parseExpr(nextMin);
      left = applyOp(op, left, right);
    }
    return left;
  }

  function parseAtom(): number {
    const tok = tokens[pos];
    if (!tok) throw new Error("Unexpected end of expression");
    if (tok.type === "number") { pos++; return tok.value; }
    if (tok.type === "paren" && tok.value === "(") {
      pos++;
      const val = parseExpr();
      if (!tokens[pos] || tokens[pos].value !== ")") throw new Error("Missing closing paren");
      pos++;
      return val;
    }
    if (tok.type === "op" && tok.value === "-") {
      pos++;
      return -parseAtom();
    }
    if (tok.type === "op" && tok.value === "+") {
      pos++;
      return parseAtom();
    }
    if (tok.type === "ident") {
      const name = tok.value;
      pos++;
      if (pos < tokens.length && tokens[pos].type === "paren" && tokens[pos].value === "(") {
        const fn = FUNCTIONS[name];
        if (!fn) throw new Error("Unknown function: " + name);
        pos++;
        const arg = parseExpr();
        if (!tokens[pos] || tokens[pos].value !== ")") throw new Error("Missing closing paren");
        pos++;
        return fn(arg);
      }
      if (name in vars) return vars[name];
      throw new Error("Unknown variable: " + name);
    }
    throw new Error("Unexpected token: " + JSON.stringify(tok));
  }

  const result = parseExpr();
  if (pos < tokens.length) throw new Error("Unexpected token after expression");
  return result;
}

function applyOp(op: string, a: number, b: number): number {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return a / b;
    case "%": return a % b;
    case "^": return Math.pow(a, b);
    default: throw new Error("Unknown op: " + op);
  }
}
