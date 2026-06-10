export type TumblerBarrelType = "rotary_rubber_drum" | "vibratory_bowl_fast" | "magnetic_pin_fine" | "centrifugal_disc_heavy" | "barrel_hex_rock";

export function polishSpeed(t: TumblerBarrelType): number {
  const m: Record<TumblerBarrelType, number> = {
    rotary_rubber_drum: 5, vibratory_bowl_fast: 8, magnetic_pin_fine: 9, centrifugal_disc_heavy: 10, barrel_hex_rock: 4,
  };
  return m[t];
}

export function finishQuality(t: TumblerBarrelType): number {
  const m: Record<TumblerBarrelType, number> = {
    rotary_rubber_drum: 7, vibratory_bowl_fast: 8, magnetic_pin_fine: 10, centrifugal_disc_heavy: 6, barrel_hex_rock: 5,
  };
  return m[t];
}

export function capacity(t: TumblerBarrelType): number {
  const m: Record<TumblerBarrelType, number> = {
    rotary_rubber_drum: 7, vibratory_bowl_fast: 8, magnetic_pin_fine: 4, centrifugal_disc_heavy: 6, barrel_hex_rock: 10,
  };
  return m[t];
}

export function noiseLevel(t: TumblerBarrelType): number {
  const m: Record<TumblerBarrelType, number> = {
    rotary_rubber_drum: 6, vibratory_bowl_fast: 3, magnetic_pin_fine: 8, centrifugal_disc_heavy: 2, barrel_hex_rock: 5,
  };
  return m[t];
}

export function tumblerCost(t: TumblerBarrelType): number {
  const m: Record<TumblerBarrelType, number> = {
    rotary_rubber_drum: 1, vibratory_bowl_fast: 2, magnetic_pin_fine: 3, centrifugal_disc_heavy: 3, barrel_hex_rock: 1,
  };
  return m[t];
}

export function selfContained(t: TumblerBarrelType): boolean {
  const m: Record<TumblerBarrelType, boolean> = {
    rotary_rubber_drum: true, vibratory_bowl_fast: false, magnetic_pin_fine: true, centrifugal_disc_heavy: true, barrel_hex_rock: true,
  };
  return m[t];
}

export function wetProcess(t: TumblerBarrelType): boolean {
  const m: Record<TumblerBarrelType, boolean> = {
    rotary_rubber_drum: true, vibratory_bowl_fast: true, magnetic_pin_fine: true, centrifugal_disc_heavy: false, barrel_hex_rock: true,
  };
  return m[t];
}

export function mediaType(t: TumblerBarrelType): string {
  const m: Record<TumblerBarrelType, string> = {
    rotary_rubber_drum: "ceramic_triangle_media",
    vibratory_bowl_fast: "plastic_pyramid_media",
    magnetic_pin_fine: "stainless_micro_pin",
    centrifugal_disc_heavy: "walnut_shell_dry",
    barrel_hex_rock: "silicon_carbide_grit",
  };
  return m[t];
}

export function bestUse(t: TumblerBarrelType): string {
  const m: Record<TumblerBarrelType, string> = {
    rotary_rubber_drum: "jewelry_deburr_polish",
    vibratory_bowl_fast: "batch_finish_fast",
    magnetic_pin_fine: "chain_link_polish",
    centrifugal_disc_heavy: "heavy_part_smooth",
    barrel_hex_rock: "rock_gem_tumble",
  };
  return m[t];
}

export function tumblerBarrels(): TumblerBarrelType[] {
  return ["rotary_rubber_drum", "vibratory_bowl_fast", "magnetic_pin_fine", "centrifugal_disc_heavy", "barrel_hex_rock"];
}
