export type LeatherSnapType = "line_20_standard" | "line_24_heavy" | "spring_snap_light" | "magnetic_snap_hidden" | "turnlock_clasp_twist";

export function closureStrength(t: LeatherSnapType): number {
  const m: Record<LeatherSnapType, number> = {
    line_20_standard: 7, line_24_heavy: 10, spring_snap_light: 5, magnetic_snap_hidden: 6, turnlock_clasp_twist: 8,
  };
  return m[t];
}

export function openEase(t: LeatherSnapType): number {
  const m: Record<LeatherSnapType, number> = {
    line_20_standard: 7, line_24_heavy: 5, spring_snap_light: 10, magnetic_snap_hidden: 9, turnlock_clasp_twist: 6,
  };
  return m[t];
}

export function durability(t: LeatherSnapType): number {
  const m: Record<LeatherSnapType, number> = {
    line_20_standard: 8, line_24_heavy: 10, spring_snap_light: 6, magnetic_snap_hidden: 5, turnlock_clasp_twist: 9,
  };
  return m[t];
}

export function aesthetics(t: LeatherSnapType): number {
  const m: Record<LeatherSnapType, number> = {
    line_20_standard: 6, line_24_heavy: 7, spring_snap_light: 5, magnetic_snap_hidden: 10, turnlock_clasp_twist: 9,
  };
  return m[t];
}

export function snapCost(t: LeatherSnapType): number {
  const m: Record<LeatherSnapType, number> = {
    line_20_standard: 1, line_24_heavy: 2, spring_snap_light: 1, magnetic_snap_hidden: 3, turnlock_clasp_twist: 4,
  };
  return m[t];
}

export function hidden(t: LeatherSnapType): boolean {
  const m: Record<LeatherSnapType, boolean> = {
    line_20_standard: false, line_24_heavy: false, spring_snap_light: false, magnetic_snap_hidden: true, turnlock_clasp_twist: false,
  };
  return m[t];
}

export function needsTool(t: LeatherSnapType): boolean {
  const m: Record<LeatherSnapType, boolean> = {
    line_20_standard: true, line_24_heavy: true, spring_snap_light: true, magnetic_snap_hidden: false, turnlock_clasp_twist: false,
  };
  return m[t];
}

export function closureMech(t: LeatherSnapType): string {
  const m: Record<LeatherSnapType, string> = {
    line_20_standard: "socket_stud_press",
    line_24_heavy: "socket_stud_press",
    spring_snap_light: "spring_ring_click",
    magnetic_snap_hidden: "neodymium_attract",
    turnlock_clasp_twist: "quarter_turn_lock",
  };
  return m[t];
}

export function bestProject(t: LeatherSnapType): string {
  const m: Record<LeatherSnapType, string> = {
    line_20_standard: "wallet_card_case",
    line_24_heavy: "jacket_vest_heavy",
    spring_snap_light: "key_fob_light",
    magnetic_snap_hidden: "handbag_flap_clean",
    turnlock_clasp_twist: "briefcase_clasp_secure",
  };
  return m[t];
}

export function leatherSnaps(): LeatherSnapType[] {
  return ["line_20_standard", "line_24_heavy", "spring_snap_light", "magnetic_snap_hidden", "turnlock_clasp_twist"];
}
