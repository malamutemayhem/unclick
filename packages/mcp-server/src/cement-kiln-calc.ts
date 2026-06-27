export type CementKilnType =
  | "wet_process"
  | "dry_process"
  | "semi_dry"
  | "precalciner"
  | "shaft_kiln";

interface CementKilnData {
  clinkerQuality: number;
  throughput: number;
  fuelEfficiency: number;
  emissionControl: number;
  ckCost: number;
  continuous: boolean;
  forPortland: boolean;
  kilnConfig: string;
  bestUse: string;
}

const DATA: Record<CementKilnType, CementKilnData> = {
  wet_process: {
    clinkerQuality: 9, throughput: 7, fuelEfficiency: 4, emissionControl: 5, ckCost: 6,
    continuous: true, forPortland: true,
    kilnConfig: "wet_process_cement_kiln_slurry_feed_long_rotary_high_fuel_use",
    bestUse: "older_cement_plant_wet_kiln_high_moisture_raw_material_reliable",
  },
  dry_process: {
    clinkerQuality: 9, throughput: 10, fuelEfficiency: 9, emissionControl: 8, ckCost: 9,
    continuous: true, forPortland: true,
    kilnConfig: "dry_process_cement_kiln_preheater_tower_short_rotary_efficient",
    bestUse: "modern_cement_plant_dry_kiln_preheater_energy_efficient_standard",
  },
  semi_dry: {
    clinkerQuality: 8, throughput: 7, fuelEfficiency: 7, emissionControl: 7, ckCost: 7,
    continuous: true, forPortland: true,
    kilnConfig: "semi_dry_cement_kiln_lepol_grate_nodule_preheater_moderate",
    bestUse: "medium_cement_plant_semi_dry_kiln_moderate_moisture_raw_feed",
  },
  precalciner: {
    clinkerQuality: 10, throughput: 10, fuelEfficiency: 10, emissionControl: 9, ckCost: 10,
    continuous: true, forPortland: true,
    kilnConfig: "precalciner_cement_kiln_separate_calciner_vessel_dual_combustion",
    bestUse: "large_cement_plant_precalciner_kiln_highest_capacity_efficient",
  },
  shaft_kiln: {
    clinkerQuality: 6, throughput: 4, fuelEfficiency: 6, emissionControl: 4, ckCost: 3,
    continuous: false, forPortland: false,
    kilnConfig: "shaft_kiln_cement_vertical_batch_gravity_feed_small_scale",
    bestUse: "small_rural_cement_shaft_kiln_low_capital_small_batch_simple",
  },
};

function get(t: CementKilnType): CementKilnData {
  return DATA[t];
}

export const clinkerQuality = (t: CementKilnType) => get(t).clinkerQuality;
export const throughput = (t: CementKilnType) => get(t).throughput;
export const fuelEfficiency = (t: CementKilnType) => get(t).fuelEfficiency;
export const emissionControl = (t: CementKilnType) => get(t).emissionControl;
export const ckCost = (t: CementKilnType) => get(t).ckCost;
export const continuous = (t: CementKilnType) => get(t).continuous;
export const forPortland = (t: CementKilnType) => get(t).forPortland;
export const kilnConfig = (t: CementKilnType) => get(t).kilnConfig;
export const bestUse = (t: CementKilnType) => get(t).bestUse;
export const cementKilnTypes = (): CementKilnType[] =>
  Object.keys(DATA) as CementKilnType[];
