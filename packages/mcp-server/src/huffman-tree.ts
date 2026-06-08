export interface HuffmanNode {
  char: string | null;
  freq: number;
  left: HuffmanNode | null;
  right: HuffmanNode | null;
}

export interface HuffmanResult {
  codes: Record<string, string>;
  tree: HuffmanNode;
  encodedLength: number;
  originalLength: number;
}

export class HuffmanCoder {
  static buildFrequencyTable(text: string): Map<string, number> {
    const freq = new Map<string, number>();
    for (const ch of text) {
      freq.set(ch, (freq.get(ch) || 0) + 1);
    }
    return freq;
  }

  static buildTree(freq: Map<string, number>): HuffmanNode {
    const nodes: HuffmanNode[] = Array.from(freq.entries()).map(([char, f]) => ({
      char,
      freq: f,
      left: null,
      right: null,
    }));

    if (nodes.length === 0) {
      return { char: null, freq: 0, left: null, right: null };
    }

    if (nodes.length === 1) {
      return { char: null, freq: nodes[0].freq, left: nodes[0], right: null };
    }

    while (nodes.length > 1) {
      nodes.sort((a, b) => a.freq - b.freq);
      const left = nodes.shift()!;
      const right = nodes.shift()!;
      nodes.push({
        char: null,
        freq: left.freq + right.freq,
        left,
        right,
      });
    }

    return nodes[0];
  }

  static generateCodes(root: HuffmanNode): Record<string, string> {
    const codes: Record<string, string> = {};

    const traverse = (node: HuffmanNode | null, prefix: string) => {
      if (!node) return;
      if (node.char !== null) {
        codes[node.char] = prefix || "0";
        return;
      }
      traverse(node.left, prefix + "0");
      traverse(node.right, prefix + "1");
    };

    traverse(root, "");
    return codes;
  }

  static encode(text: string): HuffmanResult {
    const freq = HuffmanCoder.buildFrequencyTable(text);
    const tree = HuffmanCoder.buildTree(freq);
    const codes = HuffmanCoder.generateCodes(tree);

    let encodedLength = 0;
    for (const ch of text) {
      encodedLength += codes[ch].length;
    }

    return {
      codes,
      tree,
      encodedLength,
      originalLength: text.length * 8,
    };
  }

  static encodeString(text: string, codes: Record<string, string>): string {
    return text.split("").map((ch) => codes[ch]).join("");
  }

  static decodeString(encoded: string, root: HuffmanNode): string {
    let result = "";
    let current = root;

    for (const bit of encoded) {
      if (bit === "0") {
        current = current.left!;
      } else {
        current = current.right!;
      }

      if (current.char !== null) {
        result += current.char;
        current = root;
      }
    }

    return result;
  }

  static compressionRatio(result: HuffmanResult): number {
    if (result.originalLength === 0) return 1;
    return result.encodedLength / result.originalLength;
  }

  static averageCodeLength(text: string, codes: Record<string, string>): number {
    const freq = HuffmanCoder.buildFrequencyTable(text);
    let totalBits = 0;
    let totalChars = 0;
    for (const [ch, count] of freq.entries()) {
      totalBits += codes[ch].length * count;
      totalChars += count;
    }
    return totalChars === 0 ? 0 : totalBits / totalChars;
  }
}
