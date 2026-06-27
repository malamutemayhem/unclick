interface RopeNode {
  text?: string;
  left?: RopeNode;
  right?: RopeNode;
  weight: number;
  length: number;
}

function leaf(text: string): RopeNode {
  return { text, weight: text.length, length: text.length };
}

function branch(left: RopeNode, right: RopeNode): RopeNode {
  return {
    left,
    right,
    weight: left.length,
    length: left.length + right.length,
  };
}

export class Rope {
  private root: RopeNode;

  constructor(text = "") {
    this.root = leaf(text);
  }

  get length(): number {
    return this.root.length;
  }

  charAt(index: number): string {
    return this.charAtNode(this.root, index);
  }

  toString(): string {
    return this.collect(this.root);
  }

  concat(other: Rope): Rope {
    const result = new Rope();
    result.root = branch(this.root, other.root);
    return result;
  }

  slice(start: number, end?: number): string {
    const e = end ?? this.length;
    const chars: string[] = [];
    this.sliceNode(this.root, start, e, 0, chars);
    return chars.join("");
  }

  insert(index: number, text: string): Rope {
    const left = this.splitAt(this.root, index);
    const right = this.splitFrom(this.root, index);
    const result = new Rope();
    result.root = branch(branch(left, leaf(text)), right);
    return result;
  }

  delete(start: number, end: number): Rope {
    const left = this.splitAt(this.root, start);
    const right = this.splitFrom(this.root, end);
    const result = new Rope();
    result.root = branch(left, right);
    return result;
  }

  private charAtNode(node: RopeNode, index: number): string {
    if (node.text !== undefined) return node.text[index] ?? "";
    if (index < node.weight) return this.charAtNode(node.left!, index);
    return this.charAtNode(node.right!, index - node.weight);
  }

  private collect(node: RopeNode): string {
    if (node.text !== undefined) return node.text;
    return this.collect(node.left!) + this.collect(node.right!);
  }

  private sliceNode(
    node: RopeNode,
    start: number,
    end: number,
    offset: number,
    result: string[]
  ): void {
    if (offset >= end || offset + node.length <= start) return;
    if (node.text !== undefined) {
      const s = Math.max(0, start - offset);
      const e = Math.min(node.text.length, end - offset);
      result.push(node.text.slice(s, e));
      return;
    }
    this.sliceNode(node.left!, start, end, offset, result);
    this.sliceNode(node.right!, start, end, offset + node.weight, result);
  }

  private splitAt(node: RopeNode, index: number): RopeNode {
    if (index <= 0) return leaf("");
    if (index >= node.length) return node;
    if (node.text !== undefined) return leaf(node.text.slice(0, index));
    if (index <= node.weight) {
      return this.splitAt(node.left!, index);
    }
    return branch(node.left!, this.splitAt(node.right!, index - node.weight));
  }

  private splitFrom(node: RopeNode, index: number): RopeNode {
    if (index <= 0) return node;
    if (index >= node.length) return leaf("");
    if (node.text !== undefined) return leaf(node.text.slice(index));
    if (index >= node.weight) {
      return this.splitFrom(node.right!, index - node.weight);
    }
    return branch(this.splitFrom(node.left!, index), node.right!);
  }
}
