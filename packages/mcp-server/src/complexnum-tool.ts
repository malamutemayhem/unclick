import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function complexCalc(args: Record<string, unknown>) {
  const op = typeof args.operation === "string" ? args.operation.toLowerCase() : "";
  const validOps = ["add", "subtract", "multiply", "divide", "magnitude", "conjugate", "polar"];
  if (!validOps.includes(op)) return { error: `operation is required (one of: ${validOps.join(", ")})` };

  const r1 = typeof args.real1 === "number" ? args.real1 : NaN;
  const i1 = typeof args.imag1 === "number" ? args.imag1 : NaN;
  if (isNaN(r1) || isNaN(i1)) return { error: "real1 and imag1 are required" };

  const format = (r: number, i: number) => {
    const rs = r.toFixed(6);
    const is = Math.abs(i).toFixed(6);
    if (i >= 0) return `${rs} + ${is}i`;
    return `${rs} - ${is}i`;
  };

  if (op === "magnitude") {
    const mag = Math.sqrt(r1 * r1 + i1 * i1);
    const meta: ConnectorMeta = { source: "local-computation", fetched_at: new Date().toISOString(), next_steps: ["Magnitude is the distance from origin in the complex plane"] };
    return stampMeta({ input: format(r1, i1), magnitude: +mag.toFixed(8) }, meta);
  }
  if (op === "conjugate") {
    const meta: ConnectorMeta = { source: "local-computation", fetched_at: new Date().toISOString(), next_steps: ["Conjugate flips the sign of the imaginary part"] };
    return stampMeta({ input: format(r1, i1), conjugate: format(r1, -i1), real: +r1.toFixed(6), imag: +(-i1).toFixed(6) }, meta);
  }
  if (op === "polar") {
    const mag = Math.sqrt(r1 * r1 + i1 * i1);
    const angle = Math.atan2(i1, r1);
    const meta: ConnectorMeta = { source: "local-computation", fetched_at: new Date().toISOString(), next_steps: ["Polar form: r * e^(i*theta)"] };
    return stampMeta({ input: format(r1, i1), magnitude: +mag.toFixed(8), angle_radians: +angle.toFixed(8), angle_degrees: +(angle * 180 / Math.PI).toFixed(6) }, meta);
  }

  const r2 = typeof args.real2 === "number" ? args.real2 : NaN;
  const i2 = typeof args.imag2 === "number" ? args.imag2 : NaN;
  if (isNaN(r2) || isNaN(i2)) return { error: "real2 and imag2 are required for binary operations" };

  let rr: number, ri: number;
  switch (op) {
    case "add": rr = r1 + r2; ri = i1 + i2; break;
    case "subtract": rr = r1 - r2; ri = i1 - i2; break;
    case "multiply": rr = r1 * r2 - i1 * i2; ri = r1 * i2 + i1 * r2; break;
    case "divide": {
      const denom = r2 * r2 + i2 * i2;
      if (denom === 0) return { error: "Division by zero" };
      rr = (r1 * r2 + i1 * i2) / denom;
      ri = (i1 * r2 - r1 * i2) / denom;
      break;
    }
    default: rr = 0; ri = 0;
  }

  const meta: ConnectorMeta = { source: "local-computation", fetched_at: new Date().toISOString(), next_steps: ["Use polar form for powers and roots of complex numbers"] };
  return stampMeta({
    operand1: format(r1, i1), operand2: format(r2, i2), operation: op,
    result: format(rr, ri), real: +rr.toFixed(6), imag: +ri.toFixed(6),
  }, meta);
}
