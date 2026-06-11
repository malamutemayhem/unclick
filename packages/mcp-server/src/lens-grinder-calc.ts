export type LensGrinderType =
  | "conventional_grind"
  | "cnc_generator"
  | "freeform_grind"
  | "diamond_turning"
  | "mrf_polish";

interface LensGrinderData {
  surfaceAccuracy: number;
  throughput: number;
  shapeRange: number;
  scratchDig: number;
  lgCost: number;
  automated: boolean;
  forAspheric: boolean;
  grinderConfig: string;
  bestUse: string;
}

const DATA: Record<LensGrinderType, LensGrinderData> = {
  conventional_grind: {
    surfaceAccuracy: 7, throughput: 6, shapeRange: 5, scratchDig: 7, lgCost: 4,
    automated: false, forAspheric: false,
    grinderConfig: "conventional_lens_grinder_spindle_lap_abrasive_slurry_sphere",
    bestUse: "standard_optics_conventional_lens_grinder_spherical_stock_shop",
  },
  cnc_generator: {
    surfaceAccuracy: 9, throughput: 8, shapeRange: 8, scratchDig: 8, lgCost: 7,
    automated: true, forAspheric: true,
    grinderConfig: "cnc_lens_generator_multi_axis_diamond_wheel_curve_generate",
    bestUse: "production_optics_cnc_lens_generator_curve_generate_aspheric",
  },
  freeform_grind: {
    surfaceAccuracy: 10, throughput: 5, shapeRange: 10, scratchDig: 9, lgCost: 9,
    automated: true, forAspheric: true,
    grinderConfig: "freeform_lens_grinder_5_axis_cnc_non_rotationally_symmetric",
    bestUse: "progressive_freeform_lens_grinder_non_symmetric_custom_optic",
  },
  diamond_turning: {
    surfaceAccuracy: 10, throughput: 4, shapeRange: 9, scratchDig: 10, lgCost: 10,
    automated: true, forAspheric: true,
    grinderConfig: "diamond_turning_lens_machine_spdt_ir_metal_mirror_aspheric",
    bestUse: "ir_optics_diamond_turning_machine_spdt_metal_mirror_aspheric",
  },
  mrf_polish: {
    surfaceAccuracy: 10, throughput: 3, shapeRange: 8, scratchDig: 10, lgCost: 10,
    automated: true, forAspheric: true,
    grinderConfig: "mrf_lens_polisher_magnetorheological_fluid_jet_sub_nanometer",
    bestUse: "precision_optics_mrf_polisher_sub_nanometer_figure_correction",
  },
};

function get(t: LensGrinderType): LensGrinderData {
  return DATA[t];
}

export const surfaceAccuracy = (t: LensGrinderType) => get(t).surfaceAccuracy;
export const throughput = (t: LensGrinderType) => get(t).throughput;
export const shapeRange = (t: LensGrinderType) => get(t).shapeRange;
export const scratchDig = (t: LensGrinderType) => get(t).scratchDig;
export const lgCost = (t: LensGrinderType) => get(t).lgCost;
export const automated = (t: LensGrinderType) => get(t).automated;
export const forAspheric = (t: LensGrinderType) => get(t).forAspheric;
export const grinderConfig = (t: LensGrinderType) => get(t).grinderConfig;
export const bestUse = (t: LensGrinderType) => get(t).bestUse;
export const lensGrinderTypes = (): LensGrinderType[] =>
  Object.keys(DATA) as LensGrinderType[];
