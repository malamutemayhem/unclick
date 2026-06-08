import { stampMeta } from "./connector-meta.js";

const BASE = "https://vpic.nhtsa.dot.gov/api/vehicles";
const TIMEOUT = 10_000;

export async function nhtsaDecodeVin(args: Record<string, unknown>) {
  const vin = String(args.vin ?? "").trim();
  if (!vin) return { error: "vin is required" };
  const url = `${BASE}/DecodeVin/${encodeURIComponent(vin)}?format=json`;
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error(`NHTSA decode ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `vpic.nhtsa.dot.gov DecodeVin/${vin}`,
    fetched_at: new Date().toISOString(),
    next_steps: ["check Results array for make, model, year, and specs", "search recalls for this vehicle"],
  });
}

export async function nhtsaRecalls(args: Record<string, unknown>) {
  const make = String(args.make ?? "").trim();
  const model = String(args.model ?? "").trim();
  const year = String(args.year ?? "").trim();
  if (!make || !year) return { error: "make and year are required" };
  const modelPart = model ? `/${encodeURIComponent(model)}` : "";
  const url = `https://api.nhtsa.gov/recalls/recallsByVehicle?make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}&modelYear=${encodeURIComponent(year)}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error(`NHTSA recalls ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `api.nhtsa.gov recalls ${make} ${model} ${year}`,
    fetched_at: new Date().toISOString(),
    next_steps: ["review recall summaries and components affected", "check if recalls have remedy available"],
  });
}
