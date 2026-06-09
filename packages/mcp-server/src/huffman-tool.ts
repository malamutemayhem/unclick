import { stampMeta, ConnectorMeta } from "./connector-meta.js";

interface HuffNode {
  char?: string;
  freq: number;
  left?: HuffNode;
  right?: HuffNode;
}

export async function huffmanCode(args: Record<string, unknown>) {
  const text = String(args.text ?? "");
  if (!text) throw new Error("text is required.");
  if (text.length > 100000) throw new Error("Text must be 100000 characters or fewer.");

  const freq = new Map<string, number>();
  for (const ch of text) freq.set(ch, (freq.get(ch) ?? 0) + 1);

  if (freq.size === 1) {
    const ch = [...freq.keys()][0];
    const meta: ConnectorMeta = {
      source: "local-computation",
      fetched_at: new Date().toISOString(),
      next_steps: ["Single character; code is trivially '0'"],
    };
    return stampMeta({
      text_length: text.length,
      unique_chars: 1,
      codes: { [ch]: "0" },
      encoded_bits: text.length,
      original_bits: text.length * 8,
      compression_ratio: Math.round((1 / 8) * 1e4) / 1e4,
    }, meta);
  }

  const nodes: HuffNode[] = [...freq.entries()].map(([char, f]) => ({ char, freq: f }));

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.freq - b.freq);
    const left = nodes.shift()!;
    const right = nodes.shift()!;
    nodes.push({ freq: left.freq + right.freq, left, right });
  }

  const codes = new Map<string, string>();
  const buildCodes = (node: HuffNode, prefix: string) => {
    if (node.char !== undefined) {
      codes.set(node.char, prefix);
      return;
    }
    if (node.left) buildCodes(node.left, prefix + "0");
    if (node.right) buildCodes(node.right, prefix + "1");
  };
  buildCodes(nodes[0], "");

  let encodedBits = 0;
  for (const [char, count] of freq) {
    encodedBits += codes.get(char)!.length * count;
  }
  const originalBits = text.length * 8;

  const codeTable: Record<string, string> = {};
  const sortedChars = [...codes.entries()].sort((a, b) => a[1].length - b[1].length || a[0].localeCompare(b[0]));
  for (const [char, code] of sortedChars) {
    const displayChar = char === " " ? "<space>" : char === "\n" ? "<newline>" : char === "\t" ? "<tab>" : char;
    codeTable[displayChar] = code;
  }

  const entropy = [...freq.values()].reduce((sum, f) => {
    const p = f / text.length;
    return sum - p * Math.log2(p);
  }, 0);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Lower compression_ratio means better compression", "Entropy is the theoretical lower bound"],
  };
  return stampMeta({
    text_length: text.length,
    unique_chars: freq.size,
    codes: codeTable,
    encoded_bits: encodedBits,
    original_bits: originalBits,
    compression_ratio: Math.round((encodedBits / originalBits) * 1e4) / 1e4,
    avg_bits_per_char: Math.round((encodedBits / text.length) * 1e4) / 1e4,
    entropy: Math.round(entropy * 1e6) / 1e6,
  }, meta);
}
