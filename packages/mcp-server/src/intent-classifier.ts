export interface Intent {
  name: string;
  patterns: string[];
  examples?: string[];
}

export interface ClassificationResult {
  intent: string;
  confidence: number;
  matchedPattern?: string;
}

function tokenize(text: string): string[] {
  return text.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/).filter(Boolean);
}

function jaccardSimilarity(a: Set<string>, b: Set<string>): number {
  const intersection = new Set([...a].filter((x) => b.has(x)));
  const union = new Set([...a, ...b]);
  if (union.size === 0) return 0;
  return intersection.size / union.size;
}

export function classifyIntent(text: string, intents: Intent[]): ClassificationResult {
  const textTokens = new Set(tokenize(text));
  let bestIntent = "unknown";
  let bestConfidence = 0;
  let bestPattern: string | undefined;

  for (const intent of intents) {
    for (const pattern of intent.patterns) {
      const patternTokens = new Set(tokenize(pattern));
      const sim = jaccardSimilarity(textTokens, patternTokens);
      if (sim > bestConfidence) {
        bestConfidence = sim;
        bestIntent = intent.name;
        bestPattern = pattern;
      }
    }
    if (intent.examples) {
      for (const example of intent.examples) {
        const exTokens = new Set(tokenize(example));
        const sim = jaccardSimilarity(textTokens, exTokens);
        if (sim > bestConfidence) {
          bestConfidence = sim;
          bestIntent = intent.name;
          bestPattern = example;
        }
      }
    }
  }

  return { intent: bestIntent, confidence: bestConfidence, matchedPattern: bestPattern };
}

export function classifyTopN(text: string, intents: Intent[], n: number): ClassificationResult[] {
  const results: ClassificationResult[] = [];
  const textTokens = new Set(tokenize(text));

  for (const intent of intents) {
    let bestSim = 0;
    let bestPattern: string | undefined;
    for (const pattern of [...intent.patterns, ...(intent.examples || [])]) {
      const sim = jaccardSimilarity(textTokens, new Set(tokenize(pattern)));
      if (sim > bestSim) { bestSim = sim; bestPattern = pattern; }
    }
    results.push({ intent: intent.name, confidence: bestSim, matchedPattern: bestPattern });
  }

  return results.sort((a, b) => b.confidence - a.confidence).slice(0, n);
}

export function extractEntities(text: string, entityPatterns: Record<string, RegExp>): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  for (const [entity, pattern] of Object.entries(entityPatterns)) {
    const matches = text.match(new RegExp(pattern.source, "gi"));
    if (matches) result[entity] = matches;
  }
  return result;
}
