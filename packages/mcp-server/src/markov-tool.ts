import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function markovGenerate(args: Record<string, unknown>) {
  const text = typeof args.text === "string" ? args.text.trim() : "";
  if (!text) return { error: "text is required (training corpus)" };

  const order = typeof args.order === "number" && args.order >= 1 ? Math.floor(args.order) : 2;
  const length = typeof args.length === "number" && args.length >= 1 ? Math.floor(args.length) : 50;
  const mode = args.mode === "character" ? "character" : "word";

  let output: string;

  if (mode === "word") {
    const words = text.split(/\s+/);
    if (words.length <= order) return { error: "Text too short for the given order" };

    const chain: Record<string, string[]> = {};
    for (let i = 0; i <= words.length - order - 1; i++) {
      const key = words.slice(i, i + order).join(" ");
      const next = words[i + order];
      if (!chain[key]) chain[key] = [];
      chain[key].push(next);
    }

    const keys = Object.keys(chain);
    if (keys.length === 0) return { error: "Could not build chain from input" };

    let current = keys[Math.floor(Math.random() * keys.length)];
    const result = current.split(" ");

    for (let i = 0; i < length - order; i++) {
      const options = chain[current];
      if (!options) break;
      const next = options[Math.floor(Math.random() * options.length)];
      result.push(next);
      current = result.slice(result.length - order).join(" ");
    }
    output = result.join(" ");
  } else {
    const chars = [...text];
    if (chars.length <= order) return { error: "Text too short for the given order" };

    const chain: Record<string, string[]> = {};
    for (let i = 0; i <= chars.length - order - 1; i++) {
      const key = chars.slice(i, i + order).join("");
      const next = chars[i + order];
      if (!chain[key]) chain[key] = [];
      chain[key].push(next);
    }

    const keys = Object.keys(chain);
    if (keys.length === 0) return { error: "Could not build chain from input" };

    let current = keys[Math.floor(Math.random() * keys.length)];
    const result = [...current];

    for (let i = 0; i < length - order; i++) {
      const options = chain[current];
      if (!options) break;
      const next = options[Math.floor(Math.random() * options.length)];
      result.push(next);
      current = result.slice(result.length - order).join("");
    }
    output = result.join("");
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Increase order for more coherent output", "Use mode: character for letter-level generation"],
  };
  return stampMeta({ output, mode, order, requested_length: length }, meta);
}
