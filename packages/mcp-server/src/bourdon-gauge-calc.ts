export type BourdonGaugeType =
  | "c_tube_standard"
  | "spiral_tube_recorder"
  | "helical_tube_high_press"
  | "duplex_differential"
  | "liquid_filled_damped";

interface BourdonGaugeData {
  accuracy: number;
  pressureRange: number;
  vibrationResist: number;
  readability: number;
  bgCost: number;
  localRead: boolean;
  forHighPress: boolean;
  tube: string;
  bestUse: string;
}

const DATA: Record<BourdonGaugeType, BourdonGaugeData> = {
  c_tube_standard: {
    accuracy: 6, pressureRange: 6, vibrationResist: 4, readability: 7, bgCost: 2,
    localRead: true, forHighPress: false,
    tube: "single_c_bend_phosphor_bronze_brass",
    bestUse: "general_purpose_pipe_tank_local_read",
  },
  spiral_tube_recorder: {
    accuracy: 8, pressureRange: 5, vibrationResist: 5, readability: 6, bgCost: 5,
    localRead: true, forHighPress: false,
    tube: "multi_turn_spiral_amplified_tip_travel",
    bestUse: "chart_recorder_continuous_pressure_log",
  },
  helical_tube_high_press: {
    accuracy: 7, pressureRange: 10, vibrationResist: 6, readability: 6, bgCost: 6,
    localRead: true, forHighPress: true,
    tube: "multi_coil_helical_stainless_high_press",
    bestUse: "hydraulic_high_pressure_system_monitor",
  },
  duplex_differential: {
    accuracy: 7, pressureRange: 7, vibrationResist: 5, readability: 5, bgCost: 7,
    localRead: true, forHighPress: false,
    tube: "dual_element_differential_movement_link",
    bestUse: "filter_differential_pressure_drop_check",
  },
  liquid_filled_damped: {
    accuracy: 6, pressureRange: 7, vibrationResist: 10, readability: 8, bgCost: 3,
    localRead: true, forHighPress: false,
    tube: "c_tube_glycerin_filled_case_dampen",
    bestUse: "pump_compressor_vibrate_pulsate_smooth",
  },
};

function get(t: BourdonGaugeType): BourdonGaugeData {
  return DATA[t];
}

export const accuracy = (t: BourdonGaugeType) => get(t).accuracy;
export const pressureRange = (t: BourdonGaugeType) => get(t).pressureRange;
export const vibrationResist = (t: BourdonGaugeType) => get(t).vibrationResist;
export const readability = (t: BourdonGaugeType) => get(t).readability;
export const bgCost = (t: BourdonGaugeType) => get(t).bgCost;
export const localRead = (t: BourdonGaugeType) => get(t).localRead;
export const forHighPress = (t: BourdonGaugeType) => get(t).forHighPress;
export const tube = (t: BourdonGaugeType) => get(t).tube;
export const bestUse = (t: BourdonGaugeType) => get(t).bestUse;
export const bourdonGaugeTypes = (): BourdonGaugeType[] =>
  Object.keys(DATA) as BourdonGaugeType[];
