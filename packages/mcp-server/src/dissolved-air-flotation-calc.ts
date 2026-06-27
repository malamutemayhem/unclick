export type DissolvedAirFlotationType =
  | "full_flow_pressurized"
  | "partial_flow_pressurized"
  | "recycle_flow"
  | "induced_air"
  | "dissolved_nitrogen";

interface DissolvedAirFlotationData {
  removalRate: number;
  throughput: number;
  energyEfficiency: number;
  bubbleSize: number;
  dafCost: number;
  pressurized: boolean;
  forOilRemoval: boolean;
  process: string;
  bestUse: string;
}

const DATA: Record<DissolvedAirFlotationType, DissolvedAirFlotationData> = {
  full_flow_pressurized: {
    removalRate: 8, throughput: 7, energyEfficiency: 5, bubbleSize: 8, dafCost: 7,
    pressurized: true, forOilRemoval: true,
    process: "full_stream_pressurize_saturator_release_valve_micro_bubble",
    bestUse: "small_flow_industrial_pretreatment_high_solids_load_water",
  },
  partial_flow_pressurized: {
    removalRate: 7, throughput: 8, energyEfficiency: 7, bubbleSize: 8, dafCost: 6,
    pressurized: true, forOilRemoval: true,
    process: "split_stream_pressurize_blend_raw_water_reduced_pump_size",
    bestUse: "medium_industrial_plant_moderate_solids_balanced_approach",
  },
  recycle_flow: {
    removalRate: 9, throughput: 9, energyEfficiency: 8, bubbleSize: 9, dafCost: 8,
    pressurized: true, forOilRemoval: true,
    process: "treated_effluent_recycle_pressurize_clean_water_saturation",
    bestUse: "municipal_water_treatment_algae_removal_drinking_water_plant",
  },
  induced_air: {
    removalRate: 6, throughput: 10, energyEfficiency: 9, bubbleSize: 4, dafCost: 4,
    pressurized: false, forOilRemoval: true,
    process: "mechanical_rotor_venturi_air_induction_large_bubble_float",
    bestUse: "oilfield_produced_water_refinery_simple_oil_skim_removal",
  },
  dissolved_nitrogen: {
    removalRate: 9, throughput: 6, energyEfficiency: 6, bubbleSize: 10, dafCost: 10,
    pressurized: true, forOilRemoval: false,
    process: "nitrogen_gas_saturation_inert_atmosphere_oxidation_prevent",
    bestUse: "food_beverage_process_water_oxygen_sensitive_product_treat",
  },
};

function get(t: DissolvedAirFlotationType): DissolvedAirFlotationData {
  return DATA[t];
}

export const removalRate = (t: DissolvedAirFlotationType) => get(t).removalRate;
export const throughput = (t: DissolvedAirFlotationType) => get(t).throughput;
export const energyEfficiency = (t: DissolvedAirFlotationType) => get(t).energyEfficiency;
export const bubbleSize = (t: DissolvedAirFlotationType) => get(t).bubbleSize;
export const dafCost = (t: DissolvedAirFlotationType) => get(t).dafCost;
export const pressurized = (t: DissolvedAirFlotationType) => get(t).pressurized;
export const forOilRemoval = (t: DissolvedAirFlotationType) => get(t).forOilRemoval;
export const process = (t: DissolvedAirFlotationType) => get(t).process;
export const bestUse = (t: DissolvedAirFlotationType) => get(t).bestUse;
export const dissolvedAirFlotationTypes = (): DissolvedAirFlotationType[] =>
  Object.keys(DATA) as DissolvedAirFlotationType[];
