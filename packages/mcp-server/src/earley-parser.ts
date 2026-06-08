interface Rule {
  lhs: string;
  rhs: string[];
}

interface EarleyItem {
  rule: Rule;
  dot: number;
  origin: number;
}

export class EarleyParser {
  private rules: Rule[] = [];
  private startSymbol: string;

  constructor(startSymbol: string) {
    this.startSymbol = startSymbol;
  }

  addRule(lhs: string, rhs: string[]): void {
    this.rules.push({ lhs, rhs });
  }

  private isNonTerminal(symbol: string): boolean {
    return this.rules.some((r) => r.lhs === symbol);
  }

  parse(tokens: string[]): boolean {
    const n = tokens.length;
    const chart: EarleyItem[][] = Array.from({ length: n + 1 }, () => []);

    for (const rule of this.rules) {
      if (rule.lhs === this.startSymbol) {
        chart[0].push({ rule, dot: 0, origin: 0 });
      }
    }

    for (let i = 0; i <= n; i++) {
      let j = 0;
      while (j < chart[i].length) {
        const item = chart[i][j];
        if (item.dot < item.rule.rhs.length) {
          const nextSymbol = item.rule.rhs[item.dot];
          if (nextSymbol === "epsilon") {
            this.addToChart(chart[i], { rule: item.rule, dot: item.dot + 1, origin: item.origin });
          } else if (this.isNonTerminal(nextSymbol)) {
            this.predict(chart, i, nextSymbol);
          } else if (i < n) {
            this.scan(chart, i, item, tokens[i]);
          }
        } else {
          this.complete(chart, i, item);
        }
        j++;
      }
    }

    return chart[n].some(
      (item) =>
        item.rule.lhs === this.startSymbol &&
        item.dot === item.rule.rhs.length &&
        item.origin === 0
    );
  }

  private predict(chart: EarleyItem[][], pos: number, symbol: string): void {
    for (const rule of this.rules) {
      if (rule.lhs === symbol) {
        this.addToChart(chart[pos], { rule, dot: 0, origin: pos });
      }
    }
  }

  private scan(chart: EarleyItem[][], pos: number, item: EarleyItem, token: string): void {
    const nextSymbol = item.rule.rhs[item.dot];
    if (nextSymbol === token) {
      this.addToChart(chart[pos + 1], { rule: item.rule, dot: item.dot + 1, origin: item.origin });
    }
  }

  private complete(chart: EarleyItem[][], pos: number, completed: EarleyItem): void {
    for (const item of chart[completed.origin]) {
      if (
        item.dot < item.rule.rhs.length &&
        item.rule.rhs[item.dot] === completed.rule.lhs
      ) {
        this.addToChart(chart[pos], { rule: item.rule, dot: item.dot + 1, origin: item.origin });
      }
    }
  }

  private addToChart(set: EarleyItem[], item: EarleyItem): void {
    const exists = set.some(
      (existing) =>
        existing.rule === item.rule &&
        existing.dot === item.dot &&
        existing.origin === item.origin
    );
    if (!exists) set.push(item);
  }

  get ruleCount(): number {
    return this.rules.length;
  }

  getRules(): { lhs: string; rhs: string[] }[] {
    return this.rules.map((r) => ({ lhs: r.lhs, rhs: [...r.rhs] }));
  }
}
