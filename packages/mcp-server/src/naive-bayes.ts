export class NaiveBayes {
  private classCounts: Map<string, number> = new Map();
  private featureCounts: Map<string, Map<string, Map<string, number>>> = new Map();
  private totalSamples = 0;

  train(features: Record<string, string>, label: string): void {
    this.classCounts.set(label, (this.classCounts.get(label) || 0) + 1);
    this.totalSamples++;

    if (!this.featureCounts.has(label)) {
      this.featureCounts.set(label, new Map());
    }
    const classFeatures = this.featureCounts.get(label)!;

    for (const [feature, value] of Object.entries(features)) {
      if (!classFeatures.has(feature)) {
        classFeatures.set(feature, new Map());
      }
      const valueCounts = classFeatures.get(feature)!;
      valueCounts.set(value, (valueCounts.get(value) || 0) + 1);
    }
  }

  trainBatch(data: { features: Record<string, string>; label: string }[]): void {
    for (const sample of data) {
      this.train(sample.features, sample.label);
    }
  }

  predict(features: Record<string, string>): string {
    const scores = this.scores(features);
    let best = "";
    let bestScore = -Infinity;
    for (const [label, score] of Object.entries(scores)) {
      if (score > bestScore) {
        bestScore = score;
        best = label;
      }
    }
    return best;
  }

  scores(features: Record<string, string>): Record<string, number> {
    const result: Record<string, number> = {};
    for (const [label, count] of this.classCounts) {
      let logProb = Math.log(count / this.totalSamples);
      const classFeatures = this.featureCounts.get(label)!;

      for (const [feature, value] of Object.entries(features)) {
        const valueCounts = classFeatures.get(feature);
        const valueCount = valueCounts?.get(value) || 0;
        logProb += Math.log((valueCount + 1) / (count + this.uniqueValues(feature)));
      }
      result[label] = Math.round(logProb * 10000) / 10000;
    }
    return result;
  }

  accuracy(data: { features: Record<string, string>; label: string }[]): number {
    let correct = 0;
    for (const sample of data) {
      if (this.predict(sample.features) === sample.label) correct++;
    }
    return Math.round((correct / data.length) * 10000) / 10000;
  }

  get classes(): string[] {
    return Array.from(this.classCounts.keys());
  }

  classProbability(label: string): number {
    const count = this.classCounts.get(label) || 0;
    return this.totalSamples === 0 ? 0 : Math.round((count / this.totalSamples) * 10000) / 10000;
  }

  private uniqueValues(feature: string): number {
    const values = new Set<string>();
    for (const classFeatures of this.featureCounts.values()) {
      const valueCounts = classFeatures.get(feature);
      if (valueCounts) {
        for (const v of valueCounts.keys()) values.add(v);
      }
    }
    return values.size;
  }
}
