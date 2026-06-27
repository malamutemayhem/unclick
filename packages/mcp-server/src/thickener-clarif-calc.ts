export type ThickenerClarifType =
  | "conventional_gravity_rake"
  | "high_rate_feedwell"
  | "paste_thickener_deep"
  | "lamella_inclined_plate"
  | "deep_cone_ultra_high";

interface ThickenerClarifData {
  underflowDensity: number;
  overflowClarity: number;
  footprint: number;
  flocculant: number;
  tcCost: number;
  highDensity: boolean;
  forTailings: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<ThickenerClarifType, ThickenerClarifData> = {
  conventional_gravity_rake: {
    underflowDensity: 5, overflowClarity: 7, footprint: 4, flocculant: 5, tcCost: 5,
    highDensity: false, forTailings: false,
    mechanism: "slow_rake_gravity_settle_overflow_weir",
    bestUse: "water_treatment_mine_process_standard",
  },
  high_rate_feedwell: {
    underflowDensity: 6, overflowClarity: 8, footprint: 7, flocculant: 7, tcCost: 6,
    highDensity: false, forTailings: false,
    mechanism: "dilution_feedwell_floc_aggregate_fast",
    bestUse: "high_throughput_mineral_process_clarify",
  },
  paste_thickener_deep: {
    underflowDensity: 9, overflowClarity: 6, footprint: 5, flocculant: 8, tcCost: 8,
    highDensity: true, forTailings: true,
    mechanism: "deep_bed_compression_high_torque_rake",
    bestUse: "paste_tailings_disposal_water_recover",
  },
  lamella_inclined_plate: {
    underflowDensity: 4, overflowClarity: 9, footprint: 10, flocculant: 4, tcCost: 4,
    highDensity: false, forTailings: false,
    mechanism: "inclined_plate_enhanced_settle_area",
    bestUse: "compact_clarifier_limited_space_indoor",
  },
  deep_cone_ultra_high: {
    underflowDensity: 10, overflowClarity: 5, footprint: 6, flocculant: 9, tcCost: 10,
    highDensity: true, forTailings: true,
    mechanism: "steep_cone_deep_bed_ultra_high_density",
    bestUse: "dry_stack_tailings_zero_discharge_mine",
  },
};

function get(t: ThickenerClarifType): ThickenerClarifData {
  return DATA[t];
}

export const underflowDensity = (t: ThickenerClarifType) => get(t).underflowDensity;
export const overflowClarity = (t: ThickenerClarifType) => get(t).overflowClarity;
export const footprint = (t: ThickenerClarifType) => get(t).footprint;
export const flocculant = (t: ThickenerClarifType) => get(t).flocculant;
export const tcCost = (t: ThickenerClarifType) => get(t).tcCost;
export const highDensity = (t: ThickenerClarifType) => get(t).highDensity;
export const forTailings = (t: ThickenerClarifType) => get(t).forTailings;
export const mechanism = (t: ThickenerClarifType) => get(t).mechanism;
export const bestUse = (t: ThickenerClarifType) => get(t).bestUse;
export const thickenerClarifTypes = (): ThickenerClarifType[] =>
  Object.keys(DATA) as ThickenerClarifType[];
