import { stampMeta } from "./connector-meta.js";

export async function temperatureConvert(args: Record<string, unknown>) {
  const value = Number(args.value);
  if (isNaN(value)) return { error: "value is required (a number)" };
  const from = String(args.from ?? "c").toLowerCase();
  let celsius: number;
  switch (from) {
    case "c": case "celsius": celsius = value; break;
    case "f": case "fahrenheit": celsius = (value - 32) * 5 / 9; break;
    case "k": case "kelvin": celsius = value - 273.15; break;
    case "r": case "rankine": celsius = (value - 491.67) * 5 / 9; break;
    default: return { error: "from must be c, f, k, or r (celsius, fahrenheit, kelvin, rankine)" };
  }
  const conversions = {
    celsius: +celsius.toFixed(4),
    fahrenheit: +(celsius * 9 / 5 + 32).toFixed(4),
    kelvin: +(celsius + 273.15).toFixed(4),
    rankine: +((celsius + 273.15) * 9 / 5).toFixed(4),
  };
  const formulas = {
    c_to_f: "F = C x 9/5 + 32",
    f_to_c: "C = (F - 32) x 5/9",
    c_to_k: "K = C + 273.15",
    k_to_c: "C = K - 273.15",
  };
  return stampMeta({ value, from, conversions, formulas }, {
    source: "local temperature converter",
    fetched_at: new Date().toISOString(),
    next_steps: ["units: c (celsius), f (fahrenheit), k (kelvin), r (rankine)", "formulas field shows conversion equations"],
  });
}
