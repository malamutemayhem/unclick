export interface DataFlowBlock {
  id: number;
  defs: Set<string>;
  uses: Set<string>;
  successors: number[];
  predecessors: number[];
}

export interface ReachingDefs {
  in: Map<number, Set<string>>;
  out: Map<number, Set<string>>;
}

export function reachingDefinitions(blocks: DataFlowBlock[]): ReachingDefs {
  const inSets = new Map<number, Set<string>>();
  const outSets = new Map<number, Set<string>>();

  for (const b of blocks) {
    inSets.set(b.id, new Set());
    outSets.set(b.id, new Set());
  }

  let changed = true;
  while (changed) {
    changed = false;
    for (const b of blocks) {
      const newIn = new Set<string>();
      for (const pred of b.predecessors) {
        for (const d of outSets.get(pred)!) {
          newIn.add(d);
        }
      }

      const newOut = new Set<string>();
      for (const d of newIn) {
        if (!b.defs.has(d.split("@")[0])) {
          newOut.add(d);
        }
      }
      for (const d of b.defs) {
        newOut.add(`${d}@${b.id}`);
      }

      const prevOut = outSets.get(b.id)!;
      if (newOut.size !== prevOut.size || ![...newOut].every((x) => prevOut.has(x))) {
        changed = true;
      }

      inSets.set(b.id, newIn);
      outSets.set(b.id, newOut);
    }
  }

  return { in: inSets, out: outSets };
}

export interface LivenessResult {
  in: Map<number, Set<string>>;
  out: Map<number, Set<string>>;
}

export function livenessAnalysis(blocks: DataFlowBlock[]): LivenessResult {
  const inSets = new Map<number, Set<string>>();
  const outSets = new Map<number, Set<string>>();

  for (const b of blocks) {
    inSets.set(b.id, new Set());
    outSets.set(b.id, new Set());
  }

  let changed = true;
  while (changed) {
    changed = false;
    for (let i = blocks.length - 1; i >= 0; i--) {
      const b = blocks[i];

      const newOut = new Set<string>();
      for (const succ of b.successors) {
        for (const v of inSets.get(succ)!) {
          newOut.add(v);
        }
      }

      const newIn = new Set<string>(b.uses);
      for (const v of newOut) {
        if (!b.defs.has(v)) {
          newIn.add(v);
        }
      }

      const prevIn = inSets.get(b.id)!;
      if (newIn.size !== prevIn.size || ![...newIn].every((x) => prevIn.has(x))) {
        changed = true;
      }

      inSets.set(b.id, newIn);
      outSets.set(b.id, newOut);
    }
  }

  return { in: inSets, out: outSets };
}

export function availableExpressions(
  blocks: { id: number; gen: Set<string>; kill: Set<string>; successors: number[]; predecessors: number[] }[]
): { in: Map<number, Set<string>>; out: Map<number, Set<string>> } {
  const allExprs = new Set<string>();
  for (const b of blocks) {
    for (const e of b.gen) allExprs.add(e);
  }

  const inSets = new Map<number, Set<string>>();
  const outSets = new Map<number, Set<string>>();

  for (const b of blocks) {
    inSets.set(b.id, new Set());
    outSets.set(b.id, b.id === blocks[0].id ? new Set() : new Set(allExprs));
  }

  let changed = true;
  while (changed) {
    changed = false;
    for (const b of blocks) {
      const newIn = b.predecessors.length === 0
        ? new Set<string>()
        : b.predecessors.reduce<Set<string>>((acc, pred, idx) => {
            const predOut = outSets.get(pred)!;
            if (idx === 0) return new Set(predOut);
            const result = new Set<string>();
            for (const e of acc) {
              if (predOut.has(e)) result.add(e);
            }
            return result;
          }, new Set());

      const newOut = new Set<string>();
      for (const e of newIn) {
        if (!b.kill.has(e)) newOut.add(e);
      }
      for (const e of b.gen) {
        newOut.add(e);
      }

      const prevOut = outSets.get(b.id)!;
      if (newOut.size !== prevOut.size || ![...newOut].every((x) => prevOut.has(x))) {
        changed = true;
      }

      inSets.set(b.id, newIn);
      outSets.set(b.id, newOut);
    }
  }

  return { in: inSets, out: outSets };
}

export function useDefChain(blocks: DataFlowBlock[]): Map<string, { defs: number[]; uses: number[] }> {
  const chains = new Map<string, { defs: number[]; uses: number[] }>();

  const getOrCreate = (name: string) => {
    if (!chains.has(name)) chains.set(name, { defs: [], uses: [] });
    return chains.get(name)!;
  };

  for (const b of blocks) {
    for (const d of b.defs) {
      getOrCreate(d).defs.push(b.id);
    }
    for (const u of b.uses) {
      getOrCreate(u).uses.push(b.id);
    }
  }

  return chains;
}
