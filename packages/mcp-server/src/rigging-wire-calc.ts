export type RiggingWire = "stainless_1x19" | "stainless_7x7" | "dyneema_standing" | "galvanized" | "rod_rigging";

export function breakingLoadKn(wire: RiggingWire): number {
  const m: Record<RiggingWire, number> = {
    stainless_1x19: 45, stainless_7x7: 35, dyneema_standing: 50, galvanized: 30, rod_rigging: 55,
  };
  return m[wire];
}

export function stretchPercent(wire: RiggingWire): number {
  const m: Record<RiggingWire, number> = {
    stainless_1x19: 1.5, stainless_7x7: 2.5, dyneema_standing: 0.5, galvanized: 2, rod_rigging: 0.3,
  };
  return m[wire];
}

export function corrosionResistance(wire: RiggingWire): number {
  const m: Record<RiggingWire, number> = {
    stainless_1x19: 8, stainless_7x7: 8, dyneema_standing: 10, galvanized: 4, rod_rigging: 7,
  };
  return m[wire];
}

export function fatigueLife(wire: RiggingWire): number {
  const m: Record<RiggingWire, number> = {
    stainless_1x19: 6, stainless_7x7: 8, dyneema_standing: 5, galvanized: 4, rod_rigging: 9,
  };
  return m[wire];
}

export function inspectionEase(wire: RiggingWire): number {
  const m: Record<RiggingWire, number> = {
    stainless_1x19: 7, stainless_7x7: 6, dyneema_standing: 4, galvanized: 8, rod_rigging: 3,
  };
  return m[wire];
}

export function uvVulnerable(wire: RiggingWire): boolean {
  const m: Record<RiggingWire, boolean> = {
    stainless_1x19: false, stainless_7x7: false, dyneema_standing: true, galvanized: false, rod_rigging: false,
  };
  return m[wire];
}

export function spliceable(wire: RiggingWire): boolean {
  const m: Record<RiggingWire, boolean> = {
    stainless_1x19: false, stainless_7x7: false, dyneema_standing: true, galvanized: false, rod_rigging: false,
  };
  return m[wire];
}

export function bestApplication(wire: RiggingWire): string {
  const m: Record<RiggingWire, string> = {
    stainless_1x19: "standing_rigging", stainless_7x7: "running_rigging",
    dyneema_standing: "racing_yacht", galvanized: "traditional_vessel", rod_rigging: "performance_yacht",
  };
  return m[wire];
}

export function costPerMeter(wire: RiggingWire): number {
  const m: Record<RiggingWire, number> = {
    stainless_1x19: 15, stainless_7x7: 12, dyneema_standing: 25, galvanized: 8, rod_rigging: 40,
  };
  return m[wire];
}

export function riggingWires(): RiggingWire[] {
  return ["stainless_1x19", "stainless_7x7", "dyneema_standing", "galvanized", "rod_rigging"];
}
