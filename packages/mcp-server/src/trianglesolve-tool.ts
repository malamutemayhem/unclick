import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function triangleSolve(args: Record<string, unknown>) {
  const a = typeof args.a === "number" ? args.a : undefined;
  const b = typeof args.b === "number" ? args.b : undefined;
  const c = typeof args.c === "number" ? args.c : undefined;

  if (a === undefined || b === undefined || c === undefined) {
    return { error: "a, b, and c (three side lengths) are required" };
  }
  if (a <= 0 || b <= 0 || c <= 0) return { error: "All sides must be positive" };
  if (a + b <= c || a + c <= b || b + c <= a) return { error: "Invalid triangle: sides do not satisfy triangle inequality" };

  const cosA = (b * b + c * c - a * a) / (2 * b * c);
  const cosB = (a * a + c * c - b * b) / (2 * a * c);
  const cosC = (a * a + b * b - c * c) / (2 * a * b);
  const A = Math.acos(cosA) * 180 / Math.PI;
  const B = Math.acos(cosB) * 180 / Math.PI;
  const C = 180 - A - B;

  const s = (a + b + c) / 2;
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
  const perimeter = a + b + c;
  const inradius = area / s;
  const circumradius = (a * b * c) / (4 * area);

  let type: string;
  if (Math.abs(A - 90) < 0.0001 || Math.abs(B - 90) < 0.0001 || Math.abs(C - 90) < 0.0001) type = "right";
  else if (A > 90 || B > 90 || C > 90) type = "obtuse";
  else type = "acute";

  const sides = [a, b, c].sort();
  const sideType = sides[0] === sides[2] ? "equilateral" : sides[0] === sides[1] || sides[1] === sides[2] ? "isosceles" : "scalene";

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Area uses Heron's formula", "Angles computed via law of cosines"],
  };
  return stampMeta({
    sides: { a, b, c },
    angles: { A: +A.toFixed(6), B: +B.toFixed(6), C: +C.toFixed(6) },
    area: +area.toFixed(6),
    perimeter: +perimeter.toFixed(6),
    semi_perimeter: +s.toFixed(6),
    inradius: +inradius.toFixed(6),
    circumradius: +circumradius.toFixed(6),
    type,
    side_type: sideType,
  }, meta);
}
