export type EarProtection = "foam_plug" | "silicone_plug" | "over_ear_muff" | "electronic_muff" | "custom_mold";

export function noiseReduction(e: EarProtection): number {
  const m: Record<EarProtection, number> = {
    foam_plug: 8, silicone_plug: 6, over_ear_muff: 9, electronic_muff: 7, custom_mold: 10,
  };
  return m[e];
}

export function comfort(e: EarProtection): number {
  const m: Record<EarProtection, number> = {
    foam_plug: 5, silicone_plug: 7, over_ear_muff: 6, electronic_muff: 8, custom_mold: 10,
  };
  return m[e];
}

export function durability(e: EarProtection): number {
  const m: Record<EarProtection, number> = {
    foam_plug: 1, silicone_plug: 5, over_ear_muff: 9, electronic_muff: 8, custom_mold: 10,
  };
  return m[e];
}

export function speechClarity(e: EarProtection): number {
  const m: Record<EarProtection, number> = {
    foam_plug: 2, silicone_plug: 4, over_ear_muff: 3, electronic_muff: 9, custom_mold: 7,
  };
  return m[e];
}

export function purchasePrice(e: EarProtection): number {
  const m: Record<EarProtection, number> = {
    foam_plug: 1, silicone_plug: 3, over_ear_muff: 5, electronic_muff: 8, custom_mold: 10,
  };
  return m[e];
}

export function reusable(e: EarProtection): boolean {
  const m: Record<EarProtection, boolean> = {
    foam_plug: false, silicone_plug: true, over_ear_muff: true, electronic_muff: true, custom_mold: true,
  };
  return m[e];
}

export function allowsAmbientSound(e: EarProtection): boolean {
  const m: Record<EarProtection, boolean> = {
    foam_plug: false, silicone_plug: false, over_ear_muff: false, electronic_muff: true, custom_mold: false,
  };
  return m[e];
}

export function attenuationMethod(e: EarProtection): string {
  const m: Record<EarProtection, string> = {
    foam_plug: "expanding_foam_seal", silicone_plug: "flanged_silicone_seal",
    over_ear_muff: "cushioned_cup_enclosure", electronic_muff: "active_noise_limit_circuit",
    custom_mold: "impression_matched_canal",
  };
  return m[e];
}

export function bestEnvironment(e: EarProtection): string {
  const m: Record<EarProtection, string> = {
    foam_plug: "disposable_industrial", silicone_plug: "concert_musician",
    over_ear_muff: "construction_factory", electronic_muff: "shooting_range_tactical",
    custom_mold: "professional_musician_pilot",
  };
  return m[e];
}

export function earProtections(): EarProtection[] {
  return ["foam_plug", "silicone_plug", "over_ear_muff", "electronic_muff", "custom_mold"];
}
