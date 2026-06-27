export class BipartiteMatch {
  private adjLeft: number[][];
  private leftSize: number;
  private rightSize: number;

  constructor(leftSize: number, rightSize: number) {
    this.leftSize = leftSize;
    this.rightSize = rightSize;
    this.adjLeft = Array.from({ length: leftSize }, () => []);
  }

  addEdge(left: number, right: number): void {
    this.adjLeft[left].push(right);
  }

  maxMatching(): { size: number; matchLeft: number[]; matchRight: number[] } {
    const matchLeft = new Array(this.leftSize).fill(-1);
    const matchRight = new Array(this.rightSize).fill(-1);
    let size = 0;

    const augment = (u: number, visited: boolean[]): boolean => {
      for (const v of this.adjLeft[u]) {
        if (visited[v]) continue;
        visited[v] = true;
        if (matchRight[v] === -1 || augment(matchRight[v], visited)) {
          matchLeft[u] = v;
          matchRight[v] = u;
          return true;
        }
      }
      return false;
    };

    for (let u = 0; u < this.leftSize; u++) {
      const visited = new Array(this.rightSize).fill(false);
      if (augment(u, visited)) size++;
    }

    return { size, matchLeft, matchRight };
  }

  isPerfect(): boolean {
    const { size } = this.maxMatching();
    return size === Math.min(this.leftSize, this.rightSize);
  }

  isBipartite(adjList: number[][]): boolean {
    const n = adjList.length;
    const color = new Array(n).fill(-1);
    for (let start = 0; start < n; start++) {
      if (color[start] !== -1) continue;
      color[start] = 0;
      const queue = [start];
      while (queue.length > 0) {
        const u = queue.shift()!;
        for (const v of adjList[u]) {
          if (color[v] === -1) {
            color[v] = 1 - color[u];
            queue.push(v);
          } else if (color[v] === color[u]) {
            return false;
          }
        }
      }
    }
    return true;
  }

  vertexCoverSize(): number {
    return this.maxMatching().size;
  }

  independentSetSize(): number {
    return this.leftSize + this.rightSize - this.maxMatching().size;
  }
}
