export type Treadmill = "motorized_folding" | "commercial_gym" | "manual_curved" | "under_desk" | "hybrid_incline";

export function topSpeed(t: Treadmill): number {
  const m: Record<Treadmill, number> = {
    motorized_folding: 7, commercial_gym: 10, manual_curved: 8, under_desk: 4, hybrid_incline: 9,
  };
  return m[t];
}

export function cushioning(t: Treadmill): number {
  const m: Record<Treadmill, number> = {
    motorized_folding: 6, commercial_gym: 10, manual_curved: 8, under_desk: 3, hybrid_incline: 7,
  };
  return m[t];
}

export function footprint(t: Treadmill): number {
  const m: Record<Treadmill, number> = {
    motorized_folding: 5, commercial_gym: 10, manual_curved: 7, under_desk: 3, hybrid_incline: 8,
  };
  return m[t];
}

export function durabilityRating(t: Treadmill): number {
  const m: Record<Treadmill, number> = {
    motorized_folding: 5, commercial_gym: 10, manual_curved: 9, under_desk: 4, hybrid_incline: 7,
  };
  return m[t];
}

export function machineCost(t: Treadmill): number {
  const m: Record<Treadmill, number> = {
    motorized_folding: 5, commercial_gym: 10, manual_curved: 7, under_desk: 3, hybrid_incline: 8,
  };
  return m[t];
}

export function foldable(t: Treadmill): boolean {
  const m: Record<Treadmill, boolean> = {
    motorized_folding: true, commercial_gym: false, manual_curved: false, under_desk: true, hybrid_incline: false,
  };
  return m[t];
}

export function requiresPower(t: Treadmill): boolean {
  const m: Record<Treadmill, boolean> = {
    motorized_folding: true, commercial_gym: true, manual_curved: false, under_desk: true, hybrid_incline: true,
  };
  return m[t];
}

export function driveSystem(t: Treadmill): string {
  const m: Record<Treadmill, string> = {
    motorized_folding: "dc_motor_belt_drive_folding", commercial_gym: "ac_motor_continuous_duty",
    manual_curved: "slatted_belt_self_powered", under_desk: "compact_dc_motor_slim",
    hybrid_incline: "motor_plus_auto_decline_30",
  };
  return m[t];
}

export function bestUser(t: Treadmill): string {
  const m: Record<Treadmill, string> = {
    motorized_folding: "home_fitness_space_saver", commercial_gym: "gym_heavy_use_runner",
    manual_curved: "sprint_training_hiit", under_desk: "office_walking_light",
    hybrid_incline: "incline_training_calorie_burn",
  };
  return m[t];
}

export function treadmills(): Treadmill[] {
  return ["motorized_folding", "commercial_gym", "manual_curved", "under_desk", "hybrid_incline"];
}
