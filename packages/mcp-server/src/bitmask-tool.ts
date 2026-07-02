import { stampMeta, ConnectorMeta } from "./connector-meta.js";

function popcount(x: number): number {
  let count = 0;
  let v = x;
  while (v > 0) {
    count += v & 1;
    v >>>= 1;
  }
  return count;
}

function highestBit(x: number): number {
  if (x === 0) return -1;
  let pos = 0;
  let v = x;
  while (v > 1) {
    v >>>= 1;
    pos++;
  }
  return pos;
}

function lowestBit(x: number): number {
  if (x === 0) return -1;
  let pos = 0;
  let v = x;
  while ((v & 1) === 0) {
    v >>>= 1;
    pos++;
  }
  return pos;
}

function toBinary(x: number): string {
  if (x === 0) return "0";
  return x.toString(2);
}

export async function bitmaskOps(args: Record<string, unknown>) {
  const mask = args.mask as number;
  const operation = args.operation as string;
  const universe = args.universe as number | undefined;

  if (!Number.isInteger(mask) || mask < 0) {
    throw new Error("mask must be a non-negative integer");
  }
  if (mask > 0x3fffffff) {
    throw new Error("mask must not exceed 2^30 - 1 (1073741823)");
  }

  const validOps = ["submasks", "supersets", "next_permutation", "enumerate", "info"];
  if (!validOps.includes(operation)) {
    throw new Error(
      `operation must be one of: ${validOps.join(", ")}`,
    );
  }

  let result: Record<string, unknown>;

  if (operation === "info") {
    result = {
      mask,
      binary: toBinary(mask),
      popcount: popcount(mask),
      highest_bit: highestBit(mask),
      lowest_bit: lowestBit(mask),
    };
  } else if (operation === "submasks") {
    // Enumerate all submasks of mask (including mask itself and 0)
    if (popcount(mask) > 20) {
      throw new Error(
        "Too many submasks: mask must have at most 20 set bits for enumeration",
      );
    }
    const submasks: number[] = [];
    let s = mask;
    while (s > 0) {
      submasks.push(s);
      s = (s - 1) & mask;
    }
    submasks.push(0);
    result = {
      mask,
      binary: toBinary(mask),
      submask_count: submasks.length,
      submasks,
    };
  } else if (operation === "supersets") {
    // Enumerate all supersets of mask within the given universe
    if (universe === undefined || !Number.isInteger(universe) || universe < 0) {
      throw new Error("supersets operation requires a non-negative integer 'universe' parameter");
    }
    if (universe > 0x3fffffff) {
      throw new Error("universe must not exceed 2^30 - 1");
    }
    if ((mask & universe) !== mask) {
      throw new Error("mask must be a subset of universe");
    }
    const complement = universe & ~mask;
    if (popcount(complement) > 20) {
      throw new Error(
        "Too many supersets: complement of mask in universe must have at most 20 set bits",
      );
    }
    const supersets: number[] = [];
    // Iterate submasks of the complement bits, OR with mask
    let s = complement;
    while (s > 0) {
      supersets.push(mask | s);
      s = (s - 1) & complement;
    }
    supersets.push(mask); // mask itself (complement submask = 0)
    supersets.sort((a, b) => a - b);
    result = {
      mask,
      universe,
      binary_mask: toBinary(mask),
      binary_universe: toBinary(universe),
      superset_count: supersets.length,
      supersets,
    };
  } else if (operation === "next_permutation") {
    // Gosper's hack: next integer with the same number of set bits
    if (mask === 0) {
      result = {
        mask: 0,
        binary: "0",
        next: null,
        note: "No next permutation for 0",
      };
    } else {
      const c = mask & -mask;
      const r = mask + c;
      const next = (((r ^ mask) >>> 2) / c) | r;
      if (next > 0x3fffffff) {
        result = {
          mask,
          binary: toBinary(mask),
          next: null,
          note: "Next permutation exceeds 30-bit limit",
        };
      } else {
        result = {
          mask,
          binary: toBinary(mask),
          popcount: popcount(mask),
          next,
          next_binary: toBinary(next),
        };
      }
    }
  } else {
    // enumerate: list all set bit positions
    const positions: number[] = [];
    let v = mask;
    let pos = 0;
    while (v > 0) {
      if (v & 1) positions.push(pos);
      v >>>= 1;
      pos++;
    }
    result = {
      mask,
      binary: toBinary(mask),
      popcount: positions.length,
      set_bit_positions: positions,
    };
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Use submasks iteration for subset-sum DP over bitmasks",
      "Combine with next_permutation to iterate all masks with a given popcount",
    ],
  };

  return stampMeta(result, meta);
}
