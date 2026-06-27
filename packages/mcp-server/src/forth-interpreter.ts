export interface ForthState {
  stack: number[];
  rstack: number[];
  output: string[];
  dictionary: Map<string, string[]>;
  halted: boolean;
}

export function createForth(): ForthState {
  return { stack: [], rstack: [], output: [], dictionary: new Map(), halted: false };
}

export function execute(source: string, state?: ForthState): ForthState {
  const s = state ? { ...state, stack: [...state.stack], rstack: [...state.rstack], output: [...state.output], dictionary: new Map(state.dictionary) } : createForth();
  const tokens = tokenize(source);
  runTokens(tokens, s);
  return s;
}

function tokenize(source: string): string[] {
  return source.trim().split(/\s+/).filter((t) => t.length > 0);
}

function runTokens(tokens: string[], state: ForthState): void {
  let i = 0;
  while (i < tokens.length && !state.halted) {
    const token = tokens[i].toLowerCase();

    if (token === ":") {
      i++;
      const name = tokens[i++].toLowerCase();
      const body: string[] = [];
      while (i < tokens.length && tokens[i] !== ";") {
        body.push(tokens[i++]);
      }
      i++;
      state.dictionary.set(name, body);
      continue;
    }

    if (token === "if") {
      const cond = state.stack.pop()!;
      const thenBranch: string[] = [];
      const elseBranch: string[] = [];
      i++;
      let inElse = false;
      let depth = 1;
      while (i < tokens.length && depth > 0) {
        const t = tokens[i].toLowerCase();
        if (t === "if") depth++;
        if (t === "then") {
          depth--;
          if (depth === 0) { i++; break; }
        }
        if (t === "else" && depth === 1) {
          inElse = true;
          i++;
          continue;
        }
        if (inElse) elseBranch.push(tokens[i]);
        else thenBranch.push(tokens[i]);
        i++;
      }
      runTokens(cond !== 0 ? thenBranch : elseBranch, state);
      continue;
    }

    if (token === "do") {
      const start = state.stack.pop()!;
      const limit = state.stack.pop()!;
      const body: string[] = [];
      i++;
      while (i < tokens.length && tokens[i].toLowerCase() !== "loop") {
        body.push(tokens[i++]);
      }
      i++;
      for (let j = start; j < limit; j++) {
        state.rstack.push(j);
        runTokens(body, state);
        state.rstack.pop();
      }
      continue;
    }

    executeWord(token, state);
    i++;
  }
}

function executeWord(word: string, state: ForthState): void {
  const s = state.stack;

  if (state.dictionary.has(word)) {
    runTokens(state.dictionary.get(word)!, state);
    return;
  }

  switch (word) {
    case "+": { const b = s.pop()!; const a = s.pop()!; s.push(a + b); break; }
    case "-": { const b = s.pop()!; const a = s.pop()!; s.push(a - b); break; }
    case "*": { const b = s.pop()!; const a = s.pop()!; s.push(a * b); break; }
    case "/": { const b = s.pop()!; const a = s.pop()!; s.push(Math.trunc(a / b)); break; }
    case "mod": { const b = s.pop()!; const a = s.pop()!; s.push(a % b); break; }
    case "negate": s.push(-s.pop()!); break;
    case "abs": s.push(Math.abs(s.pop()!)); break;
    case "min": { const b = s.pop()!; const a = s.pop()!; s.push(Math.min(a, b)); break; }
    case "max": { const b = s.pop()!; const a = s.pop()!; s.push(Math.max(a, b)); break; }
    case "dup": s.push(s[s.length - 1]); break;
    case "drop": s.pop(); break;
    case "swap": { const b = s.pop()!; const a = s.pop()!; s.push(b, a); break; }
    case "over": s.push(s[s.length - 2]); break;
    case "rot": { const c = s.pop()!; const b = s.pop()!; const a = s.pop()!; s.push(b, c, a); break; }
    case ".": state.output.push(String(s.pop()!)); break;
    case ".s": state.output.push(`<${s.length}> ${s.join(" ")}`); break;
    case "cr": state.output.push("\n"); break;
    case "=": { const b = s.pop()!; const a = s.pop()!; s.push(a === b ? -1 : 0); break; }
    case "<": { const b = s.pop()!; const a = s.pop()!; s.push(a < b ? -1 : 0); break; }
    case ">": { const b = s.pop()!; const a = s.pop()!; s.push(a > b ? -1 : 0); break; }
    case "0=": s.push(s.pop()! === 0 ? -1 : 0); break;
    case "and": { const b = s.pop()!; const a = s.pop()!; s.push(a & b); break; }
    case "or": { const b = s.pop()!; const a = s.pop()!; s.push(a | b); break; }
    case "invert": s.push(~s.pop()!); break;
    case "i": s.push(state.rstack[state.rstack.length - 1]); break;
    case ">r": state.rstack.push(s.pop()!); break;
    case "r>": s.push(state.rstack.pop()!); break;
    case "depth": s.push(s.length); break;
    case "bye": state.halted = true; break;
    default: {
      const n = Number(word);
      if (!isNaN(n)) s.push(n);
      else state.output.push(`Unknown word: ${word}`);
    }
  }
}

export function stackToString(state: ForthState): string {
  return state.stack.join(" ");
}
