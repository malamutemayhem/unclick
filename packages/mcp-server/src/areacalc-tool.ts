import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function areaCalculate(args: Record<string, unknown>) {
  const shape = typeof args.shape === "string" ? args.shape.toLowerCase() : "";
  const validShapes = ["circle", "rectangle", "triangle", "trapezoid", "ellipse", "parallelogram", "sector"];
  if (!validShapes.includes(shape)) return { error: `shape is required (one of: ${validShapes.join(", ")})` };

  let area: number;
  let perimeter: number;
  let params: Record<string, number> = {};

  switch (shape) {
    case "circle": {
      const r = typeof args.radius === "number" ? args.radius : NaN;
      if (isNaN(r) || r <= 0) return { error: "radius is required (positive number)" };
      area = Math.PI * r * r;
      perimeter = 2 * Math.PI * r;
      params = { radius: r };
      break;
    }
    case "rectangle": {
      const w = typeof args.width === "number" ? args.width : NaN;
      const h = typeof args.height === "number" ? args.height : NaN;
      if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return { error: "width and height are required (positive numbers)" };
      area = w * h;
      perimeter = 2 * (w + h);
      params = { width: w, height: h };
      break;
    }
    case "triangle": {
      const b = typeof args.base === "number" ? args.base : NaN;
      const h = typeof args.height === "number" ? args.height : NaN;
      if (isNaN(b) || isNaN(h) || b <= 0 || h <= 0) return { error: "base and height are required (positive numbers)" };
      area = 0.5 * b * h;
      perimeter = NaN;
      params = { base: b, height: h };
      break;
    }
    case "trapezoid": {
      const a = typeof args.base1 === "number" ? args.base1 : NaN;
      const b = typeof args.base2 === "number" ? args.base2 : NaN;
      const h = typeof args.height === "number" ? args.height : NaN;
      if (isNaN(a) || isNaN(b) || isNaN(h) || a <= 0 || b <= 0 || h <= 0) return { error: "base1, base2, and height are required (positive numbers)" };
      area = 0.5 * (a + b) * h;
      perimeter = NaN;
      params = { base1: a, base2: b, height: h };
      break;
    }
    case "ellipse": {
      const a = typeof args.semi_major === "number" ? args.semi_major : NaN;
      const b = typeof args.semi_minor === "number" ? args.semi_minor : NaN;
      if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) return { error: "semi_major and semi_minor are required (positive numbers)" };
      area = Math.PI * a * b;
      perimeter = Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
      params = { semi_major: a, semi_minor: b };
      break;
    }
    case "parallelogram": {
      const b = typeof args.base === "number" ? args.base : NaN;
      const h = typeof args.height === "number" ? args.height : NaN;
      if (isNaN(b) || isNaN(h) || b <= 0 || h <= 0) return { error: "base and height are required (positive numbers)" };
      area = b * h;
      perimeter = NaN;
      params = { base: b, height: h };
      break;
    }
    case "sector": {
      const r = typeof args.radius === "number" ? args.radius : NaN;
      const angle = typeof args.angle_degrees === "number" ? args.angle_degrees : NaN;
      if (isNaN(r) || isNaN(angle) || r <= 0 || angle <= 0 || angle > 360) return { error: "radius and angle_degrees (0-360) are required" };
      const rad = angle * Math.PI / 180;
      area = 0.5 * r * r * rad;
      perimeter = 2 * r + r * rad;
      params = { radius: r, angle_degrees: angle };
      break;
    }
    default: area = 0; perimeter = 0;
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Perimeter may not be available for all shapes without full side lengths"],
  };
  const result: Record<string, unknown> = { shape, ...params, area: +area.toFixed(8) };
  if (!isNaN(perimeter)) result.perimeter = +perimeter.toFixed(8);
  return stampMeta(result, meta);
}
