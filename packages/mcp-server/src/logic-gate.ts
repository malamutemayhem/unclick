export type GateType = "AND" | "OR" | "NOT" | "NAND" | "NOR" | "XOR" | "XNOR" | "BUF";

export interface GateNode {
  id: string;
  type: GateType;
  inputs: string[];
  output: boolean;
}

function evalGate(type: GateType, inputs: boolean[]): boolean {
  switch (type) {
    case "AND": return inputs.every(Boolean);
    case "OR": return inputs.some(Boolean);
    case "NOT": return !inputs[0];
    case "NAND": return !inputs.every(Boolean);
    case "NOR": return !inputs.some(Boolean);
    case "XOR": return inputs.reduce((a, b) => a !== b, false);
    case "XNOR": return !inputs.reduce((a, b) => a !== b, false);
    case "BUF": return inputs[0];
  }
}

export class Circuit {
  private gates = new Map<string, GateNode>();
  private inputs = new Map<string, boolean>();
  private evalOrder: string[] = [];
  private dirty = true;

  addInput(name: string, value = false): void {
    this.inputs.set(name, value);
    this.dirty = true;
  }

  setInput(name: string, value: boolean): void {
    this.inputs.set(name, value);
    this.dirty = true;
  }

  addGate(id: string, type: GateType, inputs: string[]): void {
    this.gates.set(id, { id, type, inputs, output: false });
    this.dirty = true;
  }

  removeGate(id: string): boolean {
    const removed = this.gates.delete(id);
    if (removed) this.dirty = true;
    return removed;
  }

  evaluate(): Map<string, boolean> {
    if (this.dirty) {
      this.evalOrder = this.topologicalSort();
      this.dirty = false;
    }

    const values = new Map<string, boolean>(this.inputs);

    for (const gateId of this.evalOrder) {
      const gate = this.gates.get(gateId)!;
      const inputVals = gate.inputs.map((name) => values.get(name) ?? false);
      gate.output = evalGate(gate.type, inputVals);
      values.set(gateId, gate.output);
    }

    return values;
  }

  getOutput(id: string): boolean {
    const values = this.evaluate();
    return values.get(id) ?? false;
  }

  truthTable(outputIds: string[]): Array<Record<string, boolean>> {
    const inputNames = [...this.inputs.keys()];
    const n = inputNames.length;
    const rows: Array<Record<string, boolean>> = [];

    for (let i = 0; i < (1 << n); i++) {
      for (let bit = 0; bit < n; bit++) {
        this.inputs.set(inputNames[bit], !!(i & (1 << (n - 1 - bit))));
      }
      this.dirty = true;
      const values = this.evaluate();
      const row: Record<string, boolean> = {};
      for (const name of inputNames) {
        row[name] = this.inputs.get(name)!;
      }
      for (const id of outputIds) {
        row[id] = values.get(id) ?? false;
      }
      rows.push(row);
    }

    return rows;
  }

  private topologicalSort(): string[] {
    const visited = new Set<string>();
    const result: string[] = [];

    const visit = (id: string) => {
      if (visited.has(id)) return;
      visited.add(id);
      const gate = this.gates.get(id);
      if (!gate) return;
      for (const inp of gate.inputs) {
        if (this.gates.has(inp)) visit(inp);
      }
      result.push(id);
    };

    for (const id of this.gates.keys()) visit(id);
    return result;
  }

  get gateCount(): number {
    return this.gates.size;
  }

  get inputCount(): number {
    return this.inputs.size;
  }

  getGate(id: string): GateNode | null {
    const g = this.gates.get(id);
    return g ? { ...g, inputs: [...g.inputs] } : null;
  }

  listGates(): GateNode[] {
    return [...this.gates.values()].map((g) => ({ ...g, inputs: [...g.inputs] }));
  }
}

export function halfAdder(a: boolean, b: boolean): { sum: boolean; carry: boolean } {
  return { sum: a !== b, carry: a && b };
}

export function fullAdder(a: boolean, b: boolean, cin: boolean): { sum: boolean; carry: boolean } {
  const ha1 = halfAdder(a, b);
  const ha2 = halfAdder(ha1.sum, cin);
  return { sum: ha2.sum, carry: ha1.carry || ha2.carry };
}

export function rippleCarryAdd(a: boolean[], b: boolean[]): { result: boolean[]; carry: boolean } {
  const n = Math.max(a.length, b.length);
  const result: boolean[] = [];
  let carry = false;

  for (let i = 0; i < n; i++) {
    const fa = fullAdder(a[i] ?? false, b[i] ?? false, carry);
    result.push(fa.sum);
    carry = fa.carry;
  }

  return { result, carry };
}
