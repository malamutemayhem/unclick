export type ThickenerClarifierType =
  | "conventional_center"
  | "high_rate"
  | "paste_thickener"
  | "lamella_plate"
  | "deep_cone";

interface ThickenerClarifierData {
  underflowDensity: number;
  overflowClarity: number;
  throughput: number;
  footprint: number;
  tcCost: number;
  continuous: boolean;
  forTailings: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<ThickenerClarifierType, ThickenerClarifierData> = {
  conventional_center: {
    underflowDensity: 6, overflowClarity: 7, throughput: 8, footprint: 4, tcCost: 5,
    continuous: true, forTailings: true,
    mechanism: "center_drive_rake_arm_slow_rotation_gravity_settling",
    bestUse: "mineral_tailings_settling_coal_wash_water_clarification",
  },
  high_rate: {
    underflowDensity: 7, overflowClarity: 8, throughput: 10, footprint: 7, tcCost: 7,
    continuous: true, forTailings: true,
    mechanism: "feedwell_dilution_flocculant_injection_high_rise_rate",
    bestUse: "concentrator_plant_high_tonnage_copper_gold_tailings_thicken",
  },
  paste_thickener: {
    underflowDensity: 10, overflowClarity: 8, throughput: 6, footprint: 6, tcCost: 9,
    continuous: true, forTailings: true,
    mechanism: "steep_cone_high_torque_rake_deep_bed_compression_paste",
    bestUse: "paste_tailings_disposal_dry_stack_water_recovery_mine",
  },
  lamella_plate: {
    underflowDensity: 5, overflowClarity: 10, throughput: 7, footprint: 10, tcCost: 6,
    continuous: true, forTailings: false,
    mechanism: "inclined_plate_pack_increased_settling_area_compact_unit",
    bestUse: "water_treatment_plant_effluent_polishing_compact_clarifier",
  },
  deep_cone: {
    underflowDensity: 10, overflowClarity: 8, throughput: 5, footprint: 8, tcCost: 10,
    continuous: true, forTailings: true,
    mechanism: "deep_cone_dewatering_high_compression_zone_maximum_density",
    bestUse: "red_mud_alumina_refinery_ultra_high_density_underflow",
  },
};

function get(t: ThickenerClarifierType): ThickenerClarifierData {
  return DATA[t];
}

export const underflowDensity = (t: ThickenerClarifierType) => get(t).underflowDensity;
export const overflowClarity = (t: ThickenerClarifierType) => get(t).overflowClarity;
export const throughput = (t: ThickenerClarifierType) => get(t).throughput;
export const footprint = (t: ThickenerClarifierType) => get(t).footprint;
export const tcCost = (t: ThickenerClarifierType) => get(t).tcCost;
export const continuous = (t: ThickenerClarifierType) => get(t).continuous;
export const forTailings = (t: ThickenerClarifierType) => get(t).forTailings;
export const mechanism = (t: ThickenerClarifierType) => get(t).mechanism;
export const bestUse = (t: ThickenerClarifierType) => get(t).bestUse;
export const thickenerClarifierTypes = (): ThickenerClarifierType[] =>
  Object.keys(DATA) as ThickenerClarifierType[];
