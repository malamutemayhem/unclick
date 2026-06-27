export type SkiGoggleType = "flat_lens_budget" | "spherical_mirror" | "cylindrical_photochromic" | "otg_over_glasses" | "frameless_magnetic";

export function opticalClarity(t: SkiGoggleType): number {
  const m: Record<SkiGoggleType, number> = {
    flat_lens_budget: 4, spherical_mirror: 9, cylindrical_photochromic: 8, otg_over_glasses: 5, frameless_magnetic: 10,
  };
  return m[t];
}

export function fogResistance(t: SkiGoggleType): number {
  const m: Record<SkiGoggleType, number> = {
    flat_lens_budget: 3, spherical_mirror: 8, cylindrical_photochromic: 7, otg_over_glasses: 5, frameless_magnetic: 9,
  };
  return m[t];
}

export function fieldOfView(t: SkiGoggleType): number {
  const m: Record<SkiGoggleType, number> = {
    flat_lens_budget: 5, spherical_mirror: 9, cylindrical_photochromic: 7, otg_over_glasses: 6, frameless_magnetic: 10,
  };
  return m[t];
}

export function lightAdaptation(t: SkiGoggleType): number {
  const m: Record<SkiGoggleType, number> = {
    flat_lens_budget: 2, spherical_mirror: 5, cylindrical_photochromic: 10, otg_over_glasses: 3, frameless_magnetic: 6,
  };
  return m[t];
}

export function goggleCost(t: SkiGoggleType): number {
  const m: Record<SkiGoggleType, number> = {
    flat_lens_budget: 1, spherical_mirror: 7, cylindrical_photochromic: 8, otg_over_glasses: 4, frameless_magnetic: 10,
  };
  return m[t];
}

export function interchangeable(t: SkiGoggleType): boolean {
  const m: Record<SkiGoggleType, boolean> = {
    flat_lens_budget: false, spherical_mirror: false, cylindrical_photochromic: false, otg_over_glasses: false, frameless_magnetic: true,
  };
  return m[t];
}

export function prescriptionFit(t: SkiGoggleType): boolean {
  const m: Record<SkiGoggleType, boolean> = {
    flat_lens_budget: false, spherical_mirror: false, cylindrical_photochromic: false, otg_over_glasses: true, frameless_magnetic: false,
  };
  return m[t];
}

export function lensType(t: SkiGoggleType): string {
  const m: Record<SkiGoggleType, string> = {
    flat_lens_budget: "single_layer_polycarbonate", spherical_mirror: "dual_layer_spherical_mirror",
    cylindrical_photochromic: "transition_variable_tint", otg_over_glasses: "oversized_dual_pane",
    frameless_magnetic: "toric_magnetic_snap_lens",
  };
  return m[t];
}

export function bestCondition(t: SkiGoggleType): string {
  const m: Record<SkiGoggleType, string> = {
    flat_lens_budget: "occasional_resort_day", spherical_mirror: "bright_bluebird_day",
    cylindrical_photochromic: "variable_weather_all_day", otg_over_glasses: "glasses_wearer_any",
    frameless_magnetic: "serious_all_conditions",
  };
  return m[t];
}

export function skiGoggles(): SkiGoggleType[] {
  return ["flat_lens_budget", "spherical_mirror", "cylindrical_photochromic", "otg_over_glasses", "frameless_magnetic"];
}
