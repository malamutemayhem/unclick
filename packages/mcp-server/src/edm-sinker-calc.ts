export type EdmSinkerType =
  | "conventional_sinker"
  | "cnc_sinker"
  | "micro_edm"
  | "oil_sinker"
  | "powder_mixed";

interface EdmSinkerData {
  surfaceFinish: number;
  throughput: number;
  accuracy: number;
  depthControl: number;
  esCost: number;
  automated: boolean;
  forMicro: boolean;
  sinkerConfig: string;
  bestUse: string;
}

const DATA: Record<EdmSinkerType, EdmSinkerData> = {
  conventional_sinker: {
    surfaceFinish: 7, throughput: 6, accuracy: 7, depthControl: 7, esCost: 5,
    automated: false, forMicro: false,
    sinkerConfig: "conventional_edm_sinker_copper_electrode_dielectric_spark_cavity",
    bestUse: "mold_cavity_conventional_edm_sinker_copper_electrode_spark",
  },
  cnc_sinker: {
    surfaceFinish: 8, throughput: 7, accuracy: 9, depthControl: 9, esCost: 8,
    automated: true, forMicro: false,
    sinkerConfig: "cnc_edm_sinker_multi_axis_electrode_changer_adaptive_control",
    bestUse: "complex_die_cnc_edm_sinker_multi_axis_electrode_change_auto",
  },
  micro_edm: {
    surfaceFinish: 10, throughput: 3, accuracy: 10, depthControl: 10, esCost: 10,
    automated: true, forMicro: true,
    sinkerConfig: "micro_edm_sinker_fine_electrode_sub_micron_spark_tiny_feature",
    bestUse: "micro_hole_micro_edm_sinker_fine_electrode_sub_micron_feature",
  },
  oil_sinker: {
    surfaceFinish: 8, throughput: 5, accuracy: 8, depthControl: 8, esCost: 6,
    automated: false, forMicro: false,
    sinkerConfig: "oil_edm_sinker_hydrocarbon_dielectric_mirror_finish_graphite",
    bestUse: "mirror_finish_oil_edm_sinker_hydrocarbon_dielectric_graphite",
  },
  powder_mixed: {
    surfaceFinish: 9, throughput: 4, accuracy: 8, depthControl: 8, esCost: 7,
    automated: false, forMicro: false,
    sinkerConfig: "powder_mixed_edm_sinker_silicon_additive_dielectric_nano_finish",
    bestUse: "nano_finish_powder_mixed_edm_sinker_silicon_additive_surface",
  },
};

function get(t: EdmSinkerType): EdmSinkerData {
  return DATA[t];
}

export const surfaceFinish = (t: EdmSinkerType) => get(t).surfaceFinish;
export const throughput = (t: EdmSinkerType) => get(t).throughput;
export const accuracy = (t: EdmSinkerType) => get(t).accuracy;
export const depthControl = (t: EdmSinkerType) => get(t).depthControl;
export const esCost = (t: EdmSinkerType) => get(t).esCost;
export const automated = (t: EdmSinkerType) => get(t).automated;
export const forMicro = (t: EdmSinkerType) => get(t).forMicro;
export const sinkerConfig = (t: EdmSinkerType) => get(t).sinkerConfig;
export const bestUse = (t: EdmSinkerType) => get(t).bestUse;
export const edmSinkerTypes = (): EdmSinkerType[] =>
  Object.keys(DATA) as EdmSinkerType[];
