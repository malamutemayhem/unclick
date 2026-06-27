export type RosinType = "light_amber_violin" | "dark_soft_cello" | "bass_extra_sticky" | "hypoallergenic_gold" | "pop_style_grip_enhance";

export function gripLevel(t: RosinType): number {
  const m: Record<RosinType, number> = {
    light_amber_violin: 5, dark_soft_cello: 8, bass_extra_sticky: 10, hypoallergenic_gold: 6, pop_style_grip_enhance: 7,
  };
  return m[t];
}

export function dustLevel(t: RosinType): number {
  const m: Record<RosinType, number> = {
    light_amber_violin: 8, dark_soft_cello: 4, bass_extra_sticky: 3, hypoallergenic_gold: 9, pop_style_grip_enhance: 6,
  };
  return m[t];
}

export function toneBrightness(t: RosinType): number {
  const m: Record<RosinType, number> = {
    light_amber_violin: 9, dark_soft_cello: 4, bass_extra_sticky: 3, hypoallergenic_gold: 7, pop_style_grip_enhance: 6,
  };
  return m[t];
}

export function longevity(t: RosinType): number {
  const m: Record<RosinType, number> = {
    light_amber_violin: 6, dark_soft_cello: 7, bass_extra_sticky: 5, hypoallergenic_gold: 8, pop_style_grip_enhance: 9,
  };
  return m[t];
}

export function rosinCost(t: RosinType): number {
  const m: Record<RosinType, number> = {
    light_amber_violin: 3, dark_soft_cello: 4, bass_extra_sticky: 5, hypoallergenic_gold: 8, pop_style_grip_enhance: 6,
  };
  return m[t];
}

export function allergenFree(t: RosinType): boolean {
  const m: Record<RosinType, boolean> = {
    light_amber_violin: false, dark_soft_cello: false, bass_extra_sticky: false, hypoallergenic_gold: true, pop_style_grip_enhance: false,
  };
  return m[t];
}

export function suitsSolo(t: RosinType): boolean {
  const m: Record<RosinType, boolean> = {
    light_amber_violin: true, dark_soft_cello: true, bass_extra_sticky: false, hypoallergenic_gold: true, pop_style_grip_enhance: false,
  };
  return m[t];
}

export function resinBase(t: RosinType): string {
  const m: Record<RosinType, string> = {
    light_amber_violin: "purified_pine_sap_light",
    dark_soft_cello: "aged_pine_resin_dark",
    bass_extra_sticky: "spruce_resin_wax_blend",
    hypoallergenic_gold: "synthetic_gold_flake_mix",
    pop_style_grip_enhance: "composite_polymer_rosin",
  };
  return m[t];
}

export function bestInstrument(t: RosinType): string {
  const m: Record<RosinType, string> = {
    light_amber_violin: "violin_solo_bright_tone",
    dark_soft_cello: "cello_warm_deep_tone",
    bass_extra_sticky: "upright_bass_orchestra",
    hypoallergenic_gold: "allergy_sensitive_player",
    pop_style_grip_enhance: "electric_violin_amplified",
  };
  return m[t];
}

export function rosins(): RosinType[] {
  return ["light_amber_violin", "dark_soft_cello", "bass_extra_sticky", "hypoallergenic_gold", "pop_style_grip_enhance"];
}
