export type FluidBedDryerType =
  | "batch_vertical_standard"
  | "continuous_horizontal"
  | "vibrating_fluid_bed"
  | "spray_fluid_bed_granule"
  | "pulsed_fluid_bed";

interface FluidBedDryerData {
  dryingRate: number;
  uniformity: number;
  gentleness: number;
  scaleUp: number;
  fbCost: number;
  continuous: boolean;
  forGranulation: boolean;
  airflow: string;
  bestUse: string;
}

const DATA: Record<FluidBedDryerType, FluidBedDryerData> = {
  batch_vertical_standard: {
    dryingRate: 7, uniformity: 8, gentleness: 7, scaleUp: 7, fbCost: 4,
    continuous: false, forGranulation: false,
    airflow: "vertical_upflow_air_through_perforated_plate",
    bestUse: "pharmaceutical_batch_powder_granule_drying",
  },
  continuous_horizontal: {
    dryingRate: 9, uniformity: 8, gentleness: 6, scaleUp: 9, fbCost: 7,
    continuous: true, forGranulation: false,
    airflow: "horizontal_plug_flow_multi_zone_temperature",
    bestUse: "chemical_mineral_fertilizer_high_tonnage_dry",
  },
  vibrating_fluid_bed: {
    dryingRate: 8, uniformity: 9, gentleness: 9, scaleUp: 8, fbCost: 6,
    continuous: true, forGranulation: false,
    airflow: "vibration_assisted_lower_air_velocity_gentle",
    bestUse: "food_dairy_sugar_fragile_crystal_gentle_dry",
  },
  spray_fluid_bed_granule: {
    dryingRate: 7, uniformity: 9, gentleness: 7, scaleUp: 7, fbCost: 8,
    continuous: false, forGranulation: true,
    airflow: "top_spray_bottom_spray_wurster_coating_layer",
    bestUse: "pharma_granulation_coating_instant_powder",
  },
  pulsed_fluid_bed: {
    dryingRate: 8, uniformity: 10, gentleness: 10, scaleUp: 6, fbCost: 7,
    continuous: true, forGranulation: false,
    airflow: "pulsed_air_intermittent_low_velocity_segmented",
    bestUse: "heat_sensitive_biomass_enzyme_delicate_product",
  },
};

function get(t: FluidBedDryerType): FluidBedDryerData {
  return DATA[t];
}

export const dryingRate = (t: FluidBedDryerType) => get(t).dryingRate;
export const uniformity = (t: FluidBedDryerType) => get(t).uniformity;
export const gentleness = (t: FluidBedDryerType) => get(t).gentleness;
export const scaleUp = (t: FluidBedDryerType) => get(t).scaleUp;
export const fbCost = (t: FluidBedDryerType) => get(t).fbCost;
export const continuous = (t: FluidBedDryerType) => get(t).continuous;
export const forGranulation = (t: FluidBedDryerType) => get(t).forGranulation;
export const airflow = (t: FluidBedDryerType) => get(t).airflow;
export const bestUse = (t: FluidBedDryerType) => get(t).bestUse;
export const fluidBedDryerTypes = (): FluidBedDryerType[] =>
  Object.keys(DATA) as FluidBedDryerType[];
