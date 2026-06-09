interface STNode {
  children: Map<string, STEdge>;
  suffixLink: STNode | null;
  start: number;
  end: number;
  suffixIndex: number;
}

interface STEdge {
  node: STNode;
  start: number;
  end: number;
}

export class SuffixTree {
  private text: string;
  private root: STNode;
  private nodes: STNode[] = [];

  constructor(text: string) {
    this.text = text + "$";
    this.root = this.createNode(-1, -1);
    this.build();
  }

  private createNode(start: number, end: number): STNode {
    const node: STNode = {
      children: new Map(),
      suffixLink: null,
      start,
      end,
      suffixIndex: -1,
    };
    this.nodes.push(node);
    return node;
  }

  private build(): void {
    const n = this.text.length;
    for (let i = 0; i < n; i++) {
      this.addSuffix(i);
    }
    this.setSuffixIndices(this.root, 0);
  }

  private addSuffix(suffixStart: number): void {
    const suffix = this.text.slice(suffixStart);
    let node = this.root;
    let i = 0;

    while (i < suffix.length) {
      const ch = suffix[i];
      if (node.children.has(ch)) {
        const edge = node.children.get(ch)!;
        const edgeStr = this.text.slice(edge.start, edge.end);
        let j = 0;
        while (j < edgeStr.length && i < suffix.length && edgeStr[j] === suffix[i]) {
          j++;
          i++;
        }
        if (j === edgeStr.length) {
          node = edge.node;
        } else {
          const mid = this.createNode(-1, -1);
          const oldEdge = edge;
          node.children.set(ch, { node: mid, start: oldEdge.start, end: oldEdge.start + j });
          mid.children.set(this.text[oldEdge.start + j], {
            node: oldEdge.node,
            start: oldEdge.start + j,
            end: oldEdge.end,
          });
          const leaf = this.createNode(suffixStart + i, this.text.length);
          mid.children.set(suffix[i], { node: leaf, start: suffixStart + i, end: this.text.length });
          i = suffix.length;
        }
      } else {
        const leaf = this.createNode(suffixStart + i, this.text.length);
        node.children.set(ch, { node: leaf, start: suffixStart + i, end: this.text.length });
        i = suffix.length;
      }
    }
  }

  private setSuffixIndices(node: STNode, depth: number): void {
    if (node.children.size === 0) {
      node.suffixIndex = this.text.length - depth;
      return;
    }
    for (const [, edge] of node.children) {
      this.setSuffixIndices(edge.node, depth + (edge.end - edge.start));
    }
  }

  contains(pattern: string): boolean {
    return this.findNode(pattern) !== null;
  }

  findAll(pattern: string): number[] {
    const node = this.findNode(pattern);
    if (!node) return [];
    const indices: number[] = [];
    this.collectIndices(node.node, indices);
    return indices.sort((a, b) => a - b);
  }

  countOccurrences(pattern: string): number {
    return this.findAll(pattern).length;
  }

  longestRepeatedSubstring(): string {
    let longest = "";
    const dfs = (node: STNode, depth: number, path: string): void => {
      if (node.children.size === 0) return;
      for (const [, edge] of node.children) {
        const edgeLabel = this.text.slice(edge.start, edge.end);
        const newPath = path + edgeLabel;
        const newDepth = depth + edgeLabel.length;
        if (edge.node.children.size > 0 && newDepth > longest.length) {
          longest = newPath;
        }
        dfs(edge.node, newDepth, newPath);
      }
    };
    dfs(this.root, 0, "");
    if (longest.endsWith("$")) longest = longest.slice(0, -1);
    return longest;
  }

  suffixes(): string[] {
    const result: string[] = [];
    const original = this.text.slice(0, -1);
    for (let i = 0; i < original.length; i++) {
      result.push(original.slice(i));
    }
    return result;
  }

  private findNode(pattern: string): { node: STNode; depth: number } | null {
    let node = this.root;
    let i = 0;
    while (i < pattern.length) {
      const ch = pattern[i];
      if (!node.children.has(ch)) return null;
      const edge = node.children.get(ch)!;
      const edgeStr = this.text.slice(edge.start, edge.end);
      let j = 0;
      while (j < edgeStr.length && i < pattern.length) {
        if (edgeStr[j] !== pattern[i]) return null;
        j++;
        i++;
      }
      node = edge.node;
    }
    return { node, depth: i };
  }

  private collectIndices(node: STNode, indices: number[]): void {
    if (node.suffixIndex >= 0 && node.suffixIndex < this.text.length - 1) {
      indices.push(node.suffixIndex);
    }
    for (const [, edge] of node.children) {
      this.collectIndices(edge.node, indices);
    }
  }
}

export function longestCommonSubstring(a: string, b: string): string {
  const combined = a + "#" + b + "$";
  const tree = new SuffixTree(a);
  let best = "";
  for (let len = Math.min(a.length, b.length); len > 0; len--) {
    for (let i = 0; i <= b.length - len; i++) {
      const sub = b.slice(i, i + len);
      if (tree.contains(sub) && sub.length > best.length) {
        best = sub;
        return best;
      }
    }
  }
  return best;
}
