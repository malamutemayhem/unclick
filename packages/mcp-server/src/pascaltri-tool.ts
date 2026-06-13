import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function pascaltriGenerate(args: Record<string, unknown>) {
  const rows = typeof args.rows === "number" && args.rows >= 1 ? Math.min(Math.floor(args.rows), 50) : 10;

  const triangle: number[][] = [];
  for (let i = 0; i < rows; i++) {
    const row = [1];
    for (let j = 1; j < i; j++) {
      row.push(triangle[i - 1][j - 1] + triangle[i - 1][j]);
    }
    if (i > 0) row.push(1);
    triangle.push(row);
  }

  const nthRow = typeof args.nth_row === "number" && args.nth_row >= 0 ? Math.floor(args.nth_row) : null;
  let specific: number[] | null = null;
  if (nthRow !== null && nthRow < rows) {
    specific = triangle[nthRow];
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use nth_row to get a specific row", "Max 50 rows"],
  };
  return stampMeta({
    rows: triangle.length,
    triangle,
    ...(specific ? { nth_row: nthRow, nth_row_values: specific } : {}),
  }, meta);
}
