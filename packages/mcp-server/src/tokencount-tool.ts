import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function tokencountEstimate(args: Record<string, unknown>) {
  const text = typeof args.text === "string" ? args.text : "";
  if (!text) return { error: "text is required" };

  const chars = text.length;
  const words = (text.match(/[\w'-]+/g) || []).length;

  // Rough heuristics for different tokenizer families
  const gpt4Estimate = Math.ceil(chars / 4);
  const claudeEstimate = Math.ceil(chars / 3.5);
  const wordPieceEstimate = Math.ceil(words * 1.3);

  const lines = text.split(/\r?\n/).length;
  const whitespace = (text.match(/\s/g) || []).length;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["These are rough estimates - actual counts depend on the specific tokenizer"],
  };
  return stampMeta({
    characters: chars,
    words,
    lines,
    whitespace_chars: whitespace,
    estimated_tokens: {
      gpt4_approx: gpt4Estimate,
      claude_approx: claudeEstimate,
      wordpiece_approx: wordPieceEstimate,
    },
  }, meta);
}
