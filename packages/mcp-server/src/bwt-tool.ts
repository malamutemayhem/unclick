import { stampMeta, ConnectorMeta } from "./connector-meta.js";

/**
 * Burrows-Wheeler Transform (BWT).
 *
 * Forward transform: produces a permutation of the input string that tends to
 * group identical characters together, plus an index marking where the original
 * string falls in the sorted rotation table.
 *
 * Inverse transform: given the BWT output and the original index, reconstructs
 * the original string.
 *
 * O(n log n) time for forward (due to sorting), O(n) for inverse.
 */
export async function burrowsWheeler(args: Record<string, unknown>) {
  const text = args.text as string;
  const inverse = (args.inverse as boolean) ?? false;

  if (typeof text !== "string" || text.length === 0) {
    throw new Error("text must be a non-empty string");
  }
  if (text.length > 100_000) {
    throw new Error("text must be at most 100,000 characters");
  }

  if (inverse) {
    const originalIndex = args.original_index as number;
    if (!Number.isInteger(originalIndex) || originalIndex < 0 || originalIndex >= text.length) {
      throw new Error("original_index must be an integer in [0, text.length)");
    }

    const restored = inverseBWT(text, originalIndex);

    const meta: ConnectorMeta = {
      source: "local-computation",
      fetched_at: new Date().toISOString(),
      next_steps: [
        "The restored string is the original input before the forward BWT",
        "Verify round-trip correctness by applying forward BWT to the restored string",
      ],
    };

    return stampMeta({ restored, text_length: text.length }, meta);
  }

  const { transformed, originalIndex } = forwardBWT(text);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "The transformed string groups similar characters for better compression",
      "Pass transformed and original_index with inverse=true to recover the original",
    ],
  };

  return stampMeta(
    {
      transformed,
      original_index: originalIndex,
      text_length: text.length,
    },
    meta,
  );
}

function forwardBWT(s: string): { transformed: string; originalIndex: number } {
  const n = s.length;
  // Build array of rotation indices and sort them
  const indices: number[] = [];
  for (let i = 0; i < n; i++) indices.push(i);

  indices.sort((a, b) => {
    for (let k = 0; k < n; k++) {
      const ca = s.charCodeAt((a + k) % n);
      const cb = s.charCodeAt((b + k) % n);
      if (ca !== cb) return ca - cb;
    }
    return 0;
  });

  let originalIndex = -1;
  const chars: string[] = [];
  for (let i = 0; i < n; i++) {
    if (indices[i] === 0) originalIndex = i;
    // Last character of rotation starting at indices[i] is at position (indices[i] + n - 1) % n
    chars.push(s[(indices[i] + n - 1) % n]);
  }

  return { transformed: chars.join(""), originalIndex };
}

function inverseBWT(bwt: string, originalIndex: number): string {
  const n = bwt.length;

  // Build the T-transform (LF mapping):
  // Sort the BWT characters to get the first column, then build the mapping.
  const sorted: Array<{ ch: string; idx: number }> = [];
  for (let i = 0; i < n; i++) {
    sorted.push({ ch: bwt[i], idx: i });
  }
  // Stable sort by character
  sorted.sort((a, b) => {
    if (a.ch < b.ch) return -1;
    if (a.ch > b.ch) return 1;
    return a.idx - b.idx;
  });

  // T[i] maps from first-column position to last-column position
  const T = new Array<number>(n);
  for (let i = 0; i < n; i++) {
    T[i] = sorted[i].idx;
  }

  // Follow the chain starting from originalIndex
  const result: string[] = [];
  let pos = originalIndex;
  for (let i = 0; i < n; i++) {
    result.push(bwt[T[pos]]);
    pos = T[pos];
  }

  return result.join("");
}
