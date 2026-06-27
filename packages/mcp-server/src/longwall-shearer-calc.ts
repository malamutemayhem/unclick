export type LongwallShearerType =
  | "double_drum"
  | "single_drum"
  | "ranging_arm"
  | "plow_system"
  | "thin_seam";

interface LongwallShearerData {
  speed: number;
  cuttingHeight: number;
  productivity: number;
  automation: number;
  lsCost: number;
  selfAdvancing: boolean;
  forThickSeam: boolean;
  cutting: string;
  bestUse: string;
}

const DATA: Record<LongwallShearerType, LongwallShearerData> = {
  double_drum: {
    speed: 9, cuttingHeight: 9, productivity: 10, automation: 9, lsCost: 10,
    selfAdvancing: true, forThickSeam: true,
    cutting: "two_rotating_drums_top_and_bottom_full_web_bi_directional",
    bestUse: "high_production_longwall_coal_thick_seam_full_extraction",
  },
  single_drum: {
    speed: 7, cuttingHeight: 7, productivity: 7, automation: 7, lsCost: 7,
    selfAdvancing: true, forThickSeam: false,
    cutting: "single_drum_ranging_arm_one_pass_sumping_shearing_cycle",
    bestUse: "medium_seam_longwall_moderate_production_coal_mine",
  },
  ranging_arm: {
    speed: 8, cuttingHeight: 10, productivity: 9, automation: 8, lsCost: 9,
    selfAdvancing: true, forThickSeam: true,
    cutting: "extended_ranging_arm_variable_height_cut_thick_seam_adapt",
    bestUse: "variable_seam_height_undulating_roof_floor_adaptive_cut",
  },
  plow_system: {
    speed: 10, cuttingHeight: 4, productivity: 8, automation: 10, lsCost: 8,
    selfAdvancing: true, forThickSeam: false,
    cutting: "chain_drawn_plow_blade_shear_thin_slice_high_speed_pass",
    bestUse: "thin_to_medium_seam_soft_coal_high_speed_automated_plow",
  },
  thin_seam: {
    speed: 6, cuttingHeight: 3, productivity: 5, automation: 7, lsCost: 6,
    selfAdvancing: true, forThickSeam: false,
    cutting: "low_profile_shearer_compact_drum_restricted_height_seam",
    bestUse: "thin_seam_under_1m_coal_reserve_recovery_low_profile",
  },
};

function get(t: LongwallShearerType): LongwallShearerData {
  return DATA[t];
}

export const speed = (t: LongwallShearerType) => get(t).speed;
export const cuttingHeight = (t: LongwallShearerType) => get(t).cuttingHeight;
export const productivity = (t: LongwallShearerType) => get(t).productivity;
export const automation = (t: LongwallShearerType) => get(t).automation;
export const lsCost = (t: LongwallShearerType) => get(t).lsCost;
export const selfAdvancing = (t: LongwallShearerType) => get(t).selfAdvancing;
export const forThickSeam = (t: LongwallShearerType) => get(t).forThickSeam;
export const cutting = (t: LongwallShearerType) => get(t).cutting;
export const bestUse = (t: LongwallShearerType) => get(t).bestUse;
export const longwallShearerTypes = (): LongwallShearerType[] =>
  Object.keys(DATA) as LongwallShearerType[];
