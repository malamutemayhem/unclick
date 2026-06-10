export type AbrasiveGrit = "coarse" | "medium" | "fine" | "extra_fine" | "polishing";

export function wheelDiameterCm(purpose: string): number {
  const diameters: Record<string, number> = { sharpening: 30, shaping: 50, grinding: 60, polishing: 25 };
  return diameters[purpose] || 40;
}

export function surfaceSpeedMps(diameterCm: number, rpm: number): number {
  return parseFloat((Math.PI * diameterCm / 100 * rpm / 60).toFixed(2));
}

export function gritSize(grit: AbrasiveGrit): number {
  const sizes: Record<AbrasiveGrit, number> = { coarse: 36, medium: 80, fine: 180, extra_fine: 400, polishing: 1000 };
  return sizes[grit];
}

export function wearRateMmPerHour(grit: AbrasiveGrit, pressure: number): number {
  const base: Record<AbrasiveGrit, number> = { coarse: 0.5, medium: 0.3, fine: 0.15, extra_fine: 0.08, polishing: 0.02 };
  return parseFloat((base[grit] * pressure).toFixed(3));
}

export function waterFlowLpm(diameterCm: number): number {
  return parseFloat((diameterCm * 0.05 + 0.5).toFixed(1));
}

export function dressingInterval(hoursUsed: number, grit: AbrasiveGrit): number {
  const factor: Record<AbrasiveGrit, number> = { coarse: 4, medium: 6, fine: 8, extra_fine: 10, polishing: 12 };
  return parseFloat((factor[grit] - hoursUsed * 0.1).toFixed(1));
}

export function sparkAngle(surfaceSpeed: number): number {
  return parseFloat(Math.min(90, surfaceSpeed * 5 + 15).toFixed(0));
}

export function lifespanHours(diameterCm: number, wearRateMm: number): number {
  if (wearRateMm <= 0) return 0;
  return parseFloat((diameterCm * 5 / wearRateMm).toFixed(0));
}

export function troughVolumeLiters(diameterCm: number): number {
  return parseFloat((diameterCm * 0.3).toFixed(1));
}

export function pedalForceN(wheelWeightKg: number): number {
  return parseFloat((wheelWeightKg * 9.81 * 0.05 + 10).toFixed(1));
}

export function abrasiveGrits(): AbrasiveGrit[] {
  return ["coarse", "medium", "fine", "extra_fine", "polishing"];
}
