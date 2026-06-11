export type HeatTracingType =
  | "self_regulating_elec"
  | "constant_watt_mineral"
  | "skin_effect_pipeline"
  | "steam_tracing_tube"
  | "impedance_heating";

interface HeatTracingData {
  tempMaintain: number;
  energyEff: number;
  installEase: number;
  reliability: number;
  htCost: number;
  electric: boolean;
  forLongPipe: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<HeatTracingType, HeatTracingData> = {
  self_regulating_elec: {
    tempMaintain: 6, energyEff: 9, installEase: 9, reliability: 8, htCost: 6,
    electric: true, forLongPipe: false,
    method: "polymer_pte_core_self_regulating_parallel_bus",
    bestUse: "pipe_freeze_protection_process_temp_maintain",
  },
  constant_watt_mineral: {
    tempMaintain: 9, energyEff: 7, installEase: 6, reliability: 9, htCost: 7,
    electric: true, forLongPipe: false,
    method: "mineral_insulated_cable_constant_watt_series",
    bestUse: "high_temp_maintain_tank_heating_critical_process",
  },
  skin_effect_pipeline: {
    tempMaintain: 8, energyEff: 8, installEase: 4, reliability: 9, htCost: 8,
    electric: true, forLongPipe: true,
    method: "ferromagnetic_tube_skin_effect_ac_induction",
    bestUse: "long_pipeline_10km_plus_viscous_crude_wax",
  },
  steam_tracing_tube: {
    tempMaintain: 8, energyEff: 5, installEase: 7, reliability: 7, htCost: 5,
    electric: false, forLongPipe: false,
    method: "copper_or_steel_tubing_steam_condensate_return",
    bestUse: "refinery_chemical_plant_steam_available_area",
  },
  impedance_heating: {
    tempMaintain: 10, energyEff: 8, installEase: 3, reliability: 8, htCost: 9,
    electric: true, forLongPipe: true,
    method: "pipe_as_conductor_ac_impedance_direct_heat",
    bestUse: "subsea_pipeline_extreme_cold_high_watt_density",
  },
};

function get(t: HeatTracingType): HeatTracingData {
  return DATA[t];
}

export const tempMaintain = (t: HeatTracingType) => get(t).tempMaintain;
export const energyEff = (t: HeatTracingType) => get(t).energyEff;
export const installEase = (t: HeatTracingType) => get(t).installEase;
export const reliability = (t: HeatTracingType) => get(t).reliability;
export const htCost = (t: HeatTracingType) => get(t).htCost;
export const electric = (t: HeatTracingType) => get(t).electric;
export const forLongPipe = (t: HeatTracingType) => get(t).forLongPipe;
export const method = (t: HeatTracingType) => get(t).method;
export const bestUse = (t: HeatTracingType) => get(t).bestUse;
export const heatTracingTypes = (): HeatTracingType[] =>
  Object.keys(DATA) as HeatTracingType[];
