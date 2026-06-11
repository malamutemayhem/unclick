export type EncoderType =
  | "incremental_optical"
  | "absolute_gray_code"
  | "magnetic_hall"
  | "resolver_analog"
  | "capacitive_fine";

const DATA: Record<EncoderType, {
  resolution: number; accuracy: number; speed: number;
  durability: number; encoderCost: number; absolute: boolean;
  forHarsh: boolean; sensing: string; bestUse: string;
}> = {
  incremental_optical: {
    resolution: 8, accuracy: 7, speed: 9,
    durability: 5, encoderCost: 4, absolute: false,
    forHarsh: false, sensing: "led_grating_phototrans",
    bestUse: "cnc_spindle_feedback",
  },
  absolute_gray_code: {
    resolution: 7, accuracy: 8, speed: 6,
    durability: 6, encoderCost: 6, absolute: true,
    forHarsh: false, sensing: "multi_track_optical",
    bestUse: "robot_joint_position",
  },
  magnetic_hall: {
    resolution: 5, accuracy: 5, speed: 8,
    durability: 9, encoderCost: 3, absolute: true,
    forHarsh: true, sensing: "hall_effect_magnet",
    bestUse: "bldc_commutation",
  },
  resolver_analog: {
    resolution: 6, accuracy: 7, speed: 7,
    durability: 10, encoderCost: 5, absolute: true,
    forHarsh: true, sensing: "wound_transformer_excite",
    bestUse: "aerospace_flight_ctrl",
  },
  capacitive_fine: {
    resolution: 10, accuracy: 10, speed: 5,
    durability: 7, encoderCost: 8, absolute: true,
    forHarsh: false, sensing: "pcb_electrode_cap",
    bestUse: "semiconductor_stage",
  },
};

const get = (t: EncoderType) => DATA[t];

export const resolution = (t: EncoderType) => get(t).resolution;
export const accuracy = (t: EncoderType) => get(t).accuracy;
export const speed = (t: EncoderType) => get(t).speed;
export const durability = (t: EncoderType) => get(t).durability;
export const encoderCost = (t: EncoderType) => get(t).encoderCost;
export const absolute = (t: EncoderType) => get(t).absolute;
export const forHarsh = (t: EncoderType) => get(t).forHarsh;
export const sensing = (t: EncoderType) => get(t).sensing;
export const bestUse = (t: EncoderType) => get(t).bestUse;
export const encoderTypes = (): EncoderType[] => Object.keys(DATA) as EncoderType[];
