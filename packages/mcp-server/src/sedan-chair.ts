export type ChairStyle = "enclosed" | "open" | "canopied" | "bridal" | "royal";

export function poleWeight(lengthM: number, material: string): number {
  const densities: Record<string, number> = {
    bamboo: 0.8, oak: 1.5, teak: 1.3, ash: 1.1,
  };
  const d = densities[material] || 1.2;
  return parseFloat((lengthM * d).toFixed(1));
}

export function seatHeight(userHeightCm: number): number {
  return parseFloat((userHeightCm * 0.25).toFixed(0));
}

export function cabinClearance(userHeightCm: number): number {
  return parseFloat((userHeightCm * 0.6 + 10).toFixed(0));
}

export function bearerLoadKg(totalWeightKg: number, bearerCount: number): number {
  if (bearerCount <= 0) return 0;
  return parseFloat((totalWeightKg / bearerCount).toFixed(1));
}

export function uphillFactor(gradientPercent: number): number {
  return parseFloat((1 + gradientPercent * 0.03).toFixed(2));
}

export function restFrequencyMin(loadPerBearerKg: number, tempC: number): number {
  const base = Math.max(10, 60 - loadPerBearerKg);
  const heatPenalty = tempC > 30 ? (tempC - 30) * 2 : 0;
  return parseFloat(Math.max(10, base - heatPenalty).toFixed(0));
}

export function curtainFabricM2(heightCm: number, widthCm: number): number {
  return parseFloat(((heightCm * widthCm * 3) / 10000).toFixed(2));
}

export function decorationLevel(style: ChairStyle): number {
  const levels: Record<ChairStyle, number> = {
    enclosed: 3, open: 1, canopied: 2, bridal: 4, royal: 5,
  };
  return levels[style];
}

export function hiringCostPerHour(style: ChairStyle): number {
  const costs: Record<ChairStyle, number> = {
    enclosed: 50, open: 30, canopied: 40, bridal: 100, royal: 200,
  };
  return costs[style];
}

export function chairStyles(): ChairStyle[] {
  return ["enclosed", "open", "canopied", "bridal", "royal"];
}
