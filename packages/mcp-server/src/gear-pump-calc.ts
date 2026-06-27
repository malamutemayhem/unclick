export type GearPumpType =
  | "external_spur_gear"
  | "internal_crescent_seal"
  | "helical_low_pulsation"
  | "mag_drive_sealless"
  | "high_pressure_precision";

interface GearPumpData {
  flow: number;
  pressure: number;
  viscosity: number;
  pulsation: number;
  gpCost: number;
  sealless: boolean;
  forViscous: boolean;
  drive: string;
  bestUse: string;
}

const DATA: Record<GearPumpType, GearPumpData> = {
  external_spur_gear: {
    flow: 7, pressure: 8, viscosity: 8, pulsation: 5, gpCost: 4,
    sealless: false, forViscous: true,
    drive: "direct_coupled_shaft_seal",
    bestUse: "hydraulic_power_unit_lube_oil",
  },
  internal_crescent_seal: {
    flow: 8, pressure: 7, viscosity: 9, pulsation: 7, gpCost: 6,
    sealless: false, forViscous: true,
    drive: "internal_idler_crescent_separator",
    bestUse: "food_grade_chocolate_asphalt",
  },
  helical_low_pulsation: {
    flow: 8, pressure: 8, viscosity: 8, pulsation: 9, gpCost: 7,
    sealless: false, forViscous: true,
    drive: "herringbone_helical_low_noise",
    bestUse: "metering_dosing_smooth_flow",
  },
  mag_drive_sealless: {
    flow: 6, pressure: 6, viscosity: 6, pulsation: 7, gpCost: 8,
    sealless: true, forViscous: false,
    drive: "magnetic_coupling_zero_leak",
    bestUse: "chemical_transfer_hazardous_fluid",
  },
  high_pressure_precision: {
    flow: 6, pressure: 10, viscosity: 7, pulsation: 6, gpCost: 9,
    sealless: false, forViscous: false,
    drive: "hardened_gear_close_tolerance",
    bestUse: "injection_molding_high_pressure",
  },
};

function get(t: GearPumpType): GearPumpData {
  return DATA[t];
}

export const flow = (t: GearPumpType) => get(t).flow;
export const pressure = (t: GearPumpType) => get(t).pressure;
export const viscosity = (t: GearPumpType) => get(t).viscosity;
export const pulsation = (t: GearPumpType) => get(t).pulsation;
export const gpCost = (t: GearPumpType) => get(t).gpCost;
export const sealless = (t: GearPumpType) => get(t).sealless;
export const forViscous = (t: GearPumpType) => get(t).forViscous;
export const drive = (t: GearPumpType) => get(t).drive;
export const bestUse = (t: GearPumpType) => get(t).bestUse;
export const gearPumpTypes = (): GearPumpType[] =>
  Object.keys(DATA) as GearPumpType[];
