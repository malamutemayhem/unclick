export type PredictorType = "always-taken" | "always-not-taken" | "one-bit" | "two-bit" | "gshare";

export interface PredictionResult {
  address: number;
  predicted: boolean;
  actual: boolean;
  correct: boolean;
}

export class BranchPredictor {
  private type: PredictorType;
  private tableSize: number;
  private table: number[];
  private ghr: number;
  private stats = { predictions: 0, correct: 0, mispredictions: 0 };

  constructor(type: PredictorType = "two-bit", tableSize = 256) {
    this.type = type;
    this.tableSize = tableSize;
    this.table = new Array(tableSize).fill(1);
    this.ghr = 0;
  }

  predict(address: number, actual: boolean): PredictionResult {
    this.stats.predictions++;
    let predicted: boolean;

    switch (this.type) {
      case "always-taken":
        predicted = true;
        break;
      case "always-not-taken":
        predicted = false;
        break;
      case "one-bit": {
        const idx = address % this.tableSize;
        predicted = this.table[idx] === 1;
        this.table[idx] = actual ? 1 : 0;
        break;
      }
      case "two-bit": {
        const idx = address % this.tableSize;
        predicted = this.table[idx] >= 2;
        if (actual) {
          if (this.table[idx] < 3) this.table[idx]++;
        } else {
          if (this.table[idx] > 0) this.table[idx]--;
        }
        break;
      }
      case "gshare": {
        const idx = (address ^ this.ghr) % this.tableSize;
        predicted = this.table[idx] >= 2;
        if (actual) {
          if (this.table[idx] < 3) this.table[idx]++;
        } else {
          if (this.table[idx] > 0) this.table[idx]--;
        }
        this.ghr = ((this.ghr << 1) | (actual ? 1 : 0)) & (this.tableSize - 1);
        break;
      }
    }

    const correct = predicted === actual;
    if (correct) {
      this.stats.correct++;
    } else {
      this.stats.mispredictions++;
    }

    return { address, predicted, actual, correct };
  }

  get accuracy(): number {
    return this.stats.predictions > 0 ? this.stats.correct / this.stats.predictions : 0;
  }

  get mispredictionRate(): number {
    return 1 - this.accuracy;
  }

  get totalPredictions(): number {
    return this.stats.predictions;
  }

  get correctPredictions(): number {
    return this.stats.correct;
  }

  get mispredictions(): number {
    return this.stats.mispredictions;
  }

  getStats(): { predictions: number; correct: number; mispredictions: number; accuracy: number } {
    return { ...this.stats, accuracy: this.accuracy };
  }

  reset(): void {
    this.table.fill(1);
    this.ghr = 0;
    this.stats = { predictions: 0, correct: 0, mispredictions: 0 };
  }

  get predictorType(): PredictorType {
    return this.type;
  }

  get size(): number {
    return this.tableSize;
  }
}

export function runBenchmark(
  predictor: BranchPredictor,
  pattern: boolean[],
  address = 0x400
): PredictionResult[] {
  return pattern.map((actual) => predictor.predict(address, actual));
}
