export type ParalletteType = "low_wooden_gymnastic" | "medium_steel_calisthenics" | "tall_pvc_diy" | "adjustable_height_multi" | "rotating_push_up_handle";

export function handstandControl(t: ParalletteType): number {
  const m: Record<ParalletteType, number> = {
    low_wooden_gymnastic: 10, medium_steel_calisthenics: 8, tall_pvc_diy: 6, adjustable_height_multi: 7, rotating_push_up_handle: 4,
  };
  return m[t];
}

export function pushUpDepth(t: ParalletteType): number {
  const m: Record<ParalletteType, number> = {
    low_wooden_gymnastic: 7, medium_steel_calisthenics: 9, tall_pvc_diy: 8, adjustable_height_multi: 9, rotating_push_up_handle: 8,
  };
  return m[t];
}

export function stability(t: ParalletteType): number {
  const m: Record<ParalletteType, number> = {
    low_wooden_gymnastic: 9, medium_steel_calisthenics: 10, tall_pvc_diy: 5, adjustable_height_multi: 8, rotating_push_up_handle: 7,
  };
  return m[t];
}

export function portability(t: ParalletteType): number {
  const m: Record<ParalletteType, number> = {
    low_wooden_gymnastic: 7, medium_steel_calisthenics: 5, tall_pvc_diy: 8, adjustable_height_multi: 6, rotating_push_up_handle: 10,
  };
  return m[t];
}

export function paralCost(t: ParalletteType): number {
  const m: Record<ParalletteType, number> = {
    low_wooden_gymnastic: 2, medium_steel_calisthenics: 3, tall_pvc_diy: 1, adjustable_height_multi: 3, rotating_push_up_handle: 1,
  };
  return m[t];
}

export function foldable(t: ParalletteType): boolean {
  const m: Record<ParalletteType, boolean> = {
    low_wooden_gymnastic: false, medium_steel_calisthenics: false, tall_pvc_diy: false, adjustable_height_multi: true, rotating_push_up_handle: false,
  };
  return m[t];
}

export function rotatingGrip(t: ParalletteType): boolean {
  const m: Record<ParalletteType, boolean> = {
    low_wooden_gymnastic: false, medium_steel_calisthenics: false, tall_pvc_diy: false, adjustable_height_multi: false, rotating_push_up_handle: true,
  };
  return m[t];
}

export function frameMaterial(t: ParalletteType): string {
  const m: Record<ParalletteType, string> = {
    low_wooden_gymnastic: "hardwood_birch_ash",
    medium_steel_calisthenics: "powder_coat_steel",
    tall_pvc_diy: "schedule_40_pvc",
    adjustable_height_multi: "aluminum_telescoping",
    rotating_push_up_handle: "abs_plastic_bearing",
  };
  return m[t];
}

export function bestMove(t: ParalletteType): string {
  const m: Record<ParalletteType, string> = {
    low_wooden_gymnastic: "l_sit_planche_hold",
    medium_steel_calisthenics: "dip_muscle_up_combo",
    tall_pvc_diy: "elevated_push_up_row",
    adjustable_height_multi: "progressive_skill_train",
    rotating_push_up_handle: "rotational_push_up",
  };
  return m[t];
}

export function parallettes(): ParalletteType[] {
  return ["low_wooden_gymnastic", "medium_steel_calisthenics", "tall_pvc_diy", "adjustable_height_multi", "rotating_push_up_handle"];
}
