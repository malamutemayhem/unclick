export type HeatRecoveryVentilatorType =
  | "plate_heat_exchanger"
  | "rotary_wheel"
  | "heat_pipe"
  | "run_around_coil"
  | "membrane_erv";

interface HeatRecoveryVentilatorData {
  efficiency: number;
  moistureRecovery: number;
  pressureDrop: number;
  crossContamination: number;
  hrvCost: number;
  latentRecovery: boolean;
  forHumidClimate: boolean;
  exchanger: string;
  bestUse: string;
}

const DATA: Record<HeatRecoveryVentilatorType, HeatRecoveryVentilatorData> = {
  plate_heat_exchanger: {
    efficiency: 8, moistureRecovery: 3, pressureDrop: 6, crossContamination: 9, hrvCost: 5,
    latentRecovery: false, forHumidClimate: false,
    exchanger: "counter_flow_aluminum_plate_sensible_heat_only_no_mixing",
    bestUse: "commercial_office_school_dry_climate_sensible_recovery",
  },
  rotary_wheel: {
    efficiency: 9, moistureRecovery: 9, pressureDrop: 8, crossContamination: 5, hrvCost: 7,
    latentRecovery: true, forHumidClimate: true,
    exchanger: "rotating_desiccant_wheel_sensible_and_latent_recovery",
    bestUse: "hospital_pool_humid_climate_total_energy_recovery_large",
  },
  heat_pipe: {
    efficiency: 6, moistureRecovery: 2, pressureDrop: 7, crossContamination: 10, hrvCost: 6,
    latentRecovery: false, forHumidClimate: false,
    exchanger: "sealed_refrigerant_pipe_passive_evaporate_condense_loop",
    bestUse: "laboratory_fume_hood_exhaust_zero_cross_contamination",
  },
  run_around_coil: {
    efficiency: 5, moistureRecovery: 2, pressureDrop: 7, crossContamination: 10, hrvCost: 8,
    latentRecovery: false, forHumidClimate: false,
    exchanger: "glycol_coil_loop_pump_between_remote_supply_and_exhaust",
    bestUse: "remote_duct_separation_hospital_isolation_industrial_exhaust",
  },
  membrane_erv: {
    efficiency: 8, moistureRecovery: 8, pressureDrop: 6, crossContamination: 8, hrvCost: 6,
    latentRecovery: true, forHumidClimate: true,
    exchanger: "polymer_membrane_core_selective_moisture_transfer_no_moving",
    bestUse: "residential_small_commercial_humid_climate_balanced_ventilation",
  },
};

function get(t: HeatRecoveryVentilatorType): HeatRecoveryVentilatorData {
  return DATA[t];
}

export const efficiency = (t: HeatRecoveryVentilatorType) => get(t).efficiency;
export const moistureRecovery = (t: HeatRecoveryVentilatorType) => get(t).moistureRecovery;
export const pressureDrop = (t: HeatRecoveryVentilatorType) => get(t).pressureDrop;
export const crossContamination = (t: HeatRecoveryVentilatorType) => get(t).crossContamination;
export const hrvCost = (t: HeatRecoveryVentilatorType) => get(t).hrvCost;
export const latentRecovery = (t: HeatRecoveryVentilatorType) => get(t).latentRecovery;
export const forHumidClimate = (t: HeatRecoveryVentilatorType) => get(t).forHumidClimate;
export const exchanger = (t: HeatRecoveryVentilatorType) => get(t).exchanger;
export const bestUse = (t: HeatRecoveryVentilatorType) => get(t).bestUse;
export const heatRecoveryVentilatorTypes = (): HeatRecoveryVentilatorType[] =>
  Object.keys(DATA) as HeatRecoveryVentilatorType[];
