import { stampMeta, ConnectorMeta } from "./connector-meta.js";

/**
 * Booth's algorithm: find the lexicographically smallest rotation of a string
 * in O(n) time using the canonical rotation index.
 */
export async function boothRotation(args: Record<string, unknown>) {
  const text = args.text;
  if (typeof text !== "string") {
    throw new Error("text must be a string.");
  }
  if (text.length === 0) {
    throw new Error("text must not be empty.");
  }
  if (text.length > 1_000_000) {
    throw new Error("text must be at most 1,000,000 characters.");
  }

  const n = text.length;
  // Booth's algorithm works on s + s
  const s = text + text;
  const f = new Array(2 * n).fill(-1);
  let k = 0; // current best rotation start

  for (let j = 1; j < 2 * n; j++) {
    let i = f[j - 1 - k];
    while (i !== -1 && s[j] !== s[k + i + 1]) {
      if (s[j] < s[k + i + 1]) {
        k = j - i - 1;
      }
      i = f[i];
    }
    if (i === -1 && s[j] !== s[k + i + 1]) {
      if (s[j] < s[k + i + 1]) {
        k = j;
      }
      f[j - k] = -1;
    } else {
      f[j - k] = i + 1;
    }
  }

  const rotationIndex = k;
  const rotated = text.slice(rotationIndex) + text.slice(0, rotationIndex);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Use the rotation index to compare cyclic equivalence of two strings",
      "Combine with suffix arrays for advanced string analysis",
    ],
  };

  return stampMeta(
    {
      text,
      rotation_index: rotationIndex,
      rotated,
      length: n,
    },
    meta,
  );
}
