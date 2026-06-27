// Tool-call repair utilities.
// LLMs sometimes emit malformed JSON in tool call arguments - truncated
// objects, trailing commas, unquoted keys, or string values where numbers
// are expected. This module attempts lightweight recovery before rejecting
// a call, reducing user-visible failures without masking real schema errors.
//
// Inspired by OpenClaw's tool-call-repair package but adapted to UnClick's
// AJV-based validation pipeline in server.ts.

export interface RepairResult {
  repaired: boolean;
  args: Record<string, unknown>;
  warning?: string;
}

// Strip trailing commas before } or ] (most common LLM JSON defect).
function stripTrailingCommas(raw: string): string {
  return raw.replace(/,\s*([}\]])/g, "$1");
}

// Wrap bare unquoted keys: { foo: "bar" } -> { "foo": "bar" }
function quoteUnquotedKeys(raw: string): string {
  return raw.replace(
    /(?<=^|[{,])\s*([a-zA-Z_]\w*)\s*:/gm,
    (_, key) => `"${key}":`,
  );
}

// Attempt to close truncated JSON (missing closing braces/brackets).
function closeTruncated(raw: string): string {
  let opens = 0;
  let openBrackets = 0;
  let inString = false;
  let escaped = false;

  for (const ch of raw) {
    if (escaped) {
      escaped = false;
      continue;
    }
    if (ch === "\\") {
      escaped = true;
      continue;
    }
    if (ch === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;
    if (ch === "{") opens++;
    else if (ch === "}") opens--;
    else if (ch === "[") openBrackets++;
    else if (ch === "]") openBrackets--;
  }

  let result = raw;
  while (openBrackets > 0) {
    result += "]";
    openBrackets--;
  }
  while (opens > 0) {
    result += "}";
    opens--;
  }
  return result;
}

// Attempt to parse potentially-malformed JSON arguments into a valid object.
export function repairToolArgs(raw: string): RepairResult {
  const trimmed = raw.trim();
  if (!trimmed || trimmed === "{}") {
    return { repaired: false, args: {} };
  }

  // Happy path: valid JSON on first try.
  try {
    const parsed = JSON.parse(trimmed);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return { repaired: false, args: parsed as Record<string, unknown> };
    }
  } catch {
    // Fall through to repair.
  }

  const repairs: string[] = [];
  let attempt = trimmed;

  // Apply all repair stages in sequence, then try parsing.
  // Run multiple rounds since earlier repairs can enable later ones.
  for (let round = 0; round < 3; round++) {
    const before = attempt;

    const noCommas = stripTrailingCommas(attempt);
    if (noCommas !== attempt) {
      if (!repairs.includes("stripped trailing commas")) repairs.push("stripped trailing commas");
      attempt = noCommas;
    }

    const quoted = quoteUnquotedKeys(attempt);
    if (quoted !== attempt) {
      if (!repairs.includes("quoted bare keys")) repairs.push("quoted bare keys");
      attempt = quoted;
    }

    const closed = closeTruncated(attempt);
    if (closed !== attempt) {
      if (!repairs.includes("closed truncated JSON")) repairs.push("closed truncated JSON");
      attempt = closed;
    }

    if (attempt === before) break;
  }

  if (repairs.length > 0) {
    try {
      const parsed = JSON.parse(attempt);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return {
          repaired: true,
          args: parsed as Record<string, unknown>,
          warning: `Repaired malformed tool args (${repairs.join(", ")}).`,
        };
      }
    } catch {
      // Final fallback: not repairable.
    }
  }

  return {
    repaired: false,
    args: {},
    warning: "Tool call arguments could not be parsed or repaired.",
  };
}

// Detect and extract tool calls embedded in plain text (LLMs sometimes
// emit tool calls as markdown code blocks instead of structured output).
const TOOL_CALL_BLOCK_RE =
  /```(?:json|tool[_-]?call)?\s*\n\s*\{\s*"(?:name|tool)":\s*"([^"]+)".*?\n\s*```/gs;

export interface PlainTextToolCall {
  name: string;
  args: Record<string, unknown>;
  raw: string;
}

export function extractPlainTextToolCalls(text: string): PlainTextToolCall[] {
  const results: PlainTextToolCall[] = [];
  for (const match of text.matchAll(TOOL_CALL_BLOCK_RE)) {
    const block = match[0];
    const jsonStr = block.replace(/```[^\n]*\n/, "").replace(/\n\s*```$/, "").trim();
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed === "object" && parsed.name) {
        results.push({
          name: String(parsed.name),
          args: (parsed.arguments ?? parsed.args ?? parsed.parameters ?? {}) as Record<string, unknown>,
          raw: block,
        });
      }
    } catch {
      const { repaired, args, warning } = repairToolArgs(jsonStr);
      if (repaired && !warning?.includes("could not be parsed")) {
        results.push({ name: match[1], args, raw: block });
      }
    }
  }
  return results;
}

// Strip tool-call blocks from user-visible output.
export function stripToolCallBlocks(text: string): string {
  return text.replace(TOOL_CALL_BLOCK_RE, "").trim();
}
