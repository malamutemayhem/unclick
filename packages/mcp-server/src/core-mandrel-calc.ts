export type CoreMandrelType =
  | "steel_fixed"
  | "aluminum_collapsible"
  | "inflatable_bladder"
  | "soluble_washout"
  | "sand_cast";

interface CoreMandrelData {
  dimensionalAccuracy: number;
  throughput: number;
  surfaceFinish: number;
  extractionEase: number;
  cmCost: number;
  reusable: boolean;
  forHollow: boolean;
  mandrelConfig: string;
  bestUse: string;
}

const DATA: Record<CoreMandrelType, CoreMandrelData> = {
  steel_fixed: {
    dimensionalAccuracy: 9, throughput: 8, surfaceFinish: 9, extractionEase: 3, cmCost: 7,
    reusable: true, forHollow: true,
    mandrelConfig: "steel_fixed_core_mandrel_machined_surface_taper_pull_extract",
    bestUse: "straight_tube_steel_fixed_core_mandrel_machined_taper_extract",
  },
  aluminum_collapsible: {
    dimensionalAccuracy: 8, throughput: 7, surfaceFinish: 8, extractionEase: 8, cmCost: 8,
    reusable: true, forHollow: true,
    mandrelConfig: "aluminum_collapsible_core_mandrel_segment_hinge_fold_extract",
    bestUse: "duct_elbow_aluminum_collapsible_core_mandrel_segment_fold_out",
  },
  inflatable_bladder: {
    dimensionalAccuracy: 5, throughput: 6, surfaceFinish: 5, extractionEase: 9, cmCost: 4,
    reusable: true, forHollow: true,
    mandrelConfig: "inflatable_bladder_core_mandrel_silicone_bag_air_press_deflate",
    bestUse: "hollow_spar_inflatable_bladder_core_mandrel_deflate_pull_easy",
  },
  soluble_washout: {
    dimensionalAccuracy: 7, throughput: 4, surfaceFinish: 7, extractionEase: 9, cmCost: 6,
    reusable: false, forHollow: true,
    mandrelConfig: "soluble_washout_core_mandrel_ceramic_salt_dissolve_water_flush",
    bestUse: "complex_cavity_soluble_washout_core_mandrel_dissolve_no_draft",
  },
  sand_cast: {
    dimensionalAccuracy: 5, throughput: 5, surfaceFinish: 4, extractionEase: 8, cmCost: 3,
    reusable: false, forHollow: false,
    mandrelConfig: "sand_cast_core_mandrel_bonded_sand_shape_break_out_after_cure",
    bestUse: "prototype_shape_sand_cast_core_mandrel_bonded_sand_break_out",
  },
};

function get(t: CoreMandrelType): CoreMandrelData {
  return DATA[t];
}

export const dimensionalAccuracy = (t: CoreMandrelType) => get(t).dimensionalAccuracy;
export const throughput = (t: CoreMandrelType) => get(t).throughput;
export const surfaceFinish = (t: CoreMandrelType) => get(t).surfaceFinish;
export const extractionEase = (t: CoreMandrelType) => get(t).extractionEase;
export const cmCost = (t: CoreMandrelType) => get(t).cmCost;
export const reusable = (t: CoreMandrelType) => get(t).reusable;
export const forHollow = (t: CoreMandrelType) => get(t).forHollow;
export const mandrelConfig = (t: CoreMandrelType) => get(t).mandrelConfig;
export const bestUse = (t: CoreMandrelType) => get(t).bestUse;
export const coreMandrelTypes = (): CoreMandrelType[] =>
  Object.keys(DATA) as CoreMandrelType[];
