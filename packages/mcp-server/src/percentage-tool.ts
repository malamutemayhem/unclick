import { stampMeta } from "./connector-meta.js";

export async function percentageCalc(args: Record<string, unknown>) {
  const operation = String(args.operation ?? "of").toLowerCase();
  const a = Number(args.a);
  const b = Number(args.b);
  if (isNaN(a) || isNaN(b)) return { error: "a and b are required (numbers)" };
  let result: number;
  let explanation: string;
  switch (operation) {
    case "of":
      result = +(a / 100 * b).toFixed(6);
      explanation = `${a}% of ${b} = ${result}`;
      break;
    case "is_what_percent":
      if (b === 0) return { error: "b cannot be zero for is_what_percent" };
      result = +(a / b * 100).toFixed(6);
      explanation = `${a} is ${result}% of ${b}`;
      break;
    case "change":
      if (a === 0) return { error: "a (original) cannot be zero for change" };
      result = +((b - a) / a * 100).toFixed(6);
      explanation = `Change from ${a} to ${b} = ${result}%`;
      break;
    case "increase":
      result = +(a * (1 + b / 100)).toFixed(6);
      explanation = `${a} increased by ${b}% = ${result}`;
      break;
    case "decrease":
      result = +(a * (1 - b / 100)).toFixed(6);
      explanation = `${a} decreased by ${b}% = ${result}`;
      break;
    default:
      return { error: "operation must be one of: of, is_what_percent, change, increase, decrease" };
  }
  return stampMeta({ result, operation, a, b, explanation }, {
    source: "local percentage calculator",
    fetched_at: new Date().toISOString(),
    next_steps: ["operations: of, is_what_percent, change, increase, decrease", "a and b meaning depends on operation"],
  });
}
