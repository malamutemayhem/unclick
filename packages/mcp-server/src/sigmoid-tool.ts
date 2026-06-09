import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function sigmoidCalculate(args: Record<string, unknown>) {
  const x = typeof args.x === "number" ? args.x : NaN;
  const fn = typeof args.function === "string" ? args.function.toLowerCase() : "sigmoid";
  if (isNaN(x)) return { error: "x is required (number)" };

  const validFns = ["sigmoid", "tanh", "relu", "leaky_relu", "elu", "swish"];
  if (!validFns.includes(fn)) return { error: `function must be one of: ${validFns.join(", ")}` };

  let result: number;
  let derivative: number;

  switch (fn) {
    case "sigmoid": {
      result = 1 / (1 + Math.exp(-x));
      derivative = result * (1 - result);
      break;
    }
    case "tanh": {
      result = Math.tanh(x);
      derivative = 1 - result * result;
      break;
    }
    case "relu": {
      result = Math.max(0, x);
      derivative = x > 0 ? 1 : 0;
      break;
    }
    case "leaky_relu": {
      const alpha = 0.01;
      result = x > 0 ? x : alpha * x;
      derivative = x > 0 ? 1 : alpha;
      break;
    }
    case "elu": {
      const a = 1;
      result = x > 0 ? x : a * (Math.exp(x) - 1);
      derivative = x > 0 ? 1 : result + a;
      break;
    }
    case "swish": {
      const sig = 1 / (1 + Math.exp(-x));
      result = x * sig;
      derivative = sig + x * sig * (1 - sig);
      break;
    }
    default:
      result = 0;
      derivative = 0;
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Sigmoid/tanh output is bounded; relu is unbounded above 0", "Derivative is useful for backpropagation"],
  };
  return stampMeta({
    function: fn,
    x,
    result: +result.toFixed(8),
    derivative: +derivative.toFixed(8),
  }, meta);
}
