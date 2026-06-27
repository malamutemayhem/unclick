export type SeamRipperType = "basic_fork_blade" | "ergonomic_handle" | "electric_battery" | "surgical_precision" | "lighted_magnifier";

export function ripSpeed(t: SeamRipperType): number {
  const m: Record<SeamRipperType, number> = {
    basic_fork_blade: 5, ergonomic_handle: 6, electric_battery: 10, surgical_precision: 4, lighted_magnifier: 5,
  };
  return m[t];
}

export function precision(t: SeamRipperType): number {
  const m: Record<SeamRipperType, number> = {
    basic_fork_blade: 6, ergonomic_handle: 7, electric_battery: 5, surgical_precision: 10, lighted_magnifier: 9,
  };
  return m[t];
}

export function fabricSafe(t: SeamRipperType): number {
  const m: Record<SeamRipperType, number> = {
    basic_fork_blade: 6, ergonomic_handle: 7, electric_battery: 4, surgical_precision: 10, lighted_magnifier: 8,
  };
  return m[t];
}

export function handComfort(t: SeamRipperType): number {
  const m: Record<SeamRipperType, number> = {
    basic_fork_blade: 4, ergonomic_handle: 10, electric_battery: 8, surgical_precision: 5, lighted_magnifier: 7,
  };
  return m[t];
}

export function ripperCost(t: SeamRipperType): number {
  const m: Record<SeamRipperType, number> = {
    basic_fork_blade: 1, ergonomic_handle: 3, electric_battery: 7, surgical_precision: 5, lighted_magnifier: 6,
  };
  return m[t];
}

export function needsBattery(t: SeamRipperType): boolean {
  const m: Record<SeamRipperType, boolean> = {
    basic_fork_blade: false, ergonomic_handle: false, electric_battery: true, surgical_precision: false, lighted_magnifier: true,
  };
  return m[t];
}

export function hasLight(t: SeamRipperType): boolean {
  const m: Record<SeamRipperType, boolean> = {
    basic_fork_blade: false, ergonomic_handle: false, electric_battery: false, surgical_precision: false, lighted_magnifier: true,
  };
  return m[t];
}

export function tipDesign(t: SeamRipperType): string {
  const m: Record<SeamRipperType, string> = {
    basic_fork_blade: "forked_blade_ball_tip",
    ergonomic_handle: "rubber_grip_fork_blade",
    electric_battery: "vibrating_blade_motor",
    surgical_precision: "micro_point_scalpel_tip",
    lighted_magnifier: "led_magnify_fork_blade",
  };
  return m[t];
}

export function bestTask(t: SeamRipperType): string {
  const m: Record<SeamRipperType, string> = {
    basic_fork_blade: "occasional_quick_fix",
    ergonomic_handle: "long_session_comfort",
    electric_battery: "bulk_seam_removal",
    surgical_precision: "delicate_silk_vintage",
    lighted_magnifier: "low_light_fine_detail",
  };
  return m[t];
}

export function seamRippers(): SeamRipperType[] {
  return ["basic_fork_blade", "ergonomic_handle", "electric_battery", "surgical_precision", "lighted_magnifier"];
}
