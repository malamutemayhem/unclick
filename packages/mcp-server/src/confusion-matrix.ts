export class ConfusionMatrix {
  matrix: number[][];
  labels: string[];

  constructor(labels: string[]) {
    this.labels = labels;
    const n = labels.length;
    this.matrix = Array.from({ length: n }, () => new Array(n).fill(0));
  }

  add(actual: string, predicted: string): void {
    const i = this.labels.indexOf(actual);
    const j = this.labels.indexOf(predicted);
    if (i >= 0 && j >= 0) this.matrix[i][j]++;
  }

  addBatch(actual: string[], predicted: string[]): void {
    for (let i = 0; i < actual.length; i++) {
      this.add(actual[i], predicted[i]);
    }
  }

  accuracy(): number {
    let correct = 0;
    let total = 0;
    for (let i = 0; i < this.labels.length; i++) {
      for (let j = 0; j < this.labels.length; j++) {
        if (i === j) correct += this.matrix[i][j];
        total += this.matrix[i][j];
      }
    }
    return total === 0 ? 0 : Math.round((correct / total) * 10000) / 10000;
  }

  precision(label: string): number {
    const j = this.labels.indexOf(label);
    let tp = 0;
    let fpPlusTp = 0;
    for (let i = 0; i < this.labels.length; i++) {
      if (i === j) tp = this.matrix[i][j];
      fpPlusTp += this.matrix[i][j];
    }
    return fpPlusTp === 0 ? 0 : Math.round((tp / fpPlusTp) * 10000) / 10000;
  }

  recall(label: string): number {
    const i = this.labels.indexOf(label);
    let tp = this.matrix[i][i];
    let total = 0;
    for (let j = 0; j < this.labels.length; j++) {
      total += this.matrix[i][j];
    }
    return total === 0 ? 0 : Math.round((tp / total) * 10000) / 10000;
  }

  f1Score(label: string): number {
    const p = this.precision(label);
    const r = this.recall(label);
    return p + r === 0 ? 0 : Math.round((2 * p * r / (p + r)) * 10000) / 10000;
  }

  macroPrecision(): number {
    const sum = this.labels.reduce((s, l) => s + this.precision(l), 0);
    return Math.round((sum / this.labels.length) * 10000) / 10000;
  }

  macroRecall(): number {
    const sum = this.labels.reduce((s, l) => s + this.recall(l), 0);
    return Math.round((sum / this.labels.length) * 10000) / 10000;
  }

  macroF1(): number {
    const p = this.macroPrecision();
    const r = this.macroRecall();
    return p + r === 0 ? 0 : Math.round((2 * p * r / (p + r)) * 10000) / 10000;
  }

  total(): number {
    let sum = 0;
    for (const row of this.matrix) {
      for (const v of row) sum += v;
    }
    return sum;
  }

  render(): string {
    const pad = (s: string, n: number) => s.padStart(n);
    const maxLen = Math.max(...this.labels.map(l => l.length), 4);
    const header = pad("", maxLen) + " | " + this.labels.map(l => pad(l, maxLen)).join(" ");
    const sep = "-".repeat(header.length);
    const rows = this.matrix.map((row, i) =>
      pad(this.labels[i], maxLen) + " | " + row.map(v => pad(String(v), maxLen)).join(" "),
    );
    return [sep, header, sep, ...rows, sep].join("\n");
  }
}
