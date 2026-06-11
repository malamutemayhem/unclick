export type TouchSensor =
  | "projected_cap_self"
  | "projected_cap_mutual"
  | "resistive_4wire"
  | "surface_acoustic_wave"
  | "infrared_grid";

const DATA: Record<TouchSensor, {
  sensitivity: number; multiTouch: number; durability: number;
  opticalClarity: number; touchCost: number; gloveFriendly: boolean;
  forIndustrial: boolean; detection: string; bestUse: string;
}> = {
  projected_cap_self: {
    sensitivity: 8, multiTouch: 3, durability: 7,
    opticalClarity: 9, touchCost: 4, gloveFriendly: false,
    forIndustrial: false, detection: "self_cap_proximity",
    bestUse: "wearable_small_screen",
  },
  projected_cap_mutual: {
    sensitivity: 9, multiTouch: 10, durability: 7,
    opticalClarity: 9, touchCost: 5, gloveFriendly: false,
    forIndustrial: false, detection: "mutual_cap_matrix",
    bestUse: "smartphone_tablet",
  },
  resistive_4wire: {
    sensitivity: 5, multiTouch: 2, durability: 6,
    opticalClarity: 5, touchCost: 2, gloveFriendly: true,
    forIndustrial: true, detection: "pressure_analog_pos",
    bestUse: "pos_terminal_rugged",
  },
  surface_acoustic_wave: {
    sensitivity: 7, multiTouch: 5, durability: 9,
    opticalClarity: 10, touchCost: 7, gloveFriendly: true,
    forIndustrial: true, detection: "saw_attenuation",
    bestUse: "kiosk_public_display",
  },
  infrared_grid: {
    sensitivity: 6, multiTouch: 8, durability: 10,
    opticalClarity: 10, touchCost: 8, gloveFriendly: true,
    forIndustrial: false, detection: "ir_led_photodiode",
    bestUse: "interactive_whiteboard",
  },
};

const get = (t: TouchSensor) => DATA[t];

export const sensitivity = (t: TouchSensor) => get(t).sensitivity;
export const multiTouch = (t: TouchSensor) => get(t).multiTouch;
export const durability = (t: TouchSensor) => get(t).durability;
export const opticalClarity = (t: TouchSensor) => get(t).opticalClarity;
export const touchCost = (t: TouchSensor) => get(t).touchCost;
export const gloveFriendly = (t: TouchSensor) => get(t).gloveFriendly;
export const forIndustrial = (t: TouchSensor) => get(t).forIndustrial;
export const detection = (t: TouchSensor) => get(t).detection;
export const bestUse = (t: TouchSensor) => get(t).bestUse;
export const touchSensors = (): TouchSensor[] => Object.keys(DATA) as TouchSensor[];
