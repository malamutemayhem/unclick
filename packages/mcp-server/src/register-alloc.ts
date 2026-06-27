export interface LiveRange {
  variable: string;
  start: number;
  end: number;
}

export interface InterferenceGraph {
  nodes: string[];
  edges: Array<[string, string]>;
}

export interface AllocationResult {
  allocation: Map<string, number>;
  spilled: string[];
  registersUsed: number;
}

export class RegisterAllocator {
  private liveRanges: LiveRange[] = [];
  private numRegisters: number;

  constructor(numRegisters: number) {
    this.numRegisters = numRegisters;
  }

  addLiveRange(variable: string, start: number, end: number): void {
    this.liveRanges.push({ variable, start, end });
  }

  buildInterferenceGraph(): InterferenceGraph {
    const nodes = this.liveRanges.map((r) => r.variable);
    const edges: Array<[string, string]> = [];

    for (let i = 0; i < this.liveRanges.length; i++) {
      for (let j = i + 1; j < this.liveRanges.length; j++) {
        if (this.overlaps(this.liveRanges[i], this.liveRanges[j])) {
          edges.push([this.liveRanges[i].variable, this.liveRanges[j].variable]);
        }
      }
    }

    return { nodes, edges };
  }

  private overlaps(a: LiveRange, b: LiveRange): boolean {
    return a.start < b.end && b.start < a.end;
  }

  allocateLinearScan(): AllocationResult {
    const sorted = [...this.liveRanges].sort((a, b) => a.start - b.start);
    const allocation = new Map<string, number>();
    const spilled: string[] = [];
    const active: Array<{ range: LiveRange; reg: number }> = [];
    const freeRegs = new Set<number>();
    for (let i = 0; i < this.numRegisters; i++) freeRegs.add(i);

    for (const range of sorted) {
      const expired: number[] = [];
      for (let i = 0; i < active.length; i++) {
        if (active[i].range.end <= range.start) {
          freeRegs.add(active[i].reg);
          expired.push(i);
        }
      }
      for (let i = expired.length - 1; i >= 0; i--) {
        active.splice(expired[i], 1);
      }

      if (freeRegs.size > 0) {
        const reg = Math.min(...freeRegs);
        freeRegs.delete(reg);
        allocation.set(range.variable, reg);
        active.push({ range, reg });
        active.sort((a, b) => a.range.end - b.range.end);
      } else {
        if (active.length > 0 && active[active.length - 1].range.end > range.end) {
          const spill = active.pop()!;
          spilled.push(spill.range.variable);
          allocation.delete(spill.range.variable);
          freeRegs.add(spill.reg);

          const reg = Math.min(...freeRegs);
          freeRegs.delete(reg);
          allocation.set(range.variable, reg);
          active.push({ range, reg });
          active.sort((a, b) => a.range.end - b.range.end);
        } else {
          spilled.push(range.variable);
        }
      }
    }

    const usedRegs = new Set(allocation.values());
    return { allocation, spilled, registersUsed: usedRegs.size };
  }

  allocateGreedyColor(): AllocationResult {
    const graph = this.buildInterferenceGraph();
    const adjacency = new Map<string, Set<string>>();
    for (const node of graph.nodes) adjacency.set(node, new Set());
    for (const [a, b] of graph.edges) {
      adjacency.get(a)!.add(b);
      adjacency.get(b)!.add(a);
    }

    const sorted = [...graph.nodes].sort(
      (a, b) => (adjacency.get(b)?.size ?? 0) - (adjacency.get(a)?.size ?? 0)
    );

    const allocation = new Map<string, number>();
    const spilled: string[] = [];

    for (const node of sorted) {
      const neighborColors = new Set<number>();
      for (const neighbor of adjacency.get(node)!) {
        const color = allocation.get(neighbor);
        if (color !== undefined) neighborColors.add(color);
      }

      let assigned = false;
      for (let c = 0; c < this.numRegisters; c++) {
        if (!neighborColors.has(c)) {
          allocation.set(node, c);
          assigned = true;
          break;
        }
      }

      if (!assigned) spilled.push(node);
    }

    const usedRegs = new Set(allocation.values());
    return { allocation, spilled, registersUsed: usedRegs.size };
  }

  get rangeCount(): number {
    return this.liveRanges.length;
  }

  getRanges(): LiveRange[] {
    return this.liveRanges.map((r) => ({ ...r }));
  }

  clear(): void {
    this.liveRanges = [];
  }
}
