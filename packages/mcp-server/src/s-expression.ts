export type SExpr = string | number | SExpr[];

export function parse(input: string): SExpr {
  const tokens = tokenize(input);
  let pos = 0;

  function parseExpr(): SExpr {
    if (tokens[pos] === "(") {
      pos++;
      const list: SExpr[] = [];
      while (pos < tokens.length && tokens[pos] !== ")") {
        list.push(parseExpr());
      }
      pos++;
      return list;
    }
    const token = tokens[pos++];
    const num = Number(token);
    if (!isNaN(num) && token !== "") return num;
    return token;
  }

  return parseExpr();
}

function tokenize(input: string): string[] {
  const tokens: string[] = [];
  let i = 0;
  while (i < input.length) {
    if (input[i] === " " || input[i] === "\n" || input[i] === "\t" || input[i] === "\r") {
      i++;
    } else if (input[i] === "(" || input[i] === ")") {
      tokens.push(input[i]);
      i++;
    } else if (input[i] === '"') {
      let str = "";
      i++;
      while (i < input.length && input[i] !== '"') {
        if (input[i] === "\\") { i++; str += input[i]; }
        else str += input[i];
        i++;
      }
      i++;
      tokens.push(`"${str}"`);
    } else {
      let token = "";
      while (i < input.length && input[i] !== " " && input[i] !== "(" && input[i] !== ")" && input[i] !== "\n" && input[i] !== "\t") {
        token += input[i];
        i++;
      }
      tokens.push(token);
    }
  }
  return tokens;
}

export function stringify(expr: SExpr): string {
  if (typeof expr === "number") return String(expr);
  if (typeof expr === "string") {
    if (expr.includes(" ") || expr.includes("(") || expr.includes(")")) {
      return `"${expr}"`;
    }
    return expr;
  }
  return `(${expr.map(stringify).join(" ")})`;
}

export function evaluate(
  expr: SExpr,
  env: Map<string, (args: SExpr[]) => SExpr> = defaultEnv(),
): SExpr {
  if (typeof expr === "number") return expr;
  if (typeof expr === "string") return expr;

  if (expr.length === 0) return [];

  const head = expr[0];
  if (typeof head === "string" && env.has(head)) {
    const fn = env.get(head)!;
    const args = expr.slice(1).map((a) => evaluate(a, env));
    return fn(args);
  }

  return expr.map((e) => evaluate(e, env));
}

export function defaultEnv(): Map<string, (args: SExpr[]) => SExpr> {
  const env = new Map<string, (args: SExpr[]) => SExpr>();

  env.set("+", (args) => (args as number[]).reduce((a, b) => a + b, 0));
  env.set("-", (args) => {
    const nums = args as number[];
    if (nums.length === 1) return -nums[0];
    return nums.slice(1).reduce((a, b) => a - b, nums[0]);
  });
  env.set("*", (args) => (args as number[]).reduce((a, b) => a * b, 1));
  env.set("/", (args) => {
    const nums = args as number[];
    return nums.slice(1).reduce((a, b) => a / b, nums[0]);
  });
  env.set("=", (args) => args[0] === args[1] ? 1 : 0);
  env.set("<", (args) => (args[0] as number) < (args[1] as number) ? 1 : 0);
  env.set(">", (args) => (args[0] as number) > (args[1] as number) ? 1 : 0);
  env.set("list", (args) => args);
  env.set("car", (args) => (args[0] as SExpr[])[0]);
  env.set("cdr", (args) => (args[0] as SExpr[]).slice(1));
  env.set("length", (args) => Array.isArray(args[0]) ? args[0].length : 0);

  return env;
}
