export interface Grammar {
  rules: Map<string, string[][]>;
  terminals: Set<string>;
  startSymbol: string;
}

export class LL1Parser {
  private first: Map<string, Set<string>> = new Map();
  private follow: Map<string, Set<string>> = new Map();
  private table: Map<string, Map<string, string[]>> = new Map();

  constructor(private grammar: Grammar) {
    this.computeFirst();
    this.computeFollow();
    this.buildTable();
  }

  private computeFirst(): void {
    for (const t of this.grammar.terminals) {
      this.first.set(t, new Set([t]));
    }
    this.first.set("epsilon", new Set(["epsilon"]));

    for (const nt of this.grammar.rules.keys()) {
      this.first.set(nt, new Set());
    }

    let changed = true;
    while (changed) {
      changed = false;
      for (const [nt, prods] of this.grammar.rules) {
        for (const prod of prods) {
          if (prod.length === 1 && prod[0] === "epsilon") {
            if (!this.first.get(nt)!.has("epsilon")) {
              this.first.get(nt)!.add("epsilon");
              changed = true;
            }
            continue;
          }
          for (const sym of prod) {
            const symFirst = this.first.get(sym) || new Set();
            for (const f of symFirst) {
              if (f !== "epsilon" && !this.first.get(nt)!.has(f)) {
                this.first.get(nt)!.add(f);
                changed = true;
              }
            }
            if (!symFirst.has("epsilon")) break;
          }
        }
      }
    }
  }

  private computeFollow(): void {
    for (const nt of this.grammar.rules.keys()) {
      this.follow.set(nt, new Set());
    }
    this.follow.get(this.grammar.startSymbol)!.add("$");

    let changed = true;
    while (changed) {
      changed = false;
      for (const [nt, prods] of this.grammar.rules) {
        for (const prod of prods) {
          for (let i = 0; i < prod.length; i++) {
            if (!this.grammar.rules.has(prod[i])) continue;
            const rest = prod.slice(i + 1);
            const restFirst = this.firstOfSequence(rest);
            for (const f of restFirst) {
              if (f !== "epsilon" && !this.follow.get(prod[i])!.has(f)) {
                this.follow.get(prod[i])!.add(f);
                changed = true;
              }
            }
            if (restFirst.has("epsilon") || rest.length === 0) {
              for (const f of this.follow.get(nt)!) {
                if (!this.follow.get(prod[i])!.has(f)) {
                  this.follow.get(prod[i])!.add(f);
                  changed = true;
                }
              }
            }
          }
        }
      }
    }
  }

  private firstOfSequence(seq: string[]): Set<string> {
    const result = new Set<string>();
    if (seq.length === 0) { result.add("epsilon"); return result; }
    for (const sym of seq) {
      const f = this.first.get(sym) || new Set();
      for (const s of f) { if (s !== "epsilon") result.add(s); }
      if (!f.has("epsilon")) return result;
    }
    result.add("epsilon");
    return result;
  }

  private buildTable(): void {
    for (const [nt, prods] of this.grammar.rules) {
      this.table.set(nt, new Map());
      for (const prod of prods) {
        const prodFirst = this.firstOfSequence(prod);
        for (const f of prodFirst) {
          if (f !== "epsilon") this.table.get(nt)!.set(f, prod);
        }
        if (prodFirst.has("epsilon")) {
          for (const f of this.follow.get(nt)!) {
            this.table.get(nt)!.set(f, prod);
          }
        }
      }
    }
  }

  parse(tokens: string[]): boolean {
    const stack: string[] = ["$", this.grammar.startSymbol];
    const input = [...tokens, "$"];
    let pos = 0;

    while (stack.length > 0) {
      const top = stack[stack.length - 1];
      const current = input[pos];

      if (top === "$" && current === "$") return true;
      if (top === current) { stack.pop(); pos++; continue; }
      if (this.grammar.terminals.has(top)) return false;

      const entry = this.table.get(top)?.get(current);
      if (!entry) return false;

      stack.pop();
      if (!(entry.length === 1 && entry[0] === "epsilon")) {
        for (let i = entry.length - 1; i >= 0; i--) {
          stack.push(entry[i]);
        }
      }
    }

    return pos === input.length;
  }

  getFirst(symbol: string): Set<string> {
    return this.first.get(symbol) || new Set();
  }

  getFollow(symbol: string): Set<string> {
    return this.follow.get(symbol) || new Set();
  }
}
