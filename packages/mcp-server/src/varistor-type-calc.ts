export type VaristorType =
  | "mov_metal_oxide"
  | "sic_silicon_carbide"
  | "tvs_diode_array"
  | "gas_discharge_tube"
  | "spark_gap_air";

const DATA: Record<VaristorType, {
  clampVoltage: number; energyAbsorb: number; responseTime: number;
  lifetime: number; varistorCost: number; resettable: boolean;
  forMains: boolean; mechanism: string; bestUse: string;
}> = {
  mov_metal_oxide: {
    clampVoltage: 6, energyAbsorb: 8, responseTime: 6,
    lifetime: 5, varistorCost: 3, resettable: true,
    forMains: true, mechanism: "zno_grain_boundary",
    bestUse: "ac_surge_protector",
  },
  sic_silicon_carbide: {
    clampVoltage: 5, energyAbsorb: 9, responseTime: 5,
    lifetime: 7, varistorCost: 6, resettable: true,
    forMains: true, mechanism: "sic_ceramic_disc",
    bestUse: "industrial_motor_protection",
  },
  tvs_diode_array: {
    clampVoltage: 9, energyAbsorb: 4, responseTime: 10,
    lifetime: 9, varistorCost: 7, resettable: true,
    forMains: false, mechanism: "avalanche_breakdown",
    bestUse: "data_line_esd_protection",
  },
  gas_discharge_tube: {
    clampVoltage: 3, energyAbsorb: 10, responseTime: 3,
    lifetime: 8, varistorCost: 5, resettable: true,
    forMains: true, mechanism: "ionized_gas_arc",
    bestUse: "telecom_lightning_arrest",
  },
  spark_gap_air: {
    clampVoltage: 2, energyAbsorb: 7, responseTime: 2,
    lifetime: 4, varistorCost: 2, resettable: false,
    forMains: false, mechanism: "air_gap_ionization",
    bestUse: "high_voltage_crowbar_clamp",
  },
};

const get = (t: VaristorType) => DATA[t];

export const clampVoltage = (t: VaristorType) => get(t).clampVoltage;
export const energyAbsorb = (t: VaristorType) => get(t).energyAbsorb;
export const responseTime = (t: VaristorType) => get(t).responseTime;
export const lifetime = (t: VaristorType) => get(t).lifetime;
export const varistorCost = (t: VaristorType) => get(t).varistorCost;
export const resettable = (t: VaristorType) => get(t).resettable;
export const forMains = (t: VaristorType) => get(t).forMains;
export const mechanism = (t: VaristorType) => get(t).mechanism;
export const bestUse = (t: VaristorType) => get(t).bestUse;
export const varistorTypes = (): VaristorType[] => Object.keys(DATA) as VaristorType[];
