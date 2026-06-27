type Operator = "+" | "-" | "*" | "/" | "%" | "**";

interface NumberNode { type: "number"; value: number }
interface BinaryNode { type: "binary"; op: Operator; left: ASTNode; right: ASTNode }
interface UnaryNode { type: "unary"; op: "-"; operand: ASTNode }
interface FuncNode { type: "func"; name: string; args: ASTNode[] }
interface VarNode { type: "var"; name: string }
type ASTNode = NumberNode | BinaryNode | UnaryNode | FuncNode | VarNode;

const SAFE_FUNCS: Record<string, (...args: number[]) => number> = {
  abs: Math.abs,
  ceil: Math.ceil,
  floor: Math.floor,
  round: Math.round,
  sqrt: Math.sqrt,
  min: Math.min,
  max: Math.max,
  pow: Math.pow,
  log: Math.log,
  log2: Math.log2,
  log10: Math.log10,
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
};

export function evaluate(expr: string, vars: Record<string, number> = {}): number {
  const tokens = tokenize(expr);
  const ast = parseExpr(tokens, 0);
  if (ast.pos !== tokens.length) throw new Error("Unexpected token");
  return evalNode(ast.node, vars);
}

function evalNode(node: ASTNode, vars: Record<string, number>): number {
  switch (node.type) {
    case "number": return node.value;
    case "var": {
      if (!(node.name in vars)) throw new Error(`Unknown variable: ${node.name}`);
      return vars[node.name];
    }
    case "unary": return -evalNode(node.operand, vars);
    case "binary": {
      const l = evalNode(node.left, vars);
      const r = evalNode(node.right, vars);
      switch (node.op) {
        case "+": return l + r;
        case "-": return l - r;
        case "*": return l * r;
        case "/": if (r === 0) throw new Error("Division by zero"); return l / r;
        case "%": return l % r;
        case "**": return l ** r;
      }
      break;
    }
    case "func": {
      const fn = SAFE_FUNCS[node.name];
      if (!fn) throw new Error(`Unknown function: ${node.name}`);
      const args = node.args.map((a) => evalNode(a, vars));
      return fn(...args);
    }
  }
  throw new Error("Invalid node");
}

type Token = { type: "number"; value: number } | { type: "op"; value: string } | { type: "paren"; value: string } | { type: "ident"; value: string } | { type: "comma"; value: "," };

function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < expr.length) {
    if (/\s/.test(expr[i])) { i++; continue; }
    if (/\d/.test(expr[i]) || (expr[i] === "." && i + 1 < expr.length && /\d/.test(expr[i + 1]))) {
      let num = "";
      while (i < expr.length && (/\d/.test(expr[i]) || expr[i] === ".")) { num += expr[i++]; }
      tokens.push({ type: "number", value: parseFloat(num) });
    } else if (/[a-zA-Z_]/.test(expr[i])) {
      let name = "";
      while (i < expr.length && /[a-zA-Z0-9_]/.test(expr[i])) { name += expr[i++]; }
      tokens.push({ type: "ident", value: name });
    } else if ("+-*/%".includes(expr[i])) {
      if (expr[i] === "*" && i + 1 < expr.length && expr[i + 1] === "*") {
        tokens.push({ type: "op", value: "**" }); i += 2;
      } else {
        tokens.push({ type: "op", value: expr[i++] });
      }
    } else if ("()".includes(expr[i])) {
      tokens.push({ type: "paren", value: expr[i++] });
    } else if (expr[i] === ",") {
      tokens.push({ type: "comma", value: "," }); i++;
    } else {
      throw new Error(`Unexpected character: ${expr[i]}`);
    }
  }
  return tokens;
}

function parseExpr(tokens: Token[], pos: number): { node: ASTNode; pos: number } {
  return parseAddSub(tokens, pos);
}

function parseAddSub(tokens: Token[], pos: number): { node: ASTNode; pos: number } {
  let result = parseMulDiv(tokens, pos);
  while (result.pos < tokens.length && tokens[result.pos].type === "op" && (tokens[result.pos].value === "+" || tokens[result.pos].value === "-")) {
    const op = tokens[result.pos].value as Operator;
    const right = parseMulDiv(tokens, result.pos + 1);
    result = { node: { type: "binary", op, left: result.node, right: right.node }, pos: right.pos };
  }
  return result;
}

function parseMulDiv(tokens: Token[], pos: number): { node: ASTNode; pos: number } {
  let result = parsePower(tokens, pos);
  while (result.pos < tokens.length && tokens[result.pos].type === "op" && ("*/%".includes(tokens[result.pos].value as string))) {
    const op = tokens[result.pos].value as Operator;
    const right = parsePower(tokens, result.pos + 1);
    result = { node: { type: "binary", op, left: result.node, right: right.node }, pos: right.pos };
  }
  return result;
}

function parsePower(tokens: Token[], pos: number): { node: ASTNode; pos: number } {
  let result = parseUnary(tokens, pos);
  if (result.pos < tokens.length && tokens[result.pos].type === "op" && tokens[result.pos].value === "**") {
    const right = parsePower(tokens, result.pos + 1);
    result = { node: { type: "binary", op: "**", left: result.node, right: right.node }, pos: right.pos };
  }
  return result;
}

function parseUnary(tokens: Token[], pos: number): { node: ASTNode; pos: number } {
  if (pos < tokens.length && tokens[pos].type === "op" && tokens[pos].value === "-") {
    const operand = parseAtom(tokens, pos + 1);
    return { node: { type: "unary", op: "-", operand: operand.node }, pos: operand.pos };
  }
  return parseAtom(tokens, pos);
}

function parseAtom(tokens: Token[], pos: number): { node: ASTNode; pos: number } {
  if (pos >= tokens.length) throw new Error("Unexpected end of expression");
  const t = tokens[pos];
  if (t.type === "number") return { node: { type: "number", value: t.value }, pos: pos + 1 };
  if (t.type === "ident") {
    if (pos + 1 < tokens.length && tokens[pos + 1].type === "paren" && tokens[pos + 1].value === "(") {
      const args: ASTNode[] = [];
      let p = pos + 2;
      if (p < tokens.length && !(tokens[p].type === "paren" && tokens[p].value === ")")) {
        const arg = parseExpr(tokens, p);
        args.push(arg.node);
        p = arg.pos;
        while (p < tokens.length && tokens[p].type === "comma") {
          const next = parseExpr(tokens, p + 1);
          args.push(next.node);
          p = next.pos;
        }
      }
      if (p >= tokens.length || tokens[p].value !== ")") throw new Error("Expected )");
      return { node: { type: "func", name: t.value, args }, pos: p + 1 };
    }
    return { node: { type: "var", name: t.value }, pos: pos + 1 };
  }
  if (t.type === "paren" && t.value === "(") {
    const inner = parseExpr(tokens, pos + 1);
    if (inner.pos >= tokens.length || tokens[inner.pos].value !== ")") throw new Error("Expected )");
    return { node: inner.node, pos: inner.pos + 1 };
  }
  throw new Error(`Unexpected token: ${JSON.stringify(t)}`);
}
