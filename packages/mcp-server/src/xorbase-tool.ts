import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function xorBasis(args: Record<string, unknown>) {
  const values = args.values as number[];

  if (!Array.isArray(values) || values.length === 0 || values.length > 100_000) {
    throw new Error("values must be a non-empty array (max 100,000 elements)");
  }

  const basis: number[] = [];
  const LOG = 30;

  for (const v of values) {
    let cur = v;
    for (let i = LOG; i >= 0; i--) {
      if (!(cur & (1 << i))) continue;
      if (basis[i] === undefined) {
        basis[i] = cur;
        break;
      }
      cur ^= basis[i];
    }
  }

  const basisVectors = basis.filter((v) => v !== undefined);
  const rank = basisVectors.length;
  const representable = Math.pow(2, rank);

  let maxXor = 0;
  for (let i = LOG; i >= 0; i--) {
    if (basis[i] !== undefined) {
      maxXor = Math.max(maxXor, maxXor ^ basis[i]);
    }
  }

  let minXor = 0;
  if (rank === values.length) {
    let cur = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i <= LOG; i++) {
      if (basis[i] !== undefined && basis[i] < cur) cur = basis[i];
    }
    minXor = cur;
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "The XOR basis spans all values achievable by XORing subsets of the input",
      "Useful for linear algebra over GF(2), competitive programming XOR problems",
    ],
  };

  return stampMeta(
    {
      rank,
      basis_vectors: basisVectors.sort((a, b) => a - b),
      max_xor: maxXor,
      distinct_xor_values: representable,
      input_size: values.length,
    },
    meta,
  );
}
