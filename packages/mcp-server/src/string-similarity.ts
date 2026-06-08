export function jaccardSimilarity(a: string, b: string, n = 2): number {
  if (a.length === 0 && b.length === 0) return 1;
  const gramsA = ngrams(a, n);
  const gramsB = ngrams(b, n);
  if (gramsA.size === 0 && gramsB.size === 0) return 1;
  let intersection = 0;
  for (const g of gramsA) {
    if (gramsB.has(g)) intersection++;
  }
  const union = new Set([...gramsA, ...gramsB]).size;
  return union === 0 ? 0 : intersection / union;
}

export function diceCoefficient(a: string, b: string, n = 2): number {
  if (a.length === 0 && b.length === 0) return 1;
  const gramsA = ngrams(a, n);
  const gramsB = ngrams(b, n);
  if (gramsA.size === 0 && gramsB.size === 0) return 1;
  let intersection = 0;
  for (const g of gramsA) {
    if (gramsB.has(g)) intersection++;
  }
  return (2 * intersection) / (gramsA.size + gramsB.size);
}

export function longestCommonSubstring(a: string, b: string): string {
  if (a.length === 0 || b.length === 0) return "";
  let maxLen = 0;
  let endIdx = 0;
  const prev = new Array(b.length + 1).fill(0);
  const curr = new Array(b.length + 1).fill(0);
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        curr[j] = prev[j - 1] + 1;
        if (curr[j] > maxLen) {
          maxLen = curr[j];
          endIdx = i;
        }
      } else {
        curr[j] = 0;
      }
    }
    for (let j = 0; j <= b.length; j++) {
      prev[j] = curr[j];
      curr[j] = 0;
    }
  }
  return a.slice(endIdx - maxLen, endIdx);
}

export function hammingDistance(a: string, b: string): number {
  if (a.length !== b.length) throw new Error("Strings must be same length");
  let d = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) d++;
  }
  return d;
}

function ngrams(s: string, n: number): Set<string> {
  const grams = new Set<string>();
  for (let i = 0; i <= s.length - n; i++) {
    grams.add(s.slice(i, i + n));
  }
  return grams;
}
