import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function eertree(args: Record<string, unknown>) {
  const text = args.text as string;

  if (typeof text !== "string" || text.length === 0 || text.length > 100_000) {
    throw new Error("text must be a non-empty string (max 100,000 characters)");
  }

  const s = text;
  const n = s.length;

  const len: number[] = [-1, 0];
  const link: number[] = [0, 0];
  const children: Map<string, number>[] = [new Map(), new Map()];
  let last = 1;
  let nodeCount = 2;

  const insertedAt: number[] = [-1, -1];

  for (let i = 0; i < n; i++) {
    const c = s[i];

    let cur = last;
    while (true) {
      const pos = i - len[cur] - 1;
      if (pos >= 0 && s[pos] === c) break;
      cur = link[cur];
    }

    if (children[cur].has(c)) {
      last = children[cur].get(c)!;
      continue;
    }

    const newLen = len[cur] + 2;
    let q = link[cur];
    while (true) {
      const pos = i - len[q] - 1;
      if (pos >= 0 && s[pos] === c) break;
      q = link[q];
    }

    const newLink = children[q].has(c) ? children[q].get(c)! : 1;
    const newNode = nodeCount++;
    len.push(newLen);
    link.push(newLink);
    children.push(new Map());
    insertedAt.push(i);
    children[cur].set(c, newNode);
    last = newNode;
  }

  const distinctPalindromes = nodeCount - 2;

  let longest = "";
  for (let i = 2; i < nodeCount; i++) {
    if (len[i] > longest.length) {
      const end = insertedAt[i];
      const start = end - len[i] + 1;
      longest = s.substring(start, end + 1);
    }
  }

  const lengths: number[] = [];
  for (let i = 2; i < nodeCount; i++) {
    lengths.push(len[i]);
  }
  lengths.sort((a, b) => a - b);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Use distinct palindrome count for substring analysis",
      "Examine longest palindromic substring for pattern detection",
    ],
  };

  return stampMeta(
    {
      text_length: n,
      distinct_palindromes: distinctPalindromes,
      node_count: nodeCount,
      longest_palindrome: longest,
      palindrome_lengths: lengths,
    },
    meta,
  );
}
