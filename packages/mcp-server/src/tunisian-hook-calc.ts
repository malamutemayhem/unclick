export type TunisianHookType = "single_end_standard" | "double_end_cro" | "cable_flexible_long" | "interchangeable_set" | "ergonomic_cushion_grip";

export function stitchCapacity(t: TunisianHookType): number {
  const m: Record<TunisianHookType, number> = {
    single_end_standard: 7, double_end_cro: 6, cable_flexible_long: 10, interchangeable_set: 9, ergonomic_cushion_grip: 7,
  };
  return m[t];
}

export function versatility(t: TunisianHookType): number {
  const m: Record<TunisianHookType, number> = {
    single_end_standard: 6, double_end_cro: 8, cable_flexible_long: 9, interchangeable_set: 10, ergonomic_cushion_grip: 7,
  };
  return m[t];
}

export function handComfort(t: TunisianHookType): number {
  const m: Record<TunisianHookType, number> = {
    single_end_standard: 6, double_end_cro: 5, cable_flexible_long: 8, interchangeable_set: 7, ergonomic_cushion_grip: 10,
  };
  return m[t];
}

export function portability(t: TunisianHookType): number {
  const m: Record<TunisianHookType, number> = {
    single_end_standard: 8, double_end_cro: 7, cable_flexible_long: 5, interchangeable_set: 6, ergonomic_cushion_grip: 7,
  };
  return m[t];
}

export function hookCost(t: TunisianHookType): number {
  const m: Record<TunisianHookType, number> = {
    single_end_standard: 2, double_end_cro: 3, cable_flexible_long: 4, interchangeable_set: 5, ergonomic_cushion_grip: 3,
  };
  return m[t];
}

export function doubleEnded(t: TunisianHookType): boolean {
  const m: Record<TunisianHookType, boolean> = {
    single_end_standard: false, double_end_cro: true, cable_flexible_long: false, interchangeable_set: false, ergonomic_cushion_grip: false,
  };
  return m[t];
}

export function sizeSwap(t: TunisianHookType): boolean {
  const m: Record<TunisianHookType, boolean> = {
    single_end_standard: false, double_end_cro: false, cable_flexible_long: false, interchangeable_set: true, ergonomic_cushion_grip: false,
  };
  return m[t];
}

export function hookMaterial(t: TunisianHookType): string {
  const m: Record<TunisianHookType, string> = {
    single_end_standard: "aluminum_anodized",
    double_end_cro: "bamboo_smooth_double",
    cable_flexible_long: "metal_cable_extend",
    interchangeable_set: "wood_tip_cable_set",
    ergonomic_cushion_grip: "rubber_grip_aluminum",
  };
  return m[t];
}

export function bestProject(t: TunisianHookType): string {
  const m: Record<TunisianHookType, string> = {
    single_end_standard: "basic_tunisian_learn",
    double_end_cro: "two_color_entrelac",
    cable_flexible_long: "wide_blanket_afghan",
    interchangeable_set: "multi_size_collection",
    ergonomic_cushion_grip: "long_session_comfort",
  };
  return m[t];
}

export function tunisianHooks(): TunisianHookType[] {
  return ["single_end_standard", "double_end_cro", "cable_flexible_long", "interchangeable_set", "ergonomic_cushion_grip"];
}
