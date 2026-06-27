interface RopeNode {
  text?: string;
  left?: RopeNode;
  right?: RopeNode;
  weight: number;
  length: number;
}

function makeLeaf(text: string): RopeNode {
  return { text, weight: text.length, length: text.length };
}

function makeConcat(left: RopeNode, right: RopeNode): RopeNode {
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
    this.root = makeLeaf(text);
  }

  get length(): number {
    return this.root.length;
  }

  charAt(index: number): string {
    if (index < 0 || index >= this.root.length) return "";
    return this.charAtNode(this.root, index);
  }

  private charAtNode(node: RopeNode, index: number): string {
    if (node.text !== undefined) {
      return node.text[index];
    }
    if (index < node.weight) {
      return this.charAtNode(node.left!, index);
    }
    return this.charAtNode(node.right!, index - node.weight);
  }

  concat(other: Rope): Rope {
    const result = new Rope();
    result.root = makeConcat(this.root, other.root);
    return result;
  }

  substring(start: number, end?: number): string {
    const e = end ?? this.root.length;
    if (start >= e || start >= this.root.length) return "";
    const chars: string[] = [];
    this.collectRange(this.root, Math.max(0, start), Math.min(e, this.root.length), 0, chars);
    return chars.join("");
  }

  private collectRange(
    node: RopeNode,
    start: number,
    end: number,
    offset: number,
    result: string[],
  ): void {
    if (node.text !== undefined) {
      const localStart = Math.max(0, start - offset);
      const localEnd = Math.min(node.text.length, end - offset);
      if (localStart < localEnd) {
        result.push(node.text.slice(localStart, localEnd));
      }
      return;
    }
    if (start < offset + node.weight && node.left) {
      this.collectRange(node.left, start, end, offset, result);
    }
    if (end > offset + node.weight && node.right) {
      this.collectRange(node.right, start, end, offset + node.weight, result);
    }
  }

  insert(index: number, text: string): Rope {
    const left = this.split(0, index);
    const right = this.split(index, this.root.length);
    const middle = new Rope(text);
    return left.concat(middle).concat(right);
  }

  delete(start: number, end: number): Rope {
    const left = this.split(0, start);
    const right = this.split(end, this.root.length);
    return left.concat(right);
  }

  private split(start: number, end: number): Rope {
    const result = new Rope(this.substring(start, end));
    return result;
  }

  toString(): string {
    return this.substring(0, this.root.length);
  }

  static fromChunks(chunks: string[]): Rope {
    if (chunks.length === 0) return new Rope("");
    if (chunks.length === 1) return new Rope(chunks[0]);

    const mid = Math.floor(chunks.length / 2);
    const left = Rope.fromChunks(chunks.slice(0, mid));
    const right = Rope.fromChunks(chunks.slice(mid));
    return left.concat(right);
  }
}
