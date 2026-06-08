interface HuffNode {
  char?: string;
  freq: number;
  left?: HuffNode;
  right?: HuffNode;
}

export function buildTree(text: string): HuffNode | null {
  if (text.length === 0) return null;
  const freq = new Map<string, number>();
  for (const ch of text) freq.set(ch, (freq.get(ch) ?? 0) + 1);

  const nodes: HuffNode[] = [...freq.entries()].map(([char, f]) => ({ char, freq: f }));
  if (nodes.length === 1) {
    return { freq: nodes[0].freq, left: nodes[0] };
  }

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.freq - b.freq);
    const left = nodes.shift()!;
    const right = nodes.shift()!;
    nodes.push({ freq: left.freq + right.freq, left, right });
  }
  return nodes[0];
}

export function buildCodeTable(root: HuffNode | null): Map<string, string> {
  const codes = new Map<string, string>();
  if (!root) return codes;

  function walk(node: HuffNode, prefix: string): void {
    if (node.char !== undefined) {
      codes.set(node.char, prefix || "0");
      return;
    }
    if (node.left) walk(node.left, prefix + "0");
    if (node.right) walk(node.right, prefix + "1");
  }
  walk(root, "");
  return codes;
}

export function encode(text: string): { bits: string; tree: HuffNode | null } {
  const tree = buildTree(text);
  const codes = buildCodeTable(tree);
  let bits = "";
  for (const ch of text) bits += codes.get(ch);
  return { bits, tree };
}

export function decode(bits: string, tree: HuffNode | null): string {
  if (!tree) return "";
  if (tree.char !== undefined) return tree.char.repeat(bits.length);

  let result = "";
  let node = tree;
  for (const bit of bits) {
    node = bit === "0" ? node.left! : node.right!;
    if (node.char !== undefined) {
      result += node.char;
      node = tree;
    }
  }
  return result;
}
