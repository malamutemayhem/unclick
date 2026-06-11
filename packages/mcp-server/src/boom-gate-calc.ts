export type BoomGateType =
  | "manual_counterweight_arm"
  | "electromechanical_standard"
  | "hydraulic_high_speed"
  | "folding_articulated_arm"
  | "crash_rated_k12";

interface BoomGateData {
  speed: number;
  security: number;
  durability: number;
  maintenance: number;
  bgCost: number;
  automatic: boolean;
  forHighSecurity: boolean;
  actuation: string;
  bestUse: string;
}

const DATA: Record<BoomGateType, BoomGateData> = {
  manual_counterweight_arm: {
    speed: 3, security: 4, durability: 8, maintenance: 9, bgCost: 2,
    automatic: false, forHighSecurity: false,
    actuation: "manual_push_counterweight_pivot",
    bestUse: "low_traffic_rural_entrance",
  },
  electromechanical_standard: {
    speed: 7, security: 6, durability: 7, maintenance: 7, bgCost: 5,
    automatic: true, forHighSecurity: false,
    actuation: "dc_motor_worm_gear_arm",
    bestUse: "parking_lot_commercial_entry",
  },
  hydraulic_high_speed: {
    speed: 10, security: 7, durability: 9, maintenance: 6, bgCost: 7,
    automatic: true, forHighSecurity: false,
    actuation: "hydraulic_cylinder_rapid_cycle",
    bestUse: "toll_plaza_high_volume_lane",
  },
  folding_articulated_arm: {
    speed: 8, security: 5, durability: 6, maintenance: 6, bgCost: 6,
    automatic: true, forHighSecurity: false,
    actuation: "articulated_fold_low_clearance",
    bestUse: "parking_garage_low_ceiling",
  },
  crash_rated_k12: {
    speed: 6, security: 10, durability: 10, maintenance: 5, bgCost: 10,
    automatic: true, forHighSecurity: true,
    actuation: "crash_beam_hydraulic_bollard",
    bestUse: "embassy_military_critical_infra",
  },
};

function get(t: BoomGateType): BoomGateData {
  return DATA[t];
}

export const speed = (t: BoomGateType) => get(t).speed;
export const security = (t: BoomGateType) => get(t).security;
export const durability = (t: BoomGateType) => get(t).durability;
export const maintenance = (t: BoomGateType) => get(t).maintenance;
export const bgCost = (t: BoomGateType) => get(t).bgCost;
export const automatic = (t: BoomGateType) => get(t).automatic;
export const forHighSecurity = (t: BoomGateType) => get(t).forHighSecurity;
export const actuation = (t: BoomGateType) => get(t).actuation;
export const bestUse = (t: BoomGateType) => get(t).bestUse;
export const boomGateTypes = (): BoomGateType[] =>
  Object.keys(DATA) as BoomGateType[];
