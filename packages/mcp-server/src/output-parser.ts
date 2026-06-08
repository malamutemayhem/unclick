export interface ParsedOutput<T = unknown> {
  success: boolean;
  value?: T;
  raw: string;
  error?: string;
}

export function parseJson<T = unknown>(text: string): ParsedOutput<T> {
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/) || text.match(/(\{[\s\S]*\})/);
  if (!jsonMatch) return { success: false, raw: text, error: "No JSON found" };
  try {
    const value = JSON.parse(jsonMatch[1].trim()) as T;
    return { success: true, value, raw: text };
  } catch (err) {
    return { success: false, raw: text, error: `JSON parse error: ${err instanceof Error ? err.message : String(err)}` };
  }
}

export function parseList(text: string): ParsedOutput<string[]> {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const items = lines
    .map((l) => l.replace(/^[-*\d.)\]]+\s*/, "").trim())
    .filter(Boolean);
  if (items.length === 0) return { success: false, raw: text, error: "No list items found" };
  return { success: true, value: items, raw: text };
}

export function parseKeyValue(text: string): ParsedOutput<Record<string, string>> {
  const result: Record<string, string> = {};
  const lines = text.split("\n").filter(Boolean);
  for (const line of lines) {
    const match = line.match(/^\s*([^:=]+?)\s*[:=]\s*(.+?)\s*$/);
    if (match) result[match[1]] = match[2];
  }
  if (Object.keys(result).length === 0) return { success: false, raw: text, error: "No key-value pairs found" };
  return { success: true, value: result, raw: text };
}

export function parseBoolean(text: string): ParsedOutput<boolean> {
  const lower = text.toLowerCase().trim();
  const yesWords = ["yes", "true", "correct", "affirmative", "absolutely", "indeed"];
  const noWords = ["no", "false", "incorrect", "negative", "nope"];
  for (const w of yesWords) {
    if (lower.startsWith(w)) return { success: true, value: true, raw: text };
  }
  for (const w of noWords) {
    if (lower.startsWith(w)) return { success: true, value: false, raw: text };
  }
  return { success: false, raw: text, error: "Could not determine boolean value" };
}

export function parseNumber(text: string): ParsedOutput<number> {
  const match = text.match(/-?\d+(?:\.\d+)?/);
  if (!match) return { success: false, raw: text, error: "No number found" };
  return { success: true, value: parseFloat(match[0]), raw: text };
}

export function extractBetween(text: string, start: string, end: string): ParsedOutput<string> {
  const startIdx = text.indexOf(start);
  if (startIdx === -1) return { success: false, raw: text, error: `Start marker "${start}" not found` };
  const afterStart = startIdx + start.length;
  const endIdx = text.indexOf(end, afterStart);
  if (endIdx === -1) return { success: false, raw: text, error: `End marker "${end}" not found` };
  return { success: true, value: text.slice(afterStart, endIdx).trim(), raw: text };
}

export function parseCodeBlock(text: string, language?: string): ParsedOutput<string> {
  const pattern = language
    ? new RegExp("```" + language + "\\s*([\\s\\S]*?)```")
    : /```(?:\w+)?\s*([\s\S]*?)```/;
  const match = text.match(pattern);
  if (!match) return { success: false, raw: text, error: "No code block found" };
  return { success: true, value: match[1].trim(), raw: text };
}
