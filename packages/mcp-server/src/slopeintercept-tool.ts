import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function slopeIntercept(args: Record<string, unknown>) {
  const x1 = typeof args.x1 === "number" ? args.x1 : NaN;
  const y1 = typeof args.y1 === "number" ? args.y1 : NaN;
  const x2 = typeof args.x2 === "number" ? args.x2 : NaN;
  const y2 = typeof args.y2 === "number" ? args.y2 : NaN;
  if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
    return { error: "x1, y1, x2, and y2 are required (numbers)" };
  }
  if (x1 === x2 && y1 === y2) return { error: "Points must be distinct" };

  const isVertical = x1 === x2;
  if (isVertical) {
    const meta: ConnectorMeta = { source: "local-computation", fetched_at: new Date().toISOString(), next_steps: ["Vertical lines have undefined slope"] };
    return stampMeta({ point1: { x: x1, y: y1 }, point2: { x: x2, y: y2 }, is_vertical: true, equation: `x = ${x1}` }, meta);
  }

  const slope = (y2 - y1) / (x2 - x1);
  const intercept = y1 - slope * x1;
  const A = y2 - y1;
  const B = x1 - x2;
  const C = A * x1 + B * y1;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["y = mx + b is slope-intercept form", "Ax + By = C is standard form"],
  };
  return stampMeta({
    point1: { x: x1, y: y1 },
    point2: { x: x2, y: y2 },
    is_vertical: false,
    slope: +slope.toFixed(8),
    y_intercept: +intercept.toFixed(8),
    x_intercept: slope !== 0 ? +(-intercept / slope).toFixed(8) : "none",
    slope_intercept: `y = ${slope.toFixed(4)}x + ${intercept.toFixed(4)}`,
    standard_form: { A: +A.toFixed(6), B: +B.toFixed(6), C: +C.toFixed(6) },
  }, meta);
}
