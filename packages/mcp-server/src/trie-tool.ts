import { stampMeta, ConnectorMeta } from "./connector-meta.js";

interface TrieNode {
  children: Map<string, TrieNode>;
  isEnd: boolean;
  count: number;
}

function newNode(): TrieNode {
  return { children: new Map(), isEnd: false, count: 0 };
}

export async function trieOps(args: Record<string, unknown>) {
  const words = args.words as string[];
  if (!Array.isArray(words) || words.length === 0) {
    throw new Error("words must be a non-empty array of strings");
  }

  const root = newNode();

  function insert(word: string) {
    let node = root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, newNode());
      node = node.children.get(ch)!;
      node.count++;
    }
    node.isEnd = true;
  }

  function search(word: string): boolean {
    let node = root;
    for (const ch of word) {
      if (!node.children.has(ch)) return false;
      node = node.children.get(ch)!;
    }
    return node.isEnd;
  }

  function startsWith(prefix: string): number {
    let node = root;
    for (const ch of prefix) {
      if (!node.children.has(ch)) return 0;
      node = node.children.get(ch)!;
    }
    return node.count;
  }

  function collectWords(node: TrieNode, prefix: string, results: string[], limit: number) {
    if (results.length >= limit) return;
    if (node.isEnd) results.push(prefix);
    const keys = [...node.children.keys()].sort();
    for (const ch of keys) {
      collectWords(node.children.get(ch)!, prefix + ch, results, limit);
      if (results.length >= limit) return;
    }
  }

  for (const w of words) insert(w);

  const queries = (args.queries as string[]) ?? [];
  const searchResults: Record<string, unknown>[] = [];

  for (const q of queries) {
    searchResults.push({
      query: q,
      exact_match: search(q),
      prefix_count: startsWith(q),
    });
  }

  const prefixQuery = args.prefix ? String(args.prefix) : null;
  let autocomplete: string[] | undefined;
  if (prefixQuery) {
    let node = root;
    let found = true;
    for (const ch of prefixQuery) {
      if (!node.children.has(ch)) { found = false; break; }
      node = node.children.get(ch)!;
    }
    if (found) {
      autocomplete = [];
      collectWords(node, prefixQuery, autocomplete, 50);
    } else {
      autocomplete = [];
    }
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use trie for prefix-based autocomplete or spell checking"],
  };

  const result: Record<string, unknown> = {
    word_count: words.length,
    search_results: searchResults,
  };
  if (autocomplete !== undefined) {
    result.autocomplete = autocomplete;
  }

  return stampMeta(result, meta);
}
