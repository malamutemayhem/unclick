export interface QuorumConfig {
  nodes: number;
  readQuorum: number;
  writeQuorum: number;
}

export function strictQuorum(n: number): QuorumConfig {
  const w = Math.floor(n / 2) + 1;
  const r = Math.floor(n / 2) + 1;
  return { nodes: n, readQuorum: r, writeQuorum: w };
}

export function readHeavyQuorum(n: number): QuorumConfig {
  return { nodes: n, readQuorum: 1, writeQuorum: n };
}

export function writeHeavyQuorum(n: number): QuorumConfig {
  return { nodes: n, readQuorum: n, writeQuorum: 1 };
}

export function customQuorum(n: number, r: number, w: number): QuorumConfig | null {
  if (r + w <= n) return null;
  if (r < 1 || w < 1 || r > n || w > n) return null;
  return { nodes: n, readQuorum: r, writeQuorum: w };
}

export function isStrongConsistency(config: QuorumConfig): boolean {
  return config.readQuorum + config.writeQuorum > config.nodes;
}

export function faultTolerance(config: QuorumConfig): { readFaults: number; writeFaults: number } {
  return {
    readFaults: config.nodes - config.readQuorum,
    writeFaults: config.nodes - config.writeQuorum,
  };
}

export function availabilityScore(config: QuorumConfig, failProb: number): { readAvail: number; writeAvail: number } {
  const n = config.nodes;

  function binomial(total: number, k: number): number {
    if (k > total || k < 0) return 0;
    if (k === 0 || k === total) return 1;
    let result = 1;
    for (let i = 0; i < k; i++) {
      result = (result * (total - i)) / (i + 1);
    }
    return result;
  }

  function probAtLeast(total: number, needed: number, p: number): number {
    let sum = 0;
    for (let k = needed; k <= total; k++) {
      sum += binomial(total, k) * Math.pow(1 - p, k) * Math.pow(p, total - k);
    }
    return sum;
  }

  return {
    readAvail: probAtLeast(n, config.readQuorum, failProb),
    writeAvail: probAtLeast(n, config.writeQuorum, failProb),
  };
}

export class SloppyQuorum {
  private preferenceList: string[];
  private n: number;
  private r: number;
  private w: number;

  constructor(preferenceList: string[], n: number, r: number, w: number) {
    this.preferenceList = [...preferenceList];
    this.n = n;
    this.r = r;
    this.w = w;
  }

  getWriteNodes(aliveNodes: Set<string>): string[] {
    const result: string[] = [];
    for (const node of this.preferenceList) {
      if (aliveNodes.has(node)) {
        result.push(node);
        if (result.length >= this.w) break;
      }
    }
    return result;
  }

  getReadNodes(aliveNodes: Set<string>): string[] {
    const result: string[] = [];
    for (const node of this.preferenceList) {
      if (aliveNodes.has(node)) {
        result.push(node);
        if (result.length >= this.r) break;
      }
    }
    return result;
  }

  canWrite(aliveNodes: Set<string>): boolean {
    return this.getWriteNodes(aliveNodes).length >= this.w;
  }

  canRead(aliveNodes: Set<string>): boolean {
    return this.getReadNodes(aliveNodes).length >= this.r;
  }

  hintedHandoff(originalNode: string, aliveNodes: Set<string>): string | null {
    if (aliveNodes.has(originalNode)) return null;
    for (const node of this.preferenceList) {
      if (node !== originalNode && aliveNodes.has(node)) return node;
    }
    return null;
  }

  get replicationFactor(): number {
    return this.n;
  }

  get readQuorum(): number {
    return this.r;
  }

  get writeQuorum(): number {
    return this.w;
  }
}
