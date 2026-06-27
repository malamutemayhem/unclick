interface RopeNode {
  left: RopeNode | null;
  right: RopeNode | null;
  text: string;
  weight: number;
  length: number;
}

export class RopeBuffer {
  private root: RopeNode;

  constructor(text = "") {
    this.root = this.makeLeaf(text);
  }

  private makeLeaf(text: string): RopeNode {
    return { left: null, right: null, text, weight: text.length, length: text.length };
  }

  private makeInternal(left: RopeNode, right: RopeNode): RopeNode {
    return {
      left,
      right,
      text: "",
      weight: left.length,
      length: left.length + right.length,
    };
  }

  length(): number {
    return this.root.length;
  }

  charAt(index: number): string {
    return this.charAtNode(this.root, index);
  }

  private charAtNode(node: RopeNode, index: number): string {
    if (!node.left && !node.right) {
      return node.text[index];
    }
    if (index < node.weight) {
      return this.charAtNode(node.left!, index);
    }
    return this.charAtNode(node.right!, index - node.weight);
  }

  insert(index: number, text: string): void {
    if (text.length === 0) return;
    const [left, right] = this.split(this.root, index);
    const newLeaf = this.makeLeaf(text);
    this.root = this.makeInternal(this.makeInternal(left, newLeaf), right);
  }

  delete(start: number, length: number): void {
    if (length <= 0) return;
    const [left, rest] = this.split(this.root, start);
    const [, right] = this.split(rest, length);
    this.root = this.makeInternal(left, right);
  }

  substring(start: number, end: number): string {
    const result: string[] = [];
    this.collectRange(this.root, start, end, 0, result);
    return result.join("");
  }

  private collectRange(node: RopeNode, start: number, end: number, offset: number, result: string[]): void {
    if (offset >= end || offset + node.length <= start) return;
    if (!node.left && !node.right) {
      const lo = Math.max(0, start - offset);
      const hi = Math.min(node.text.length, end - offset);
      result.push(node.text.slice(lo, hi));
      return;
    }
    if (node.left) this.collectRange(node.left, start, end, offset, result);
    if (node.right) this.collectRange(node.right, start, end, offset + node.weight, result);
  }

  private split(node: RopeNode, index: number): [RopeNode, RopeNode] {
    if (!node.left && !node.right) {
      return [this.makeLeaf(node.text.slice(0, index)), this.makeLeaf(node.text.slice(index))];
    }
    if (index <= node.weight) {
      const [ll, lr] = this.split(node.left!, index);
      return [ll, this.makeInternal(lr, node.right!)];
    }
    const [rl, rr] = this.split(node.right!, index - node.weight);
    return [this.makeInternal(node.left!, rl), rr];
  }

  toString(): string {
    return this.substring(0, this.length());
  }

  append(text: string): void {
    this.root = this.makeInternal(this.root, this.makeLeaf(text));
  }

  prepend(text: string): void {
    this.root = this.makeInternal(this.makeLeaf(text), this.root);
  }
}
