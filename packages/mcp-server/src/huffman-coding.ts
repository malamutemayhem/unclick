interface HuffmanNode {
  char: string | null;
  freq: number;
  left: HuffmanNode | null;
  right: HuffmanNode | null;
}

export class HuffmanCoding {
  static buildTree(text: string): HuffmanNode | null {
    if (text.length === 0) return null;

    const freq = new Map<string, number>();
    for (const ch of text) freq.set(ch, (freq.get(ch) || 0) + 1);

    const nodes: HuffmanNode[] = [...freq.entries()].map(([char, f]) => ({
      char, freq: f, left: null, right: null,
    }));

    if (nodes.length === 1) {
      return { char: null, freq: nodes[0].freq, left: nodes[0], right: null };
    }

    while (nodes.length > 1) {
      nodes.sort((a, b) => a.freq - b.freq);
      const left = nodes.shift()!;
      const right = nodes.shift()!;
      nodes.push({ char: null, freq: left.freq + right.freq, left, right });
    }

    return nodes[0];
  }

  static buildCodes(root: HuffmanNode | null): Map<string, string> {
    const codes = new Map<string, string>();
    if (!root) return codes;

    const traverse = (node: HuffmanNode, prefix: string): void => {
      if (node.char !== null) {
        codes.set(node.char, prefix || "0");
        return;
      }
      if (node.left) traverse(node.left, prefix + "0");
      if (node.right) traverse(node.right, prefix + "1");
    };

    traverse(root, "");
    return codes;
  }

  static encode(text: string): { encoded: string; codes: Map<string, string> } {
    const tree = this.buildTree(text);
    const codes = this.buildCodes(tree);
    let encoded = "";
    for (const ch of text) encoded += codes.get(ch)!;
    return { encoded, codes };
  }

  static decode(encoded: string, codes: Map<string, string>): string {
    const reverse = new Map<string, string>();
    for (const [char, code] of codes) reverse.set(code, char);

    let result = "";
    let current = "";
    for (const bit of encoded) {
      current += bit;
      if (reverse.has(current)) {
        result += reverse.get(current)!;
        current = "";
      }
    }
    return result;
  }

  static compressionRatio(text: string): number {
    if (text.length === 0) return 0;
    const { encoded } = this.encode(text);
    const originalBits = text.length * 8;
    return encoded.length / originalBits;
  }
}
