export type MetalAmType =
  | "lpbf_laser_powder_bed"
  | "ebm_electron_beam_melt"
  | "binder_jet_metal"
  | "ded_laser_wire"
  | "metal_fdm_bound_filament";

interface MetalAmData {
  density: number;
  speed: number;
  precision: number;
  surfaceFinish: number;
  maCost: number;
  supportFree: boolean;
  forAerospace: boolean;
  feedstock: string;
  bestUse: string;
}

const DATA: Record<MetalAmType, MetalAmData> = {
  lpbf_laser_powder_bed: {
    density: 10, speed: 5, precision: 10, surfaceFinish: 8, maCost: 9,
    supportFree: false, forAerospace: true,
    feedstock: "gas_atomized_metal_powder_15_45um",
    bestUse: "aerospace_implant_conformal_cool",
  },
  ebm_electron_beam_melt: {
    density: 10, speed: 7, precision: 7, surfaceFinish: 5, maCost: 10,
    supportFree: false, forAerospace: true,
    feedstock: "plasma_atomized_ti_powder_45_106um",
    bestUse: "titanium_implant_turbine_blade",
  },
  binder_jet_metal: {
    density: 8, speed: 9, precision: 8, surfaceFinish: 6, maCost: 6,
    supportFree: true, forAerospace: false,
    feedstock: "mim_grade_metal_powder_binder",
    bestUse: "volume_production_tool_insert",
  },
  ded_laser_wire: {
    density: 9, speed: 8, precision: 5, surfaceFinish: 4, maCost: 7,
    supportFree: true, forAerospace: true,
    feedstock: "metal_wire_blown_powder_nozzle",
    bestUse: "repair_clad_large_near_net_shape",
  },
  metal_fdm_bound_filament: {
    density: 9, speed: 6, precision: 7, surfaceFinish: 6, maCost: 4,
    supportFree: false, forAerospace: false,
    feedstock: "metal_polymer_bound_rod_filament",
    bestUse: "prototype_fixture_low_cost_metal",
  },
};

function get(t: MetalAmType): MetalAmData {
  return DATA[t];
}

export const density = (t: MetalAmType) => get(t).density;
export const speed = (t: MetalAmType) => get(t).speed;
export const precision = (t: MetalAmType) => get(t).precision;
export const surfaceFinish = (t: MetalAmType) => get(t).surfaceFinish;
export const maCost = (t: MetalAmType) => get(t).maCost;
export const supportFree = (t: MetalAmType) => get(t).supportFree;
export const forAerospace = (t: MetalAmType) => get(t).forAerospace;
export const feedstock = (t: MetalAmType) => get(t).feedstock;
export const bestUse = (t: MetalAmType) => get(t).bestUse;
export const metalAmTypes = (): MetalAmType[] =>
  Object.keys(DATA) as MetalAmType[];
