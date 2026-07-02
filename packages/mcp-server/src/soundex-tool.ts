import { stampMeta, ConnectorMeta } from "./connector-meta.js";

function soundex(word: string): string {
  const upper = word.toUpperCase().replace(/[^A-Z]/g, "");
  if (!upper) return "";
  const map: Record<string, string> = {
    B: "1", F: "1", P: "1", V: "1",
    C: "2", G: "2", J: "2", K: "2", Q: "2", S: "2", X: "2", Z: "2",
    D: "3", T: "3",
    L: "4",
    M: "5", N: "5",
    R: "6",
  };
  let code = upper[0];
  let prev = map[upper[0]] || "0";
  for (let i = 1; i < upper.length; i++) {
    const c = map[upper[i]] || "0";
    if (c !== "0" && c !== prev) code += c;
    prev = c;
  }
  return (code + "000").slice(0, 4);
}

export async function soundexEncode(args: Record<string, unknown>) {
  const text = typeof args.text === "string" ? args.text.trim() : "";
  if (!text) return { error: "text is required" };

  const words = text.split(/\s+/);
  const codes = words.map((w) => ({ word: w, soundex: soundex(w) }));

  const compare = typeof args.compare === "string" ? args.compare.trim() : "";
  let match: boolean | null = null;
  if (compare) {
    const a = soundex(words[0]);
    const b = soundex(compare);
    match = a === b;
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use compare parameter to check if two names sound alike"],
  };
  return stampMeta({ codes, ...(match !== null ? { match, compare } : {}) }, meta);
}
