export type FilmMeasure =
  | "spectral_reflectance"
  | "ellipsometry_multi_angle"
  | "eddy_current"
  | "xrf_fluorescence"
  | "four_point_probe";

const DATA: Record<FilmMeasure, {
  precision: number; throughput: number; materialRange: number;
  multilayer: number; filmCost: number; nonContact: boolean;
  forMetal: boolean; technique: string; bestUse: string;
}> = {
  spectral_reflectance: {
    precision: 8, throughput: 9, materialRange: 7,
    multilayer: 7, filmCost: 3, nonContact: true,
    forMetal: false, technique: "broadband_interference_fit",
    bestUse: "oxide_nitride_thickness",
  },
  ellipsometry_multi_angle: {
    precision: 10, throughput: 6, materialRange: 9,
    multilayer: 10, filmCost: 6, nonContact: true,
    forMetal: false, technique: "polarization_state_model",
    bestUse: "high_k_gate_dielectric",
  },
  eddy_current: {
    precision: 6, throughput: 10, materialRange: 4,
    multilayer: 3, filmCost: 2, nonContact: true,
    forMetal: true, technique: "ac_coil_impedance_change",
    bestUse: "cmp_copper_endpoint",
  },
  xrf_fluorescence: {
    precision: 7, throughput: 7, materialRange: 8,
    multilayer: 6, filmCost: 5, nonContact: true,
    forMetal: true, technique: "xray_emission_elemental",
    bestUse: "barrier_seed_composition",
  },
  four_point_probe: {
    precision: 7, throughput: 8, materialRange: 3,
    multilayer: 2, filmCost: 1, nonContact: false,
    forMetal: true, technique: "sheet_resistance_contact",
    bestUse: "implant_dose_monitor",
  },
};

const get = (t: FilmMeasure) => DATA[t];

export const precision = (t: FilmMeasure) => get(t).precision;
export const throughput = (t: FilmMeasure) => get(t).throughput;
export const materialRange = (t: FilmMeasure) => get(t).materialRange;
export const multilayer = (t: FilmMeasure) => get(t).multilayer;
export const filmCost = (t: FilmMeasure) => get(t).filmCost;
export const nonContact = (t: FilmMeasure) => get(t).nonContact;
export const forMetal = (t: FilmMeasure) => get(t).forMetal;
export const technique = (t: FilmMeasure) => get(t).technique;
export const bestUse = (t: FilmMeasure) => get(t).bestUse;
export const filmMeasures = (): FilmMeasure[] => Object.keys(DATA) as FilmMeasure[];
