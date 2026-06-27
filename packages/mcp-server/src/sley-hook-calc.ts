export type SleyHookType = "flat_blade_standard" | "bent_tip_angle" | "double_end_flip" | "ergonomic_handle_grip" | "fine_gauge_thin";

export function threadingSpeed(t: SleyHookType): number {
  const m: Record<SleyHookType, number> = {
    flat_blade_standard: 8, bent_tip_angle: 9, double_end_flip: 10, ergonomic_handle_grip: 7, fine_gauge_thin: 6,
  };
  return m[t];
}

export function precision(t: SleyHookType): number {
  const m: Record<SleyHookType, number> = {
    flat_blade_standard: 7, bent_tip_angle: 9, double_end_flip: 8, ergonomic_handle_grip: 7, fine_gauge_thin: 10,
  };
  return m[t];
}

export function handComfort(t: SleyHookType): number {
  const m: Record<SleyHookType, number> = {
    flat_blade_standard: 6, bent_tip_angle: 7, double_end_flip: 7, ergonomic_handle_grip: 10, fine_gauge_thin: 5,
  };
  return m[t];
}

export function durability(t: SleyHookType): number {
  const m: Record<SleyHookType, number> = {
    flat_blade_standard: 9, bent_tip_angle: 8, double_end_flip: 8, ergonomic_handle_grip: 7, fine_gauge_thin: 6,
  };
  return m[t];
}

export function hookCost(t: SleyHookType): number {
  const m: Record<SleyHookType, number> = {
    flat_blade_standard: 1, bent_tip_angle: 2, double_end_flip: 3, ergonomic_handle_grip: 3, fine_gauge_thin: 2,
  };
  return m[t];
}

export function doubleEnd(t: SleyHookType): boolean {
  const m: Record<SleyHookType, boolean> = {
    flat_blade_standard: false, bent_tip_angle: false, double_end_flip: true, ergonomic_handle_grip: false, fine_gauge_thin: false,
  };
  return m[t];
}

export function forFineThread(t: SleyHookType): boolean {
  const m: Record<SleyHookType, boolean> = {
    flat_blade_standard: false, bent_tip_angle: false, double_end_flip: false, ergonomic_handle_grip: false, fine_gauge_thin: true,
  };
  return m[t];
}

export function hookMaterial(t: SleyHookType): string {
  const m: Record<SleyHookType, string> = {
    flat_blade_standard: "steel_flat_polished",
    bent_tip_angle: "steel_bent_chrome",
    double_end_flip: "steel_dual_tip",
    ergonomic_handle_grip: "steel_rubber_handle",
    fine_gauge_thin: "thin_steel_wire",
  };
  return m[t];
}

export function bestUse(t: SleyHookType): string {
  const m: Record<SleyHookType, string> = {
    flat_blade_standard: "general_reed_sley",
    bent_tip_angle: "dense_sett_angle",
    double_end_flip: "heddle_reed_combo",
    ergonomic_handle_grip: "long_warp_comfort",
    fine_gauge_thin: "fine_thread_sley",
  };
  return m[t];
}

export function sleyHooks(): SleyHookType[] {
  return ["flat_blade_standard", "bent_tip_angle", "double_end_flip", "ergonomic_handle_grip", "fine_gauge_thin"];
}
