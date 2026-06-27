export type RotameterType =
  | "glass_tube_direct_read"
  | "metal_tube_magnetic"
  | "plastic_tube_economy"
  | "armored_glass_high_pressure"
  | "purge_low_flow_precision";

interface RotameterData {
  accuracy: number;
  rangeability: number;
  pressure: number;
  visibility: number;
  rmCost: number;
  magneticIndicator: boolean;
  forCorrosive: boolean;
  floatType: string;
  bestUse: string;
}

const DATA: Record<RotameterType, RotameterData> = {
  glass_tube_direct_read: {
    accuracy: 7, rangeability: 8, pressure: 5, visibility: 10, rmCost: 3,
    magneticIndicator: false, forCorrosive: false,
    floatType: "stainless_spherical_or_guided",
    bestUse: "laboratory_visual_flow_indication",
  },
  metal_tube_magnetic: {
    accuracy: 9, rangeability: 9, pressure: 9, visibility: 7, rmCost: 7,
    magneticIndicator: true, forCorrosive: true,
    floatType: "magnetic_coupled_guided_float",
    bestUse: "process_opaque_fluid_high_pressure",
  },
  plastic_tube_economy: {
    accuracy: 6, rangeability: 7, pressure: 4, visibility: 9, rmCost: 2,
    magneticIndicator: false, forCorrosive: true,
    floatType: "acrylic_body_teflon_float",
    bestUse: "water_treatment_chemical_feed",
  },
  armored_glass_high_pressure: {
    accuracy: 8, rangeability: 8, pressure: 8, visibility: 8, rmCost: 6,
    magneticIndicator: false, forCorrosive: false,
    floatType: "glass_tube_metal_armor_shield",
    bestUse: "industrial_gas_compressed_air",
  },
  purge_low_flow_precision: {
    accuracy: 9, rangeability: 7, pressure: 7, visibility: 6, rmCost: 5,
    magneticIndicator: true, forCorrosive: false,
    floatType: "precision_tapered_sapphire_jewel",
    bestUse: "instrument_purge_seal_gas",
  },
};

function get(t: RotameterType): RotameterData {
  return DATA[t];
}

export const accuracy = (t: RotameterType) => get(t).accuracy;
export const rangeability = (t: RotameterType) => get(t).rangeability;
export const pressure = (t: RotameterType) => get(t).pressure;
export const visibility = (t: RotameterType) => get(t).visibility;
export const rmCost = (t: RotameterType) => get(t).rmCost;
export const magneticIndicator = (t: RotameterType) => get(t).magneticIndicator;
export const forCorrosive = (t: RotameterType) => get(t).forCorrosive;
export const floatType = (t: RotameterType) => get(t).floatType;
export const bestUse = (t: RotameterType) => get(t).bestUse;
export const rotameterTypes = (): RotameterType[] =>
  Object.keys(DATA) as RotameterType[];
