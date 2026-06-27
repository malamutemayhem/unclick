export type Signal = 0 | 1;

export type GateType = "AND" | "OR" | "NOT" | "NAND" | "NOR" | "XOR" | "XNOR" | "BUF";

export interface Gate {
  id: string;
  type: GateType;
  inputs: string[];
  output: string;
}

export interface Wire {
  name: string;
  value: Signal;
}

export class Circuit {
  private wires = new Map<string, Signal>();
  private gates: Gate[] = [];
  private inputNames: string[] = [];
  private outputNames: string[] = [];

  addInput(name: string, value: Signal = 0): void {
    this.wires.set(name, value);
    this.inputNames.push(name);
  }

  addOutput(name: string): void {
    this.outputNames.push(name);
    if (!this.wires.has(name)) this.wires.set(name, 0);
  }

  addGate(id: string, type: GateType, inputs: string[], output: string): void {
    this.gates.push({ id, type, inputs, output });
    if (!this.wires.has(output)) this.wires.set(output, 0);
  }

  setInput(name: string, value: Signal): void {
    this.wires.set(name, value);
  }

  getWire(name: string): Signal {
    return this.wires.get(name) ?? 0;
  }

  simulate(maxIterations = 100): boolean {
    for (let iter = 0; iter < maxIterations; iter++) {
      let changed = false;
      for (const gate of this.gates) {
        const inputs = gate.inputs.map((n) => this.wires.get(n) ?? 0);
        const newVal = computeGate(gate.type, inputs);
        const oldVal = this.wires.get(gate.output) ?? 0;
        if (newVal !== oldVal) {
          this.wires.set(gate.output, newVal);
          changed = true;
        }
      }
      if (!changed) return true;
    }
    return false;
  }

  getOutputs(): Map<string, Signal> {
    const result = new Map<string, Signal>();
    for (const name of this.outputNames) {
      result.set(name, this.wires.get(name) ?? 0);
    }
    return result;
  }

  getInputs(): Map<string, Signal> {
    const result = new Map<string, Signal>();
    for (const name of this.inputNames) {
      result.set(name, this.wires.get(name) ?? 0);
    }
    return result;
  }

  truthTable(): Array<{ inputs: Map<string, Signal>; outputs: Map<string, Signal> }> {
    const rows: Array<{ inputs: Map<string, Signal>; outputs: Map<string, Signal> }> = [];
    const n = this.inputNames.length;
    const total = Math.pow(2, n);

    for (let i = 0; i < total; i++) {
      for (let j = 0; j < n; j++) {
        this.setInput(this.inputNames[j], ((i >> (n - 1 - j)) & 1) as Signal);
      }
      this.simulate();
      rows.push({
        inputs: new Map(this.getInputs()),
        outputs: new Map(this.getOutputs()),
      });
    }
    return rows;
  }

  gateCount(): number {
    return this.gates.length;
  }

  wireCount(): number {
    return this.wires.size;
  }
}

function computeGate(type: GateType, inputs: Signal[]): Signal {
  switch (type) {
    case "AND": return inputs.every((v) => v === 1) ? 1 : 0;
    case "OR": return inputs.some((v) => v === 1) ? 1 : 0;
    case "NOT": return inputs[0] === 0 ? 1 : 0;
    case "NAND": return inputs.every((v) => v === 1) ? 0 : 1;
    case "NOR": return inputs.some((v) => v === 1) ? 0 : 1;
    case "XOR": return (inputs.reduce((a, b) => (a ^ b) as Signal, 0 as Signal));
    case "XNOR": return (inputs.reduce((a, b) => (a ^ b) as Signal, 0 as Signal) === 0 ? 1 : 0);
    case "BUF": return inputs[0];
  }
}

export function halfAdder(): Circuit {
  const c = new Circuit();
  c.addInput("a");
  c.addInput("b");
  c.addOutput("sum");
  c.addOutput("carry");
  c.addGate("g1", "XOR", ["a", "b"], "sum");
  c.addGate("g2", "AND", ["a", "b"], "carry");
  return c;
}
