export type RibbonBlendType =
  | "double_ribbon_horizontal"
  | "single_ribbon_light"
  | "paddle_ribbon_hybrid"
  | "continuous_ribbon_flow"
  | "vacuum_ribbon_degas";

interface RibbonBlendData {
  uniformity: number;
  throughput: number;
  gentleness: number;
  fillLevel: number;
  rbCost: number;
  continuous: boolean;
  forPowder: boolean;
  agitator: string;
  bestUse: string;
}

const DATA: Record<RibbonBlendType, RibbonBlendData> = {
  double_ribbon_horizontal: {
    uniformity: 9, throughput: 9, gentleness: 6, fillLevel: 8, rbCost: 6,
    continuous: false, forPowder: true,
    agitator: "inner_outer_ribbon_counter_spiral",
    bestUse: "dry_powder_chemical_food_batch",
  },
  single_ribbon_light: {
    uniformity: 7, throughput: 7, gentleness: 7, fillLevel: 7, rbCost: 4,
    continuous: false, forPowder: true,
    agitator: "single_helical_ribbon_trough_mix",
    bestUse: "light_duty_animal_feed_fertilizer",
  },
  paddle_ribbon_hybrid: {
    uniformity: 9, throughput: 8, gentleness: 5, fillLevel: 9, rbCost: 7,
    continuous: false, forPowder: true,
    agitator: "ribbon_paddle_chopper_intensive",
    bestUse: "cohesive_powder_liquid_addition_mix",
  },
  continuous_ribbon_flow: {
    uniformity: 8, throughput: 10, gentleness: 6, fillLevel: 6, rbCost: 8,
    continuous: true, forPowder: true,
    agitator: "ribbon_screw_weigh_belt_continuous",
    bestUse: "continuous_process_steady_state_mix",
  },
  vacuum_ribbon_degas: {
    uniformity: 9, throughput: 6, gentleness: 8, fillLevel: 7, rbCost: 9,
    continuous: false, forPowder: false,
    agitator: "ribbon_vacuum_jacket_sealed_vessel",
    bestUse: "paste_adhesive_degas_solvent_recov",
  },
};

function get(t: RibbonBlendType): RibbonBlendData {
  return DATA[t];
}

export const uniformity = (t: RibbonBlendType) => get(t).uniformity;
export const throughput = (t: RibbonBlendType) => get(t).throughput;
export const gentleness = (t: RibbonBlendType) => get(t).gentleness;
export const fillLevel = (t: RibbonBlendType) => get(t).fillLevel;
export const rbCost = (t: RibbonBlendType) => get(t).rbCost;
export const continuous = (t: RibbonBlendType) => get(t).continuous;
export const forPowder = (t: RibbonBlendType) => get(t).forPowder;
export const agitator = (t: RibbonBlendType) => get(t).agitator;
export const bestUse = (t: RibbonBlendType) => get(t).bestUse;
export const ribbonBlendTypes = (): RibbonBlendType[] =>
  Object.keys(DATA) as RibbonBlendType[];
