export type HipProcessorType =
  | "standard_hip"
  | "rapid_cool_hip"
  | "capsule_hip"
  | "sinter_hip"
  | "mini_hip";

interface HipProcessorData {
  densification: number;
  throughput: number;
  tempRange: number;
  pressureRange: number;
  hpCost: number;
  rapidCool: boolean;
  forAmPart: boolean;
  processorConfig: string;
  bestUse: string;
}

const DATA: Record<HipProcessorType, HipProcessorData> = {
  standard_hip: {
    densification: 9, throughput: 6, tempRange: 8, pressureRange: 8, hpCost: 8,
    rapidCool: false, forAmPart: true,
    processorConfig: "standard_hip_processor_argon_gas_furnace_isostatic_compress_soak",
    bestUse: "am_casting_standard_hip_processor_close_porosity_full_density",
  },
  rapid_cool_hip: {
    densification: 9, throughput: 7, tempRange: 8, pressureRange: 9, hpCost: 9,
    rapidCool: true, forAmPart: true,
    processorConfig: "rapid_cool_hip_processor_quench_in_vessel_combine_ht_hip_one_step",
    bestUse: "titanium_am_rapid_cool_hip_processor_combine_hip_heat_treat",
  },
  capsule_hip: {
    densification: 8, throughput: 4, tempRange: 7, pressureRange: 7, hpCost: 7,
    rapidCool: false, forAmPart: false,
    processorConfig: "capsule_hip_processor_sealed_can_powder_compact_near_net_shape",
    bestUse: "pm_billet_capsule_hip_processor_powder_consolidate_full_dense",
  },
  sinter_hip: {
    densification: 9, throughput: 8, tempRange: 7, pressureRange: 6, hpCost: 7,
    rapidCool: false, forAmPart: false,
    processorConfig: "sinter_hip_processor_low_pressure_assist_sinter_close_residual",
    bestUse: "mim_part_sinter_hip_processor_close_residual_pore_final_step",
  },
  mini_hip: {
    densification: 7, throughput: 5, tempRange: 6, pressureRange: 6, hpCost: 5,
    rapidCool: false, forAmPart: true,
    processorConfig: "mini_hip_processor_small_chamber_lab_scale_research_coupon_test",
    bestUse: "research_coupon_mini_hip_processor_lab_scale_parameter_develop",
  },
};

function get(t: HipProcessorType): HipProcessorData {
  return DATA[t];
}

export const densification = (t: HipProcessorType) => get(t).densification;
export const throughput = (t: HipProcessorType) => get(t).throughput;
export const tempRange = (t: HipProcessorType) => get(t).tempRange;
export const pressureRange = (t: HipProcessorType) => get(t).pressureRange;
export const hpCost = (t: HipProcessorType) => get(t).hpCost;
export const rapidCool = (t: HipProcessorType) => get(t).rapidCool;
export const forAmPart = (t: HipProcessorType) => get(t).forAmPart;
export const processorConfig = (t: HipProcessorType) => get(t).processorConfig;
export const bestUse = (t: HipProcessorType) => get(t).bestUse;
export const hipProcessorTypes = (): HipProcessorType[] =>
  Object.keys(DATA) as HipProcessorType[];
