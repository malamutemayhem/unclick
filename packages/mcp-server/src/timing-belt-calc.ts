export type TimingBeltType =
  | "htd_curvilinear_8m"
  | "gt3_modified_curvilinear"
  | "at_metric_polyurethane"
  | "xl_trapezoidal_light"
  | "stpd_double_sided";

interface TimingBeltData {
  torque: number;
  speed: number;
  precision: number;
  life: number;
  tbCost: number;
  doubleSided: boolean;
  forServo: boolean;
  tooth: string;
  bestUse: string;
}

const DATA: Record<TimingBeltType, TimingBeltData> = {
  htd_curvilinear_8m: {
    torque: 9, speed: 8, precision: 7, life: 8, tbCost: 5,
    doubleSided: false, forServo: false,
    tooth: "curvilinear_8mm_pitch_neoprene",
    bestUse: "heavy_conveyor_machine_drive",
  },
  gt3_modified_curvilinear: {
    torque: 8, speed: 9, precision: 10, life: 9, tbCost: 7,
    doubleSided: false, forServo: true,
    tooth: "modified_curvilinear_3mm_low_backlash",
    bestUse: "servo_axis_cnc_precision_index",
  },
  at_metric_polyurethane: {
    torque: 10, speed: 7, precision: 8, life: 10, tbCost: 8,
    doubleSided: false, forServo: true,
    tooth: "metric_at_polyurethane_steel_cord",
    bestUse: "linear_drive_gantry_positioning",
  },
  xl_trapezoidal_light: {
    torque: 4, speed: 10, precision: 6, life: 6, tbCost: 3,
    doubleSided: false, forServo: false,
    tooth: "trapezoidal_xl_5mm_fiberglass",
    bestUse: "office_equipment_small_instrument",
  },
  stpd_double_sided: {
    torque: 8, speed: 8, precision: 7, life: 7, tbCost: 6,
    doubleSided: true, forServo: false,
    tooth: "double_sided_htd_serpentine_path",
    bestUse: "multi_shaft_serpentine_counter_rotate",
  },
};

function get(t: TimingBeltType): TimingBeltData {
  return DATA[t];
}

export const torque = (t: TimingBeltType) => get(t).torque;
export const speed = (t: TimingBeltType) => get(t).speed;
export const precision = (t: TimingBeltType) => get(t).precision;
export const life = (t: TimingBeltType) => get(t).life;
export const tbCost = (t: TimingBeltType) => get(t).tbCost;
export const doubleSided = (t: TimingBeltType) => get(t).doubleSided;
export const forServo = (t: TimingBeltType) => get(t).forServo;
export const tooth = (t: TimingBeltType) => get(t).tooth;
export const bestUse = (t: TimingBeltType) => get(t).bestUse;
export const timingBeltTypes = (): TimingBeltType[] =>
  Object.keys(DATA) as TimingBeltType[];
