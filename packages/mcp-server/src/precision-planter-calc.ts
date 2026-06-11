export type PrecisionPlanterType =
  | "vacuum_metering"
  | "finger_pickup"
  | "air_seed_delivery"
  | "belt_metering"
  | "electric_drive";

interface PrecisionPlanterData {
  seedAccuracy: number;
  plantingSpeed: number;
  seedSpacing: number;
  depthControl: number;
  ppCost: number;
  variableRate: boolean;
  forSmallSeed: boolean;
  meteringConfig: string;
  bestUse: string;
}

const DATA: Record<PrecisionPlanterType, PrecisionPlanterData> = {
  vacuum_metering: {
    seedAccuracy: 9, plantingSpeed: 8, seedSpacing: 9, depthControl: 8, ppCost: 7,
    variableRate: false, forSmallSeed: false,
    meteringConfig: "vacuum_disc_seed_singulation_negative_pressure_precise_drop",
    bestUse: "corn_soybean_sunflower_row_crop_precision_vacuum_singulation",
  },
  finger_pickup: {
    seedAccuracy: 7, plantingSpeed: 7, seedSpacing: 7, depthControl: 7, ppCost: 4,
    variableRate: false, forSmallSeed: false,
    meteringConfig: "mechanical_finger_pickup_drum_seed_select_gravity_drop_tube",
    bestUse: "corn_planting_budget_planter_mechanical_singulation_standard",
  },
  air_seed_delivery: {
    seedAccuracy: 8, plantingSpeed: 10, seedSpacing: 7, depthControl: 7, ppCost: 8,
    variableRate: true, forSmallSeed: true,
    meteringConfig: "central_metering_air_distribution_manifold_split_seed_rows",
    bestUse: "canola_wheat_small_grain_air_seeder_wide_implement_coverage",
  },
  belt_metering: {
    seedAccuracy: 10, plantingSpeed: 9, seedSpacing: 10, depthControl: 9, ppCost: 9,
    variableRate: true, forSmallSeed: false,
    meteringConfig: "precision_belt_metering_individual_seed_pocket_electric_motor",
    bestUse: "premium_corn_soybean_high_speed_planting_belt_singulation_top",
  },
  electric_drive: {
    seedAccuracy: 10, plantingSpeed: 9, seedSpacing: 10, depthControl: 10, ppCost: 10,
    variableRate: true, forSmallSeed: false,
    meteringConfig: "individual_row_electric_motor_drive_variable_rate_gps_section",
    bestUse: "variable_rate_prescription_planting_gps_section_control_smart",
  },
};

function get(t: PrecisionPlanterType): PrecisionPlanterData {
  return DATA[t];
}

export const seedAccuracy = (t: PrecisionPlanterType) => get(t).seedAccuracy;
export const plantingSpeed = (t: PrecisionPlanterType) => get(t).plantingSpeed;
export const seedSpacing = (t: PrecisionPlanterType) => get(t).seedSpacing;
export const depthControl = (t: PrecisionPlanterType) => get(t).depthControl;
export const ppCost = (t: PrecisionPlanterType) => get(t).ppCost;
export const variableRate = (t: PrecisionPlanterType) => get(t).variableRate;
export const forSmallSeed = (t: PrecisionPlanterType) => get(t).forSmallSeed;
export const meteringConfig = (t: PrecisionPlanterType) => get(t).meteringConfig;
export const bestUse = (t: PrecisionPlanterType) => get(t).bestUse;
export const precisionPlanterTypes = (): PrecisionPlanterType[] =>
  Object.keys(DATA) as PrecisionPlanterType[];
