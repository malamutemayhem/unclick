export type SoilMoistureType =
  | "tdr_time_domain_reflect"
  | "fdr_capacitance_probe"
  | "neutron_scatter_depth"
  | "gypsum_block_resistance"
  | "tensiometer_suction_cup";

const DATA: Record<SoilMoistureType, {
  accuracy: number; depth: number; response: number;
  maintenance: number; smCost: number; continuous: boolean;
  forIrrigation: boolean; principle: string; bestUse: string;
}> = {
  tdr_time_domain_reflect: {
    accuracy: 9, depth: 7, response: 9,
    maintenance: 8, smCost: 4, continuous: true,
    forIrrigation: true, principle: "electromagnetic_pulse_travel",
    bestUse: "precision_agriculture_irrigation",
  },
  fdr_capacitance_probe: {
    accuracy: 7, depth: 6, response: 9,
    maintenance: 9, smCost: 2, continuous: true,
    forIrrigation: true, principle: "dielectric_capacitance_freq",
    bestUse: "greenhouse_substrate_monitor",
  },
  neutron_scatter_depth: {
    accuracy: 10, depth: 10, response: 5,
    maintenance: 4, smCost: 5, continuous: false,
    forIrrigation: false, principle: "neutron_thermalization_count",
    bestUse: "research_deep_soil_profile",
  },
  gypsum_block_resistance: {
    accuracy: 5, depth: 5, response: 3,
    maintenance: 3, smCost: 1, continuous: true,
    forIrrigation: true, principle: "electrical_resistance_matrix",
    bestUse: "low_cost_farm_tension_monitor",
  },
  tensiometer_suction_cup: {
    accuracy: 8, depth: 4, response: 6,
    maintenance: 5, smCost: 2, continuous: true,
    forIrrigation: true, principle: "water_tension_ceramic_cup",
    bestUse: "vineyard_soil_water_potential",
  },
};

const get = (t: SoilMoistureType) => DATA[t];

export const accuracy = (t: SoilMoistureType) => get(t).accuracy;
export const depth = (t: SoilMoistureType) => get(t).depth;
export const response = (t: SoilMoistureType) => get(t).response;
export const maintenance = (t: SoilMoistureType) => get(t).maintenance;
export const smCost = (t: SoilMoistureType) => get(t).smCost;
export const continuous = (t: SoilMoistureType) => get(t).continuous;
export const forIrrigation = (t: SoilMoistureType) => get(t).forIrrigation;
export const principle = (t: SoilMoistureType) => get(t).principle;
export const bestUse = (t: SoilMoistureType) => get(t).bestUse;
export const soilMoistureTypes = (): SoilMoistureType[] => Object.keys(DATA) as SoilMoistureType[];
