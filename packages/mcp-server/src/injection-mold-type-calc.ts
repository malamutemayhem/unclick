export type InjectionMoldTypeCalc =
  | "hydraulic_toggle_clamp"
  | "electric_servo_precision"
  | "hybrid_servo_hydraulic"
  | "two_shot_multi_material"
  | "micro_mold_sub_gram";

interface InjectionMoldData {
  precision: number;
  speed: number;
  clampForce: number;
  energy: number;
  imCost: number;
  allElectric: boolean;
  forMedical: boolean;
  drive: string;
  bestUse: string;
}

const DATA: Record<InjectionMoldTypeCalc, InjectionMoldData> = {
  hydraulic_toggle_clamp: {
    precision: 7, speed: 7, clampForce: 10, energy: 5, imCost: 5,
    allElectric: false, forMedical: false,
    drive: "hydraulic_pump_toggle_linkage",
    bestUse: "automotive_bumper_large_housing",
  },
  electric_servo_precision: {
    precision: 10, speed: 9, clampForce: 7, energy: 9, imCost: 8,
    allElectric: true, forMedical: true,
    drive: "servo_motor_ball_screw_direct",
    bestUse: "medical_syringe_optical_lens",
  },
  hybrid_servo_hydraulic: {
    precision: 8, speed: 8, clampForce: 9, energy: 7, imCost: 7,
    allElectric: false, forMedical: false,
    drive: "servo_pump_hydraulic_clamp",
    bestUse: "consumer_electronics_enclosure",
  },
  two_shot_multi_material: {
    precision: 9, speed: 6, clampForce: 8, energy: 6, imCost: 10,
    allElectric: false, forMedical: false,
    drive: "rotary_platen_dual_injection",
    bestUse: "toothbrush_grip_multi_color_part",
  },
  micro_mold_sub_gram: {
    precision: 10, speed: 10, clampForce: 3, energy: 10, imCost: 9,
    allElectric: true, forMedical: true,
    drive: "piezo_electric_micro_plunger",
    bestUse: "micro_gear_hearing_aid_connector",
  },
};

function get(t: InjectionMoldTypeCalc): InjectionMoldData {
  return DATA[t];
}

export const precision = (t: InjectionMoldTypeCalc) => get(t).precision;
export const speed = (t: InjectionMoldTypeCalc) => get(t).speed;
export const clampForce = (t: InjectionMoldTypeCalc) => get(t).clampForce;
export const energy = (t: InjectionMoldTypeCalc) => get(t).energy;
export const imCost = (t: InjectionMoldTypeCalc) => get(t).imCost;
export const allElectric = (t: InjectionMoldTypeCalc) => get(t).allElectric;
export const forMedical = (t: InjectionMoldTypeCalc) => get(t).forMedical;
export const drive = (t: InjectionMoldTypeCalc) => get(t).drive;
export const bestUse = (t: InjectionMoldTypeCalc) => get(t).bestUse;
export const injectionMoldTypeCalcTypes = (): InjectionMoldTypeCalc[] =>
  Object.keys(DATA) as InjectionMoldTypeCalc[];
