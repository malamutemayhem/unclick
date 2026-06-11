export type VaporSmootherType =
  | "acetone_vapor"
  | "solvent_vapor"
  | "chemical_dip"
  | "heated_chamber"
  | "vacuum_vapor";

interface VaporSmootherData {
  surfaceFinish: number;
  throughput: number;
  dimensionalHold: number;
  materialCompat: number;
  vsCost: number;
  sealed: boolean;
  forAbs: boolean;
  smootherConfig: string;
  bestUse: string;
}

const DATA: Record<VaporSmootherType, VaporSmootherData> = {
  acetone_vapor: {
    surfaceFinish: 8, throughput: 7, dimensionalHold: 6, materialCompat: 3, vsCost: 3,
    sealed: false, forAbs: true,
    smootherConfig: "acetone_vapor_smoother_heated_solvent_abs_surface_melt_seal_pore",
    bestUse: "abs_enclosure_acetone_vapor_smoother_seal_layer_lines_glossy",
  },
  solvent_vapor: {
    surfaceFinish: 8, throughput: 6, dimensionalHold: 7, materialCompat: 6, vsCost: 5,
    sealed: true, forAbs: false,
    smootherConfig: "solvent_vapor_smoother_matched_solvent_polymer_surface_reflow",
    bestUse: "nylon_part_solvent_vapor_smoother_matched_chemistry_smooth_seal",
  },
  chemical_dip: {
    surfaceFinish: 7, throughput: 8, dimensionalHold: 5, materialCompat: 5, vsCost: 4,
    sealed: false, forAbs: true,
    smootherConfig: "chemical_dip_vapor_smoother_immerse_brief_surface_dissolve_drain",
    bestUse: "batch_smooth_chemical_dip_vapor_smoother_rack_immerse_fast_cycle",
  },
  heated_chamber: {
    surfaceFinish: 9, throughput: 5, dimensionalHold: 7, materialCompat: 7, vsCost: 7,
    sealed: true, forAbs: false,
    smootherConfig: "heated_chamber_vapor_smoother_controlled_temp_solvent_saturate",
    bestUse: "medical_housing_heated_chamber_vapor_smoother_controlled_finish",
  },
  vacuum_vapor: {
    surfaceFinish: 9, throughput: 4, dimensionalHold: 8, materialCompat: 8, vsCost: 9,
    sealed: true, forAbs: false,
    smootherConfig: "vacuum_vapor_smoother_low_pressure_solvent_precise_exposure_time",
    bestUse: "precision_part_vacuum_vapor_smoother_tight_tolerance_smooth_seal",
  },
};

function get(t: VaporSmootherType): VaporSmootherData {
  return DATA[t];
}

export const surfaceFinish = (t: VaporSmootherType) => get(t).surfaceFinish;
export const throughput = (t: VaporSmootherType) => get(t).throughput;
export const dimensionalHold = (t: VaporSmootherType) => get(t).dimensionalHold;
export const materialCompat = (t: VaporSmootherType) => get(t).materialCompat;
export const vsCost = (t: VaporSmootherType) => get(t).vsCost;
export const sealed = (t: VaporSmootherType) => get(t).sealed;
export const forAbs = (t: VaporSmootherType) => get(t).forAbs;
export const smootherConfig = (t: VaporSmootherType) => get(t).smootherConfig;
export const bestUse = (t: VaporSmootherType) => get(t).bestUse;
export const vaporSmootherTypes = (): VaporSmootherType[] =>
  Object.keys(DATA) as VaporSmootherType[];
