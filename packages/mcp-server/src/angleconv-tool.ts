import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function angleConvert(args: Record<string, unknown>) {
  const value = typeof args.value === "number" ? args.value : NaN;
  const from = typeof args.from === "string" ? args.from.toLowerCase() : "";
  if (isNaN(value)) return { error: "value is required (number)" };

  const validUnits = ["degrees", "radians", "gradians", "turns"];
  if (!validUnits.includes(from)) return { error: `from is required (one of: ${validUnits.join(", ")})` };

  let radians: number;
  switch (from) {
    case "degrees": radians = value * Math.PI / 180; break;
    case "radians": radians = value; break;
    case "gradians": radians = value * Math.PI / 200; break;
    case "turns": radians = value * 2 * Math.PI; break;
    default: radians = 0;
  }

  const degrees = radians * 180 / Math.PI;
  const gradians = radians * 200 / Math.PI;
  const turns = radians / (2 * Math.PI);

  const normalized = ((degrees % 360) + 360) % 360;
  const sin = Math.sin(radians);
  const cos = Math.cos(radians);
  const tan = Math.abs(cos) < 1e-15 ? "undefined" : +(sin / cos).toFixed(8);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use normalized_degrees for compass bearings", "Trig values included for convenience"],
  };
  return stampMeta({
    input: { value, from },
    degrees: +degrees.toFixed(8),
    radians: +radians.toFixed(8),
    gradians: +gradians.toFixed(8),
    turns: +turns.toFixed(8),
    normalized_degrees: +normalized.toFixed(8),
    trig: { sin: +sin.toFixed(8), cos: +cos.toFixed(8), tan },
  }, meta);
}
