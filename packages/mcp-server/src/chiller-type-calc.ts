export type ChillerType =
  | "air_cooled_scroll"
  | "water_cooled_centrifugal"
  | "absorption_lithium_bromide"
  | "magnetic_bearing_oil_free"
  | "modular_air_cooled_screw";

const DATA: Record<ChillerType, {
  efficiency: number; capacity: number; partLoad: number;
  footprint: number; chCost: number; waterFree: boolean;
  forDataCenter: boolean; compressor: string; bestUse: string;
}> = {
  air_cooled_scroll: {
    efficiency: 5, capacity: 3, partLoad: 6,
    footprint: 7, chCost: 1, waterFree: true,
    forDataCenter: false, compressor: "scroll_hermetic_air_cooled",
    bestUse: "small_office_rooftop_install",
  },
  water_cooled_centrifugal: {
    efficiency: 10, capacity: 10, partLoad: 9,
    footprint: 4, chCost: 5, waterFree: false,
    forDataCenter: true, compressor: "centrifugal_multi_stage",
    bestUse: "campus_central_plant_baseload",
  },
  absorption_lithium_bromide: {
    efficiency: 4, capacity: 8, partLoad: 5,
    footprint: 3, chCost: 4, waterFree: false,
    forDataCenter: false, compressor: "none_thermal_absorption",
    bestUse: "waste_heat_recovery_cogen",
  },
  magnetic_bearing_oil_free: {
    efficiency: 9, capacity: 9, partLoad: 10,
    footprint: 5, chCost: 5, waterFree: false,
    forDataCenter: true, compressor: "centrifugal_magnetic_levitate",
    bestUse: "data_center_variable_load_pue",
  },
  modular_air_cooled_screw: {
    efficiency: 7, capacity: 6, partLoad: 8,
    footprint: 8, chCost: 3, waterFree: true,
    forDataCenter: false, compressor: "screw_modular_stackable",
    bestUse: "hospital_phased_expansion",
  },
};

const get = (t: ChillerType) => DATA[t];

export const efficiency = (t: ChillerType) => get(t).efficiency;
export const capacity = (t: ChillerType) => get(t).capacity;
export const partLoad = (t: ChillerType) => get(t).partLoad;
export const footprint = (t: ChillerType) => get(t).footprint;
export const chCost = (t: ChillerType) => get(t).chCost;
export const waterFree = (t: ChillerType) => get(t).waterFree;
export const forDataCenter = (t: ChillerType) => get(t).forDataCenter;
export const compressor = (t: ChillerType) => get(t).compressor;
export const bestUse = (t: ChillerType) => get(t).bestUse;
export const chillerTypes = (): ChillerType[] => Object.keys(DATA) as ChillerType[];
