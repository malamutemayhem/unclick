import { SyllableCounter } from "./syllable-counter.js";

export interface ReadabilityResult {
  score: number;
  grade: string;
  description: string;
}

export class ReadabilityAnalyzer {
  static fleschKincaid(text: string): ReadabilityResult {
    const words = SyllableCounter.wordCount(text);
    const sentences = SyllableCounter.sentenceCount(text);
    const syllables = SyllableCounter.countInSentence(text);

    if (words === 0 || sentences === 0) {
      return { score: 0, grade: "N/A", description: "Insufficient text" };
    }

    const score = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
    return {
      score: Math.round(score * 10) / 10,
      grade: ReadabilityAnalyzer.fleschGrade(score),
      description: ReadabilityAnalyzer.fleschDescription(score),
    };
  }

  static fleschKincaidGradeLevel(text: string): number {
    const words = SyllableCounter.wordCount(text);
    const sentences = SyllableCounter.sentenceCount(text);
    const syllables = SyllableCounter.countInSentence(text);

    if (words === 0 || sentences === 0) return 0;

    return Math.round((0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59) * 10) / 10;
  }

  static gunningFog(text: string): number {
    const words = SyllableCounter.wordCount(text);
    const sentences = SyllableCounter.sentenceCount(text);
    const complexWords = SyllableCounter.polysyllableCount(text);

    if (words === 0 || sentences === 0) return 0;

    return Math.round(0.4 * (words / sentences + 100 * (complexWords / words)) * 10) / 10;
  }

  static colemanLiau(text: string): number {
    const words = SyllableCounter.wordCount(text);
    const sentences = SyllableCounter.sentenceCount(text);
    const chars = text.replace(/\s/g, "").length;

    if (words === 0) return 0;

    const L = (chars / words) * 100;
    const S = (sentences / words) * 100;

    return Math.round((0.0588 * L - 0.296 * S - 15.8) * 10) / 10;
  }

  static automatedReadability(text: string): number {
    const words = SyllableCounter.wordCount(text);
    const sentences = SyllableCounter.sentenceCount(text);
    const chars = text.replace(/\s/g, "").length;

    if (words === 0 || sentences === 0) return 0;

    return Math.round((4.71 * (chars / words) + 0.5 * (words / sentences) - 21.43) * 10) / 10;
  }

  static summary(text: string): Record<string, number> {
    return {
      fleschReading: ReadabilityAnalyzer.fleschKincaid(text).score,
      fleschGradeLevel: ReadabilityAnalyzer.fleschKincaidGradeLevel(text),
      gunningFog: ReadabilityAnalyzer.gunningFog(text),
      colemanLiau: ReadabilityAnalyzer.colemanLiau(text),
      automatedReadability: ReadabilityAnalyzer.automatedReadability(text),
      words: SyllableCounter.wordCount(text),
      sentences: SyllableCounter.sentenceCount(text),
      syllables: SyllableCounter.countInSentence(text),
    };
  }

  private static fleschGrade(score: number): string {
    if (score >= 90) return "5th grade";
    if (score >= 80) return "6th grade";
    if (score >= 70) return "7th grade";
    if (score >= 60) return "8th-9th grade";
    if (score >= 50) return "10th-12th grade";
    if (score >= 30) return "College";
    return "College graduate";
  }

  private static fleschDescription(score: number): string {
    if (score >= 90) return "Very easy to read";
    if (score >= 80) return "Easy to read";
    if (score >= 70) return "Fairly easy to read";
    if (score >= 60) return "Standard";
    if (score >= 50) return "Fairly difficult";
    if (score >= 30) return "Difficult";
    return "Very difficult";
  }
}
