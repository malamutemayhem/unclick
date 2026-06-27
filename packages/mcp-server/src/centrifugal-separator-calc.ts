export type CentrifugalSeparatorType =
  | "decanter_scroll"
  | "disc_stack"
  | "tubular_bowl"
  | "basket_peeler"
  | "hydrocyclone";

interface CentrifugalSeparatorData {
  separationForce: number;
  throughput: number;
  solidsDryness: number;
  clarityOutput: number;
  csCost: number;
  continuous: boolean;
  forLiquidLiquid: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<CentrifugalSeparatorType, CentrifugalSeparatorData> = {
  decanter_scroll: {
    separationForce: 7, throughput: 9, solidsDryness: 8, clarityOutput: 7, csCost: 7,
    continuous: true, forLiquidLiquid: false,
    mechanism: "horizontal_bowl_scroll_conveyor_differential_speed_solids",
    bestUse: "wastewater_sludge_dewatering_food_process_oil_separation",
  },
  disc_stack: {
    separationForce: 10, throughput: 8, solidsDryness: 5, clarityOutput: 10, csCost: 9,
    continuous: true, forLiquidLiquid: true,
    mechanism: "vertical_disc_stack_high_g_force_thin_layer_separation",
    bestUse: "dairy_beverage_clarification_oil_water_fuel_purification",
  },
  tubular_bowl: {
    separationForce: 10, throughput: 4, solidsDryness: 6, clarityOutput: 10, csCost: 6,
    continuous: false, forLiquidLiquid: true,
    mechanism: "high_speed_tubular_bowl_batch_manual_clean_ultra_fine",
    bestUse: "pharmaceutical_biotech_cell_harvest_vaccine_blood_plasma",
  },
  basket_peeler: {
    separationForce: 6, throughput: 6, solidsDryness: 10, clarityOutput: 6, csCost: 8,
    continuous: false, forLiquidLiquid: false,
    mechanism: "perforated_basket_filter_media_peeler_knife_cake_discharge",
    bestUse: "chemical_crystal_salt_sugar_starch_solid_cake_filtration",
  },
  hydrocyclone: {
    separationForce: 5, throughput: 10, solidsDryness: 4, clarityOutput: 5, csCost: 3,
    continuous: true, forLiquidLiquid: false,
    mechanism: "conical_vortex_no_moving_parts_pressure_driven_classifier",
    bestUse: "mining_slurry_classification_sand_removal_pre_treatment",
  },
};

function get(t: CentrifugalSeparatorType): CentrifugalSeparatorData {
  return DATA[t];
}

export const separationForce = (t: CentrifugalSeparatorType) => get(t).separationForce;
export const throughput = (t: CentrifugalSeparatorType) => get(t).throughput;
export const solidsDryness = (t: CentrifugalSeparatorType) => get(t).solidsDryness;
export const clarityOutput = (t: CentrifugalSeparatorType) => get(t).clarityOutput;
export const csCost = (t: CentrifugalSeparatorType) => get(t).csCost;
export const continuous = (t: CentrifugalSeparatorType) => get(t).continuous;
export const forLiquidLiquid = (t: CentrifugalSeparatorType) => get(t).forLiquidLiquid;
export const mechanism = (t: CentrifugalSeparatorType) => get(t).mechanism;
export const bestUse = (t: CentrifugalSeparatorType) => get(t).bestUse;
export const centrifugalSeparatorTypes = (): CentrifugalSeparatorType[] =>
  Object.keys(DATA) as CentrifugalSeparatorType[];
