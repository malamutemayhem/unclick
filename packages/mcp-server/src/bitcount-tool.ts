import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function bitCount(args: Record<string, unknown>) {
  const value = args.value;
  if (value === undefined || value === null || value === "") {
    throw new Error("value is required (integer or binary/hex string).");
  }

  let num: bigint;
  const strVal = String(value).trim();

  if (strVal.startsWith("0b") || strVal.startsWith("0B")) {
    num = BigInt(strVal);
  } else if (strVal.startsWith("0x") || strVal.startsWith("0X")) {
    num = BigInt(strVal);
  } else {
    num = BigInt(strVal);
  }

  const isNegative = num < 0n;
  const absNum = isNegative ? -num : num;
  const binary = absNum.toString(2);
  const totalBits = binary.length;
  let onesCount = 0;
  for (const ch of binary) {
    if (ch === "1") onesCount++;
  }
  const zerosCount = totalBits - onesCount;

  const isPowerOfTwo = !isNegative && absNum > 0n && (absNum & (absNum - 1n)) === 0n;

  const hex = absNum.toString(16).toUpperCase();
  const octal = absNum.toString(8);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["popcount (ones) is useful in Hamming weight calculations", "A power of two has exactly one set bit"],
  };
  return stampMeta({
    decimal: absNum.toString(),
    binary: (isNegative ? "-" : "") + binary,
    hex: (isNegative ? "-0x" : "0x") + hex,
    octal: (isNegative ? "-0o" : "0o") + octal,
    total_bits: totalBits,
    ones_count: onesCount,
    zeros_count: zerosCount,
    is_negative: isNegative,
    is_power_of_two: isPowerOfTwo,
  }, meta);
}
