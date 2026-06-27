export type WheelType = "saxony" | "castle" | "walking" | "charkha" | "electric";

export function ratioRange(type: WheelType): { min: number; max: number } {
  const ranges: Record<WheelType, { min: number; max: number }> = {
    saxony: { min: 5, max: 20 },
    castle: { min: 6, max: 18 },
    walking: { min: 3, max: 12 },
    charkha: { min: 30, max: 80 },
    electric: { min: 1, max: 50 },
  };
  return ranges[type];
}

export function twistPerCm(ratio: number, treadleSpeedRpm: number): number {
  if (treadleSpeedRpm <= 0) return 0;
  return parseFloat((ratio * treadleSpeedRpm / 60).toFixed(1));
}

export function bobbinCapacityG(type: WheelType): number {
  const capacities: Record<WheelType, number> = {
    saxony: 120, castle: 100, walking: 80, charkha: 30, electric: 150,
  };
  return capacities[type];
}

export function driveType(type: WheelType): string {
  const drives: Record<WheelType, string> = {
    saxony: "double_drive", castle: "scotch_tension", walking: "double_drive",
    charkha: "direct_drive", electric: "motor",
  };
  return drives[type];
}

export function orificeSizeMm(type: WheelType): number {
  const sizes: Record<WheelType, number> = {
    saxony: 12, castle: 10, walking: 14, charkha: 6, electric: 15,
  };
  return sizes[type];
}

export function treadleCount(type: WheelType): number {
  const counts: Record<WheelType, number> = {
    saxony: 1, castle: 2, walking: 0, charkha: 0, electric: 0,
  };
  return counts[type];
}

export function wheelDiameterCm(type: WheelType): number {
  const diameters: Record<WheelType, number> = {
    saxony: 50, castle: 45, walking: 80, charkha: 35, electric: 0,
  };
  return diameters[type];
}

export function weightKg(type: WheelType): number {
  const weights: Record<WheelType, number> = {
    saxony: 8, castle: 6, walking: 12, charkha: 2, electric: 4,
  };
  return weights[type];
}

export function costEstimate(type: WheelType): number {
  const costs: Record<WheelType, number> = {
    saxony: 400, castle: 500, walking: 350, charkha: 80, electric: 600,
  };
  return costs[type];
}

export function wheelTypes(): WheelType[] {
  return ["saxony", "castle", "walking", "charkha", "electric"];
}
