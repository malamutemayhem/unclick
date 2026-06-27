export type PressureSensorType =
  | "piezoresistive_mems"
  | "capacitive_diaphragm"
  | "strain_gauge_bridge"
  | "piezoelectric_dynamic"
  | "optical_fiber_bragg";

const DATA: Record<PressureSensorType, {
  accuracy: number; pressRange: number; responseTime: number;
  durability: number; sensorCost: number; digital: boolean;
  forHighPress: boolean; sensingMethod: string; bestUse: string;
}> = {
  piezoresistive_mems: { accuracy: 8, pressRange: 7, responseTime: 8, durability: 7, sensorCost: 3, digital: true, forHighPress: false, sensingMethod: "silicon_strain_mems", bestUse: "industrial_process_ctrl" },
  capacitive_diaphragm: { accuracy: 9, pressRange: 5, responseTime: 7, durability: 8, sensorCost: 5, digital: false, forHighPress: false, sensingMethod: "capacitance_gap_change", bestUse: "low_pressure_vacuum_gauge" },
  strain_gauge_bridge: { accuracy: 7, pressRange: 9, responseTime: 6, durability: 9, sensorCost: 4, digital: false, forHighPress: true, sensingMethod: "wheatstone_bridge_foil", bestUse: "hydraulic_high_pressure" },
  piezoelectric_dynamic: { accuracy: 6, pressRange: 8, responseTime: 10, durability: 6, sensorCost: 7, digital: false, forHighPress: true, sensingMethod: "quartz_charge_output", bestUse: "blast_combustion_dynamic" },
  optical_fiber_bragg: { accuracy: 10, pressRange: 6, responseTime: 9, durability: 10, sensorCost: 9, digital: true, forHighPress: false, sensingMethod: "bragg_wavelength_shift", bestUse: "harsh_emf_immune_sense" },
};

const get = (t: PressureSensorType) => DATA[t];

export const accuracy = (t: PressureSensorType) => get(t).accuracy;
export const pressRange = (t: PressureSensorType) => get(t).pressRange;
export const responseTime = (t: PressureSensorType) => get(t).responseTime;
export const durability = (t: PressureSensorType) => get(t).durability;
export const sensorCost = (t: PressureSensorType) => get(t).sensorCost;
export const digital = (t: PressureSensorType) => get(t).digital;
export const forHighPress = (t: PressureSensorType) => get(t).forHighPress;
export const sensingMethod = (t: PressureSensorType) => get(t).sensingMethod;
export const bestUse = (t: PressureSensorType) => get(t).bestUse;
export const pressureSensors = (): PressureSensorType[] => Object.keys(DATA) as PressureSensorType[];
