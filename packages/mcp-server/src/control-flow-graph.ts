export interface BasicBlock {
  id: number;
  label?: string;
  statements: string[];
  successors: number[];
  predecessors: number[];
}

export class CFG {
  private blocks: BasicBlock[] = [];
  private entryId = 0;

  addBlock(statements: string[] = [], label?: string): number {
    const id = this.blocks.length;
    this.blocks.push({ id, label, statements, successors: [], predecessors: [] });
    return id;
  }

  addEdge(from: number, to: number): void {
    const fromBlock = this.blocks[from];
    const toBlock = this.blocks[to];
    if (!fromBlock.successors.includes(to)) {
      fromBlock.successors.push(to);
    }
    if (!toBlock.predecessors.includes(from)) {
      toBlock.predecessors.push(from);
    }
  }

  setEntry(id: number): void {
    this.entryId = id;
  }

  get entry(): number {
    return this.entryId;
  }

  getBlock(id: number): BasicBlock {
    return this.blocks[id];
  }

  get blockCount(): number {
    return this.blocks.length;
  }

  successors(id: number): number[] {
    return this.blocks[id].successors;
  }

  predecessors(id: number): number[] {
    return this.blocks[id].predecessors;
  }

  reversePostOrder(): number[] {
    const visited = new Set<number>();
    const order: number[] = [];

    const dfs = (id: number) => {
      if (visited.has(id)) return;
      visited.add(id);
      for (const succ of this.blocks[id].successors) {
        dfs(succ);
      }
      order.push(id);
    };

    dfs(this.entryId);
    return order.reverse();
  }

  postOrder(): number[] {
    return [...this.reversePostOrder()].reverse();
  }

  reachable(): Set<number> {
    const visited = new Set<number>();
    const stack = [this.entryId];
    while (stack.length > 0) {
      const id = stack.pop()!;
      if (visited.has(id)) continue;
      visited.add(id);
      for (const succ of this.blocks[id].successors) {
        stack.push(succ);
      }
    }
    return visited;
  }

  isBackEdge(from: number, to: number): boolean {
    const rpo = this.reversePostOrder();
    const indexOf = new Map<number, number>();
    rpo.forEach((id, i) => indexOf.set(id, i));
    const fi = indexOf.get(from);
    const ti = indexOf.get(to);
    return fi !== undefined && ti !== undefined && fi >= ti;
  }

  loops(): number[][] {
    const result: number[][] = [];
    const rpo = this.reversePostOrder();

    for (const block of this.blocks) {
      for (const succ of block.successors) {
        if (this.isBackEdge(block.id, succ)) {
          const loop = this.findLoop(succ, block.id);
          result.push(loop);
        }
      }
    }
    return result;
  }

  private findLoop(header: number, tail: number): number[] {
    const loopNodes = new Set<number>([header]);
    if (header === tail) return [header];
    const stack = [tail];
    while (stack.length > 0) {
      const n = stack.pop()!;
      if (loopNodes.has(n)) continue;
      loopNodes.add(n);
      for (const pred of this.blocks[n].predecessors) {
        stack.push(pred);
      }
    }
    return [...loopNodes].sort((a, b) => a - b);
  }

  toDot(name = "CFG"): string {
    const lines: string[] = [`digraph ${name} {`];
    for (const block of this.blocks) {
      const lbl = block.label ?? `B${block.id}`;
      const stmts = block.statements.join("\\n");
      const display = stmts ? `${lbl}:\\n${stmts}` : lbl;
      lines.push(`  ${block.id} [label="${display}"];`);
      for (const succ of block.successors) {
        lines.push(`  ${block.id} -> ${succ};`);
      }
    }
    lines.push("}");
    return lines.join("\n");
  }
}

export function buildFromStatements(stmts: string[]): CFG {
  const cfg = new CFG();
  if (stmts.length === 0) {
    cfg.addBlock([], "entry");
    return cfg;
  }

  const groups: string[][] = [[]];
  for (const stmt of stmts) {
    if (stmt.startsWith("label:")) {
      groups.push([stmt]);
    } else {
      groups[groups.length - 1].push(stmt);
    }
  }

  const blockIds: number[] = [];
  for (const group of groups) {
    const label = group[0]?.startsWith("label:") ? group[0].slice(6) : undefined;
    const filtered = group.filter((s) => !s.startsWith("label:"));
    blockIds.push(cfg.addBlock(filtered, label));
  }

  for (let i = 0; i < blockIds.length; i++) {
    const block = cfg.getBlock(blockIds[i]);
    const last = block.statements[block.statements.length - 1];

    if (last?.startsWith("goto ")) {
      const target = last.slice(5);
      for (let j = 0; j < blockIds.length; j++) {
        if (cfg.getBlock(blockIds[j]).label === target) {
          cfg.addEdge(blockIds[i], blockIds[j]);
        }
      }
    } else if (last?.startsWith("if ")) {
      const match = last.match(/then (.+) else (.+)/);
      if (match) {
        for (let j = 0; j < blockIds.length; j++) {
          const lbl = cfg.getBlock(blockIds[j]).label;
          if (lbl === match[1] || lbl === match[2]) {
            cfg.addEdge(blockIds[i], blockIds[j]);
          }
        }
      }
    } else if (i + 1 < blockIds.length) {
      cfg.addEdge(blockIds[i], blockIds[i + 1]);
    }
  }

  return cfg;
}
