import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function longestCommonPrefix(args: Record<string, unknown>) {
  const strings = args.strings;

  if (!Array.isArray(strings)) {
    throw new Error("strings must be an array of strings.");
  }
  if (strings.length === 0) {
    throw new Error("strings must contain at least one element.");
  }
  if (strings.length > 10000) {
    throw new Error("strings must contain at most 10000 elements.");
  }
  for (let i = 0; i < strings.length; i++) {
    if (typeof strings[i] !== "string") {
      throw new Error(`Element at index ${i} is not a string.`);
    }
    if ((strings[i] as string).length > 10000) {
      throw new Error(`Element at index ${i} exceeds 10000 characters.`);
    }
  }

  const strs = strings as string[];

  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    let j = 0;
    while (j < prefix.length && j < strs[i].length && prefix[j] === strs[i][j]) {
      j++;
    }
    prefix = prefix.slice(0, j);
    if (prefix.length === 0) break;
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Use trie tool for more advanced prefix-based lookups",
      "Use string_distance for measuring similarity between strings",
    ],
  };

  return stampMeta(
    {
      strings_count: strs.length,
      prefix,
      prefix_length: prefix.length,
    },
    meta,
  );
}
