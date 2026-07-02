import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function jaccardSimilarity(args: Record<string, unknown>) {
  const textA = typeof args.text_a === "string" ? args.text_a.trim() : "";
  const textB = typeof args.text_b === "string" ? args.text_b.trim() : "";
  if (!textA || !textB) return { error: "Both text_a and text_b are required" };

  const mode = args.mode === "character" ? "character" : "word";

  let setA: Set<string>;
  let setB: Set<string>;

  if (mode === "character") {
    setA = new Set([...textA.toLowerCase()]);
    setB = new Set([...textB.toLowerCase()]);
  } else {
    setA = new Set((textA.toLowerCase().match(/[\w'-]+/g) || []) as string[]);
    setB = new Set((textB.toLowerCase().match(/[\w'-]+/g) || []) as string[]);
  }

  const intersection = new Set([...setA].filter((x) => setB.has(x)));
  const union = new Set([...setA, ...setB]);

  const similarity = union.size > 0 ? intersection.size / union.size : 0;
  const distance = 1 - similarity;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use mode: character for character-level comparison", "Closer to 1.0 means more similar"],
  };
  return stampMeta({
    similarity: +similarity.toFixed(4),
    distance: +distance.toFixed(4),
    intersection_size: intersection.size,
    union_size: union.size,
    set_a_size: setA.size,
    set_b_size: setB.size,
    mode,
  }, meta);
}
