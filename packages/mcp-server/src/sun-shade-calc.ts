export type SunShadeType = "accordion_fold_foil" | "custom_fit_mesh" | "roll_up_retractable" | "static_cling_tint" | "umbrella_pop_open";

export function heatBlock(t: SunShadeType): number {
  const m: Record<SunShadeType, number> = {
    accordion_fold_foil: 9, custom_fit_mesh: 6, roll_up_retractable: 7, static_cling_tint: 5, umbrella_pop_open: 8,
  };
  return m[t];
}

export function uvProtection(t: SunShadeType): number {
  const m: Record<SunShadeType, number> = {
    accordion_fold_foil: 10, custom_fit_mesh: 7, roll_up_retractable: 8, static_cling_tint: 6, umbrella_pop_open: 9,
  };
  return m[t];
}

export function storageEase(t: SunShadeType): number {
  const m: Record<SunShadeType, number> = {
    accordion_fold_foil: 6, custom_fit_mesh: 5, roll_up_retractable: 9, static_cling_tint: 10, umbrella_pop_open: 8,
  };
  return m[t];
}

export function setupSpeed(t: SunShadeType): number {
  const m: Record<SunShadeType, number> = {
    accordion_fold_foil: 7, custom_fit_mesh: 4, roll_up_retractable: 8, static_cling_tint: 6, umbrella_pop_open: 10,
  };
  return m[t];
}

export function shadeCost(t: SunShadeType): number {
  const m: Record<SunShadeType, number> = {
    accordion_fold_foil: 3, custom_fit_mesh: 7, roll_up_retractable: 5, static_cling_tint: 4, umbrella_pop_open: 6,
  };
  return m[t];
}

export function universalFit(t: SunShadeType): boolean {
  const m: Record<SunShadeType, boolean> = {
    accordion_fold_foil: true, custom_fit_mesh: false, roll_up_retractable: true, static_cling_tint: true, umbrella_pop_open: true,
  };
  return m[t];
}

export function seeThrough(t: SunShadeType): boolean {
  const m: Record<SunShadeType, boolean> = {
    accordion_fold_foil: false, custom_fit_mesh: true, roll_up_retractable: false, static_cling_tint: true, umbrella_pop_open: false,
  };
  return m[t];
}

export function shadeMaterial(t: SunShadeType): string {
  const m: Record<SunShadeType, string> = {
    accordion_fold_foil: "reflective_mylar_cardboard",
    custom_fit_mesh: "polyester_mesh_frame_fit",
    roll_up_retractable: "spring_roller_nylon",
    static_cling_tint: "vinyl_static_cling_film",
    umbrella_pop_open: "titanium_silver_fabric_ribs",
  };
  return m[t];
}

export function bestWindow(t: SunShadeType): string {
  const m: Record<SunShadeType, string> = {
    accordion_fold_foil: "front_windshield_full",
    custom_fit_mesh: "rear_side_passenger",
    roll_up_retractable: "rear_window_suction",
    static_cling_tint: "side_window_privacy",
    umbrella_pop_open: "front_windshield_quick",
  };
  return m[t];
}

export function sunShades(): SunShadeType[] {
  return ["accordion_fold_foil", "custom_fit_mesh", "roll_up_retractable", "static_cling_tint", "umbrella_pop_open"];
}
