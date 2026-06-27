export type CompressorType =
  | "reciprocating_piston"
  | "rotary_screw_helical"
  | "centrifugal_radial"
  | "scroll_orbital_wrap"
  | "diaphragm_hermetic";

const DATA: Record<CompressorType, {
  flowRate: number; pressure: number; efficiency: number;
  maintenance: number; cmCost: number; oilFree: boolean;
  forHvac: boolean; mechanism: string; bestUse: string;
}> = {
  reciprocating_piston: {
    flowRate: 5, pressure: 10, efficiency: 6,
    maintenance: 4, cmCost: 2, oilFree: false,
    forHvac: false, mechanism: "crankshaft_piston_cylinder",
    bestUse: "high_pressure_gas_bottle_fill",
  },
  rotary_screw_helical: {
    flowRate: 9, pressure: 7, efficiency: 8,
    maintenance: 8, cmCost: 4, oilFree: false,
    forHvac: false, mechanism: "twin_helical_rotor_mesh",
    bestUse: "factory_compressed_air_24_7",
  },
  centrifugal_radial: {
    flowRate: 10, pressure: 6, efficiency: 9,
    maintenance: 9, cmCost: 5, oilFree: true,
    forHvac: true, mechanism: "impeller_radial_diffuser",
    bestUse: "large_chiller_plant_centrifugal",
  },
  scroll_orbital_wrap: {
    flowRate: 4, pressure: 5, efficiency: 8,
    maintenance: 9, cmCost: 3, oilFree: true,
    forHvac: true, mechanism: "orbiting_fixed_spiral_wrap",
    bestUse: "residential_heat_pump_quiet",
  },
  diaphragm_hermetic: {
    flowRate: 2, pressure: 9, efficiency: 5,
    maintenance: 7, cmCost: 3, oilFree: true,
    forHvac: false, mechanism: "flexing_metal_diaphragm",
    bestUse: "semiconductor_ultra_pure_gas",
  },
};

const get = (t: CompressorType) => DATA[t];

export const flowRate = (t: CompressorType) => get(t).flowRate;
export const pressure = (t: CompressorType) => get(t).pressure;
export const efficiency = (t: CompressorType) => get(t).efficiency;
export const maintenance = (t: CompressorType) => get(t).maintenance;
export const cmCost = (t: CompressorType) => get(t).cmCost;
export const oilFree = (t: CompressorType) => get(t).oilFree;
export const forHvac = (t: CompressorType) => get(t).forHvac;
export const mechanism = (t: CompressorType) => get(t).mechanism;
export const bestUse = (t: CompressorType) => get(t).bestUse;
export const compressorTypes = (): CompressorType[] => Object.keys(DATA) as CompressorType[];
