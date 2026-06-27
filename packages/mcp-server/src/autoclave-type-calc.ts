export type AutoclaveType =
  | "gravity_displacement_downward"
  | "pre_vacuum_pulsing"
  | "steam_flush_pressure_pulse"
  | "superheated_water_cascade"
  | "ethylene_oxide_gas_eto";

interface AutoclaveData {
  penetration: number;
  speed: number;
  materialSafe: number;
  validation: number;
  acCost: number;
  steam: boolean;
  forSurgical: boolean;
  cycle: string;
  bestUse: string;
}

const DATA: Record<AutoclaveType, AutoclaveData> = {
  gravity_displacement_downward: {
    penetration: 6, speed: 5, materialSafe: 7, validation: 7, acCost: 3,
    steam: true, forSurgical: true,
    cycle: "gravity_air_displaced_downward",
    bestUse: "unwrapped_instrument_liquid_waste",
  },
  pre_vacuum_pulsing: {
    penetration: 10, speed: 9, materialSafe: 6, validation: 9, acCost: 7,
    steam: true, forSurgical: true,
    cycle: "vacuum_pulse_steam_inject_repeat",
    bestUse: "wrapped_pack_porous_load_surgical",
  },
  steam_flush_pressure_pulse: {
    penetration: 8, speed: 7, materialSafe: 7, validation: 8, acCost: 5,
    steam: true, forSurgical: true,
    cycle: "steam_flush_above_atmospheric",
    bestUse: "small_clinic_tabletop_mixed_load",
  },
  superheated_water_cascade: {
    penetration: 7, speed: 6, materialSafe: 9, validation: 8, acCost: 8,
    steam: false, forSurgical: false,
    cycle: "hot_water_spray_cascade_over",
    bestUse: "pharma_liquid_fill_sealed_container",
  },
  ethylene_oxide_gas_eto: {
    penetration: 9, speed: 3, materialSafe: 10, validation: 10, acCost: 9,
    steam: false, forSurgical: true,
    cycle: "gas_diffusion_low_temp_long",
    bestUse: "heat_sensitive_plastic_electronic",
  },
};

function get(t: AutoclaveType): AutoclaveData {
  return DATA[t];
}

export const penetration = (t: AutoclaveType) => get(t).penetration;
export const speed = (t: AutoclaveType) => get(t).speed;
export const materialSafe = (t: AutoclaveType) => get(t).materialSafe;
export const validation = (t: AutoclaveType) => get(t).validation;
export const acCost = (t: AutoclaveType) => get(t).acCost;
export const steam = (t: AutoclaveType) => get(t).steam;
export const forSurgical = (t: AutoclaveType) => get(t).forSurgical;
export const cycle = (t: AutoclaveType) => get(t).cycle;
export const bestUse = (t: AutoclaveType) => get(t).bestUse;
export const autoclaveTypes = (): AutoclaveType[] =>
  Object.keys(DATA) as AutoclaveType[];
