export type AssayMethod = "fire" | "wet_chemical" | "xrf" | "icp" | "gravimetric";

export function sampleWeightG(method: AssayMethod): number {
  const weights: Record<AssayMethod, number> = {
    fire: 30, wet_chemical: 5, xrf: 10, icp: 1, gravimetric: 50,
  };
  return weights[method];
}

export function accuracyPercent(method: AssayMethod): number {
  const accuracy: Record<AssayMethod, number> = {
    fire: 99.5, wet_chemical: 99.0, xrf: 95.0, icp: 99.8, gravimetric: 99.9,
  };
  return accuracy[method];
}

export function turnaroundHours(method: AssayMethod): number {
  const hours: Record<AssayMethod, number> = {
    fire: 4, wet_chemical: 8, xrf: 0.1, icp: 2, gravimetric: 24,
  };
  return hours[method];
}

export function detectionLimitPpm(method: AssayMethod): number {
  const limits: Record<AssayMethod, number> = {
    fire: 0.01, wet_chemical: 1, xrf: 10, icp: 0.001, gravimetric: 5,
  };
  return limits[method];
}

export function costPerSample(method: AssayMethod, baseCost: number): number {
  const mult: Record<AssayMethod, number> = {
    fire: 2.0, wet_chemical: 1.5, xrf: 0.5, icp: 3.0, gravimetric: 1.0,
  };
  return parseFloat((baseCost * mult[method]).toFixed(2));
}

export function replicatesNeeded(confidenceLevel: 90 | 95 | 99): number {
  const reps: Record<number, number> = { 90: 3, 95: 5, 99: 10 };
  return reps[confidenceLevel];
}

export function fluxCompositionG(method: AssayMethod): { litharge: number; borax: number; soda: number } {
  if (method !== "fire") return { litharge: 0, borax: 0, soda: 0 };
  return { litharge: 60, borax: 20, soda: 10 };
}

export function cupellationTemperatureCelsius(): number {
  return 960;
}

export function samplePrepTimeMinutes(method: AssayMethod): number {
  const mins: Record<AssayMethod, number> = {
    fire: 30, wet_chemical: 45, xrf: 5, icp: 20, gravimetric: 60,
  };
  return mins[method];
}

export function assayMethods(): AssayMethod[] {
  return ["fire", "wet_chemical", "xrf", "icp", "gravimetric"];
}
