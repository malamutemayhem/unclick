// magnetometer-calc - magnetometer sensor types

export type Magnetometer =
  | "hall_effect_switch"
  | "amr_compass_chip"
  | "fluxgate_precision"
  | "gmr_field_sensor"
  | "tmr_high_sensitivity";

const DATA: Record<Magnetometer, {
  sensitivity: number; fieldRange: number; accuracy: number; powerDraw: number;
  cost: number; digital: boolean; forCompass: boolean; sensingMethod: string; bestUse: string;
}> = {
  hall_effect_switch:   { sensitivity: 4, fieldRange: 8, accuracy: 5, powerDraw: 8, cost: 1, digital: false, forCompass: false, sensingMethod: "hall_plate_switch", bestUse: "proximity_door_detect" },
  amr_compass_chip:     { sensitivity: 7, fieldRange: 6, accuracy: 8, powerDraw: 7, cost: 4, digital: true, forCompass: true, sensingMethod: "anisotropic_magneto", bestUse: "digital_compass_head" },
  fluxgate_precision:   { sensitivity: 10, fieldRange: 5, accuracy: 10, powerDraw: 3, cost: 9, digital: true, forCompass: true, sensingMethod: "dual_core_fluxgate", bestUse: "geomagnetic_survey" },
  gmr_field_sensor:     { sensitivity: 8, fieldRange: 7, accuracy: 7, powerDraw: 6, cost: 5, digital: false, forCompass: false, sensingMethod: "giant_magneto_resist", bestUse: "current_field_sense" },
  tmr_high_sensitivity: { sensitivity: 9, fieldRange: 6, accuracy: 9, powerDraw: 7, cost: 7, digital: true, forCompass: true, sensingMethod: "tunnel_magneto_resist", bestUse: "low_field_precision" },
};

const get = (m: Magnetometer) => DATA[m];
export const sensitivity = (m: Magnetometer) => get(m).sensitivity;
export const fieldRange = (m: Magnetometer) => get(m).fieldRange;
export const accuracy = (m: Magnetometer) => get(m).accuracy;
export const powerDraw = (m: Magnetometer) => get(m).powerDraw;
export const magCost = (m: Magnetometer) => get(m).cost;
export const digital = (m: Magnetometer) => get(m).digital;
export const forCompass = (m: Magnetometer) => get(m).forCompass;
export const sensingMethod = (m: Magnetometer) => get(m).sensingMethod;
export const bestUse = (m: Magnetometer) => get(m).bestUse;
export const magnetometers = (): Magnetometer[] => Object.keys(DATA) as Magnetometer[];
