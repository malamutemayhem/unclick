type Operator = "+" | "-" | "*" | "/" | "%" | "**";

interface NumberNode { type: "number"; value: number; }
interface BinaryNode { type: "binary"; op: Operator; left: ASTNode; right: ASTNode; }
interface UnaryNode { type: "unary"; op: "-"; operand: ASTNode; }
interface VarNode { type: "var"; name: string; }
type ASTNode = NumberNode | BinaryNode | UnaryNode | VarNode;

export function evaluate(expr: string, vars?: Record<string, number>): number {
  const tokens = tokenize(expr);
  const ast = parseExpression(tokens, 0);
  return evalNode(ast.node, vars ?? {});
}

function evalNode(node: ASTNode, vars: Record<string, number>): number {
  if (node.type === "number") return node.value;
  if (node.type === "var") {
    if (!(node.name in vars)) throw new Error(`Undefined variable: ${node.name}`);
    return vars[node.name];
  }
  if (node.type === "unary") return -evalNode(node.operand, vars);
  const left = evalNode(node.left, vars);
  const right = evalNode(node.right, vars);
  switch (node.op) {
    case "+": return left + right;
    case "-": return left - right;
    case "*": return left * right;
    case "/": if (right === 0) throw new Error("Division by zero"); return left / right;
    case "%": return left % right;
    case "**": return left ** right;
  }
}

type Token = { type: "number"; value: number } | { type: "op"; value: string } | { type: "paren"; value: string } | { type: "var"; value: string };

function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < expr.length) {
    if (/\s/.test(expr[i])) { i++; continue; }
    if (/\d/.test(expr[i]) || (expr[i] === "." && i + 1 < expr.length && /\d/.test(expr[i + 1]))) {
      let num = "";
      while (i < expr.length && (/\d/.test(expr[i]) || expr[i] === ".")) { num += expr[i]; i++; }
      tokens.push({ type: "number", value: parseFloat(num) });
      continue;
    }
    if (expr[i] === "*" && expr[i + 1] === "*") { tokens.push({ type: "op", value: "**" }); i += 2; continue; }
    if ("+-*/%".includes(expr[i])) { tokens.push({ type: "op", value: expr[i] }); i++; continue; }
    if ("()".includes(expr[i])) { tokens.push({ type: "paren", value: expr[i] }); i++; continue; }
    if (/[a-zA-Z_]/.test(expr[i])) {
      let name = "";
      while (i < expr.length && /[a-zA-Z0-9_]/.test(expr[i])) { name += expr[i]; i++; }
      tokens.push({ type: "var", value: name });
      continue;
    }
    throw new Error(`Unexpected character: ${expr[i]}`);
  }
  return tokens;
}

const PRECEDENCE: Record<string, number> = { "+": 1, "-": 1, "*": 2, "/": 2, "%": 2, "**": 3 };

function parseExpression(tokens: Token[], pos: number, minPrec = 0): { node: ASTNode; pos: number } {
  let { node: left, pos: p } = parseAtom(tokens, pos);
  while (p < tokens.length && tokens[p].type === "op" && PRECEDENCE[tokens[p].value] >= minPrec) {
    const op = tokens[p].value as Operator;
    const prec = PRECEDENCE[op];
    const nextMinPrec = op === "**" ? prec : prec + 1;
    const { node: right, pos: np } = parseExpression(tokens, p + 1, nextMinPrec);
    left = { type: "binary", op, left, right };
    p = np;
  }
  return { node: left, pos: p };
}

function parseAtom(tokens: Token[], pos: number): { node: ASTNode; pos: number } {
  const t = tokens[pos];
  if (!t) throw new Error("Unexpected end of expression");
  if (t.type === "number") return { node: { type: "number", value: t.value }, pos: pos + 1 };
  if (t.type === "var") return { node: { type: "var", name: t.value }, pos: pos + 1 };
  if (t.type === "op" && t.value === "-") {
    const { node, pos: p } = parseAtom(tokens, pos + 1);
    return { node: { type: "unary", op: "-", operand: node }, pos: p };
  }
  if (t.type === "paren" && t.value === "(") {
    const { node, pos: p } = parseExpression(tokens, pos + 1);
    if (!tokens[p] || tokens[p].value !== ")") throw new Error("Missing closing parenthesis");
    return { node, pos: p + 1 };
  }
  throw new Error(`Unexpected token: ${JSON.stringify(t)}`);
}
