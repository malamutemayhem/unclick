import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function grayCode(args: Record<string, unknown>) {
  const n = Number(args.n);
  if (!Number.isInteger(n) || n < 1 || n > 20) {
    throw new Error("n is required and must be an integer between 1 and 20.");
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Gray codes are used in rotary encoders and error correction",
      "Use bitcount to inspect individual code words",
    ],
  };

  // Single-value conversion mode
  if (args.value !== undefined && args.value !== null) {
    const value = Number(args.value);
    if (!Number.isInteger(value) || value < 0 || value >= (1 << n)) {
      throw new Error(
        `value must be a non-negative integer less than ${1 << n} for ${n}-bit codes.`,
      );
    }
    const toGray = args.to_gray !== false;
    let output: number;
    if (toGray) {
      // Binary to Gray: G = B XOR (B >> 1)
      output = value ^ (value >>> 1);
    } else {
      // Gray to Binary
      let mask = value;
      let result = value;
      while (mask > 0) {
        mask >>>= 1;
        result ^= mask;
      }
      output = result;
    }
    return stampMeta(
      {
        n,
        input: value,
        output,
        direction: toGray ? "binary_to_gray" : "gray_to_binary",
      },
      meta,
    );
  }

  // Full sequence mode
  const length = 1 << n;
  const sequence: number[] = [];
  const sequenceGray: number[] = [];
  for (let i = 0; i < length; i++) {
    sequence.push(i);
    sequenceGray.push(i ^ (i >>> 1));
  }

  return stampMeta({ n, sequence, sequence_gray: sequenceGray, length }, meta);
}
