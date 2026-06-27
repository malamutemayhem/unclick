export function editDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[m][n];
}

export function damerauLevenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + cost);
      }
    }
  }
  return dp[m][n];
}

export class SpellChecker {
  private dictionary: Set<string>;
  private words: string[];

  constructor(words: string[]) {
    this.dictionary = new Set(words.map(w => w.toLowerCase()));
    this.words = Array.from(this.dictionary);
  }

  isCorrect(word: string): boolean {
    return this.dictionary.has(word.toLowerCase());
  }

  suggest(word: string, maxSuggestions = 5, maxDistance = 2): string[] {
    const lower = word.toLowerCase();
    if (this.dictionary.has(lower)) return [lower];

    const candidates: { word: string; dist: number }[] = [];
    for (const dictWord of this.words) {
      if (Math.abs(dictWord.length - lower.length) > maxDistance) continue;
      const dist = editDistance(lower, dictWord);
      if (dist <= maxDistance) {
        candidates.push({ word: dictWord, dist });
      }
    }

    candidates.sort((a, b) => a.dist - b.dist);
    return candidates.slice(0, maxSuggestions).map(c => c.word);
  }

  addWord(word: string): void {
    const lower = word.toLowerCase();
    if (!this.dictionary.has(lower)) {
      this.dictionary.add(lower);
      this.words.push(lower);
    }
  }

  removeWord(word: string): boolean {
    const lower = word.toLowerCase();
    if (!this.dictionary.has(lower)) return false;
    this.dictionary.delete(lower);
    this.words = this.words.filter(w => w !== lower);
    return true;
  }

  get wordCount(): number {
    return this.dictionary.size;
  }

  checkText(text: string): { word: string; correct: boolean; suggestions: string[] }[] {
    const tokens = text.split(/\s+/).filter(t => t.length > 0);
    return tokens.map(word => {
      const cleaned = word.replace(/[^a-zA-Z]/g, "");
      if (!cleaned) return { word, correct: true, suggestions: [] };
      const correct = this.isCorrect(cleaned);
      return {
        word,
        correct,
        suggestions: correct ? [] : this.suggest(cleaned, 3),
      };
    });
  }
}

export function soundex(word: string): string {
  if (!word) return "";
  const upper = word.toUpperCase();
  let result = upper[0];
  const map: Record<string, string> = {
    B: "1", F: "1", P: "1", V: "1",
    C: "2", G: "2", J: "2", K: "2", Q: "2", S: "2", X: "2", Z: "2",
    D: "3", T: "3",
    L: "4",
    M: "5", N: "5",
    R: "6",
  };

  let prev = map[upper[0]] ?? "0";
  for (let i = 1; i < upper.length && result.length < 4; i++) {
    const code = map[upper[i]] ?? "0";
    if (code !== "0" && code !== prev) {
      result += code;
    }
    prev = code;
  }

  return result.padEnd(4, "0");
}
