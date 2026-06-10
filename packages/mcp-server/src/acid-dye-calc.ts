export type AcidDyeType = "leveling_even_wash" | "milling_deep_fast" | "super_milling_intense" | "metal_complex_light" | "pre_metalized_strong";

export function colorDepth(t: AcidDyeType): number {
  const m: Record<AcidDyeType, number> = {
    leveling_even_wash: 6, milling_deep_fast: 8, super_milling_intense: 10, metal_complex_light: 7, pre_metalized_strong: 9,
  };
  return m[t];
}

export function washFast(t: AcidDyeType): number {
  const m: Record<AcidDyeType, number> = {
    leveling_even_wash: 5, milling_deep_fast: 8, super_milling_intense: 9, metal_complex_light: 7, pre_metalized_strong: 10,
  };
  return m[t];
}

export function levelAbility(t: AcidDyeType): number {
  const m: Record<AcidDyeType, number> = {
    leveling_even_wash: 10, milling_deep_fast: 6, super_milling_intense: 4, metal_complex_light: 8, pre_metalized_strong: 5,
  };
  return m[t];
}

export function lightFast(t: AcidDyeType): number {
  const m: Record<AcidDyeType, number> = {
    leveling_even_wash: 5, milling_deep_fast: 7, super_milling_intense: 8, metal_complex_light: 10, pre_metalized_strong: 9,
  };
  return m[t];
}

export function dyeCost(t: AcidDyeType): number {
  const m: Record<AcidDyeType, number> = {
    leveling_even_wash: 2, milling_deep_fast: 3, super_milling_intense: 4, metal_complex_light: 4, pre_metalized_strong: 5,
  };
  return m[t];
}

export function forProtein(t: AcidDyeType): boolean {
  const m: Record<AcidDyeType, boolean> = {
    leveling_even_wash: true, milling_deep_fast: true, super_milling_intense: true, metal_complex_light: true, pre_metalized_strong: true,
  };
  return m[t];
}

export function needsHeat(t: AcidDyeType): boolean {
  const m: Record<AcidDyeType, boolean> = {
    leveling_even_wash: true, milling_deep_fast: true, super_milling_intense: true, metal_complex_light: false, pre_metalized_strong: false,
  };
  return m[t];
}

export function dyeBase(t: AcidDyeType): string {
  const m: Record<AcidDyeType, string> = {
    leveling_even_wash: "sulfonated_azo_level",
    milling_deep_fast: "mono_azo_milling",
    super_milling_intense: "di_azo_super_mill",
    metal_complex_light: "chromium_complex_1to1",
    pre_metalized_strong: "chromium_complex_1to2",
  };
  return m[t];
}

export function bestFiber(t: AcidDyeType): string {
  const m: Record<AcidDyeType, string> = {
    leveling_even_wash: "wool_silk_even_tone",
    milling_deep_fast: "wool_nylon_deep",
    super_milling_intense: "luxury_fiber_vibrant",
    metal_complex_light: "silk_light_shade",
    pre_metalized_strong: "nylon_carpet_durable",
  };
  return m[t];
}

export function acidDyes(): AcidDyeType[] {
  return ["leveling_even_wash", "milling_deep_fast", "super_milling_intense", "metal_complex_light", "pre_metalized_strong"];
}
