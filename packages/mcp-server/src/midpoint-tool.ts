import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function midpointCalc(args: Record<string, unknown>) {
  const x1 = typeof args.x1 === "number" ? args.x1 : NaN;
  const y1 = typeof args.y1 === "number" ? args.y1 : NaN;
  const x2 = typeof args.x2 === "number" ? args.x2 : NaN;
  const y2 = typeof args.y2 === "number" ? args.y2 : NaN;
  if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
    return { error: "x1, y1, x2, and y2 are required (numbers)" };
  }

  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const dx = x2 - x1;
  const dy = y2 - y1;
  const slope = dx === 0 ? "undefined" : +(dy / dx).toFixed(8);
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Midpoint divides the segment in ratio 1:1", "Distance uses the Euclidean formula"],
  };
  return stampMeta({
    point1: { x: x1, y: y1 },
    point2: { x: x2, y: y2 },
    midpoint: { x: +mx.toFixed(8), y: +my.toFixed(8) },
    distance: +distance.toFixed(8),
    slope,
    angle_degrees: +angle.toFixed(6),
  }, meta);
}
