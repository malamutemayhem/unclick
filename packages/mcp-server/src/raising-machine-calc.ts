export type RaisingMachineType =
  | "single_action_wire"
  | "double_action_wire"
  | "planetary_roller"
  | "sueding_emerizing"
  | "teasel_natural";

interface RaisingMachineData {
  napDensity: number;
  fabricSpeed: number;
  fiberDamage: number;
  surfaceSoftness: number;
  rmCost: number;
  bidirectional: boolean;
  forKnit: boolean;
  wireConfig: string;
  bestUse: string;
}

const DATA: Record<RaisingMachineType, RaisingMachineData> = {
  single_action_wire: {
    napDensity: 7, fabricSpeed: 8, fiberDamage: 6, surfaceSoftness: 7, rmCost: 4,
    bidirectional: false, forKnit: false,
    wireConfig: "pile_wire_fillet_single_direction_raise_counter_pile_only",
    bestUse: "woven_blanket_flannel_single_side_nap_basic_raising_finish",
  },
  double_action_wire: {
    napDensity: 9, fabricSpeed: 7, fiberDamage: 5, surfaceSoftness: 8, rmCost: 6,
    bidirectional: true, forKnit: false,
    wireConfig: "pile_and_counter_pile_wire_alternate_roller_dense_nap_finish",
    bestUse: "heavy_blanket_overcoat_dense_nap_both_direction_wire_raising",
  },
  planetary_roller: {
    napDensity: 10, fabricSpeed: 6, fiberDamage: 4, surfaceSoftness: 9, rmCost: 8,
    bidirectional: true, forKnit: true,
    wireConfig: "planetary_roller_orbit_main_drum_multi_angle_gentle_raising",
    bestUse: "knit_fleece_velour_plush_deep_nap_soft_hand_multi_pass_raise",
  },
  sueding_emerizing: {
    napDensity: 5, fabricSpeed: 9, fiberDamage: 7, surfaceSoftness: 10, rmCost: 5,
    bidirectional: false, forKnit: true,
    wireConfig: "abrasive_coated_roller_sand_surface_fiber_peach_skin_effect",
    bestUse: "microfiber_peach_skin_suede_effect_lightweight_synthetic_sand",
  },
  teasel_natural: {
    napDensity: 6, fabricSpeed: 5, fiberDamage: 8, surfaceSoftness: 6, rmCost: 3,
    bidirectional: false, forKnit: false,
    wireConfig: "natural_teasel_thistle_head_gentle_fiber_lift_traditional",
    bestUse: "wool_cashmere_luxury_traditional_gentle_fiber_raising_craft",
  },
};

function get(t: RaisingMachineType): RaisingMachineData {
  return DATA[t];
}

export const napDensity = (t: RaisingMachineType) => get(t).napDensity;
export const fabricSpeed = (t: RaisingMachineType) => get(t).fabricSpeed;
export const fiberDamage = (t: RaisingMachineType) => get(t).fiberDamage;
export const surfaceSoftness = (t: RaisingMachineType) => get(t).surfaceSoftness;
export const rmCost = (t: RaisingMachineType) => get(t).rmCost;
export const bidirectional = (t: RaisingMachineType) => get(t).bidirectional;
export const forKnit = (t: RaisingMachineType) => get(t).forKnit;
export const wireConfig = (t: RaisingMachineType) => get(t).wireConfig;
export const bestUse = (t: RaisingMachineType) => get(t).bestUse;
export const raisingMachineTypes = (): RaisingMachineType[] =>
  Object.keys(DATA) as RaisingMachineType[];
