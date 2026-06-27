export type ScaleType = "equal_arm" | "steelyard" | "spring" | "torsion" | "pendulum_scale";

export function sensitivityMg(type: ScaleType): number {
  const sens: Record<ScaleType, number> = {
    equal_arm: 10, steelyard: 500, spring: 100, torsion: 0.1, pendulum_scale: 50,
  };
  return sens[type];
}

export function maxCapacityKg(type: ScaleType): number {
  const cap: Record<ScaleType, number> = {
    equal_arm: 5, steelyard: 200, spring: 50, torsion: 0.5, pendulum_scale: 100,
  };
  return cap[type];
}

export function beamLengthCm(type: ScaleType): number {
  const lengths: Record<ScaleType, number> = {
    equal_arm: 30, steelyard: 80, spring: 0, torsion: 15, pendulum_scale: 40,
  };
  return lengths[type];
}

export function calibrationWeightsNeeded(type: ScaleType): boolean {
  return type === "equal_arm" || type === "steelyard";
}

export function portabilityRating(type: ScaleType): number {
  const port: Record<ScaleType, number> = {
    equal_arm: 3, steelyard: 4, spring: 5, torsion: 2, pendulum_scale: 2,
  };
  return port[type];
}

export function accuracyClass(type: ScaleType): string {
  const classes: Record<ScaleType, string> = {
    equal_arm: "analytical", steelyard: "commercial", spring: "household",
    torsion: "micro_analytical", pendulum_scale: "industrial",
  };
  return classes[type];
}

export function materialPrimary(type: ScaleType): string {
  const materials: Record<ScaleType, string> = {
    equal_arm: "brass", steelyard: "iron", spring: "steel",
    torsion: "platinum", pendulum_scale: "cast_iron",
  };
  return materials[type];
}

export function maintenanceFrequency(type: ScaleType): string {
  const freq: Record<ScaleType, string> = {
    equal_arm: "monthly", steelyard: "yearly", spring: "quarterly",
    torsion: "weekly", pendulum_scale: "monthly",
  };
  return freq[type];
}

export function costEstimate(type: ScaleType): number {
  const costs: Record<ScaleType, number> = {
    equal_arm: 200, steelyard: 80, spring: 30, torsion: 2000, pendulum_scale: 500,
  };
  return costs[type];
}

export function scaleTypes(): ScaleType[] {
  return ["equal_arm", "steelyard", "spring", "torsion", "pendulum_scale"];
}
