export type PaintType =
  | "latex_acrylic_water_based"
  | "alkyd_oil_modified_solvent"
  | "enamel_hard_gloss_finish"
  | "chalk_matte_distressed"
  | "elastomeric_flexible_crack";

interface PaintData {
  coverage: number;
  durability: number;
  dryTime: number;
  voc: number;
  paCost: number;
  waterBased: boolean;
  forExterior: boolean;
  finish_: string;
  bestUse: string;
}

const DATA: Record<PaintType, PaintData> = {
  latex_acrylic_water_based: {
    coverage: 8, durability: 7, dryTime: 9, voc: 2, paCost: 5,
    waterBased: true, forExterior: true,
    finish_: "matte_eggshell_satin_range",
    bestUse: "interior_exterior_wall_ceiling_trim",
  },
  alkyd_oil_modified_solvent: {
    coverage: 7, durability: 8, dryTime: 3, voc: 8, paCost: 6,
    waterBased: false, forExterior: true,
    finish_: "semi_gloss_high_gloss_flow",
    bestUse: "trim_door_cabinet_high_traffic",
  },
  enamel_hard_gloss_finish: {
    coverage: 6, durability: 9, dryTime: 4, voc: 7, paCost: 7,
    waterBased: false, forExterior: true,
    finish_: "high_gloss_hard_shell_smooth",
    bestUse: "metal_surface_machinery_appliance",
  },
  chalk_matte_distressed: {
    coverage: 9, durability: 4, dryTime: 8, voc: 2, paCost: 8,
    waterBased: true, forExterior: false,
    finish_: "ultra_matte_flat_chalky_texture",
    bestUse: "furniture_refurbish_vintage_craft",
  },
  elastomeric_flexible_crack: {
    coverage: 5, durability: 9, dryTime: 5, voc: 4, paCost: 9,
    waterBased: true, forExterior: true,
    finish_: "thick_film_rubber_like_bridge",
    bestUse: "stucco_masonry_crack_bridge_waterproof",
  },
};

function get(t: PaintType): PaintData {
  return DATA[t];
}

export const coverage = (t: PaintType) => get(t).coverage;
export const durability = (t: PaintType) => get(t).durability;
export const dryTime = (t: PaintType) => get(t).dryTime;
export const voc = (t: PaintType) => get(t).voc;
export const paCost = (t: PaintType) => get(t).paCost;
export const waterBased = (t: PaintType) => get(t).waterBased;
export const forExterior = (t: PaintType) => get(t).forExterior;
export const finish_ = (t: PaintType) => get(t).finish_;
export const bestUse = (t: PaintType) => get(t).bestUse;
export const paintTypes = (): PaintType[] =>
  Object.keys(DATA) as PaintType[];
