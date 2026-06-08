type Token = { type: string; value: string | number };

function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < expr.length) {
    if (expr[i] === " ") { i++; continue; }

    if (/[0-9.]/.test(expr[i])) {
      let num = "";
      while (i < expr.length && /[0-9.]/.test(expr[i])) num += expr[i++];
      tokens.push({ type: "number", value: parseFloat(num) });
      continue;
    }

    if (/[a-zA-Z_]/.test(expr[i])) {
      let id = "";
      while (i < expr.length && /[a-zA-Z0-9_]/.test(expr[i])) id += expr[i++];
      tokens.push({ type: "ident", value: id });
      continue;
    }

    if ("+-*/%^".includes(expr[i])) {
      tokens.push({ type: "op", value: expr[i] });
      i++;
      continue;
    }

    if (expr[i] === "(") { tokens.push({ type: "lparen", value: "(" }); i++; continue; }
    if (expr[i] === ")") { tokens.push({ type: "rparen", value: ")" }); i++; continue; }
    if (expr[i] === ",") { tokens.push({ type: "comma", value: "," }); i++; continue; }

    throw new Error(`Unexpected character: ${expr[i]}`);
  }
  return tokens;
}

const PRECEDENCE: Record<string, number> = { "+": 1, "-": 1, "*": 2, "/": 2, "%": 2, "^": 3 };
const RIGHT_ASSOC = new Set(["^"]);

function parse(tokens: Token[]): ASTNode {
  let pos = 0;

  function parseExpr(minPrec = 0): ASTNode {
    let left = parseUnary();

    while (pos < tokens.length && tokens[pos].type === "op") {
      const op = tokens[pos].value as string;
      const prec = PRECEDENCE[op] || 0;
      if (prec < minPrec) break;
      pos++;
      const nextPrec = RIGHT_ASSOC.has(op) ? prec : prec + 1;
      const right = parseExpr(nextPrec);
      left = { type: "binary", op, left, right };
    }
    return left;
  }

  function parseUnary(): ASTNode {
    if (pos < tokens.length && tokens[pos].type === "op" && tokens[pos].value === "-") {
      pos++;
      return { type: "unary", op: "-", operand: parseUnary() };
    }
    return parsePrimary();
  }

  function parsePrimary(): ASTNode {
    const tok = tokens[pos];
    if (!tok) throw new Error("Unexpected end of expression");

    if (tok.type === "number") {
      pos++;
      return { type: "literal", value: tok.value as number };
    }

    if (tok.type === "ident") {
      pos++;
      if (pos < tokens.length && tokens[pos].type === "lparen") {
        pos++;
        const args: ASTNode[] = [];
        while (pos < tokens.length && tokens[pos].type !== "rparen") {
          args.push(parseExpr());
          if (pos < tokens.length && tokens[pos].type === "comma") pos++;
        }
        if (pos < tokens.length) pos++;
        return { type: "call", name: tok.value as string, args };
      }
      return { type: "variable", name: tok.value as string };
    }

    if (tok.type === "lparen") {
      pos++;
      const node = parseExpr();
      if (pos < tokens.length && tokens[pos].type === "rparen") pos++;
      return node;
    }

    throw new Error(`Unexpected token: ${JSON.stringify(tok)}`);
  }

  return parseExpr();
}

type ASTNode =
  | { type: "literal"; value: number }
  | { type: "variable"; name: string }
  | { type: "binary"; op: string; left: ASTNode; right: ASTNode }
  | { type: "unary"; op: string; operand: ASTNode }
  | { type: "call"; name: string; args: ASTNode[] };

const BUILTINS: Record<string, (...args: number[]) => number> = {
  abs: Math.abs,
  ceil: Math.ceil,
  floor: Math.floor,
  round: Math.round,
  sqrt: Math.sqrt,
  min: Math.min,
  max: Math.max,
  pow: Math.pow,
  log: Math.log,
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
};

function evalNode(node: ASTNode, vars: Record<string, number>): number {
  switch (node.type) {
    case "literal": return node.value;
    case "variable": {
      if (node.name === "PI") return Math.PI;
      if (node.name === "E") return Math.E;
      if (node.name in vars) return vars[node.name];
      throw new Error(`Unknown variable: ${node.name}`);
    }
    case "unary": return -evalNode(node.operand, vars);
    case "binary": {
      const l = evalNode(node.left, vars);
      const r = evalNode(node.right, vars);
      switch (node.op) {
        case "+": return l + r;
        case "-": return l - r;
        case "*": return l * r;
        case "/": return l / r;
        case "%": return l % r;
        case "^": return Math.pow(l, r);
        default: throw new Error(`Unknown operator: ${node.op}`);
      }
    }
    case "call": {
      const fn = BUILTINS[node.name];
      if (!fn) throw new Error(`Unknown function: ${node.name}`);
      return fn(...node.args.map((a) => evalNode(a, vars)));
    }
  }
}

export function evaluate(expression: string, variables: Record<string, number> = {}): number {
  const tokens = tokenize(expression);
  const ast = parse(tokens);
  return evalNode(ast, variables);
}

export function compile(expression: string): (variables?: Record<string, number>) => number {
  const tokens = tokenize(expression);
  const ast = parse(tokens);
  return (variables = {}) => evalNode(ast, variables);
}
