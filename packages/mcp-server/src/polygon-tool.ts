import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function polygonCalculate(args: Record<string, unknown>) {
  const sides = typeof args.sides === "number" ? Math.floor(args.sides) : NaN;
  const length = typeof args.side_length === "number" ? args.side_length : NaN;
  if (isNaN(sides) || sides < 3) return { error: "sides is required (integer >= 3)" };
  if (isNaN(length) || length <= 0) return { error: "side_length is required (positive number)" };

  const interiorAngle = (sides - 2) * 180 / sides;
  const exteriorAngle = 360 / sides;
  const perimeter = sides * length;
  const apothem = length / (2 * Math.tan(Math.PI / sides));
  const area = (perimeter * apothem) / 2;
  const circumradius = length / (2 * Math.sin(Math.PI / sides));
  const sumInteriorAngles = (sides - 2) * 180;
  const diagonals = sides * (sides - 3) / 2;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Apothem = distance from center to midpoint of a side", "Circumradius = distance from center to a vertex"],
  };
  return stampMeta({
    sides,
    side_length: length,
    perimeter: +perimeter.toFixed(6),
    area: +area.toFixed(6),
    interior_angle: +interiorAngle.toFixed(6),
    exterior_angle: +exteriorAngle.toFixed(6),
    sum_interior_angles: sumInteriorAngles,
    apothem: +apothem.toFixed(6),
    circumradius: +circumradius.toFixed(6),
    diagonals,
  }, meta);
}
