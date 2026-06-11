export type SurgeProtectType =
  | "mov_metal_oxide"
  | "gas_discharge_tube"
  | "tvs_silicon_diode"
  | "thyristor_crowbar"
  | "spark_gap_air";

const DATA: Record<SurgeProtectType, {
  clampVoltage: number; responseTime: number; surgeCapacity: number;
  standbyLeak: number; protectCost: number; resettable: boolean;
  forTelecom: boolean; clampMethod: string; bestUse: string;
}> = {
  mov_metal_oxide: { clampVoltage: 6, responseTime: 7, surgeCapacity: 8, standbyLeak: 5, protectCost: 2, resettable: true, forTelecom: false, clampMethod: "varistor_voltage_clamp", bestUse: "ac_power_surge_primary" },
  gas_discharge_tube: { clampVoltage: 4, responseTime: 4, surgeCapacity: 10, standbyLeak: 10, protectCost: 5, resettable: true, forTelecom: true, clampMethod: "gas_ionization_arc", bestUse: "telecom_lightning_primary" },
  tvs_silicon_diode: { clampVoltage: 10, responseTime: 10, surgeCapacity: 5, standbyLeak: 7, protectCost: 4, resettable: true, forTelecom: false, clampMethod: "avalanche_diode_clamp", bestUse: "data_line_esd_protect" },
  thyristor_crowbar: { clampVoltage: 9, responseTime: 6, surgeCapacity: 9, standbyLeak: 8, protectCost: 6, resettable: false, forTelecom: true, clampMethod: "scr_crowbar_short", bestUse: "high_energy_telecom_line" },
  spark_gap_air: { clampVoltage: 3, responseTime: 3, surgeCapacity: 10, standbyLeak: 10, protectCost: 1, resettable: true, forTelecom: false, clampMethod: "air_gap_arc_over", bestUse: "coarse_primary_lightning" },
};

const get = (t: SurgeProtectType) => DATA[t];

export const clampVoltage = (t: SurgeProtectType) => get(t).clampVoltage;
export const responseTime = (t: SurgeProtectType) => get(t).responseTime;
export const surgeCapacity = (t: SurgeProtectType) => get(t).surgeCapacity;
export const standbyLeak = (t: SurgeProtectType) => get(t).standbyLeak;
export const protectCost = (t: SurgeProtectType) => get(t).protectCost;
export const resettable = (t: SurgeProtectType) => get(t).resettable;
export const forTelecom = (t: SurgeProtectType) => get(t).forTelecom;
export const clampMethod = (t: SurgeProtectType) => get(t).clampMethod;
export const bestUse = (t: SurgeProtectType) => get(t).bestUse;
export const surgeProtects = (): SurgeProtectType[] => Object.keys(DATA) as SurgeProtectType[];
