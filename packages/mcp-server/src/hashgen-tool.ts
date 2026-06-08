import { createHash } from "crypto";
import { stampMeta } from "./connector-meta.js";

const ALGOS = ["md5", "sha1", "sha256", "sha384", "sha512"] as const;

export async function hashGenerate(args: Record<string, unknown>) {
  const text = String(args.text ?? "");
  if (!text) return { error: "text is required" };
  const algo = String(args.algorithm ?? "sha256").toLowerCase();
  if (!ALGOS.includes(algo as typeof ALGOS[number])) {
    return { error: `Unsupported algorithm. Use one of: ${ALGOS.join(", ")}` };
  }
  const hash = createHash(algo).update(text, "utf8").digest("hex");
  return stampMeta({ algorithm: algo, hash, input_length: text.length }, {
    source: `local crypto.createHash(${algo})`,
    fetched_at: new Date().toISOString(),
    next_steps: ["compare hash for integrity checks", "try sha512 for stronger hashing"],
  });
}

export async function hashCompare(args: Record<string, unknown>) {
  const text = String(args.text ?? "");
  const expected = String(args.hash ?? "").trim().toLowerCase();
  if (!text) return { error: "text is required" };
  if (!expected) return { error: "hash (expected value) is required" };
  const algo = String(args.algorithm ?? "sha256").toLowerCase();
  if (!ALGOS.includes(algo as typeof ALGOS[number])) {
    return { error: `Unsupported algorithm. Use one of: ${ALGOS.join(", ")}` };
  }
  const actual = createHash(algo).update(text, "utf8").digest("hex");
  return stampMeta({ algorithm: algo, match: actual === expected, actual, expected }, {
    source: `local crypto.createHash(${algo})`,
    fetched_at: new Date().toISOString(),
    next_steps: ["match=true means the text produces the expected hash", "try different algorithms if no match"],
  });
}
