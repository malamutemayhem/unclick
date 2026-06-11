export type SprayDryerType =
  | "co_current_nozzle"
  | "counter_current_tower"
  | "mixed_flow_fountain"
  | "fluidized_spray_agglom"
  | "closed_cycle_solvent";

interface SprayDryerData {
  evapRate: number;
  particleControl: number;
  heatEfficiency: number;
  scalability: number;
  sdCost: number;
  agglomerate: boolean;
  forHeatSens: boolean;
  atomizer: string;
  bestUse: string;
}

const DATA: Record<SprayDryerType, SprayDryerData> = {
  co_current_nozzle: {
    evapRate: 8, particleControl: 7, heatEfficiency: 7, scalability: 9, sdCost: 5,
    agglomerate: false, forHeatSens: true,
    atomizer: "high_pressure_nozzle_co_current_air",
    bestUse: "milk_powder_coffee_instant_food_pharma",
  },
  counter_current_tower: {
    evapRate: 9, particleControl: 6, heatEfficiency: 8, scalability: 8, sdCost: 6,
    agglomerate: false, forHeatSens: false,
    atomizer: "rotary_disc_counter_current_hot_air",
    bestUse: "detergent_powder_ceramic_slurry_dense",
  },
  mixed_flow_fountain: {
    evapRate: 7, particleControl: 8, heatEfficiency: 7, scalability: 7, sdCost: 5,
    agglomerate: true, forHeatSens: true,
    atomizer: "fountain_nozzle_mixed_flow_recirculate",
    bestUse: "dyestuff_pigment_fine_chemical_granule",
  },
  fluidized_spray_agglom: {
    evapRate: 7, particleControl: 10, heatEfficiency: 8, scalability: 7, sdCost: 8,
    agglomerate: true, forHeatSens: true,
    atomizer: "top_spray_fluidized_bed_agglomeration",
    bestUse: "instant_beverage_enzyme_agglomerate_dust",
  },
  closed_cycle_solvent: {
    evapRate: 6, particleControl: 7, heatEfficiency: 6, scalability: 5, sdCost: 9,
    agglomerate: false, forHeatSens: true,
    atomizer: "inert_gas_closed_loop_solvent_recovery",
    bestUse: "pharma_api_organic_solvent_explosive_feed",
  },
};

function get(t: SprayDryerType): SprayDryerData {
  return DATA[t];
}

export const evapRate = (t: SprayDryerType) => get(t).evapRate;
export const particleControl = (t: SprayDryerType) => get(t).particleControl;
export const heatEfficiency = (t: SprayDryerType) => get(t).heatEfficiency;
export const scalability = (t: SprayDryerType) => get(t).scalability;
export const sdCost = (t: SprayDryerType) => get(t).sdCost;
export const agglomerate = (t: SprayDryerType) => get(t).agglomerate;
export const forHeatSens = (t: SprayDryerType) => get(t).forHeatSens;
export const atomizer = (t: SprayDryerType) => get(t).atomizer;
export const bestUse = (t: SprayDryerType) => get(t).bestUse;
export const sprayDryerTypes = (): SprayDryerType[] =>
  Object.keys(DATA) as SprayDryerType[];
