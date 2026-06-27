export type DizType = "shell_button_natural" | "wood_disc_smooth" | "ceramic_bead_round" | "metal_washer_flat" | "bone_carved_deco";

export function drafRate(t: DizType): number {
  const m: Record<DizType, number> = {
    shell_button_natural: 7, wood_disc_smooth: 8, ceramic_bead_round: 6, metal_washer_flat: 9, bone_carved_deco: 5,
  };
  return m[t];
}

export function topEven(t: DizType): number {
  const m: Record<DizType, number> = {
    shell_button_natural: 6, wood_disc_smooth: 8, ceramic_bead_round: 9, metal_washer_flat: 7, bone_carved_deco: 7,
  };
  return m[t];
}

export function holeSize(t: DizType): number {
  const m: Record<DizType, number> = {
    shell_button_natural: 5, wood_disc_smooth: 7, ceramic_bead_round: 6, metal_washer_flat: 8, bone_carved_deco: 4,
  };
  return m[t];
}

export function gripFeel(t: DizType): number {
  const m: Record<DizType, number> = {
    shell_button_natural: 8, wood_disc_smooth: 9, ceramic_bead_round: 7, metal_washer_flat: 5, bone_carved_deco: 10,
  };
  return m[t];
}

export function dizCost(t: DizType): number {
  const m: Record<DizType, number> = {
    shell_button_natural: 1, wood_disc_smooth: 1, ceramic_bead_round: 2, metal_washer_flat: 1, bone_carved_deco: 3,
  };
  return m[t];
}

export function multiHole(t: DizType): boolean {
  const m: Record<DizType, boolean> = {
    shell_button_natural: true, wood_disc_smooth: true, ceramic_bead_round: false, metal_washer_flat: false, bone_carved_deco: true,
  };
  return m[t];
}

export function handmade(t: DizType): boolean {
  const m: Record<DizType, boolean> = {
    shell_button_natural: false, wood_disc_smooth: true, ceramic_bead_round: true, metal_washer_flat: false, bone_carved_deco: true,
  };
  return m[t];
}

export function dizMaterial(t: DizType): string {
  const m: Record<DizType, string> = {
    shell_button_natural: "mother_of_pearl",
    wood_disc_smooth: "hardwood_turned",
    ceramic_bead_round: "glazed_stoneware",
    metal_washer_flat: "stainless_flat",
    bone_carved_deco: "carved_bone_disc",
  };
  return m[t];
}

export function bestUse(t: DizType): string {
  const m: Record<DizType, string> = {
    shell_button_natural: "quick_diz_pull",
    wood_disc_smooth: "smooth_top_draft",
    ceramic_bead_round: "even_roving_pull",
    metal_washer_flat: "fast_thick_draft",
    bone_carved_deco: "decorative_slow_draft",
  };
  return m[t];
}

export function dizTypes(): DizType[] {
  return ["shell_button_natural", "wood_disc_smooth", "ceramic_bead_round", "metal_washer_flat", "bone_carved_deco"];
}
