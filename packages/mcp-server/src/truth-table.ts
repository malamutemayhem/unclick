export type LogicOp = "AND" | "OR" | "NOT" | "XOR" | "NAND" | "NOR" | "IMPLIES" | "IFF";

export interface TruthTableRow {
  inputs: boolean[];
  output: boolean;
}

export class TruthTable {
  static evaluate(op: LogicOp, a: boolean, b: boolean = false): boolean {
    switch (op) {
      case "AND": return a && b;
      case "OR": return a || b;
      case "NOT": return !a;
      case "XOR": return a !== b;
      case "NAND": return !(a && b);
      case "NOR": return !(a || b);
      case "IMPLIES": return !a || b;
      case "IFF": return a === b;
    }
  }

  static generate(op: LogicOp, varCount: number = 2): TruthTableRow[] {
    const rows: TruthTableRow[] = [];
    const total = 1 << varCount;
    for (let i = 0; i < total; i++) {
      const inputs: boolean[] = [];
      for (let j = varCount - 1; j >= 0; j--) {
        inputs.push(((i >> j) & 1) === 1);
      }
      const output = op === "NOT"
        ? TruthTable.evaluate(op, inputs[0])
        : TruthTable.evaluate(op, inputs[0], inputs[1]);
      rows.push({ inputs, output });
    }
    return rows;
  }

  static fromFunction(varCount: number, fn: (...args: boolean[]) => boolean): TruthTableRow[] {
    const rows: TruthTableRow[] = [];
    const total = 1 << varCount;
    for (let i = 0; i < total; i++) {
      const inputs: boolean[] = [];
      for (let j = varCount - 1; j >= 0; j--) {
        inputs.push(((i >> j) & 1) === 1);
      }
      rows.push({ inputs, output: fn(...inputs) });
    }
    return rows;
  }

  static minterms(rows: TruthTableRow[]): number[] {
    return rows
      .map((r, i) => (r.output ? i : -1))
      .filter((i) => i >= 0);
  }

  static maxterms(rows: TruthTableRow[]): number[] {
    return rows
      .map((r, i) => (!r.output ? i : -1))
      .filter((i) => i >= 0);
  }

  static isTautology(rows: TruthTableRow[]): boolean {
    return rows.every((r) => r.output);
  }

  static isContradiction(rows: TruthTableRow[]): boolean {
    return rows.every((r) => !r.output);
  }

  static isSatisfiable(rows: TruthTableRow[]): boolean {
    return rows.some((r) => r.output);
  }

  static equivalent(a: TruthTableRow[], b: TruthTableRow[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.output === b[i].output);
  }

  static toString(rows: TruthTableRow[], varNames?: string[]): string {
    if (rows.length === 0) return "";
    const varCount = rows[0].inputs.length;
    const names = varNames || Array.from({ length: varCount }, (_, i) => String.fromCharCode(65 + i));
    const header = [...names, "OUT"].join(" | ");
    const sep = [...names, "OUT"].map((n) => "-".repeat(n.length)).join("-+-");
    const lines = rows.map((r) => {
      const vals = r.inputs.map((v, i) => (v ? "1" : "0").padEnd(names[i].length));
      vals.push((r.output ? "1" : "0").padEnd(3));
      return vals.join(" | ");
    });
    return [header, sep, ...lines].join("\n");
  }
}
