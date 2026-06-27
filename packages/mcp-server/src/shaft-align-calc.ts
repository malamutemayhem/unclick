export type ShaftAlignType =
  | "dial_indicator_rim_face"
  | "reverse_dial_double_bracket"
  | "laser_single_beam"
  | "laser_dual_beam"
  | "optical_telescope_bore";

interface ShaftAlignData {
  accuracy: number;
  speed: number;
  easeOfUse: number;
  range: number;
  saCost: number;
  digital: boolean;
  forLongSpan: boolean;
  sensor: string;
  bestUse: string;
}

const DATA: Record<ShaftAlignType, ShaftAlignData> = {
  dial_indicator_rim_face: {
    accuracy: 6, speed: 4, easeOfUse: 5, range: 6, saCost: 3,
    digital: false, forLongSpan: false,
    sensor: "mechanical_dial_indicator_pair",
    bestUse: "basic_pump_motor_coupling_align",
  },
  reverse_dial_double_bracket: {
    accuracy: 7, speed: 5, easeOfUse: 6, range: 7, saCost: 4,
    digital: false, forLongSpan: false,
    sensor: "dual_dial_reverse_mount_bracket",
    bestUse: "spacer_coupling_long_distance",
  },
  laser_single_beam: {
    accuracy: 9, speed: 9, easeOfUse: 9, range: 8, saCost: 7,
    digital: true, forLongSpan: false,
    sensor: "psd_laser_diode_single_detector",
    bestUse: "standard_horizontal_pump_motor",
  },
  laser_dual_beam: {
    accuracy: 10, speed: 10, easeOfUse: 10, range: 10, saCost: 9,
    digital: true, forLongSpan: true,
    sensor: "dual_laser_ccd_wireless_detector",
    bestUse: "turbine_generator_cardan_shaft",
  },
  optical_telescope_bore: {
    accuracy: 9, speed: 3, easeOfUse: 4, range: 10, saCost: 8,
    digital: false, forLongSpan: true,
    sensor: "alignment_telescope_optical_target",
    bestUse: "bore_alignment_turbine_bearing",
  },
};

function get(t: ShaftAlignType): ShaftAlignData {
  return DATA[t];
}

export const accuracy = (t: ShaftAlignType) => get(t).accuracy;
export const speed = (t: ShaftAlignType) => get(t).speed;
export const easeOfUse = (t: ShaftAlignType) => get(t).easeOfUse;
export const range = (t: ShaftAlignType) => get(t).range;
export const saCost = (t: ShaftAlignType) => get(t).saCost;
export const digital = (t: ShaftAlignType) => get(t).digital;
export const forLongSpan = (t: ShaftAlignType) => get(t).forLongSpan;
export const sensor = (t: ShaftAlignType) => get(t).sensor;
export const bestUse = (t: ShaftAlignType) => get(t).bestUse;
export const shaftAlignTypes = (): ShaftAlignType[] =>
  Object.keys(DATA) as ShaftAlignType[];
