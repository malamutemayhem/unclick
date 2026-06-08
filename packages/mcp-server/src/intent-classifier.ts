export interface Intent {
  name: string;
  keywords: string[];
  patterns?: RegExp[];
  score?: number;
}

export interface ClassificationResult {
  intent: string;
  confidence: number;
  scores: { intent: string; score: number }[];
}

export class IntentClassifier {
  private intents: Intent[] = [];

  register(intent: Intent): void {
    this.intents.push(intent);
  }

  classify(text: string): ClassificationResult {
    const lower = text.toLowerCase();
    const words = lower.split(/\s+/);
    const scores: { intent: string; score: number }[] = [];

    for (const intent of this.intents) {
      let score = 0;
      for (const kw of intent.keywords) {
        if (lower.includes(kw.toLowerCase())) {
          score += 1;
          if (words.includes(kw.toLowerCase())) score += 0.5;
        }
      }
      if (intent.patterns) {
        for (const p of intent.patterns) {
          if (p.test(text)) score += 2;
        }
      }
      if (intent.keywords.length > 0) {
        score = score / intent.keywords.length;
      }
      scores.push({ intent: intent.name, score });
    }

    scores.sort((a, b) => b.score - a.score);
    const topScore = scores[0]?.score ?? 0;
    const totalScore = scores.reduce((s, e) => s + e.score, 0);
    const confidence = totalScore > 0 ? topScore / totalScore : 0;

    return {
      intent: scores[0]?.intent ?? "unknown",
      confidence: Math.round(confidence * 100) / 100,
      scores,
    };
  }

  classifyTop(text: string, n: number): { intent: string; score: number }[] {
    const result = this.classify(text);
    return result.scores.slice(0, n);
  }

  get intentCount(): number {
    return this.intents.length;
  }

  listIntents(): string[] {
    return this.intents.map((i) => i.name);
  }
}

export function quickClassify(text: string, intents: Record<string, string[]>): string {
  const classifier = new IntentClassifier();
  for (const [name, keywords] of Object.entries(intents)) {
    classifier.register({ name, keywords });
  }
  return classifier.classify(text).intent;
}
