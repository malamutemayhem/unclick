export type DuctSilencerType =
  | "rectangular_splitter"
  | "circular_pod_inline"
  | "elbow_lined_turn"
  | "acoustic_louver_intake"
  | "reactive_chamber";

interface DuctSilencerData {
  insertion_loss: number;
  pressureDrop: number;
  selfNoise: number;
  lowFreqPerf: number;
  dsCost: number;
  dissipative: boolean;
  forHvac: boolean;
  design: string;
  bestUse: string;
}

const DATA: Record<DuctSilencerType, DuctSilencerData> = {
  rectangular_splitter: {
    insertion_loss: 9, pressureDrop: 5, selfNoise: 7, lowFreqPerf: 6, dsCost: 6,
    dissipative: true, forHvac: true,
    design: "parallel_splitter_baffles_mineral_wool_fill",
    bestUse: "ahu_discharge_supply_duct_broadband_noise",
  },
  circular_pod_inline: {
    insertion_loss: 7, pressureDrop: 7, selfNoise: 8, lowFreqPerf: 5, dsCost: 5,
    dissipative: true, forHvac: true,
    design: "cylindrical_center_pod_annular_absorber_ring",
    bestUse: "inline_fan_duct_circular_system_noise_control",
  },
  elbow_lined_turn: {
    insertion_loss: 6, pressureDrop: 4, selfNoise: 8, lowFreqPerf: 4, dsCost: 4,
    dissipative: true, forHvac: true,
    design: "acoustically_lined_elbow_turning_vane_absorber",
    bestUse: "duct_elbow_combined_direction_change_silencing",
  },
  acoustic_louver_intake: {
    insertion_loss: 8, pressureDrop: 6, selfNoise: 7, lowFreqPerf: 5, dsCost: 7,
    dissipative: true, forHvac: false,
    design: "weather_louver_acoustic_blade_rain_screen_combo",
    bestUse: "generator_room_intake_exhaust_weather_acoustic",
  },
  reactive_chamber: {
    insertion_loss: 7, pressureDrop: 6, selfNoise: 9, lowFreqPerf: 10, dsCost: 8,
    dissipative: false, forHvac: false,
    design: "expansion_chamber_resonator_tuned_reactive",
    bestUse: "engine_exhaust_compressor_low_frequency_tonal",
  },
};

function get(t: DuctSilencerType): DuctSilencerData {
  return DATA[t];
}

export const insertionLoss = (t: DuctSilencerType) => get(t).insertion_loss;
export const pressureDrop = (t: DuctSilencerType) => get(t).pressureDrop;
export const selfNoise = (t: DuctSilencerType) => get(t).selfNoise;
export const lowFreqPerf = (t: DuctSilencerType) => get(t).lowFreqPerf;
export const dsCost = (t: DuctSilencerType) => get(t).dsCost;
export const dissipative = (t: DuctSilencerType) => get(t).dissipative;
export const forHvac = (t: DuctSilencerType) => get(t).forHvac;
export const design = (t: DuctSilencerType) => get(t).design;
export const bestUse = (t: DuctSilencerType) => get(t).bestUse;
export const ductSilencerTypes = (): DuctSilencerType[] =>
  Object.keys(DATA) as DuctSilencerType[];
