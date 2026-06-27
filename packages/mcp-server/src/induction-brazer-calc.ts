export type InductionBrazerType =
  | "manual_coil"
  | "rotary_index"
  | "conveyor_inline"
  | "vacuum_braze"
  | "atmosphere_braze";

interface InductionBrazerData {
  jointQuality: number;
  throughput: number;
  heatControl: number;
  repeatability: number;
  ibCost: number;
  automated: boolean;
  forPrecision: boolean;
  brazerConfig: string;
  bestUse: string;
}

const DATA: Record<InductionBrazerType, InductionBrazerData> = {
  manual_coil: {
    jointQuality: 7, throughput: 5, heatControl: 7, repeatability: 6, ibCost: 4,
    automated: false, forPrecision: false,
    brazerConfig: "manual_coil_induction_brazer_hand_load_foot_pedal_copper_silver",
    bestUse: "copper_fitting_manual_coil_induction_brazer_hand_load_silver",
  },
  rotary_index: {
    jointQuality: 9, throughput: 9, heatControl: 9, repeatability: 9, ibCost: 8,
    automated: true, forPrecision: true,
    brazerConfig: "rotary_index_induction_brazer_multi_station_auto_load_cycle",
    bestUse: "carbide_tool_rotary_index_induction_brazer_multi_station_auto",
  },
  conveyor_inline: {
    jointQuality: 8, throughput: 10, heatControl: 8, repeatability: 8, ibCost: 7,
    automated: true, forPrecision: false,
    brazerConfig: "conveyor_inline_induction_brazer_belt_feed_continuous_high_vol",
    bestUse: "hvac_joint_conveyor_inline_induction_brazer_belt_continuous",
  },
  vacuum_braze: {
    jointQuality: 10, throughput: 4, heatControl: 10, repeatability: 10, ibCost: 10,
    automated: true, forPrecision: true,
    brazerConfig: "vacuum_induction_brazer_chamber_evacuate_oxide_free_superalloy",
    bestUse: "aerospace_heat_exchanger_vacuum_induction_brazer_oxide_free",
  },
  atmosphere_braze: {
    jointQuality: 9, throughput: 7, heatControl: 8, repeatability: 9, ibCost: 7,
    automated: true, forPrecision: false,
    brazerConfig: "atmosphere_induction_brazer_nitrogen_hydrogen_shield_flux_free",
    bestUse: "auto_radiator_atmosphere_induction_brazer_shield_flux_free",
  },
};

function get(t: InductionBrazerType): InductionBrazerData {
  return DATA[t];
}

export const jointQuality = (t: InductionBrazerType) => get(t).jointQuality;
export const throughput = (t: InductionBrazerType) => get(t).throughput;
export const heatControl = (t: InductionBrazerType) => get(t).heatControl;
export const repeatability = (t: InductionBrazerType) => get(t).repeatability;
export const ibCost = (t: InductionBrazerType) => get(t).ibCost;
export const automated = (t: InductionBrazerType) => get(t).automated;
export const forPrecision = (t: InductionBrazerType) => get(t).forPrecision;
export const brazerConfig = (t: InductionBrazerType) => get(t).brazerConfig;
export const bestUse = (t: InductionBrazerType) => get(t).bestUse;
export const inductionBrazerTypes = (): InductionBrazerType[] =>
  Object.keys(DATA) as InductionBrazerType[];
