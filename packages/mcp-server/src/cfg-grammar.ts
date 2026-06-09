export interface Production {
  head: string;
  body: string[];
}

export class CFGGrammar {
  private productions: Production[] = [];
  private startSymbol: string | null = null;

  addProduction(head: string, body: string[]): void {
    this.productions.push({ head, body: [...body] });
    if (!this.startSymbol) this.startSymbol = head;
  }

  setStart(symbol: string): void {
    this.startSymbol = symbol;
  }

  getStart(): string | null {
    return this.startSymbol;
  }

  getProductions(head?: string): Production[] {
    if (head) return this.productions.filter(p => p.head === head);
    return [...this.productions];
  }

  getNonTerminals(): Set<string> {
    const nts = new Set<string>();
    for (const p of this.productions) nts.add(p.head);
    return nts;
  }

  getTerminals(): Set<string> {
    const nts = this.getNonTerminals();
    const terms = new Set<string>();
    for (const p of this.productions) {
      for (const sym of p.body) {
        if (!nts.has(sym) && sym !== "") terms.add(sym);
      }
    }
    return terms;
  }

  firstSet(symbol: string): Set<string> {
    const result = new Set<string>();
    this.computeFirst(symbol, result, new Set<string>());
    return result;
  }

  private computeFirst(symbol: string, result: Set<string>, visited: Set<string>): void {
    if (visited.has(symbol)) return;
    visited.add(symbol);

    const nts = this.getNonTerminals();
    if (!nts.has(symbol)) {
      result.add(symbol);
      return;
    }

    for (const prod of this.getProductions(symbol)) {
      if (prod.body.length === 0 || (prod.body.length === 1 && prod.body[0] === "")) {
        result.add("");
        continue;
      }

      let allNullable = true;
      for (const sym of prod.body) {
        const symFirst = new Set<string>();
        this.computeFirst(sym, symFirst, visited);
        for (const f of symFirst) {
          if (f !== "") result.add(f);
        }
        if (!symFirst.has("")) {
          allNullable = false;
          break;
        }
      }
      if (allNullable) result.add("");
    }
  }

  followSet(symbol: string): Set<string> {
    const followSets = new Map<string, Set<string>>();
    const nts = this.getNonTerminals();
    for (const nt of nts) followSets.set(nt, new Set<string>());

    if (this.startSymbol) {
      followSets.get(this.startSymbol)!.add("$");
    }

    let changed = true;
    while (changed) {
      changed = false;
      for (const prod of this.productions) {
        for (let i = 0; i < prod.body.length; i++) {
          const b = prod.body[i];
          if (!nts.has(b)) continue;

          const followB = followSets.get(b)!;
          const rest = prod.body.slice(i + 1);

          if (rest.length === 0) {
            const followHead = followSets.get(prod.head)!;
            for (const f of followHead) {
              if (!followB.has(f)) { followB.add(f); changed = true; }
            }
          } else {
            const firstRest = this.firstOfSequence(rest);
            for (const f of firstRest) {
              if (f !== "" && !followB.has(f)) { followB.add(f); changed = true; }
            }
            if (firstRest.has("")) {
              const followHead = followSets.get(prod.head)!;
              for (const f of followHead) {
                if (!followB.has(f)) { followB.add(f); changed = true; }
              }
            }
          }
        }
      }
    }

    return followSets.get(symbol) || new Set<string>();
  }

  private firstOfSequence(symbols: string[]): Set<string> {
    const result = new Set<string>();
    let allNullable = true;
    for (const sym of symbols) {
      const f = this.firstSet(sym);
      for (const x of f) {
        if (x !== "") result.add(x);
      }
      if (!f.has("")) {
        allNullable = false;
        break;
      }
    }
    if (allNullable) result.add("");
    return result;
  }

  isNullable(symbol: string): boolean {
    return this.firstSet(symbol).has("");
  }

  removeLeftRecursion(): CFGGrammar {
    const g = new CFGGrammar();
    const nts = [...this.getNonTerminals()];

    for (const nt of nts) {
      const prods = this.getProductions(nt);
      const recursive: Production[] = [];
      const nonRecursive: Production[] = [];

      for (const p of prods) {
        if (p.body.length > 0 && p.body[0] === nt) {
          recursive.push(p);
        } else {
          nonRecursive.push(p);
        }
      }

      if (recursive.length === 0) {
        for (const p of prods) g.addProduction(p.head, p.body);
      } else {
        const newNt = nt + "'";
        for (const p of nonRecursive) {
          g.addProduction(nt, [...p.body, newNt]);
        }
        for (const p of recursive) {
          g.addProduction(newNt, [...p.body.slice(1), newNt]);
        }
        g.addProduction(newNt, [""]);
      }
    }

    if (this.startSymbol) g.setStart(this.startSymbol);
    return g;
  }

  get productionCount(): number {
    return this.productions.length;
  }
}
