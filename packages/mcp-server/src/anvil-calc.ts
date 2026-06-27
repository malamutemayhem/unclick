export type AnvilStyle = "london" | "farrier" | "double_horn" | "stake" | "bench";

export function weightKg(style: AnvilStyle): number {
  const weights: Record<AnvilStyle, number> = {
    london: 120, farrier: 80, double_horn: 150, stake: 30, bench: 50,
  };
  return weights[style];
}

export function faceAreaCm2(style: AnvilStyle): number {
  const areas: Record<AnvilStyle, number> = {
    london: 600, farrier: 400, double_horn: 700, stake: 150, bench: 300,
  };
  return areas[style];
}

export function heightCm(weightKg: number): number {
  return parseFloat((Math.cbrt(weightKg * 1000) * 0.5).toFixed(1));
}

export function reboundPercent(material: "cast_iron" | "tool_steel" | "wrought_iron"): number {
  const rebound: Record<string, number> = {
    cast_iron: 20, tool_steel: 90, wrought_iron: 50,
  };
  return rebound[material];
}

export function hardieHoleSizeMm(weightKg: number): number {
  if (weightKg < 50) return 19;
  if (weightKg < 100) return 25;
  return 32;
}

export function pritchelHoleSizeMm(hardieHoleSizeMm: number): number {
  return parseFloat((hardieHoleSizeMm * 0.6).toFixed(1));
}

export function standHeightCm(smithHeightCm: number): number {
  return parseFloat((smithHeightCm * 0.45).toFixed(1));
}

export function noiseDecibels(weightKg: number): number {
  return parseFloat((80 + Math.log2(weightKg) * 5).toFixed(1));
}

export function lifespanYears(material: "cast_iron" | "tool_steel" | "wrought_iron"): number {
  const years: Record<string, number> = {
    cast_iron: 20, tool_steel: 100, wrought_iron: 50,
  };
  return years[material];
}

export function costEstimate(style: AnvilStyle, costPerKg: number): number {
  return parseFloat((weightKg(style) * costPerKg).toFixed(2));
}

export function anvilStyles(): AnvilStyle[] {
  return ["london", "farrier", "double_horn", "stake", "bench"];
}
