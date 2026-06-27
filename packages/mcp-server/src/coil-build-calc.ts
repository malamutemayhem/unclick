export type CoilProfile = "round" | "flat" | "oval" | "squared" | "tapered";

export function coilDiameterMm(wallThicknessMm: number): number {
  return parseFloat((wallThicknessMm * 1.5).toFixed(1));
}

export function coilLengthCm(vesselCircumferenceCm: number, overlapPercent: number): number {
  return parseFloat((vesselCircumferenceCm * (1 + overlapPercent / 100)).toFixed(1));
}

export function coilsPerLayer(vesselHeightCm: number, coilDiameterMm: number): number {
  if (coilDiameterMm <= 0) return 0;
  return Math.ceil(vesselHeightCm * 10 / coilDiameterMm);
}

export function totalClayWeightKg(vesselHeightCm: number, diameterCm: number, wallThicknessMm: number): number {
  const circumference = Math.PI * diameterCm;
  const wallCm = wallThicknessMm / 10;
  const volumeCm3 = circumference * vesselHeightCm * wallCm;
  return parseFloat((volumeCm3 * 0.0018).toFixed(2));
}

export function dryingTimeBetweenLayersMinutes(profile: CoilProfile): number {
  const times: Record<CoilProfile, number> = {
    round: 15, flat: 10, oval: 12, squared: 20, tapered: 18,
  };
  return times[profile];
}

export function scoringRequired(profile: CoilProfile): boolean {
  return profile !== "flat";
}

export function slipVolumeMl(coilsCount: number): number {
  return parseFloat((coilsCount * 2).toFixed(0));
}

export function buildTimeHours(vesselHeightCm: number, skill: "beginner" | "intermediate" | "expert"): number {
  const mult: Record<string, number> = { beginner: 0.3, intermediate: 0.15, expert: 0.08 };
  return parseFloat((vesselHeightCm * mult[skill]).toFixed(1));
}

export function smoothingToolPasses(finish: "textured" | "smoothed" | "burnished"): number {
  const passes: Record<string, number> = { textured: 0, smoothed: 3, burnished: 8 };
  return passes[finish];
}

export function coilProfiles(): CoilProfile[] {
  return ["round", "flat", "oval", "squared", "tapered"];
}
