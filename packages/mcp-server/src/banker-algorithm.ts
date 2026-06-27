export class BankerAlgorithm {
  private available: number[];
  private max: number[][];
  private allocation: number[][];
  private need: number[][];
  private n: number;
  private m: number;

  constructor(available: number[], max: number[][], allocation: number[][]) {
    this.available = [...available];
    this.max = max.map((r) => [...r]);
    this.allocation = allocation.map((r) => [...r]);
    this.n = max.length;
    this.m = available.length;
    this.need = Array.from({ length: this.n }, (_, i) =>
      Array.from({ length: this.m }, (__, j) => this.max[i][j] - this.allocation[i][j])
    );
  }

  isSafe(): boolean {
    return this.safeSequence() !== null;
  }

  safeSequence(): number[] | null {
    const work = [...this.available];
    const finish = new Array(this.n).fill(false);
    const seq: number[] = [];

    for (let count = 0; count < this.n; count++) {
      let found = false;
      for (let i = 0; i < this.n; i++) {
        if (finish[i]) continue;
        if (this.need[i].every((need, j) => need <= work[j])) {
          for (let j = 0; j < this.m; j++) {
            work[j] += this.allocation[i][j];
          }
          finish[i] = true;
          seq.push(i);
          found = true;
          break;
        }
      }
      if (!found) return null;
    }
    return seq;
  }

  canRequest(process: number, request: number[]): boolean {
    for (let j = 0; j < this.m; j++) {
      if (request[j] > this.need[process][j]) return false;
      if (request[j] > this.available[j]) return false;
    }

    const savedAvail = [...this.available];
    const savedAlloc = [...this.allocation[process]];
    const savedNeed = [...this.need[process]];

    for (let j = 0; j < this.m; j++) {
      this.available[j] -= request[j];
      this.allocation[process][j] += request[j];
      this.need[process][j] -= request[j];
    }

    const safe = this.isSafe();

    this.available = savedAvail;
    this.allocation[process] = savedAlloc;
    this.need[process] = savedNeed;

    return safe;
  }

  processCount(): number {
    return this.n;
  }

  resourceCount(): number {
    return this.m;
  }
}
