export type PulpWasherType =
  | "rotary_drum"
  | "diffusion_washer"
  | "belt_press"
  | "twin_roll"
  | "displacement_press";

interface PulpWasherData {
  washEfficiency: number;
  throughput: number;
  waterUsage: number;
  pulpLoss: number;
  pwCost: number;
  enclosed: boolean;
  forKraft: boolean;
  washerConfig: string;
  bestUse: string;
}

const DATA: Record<PulpWasherType, PulpWasherData> = {
  rotary_drum: {
    washEfficiency: 7, throughput: 8, waterUsage: 6, pulpLoss: 8, pwCost: 5,
    enclosed: false, forKraft: true,
    washerConfig: "rotary_drum_pulp_washer_vacuum_suction_mat_displacement_wash",
    bestUse: "kraft_mill_rotary_drum_washer_reliable_multi_stage_brown_stock",
  },
  diffusion_washer: {
    washEfficiency: 10, throughput: 9, waterUsage: 9, pulpLoss: 9, pwCost: 9,
    enclosed: true, forKraft: true,
    washerConfig: "diffusion_washer_pulp_vertical_tower_counter_current_displace",
    bestUse: "modern_kraft_mill_diffusion_washer_low_dilution_high_efficiency",
  },
  belt_press: {
    washEfficiency: 8, throughput: 8, waterUsage: 7, pulpLoss: 7, pwCost: 6,
    enclosed: false, forKraft: true,
    washerConfig: "belt_press_pulp_washer_twin_belt_squeeze_dewater_wash_compact",
    bestUse: "pulp_mill_belt_press_washer_compact_dewater_moderate_capacity",
  },
  twin_roll: {
    washEfficiency: 9, throughput: 10, waterUsage: 8, pulpLoss: 9, pwCost: 8,
    enclosed: true, forKraft: true,
    washerConfig: "twin_roll_pulp_washer_counter_rotating_press_displace_squeeze",
    bestUse: "high_capacity_kraft_mill_twin_roll_washer_press_displace_wash",
  },
  displacement_press: {
    washEfficiency: 9, throughput: 7, waterUsage: 10, pulpLoss: 10, pwCost: 10,
    enclosed: true, forKraft: false,
    washerConfig: "displacement_press_pulp_washer_hydraulic_press_displace_dewater",
    bestUse: "specialty_pulp_displacement_press_ultra_clean_wash_low_water",
  },
};

function get(t: PulpWasherType): PulpWasherData {
  return DATA[t];
}

export const washEfficiency = (t: PulpWasherType) => get(t).washEfficiency;
export const throughput = (t: PulpWasherType) => get(t).throughput;
export const waterUsage = (t: PulpWasherType) => get(t).waterUsage;
export const pulpLoss = (t: PulpWasherType) => get(t).pulpLoss;
export const pwCost = (t: PulpWasherType) => get(t).pwCost;
export const enclosed = (t: PulpWasherType) => get(t).enclosed;
export const forKraft = (t: PulpWasherType) => get(t).forKraft;
export const washerConfig = (t: PulpWasherType) => get(t).washerConfig;
export const bestUse = (t: PulpWasherType) => get(t).bestUse;
export const pulpWasherTypes = (): PulpWasherType[] =>
  Object.keys(DATA) as PulpWasherType[];
