export type EmissionMonitorType =
  | "cems_extractive_heated"
  | "cems_insitu_cross_stack"
  | "ftir_multigas_analyzer"
  | "ndir_single_gas_ir"
  | "opacity_transmissometer";

const DATA: Record<EmissionMonitorType, {
  accuracy: number; gases: number; response: number;
  maintenance: number; emCost: number; multigas: boolean;
  forCompliance: boolean; detection: string; bestUse: string;
}> = {
  cems_extractive_heated: {
    accuracy: 9, gases: 7, response: 7,
    maintenance: 5, emCost: 5, multigas: true,
    forCompliance: true, detection: "heated_probe_sample_cond",
    bestUse: "power_plant_stack_nox_so2",
  },
  cems_insitu_cross_stack: {
    accuracy: 8, gases: 4, response: 9,
    maintenance: 8, emCost: 4, multigas: false,
    forCompliance: true, detection: "cross_duct_laser_tdlas",
    bestUse: "cement_kiln_co_o2_monitor",
  },
  ftir_multigas_analyzer: {
    accuracy: 10, gases: 10, response: 6,
    maintenance: 4, emCost: 5, multigas: true,
    forCompliance: true, detection: "interferometer_infrared_scan",
    bestUse: "waste_incinerator_hcl_dioxin",
  },
  ndir_single_gas_ir: {
    accuracy: 7, gases: 2, response: 8,
    maintenance: 9, emCost: 2, multigas: false,
    forCompliance: false, detection: "nondispersive_ir_filter_cell",
    bestUse: "boiler_room_co2_leak_detect",
  },
  opacity_transmissometer: {
    accuracy: 6, gases: 1, response: 10,
    maintenance: 7, emCost: 3, multigas: false,
    forCompliance: true, detection: "light_transmit_scatter_measure",
    bestUse: "particulate_opacity_epa_method9",
  },
};

const get = (t: EmissionMonitorType) => DATA[t];

export const accuracy = (t: EmissionMonitorType) => get(t).accuracy;
export const gases = (t: EmissionMonitorType) => get(t).gases;
export const response = (t: EmissionMonitorType) => get(t).response;
export const maintenance = (t: EmissionMonitorType) => get(t).maintenance;
export const emCost = (t: EmissionMonitorType) => get(t).emCost;
export const multigas = (t: EmissionMonitorType) => get(t).multigas;
export const forCompliance = (t: EmissionMonitorType) => get(t).forCompliance;
export const detection = (t: EmissionMonitorType) => get(t).detection;
export const bestUse = (t: EmissionMonitorType) => get(t).bestUse;
export const emissionMonitorTypes = (): EmissionMonitorType[] => Object.keys(DATA) as EmissionMonitorType[];
