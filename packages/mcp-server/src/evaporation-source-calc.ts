export type EvaporationSourceType =
  | "resistive_boat"
  | "electron_beam_evap"
  | "thermal_filament"
  | "effusion_cell"
  | "flash_evap";

interface EvaporationSourceData {
  deposition_rate: number;
  throughput: number;
  materialRange: number;
  uniformity: number;
  esCost: number;
  highMelt: boolean;
  forOptical: boolean;
  sourceConfig: string;
  bestUse: string;
}

const DATA: Record<EvaporationSourceType, EvaporationSourceData> = {
  resistive_boat: {
    deposition_rate: 6, throughput: 7, materialRange: 5, uniformity: 6, esCost: 2,
    highMelt: false, forOptical: false,
    sourceConfig: "resistive_boat_evaporation_source_tungsten_molybdenum_direct_heat",
    bestUse: "lab_coating_resistive_boat_source_simple_low_cost_metal_evaporate",
  },
  electron_beam_evap: {
    deposition_rate: 10, throughput: 9, materialRange: 10, uniformity: 9, esCost: 9,
    highMelt: true, forOptical: true,
    sourceConfig: "electron_beam_evaporation_source_focused_beam_crucible_high_purity",
    bestUse: "optical_coat_electron_beam_source_high_purity_refractory_metal_oxide",
  },
  thermal_filament: {
    deposition_rate: 7, throughput: 7, materialRange: 6, uniformity: 7, esCost: 3,
    highMelt: false, forOptical: false,
    sourceConfig: "thermal_filament_evaporation_source_wire_basket_wrap_evaporate",
    bestUse: "metallization_thermal_filament_source_wire_wrap_simple_aluminum",
  },
  effusion_cell: {
    deposition_rate: 5, throughput: 5, materialRange: 7, uniformity: 10, esCost: 8,
    highMelt: false, forOptical: false,
    sourceConfig: "effusion_cell_knudsen_source_precise_flux_mbe_epitaxy_ultra_pure",
    bestUse: "mbe_epitaxy_effusion_cell_knudsen_source_ultra_pure_precise_flux",
  },
  flash_evap: {
    deposition_rate: 8, throughput: 8, materialRange: 8, uniformity: 7, esCost: 6,
    highMelt: false, forOptical: true,
    sourceConfig: "flash_evaporation_source_drop_powder_hot_surface_instant_vaporize",
    bestUse: "alloy_film_flash_evaporation_source_preserve_composition_co_deposit",
  },
};

function get(t: EvaporationSourceType): EvaporationSourceData {
  return DATA[t];
}

export const deposition_rate = (t: EvaporationSourceType) => get(t).deposition_rate;
export const throughput = (t: EvaporationSourceType) => get(t).throughput;
export const materialRange = (t: EvaporationSourceType) => get(t).materialRange;
export const uniformity = (t: EvaporationSourceType) => get(t).uniformity;
export const esCost = (t: EvaporationSourceType) => get(t).esCost;
export const highMelt = (t: EvaporationSourceType) => get(t).highMelt;
export const forOptical = (t: EvaporationSourceType) => get(t).forOptical;
export const sourceConfig = (t: EvaporationSourceType) => get(t).sourceConfig;
export const bestUse = (t: EvaporationSourceType) => get(t).bestUse;
export const evaporationSourceTypes = (): EvaporationSourceType[] =>
  Object.keys(DATA) as EvaporationSourceType[];
