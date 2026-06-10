export type CometType = "short_period" | "long_period" | "halley_type" | "sungrazer" | "main_belt";

export function orbitalPeriodYears(comet: CometType): number {
  const m: Record<CometType, number> = {
    short_period: 10, long_period: 10000, halley_type: 75, sungrazer: 500, main_belt: 5,
  };
  return m[comet];
}

export function tailLengthAu(comet: CometType): number {
  const m: Record<CometType, number> = {
    short_period: 0.1, long_period: 1, halley_type: 0.5, sungrazer: 0.3, main_belt: 0.01,
  };
  return m[comet];
}

export function nucleusDiameterKm(comet: CometType): number {
  const m: Record<CometType, number> = {
    short_period: 5, long_period: 20, halley_type: 11, sungrazer: 2, main_belt: 3,
  };
  return m[comet];
}

export function brightnessAtPerihelion(comet: CometType): number {
  const m: Record<CometType, number> = {
    short_period: 5, long_period: 8, halley_type: 7, sungrazer: 10, main_belt: 2,
  };
  return m[comet];
}

export function dustProduction(comet: CometType): number {
  const m: Record<CometType, number> = {
    short_period: 5, long_period: 8, halley_type: 7, sungrazer: 9, main_belt: 3,
  };
  return m[comet];
}

export function visibleNakedEye(comet: CometType): boolean {
  const m: Record<CometType, boolean> = {
    short_period: false, long_period: true, halley_type: true, sungrazer: true, main_belt: false,
  };
  return m[comet];
}

export function retrogradeOrbit(comet: CometType): boolean {
  const m: Record<CometType, boolean> = {
    short_period: false, long_period: true, halley_type: true, sungrazer: false, main_belt: false,
  };
  return m[comet];
}

export function originRegion(comet: CometType): string {
  const m: Record<CometType, string> = {
    short_period: "kuiper_belt", long_period: "oort_cloud", halley_type: "oort_cloud",
    sungrazer: "kreutz_group", main_belt: "asteroid_belt",
  };
  return m[comet];
}

export function meteorShowerPotential(comet: CometType): number {
  const m: Record<CometType, number> = {
    short_period: 8, long_period: 3, halley_type: 9, sungrazer: 2, main_belt: 1,
  };
  return m[comet];
}

export function cometTypes(): CometType[] {
  return ["short_period", "long_period", "halley_type", "sungrazer", "main_belt"];
}
