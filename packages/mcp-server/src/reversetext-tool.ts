import { stampMeta } from "./connector-meta.js";

export async function reverseText(args: Record<string, unknown>) {
  const text = String(args.text ?? "").trim();
  if (!text) return { error: "text is required" };
  const mode = String(args.mode ?? "characters").toLowerCase();
  let result: string;
  switch (mode) {
    case "characters": case "chars":
      result = Array.from(text).reverse().join("");
      break;
    case "words":
      result = text.split(/\s+/).reverse().join(" ");
      break;
    case "lines":
      result = text.split("\n").reverse().join("\n");
      break;
    case "sentences":
      result = text.split(/(?<=[.!?])\s+/).reverse().join(" ");
      break;
    default:
      return { error: "mode must be: characters, words, lines, or sentences" };
  }
  const isPalindrome = text.toLowerCase().replace(/[^a-z0-9]/g, "") ===
    Array.from(text.toLowerCase().replace(/[^a-z0-9]/g, "")).reverse().join("");
  return stampMeta({
    input: text, output: result, mode,
    is_palindrome: isPalindrome,
    length: text.length,
  }, {
    source: "local text reverser",
    fetched_at: new Date().toISOString(),
    next_steps: ["modes: characters, words, lines, sentences", "is_palindrome checks if text reads same forwards and backwards"],
  });
}
