export type EyeglassLens = "single_vision" | "bifocal" | "progressive" | "photochromic" | "polarized";

export function visionCorrection(l: EyeglassLens): number {
  const m: Record<EyeglassLens, number> = {
    single_vision: 7, bifocal: 8, progressive: 10, photochromic: 7, polarized: 7,
  };
  return m[l];
}

export function adaptationTime(l: EyeglassLens): number {
  const m: Record<EyeglassLens, number> = {
    single_vision: 1, bifocal: 5, progressive: 8, photochromic: 2, polarized: 1,
  };
  return m[l];
}

export function priceRange(l: EyeglassLens): number {
  const m: Record<EyeglassLens, number> = {
    single_vision: 3, bifocal: 5, progressive: 9, photochromic: 7, polarized: 6,
  };
  return m[l];
}

export function aestheticAppeal(l: EyeglassLens): number {
  const m: Record<EyeglassLens, number> = {
    single_vision: 8, bifocal: 4, progressive: 9, photochromic: 7, polarized: 8,
  };
  return m[l];
}

export function distortionLevel(l: EyeglassLens): number {
  const m: Record<EyeglassLens, number> = {
    single_vision: 1, bifocal: 5, progressive: 6, photochromic: 1, polarized: 1,
  };
  return m[l];
}

export function multifocal(l: EyeglassLens): boolean {
  const m: Record<EyeglassLens, boolean> = {
    single_vision: false, bifocal: true, progressive: true, photochromic: false, polarized: false,
  };
  return m[l];
}

export function uvProtection(l: EyeglassLens): boolean {
  const m: Record<EyeglassLens, boolean> = {
    single_vision: false, bifocal: false, progressive: false, photochromic: true, polarized: true,
  };
  return m[l];
}

export function bestUseCase(l: EyeglassLens): string {
  const m: Record<EyeglassLens, string> = {
    single_vision: "single_distance_correction", bifocal: "near_far_reading",
    progressive: "all_distances_seamless", photochromic: "indoor_outdoor_transition",
    polarized: "driving_water_sports",
  };
  return m[l];
}

export function lensTechnology(l: EyeglassLens): string {
  const m: Record<EyeglassLens, string> = {
    single_vision: "uniform_curvature", bifocal: "two_zone_ground",
    progressive: "gradient_power_zones", photochromic: "silver_halide_coating",
    polarized: "laminated_filter",
  };
  return m[l];
}

export function eyeglassLenses(): EyeglassLens[] {
  return ["single_vision", "bifocal", "progressive", "photochromic", "polarized"];
}
