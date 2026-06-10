export type BridgeFittingType = "maple_violin_carved" | "ebony_guitar_saddle" | "bone_nut_blank" | "rosewood_mandolin_float" | "synthetic_student_pre";

export function toneClarity(t: BridgeFittingType): number {
  const m: Record<BridgeFittingType, number> = {
    maple_violin_carved: 10, ebony_guitar_saddle: 9, bone_nut_blank: 8, rosewood_mandolin_float: 7, synthetic_student_pre: 4,
  };
  return m[t];
}

export function fitDifficulty(t: BridgeFittingType): number {
  const m: Record<BridgeFittingType, number> = {
    maple_violin_carved: 10, ebony_guitar_saddle: 7, bone_nut_blank: 8, rosewood_mandolin_float: 6, synthetic_student_pre: 2,
  };
  return m[t];
}

export function stringSpacing(t: BridgeFittingType): number {
  const m: Record<BridgeFittingType, number> = {
    maple_violin_carved: 7, ebony_guitar_saddle: 9, bone_nut_blank: 8, rosewood_mandolin_float: 6, synthetic_student_pre: 5,
  };
  return m[t];
}

export function durability(t: BridgeFittingType): number {
  const m: Record<BridgeFittingType, number> = {
    maple_violin_carved: 6, ebony_guitar_saddle: 9, bone_nut_blank: 10, rosewood_mandolin_float: 7, synthetic_student_pre: 8,
  };
  return m[t];
}

export function fittingCost(t: BridgeFittingType): number {
  const m: Record<BridgeFittingType, number> = {
    maple_violin_carved: 2, ebony_guitar_saddle: 2, bone_nut_blank: 1, rosewood_mandolin_float: 2, synthetic_student_pre: 1,
  };
  return m[t];
}

export function preShaped(t: BridgeFittingType): boolean {
  const m: Record<BridgeFittingType, boolean> = {
    maple_violin_carved: false, ebony_guitar_saddle: false, bone_nut_blank: false, rosewood_mandolin_float: false, synthetic_student_pre: true,
  };
  return m[t];
}

export function needsCarving(t: BridgeFittingType): boolean {
  const m: Record<BridgeFittingType, boolean> = {
    maple_violin_carved: true, ebony_guitar_saddle: true, bone_nut_blank: true, rosewood_mandolin_float: true, synthetic_student_pre: false,
  };
  return m[t];
}

export function woodSpecies(t: BridgeFittingType): string {
  const m: Record<BridgeFittingType, string> = {
    maple_violin_carved: "bosnian_maple_aged",
    ebony_guitar_saddle: "african_ebony_dense",
    bone_nut_blank: "bleached_bone_block",
    rosewood_mandolin_float: "indian_rosewood_float",
    synthetic_student_pre: "molded_plastic_pre",
  };
  return m[t];
}

export function bestUse(t: BridgeFittingType): string {
  const m: Record<BridgeFittingType, string> = {
    maple_violin_carved: "violin_custom_carve",
    ebony_guitar_saddle: "acoustic_guitar_saddle",
    bone_nut_blank: "nut_slot_custom",
    rosewood_mandolin_float: "mandolin_float_bridge",
    synthetic_student_pre: "student_quick_replace",
  };
  return m[t];
}

export function bridgeFittings(): BridgeFittingType[] {
  return ["maple_violin_carved", "ebony_guitar_saddle", "bone_nut_blank", "rosewood_mandolin_float", "synthetic_student_pre"];
}
