export type GrainType = "wheat" | "barley" | "oats" | "rye" | "rice";

export function handleLengthCm(userHeightCm: number): number {
  return Math.round(userHeightCm * 0.75);
}

export function swipleLengthCm(handleLengthCm: number): number {
  return Math.round(handleLengthCm * 0.5);
}

export function swingCyclesPerMinute(): number {
  return 40;
}

export function threshingRateKgPerHour(grain: GrainType): number {
  const rates: Record<GrainType, number> = {
    wheat: 15, barley: 18, oats: 20, rye: 14, rice: 10,
  };
  return rates[grain];
}

export function separationEfficiencyPercent(grain: GrainType): number {
  const eff: Record<GrainType, number> = {
    wheat: 85, barley: 80, oats: 75, rye: 82, rice: 70,
  };
  return eff[grain];
}

export function threshingFloorAreaM2(batchKg: number): number {
  return parseFloat((batchKg * 0.5).toFixed(1));
}

export function swingForceNewtons(swipleMassKg: number): number {
  return Math.round(swipleMassKg * 9.81 * 3);
}

export function handleMaterial(): string {
  return "ash";
}

export function costEstimate(quality: "basic" | "premium"): number {
  return quality === "premium" ? 80 : 35;
}

export function grainTypes(): GrainType[] {
  return ["wheat", "barley", "oats", "rye", "rice"];
}
