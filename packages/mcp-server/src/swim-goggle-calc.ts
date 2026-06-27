export type SwimGoggleType = "racing_low_profile" | "training_comfort_seal" | "open_water_wide_lens" | "prescription_corrective" | "mask_style_snorkel";

export function hydrodynamic(t: SwimGoggleType): number {
  const m: Record<SwimGoggleType, number> = {
    racing_low_profile: 10, training_comfort_seal: 6, open_water_wide_lens: 7, prescription_corrective: 5, mask_style_snorkel: 3,
  };
  return m[t];
}

export function comfort(t: SwimGoggleType): number {
  const m: Record<SwimGoggleType, number> = {
    racing_low_profile: 4, training_comfort_seal: 10, open_water_wide_lens: 8, prescription_corrective: 7, mask_style_snorkel: 9,
  };
  return m[t];
}

export function fieldOfView(t: SwimGoggleType): number {
  const m: Record<SwimGoggleType, number> = {
    racing_low_profile: 5, training_comfort_seal: 7, open_water_wide_lens: 10, prescription_corrective: 6, mask_style_snorkel: 9,
  };
  return m[t];
}

export function antiFog(t: SwimGoggleType): number {
  const m: Record<SwimGoggleType, number> = {
    racing_low_profile: 7, training_comfort_seal: 8, open_water_wide_lens: 9, prescription_corrective: 6, mask_style_snorkel: 5,
  };
  return m[t];
}

export function goggleCost(t: SwimGoggleType): number {
  const m: Record<SwimGoggleType, number> = {
    racing_low_profile: 8, training_comfort_seal: 4, open_water_wide_lens: 7, prescription_corrective: 9, mask_style_snorkel: 5,
  };
  return m[t];
}

export function uvProtection(t: SwimGoggleType): boolean {
  const m: Record<SwimGoggleType, boolean> = {
    racing_low_profile: true, training_comfort_seal: false, open_water_wide_lens: true, prescription_corrective: true, mask_style_snorkel: true,
  };
  return m[t];
}

export function mirroredLens(t: SwimGoggleType): boolean {
  const m: Record<SwimGoggleType, boolean> = {
    racing_low_profile: true, training_comfort_seal: false, open_water_wide_lens: true, prescription_corrective: false, mask_style_snorkel: false,
  };
  return m[t];
}

export function lensMaterial(t: SwimGoggleType): string {
  const m: Record<SwimGoggleType, string> = {
    racing_low_profile: "polycarbonate_mirror_coat",
    training_comfort_seal: "clear_polycarbonate_fog_resist",
    open_water_wide_lens: "curved_tinted_panoramic",
    prescription_corrective: "optical_grade_diopter_lens",
    mask_style_snorkel: "tempered_glass_wide_skirt",
  };
  return m[t];
}

export function bestSwim(t: SwimGoggleType): string {
  const m: Record<SwimGoggleType, string> = {
    racing_low_profile: "competition_lap_race",
    training_comfort_seal: "daily_pool_training",
    open_water_wide_lens: "triathlon_ocean_lake",
    prescription_corrective: "nearsighted_pool_lap",
    mask_style_snorkel: "leisure_snorkel_reef",
  };
  return m[t];
}

export function swimGoggles(): SwimGoggleType[] {
  return ["racing_low_profile", "training_comfort_seal", "open_water_wide_lens", "prescription_corrective", "mask_style_snorkel"];
}
