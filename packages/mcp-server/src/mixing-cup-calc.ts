export type MixingCupType = "graduated_plastic_clear" | "silicone_flex_reuse" | "paper_disposable_wax" | "stainless_steel_pour" | "glass_beaker_lab";

export function measureAccuracy(t: MixingCupType): number {
  const m: Record<MixingCupType, number> = {
    graduated_plastic_clear: 8, silicone_flex_reuse: 6, paper_disposable_wax: 5, stainless_steel_pour: 7, glass_beaker_lab: 10,
  };
  return m[t];
}

export function reusability(t: MixingCupType): number {
  const m: Record<MixingCupType, number> = {
    graduated_plastic_clear: 3, silicone_flex_reuse: 10, paper_disposable_wax: 1, stainless_steel_pour: 9, glass_beaker_lab: 8,
  };
  return m[t];
}

export function pourControl(t: MixingCupType): number {
  const m: Record<MixingCupType, number> = {
    graduated_plastic_clear: 7, silicone_flex_reuse: 9, paper_disposable_wax: 5, stainless_steel_pour: 10, glass_beaker_lab: 8,
  };
  return m[t];
}

export function chemResist(t: MixingCupType): number {
  const m: Record<MixingCupType, number> = {
    graduated_plastic_clear: 7, silicone_flex_reuse: 9, paper_disposable_wax: 4, stainless_steel_pour: 10, glass_beaker_lab: 10,
  };
  return m[t];
}

export function cupCost(t: MixingCupType): number {
  const m: Record<MixingCupType, number> = {
    graduated_plastic_clear: 1, silicone_flex_reuse: 3, paper_disposable_wax: 1, stainless_steel_pour: 4, glass_beaker_lab: 5,
  };
  return m[t];
}

export function disposable(t: MixingCupType): boolean {
  const m: Record<MixingCupType, boolean> = {
    graduated_plastic_clear: true, silicone_flex_reuse: false, paper_disposable_wax: true, stainless_steel_pour: false, glass_beaker_lab: false,
  };
  return m[t];
}

export function seeThrough(t: MixingCupType): boolean {
  const m: Record<MixingCupType, boolean> = {
    graduated_plastic_clear: true, silicone_flex_reuse: false, paper_disposable_wax: false, stainless_steel_pour: false, glass_beaker_lab: true,
  };
  return m[t];
}

export function cupMaterial(t: MixingCupType): string {
  const m: Record<MixingCupType, string> = {
    graduated_plastic_clear: "polypropylene_clear",
    silicone_flex_reuse: "platinum_cure_silicone",
    paper_disposable_wax: "wax_coated_paper",
    stainless_steel_pour: "surgical_steel_304",
    glass_beaker_lab: "borosilicate_glass",
  };
  return m[t];
}

export function bestUse(t: MixingCupType): string {
  const m: Record<MixingCupType, string> = {
    graduated_plastic_clear: "measure_mix_dispose",
    silicone_flex_reuse: "peel_clean_reuse",
    paper_disposable_wax: "small_batch_quick",
    stainless_steel_pour: "large_pour_precise",
    glass_beaker_lab: "heat_resist_measure",
  };
  return m[t];
}

export function mixingCups(): MixingCupType[] {
  return ["graduated_plastic_clear", "silicone_flex_reuse", "paper_disposable_wax", "stainless_steel_pour", "glass_beaker_lab"];
}
