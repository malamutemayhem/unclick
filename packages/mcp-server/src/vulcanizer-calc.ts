export type VulcanizerType =
  | "compression_press"
  | "autoclave_steam"
  | "continuous_rotocure"
  | "injection_mold"
  | "hot_air_oven";

interface VulcanizerData {
  cureSpeed: number;
  cureUniformity: number;
  partComplexity: number;
  throughput: number;
  vCost: number;
  continuous: boolean;
  forSheet: boolean;
  cureConfig: string;
  bestUse: string;
}

const DATA: Record<VulcanizerType, VulcanizerData> = {
  compression_press: {
    cureSpeed: 7, cureUniformity: 9, partComplexity: 8, throughput: 7, vCost: 7,
    continuous: false, forSheet: false,
    cureConfig: "hydraulic_compression_press_heated_platen_mold_cure_rubber_part",
    bestUse: "molded_rubber_part_gasket_seal_compression_press_cure_in_mold",
  },
  autoclave_steam: {
    cureSpeed: 6, cureUniformity: 10, partComplexity: 6, throughput: 8, vCost: 8,
    continuous: false, forSheet: true,
    cureConfig: "autoclave_steam_pressure_vessel_batch_cure_hose_belt_uniform",
    bestUse: "rubber_hose_belt_batch_cure_autoclave_steam_pressure_uniform",
  },
  continuous_rotocure: {
    cureSpeed: 10, cureUniformity: 8, partComplexity: 4, throughput: 10, vCost: 9,
    continuous: true, forSheet: true,
    cureConfig: "rotocure_drum_continuous_belt_sheet_cure_high_speed_vulcanize",
    bestUse: "continuous_rubber_sheet_belt_flooring_rotocure_drum_high_speed",
  },
  injection_mold: {
    cureSpeed: 9, cureUniformity: 9, partComplexity: 10, throughput: 9, vCost: 10,
    continuous: false, forSheet: false,
    cureConfig: "injection_mold_vulcanize_rubber_inject_heated_cavity_auto_cure",
    bestUse: "complex_rubber_part_auto_seal_bushing_injection_mold_vulcanize",
  },
  hot_air_oven: {
    cureSpeed: 5, cureUniformity: 7, partComplexity: 5, throughput: 6, vCost: 5,
    continuous: false, forSheet: false,
    cureConfig: "hot_air_oven_batch_cure_extrusion_profile_sponge_rubber_strip",
    bestUse: "extruded_rubber_profile_sponge_strip_hot_air_oven_batch_cure",
  },
};

function get(t: VulcanizerType): VulcanizerData {
  return DATA[t];
}

export const cureSpeed = (t: VulcanizerType) => get(t).cureSpeed;
export const cureUniformity = (t: VulcanizerType) => get(t).cureUniformity;
export const partComplexity = (t: VulcanizerType) => get(t).partComplexity;
export const throughput = (t: VulcanizerType) => get(t).throughput;
export const vCost = (t: VulcanizerType) => get(t).vCost;
export const continuous = (t: VulcanizerType) => get(t).continuous;
export const forSheet = (t: VulcanizerType) => get(t).forSheet;
export const cureConfig = (t: VulcanizerType) => get(t).cureConfig;
export const bestUse = (t: VulcanizerType) => get(t).bestUse;
export const vulcanizerTypes = (): VulcanizerType[] =>
  Object.keys(DATA) as VulcanizerType[];
