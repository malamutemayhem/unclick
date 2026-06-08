export interface CVResult {
  scores: number[];
  mean: number;
  stdDev: number;
  min: number;
  max: number;
}

export class CrossValidation {
  static kFold<T>(
    data: T[],
    k: number,
    trainAndEvaluate: (train: T[], test: T[]) => number,
  ): CVResult {
    const foldSize = Math.floor(data.length / k);
    const scores: number[] = [];

    for (let i = 0; i < k; i++) {
      const testStart = i * foldSize;
      const testEnd = i === k - 1 ? data.length : testStart + foldSize;
      const test = data.slice(testStart, testEnd);
      const train = [...data.slice(0, testStart), ...data.slice(testEnd)];
      scores.push(trainAndEvaluate(train, test));
    }

    return CrossValidation.summarize(scores);
  }

  static leaveOneOut<T>(
    data: T[],
    trainAndEvaluate: (train: T[], test: T[]) => number,
  ): CVResult {
    return CrossValidation.kFold(data, data.length, trainAndEvaluate);
  }

  static stratifiedKFold<T>(
    data: T[],
    labels: string[],
    k: number,
    trainAndEvaluate: (train: T[], trainLabels: string[], test: T[], testLabels: string[]) => number,
  ): CVResult {
    const groups: Map<string, number[]> = new Map();
    for (let i = 0; i < labels.length; i++) {
      const indices = groups.get(labels[i]) || [];
      indices.push(i);
      groups.set(labels[i], indices);
    }

    const folds: number[][] = Array.from({ length: k }, () => []);
    for (const indices of groups.values()) {
      for (let i = 0; i < indices.length; i++) {
        folds[i % k].push(indices[i]);
      }
    }

    const scores: number[] = [];
    for (let i = 0; i < k; i++) {
      const testIdx = new Set(folds[i]);
      const train: T[] = [];
      const trainLbl: string[] = [];
      const test: T[] = [];
      const testLbl: string[] = [];
      for (let j = 0; j < data.length; j++) {
        if (testIdx.has(j)) {
          test.push(data[j]);
          testLbl.push(labels[j]);
        } else {
          train.push(data[j]);
          trainLbl.push(labels[j]);
        }
      }
      scores.push(trainAndEvaluate(train, trainLbl, test, testLbl));
    }

    return CrossValidation.summarize(scores);
  }

  static holdout<T>(
    data: T[],
    ratio: number,
    trainAndEvaluate: (train: T[], test: T[]) => number,
  ): number {
    const splitIdx = Math.floor(data.length * ratio);
    const train = data.slice(0, splitIdx);
    const test = data.slice(splitIdx);
    return trainAndEvaluate(train, test);
  }

  static repeatedKFold<T>(
    data: T[],
    k: number,
    repeats: number,
    trainAndEvaluate: (train: T[], test: T[]) => number,
  ): CVResult {
    const allScores: number[] = [];
    for (let r = 0; r < repeats; r++) {
      const shuffled = CrossValidation.shuffle([...data]);
      const result = CrossValidation.kFold(shuffled, k, trainAndEvaluate);
      allScores.push(...result.scores);
    }
    return CrossValidation.summarize(allScores);
  }

  private static summarize(scores: number[]): CVResult {
    const mean = scores.reduce((s, v) => s + v, 0) / scores.length;
    const variance = scores.reduce((s, v) => s + (v - mean) ** 2, 0) / scores.length;
    return {
      scores: scores.map(s => Math.round(s * 10000) / 10000),
      mean: Math.round(mean * 10000) / 10000,
      stdDev: Math.round(Math.sqrt(variance) * 10000) / 10000,
      min: Math.round(Math.min(...scores) * 10000) / 10000,
      max: Math.round(Math.max(...scores) * 10000) / 10000,
    };
  }

  private static shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}
