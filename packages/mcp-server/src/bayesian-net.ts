export interface BayesNode {
  name: string;
  parents: string[];
  cpt: Map<string, number>;
}

export class BayesianNetwork {
  private nodes: Map<string, BayesNode> = new Map();

  addNode(name: string, parents: string[] = []): void {
    this.nodes.set(name, { name, parents, cpt: new Map() });
  }

  setProbability(node: string, parentValues: Record<string, boolean>, probability: number): void {
    const n = this.nodes.get(node);
    if (!n) throw new Error(`Node ${node} not found`);
    const key = BayesianNetwork.makeKey(n.parents, parentValues);
    n.cpt.set(key, probability);
  }

  getProbability(node: string, parentValues: Record<string, boolean>): number {
    const n = this.nodes.get(node);
    if (!n) throw new Error(`Node ${node} not found`);
    const key = BayesianNetwork.makeKey(n.parents, parentValues);
    return n.cpt.get(key) ?? 0;
  }

  private static makeKey(parents: string[], values: Record<string, boolean>): string {
    if (parents.length === 0) return "prior";
    return parents.map((p) => `${p}=${values[p] ? "T" : "F"}`).join(",");
  }

  query(target: string, evidence: Record<string, boolean>, samples = 10000): number {
    let matching = 0;
    let total = 0;

    for (let i = 0; i < samples; i++) {
      const sample = this.forwardSample();
      let evidenceMatches = true;

      for (const [key, val] of Object.entries(evidence)) {
        if (sample[key] !== val) {
          evidenceMatches = false;
          break;
        }
      }

      if (evidenceMatches) {
        total++;
        if (sample[target]) matching++;
      }
    }

    return total === 0 ? 0 : matching / total;
  }

  forwardSample(): Record<string, boolean> {
    const sample: Record<string, boolean> = {};
    const ordered = this.topologicalSort();

    for (const nodeName of ordered) {
      const node = this.nodes.get(nodeName)!;
      const parentValues: Record<string, boolean> = {};
      for (const parent of node.parents) {
        parentValues[parent] = sample[parent];
      }
      const prob = this.getProbability(nodeName, parentValues);
      sample[nodeName] = Math.random() < prob;
    }

    return sample;
  }

  topologicalSort(): string[] {
    const visited = new Set<string>();
    const result: string[] = [];

    const visit = (name: string) => {
      if (visited.has(name)) return;
      visited.add(name);
      const node = this.nodes.get(name);
      if (node) {
        for (const parent of node.parents) {
          visit(parent);
        }
      }
      result.push(name);
    };

    for (const name of this.nodes.keys()) {
      visit(name);
    }

    return result;
  }

  getNodes(): string[] {
    return Array.from(this.nodes.keys());
  }

  getParents(node: string): string[] {
    return this.nodes.get(node)?.parents ?? [];
  }

  getChildren(node: string): string[] {
    const children: string[] = [];
    for (const [name, n] of this.nodes.entries()) {
      if (n.parents.includes(node)) children.push(name);
    }
    return children;
  }

  isRoot(node: string): boolean {
    const n = this.nodes.get(node);
    return n ? n.parents.length === 0 : false;
  }

  nodeCount(): number {
    return this.nodes.size;
  }

  edgeCount(): number {
    let count = 0;
    for (const node of this.nodes.values()) {
      count += node.parents.length;
    }
    return count;
  }
}
