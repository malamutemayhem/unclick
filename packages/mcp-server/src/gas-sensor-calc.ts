export type GasSensor =
  | "mox_metal_oxide"
  | "ndir_infrared"
  | "electrochemical_cell"
  | "pid_photoion"
  | "catalytic_bead";

const DATA: Record<GasSensor, {
  sensitivity: number; selectivity: number; responseTime: number;
  lifetime: number; sensorCost: number; portable: boolean;
  forSafety: boolean; detection: string; bestUse: string;
}> = {
  mox_metal_oxide: {
    sensitivity: 6, selectivity: 3, responseTime: 5,
    lifetime: 7, sensorCost: 2, portable: true,
    forSafety: false, detection: "resistance_change_heated",
    bestUse: "indoor_air_quality_monitor",
  },
  ndir_infrared: {
    sensitivity: 8, selectivity: 9, responseTime: 7,
    lifetime: 10, sensorCost: 6, portable: true,
    forSafety: true, detection: "ir_absorption_dual_beam",
    bestUse: "co2_hvac_demand_vent",
  },
  electrochemical_cell: {
    sensitivity: 9, selectivity: 8, responseTime: 8,
    lifetime: 5, sensorCost: 5, portable: true,
    forSafety: true, detection: "amperometric_3_electrode",
    bestUse: "toxic_gas_personal_alarm",
  },
  pid_photoion: {
    sensitivity: 10, selectivity: 4, responseTime: 10,
    lifetime: 6, sensorCost: 8, portable: true,
    forSafety: true, detection: "uv_photoionization",
    bestUse: "voc_leak_detection",
  },
  catalytic_bead: {
    sensitivity: 5, selectivity: 5, responseTime: 6,
    lifetime: 4, sensorCost: 3, portable: false,
    forSafety: true, detection: "pellistor_wheatstone",
    bestUse: "combustible_gas_lel_alarm",
  },
};

const get = (t: GasSensor) => DATA[t];

export const sensitivity = (t: GasSensor) => get(t).sensitivity;
export const selectivity = (t: GasSensor) => get(t).selectivity;
export const responseTime = (t: GasSensor) => get(t).responseTime;
export const lifetime = (t: GasSensor) => get(t).lifetime;
export const sensorCost = (t: GasSensor) => get(t).sensorCost;
export const portable = (t: GasSensor) => get(t).portable;
export const forSafety = (t: GasSensor) => get(t).forSafety;
export const detection = (t: GasSensor) => get(t).detection;
export const bestUse = (t: GasSensor) => get(t).bestUse;
export const gasSensors = (): GasSensor[] => Object.keys(DATA) as GasSensor[];
