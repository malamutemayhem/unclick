export type RibbonBlenderType =
  | "single_ribbon_standard"
  | "double_ribbon_intensive"
  | "paddle_ribbon_hybrid"
  | "continuous_ribbon_flow"
  | "vacuum_ribbon_deaerate";

interface RibbonBlenderData {
  mixQuality: number;
  batchSize: number;
  discharge: number;
  cleanability: number;
  rbCost: number;
  continuous: boolean;
  forPowder: boolean;
  ribbon: string;
  bestUse: string;
}

const DATA: Record<RibbonBlenderType, RibbonBlenderData> = {
  single_ribbon_standard: {
    mixQuality: 7, batchSize: 8, discharge: 7, cleanability: 6, rbCost: 4,
    continuous: false, forPowder: true,
    ribbon: "single_helical_ribbon_outer_spiral",
    bestUse: "dry_powder_blend_food_chemical_bulk",
  },
  double_ribbon_intensive: {
    mixQuality: 9, batchSize: 8, discharge: 8, cleanability: 5, rbCost: 6,
    continuous: false, forPowder: true,
    ribbon: "inner_outer_counter_rotating_ribbon",
    bestUse: "cohesive_powder_intensive_mix_uniform",
  },
  paddle_ribbon_hybrid: {
    mixQuality: 8, batchSize: 7, discharge: 7, cleanability: 7, rbCost: 5,
    continuous: false, forPowder: true,
    ribbon: "ribbon_plus_paddle_dual_action_mix",
    bestUse: "granule_pellet_gentle_mix_no_breakage",
  },
  continuous_ribbon_flow: {
    mixQuality: 6, batchSize: 10, discharge: 10, cleanability: 4, rbCost: 7,
    continuous: true, forPowder: true,
    ribbon: "continuous_feed_weigh_ribbon_throughflow",
    bestUse: "high_volume_continuous_process_feed",
  },
  vacuum_ribbon_deaerate: {
    mixQuality: 9, batchSize: 6, discharge: 6, cleanability: 5, rbCost: 8,
    continuous: false, forPowder: true,
    ribbon: "sealed_vessel_vacuum_deaerate_ribbon",
    bestUse: "oxygen_sensitive_deaerate_pharma_fine",
  },
};

function get(t: RibbonBlenderType): RibbonBlenderData {
  return DATA[t];
}

export const mixQuality = (t: RibbonBlenderType) => get(t).mixQuality;
export const batchSize = (t: RibbonBlenderType) => get(t).batchSize;
export const discharge = (t: RibbonBlenderType) => get(t).discharge;
export const cleanability = (t: RibbonBlenderType) => get(t).cleanability;
export const rbCost = (t: RibbonBlenderType) => get(t).rbCost;
export const continuous = (t: RibbonBlenderType) => get(t).continuous;
export const forPowder = (t: RibbonBlenderType) => get(t).forPowder;
export const ribbon = (t: RibbonBlenderType) => get(t).ribbon;
export const bestUse = (t: RibbonBlenderType) => get(t).bestUse;
export const ribbonBlenderTypes = (): RibbonBlenderType[] =>
  Object.keys(DATA) as RibbonBlenderType[];
