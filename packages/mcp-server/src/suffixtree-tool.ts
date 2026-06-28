import { stampMeta, ConnectorMeta } from "./connector-meta.js";

interface SuffixNode {
  children: Record<string, number>;
  start: number;
  end: number;
  suffixLink: number;
  leafCount: number;
}

export async function suffixTree(args: Record<string, unknown>) {
  const text = args.text as string;

  if (typeof text !== "string" || text.length === 0) {
    throw new Error("text must be a non-empty string");
  }
  if (text.length > 10_000) {
    throw new Error("text length must be at most 10,000");
  }

  const nodes: SuffixNode[] = [];
  let remaining = 0;
  let activeNode = 0;
  let activeEdge = -1;
  let activeLength = 0;
  let leafEnd = -1;

  function newNode(start: number, end: number): number {
    nodes.push({ children: {}, start, end, suffixLink: 0, leafCount: 0 });
    return nodes.length - 1;
  }

  newNode(-1, -1);

  const s = text + "$";
  const n = s.length;

  for (let i = 0; i < n; i++) {
    leafEnd = i;
    remaining++;
    let lastNewInternal = -1;

    while (remaining > 0) {
      if (activeLength === 0) activeEdge = i;

      const edgeChar = s[activeEdge];
      if (!(edgeChar in nodes[activeNode].children)) {
        nodes[activeNode].children[edgeChar] = newNode(i, n);
        if (lastNewInternal >= 0) {
          nodes[lastNewInternal].suffixLink = activeNode;
          lastNewInternal = -1;
        }
      } else {
        const next = nodes[activeNode].children[edgeChar];
        const edgeLen = (nodes[next].end === n ? leafEnd + 1 : nodes[next].end) - nodes[next].start;
        if (activeLength >= edgeLen) {
          activeEdge += edgeLen;
          activeLength -= edgeLen;
          activeNode = next;
          continue;
        }
        if (s[nodes[next].start + activeLength] === s[i]) {
          activeLength++;
          if (lastNewInternal >= 0) {
            nodes[lastNewInternal].suffixLink = activeNode;
          }
          break;
        }
        const split = newNode(nodes[next].start, nodes[next].start + activeLength);
        nodes[activeNode].children[edgeChar] = split;
        nodes[split].children[s[i]] = newNode(i, n);
        nodes[next].start += activeLength;
        nodes[split].children[s[nodes[next].start]] = next;
        if (lastNewInternal >= 0) {
          nodes[lastNewInternal].suffixLink = split;
        }
        lastNewInternal = split;
      }
      remaining--;
      if (activeNode === 0 && activeLength > 0) {
        activeLength--;
        activeEdge = i - remaining + 1;
      } else {
        activeNode = nodes[activeNode].suffixLink > 0 ? nodes[activeNode].suffixLink : 0;
      }
    }
  }

  function countLeaves(idx: number): number {
    const node = nodes[idx];
    const kids = Object.values(node.children);
    if (kids.length === 0) {
      node.leafCount = 1;
      return 1;
    }
    let total = 0;
    for (const c of kids) total += countLeaves(c);
    node.leafCount = total;
    return total;
  }
  countLeaves(0);

  let distinctSubstrings = 0;
  for (let i = 1; i < nodes.length; i++) {
    const nd = nodes[i];
    let edgeLen = (nd.end === n ? leafEnd + 1 : nd.end) - nd.start;
    const edgeStart = nd.start;
    for (let j = 0; j < edgeLen; j++) {
      if (s[edgeStart + j] === "$") {
        edgeLen = j;
        break;
      }
    }
    distinctSubstrings += edgeLen;
  }

  let longestRepeated = "";
  function findLRS(idx: number, accumulated: string): void {
    const node = nodes[idx];
    const kids = Object.values(node.children);
    if (kids.length === 0) return;
    if (node.leafCount >= 2 && accumulated.length > longestRepeated.length) {
      longestRepeated = accumulated;
    }
    for (const c of kids) {
      const edgeLen = (nodes[c].end === n ? leafEnd + 1 : nodes[c].end) - nodes[c].start;
      const edgeStr = s.substring(nodes[c].start, nodes[c].start + edgeLen);
      findLRS(c, accumulated + edgeStr);
    }
  }
  findLRS(0, "");
  if (longestRepeated.endsWith("$")) {
    longestRepeated = longestRepeated.slice(0, -1);
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use suffix tree for pattern matching, longest repeated substring, and substring counting"],
  };

  return stampMeta(
    {
      text_length: text.length,
      node_count: nodes.length,
      distinct_substrings: distinctSubstrings,
      longest_repeated_substring: longestRepeated,
    },
    meta,
  );
}
