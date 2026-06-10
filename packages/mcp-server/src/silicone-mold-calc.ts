export type SiliconeMoldType = "platinum_cure_food" | "tin_cure_detail" | "brush_on_thick" | "block_mold_pour" | "skin_safe_body";

export function detailCapture(t: SiliconeMoldType): number {
  const m: Record<SiliconeMoldType, number> = {
    platinum_cure_food: 9, tin_cure_detail: 10, brush_on_thick: 7, block_mold_pour: 8, skin_safe_body: 6,
  };
  return m[t];
}

export function tearStrength(t: SiliconeMoldType): number {
  const m: Record<SiliconeMoldType, number> = {
    platinum_cure_food: 9, tin_cure_detail: 7, brush_on_thick: 8, block_mold_pour: 6, skin_safe_body: 5,
  };
  return m[t];
}

export function shelfLife(t: SiliconeMoldType): number {
  const m: Record<SiliconeMoldType, number> = {
    platinum_cure_food: 10, tin_cure_detail: 5, brush_on_thick: 7, block_mold_pour: 6, skin_safe_body: 4,
  };
  return m[t];
}

export function flexibility(t: SiliconeMoldType): number {
  const m: Record<SiliconeMoldType, number> = {
    platinum_cure_food: 8, tin_cure_detail: 7, brush_on_thick: 9, block_mold_pour: 6, skin_safe_body: 10,
  };
  return m[t];
}

export function moldCost(t: SiliconeMoldType): number {
  const m: Record<SiliconeMoldType, number> = {
    platinum_cure_food: 3, tin_cure_detail: 2, brush_on_thick: 2, block_mold_pour: 2, skin_safe_body: 3,
  };
  return m[t];
}

export function foodSafe(t: SiliconeMoldType): boolean {
  const m: Record<SiliconeMoldType, boolean> = {
    platinum_cure_food: true, tin_cure_detail: false, brush_on_thick: false, block_mold_pour: false, skin_safe_body: false,
  };
  return m[t];
}

export function brushable(t: SiliconeMoldType): boolean {
  const m: Record<SiliconeMoldType, boolean> = {
    platinum_cure_food: false, tin_cure_detail: false, brush_on_thick: true, block_mold_pour: false, skin_safe_body: false,
  };
  return m[t];
}

export function cureSystem(t: SiliconeMoldType): string {
  const m: Record<SiliconeMoldType, string> = {
    platinum_cure_food: "addition_cure_platinum",
    tin_cure_detail: "condensation_cure_tin",
    brush_on_thick: "thixotropic_brush_layer",
    block_mold_pour: "pourable_block_fill",
    skin_safe_body: "skin_contact_certified",
  };
  return m[t];
}

export function bestCast(t: SiliconeMoldType): string {
  const m: Record<SiliconeMoldType, string> = {
    platinum_cure_food: "chocolate_candy_mold",
    tin_cure_detail: "resin_figurine_detail",
    brush_on_thick: "large_sculpture_shell",
    block_mold_pour: "small_object_embed",
    skin_safe_body: "prosthetic_life_cast",
  };
  return m[t];
}

export function siliconeMolds(): SiliconeMoldType[] {
  return ["platinum_cure_food", "tin_cure_detail", "brush_on_thick", "block_mold_pour", "skin_safe_body"];
}
