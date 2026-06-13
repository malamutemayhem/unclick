import { stampMeta } from "./connector-meta.js";

export async function bitwiseCalc(args: Record<string, unknown>) {
  const a = Number(args.a);
  const operation = String(args.operation ?? "and").toLowerCase();
  if (isNaN(a)) return { error: "a is required (integer)" };
  const unaryOps = ["not", "shift_left", "shift_right"];
  if (!unaryOps.includes(operation)) {
    const b = Number(args.b);
    if (isNaN(b)) return { error: "b is required for binary operations (integer)" };
    let result: number;
    switch (operation) {
      case "and": result = a & b; break;
      case "or": result = a | b; break;
      case "xor": result = a ^ b; break;
      case "nand": result = ~(a & b); break;
      case "nor": result = ~(a | b); break;
      default: return { error: "operation must be: and, or, xor, not, nand, nor, shift_left, shift_right" };
    }
    return stampMeta({
      a, b, operation, result,
      binary_a: (a >>> 0).toString(2),
      binary_b: (b >>> 0).toString(2),
      binary_result: (result >>> 0).toString(2),
    }, {
      source: "local bitwise calculator",
      fetched_at: new Date().toISOString(),
      next_steps: ["binary fields show the bit representation", "operations: and, or, xor, not, nand, nor, shift_left, shift_right"],
    });
  }
  if (operation === "not") {
    const result = ~a;
    return stampMeta({
      a, operation: "not", result,
      binary_a: (a >>> 0).toString(2),
      binary_result: (result >>> 0).toString(2),
    }, {
      source: "local bitwise calculator",
      fetched_at: new Date().toISOString(),
      next_steps: ["NOT flips all bits", "result uses two's complement"],
    });
  }
  const shift = Number(args.b) || 1;
  const result = operation === "shift_left" ? a << shift : a >> shift;
  return stampMeta({
    a, operation, shift, result,
    binary_a: (a >>> 0).toString(2),
    binary_result: (result >>> 0).toString(2),
  }, {
    source: "local bitwise calculator",
    fetched_at: new Date().toISOString(),
    next_steps: ["shift_left doubles per position", "shift_right halves per position"],
  });
}
