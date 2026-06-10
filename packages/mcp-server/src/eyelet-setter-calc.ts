export type EyeletSetterType = "squeeze_plier_hand" | "hammer_set_anvil" | "crop_a_dile_big" | "setter_tool_basic" | "revolving_punch_hole";

export function setStrength(t: EyeletSetterType): number {
  const m: Record<EyeletSetterType, number> = {
    squeeze_plier_hand: 8, hammer_set_anvil: 9, crop_a_dile_big: 10, setter_tool_basic: 5, revolving_punch_hole: 7,
  };
  return m[t];
}

export function easeOfUse(t: EyeletSetterType): number {
  const m: Record<EyeletSetterType, number> = {
    squeeze_plier_hand: 9, hammer_set_anvil: 5, crop_a_dile_big: 10, setter_tool_basic: 6, revolving_punch_hole: 8,
  };
  return m[t];
}

export function sizeRange(t: EyeletSetterType): number {
  const m: Record<EyeletSetterType, number> = {
    squeeze_plier_hand: 6, hammer_set_anvil: 9, crop_a_dile_big: 8, setter_tool_basic: 4, revolving_punch_hole: 10,
  };
  return m[t];
}

export function portability(t: EyeletSetterType): number {
  const m: Record<EyeletSetterType, number> = {
    squeeze_plier_hand: 9, hammer_set_anvil: 4, crop_a_dile_big: 6, setter_tool_basic: 10, revolving_punch_hole: 8,
  };
  return m[t];
}

export function setterCost(t: EyeletSetterType): number {
  const m: Record<EyeletSetterType, number> = {
    squeeze_plier_hand: 2, hammer_set_anvil: 2, crop_a_dile_big: 4, setter_tool_basic: 1, revolving_punch_hole: 3,
  };
  return m[t];
}

export function punchIncluded(t: EyeletSetterType): boolean {
  const m: Record<EyeletSetterType, boolean> = {
    squeeze_plier_hand: true, hammer_set_anvil: false, crop_a_dile_big: true, setter_tool_basic: false, revolving_punch_hole: true,
  };
  return m[t];
}

export function oneHand(t: EyeletSetterType): boolean {
  const m: Record<EyeletSetterType, boolean> = {
    squeeze_plier_hand: true, hammer_set_anvil: false, crop_a_dile_big: true, setter_tool_basic: false, revolving_punch_hole: true,
  };
  return m[t];
}

export function setterMech(t: EyeletSetterType): string {
  const m: Record<EyeletSetterType, string> = {
    squeeze_plier_hand: "plier_squeeze_set",
    hammer_set_anvil: "hammer_anvil_flare",
    crop_a_dile_big: "lever_compound_press",
    setter_tool_basic: "push_set_manual",
    revolving_punch_hole: "rotary_punch_wheel",
  };
  return m[t];
}

export function bestUse(t: EyeletSetterType): string {
  const m: Record<EyeletSetterType, string> = {
    squeeze_plier_hand: "card_eyelet_quick",
    hammer_set_anvil: "heavy_fabric_eyelet",
    crop_a_dile_big: "thick_material_set",
    setter_tool_basic: "basic_paper_eyelet",
    revolving_punch_hole: "multi_hole_punch",
  };
  return m[t];
}

export function eyeletSetters(): EyeletSetterType[] {
  return ["squeeze_plier_hand", "hammer_set_anvil", "crop_a_dile_big", "setter_tool_basic", "revolving_punch_hole"];
}
