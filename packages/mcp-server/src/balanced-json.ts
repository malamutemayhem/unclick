// Balanced JSON extraction from streaming or mixed text.
// When LLMs stream responses, we sometimes need to pull out complete
// JSON objects before the full response arrives. This finds matched
// brace pairs while respecting string boundaries.

export interface JsonFragment {
  json: string;
  startIndex: number;
  endIndex: number;
}

// Find the end of a JSON object/array starting at the opener.
// Returns the index after the closing delimiter, or -1 if not balanced.
function findBalancedEnd(text: string, start: number): number {
  const opener = text[start];
  const closer = opener === "{" ? "}" : "]";
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = start; i < text.length; i++) {
    const ch = text[i];

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

    if (ch === opener) depth++;
    else if (ch === closer) {
      depth--;
      if (depth === 0) return i + 1;
    }
  }

  return -1;
}

// Extract the first balanced JSON object or array from text.
// Returns null if no complete JSON structure is found.
export function extractFirstJson(text: string): JsonFragment | null {
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === "{" || ch === "[") {
      const end = findBalancedEnd(text, i);
      if (end > 0) {
        return { json: text.slice(i, end), startIndex: i, endIndex: end };
      }
    }
  }
  return null;
}

// Extract ALL balanced JSON objects/arrays from text.
export function extractAllJson(text: string): JsonFragment[] {
  const fragments: JsonFragment[] = [];
  let offset = 0;

  while (offset < text.length) {
    const idx = text.indexOf("{", offset);
    const arrIdx = text.indexOf("[", offset);

    let start: number;
    if (idx === -1 && arrIdx === -1) break;
    else if (idx === -1) start = arrIdx;
    else if (arrIdx === -1) start = idx;
    else start = Math.min(idx, arrIdx);

    const end = findBalancedEnd(text, start);
    if (end > 0) {
      fragments.push({ json: text.slice(start, end), startIndex: start, endIndex: end });
      offset = end;
    } else {
      offset = start + 1;
    }
  }

  return fragments;
}

// Parse the first JSON object found in text, with optional repair.
export function parseFirstJson(text: string): unknown | undefined {
  const fragment = extractFirstJson(text);
  if (!fragment) return undefined;
  try {
    return JSON.parse(fragment.json);
  } catch {
    return undefined;
  }
}
