export class SyllableCounter {
  static count(word: string): number {
    const w = word.toLowerCase().trim();
    if (w.length === 0) return 0;
    if (w.length <= 3) return 1;

    let count = 0;
    let prevVowel = false;
    const vowels = "aeiouy";

    for (let i = 0; i < w.length; i++) {
      const isVowel = vowels.includes(w[i]);
      if (isVowel && !prevVowel) count++;
      prevVowel = isVowel;
    }

    if (w.endsWith("e") && !w.endsWith("le") && count > 1) count--;
    if (w.endsWith("ed") && count > 1) count--;
    if (w.endsWith("es") && !w.endsWith("ses") && !w.endsWith("zes") && count > 1) count--;

    return Math.max(1, count);
  }

  static countInSentence(sentence: string): number {
    return SyllableCounter.words(sentence).reduce((sum, word) => sum + SyllableCounter.count(word), 0);
  }

  static words(text: string): string[] {
    return text.split(/\s+/).filter((w) => w.length > 0 && /[a-zA-Z]/.test(w));
  }

  static sentenceCount(text: string): number {
    const matches = text.match(/[.!?]+/g);
    return matches ? matches.length : (text.trim().length > 0 ? 1 : 0);
  }

  static wordCount(text: string): number {
    return SyllableCounter.words(text).length;
  }

  static averageSyllablesPerWord(text: string): number {
    const w = SyllableCounter.words(text);
    if (w.length === 0) return 0;
    return SyllableCounter.countInSentence(text) / w.length;
  }

  static polysyllableCount(text: string): number {
    return SyllableCounter.words(text).filter((w) => SyllableCounter.count(w) >= 3).length;
  }

  static monosyllableCount(text: string): number {
    return SyllableCounter.words(text).filter((w) => SyllableCounter.count(w) === 1).length;
  }
}
