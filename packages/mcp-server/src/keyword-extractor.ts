export interface KeywordResult {
  keyword: string;
  score: number;
  frequency: number;
}

export class KeywordExtractor {
  private static readonly STOPWORDS = new Set([
    "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for",
    "of", "with", "by", "from", "as", "is", "was", "are", "were", "been",
    "be", "have", "has", "had", "do", "does", "did", "will", "would",
    "could", "should", "may", "might", "shall", "can", "it", "its",
    "he", "she", "they", "we", "you", "i", "me", "him", "her", "us",
    "them", "my", "your", "his", "our", "their", "this", "that",
    "these", "those", "not", "no", "so", "if", "then", "than",
    "too", "very", "just", "about", "up", "out", "also",
  ]);

  static extract(text: string, topN: number = 10): KeywordResult[] {
    const words = KeywordExtractor.tokenize(text);
    const freq = new Map<string, number>();
    for (const word of words) {
      freq.set(word, (freq.get(word) || 0) + 1);
    }

    const maxFreq = Math.max(1, ...freq.values());
    const results: KeywordResult[] = [];

    for (const [word, count] of freq) {
      const lengthBonus = Math.min(word.length / 10, 0.5);
      const freqScore = count / maxFreq;
      const score = Math.round((freqScore + lengthBonus) * 1000) / 1000;
      results.push({ keyword: word, score, frequency: count });
    }

    return results.sort((a, b) => b.score - a.score).slice(0, topN);
  }

  static phrases(text: string, minLength: number = 2, maxLength: number = 3): KeywordResult[] {
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const phraseCounts = new Map<string, number>();

    for (const sentence of sentences) {
      const words = KeywordExtractor.tokenize(sentence);
      for (let len = minLength; len <= maxLength; len++) {
        for (let i = 0; i <= words.length - len; i++) {
          const phrase = words.slice(i, i + len).join(" ");
          phraseCounts.set(phrase, (phraseCounts.get(phrase) || 0) + 1);
        }
      }
    }

    const results: KeywordResult[] = [];
    for (const [phrase, count] of phraseCounts) {
      if (count >= 2) {
        results.push({
          keyword: phrase,
          score: Math.round(count * (phrase.split(" ").length * 0.5) * 100) / 100,
          frequency: count,
        });
      }
    }

    return results.sort((a, b) => b.score - a.score);
  }

  static rake(text: string, topN: number = 10): KeywordResult[] {
    const sentences = text.toLowerCase().split(/[.!?,;:\n]+/);
    const candidateMap = new Map<string, number>();
    const wordDegree = new Map<string, number>();
    const wordFreq = new Map<string, number>();

    for (const sentence of sentences) {
      const words = sentence
        .split(/\s+/)
        .map((w) => w.replace(/[^a-z]/g, ""))
        .filter((w) => w.length > 0);

      const phrases: string[][] = [];
      let current: string[] = [];
      for (const word of words) {
        if (KeywordExtractor.STOPWORDS.has(word)) {
          if (current.length > 0) phrases.push(current);
          current = [];
        } else {
          current.push(word);
        }
      }
      if (current.length > 0) phrases.push(current);

      for (const phrase of phrases) {
        const key = phrase.join(" ");
        candidateMap.set(key, (candidateMap.get(key) || 0) + 1);
        for (const word of phrase) {
          wordDegree.set(word, (wordDegree.get(word) || 0) + phrase.length);
          wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
        }
      }
    }

    const wordScore = new Map<string, number>();
    for (const [word, degree] of wordDegree) {
      const freq = wordFreq.get(word) || 1;
      wordScore.set(word, degree / freq);
    }

    const results: KeywordResult[] = [];
    for (const [phrase, freq] of candidateMap) {
      const words = phrase.split(" ");
      const score = words.reduce((s, w) => s + (wordScore.get(w) || 0), 0);
      results.push({
        keyword: phrase,
        score: Math.round(score * 100) / 100,
        frequency: freq,
      });
    }

    return results.sort((a, b) => b.score - a.score).slice(0, topN);
  }

  static cooccurrence(text: string, window: number = 5): Map<string, string[]> {
    const words = KeywordExtractor.tokenize(text);
    const pairs = new Map<string, Set<string>>();

    for (let i = 0; i < words.length; i++) {
      for (let j = i + 1; j < Math.min(i + window, words.length); j++) {
        const a = words[i];
        const b = words[j];
        if (a !== b) {
          if (!pairs.has(a)) pairs.set(a, new Set());
          pairs.get(a)!.add(b);
        }
      }
    }

    const result = new Map<string, string[]>();
    for (const [word, neighbors] of pairs) {
      result.set(word, [...neighbors]);
    }
    return result;
  }

  private static tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^a-z\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !KeywordExtractor.STOPWORDS.has(w));
  }
}
