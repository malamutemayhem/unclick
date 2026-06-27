export type BlenderType = "countertop_full" | "personal_bullet" | "immersion_stick" | "commercial_high_power" | "vacuum_seal";

export function blendPower(t: BlenderType): number {
  const m: Record<BlenderType, number> = {
    countertop_full: 7, personal_bullet: 5, immersion_stick: 4, commercial_high_power: 10, vacuum_seal: 8,
  };
  return m[t];
}

export function smoothTexture(t: BlenderType): number {
  const m: Record<BlenderType, number> = {
    countertop_full: 8, personal_bullet: 6, immersion_stick: 5, commercial_high_power: 10, vacuum_seal: 9,
  };
  return m[t];
}

export function easyClean(t: BlenderType): number {
  const m: Record<BlenderType, number> = {
    countertop_full: 5, personal_bullet: 9, immersion_stick: 10, commercial_high_power: 4, vacuum_seal: 5,
  };
  return m[t];
}

export function capacity(t: BlenderType): number {
  const m: Record<BlenderType, number> = {
    countertop_full: 8, personal_bullet: 3, immersion_stick: 10, commercial_high_power: 9, vacuum_seal: 7,
  };
  return m[t];
}

export function blenderCost(t: BlenderType): number {
  const m: Record<BlenderType, number> = {
    countertop_full: 5, personal_bullet: 2, immersion_stick: 3, commercial_high_power: 10, vacuum_seal: 7,
  };
  return m[t];
}

export function crushIce(t: BlenderType): boolean {
  const m: Record<BlenderType, boolean> = {
    countertop_full: true, personal_bullet: true, immersion_stick: false, commercial_high_power: true, vacuum_seal: true,
  };
  return m[t];
}

export function hotSoup(t: BlenderType): boolean {
  const m: Record<BlenderType, boolean> = {
    countertop_full: false, personal_bullet: false, immersion_stick: true, commercial_high_power: true, vacuum_seal: false,
  };
  return m[t];
}

export function bladeDesign(t: BlenderType): string {
  const m: Record<BlenderType, string> = {
    countertop_full: "stacked_stainless_cross",
    personal_bullet: "flat_extraction_blade",
    immersion_stick: "bell_guard_immersion",
    commercial_high_power: "hardened_aircraft_steel",
    vacuum_seal: "vacuum_chamber_cross_blade",
  };
  return m[t];
}

export function bestUse(t: BlenderType): string {
  const m: Record<BlenderType, string> = {
    countertop_full: "family_smoothie_batch",
    personal_bullet: "single_serve_on_go",
    immersion_stick: "pot_soup_sauce_blend",
    commercial_high_power: "nut_butter_frozen_acai",
    vacuum_seal: "oxidation_free_smoothie",
  };
  return m[t];
}

export function blenders(): BlenderType[] {
  return ["countertop_full", "personal_bullet", "immersion_stick", "commercial_high_power", "vacuum_seal"];
}
