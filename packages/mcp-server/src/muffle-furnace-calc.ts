export type MuffleFurnaceType =
  | "electric_muffle"
  | "programmable_muffle"
  | "high_temp_muffle"
  | "vacuum_muffle"
  | "clean_room_muffle";

interface MuffleFurnaceData {
  maxTemp: number;
  throughput: number;
  uniformity: number;
  rampRate: number;
  mfCost: number;
  programmable: boolean;
  forAsh: boolean;
  furnaceConfig: string;
  bestUse: string;
}

const DATA: Record<MuffleFurnaceType, MuffleFurnaceData> = {
  electric_muffle: {
    maxTemp: 6, throughput: 8, uniformity: 7, rampRate: 6, mfCost: 3,
    programmable: false, forAsh: true,
    furnaceConfig: "electric_muffle_furnace_ceramic_chamber_resistance_heating",
    bestUse: "ashing_ignition_electric_muffle_furnace_simple_lab_routine",
  },
  programmable_muffle: {
    maxTemp: 7, throughput: 8, uniformity: 8, rampRate: 8, mfCost: 5,
    programmable: true, forAsh: true,
    furnaceConfig: "programmable_muffle_furnace_pid_ramp_soak_profile_controlled",
    bestUse: "heat_treat_programmable_muffle_furnace_ramp_soak_profile_anneal",
  },
  high_temp_muffle: {
    maxTemp: 10, throughput: 6, uniformity: 7, rampRate: 5, mfCost: 8,
    programmable: true, forAsh: false,
    furnaceConfig: "high_temp_muffle_furnace_mosi2_element_1800c_ceramic_sinter",
    bestUse: "ceramic_sinter_high_temp_muffle_furnace_mosi2_element_1800c",
  },
  vacuum_muffle: {
    maxTemp: 8, throughput: 5, uniformity: 9, rampRate: 7, mfCost: 9,
    programmable: true, forAsh: false,
    furnaceConfig: "vacuum_muffle_furnace_sealed_retort_inert_atmosphere_no_oxide",
    bestUse: "brazing_vacuum_muffle_furnace_inert_atmosphere_oxide_free_joint",
  },
  clean_room_muffle: {
    maxTemp: 7, throughput: 7, uniformity: 9, rampRate: 7, mfCost: 7,
    programmable: true, forAsh: false,
    furnaceConfig: "clean_room_muffle_furnace_hepa_filtered_low_particle_process",
    bestUse: "semiconductor_clean_room_muffle_furnace_low_particle_anneal",
  },
};

function get(t: MuffleFurnaceType): MuffleFurnaceData {
  return DATA[t];
}

export const maxTemp = (t: MuffleFurnaceType) => get(t).maxTemp;
export const throughput = (t: MuffleFurnaceType) => get(t).throughput;
export const uniformity = (t: MuffleFurnaceType) => get(t).uniformity;
export const rampRate = (t: MuffleFurnaceType) => get(t).rampRate;
export const mfCost = (t: MuffleFurnaceType) => get(t).mfCost;
export const programmable = (t: MuffleFurnaceType) => get(t).programmable;
export const forAsh = (t: MuffleFurnaceType) => get(t).forAsh;
export const furnaceConfig = (t: MuffleFurnaceType) => get(t).furnaceConfig;
export const bestUse = (t: MuffleFurnaceType) => get(t).bestUse;
export const muffleFurnaceTypes = (): MuffleFurnaceType[] =>
  Object.keys(DATA) as MuffleFurnaceType[];
