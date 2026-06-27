export function ngrams(text: string, n: number): string[] {
  const clean = text.toLowerCase();
  const result: string[] = [];
  for (let i = 0; i <= clean.length - n; i++) {
    result.push(clean.slice(i, i + n));
  }
  return result;
}

export function ngramSet(text: string, n: number): Set<string> {
  return new Set(ngrams(text, n));
}

export function cosineSimilarity(a: string, b: string, n = 2): number {
  const gramsA = ngrams(a, n);
  const gramsB = ngrams(b, n);
  const freqA = frequency(gramsA);
  const freqB = frequency(gramsB);
  const allGrams = new Set([...freqA.keys(), ...freqB.keys()]);
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (const gram of allGrams) {
    const va = freqA.get(gram) ?? 0;
    const vb = freqB.get(gram) ?? 0;
    dot += va * vb;
    magA += va * va;
    magB += vb * vb;
  }
  const denom = Math.sqrt(magA) * Math.sqrt(magB);
  return denom > 0 ? dot / denom : 0;
}

export function diceCoefficient(a: string, b: string, n = 2): number {
  const setA = ngramSet(a, n);
  const setB = ngramSet(b, n);
  const intersection = [...setA].filter((g) => setB.has(g)).length;
  const total = setA.size + setB.size;
  return total > 0 ? (2 * intersection) / total : 0;
}

export function overlapCoefficient(a: string, b: string, n = 2): number {
  const setA = ngramSet(a, n);
  const setB = ngramSet(b, n);
  const intersection = [...setA].filter((g) => setB.has(g)).length;
  const minSize = Math.min(setA.size, setB.size);
  return minSize > 0 ? intersection / minSize : 0;
}

function frequency(grams: string[]): Map<string, number> {
  const freq = new Map<string, number>();
  for (const g of grams) freq.set(g, (freq.get(g) ?? 0) + 1);
  return freq;
}
