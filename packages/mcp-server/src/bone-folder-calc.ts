export type BoneFolderType = "teflon_smooth_glide" | "genuine_bone_classic" | "bamboo_eco_light" | "agate_burnish_polish" | "plastic_student_safe";

export function foldCrispness(t: BoneFolderType): number {
  const m: Record<BoneFolderType, number> = {
    teflon_smooth_glide: 9, genuine_bone_classic: 10, bamboo_eco_light: 7, agate_burnish_polish: 8, plastic_student_safe: 6,
  };
  return m[t];
}

export function paperSafe(t: BoneFolderType): number {
  const m: Record<BoneFolderType, number> = {
    teflon_smooth_glide: 10, genuine_bone_classic: 8, bamboo_eco_light: 9, agate_burnish_polish: 7, plastic_student_safe: 9,
  };
  return m[t];
}

export function burnishQuality(t: BoneFolderType): number {
  const m: Record<BoneFolderType, number> = {
    teflon_smooth_glide: 7, genuine_bone_classic: 9, bamboo_eco_light: 5, agate_burnish_polish: 10, plastic_student_safe: 4,
  };
  return m[t];
}

export function durability(t: BoneFolderType): number {
  const m: Record<BoneFolderType, number> = {
    teflon_smooth_glide: 9, genuine_bone_classic: 8, bamboo_eco_light: 6, agate_burnish_polish: 10, plastic_student_safe: 5,
  };
  return m[t];
}

export function folderCost(t: BoneFolderType): number {
  const m: Record<BoneFolderType, number> = {
    teflon_smooth_glide: 2, genuine_bone_classic: 2, bamboo_eco_light: 1, agate_burnish_polish: 4, plastic_student_safe: 1,
  };
  return m[t];
}

export function noMarking(t: BoneFolderType): boolean {
  const m: Record<BoneFolderType, boolean> = {
    teflon_smooth_glide: true, genuine_bone_classic: false, bamboo_eco_light: true, agate_burnish_polish: false, plastic_student_safe: true,
  };
  return m[t];
}

export function forBookbinding(t: BoneFolderType): boolean {
  const m: Record<BoneFolderType, boolean> = {
    teflon_smooth_glide: true, genuine_bone_classic: true, bamboo_eco_light: false, agate_burnish_polish: true, plastic_student_safe: false,
  };
  return m[t];
}

export function tipMaterial(t: BoneFolderType): string {
  const m: Record<BoneFolderType, string> = {
    teflon_smooth_glide: "ptfe_coated_nylon",
    genuine_bone_classic: "polished_cattle_bone",
    bamboo_eco_light: "natural_bamboo_strip",
    agate_burnish_polish: "natural_agate_stone",
    plastic_student_safe: "abs_plastic_mold",
  };
  return m[t];
}

export function bestUse(t: BoneFolderType): string {
  const m: Record<BoneFolderType, string> = {
    teflon_smooth_glide: "dark_paper_no_shine",
    genuine_bone_classic: "fine_bookbinding_fold",
    bamboo_eco_light: "card_making_general",
    agate_burnish_polish: "gold_leaf_burnish",
    plastic_student_safe: "school_craft_class",
  };
  return m[t];
}

export function boneFolders(): BoneFolderType[] {
  return ["teflon_smooth_glide", "genuine_bone_classic", "bamboo_eco_light", "agate_burnish_polish", "plastic_student_safe"];
}
