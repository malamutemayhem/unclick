export type ReedHookType = "flat_wire_basic" | "bent_tip_sleyed" | "double_end_combo" | "ergonomic_handle_grip" | "fine_wire_high_dent";

export function threadingSpeed(t: ReedHookType): number {
  const m: Record<ReedHookType, number> = {
    flat_wire_basic: 7, bent_tip_sleyed: 8, double_end_combo: 9, ergonomic_handle_grip: 7, fine_wire_high_dent: 6,
  };
  return m[t];
}

export function dentAccess(t: ReedHookType): number {
  const m: Record<ReedHookType, number> = {
    flat_wire_basic: 7, bent_tip_sleyed: 9, double_end_combo: 8, ergonomic_handle_grip: 7, fine_wire_high_dent: 10,
  };
  return m[t];
}

export function handComfort(t: ReedHookType): number {
  const m: Record<ReedHookType, number> = {
    flat_wire_basic: 5, bent_tip_sleyed: 6, double_end_combo: 7, ergonomic_handle_grip: 10, fine_wire_high_dent: 4,
  };
  return m[t];
}

export function durability(t: ReedHookType): number {
  const m: Record<ReedHookType, number> = {
    flat_wire_basic: 8, bent_tip_sleyed: 7, double_end_combo: 9, ergonomic_handle_grip: 8, fine_wire_high_dent: 5,
  };
  return m[t];
}

export function hookCost(t: ReedHookType): number {
  const m: Record<ReedHookType, number> = {
    flat_wire_basic: 1, bent_tip_sleyed: 1, double_end_combo: 2, ergonomic_handle_grip: 2, fine_wire_high_dent: 1,
  };
  return m[t];
}

export function doubleEnded(t: ReedHookType): boolean {
  const m: Record<ReedHookType, boolean> = {
    flat_wire_basic: false, bent_tip_sleyed: false, double_end_combo: true, ergonomic_handle_grip: false, fine_wire_high_dent: false,
  };
  return m[t];
}

export function forFineDent(t: ReedHookType): boolean {
  const m: Record<ReedHookType, boolean> = {
    flat_wire_basic: false, bent_tip_sleyed: false, double_end_combo: false, ergonomic_handle_grip: false, fine_wire_high_dent: true,
  };
  return m[t];
}

export function hookMaterial(t: ReedHookType): string {
  const m: Record<ReedHookType, string> = {
    flat_wire_basic: "stainless_flat_wire",
    bent_tip_sleyed: "spring_steel_bent",
    double_end_combo: "nickel_plated_steel",
    ergonomic_handle_grip: "steel_rubber_handle",
    fine_wire_high_dent: "piano_wire_thin",
  };
  return m[t];
}

export function bestUse(t: ReedHookType): string {
  const m: Record<ReedHookType, string> = {
    flat_wire_basic: "general_sley_thread",
    bent_tip_sleyed: "quick_sley_pull",
    double_end_combo: "sley_and_heddle",
    ergonomic_handle_grip: "long_session_comfort",
    fine_wire_high_dent: "high_dent_reed_sley",
  };
  return m[t];
}

export function reedHooks(): ReedHookType[] {
  return ["flat_wire_basic", "bent_tip_sleyed", "double_end_combo", "ergonomic_handle_grip", "fine_wire_high_dent"];
}
