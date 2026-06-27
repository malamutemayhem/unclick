export interface LadderResult {
  path: string[];
  steps: number;
  found: boolean;
}

export function editDistance(a: string, b: string): number {
  if (a.length !== b.length) return Math.abs(a.length - b.length) + editDistanceSameLen(a, b.substring(0, Math.min(a.length, b.length)));
  return editDistanceSameLen(a, b);
}

function editDistanceSameLen(a: string, b: string): number {
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) diff++;
  }
  return diff;
}

export function hammingDistance(a: string, b: string): number {
  if (a.length !== b.length) return -1;
  return editDistanceSameLen(a, b);
}

export function isOneAway(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return editDistanceSameLen(a, b) === 1;
}

export function findLadder(start: string, end: string, dictionary: string[]): LadderResult {
  if (start.length !== end.length) return { path: [], steps: 0, found: false };
  if (start === end) return { path: [start], steps: 0, found: true };

  const wordSet = new Set(dictionary.filter(w => w.length === start.length));
  wordSet.add(end);

  const queue: string[][] = [[start]];
  const visited = new Set<string>([start]);

  while (queue.length > 0) {
    const path = queue.shift()!;
    const current = path[path.length - 1];

    const neighbors = getNeighbors(current, wordSet);
    for (const neighbor of neighbors) {
      if (neighbor === end) {
        const fullPath = [...path, neighbor];
        return { path: fullPath, steps: fullPath.length - 1, found: true };
      }
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([...path, neighbor]);
      }
    }
  }

  return { path: [], steps: 0, found: false };
}

function getNeighbors(word: string, dictionary: Set<string>): string[] {
  const neighbors: string[] = [];
  const chars = word.split("");
  for (let i = 0; i < chars.length; i++) {
    const original = chars[i];
    for (let c = 97; c <= 122; c++) {
      const ch = String.fromCharCode(c);
      if (ch === original) continue;
      chars[i] = ch;
      const candidate = chars.join("");
      if (dictionary.has(candidate)) {
        neighbors.push(candidate);
      }
    }
    chars[i] = original;
  }
  return neighbors;
}

export function findAllLadders(start: string, end: string, dictionary: string[], maxResults = 5): LadderResult[] {
  if (start.length !== end.length) return [];
  if (start === end) return [{ path: [start], steps: 0, found: true }];

  const wordSet = new Set(dictionary.filter(w => w.length === start.length));
  wordSet.add(end);

  const results: LadderResult[] = [];
  const queue: string[][] = [[start]];
  const visited = new Map<string, number>();
  visited.set(start, 0);
  let shortestLength = Infinity;

  while (queue.length > 0 && results.length < maxResults) {
    const path = queue.shift()!;
    if (path.length > shortestLength) break;
    const current = path[path.length - 1];

    const neighbors = getNeighbors(current, wordSet);
    for (const neighbor of neighbors) {
      if (neighbor === end) {
        const fullPath = [...path, neighbor];
        shortestLength = fullPath.length;
        results.push({ path: fullPath, steps: fullPath.length - 1, found: true });
        continue;
      }
      const prevDepth = visited.get(neighbor);
      if (prevDepth === undefined || prevDepth >= path.length) {
        visited.set(neighbor, path.length);
        queue.push([...path, neighbor]);
      }
    }
  }

  return results;
}

export function ladderLength(start: string, end: string, dictionary: string[]): number {
  const result = findLadder(start, end, dictionary);
  return result.found ? result.steps : -1;
}

export function isLadderPossible(start: string, end: string, dictionary: string[]): boolean {
  return findLadder(start, end, dictionary).found;
}

export function validateLadder(path: string[]): boolean {
  if (path.length < 2) return path.length === 1;
  for (let i = 1; i < path.length; i++) {
    if (!isOneAway(path[i - 1], path[i])) return false;
  }
  return true;
}

export function longestLadder(dictionary: string[], wordLength: number, maxAttempts = 100): LadderResult {
  const words = dictionary.filter(w => w.length === wordLength);
  let longest: LadderResult = { path: [], steps: 0, found: false };

  for (let i = 0; i < Math.min(maxAttempts, words.length); i++) {
    for (let j = i + 1; j < Math.min(i + 10, words.length); j++) {
      const result = findLadder(words[i], words[j], words);
      if (result.found && result.steps > longest.steps) {
        longest = result;
      }
    }
  }
  return longest;
}

export function SAMPLE_DICTIONARY(): string[] {
  return [
    "cat", "bat", "hat", "hot", "dot", "dog", "cot", "cog", "log", "lag",
    "bag", "big", "bit", "sit", "sat", "set", "bet", "bed", "bad", "had",
    "hid", "hit", "pit", "pat", "pan", "pen", "hen", "ten", "tin", "tan",
    "van", "ban", "bin", "fin", "fan", "fun", "run", "sun", "son", "ton",
    "top", "tap", "tip", "dip", "dim", "dam", "jam", "ham", "him", "rim",
    "ram", "ran", "raw", "saw", "sew", "new", "now", "not", "rot", "row",
    "low", "cow", "how", "hog", "fog", "fig", "dig", "did", "lid", "lip",
    "sip", "sir", "fir", "fur", "far", "bar", "car", "jar", "war", "was",
  ];
}
