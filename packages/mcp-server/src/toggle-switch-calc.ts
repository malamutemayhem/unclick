export type ToggleSwitchType =
  | "spst_on_off_mini"
  | "spdt_on_on_standard"
  | "dpdt_center_off"
  | "momentary_spring_return"
  | "locking_safety_cover";

const DATA: Record<ToggleSwitchType, {
  currentRating: number; actuationForce: number; cycleLife: number;
  sizeCompact: number; switchCost: number; momentary: boolean;
  withGuard: boolean; poleThrow: string; bestUse: string;
}> = {
  spst_on_off_mini: { currentRating: 5, actuationForce: 5, cycleLife: 7, sizeCompact: 8, switchCost: 1, momentary: false, withGuard: false, poleThrow: "single_pole_single_throw", bestUse: "simple_power_toggle" },
  spdt_on_on_standard: { currentRating: 7, actuationForce: 6, cycleLife: 8, sizeCompact: 5, switchCost: 3, momentary: false, withGuard: false, poleThrow: "single_pole_double_throw", bestUse: "direction_select_switch" },
  dpdt_center_off: { currentRating: 8, actuationForce: 7, cycleLife: 7, sizeCompact: 3, switchCost: 5, momentary: false, withGuard: false, poleThrow: "double_pole_double_throw", bestUse: "motor_forward_reverse" },
  momentary_spring_return: { currentRating: 5, actuationForce: 4, cycleLife: 9, sizeCompact: 6, switchCost: 3, momentary: true, withGuard: false, poleThrow: "single_pole_spring_ret", bestUse: "horn_button_press" },
  locking_safety_cover: { currentRating: 9, actuationForce: 8, cycleLife: 8, sizeCompact: 2, switchCost: 7, momentary: false, withGuard: true, poleThrow: "single_pole_guarded", bestUse: "emergency_system_arm" },
};

const get = (t: ToggleSwitchType) => DATA[t];

export const currentRating = (t: ToggleSwitchType) => get(t).currentRating;
export const actuationForce = (t: ToggleSwitchType) => get(t).actuationForce;
export const cycleLife = (t: ToggleSwitchType) => get(t).cycleLife;
export const sizeCompact = (t: ToggleSwitchType) => get(t).sizeCompact;
export const switchCost = (t: ToggleSwitchType) => get(t).switchCost;
export const momentary = (t: ToggleSwitchType) => get(t).momentary;
export const withGuard = (t: ToggleSwitchType) => get(t).withGuard;
export const poleThrow = (t: ToggleSwitchType) => get(t).poleThrow;
export const bestUse = (t: ToggleSwitchType) => get(t).bestUse;
export const toggleSwitches = (): ToggleSwitchType[] => Object.keys(DATA) as ToggleSwitchType[];
