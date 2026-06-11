// Bone folder calculator - bookbinding creasing/folding tools

export type BoneFolderBookType =
  | "bovine_bone_classic"
  | "teflon_smooth_slide"
  | "bamboo_light_flex"
  | "agate_stone_burnish"
  | "plastic_student_basic";

const FOLDER_DATA: Record<
  BoneFolderBookType,
  {
    creaseSharp: number;
    slideSmooth: number;
    markFree: number;
    durability: number;
    cost: number;
    synthetic: boolean;
    forBurnish: boolean;
    tipProfile: string;
    bestUse: string;
  }
> = {
  bovine_bone_classic: {
    creaseSharp: 9,
    slideSmooth: 8,
    markFree: 8,
    durability: 7,
    cost: 5,
    synthetic: false,
    forBurnish: false,
    tipProfile: "rounded_point_end",
    bestUse: "paper_fold_crease",
  },
  teflon_smooth_slide: {
    creaseSharp: 7,
    slideSmooth: 10,
    markFree: 10,
    durability: 8,
    cost: 6,
    synthetic: true,
    forBurnish: false,
    tipProfile: "flat_smooth_blade",
    bestUse: "coated_paper_safe",
  },
  bamboo_light_flex: {
    creaseSharp: 7,
    slideSmooth: 7,
    markFree: 7,
    durability: 5,
    cost: 2,
    synthetic: false,
    forBurnish: false,
    tipProfile: "flexible_thin_edge",
    bestUse: "light_paper_fold",
  },
  agate_stone_burnish: {
    creaseSharp: 8,
    slideSmooth: 9,
    markFree: 9,
    durability: 10,
    cost: 9,
    synthetic: false,
    forBurnish: true,
    tipProfile: "polished_stone_dome",
    bestUse: "gold_leaf_burnish",
  },
  plastic_student_basic: {
    creaseSharp: 6,
    slideSmooth: 7,
    markFree: 6,
    durability: 6,
    cost: 1,
    synthetic: true,
    forBurnish: false,
    tipProfile: "molded_basic_edge",
    bestUse: "student_practice_fold",
  },
};

export function creaseSharp(type: BoneFolderBookType): number {
  return FOLDER_DATA[type].creaseSharp;
}
export function slideSmooth(type: BoneFolderBookType): number {
  return FOLDER_DATA[type].slideSmooth;
}
export function markFree(type: BoneFolderBookType): number {
  return FOLDER_DATA[type].markFree;
}
export function durability(type: BoneFolderBookType): number {
  return FOLDER_DATA[type].durability;
}
export function folderCost(type: BoneFolderBookType): number {
  return FOLDER_DATA[type].cost;
}
export function synthetic(type: BoneFolderBookType): boolean {
  return FOLDER_DATA[type].synthetic;
}
export function forBurnish(type: BoneFolderBookType): boolean {
  return FOLDER_DATA[type].forBurnish;
}
export function tipProfile(type: BoneFolderBookType): string {
  return FOLDER_DATA[type].tipProfile;
}
export function bestUse(type: BoneFolderBookType): string {
  return FOLDER_DATA[type].bestUse;
}
export function boneFolderBooks(): BoneFolderBookType[] {
  return Object.keys(FOLDER_DATA) as BoneFolderBookType[];
}
