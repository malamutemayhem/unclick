import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function hammingDistance(args: Record<string, unknown>) {
  const textA = typeof args.text_a === "string" ? args.text_a : "";
  const textB = typeof args.text_b === "string" ? args.text_b : "";
  if (!textA || !textB) return { error: "Both text_a and text_b are required" };
  if (textA.length !== textB.length) {
    return { error: "Strings must be the same length for Hamming distance (text_a: " + textA.length + ", text_b: " + textB.length + ")" };
  }

  let distance = 0;
  const positions: number[] = [];
  for (let i = 0; i < textA.length; i++) {
    if (textA[i] !== textB[i]) {
      distance++;
      positions.push(i);
    }
  }

  const similarity = textA.length > 0 ? 1 - distance / textA.length : 1;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Hamming distance counts positions where characters differ"],
  };
  return stampMeta({
    distance,
    length: textA.length,
    similarity: +similarity.toFixed(4),
    differing_positions: positions.length <= 50 ? positions : positions.slice(0, 50),
  }, meta);
}
