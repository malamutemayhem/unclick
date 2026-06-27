export function simpleHash(text: string): number {
  let hash = 5381;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) + hash + text.charCodeAt(i)) & 0xffffffff;
  }
  return hash >>> 0;
}

export function shingles(text: string, size = 3): Set<string> {
  const words = text.toLowerCase().split(/\s+/).filter(Boolean);
  const result = new Set<string>();
  for (let i = 0; i <= words.length - size; i++) {
    result.add(words.slice(i, i + size).join(" "));
  }
  return result;
}

export function jaccardSimilarity(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 1;
  const intersection = new Set([...a].filter((x) => b.has(x)));
  const union = new Set([...a, ...b]);
  return intersection.size / union.size;
}

export function fingerprint(text: string, shingleSize = 3): number[] {
  const s = shingles(text, shingleSize);
  return [...s].map(simpleHash).sort((a, b) => a - b);
}

export function similarity(fpA: number[], fpB: number[]): number {
  if (fpA.length === 0 && fpB.length === 0) return 1;
  const setA = new Set(fpA);
  const setB = new Set(fpB);
  let intersection = 0;
  for (const h of setA) {
    if (setB.has(h)) intersection++;
  }
  const union = new Set([...fpA, ...fpB]).size;
  return union > 0 ? intersection / union : 0;
}

export function isDuplicate(textA: string, textB: string, threshold = 0.8): boolean {
  const fpA = fingerprint(textA);
  const fpB = fingerprint(textB);
  return similarity(fpA, fpB) >= threshold;
}

export function findDuplicates(texts: string[], threshold = 0.8): Array<[number, number]> {
  const fps = texts.map((t) => fingerprint(t));
  const pairs: Array<[number, number]> = [];
  for (let i = 0; i < fps.length; i++) {
    for (let j = i + 1; j < fps.length; j++) {
      if (similarity(fps[i], fps[j]) >= threshold) {
        pairs.push([i, j]);
      }
    }
  }
  return pairs;
}
