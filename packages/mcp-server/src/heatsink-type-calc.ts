export type HeatsinkType =
  | "extruded_aluminum"
  | "skived_copper"
  | "bonded_fin_stack"
  | "vapor_chamber"
  | "heat_pipe_tower";

const DATA: Record<HeatsinkType, {
  thermalRes: number; airflow: number; weight: number;
  formFactor: number; sinkCost: number; active: boolean;
  forDatacenter: boolean; finType: string; bestUse: string;
}> = {
  extruded_aluminum: {
    thermalRes: 4, airflow: 5, weight: 3,
    formFactor: 6, sinkCost: 2, active: false,
    forDatacenter: false, finType: "straight_extrusion",
    bestUse: "low_power_vrm_sink",
  },
  skived_copper: {
    thermalRes: 7, airflow: 8, weight: 6,
    formFactor: 5, sinkCost: 6, active: false,
    forDatacenter: true, finType: "thin_skived_copper",
    bestUse: "1u_server_cpu_cooler",
  },
  bonded_fin_stack: {
    thermalRes: 8, airflow: 7, weight: 7,
    formFactor: 4, sinkCost: 7, active: false,
    forDatacenter: true, finType: "epoxy_bonded_plate",
    bestUse: "igbt_forced_air_cool",
  },
  vapor_chamber: {
    thermalRes: 9, airflow: 6, weight: 5,
    formFactor: 8, sinkCost: 8, active: false,
    forDatacenter: false, finType: "flat_2phase_spread",
    bestUse: "gpu_reference_cooler",
  },
  heat_pipe_tower: {
    thermalRes: 10, airflow: 9, weight: 8,
    formFactor: 3, sinkCost: 5, active: true,
    forDatacenter: false, finType: "sintered_wick_tower",
    bestUse: "desktop_cpu_air_tower",
  },
};

const get = (t: HeatsinkType) => DATA[t];

export const thermalRes = (t: HeatsinkType) => get(t).thermalRes;
export const airflow = (t: HeatsinkType) => get(t).airflow;
export const weight = (t: HeatsinkType) => get(t).weight;
export const formFactor = (t: HeatsinkType) => get(t).formFactor;
export const sinkCost = (t: HeatsinkType) => get(t).sinkCost;
export const active = (t: HeatsinkType) => get(t).active;
export const forDatacenter = (t: HeatsinkType) => get(t).forDatacenter;
export const finType = (t: HeatsinkType) => get(t).finType;
export const bestUse = (t: HeatsinkType) => get(t).bestUse;
export const heatsinkTypes = (): HeatsinkType[] => Object.keys(DATA) as HeatsinkType[];
