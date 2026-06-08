export class ForthInterpreter {
  private stack: number[] = [];
  private dictionary = new Map<string, string[]>();
  private output: string[] = [];

  constructor() {
    this.dictionary.set("2DUP", ["OVER", "OVER"]);
    this.dictionary.set("2DROP", ["DROP", "DROP"]);
  }

  execute(program: string): string[] {
    this.output = [];
    const tokens = this.tokenize(program);
    this.interpret(tokens);
    return this.output;
  }

  private tokenize(program: string): string[] {
    return program.trim().split(/\s+/).filter(Boolean);
  }

  private interpret(tokens: string[]): void {
    let i = 0;
    while (i < tokens.length) {
      const token = tokens[i].toUpperCase();
      if (token === ":") {
        i++;
        const name = tokens[i].toUpperCase();
        i++;
        const body: string[] = [];
        while (i < tokens.length && tokens[i] !== ";") {
          body.push(tokens[i]);
          i++;
        }
        this.dictionary.set(name, body);
        i++;
        continue;
      }
      this.executeToken(token);
      i++;
    }
  }

  private executeToken(token: string): void {
    if (this.dictionary.has(token)) {
      const body = this.dictionary.get(token)!;
      for (const t of body) this.executeToken(t.toUpperCase());
      return;
    }
    const num = parseInt(token);
    if (!isNaN(num)) {
      this.stack.push(num);
      return;
    }
    switch (token) {
      case "+": {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(a + b);
        break;
      }
      case "-": {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(a - b);
        break;
      }
      case "*": {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(a * b);
        break;
      }
      case "/": {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(b === 0 ? 0 : Math.trunc(a / b));
        break;
      }
      case "MOD": {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(a % b);
        break;
      }
      case "DUP":
        this.stack.push(this.stack[this.stack.length - 1]);
        break;
      case "DROP":
        this.stack.pop();
        break;
      case "SWAP": {
        const x = this.stack.pop()!;
        const y = this.stack.pop()!;
        this.stack.push(x, y);
        break;
      }
      case "OVER":
        this.stack.push(this.stack[this.stack.length - 2]);
        break;
      case "ROT": {
        const c = this.stack.pop()!;
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(b, c, a);
        break;
      }
      case ".":
        this.output.push(String(this.stack.pop()!));
        break;
      case ".S":
        this.output.push(`<${this.stack.length}> ${this.stack.join(" ")}`);
        break;
      case "=": {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(a === b ? -1 : 0);
        break;
      }
      case "<": {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(a < b ? -1 : 0);
        break;
      }
      case ">": {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(a > b ? -1 : 0);
        break;
      }
      case "NEGATE":
        this.stack.push(-this.stack.pop()!);
        break;
      case "ABS":
        this.stack.push(Math.abs(this.stack.pop()!));
        break;
      case "MAX": {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(Math.max(a, b));
        break;
      }
      case "MIN": {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(Math.min(a, b));
        break;
      }
      case "CR":
        this.output.push("\n");
        break;
      default:
        throw new Error(`Unknown word: ${token}`);
    }
  }

  getStack(): number[] {
    return [...this.stack];
  }

  reset(): void {
    this.stack = [];
    this.output = [];
  }
}
