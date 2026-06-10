export type HolePunchType = "single_hole_portable" | "two_hole_standard" | "three_hole_heavy_duty" | "adjustable_multi_hole" | "electric_auto_punch";

export function sheetCapacity(t: HolePunchType): number {
  const m: Record<HolePunchType, number> = {
    single_hole_portable: 3, two_hole_standard: 6, three_hole_heavy_duty: 9, adjustable_multi_hole: 7, electric_auto_punch: 10,
  };
  return m[t];
}

export function punchEase(t: HolePunchType): number {
  const m: Record<HolePunchType, number> = {
    single_hole_portable: 8, two_hole_standard: 7, three_hole_heavy_duty: 5, adjustable_multi_hole: 6, electric_auto_punch: 10,
  };
  return m[t];
}

export function portability(t: HolePunchType): number {
  const m: Record<HolePunchType, number> = {
    single_hole_portable: 10, two_hole_standard: 7, three_hole_heavy_duty: 3, adjustable_multi_hole: 4, electric_auto_punch: 2,
  };
  return m[t];
}

export function holeAlignment(t: HolePunchType): number {
  const m: Record<HolePunchType, number> = {
    single_hole_portable: 4, two_hole_standard: 7, three_hole_heavy_duty: 9, adjustable_multi_hole: 8, electric_auto_punch: 10,
  };
  return m[t];
}

export function punchCost(t: HolePunchType): number {
  const m: Record<HolePunchType, number> = {
    single_hole_portable: 2, two_hole_standard: 4, three_hole_heavy_duty: 6, adjustable_multi_hole: 7, electric_auto_punch: 9,
  };
  return m[t];
}

export function hasGuide(t: HolePunchType): boolean {
  const m: Record<HolePunchType, boolean> = {
    single_hole_portable: false, two_hole_standard: true, three_hole_heavy_duty: true, adjustable_multi_hole: true, electric_auto_punch: true,
  };
  return m[t];
}

export function confettiTray(t: HolePunchType): boolean {
  const m: Record<HolePunchType, boolean> = {
    single_hole_portable: false, two_hole_standard: true, three_hole_heavy_duty: true, adjustable_multi_hole: true, electric_auto_punch: true,
  };
  return m[t];
}

export function mechanism(t: HolePunchType): string {
  const m: Record<HolePunchType, string> = {
    single_hole_portable: "lever_squeeze_hand",
    two_hole_standard: "lever_press_desktop",
    three_hole_heavy_duty: "gear_drive_heavy",
    adjustable_multi_hole: "sliding_die_set",
    electric_auto_punch: "motor_driven_auto",
  };
  return m[t];
}

export function bestUse(t: HolePunchType): string {
  const m: Record<HolePunchType, string> = {
    single_hole_portable: "tag_badge_lanyard",
    two_hole_standard: "filing_folder_basic",
    three_hole_heavy_duty: "binder_archive_bulk",
    adjustable_multi_hole: "planner_custom_layout",
    electric_auto_punch: "high_volume_office",
  };
  return m[t];
}

export function holePunches(): HolePunchType[] {
  return ["single_hole_portable", "two_hole_standard", "three_hole_heavy_duty", "adjustable_multi_hole", "electric_auto_punch"];
}
