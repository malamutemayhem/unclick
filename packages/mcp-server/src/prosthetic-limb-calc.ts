export type ProstheticLimb = "body_powered" | "myoelectric" | "microprocessor" | "passive" | "activity_specific";

export function functionalRange(p: ProstheticLimb): number {
  const m: Record<ProstheticLimb, number> = {
    body_powered: 6, myoelectric: 8, microprocessor: 10, passive: 2, activity_specific: 5,
  };
  return m[p];
}

export function deviceCost(p: ProstheticLimb): number {
  const m: Record<ProstheticLimb, number> = {
    body_powered: 4, myoelectric: 8, microprocessor: 10, passive: 2, activity_specific: 6,
  };
  return m[p];
}

export function durability(p: ProstheticLimb): number {
  const m: Record<ProstheticLimb, number> = {
    body_powered: 9, myoelectric: 5, microprocessor: 6, passive: 10, activity_specific: 7,
  };
  return m[p];
}

export function weightScore(p: ProstheticLimb): number {
  const m: Record<ProstheticLimb, number> = {
    body_powered: 6, myoelectric: 4, microprocessor: 3, passive: 9, activity_specific: 7,
  };
  return m[p];
}

export function maintenanceNeed(p: ProstheticLimb): number {
  const m: Record<ProstheticLimb, number> = {
    body_powered: 4, myoelectric: 7, microprocessor: 9, passive: 1, activity_specific: 5,
  };
  return m[p];
}

export function requiresBattery(p: ProstheticLimb): boolean {
  const m: Record<ProstheticLimb, boolean> = {
    body_powered: false, myoelectric: true, microprocessor: true, passive: false, activity_specific: false,
  };
  return m[p];
}

export function waterResistant(p: ProstheticLimb): boolean {
  const m: Record<ProstheticLimb, boolean> = {
    body_powered: true, myoelectric: false, microprocessor: false, passive: true, activity_specific: true,
  };
  return m[p];
}

export function controlMethod(p: ProstheticLimb): string {
  const m: Record<ProstheticLimb, string> = {
    body_powered: "cable_harness_motion", myoelectric: "muscle_signal_sensor",
    microprocessor: "computer_adaptive_control", passive: "cosmetic_no_active",
    activity_specific: "task_optimized_mechanism",
  };
  return m[p];
}

export function bestCandidate(p: ProstheticLimb): string {
  const m: Record<ProstheticLimb, string> = {
    body_powered: "active_manual_worker", myoelectric: "office_daily_use",
    microprocessor: "variable_terrain_active", passive: "cosmetic_light_duty",
    activity_specific: "athlete_musician_hobby",
  };
  return m[p];
}

export function prostheticLimbs(): ProstheticLimb[] {
  return ["body_powered", "myoelectric", "microprocessor", "passive", "activity_specific"];
}
