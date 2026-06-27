export type KilnControllerType =
  | "pid_electric"
  | "programmable_ramp"
  | "gas_atmosphere"
  | "microwave_sinter"
  | "rotary_kiln";

interface KilnControllerData {
  tempAccuracy: number;
  throughput: number;
  uniformity: number;
  rampControl: number;
  kcCost: number;
  programmable: boolean;
  forCeramics: boolean;
  kilnConfig: string;
  bestUse: string;
}

const DATA: Record<KilnControllerType, KilnControllerData> = {
  pid_electric: {
    tempAccuracy: 8, throughput: 6, uniformity: 7, rampControl: 7, kcCost: 5,
    programmable: false, forCeramics: true,
    kilnConfig: "pid_electric_kiln_controller_thermocouple_relay_element_fire",
    bestUse: "pottery_studio_pid_electric_kiln_controller_cone_fire_glaze",
  },
  programmable_ramp: {
    tempAccuracy: 9, throughput: 7, uniformity: 8, rampControl: 10, kcCost: 7,
    programmable: true, forCeramics: true,
    kilnConfig: "programmable_ramp_kiln_controller_multi_segment_profile_soak",
    bestUse: "glass_fusing_programmable_ramp_kiln_controller_segment_anneal",
  },
  gas_atmosphere: {
    tempAccuracy: 8, throughput: 8, uniformity: 9, rampControl: 8, kcCost: 8,
    programmable: true, forCeramics: false,
    kilnConfig: "gas_atmosphere_kiln_controller_reducing_oxidizing_flow_control",
    bestUse: "metal_heat_treat_gas_atmosphere_kiln_controller_reduce_harden",
  },
  microwave_sinter: {
    tempAccuracy: 9, throughput: 5, uniformity: 8, rampControl: 9, kcCost: 10,
    programmable: true, forCeramics: true,
    kilnConfig: "microwave_sinter_kiln_controller_2450mhz_rapid_heat_dense_body",
    bestUse: "advanced_ceramic_microwave_sinter_kiln_controller_rapid_dense",
  },
  rotary_kiln: {
    tempAccuracy: 6, throughput: 10, uniformity: 7, rampControl: 6, kcCost: 6,
    programmable: false, forCeramics: false,
    kilnConfig: "rotary_kiln_controller_drum_rotate_continuous_feed_calcine_dry",
    bestUse: "cement_calcine_rotary_kiln_controller_drum_continuous_feed_dry",
  },
};

function get(t: KilnControllerType): KilnControllerData {
  return DATA[t];
}

export const tempAccuracy = (t: KilnControllerType) => get(t).tempAccuracy;
export const throughput = (t: KilnControllerType) => get(t).throughput;
export const uniformity = (t: KilnControllerType) => get(t).uniformity;
export const rampControl = (t: KilnControllerType) => get(t).rampControl;
export const kcCost = (t: KilnControllerType) => get(t).kcCost;
export const programmable = (t: KilnControllerType) => get(t).programmable;
export const forCeramics = (t: KilnControllerType) => get(t).forCeramics;
export const kilnConfig = (t: KilnControllerType) => get(t).kilnConfig;
export const bestUse = (t: KilnControllerType) => get(t).bestUse;
export const kilnControllerTypes = (): KilnControllerType[] =>
  Object.keys(DATA) as KilnControllerType[];
