export type MemsPressure =
  | "piezoresistive_diaphragm"
  | "capacitive_membrane"
  | "resonant_silicon"
  | "pirani_vacuum"
  | "barometric_altimeter";

const DATA: Record<MemsPressure, {
  accuracy: number; range: number; tempStability: number;
  responseTime: number; presCost: number; differential: boolean;
  forMedical: boolean; sensing: string; bestUse: string;
}> = {
  piezoresistive_diaphragm: {
    accuracy: 7, range: 8, tempStability: 6,
    responseTime: 8, presCost: 3, differential: true,
    forMedical: true, sensing: "wheatstone_bridge_strain",
    bestUse: "industrial_process_control",
  },
  capacitive_membrane: {
    accuracy: 9, range: 6, tempStability: 8,
    responseTime: 7, presCost: 5, differential: true,
    forMedical: true, sensing: "gap_change_parallel_plate",
    bestUse: "ventilator_flow_sensor",
  },
  resonant_silicon: {
    accuracy: 10, range: 7, tempStability: 10,
    responseTime: 5, presCost: 8, differential: false,
    forMedical: false, sensing: "frequency_shift_beam",
    bestUse: "metrology_reference_std",
  },
  pirani_vacuum: {
    accuracy: 5, range: 9, tempStability: 4,
    responseTime: 4, presCost: 4, differential: false,
    forMedical: false, sensing: "thermal_conductivity_gas",
    bestUse: "vacuum_chamber_monitor",
  },
  barometric_altimeter: {
    accuracy: 8, range: 4, tempStability: 7,
    responseTime: 9, presCost: 2, differential: false,
    forMedical: false, sensing: "absolute_membrane_mems",
    bestUse: "phone_floor_detection",
  },
};

const get = (t: MemsPressure) => DATA[t];

export const accuracy = (t: MemsPressure) => get(t).accuracy;
export const range = (t: MemsPressure) => get(t).range;
export const tempStability = (t: MemsPressure) => get(t).tempStability;
export const responseTime = (t: MemsPressure) => get(t).responseTime;
export const presCost = (t: MemsPressure) => get(t).presCost;
export const differential = (t: MemsPressure) => get(t).differential;
export const forMedical = (t: MemsPressure) => get(t).forMedical;
export const sensing = (t: MemsPressure) => get(t).sensing;
export const bestUse = (t: MemsPressure) => get(t).bestUse;
export const memsPressures = (): MemsPressure[] => Object.keys(DATA) as MemsPressure[];
