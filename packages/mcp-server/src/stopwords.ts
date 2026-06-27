export class Stopwords {
  private static readonly EN: Set<string> = new Set([
    "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for",
    "of", "with", "by", "from", "as", "is", "was", "are", "were", "been",
    "be", "have", "has", "had", "do", "does", "did", "will", "would",
    "could", "should", "may", "might", "shall", "can", "need", "dare",
    "ought", "used", "it", "its", "he", "she", "they", "we", "you", "i",
    "me", "him", "her", "us", "them", "my", "your", "his", "our", "their",
    "this", "that", "these", "those", "who", "whom", "which", "what",
    "where", "when", "how", "why", "all", "each", "every", "both",
    "few", "more", "most", "other", "some", "such", "no", "nor", "not",
    "only", "own", "same", "so", "than", "too", "very", "just", "because",
    "if", "then", "else", "while", "about", "up", "out", "off", "over",
    "under", "again", "further", "once", "here", "there", "am", "into",
    "through", "during", "before", "after", "above", "below", "between",
    "being", "having", "doing",
  ]);

  static remove(words: string[]): string[] {
    return words.filter((w) => !Stopwords.EN.has(w.toLowerCase()));
  }

  static removeFromText(text: string): string {
    return text
      .split(/\s+/)
      .filter((w) => !Stopwords.EN.has(w.toLowerCase().replace(/[^a-z]/g, "")))
      .join(" ");
  }

  static isStopword(word: string): boolean {
    return Stopwords.EN.has(word.toLowerCase());
  }

  static list(): string[] {
    return [...Stopwords.EN].sort();
  }

  static count(): number {
    return Stopwords.EN.size;
  }

  static filter(words: string[], custom: string[]): string[] {
    const combined = new Set([...Stopwords.EN, ...custom.map((w) => w.toLowerCase())]);
    return words.filter((w) => !combined.has(w.toLowerCase()));
  }

  static ratio(text: string): number {
    const words = text.split(/\s+/).filter((w) => w.length > 0);
    if (words.length === 0) return 0;
    const stopCount = words.filter((w) => Stopwords.EN.has(w.toLowerCase().replace(/[^a-z]/g, ""))).length;
    return Math.round((stopCount / words.length) * 1000) / 1000;
  }

  static contentWords(text: string): string[] {
    return text
      .split(/\s+/)
      .map((w) => w.toLowerCase().replace(/[^a-z]/g, ""))
      .filter((w) => w.length > 0 && !Stopwords.EN.has(w));
  }

  static density(text: string): Map<string, number> {
    const content = Stopwords.contentWords(text);
    const counts = new Map<string, number>();
    for (const w of content) {
      counts.set(w, (counts.get(w) || 0) + 1);
    }
    return counts;
  }
}
