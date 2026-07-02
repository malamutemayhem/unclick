import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function simplexSolve(args: Record<string, unknown>) {
  const objective = args.objective as number[];
  if (!Array.isArray(objective) || objective.length === 0) {
    throw new Error("objective must be a non-empty array of coefficients to maximize.");
  }
  if (objective.length > 20) throw new Error("objective must have 20 or fewer variables.");

  const constraints = args.constraints as { coeffs: number[]; bound: number }[];
  if (!Array.isArray(constraints) || constraints.length === 0) {
    throw new Error("constraints must be a non-empty array of {coeffs, bound} (all <= constraints).");
  }
  if (constraints.length > 50) throw new Error("constraints must have 50 or fewer rows.");

  const n = objective.length;
  const m = constraints.length;

  for (let i = 0; i < m; i++) {
    if (!Array.isArray(constraints[i].coeffs) || constraints[i].coeffs.length !== n) {
      throw new Error(`constraint ${i} coeffs length must equal objective length (${n}).`);
    }
    if (typeof constraints[i].bound !== "number") {
      throw new Error(`constraint ${i} bound must be a number.`);
    }
    if (constraints[i].bound < 0) {
      throw new Error(`constraint ${i} bound must be non-negative for standard form.`);
    }
  }

  const totalCols = n + m + 1;
  const tableau: number[][] = [];

  for (let i = 0; i < m; i++) {
    const row = new Array(totalCols).fill(0);
    for (let j = 0; j < n; j++) row[j] = constraints[i].coeffs[j];
    row[n + i] = 1;
    row[totalCols - 1] = constraints[i].bound;
    tableau.push(row);
  }

  const objRow = new Array(totalCols).fill(0);
  for (let j = 0; j < n; j++) objRow[j] = -objective[j];
  tableau.push(objRow);

  const basis = new Array(m);
  for (let i = 0; i < m; i++) basis[i] = n + i;

  const maxIter = 1000;
  let iters = 0;

  while (iters < maxIter) {
    iters++;
    const lastRow = tableau[m];

    let pivotCol = -1;
    let minVal = -1e-10;
    for (let j = 0; j < totalCols - 1; j++) {
      if (lastRow[j] < minVal) {
        minVal = lastRow[j];
        pivotCol = j;
      }
    }
    if (pivotCol === -1) break;

    let pivotRow = -1;
    let minRatio = Infinity;
    for (let i = 0; i < m; i++) {
      if (tableau[i][pivotCol] > 1e-10) {
        const ratio = tableau[i][totalCols - 1] / tableau[i][pivotCol];
        if (ratio < minRatio) {
          minRatio = ratio;
          pivotRow = i;
        }
      }
    }

    if (pivotRow === -1) {
      const meta: ConnectorMeta = {
        source: "local-computation",
        fetched_at: new Date().toISOString(),
        next_steps: ["Problem is unbounded - no finite optimal solution exists"],
      };
      return stampMeta({ status: "unbounded", optimal_value: null, solution: null }, meta);
    }

    basis[pivotRow] = pivotCol;
    const pivotVal = tableau[pivotRow][pivotCol];
    for (let j = 0; j < totalCols; j++) tableau[pivotRow][j] /= pivotVal;

    for (let i = 0; i <= m; i++) {
      if (i === pivotRow) continue;
      const factor = tableau[i][pivotCol];
      for (let j = 0; j < totalCols; j++) {
        tableau[i][j] -= factor * tableau[pivotRow][j];
      }
    }
  }

  const solution = new Array(n).fill(0);
  for (let i = 0; i < m; i++) {
    if (basis[i] < n) {
      solution[basis[i]] = Math.round(tableau[i][totalCols - 1] * 1e8) / 1e8;
    }
  }

  const optimalValue = Math.round(tableau[m][totalCols - 1] * 1e8) / 1e8;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "All constraints are <= with non-negative bounds (standard form)",
      "Variables are non-negative by default",
    ],
  };
  return stampMeta({
    status: "optimal",
    optimal_value: optimalValue,
    solution,
    variables: n,
    constraints_count: m,
    iterations: iters,
  }, meta);
}
