type LispValue = number | string | boolean | LispValue[] | LispFunc | null;
type LispFunc = (args: LispValue[], env: Environment) => LispValue;

class Environment {
  private vars = new Map<string, LispValue>();
  private parent: Environment | null;

  constructor(parent: Environment | null = null) {
    this.parent = parent;
  }

  get(name: string): LispValue {
    if (this.vars.has(name)) return this.vars.get(name)!;
    if (this.parent) return this.parent.get(name);
    throw new Error(`Undefined variable: ${name}`);
  }

  set(name: string, value: LispValue): void {
    this.vars.set(name, value);
  }
}

export class LispInterpreter {
  private globalEnv: Environment;

  constructor() {
    this.globalEnv = new Environment();
    this.initBuiltins();
  }

  private initBuiltins(): void {
    const env = this.globalEnv;
    env.set("+", (args: LispValue[]) => (args as number[]).reduce((a, b) => a + b, 0));
    env.set("-", (args: LispValue[]) => args.length === 1 ? -(args[0] as number) : (args[0] as number) - (args[1] as number));
    env.set("*", (args: LispValue[]) => (args as number[]).reduce((a, b) => a * b, 1));
    env.set("/", (args: LispValue[]) => Math.trunc((args[0] as number) / (args[1] as number)));
    env.set("=", (args: LispValue[]) => args[0] === args[1]);
    env.set("<", (args: LispValue[]) => (args[0] as number) < (args[1] as number));
    env.set(">", (args: LispValue[]) => (args[0] as number) > (args[1] as number));
    env.set("not", (args: LispValue[]) => !args[0]);
    env.set("car", (args: LispValue[]) => (args[0] as LispValue[])[0]);
    env.set("cdr", (args: LispValue[]) => (args[0] as LispValue[]).slice(1));
    env.set("cons", (args: LispValue[]) => [args[0], ...(args[1] as LispValue[])]);
    env.set("list", (args: LispValue[]) => args);
    env.set("length", (args: LispValue[]) => (args[0] as LispValue[]).length);
    env.set("null?", (args: LispValue[]) => args[0] === null || (Array.isArray(args[0]) && (args[0] as LispValue[]).length === 0));
    env.set("number?", (args: LispValue[]) => typeof args[0] === "number");
  }

  eval(input: string): LispValue {
    const tokens = this.tokenize(input);
    const ast = this.parse(tokens);
    return this.evaluate(ast, this.globalEnv);
  }

  private tokenize(input: string): string[] {
    return input
      .replace(/\(/g, " ( ")
      .replace(/\)/g, " ) ")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
  }

  private parse(tokens: string[]): LispValue {
    if (tokens.length === 0) throw new Error("Unexpected EOF");
    const token = tokens.shift()!;
    if (token === "(") {
      const list: LispValue[] = [];
      while (tokens[0] !== ")") {
        list.push(this.parse(tokens));
      }
      tokens.shift();
      return list;
    }
    if (token === ")") throw new Error("Unexpected )");
    const num = Number(token);
    if (!isNaN(num)) return num;
    if (token === "#t") return true;
    if (token === "#f") return false;
    if (token.startsWith('"')) return token.slice(1, -1);
    return token;
  }

  private evaluate(expr: LispValue, env: Environment): LispValue {
    if (typeof expr === "number" || typeof expr === "boolean" || expr === null) {
      return expr;
    }
    if (typeof expr === "string") {
      return env.get(expr);
    }
    if (!Array.isArray(expr)) {
      return expr;
    }
    const list = expr as LispValue[];
    if (list.length === 0) return null;
    const head = list[0];
    if (head === "quote") return list[1];
    if (head === "define") {
      const name = list[1] as string;
      const value = this.evaluate(list[2], env);
      env.set(name, value);
      return value;
    }
    if (head === "if") {
      const cond = this.evaluate(list[1], env);
      return cond ? this.evaluate(list[2], env) : this.evaluate(list[3], env);
    }
    if (head === "lambda") {
      const params = list[1] as string[];
      const body = list[2];
      return ((args: LispValue[]) => {
        const localEnv = new Environment(env);
        for (let i = 0; i < params.length; i++) {
          localEnv.set(params[i] as string, args[i]);
        }
        return this.evaluate(body, localEnv);
      }) as LispFunc;
    }
    if (head === "begin") {
      let result: LispValue = null;
      for (let i = 1; i < list.length; i++) {
        result = this.evaluate(list[i], env);
      }
      return result;
    }
    const func = this.evaluate(head, env) as LispFunc;
    const args = list.slice(1).map((a) => this.evaluate(a, env));
    return func(args, env);
  }
}
