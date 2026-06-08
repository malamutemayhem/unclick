import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function interpolateCalc(args: Record<string, unknown>) {
  const x1 = typeof args.x1 === "number" ? args.x1 : NaN;
  const y1 = typeof args.y1 === "number" ? args.y1 : NaN;
  const x2 = typeof args.x2 === "number" ? args.x2 : NaN;
  const y2 = typeof args.y2 === "number" ? args.y2 : NaN;
  const x = typeof args.x === "number" ? args.x : NaN;
  if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || isNaN(x)) {
    return { error: "x1, y1, x2, y2, and x are required (numbers)" };
  }
  if (x1 === x2) return { error: "x1 and x2 must be different" };

  const t = (x - x1) / (x2 - x1);
  const y = y1 + t * (y2 - y1);
  const slope = (y2 - y1) / (x2 - x1);
  const intercept = y1 - slope * x1;
  const isExtrapolation = t < 0 || t > 1;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["t between 0 and 1 means interpolation; outside means extrapolation", "Use slope and intercept for the full line equation"],
  };
  return stampMeta({
    point1: { x: x1, y: y1 },
    point2: { x: x2, y: y2 },
    query_x: x,
    result_y: +y.toFixed(8),
    t: +t.toFixed(8),
    is_extrapolation: isExtrapolation,
    line: { slope: +slope.toFixed(8), intercept: +intercept.toFixed(8) },
    equation: `y = ${slope.toFixed(4)}x + ${intercept.toFixed(4)}`,
  }, meta);
}
