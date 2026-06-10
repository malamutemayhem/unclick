export type LensFilter = "uv_haze" | "circular_polarizer" | "neutral_density" | "graduated_nd" | "infrared_pass";

export function lightReduction(l: LensFilter): number {
  const m: Record<LensFilter, number> = {
    uv_haze: 0, circular_polarizer: 3, neutral_density: 10, graduated_nd: 6, infrared_pass: 8,
  };
  return m[l];
}

export function colorAccuracy(l: LensFilter): number {
  const m: Record<LensFilter, number> = {
    uv_haze: 9, circular_polarizer: 8, neutral_density: 9, graduated_nd: 7, infrared_pass: 2,
  };
  return m[l];
}

export function glareReduction(l: LensFilter): number {
  const m: Record<LensFilter, number> = {
    uv_haze: 2, circular_polarizer: 10, neutral_density: 1, graduated_nd: 3, infrared_pass: 1,
  };
  return m[l];
}

export function creativePotential(l: LensFilter): number {
  const m: Record<LensFilter, number> = {
    uv_haze: 1, circular_polarizer: 6, neutral_density: 9, graduated_nd: 8, infrared_pass: 10,
  };
  return m[l];
}

export function filterCost(l: LensFilter): number {
  const m: Record<LensFilter, number> = {
    uv_haze: 2, circular_polarizer: 5, neutral_density: 6, graduated_nd: 7, infrared_pass: 8,
  };
  return m[l];
}

export function alwaysOn(l: LensFilter): boolean {
  const m: Record<LensFilter, boolean> = {
    uv_haze: true, circular_polarizer: false, neutral_density: false, graduated_nd: false, infrared_pass: false,
  };
  return m[l];
}

export function requiresAdapter(l: LensFilter): boolean {
  const m: Record<LensFilter, boolean> = {
    uv_haze: false, circular_polarizer: false, neutral_density: false, graduated_nd: true, infrared_pass: false,
  };
  return m[l];
}

export function opticalEffect(l: LensFilter): string {
  const m: Record<LensFilter, string> = {
    uv_haze: "ultraviolet_cut_haze_reduce", circular_polarizer: "reflection_remove_sky_deepen",
    neutral_density: "uniform_light_stop_reduction", graduated_nd: "gradient_sky_foreground_balance",
    infrared_pass: "visible_block_ir_false_color",
  };
  return m[l];
}

export function bestSubject(l: LensFilter): string {
  const m: Record<LensFilter, string> = {
    uv_haze: "general_lens_protection", circular_polarizer: "landscape_water_reflection",
    neutral_density: "long_exposure_waterfall", graduated_nd: "sunset_bright_sky_dark_land",
    infrared_pass: "surreal_foliage_architecture",
  };
  return m[l];
}

export function lensFilters(): LensFilter[] {
  return ["uv_haze", "circular_polarizer", "neutral_density", "graduated_nd", "infrared_pass"];
}
