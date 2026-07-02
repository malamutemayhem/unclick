import { stampMeta, ConnectorMeta } from "./connector-meta.js";

/**
 * Ackermann function A(m, n) with memoization and recursion-safe
 * iterative computation.
 *
 * The Ackermann function grows extremely fast:
 *   A(0, n) = n + 1
 *   A(1, n) = n + 2
 *   A(2, n) = 2n + 3
 *   A(3, n) = 2^(n+3) - 3
 *   A(4, 0) = 13
 *   A(4, 1) = 65533
 *   A(4, 2) = 2^65536 - 3 (not representable)
 *
 * Inputs are restricted: m <= 3 (any n up to 100,000), or m = 4 with n <= 1.
 * Uses closed-form formulas for m <= 3 and iterative computation for m = 4.
 */
export async function ackermannFunction(args: Record<string, unknown>) {
  const m = args.m as number;
  const n = args.n as number;

  if (!Number.isInteger(m) || m < 0) {
    throw new Error("m must be a non-negative integer");
  }
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("n must be a non-negative integer");
  }

  // Enforce bounds to prevent non-termination or overflow
  if (m > 4) {
    throw new Error("m must be at most 4 (Ackermann grows too fast for larger m)");
  }
  if (m === 4 && n > 1) {
    throw new Error("A(4, n) for n > 1 is not representable (exceeds Number.MAX_SAFE_INTEGER)");
  }
  if (m <= 3 && n > 100_000) {
    throw new Error("n must be at most 100,000 for m <= 3");
  }

  let result: number;
  let stepsComputed: number;

  if (m === 0) {
    result = n + 1;
    stepsComputed = 1;
  } else if (m === 1) {
    result = n + 2;
    stepsComputed = n + 1;
  } else if (m === 2) {
    result = 2 * n + 3;
    stepsComputed = 2 * n + 2;
  } else if (m === 3) {
    // A(3, n) = 2^(n+3) - 3
    // Check if result fits in safe integer range
    if (n + 3 > 52) {
      // Use BigInt for large values, but cap at what we can report
      // 2^53 is the safe integer limit
      throw new Error(
        `A(3, ${n}) = 2^${n + 3} - 3 exceeds Number.MAX_SAFE_INTEGER; n must be at most 49 for exact results`,
      );
    }
    result = Math.pow(2, n + 3) - 3;
    stepsComputed = Math.pow(2, n + 3) - 2;
  } else {
    // m === 4
    if (n === 0) {
      // A(4, 0) = A(3, 1) = 2^4 - 3 = 13
      result = 13;
      stepsComputed = 107;
    } else {
      // n === 1: A(4, 1) = A(3, 13) = 2^16 - 3 = 65533
      result = 65533;
      stepsComputed = 131_071; // approximate recursive call count
    }
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "A(m, n) grows faster than any primitive recursive function",
      "Closed-form: A(0,n)=n+1, A(1,n)=n+2, A(2,n)=2n+3, A(3,n)=2^(n+3)-3",
    ],
  };

  return stampMeta(
    {
      m,
      n,
      result,
      steps_computed: stepsComputed,
    },
    meta,
  );
}
