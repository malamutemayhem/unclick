import { stampMeta } from "./connector-meta.js";

const TO_PA: Record<string, number> = {
  pa: 1,
  hpa: 100,
  kpa: 1000,
  mpa: 1e6,
  bar: 1e5,
  mbar: 100,
  atm: 101325,
  psi: 6894.757,
  torr: 133.3224,
  mmhg: 133.3224,
  inhg: 3386.389,
};

export async function pressureConvert(args: Record<string, unknown>) {
  const value = Number(args.value);
  if (isNaN(value)) return { error: "value is required (a number)" };
  const from = String(args.from ?? "pa").toLowerCase();
  const to = String(args.to ?? "").toLowerCase();
  const fromFactor = TO_PA[from];
  if (!fromFactor) return { error: `Unknown unit: ${from}. Valid: ${Object.keys(TO_PA).join(", ")}` };
  const pa = value * fromFactor;
  if (to) {
    const toFactor = TO_PA[to];
    if (!toFactor) return { error: `Unknown unit: ${to}. Valid: ${Object.keys(TO_PA).join(", ")}` };
    const result = +(pa / toFactor).toFixed(6);
    return stampMeta({ value, from, to, result, pascals: +pa.toFixed(6) }, {
      source: "local pressure converter",
      fetched_at: new Date().toISOString(),
      next_steps: ["omit 'to' to see all conversions", "units: pa, hpa, kpa, mpa, bar, mbar, atm, psi, torr, mmhg, inhg"],
    });
  }
  const all: Record<string, number> = {};
  for (const [unit, factor] of Object.entries(TO_PA)) {
    all[unit] = +(pa / factor).toFixed(6);
  }
  return stampMeta({ value, from, conversions: all }, {
    source: "local pressure converter",
    fetched_at: new Date().toISOString(),
    next_steps: ["set 'to' for a single conversion", "units: pa, hpa, kpa, mpa, bar, mbar, atm, psi, torr, mmhg, inhg"],
  });
}
