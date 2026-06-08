export class DCT {
  static forward(signal: number[]): number[] {
    const N = signal.length;
    const result = new Array(N);
    for (let k = 0; k < N; k++) {
      let sum = 0;
      for (let n = 0; n < N; n++) {
        sum += signal[n] * Math.cos((Math.PI * (2 * n + 1) * k) / (2 * N));
      }
      result[k] = sum * (k === 0 ? Math.sqrt(1 / N) : Math.sqrt(2 / N));
    }
    return result;
  }

  static inverse(coeffs: number[]): number[] {
    const N = coeffs.length;
    const result = new Array(N);
    for (let n = 0; n < N; n++) {
      let sum = 0;
      for (let k = 0; k < N; k++) {
        const scale = k === 0 ? Math.sqrt(1 / N) : Math.sqrt(2 / N);
        sum += scale * coeffs[k] * Math.cos((Math.PI * (2 * n + 1) * k) / (2 * N));
      }
      result[n] = sum;
    }
    return result;
  }

  static compress(signal: number[], keepCount: number): number[] {
    const coeffs = DCT.forward(signal);
    for (let i = keepCount; i < coeffs.length; i++) {
      coeffs[i] = 0;
    }
    return DCT.inverse(coeffs);
  }

  static energy(coeffs: number[]): number {
    return coeffs.reduce((sum, c) => sum + c * c, 0);
  }

  static energyCompaction(signal: number[], keepCount: number): number {
    const coeffs = DCT.forward(signal);
    const totalEnergy = DCT.energy(coeffs);
    const keptEnergy = DCT.energy(coeffs.slice(0, keepCount));
    return totalEnergy > 0 ? keptEnergy / totalEnergy : 0;
  }

  static forward2D(matrix: number[][]): number[][] {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const rowTransformed = matrix.map((row) => DCT.forward(row));
    const result: number[][] = Array.from({ length: rows }, () => new Array(cols));
    for (let j = 0; j < cols; j++) {
      const col = rowTransformed.map((row) => row[j]);
      const transformed = DCT.forward(col);
      for (let i = 0; i < rows; i++) {
        result[i][j] = transformed[i];
      }
    }
    return result;
  }

  static inverse2D(coeffs: number[][]): number[][] {
    const rows = coeffs.length;
    const cols = coeffs[0].length;
    const colInversed: number[][] = Array.from({ length: rows }, () => new Array(cols));
    for (let j = 0; j < cols; j++) {
      const col = coeffs.map((row) => row[j]);
      const inv = DCT.inverse(col);
      for (let i = 0; i < rows; i++) {
        colInversed[i][j] = inv[i];
      }
    }
    return colInversed.map((row) => DCT.inverse(row));
  }
}
