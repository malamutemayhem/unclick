export class SVD {
  static decompose(
    matrix: number[][],
    maxIter = 100,
  ): { U: number[][]; S: number[]; V: number[][] } {
    const m = matrix.length;
    const n = matrix[0].length;
    const k = Math.min(m, n);

    const AtA = SVD.matMul(SVD.transpose(matrix), matrix);
    const { eigenvalues, eigenvectors } = SVD.eigenDecomposition(AtA, k, maxIter);

    const S = eigenvalues.map(v => Math.round(Math.sqrt(Math.max(0, v)) * 10000) / 10000);
    const V = eigenvectors;

    const U: number[][] = [];
    for (let i = 0; i < k; i++) {
      if (S[i] === 0) {
        U.push(new Array(m).fill(0));
        continue;
      }
      const col = new Array(m).fill(0);
      for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
          col[r] += matrix[r][c] * V[i][c];
        }
        col[r] = Math.round((col[r] / S[i]) * 10000) / 10000;
      }
      U.push(col);
    }

    return { U, S, V };
  }

  static reconstruct(U: number[][], S: number[], V: number[][]): number[][] {
    const m = U[0]?.length || 0;
    const n = V[0]?.length || 0;
    const result: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));

    for (let k = 0; k < S.length; k++) {
      for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
          result[i][j] += S[k] * (U[k]?.[i] || 0) * (V[k]?.[j] || 0);
        }
      }
    }

    return result.map(row => row.map(v => Math.round(v * 10000) / 10000));
  }

  static lowRank(matrix: number[][], rank: number): number[][] {
    const { U, S, V } = SVD.decompose(matrix);
    const Ur = U.slice(0, rank);
    const Sr = S.slice(0, rank);
    const Vr = V.slice(0, rank);
    return SVD.reconstruct(Ur, Sr, Vr);
  }

  static pseudoInverse(matrix: number[][]): number[][] {
    const { U, S, V } = SVD.decompose(matrix);
    const eps = 1e-10;
    const Sinv = S.map(s => (s > eps ? Math.round((1 / s) * 10000) / 10000 : 0));

    const m = V[0]?.length || 0;
    const n = U[0]?.length || 0;
    const result: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));

    for (let k = 0; k < Sinv.length; k++) {
      for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
          result[i][j] += Sinv[k] * (V[k]?.[i] || 0) * (U[k]?.[j] || 0);
        }
      }
    }

    return result.map(row => row.map(v => Math.round(v * 10000) / 10000));
  }

  private static transpose(m: number[][]): number[][] {
    const rows = m.length;
    const cols = m[0].length;
    const result: number[][] = Array.from({ length: cols }, () => new Array(rows));
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) result[j][i] = m[i][j];
    }
    return result;
  }

  private static matMul(a: number[][], b: number[][]): number[][] {
    const m = a.length;
    const n = b[0].length;
    const p = b.length;
    const result: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        for (let k = 0; k < p; k++) result[i][j] += a[i][k] * b[k][j];
      }
    }
    return result;
  }

  private static eigenDecomposition(
    matrix: number[][],
    k: number,
    maxIter: number,
  ): { eigenvalues: number[]; eigenvectors: number[][] } {
    const n = matrix.length;
    const eigenvalues: number[] = [];
    const eigenvectors: number[][] = [];
    const A = matrix.map(row => [...row]);

    for (let comp = 0; comp < k; comp++) {
      let v = new Array(n).fill(0).map((_, i) => (i === comp ? 1 : 0.01 * Math.random()));
      let eigenvalue = 0;

      for (let iter = 0; iter < maxIter; iter++) {
        const Av = new Array(n).fill(0);
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) Av[i] += A[i][j] * v[j];
        }
        eigenvalue = Math.sqrt(Av.reduce((s, x) => s + x * x, 0));
        if (eigenvalue === 0) break;
        v = Av.map(x => x / eigenvalue);
      }

      eigenvalues.push(eigenvalue);
      eigenvectors.push(v.map(x => Math.round(x * 10000) / 10000));

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          A[i][j] -= eigenvalue * v[i] * v[j];
        }
      }
    }

    return { eigenvalues, eigenvectors };
  }
}
