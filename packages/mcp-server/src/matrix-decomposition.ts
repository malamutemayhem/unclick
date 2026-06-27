export type Matrix = number[][];

export function luDecompose(matrix: Matrix): { L: Matrix; U: Matrix; P: number[] } | null {
  const n = matrix.length;
  const U: Matrix = matrix.map((row) => [...row]);
  const L: Matrix = Array.from({ length: n }, (_, i) => {
    const row = new Array(n).fill(0);
    row[i] = 1;
    return row;
  });
  const P = Array.from({ length: n }, (_, i) => i);

  for (let col = 0; col < n; col++) {
    let maxVal = Math.abs(U[col][col]);
    let maxRow = col;
    for (let row = col + 1; row < n; row++) {
      if (Math.abs(U[row][col]) > maxVal) {
        maxVal = Math.abs(U[row][col]);
        maxRow = row;
      }
    }

    if (maxVal < 1e-12) return null;

    if (maxRow !== col) {
      [U[col], U[maxRow]] = [U[maxRow], U[col]];
      [P[col], P[maxRow]] = [P[maxRow], P[col]];
      for (let k = 0; k < col; k++) {
        [L[col][k], L[maxRow][k]] = [L[maxRow][k], L[col][k]];
      }
    }

    for (let row = col + 1; row < n; row++) {
      const factor = U[row][col] / U[col][col];
      L[row][col] = factor;
      for (let k = col; k < n; k++) {
        U[row][k] -= factor * U[col][k];
      }
    }
  }

  return { L, U, P };
}

export function solveLU(L: Matrix, U: Matrix, P: number[], b: number[]): number[] {
  const n = L.length;
  const pb = P.map((i) => b[i]);

  const y = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    y[i] = pb[i];
    for (let j = 0; j < i; j++) {
      y[i] -= L[i][j] * y[j];
    }
  }

  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    x[i] = y[i];
    for (let j = i + 1; j < n; j++) {
      x[i] -= U[i][j] * x[j];
    }
    x[i] /= U[i][i];
  }

  return x;
}

export function choleskyDecompose(matrix: Matrix): Matrix | null {
  const n = matrix.length;
  const L: Matrix = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      let sum = 0;
      for (let k = 0; k < j; k++) {
        sum += L[i][k] * L[j][k];
      }
      if (i === j) {
        const val = matrix[i][i] - sum;
        if (val <= 0) return null;
        L[i][j] = Math.sqrt(val);
      } else {
        L[i][j] = (matrix[i][j] - sum) / L[j][j];
      }
    }
  }

  return L;
}

export function determinant(matrix: Matrix): number {
  const result = luDecompose(matrix);
  if (!result) return 0;
  const { U, P } = result;
  let det = 1;
  for (let i = 0; i < U.length; i++) {
    det *= U[i][i];
  }
  const visited = new Array(P.length).fill(false);
  let swaps = 0;
  for (let i = 0; i < P.length; i++) {
    if (visited[i] || P[i] === i) continue;
    let cycleLen = 0;
    let j = i;
    while (!visited[j]) {
      visited[j] = true;
      j = P[j];
      cycleLen++;
    }
    swaps += cycleLen - 1;
  }
  return swaps % 2 === 0 ? det : -det;
}

export function matMul(a: Matrix, b: Matrix): Matrix {
  const m = a.length;
  const n = b[0].length;
  const p = b.length;
  const result: Matrix = Array.from({ length: m }, () => new Array(n).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < p; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return result;
}

export function transpose(matrix: Matrix): Matrix {
  const rows = matrix.length;
  const cols = matrix[0].length;
  return Array.from({ length: cols }, (_, j) =>
    Array.from({ length: rows }, (_, i) => matrix[i][j]),
  );
}
