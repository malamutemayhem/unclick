import { stampMeta } from "./connector-meta.js";

function toWords(text: string): string[] {
  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_\-./]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

export async function stringCase(args: Record<string, unknown>) {
  const text = String(args.text ?? "").trim();
  if (!text) return { error: "text is required" };
  const words = toWords(text);
  const lower = words.map(w => w.toLowerCase());
  return stampMeta({
    original: text,
    camelCase: lower[0] + lower.slice(1).map(w => w[0].toUpperCase() + w.slice(1)).join(""),
    PascalCase: lower.map(w => w[0].toUpperCase() + w.slice(1)).join(""),
    snake_case: lower.join("_"),
    kebab_case: lower.join("-"),
    SCREAMING_SNAKE: lower.map(w => w.toUpperCase()).join("_"),
    "Title Case": lower.map(w => w[0].toUpperCase() + w.slice(1)).join(" "),
    dot_case: lower.join("."),
    word_count: words.length,
  }, {
    source: "local string case converter",
    fetched_at: new Date().toISOString(),
    next_steps: ["pick the case style that fits your naming convention", "word_count shows how many tokens were detected"],
  });
}
