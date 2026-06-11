export type HapticDriver =
  | "erm_eccentric_mass"
  | "lra_linear_res"
  | "piezo_ceramic"
  | "voice_coil_hd"
  | "electroactive_polymer";

const DATA: Record<HapticDriver, {
  responseTime: number; bandwidth: number; force: number;
  powerDraw: number; hapticCost: number; waveformControl: boolean;
  forPhone: boolean; actuator: string; bestUse: string;
}> = {
  erm_eccentric_mass: {
    responseTime: 3, bandwidth: 2, force: 6,
    powerDraw: 4, hapticCost: 2, waveformControl: false,
    forPhone: false, actuator: "dc_motor_offset_mass",
    bestUse: "gamepad_rumble",
  },
  lra_linear_res: {
    responseTime: 8, bandwidth: 6, force: 5,
    powerDraw: 7, hapticCost: 4, waveformControl: true,
    forPhone: true, actuator: "spring_mass_coil",
    bestUse: "phone_taptic_engine",
  },
  piezo_ceramic: {
    responseTime: 10, bandwidth: 10, force: 7,
    powerDraw: 9, hapticCost: 7, waveformControl: true,
    forPhone: false, actuator: "pzt_bending_disc",
    bestUse: "automotive_touchpad",
  },
  voice_coil_hd: {
    responseTime: 7, bandwidth: 8, force: 9,
    powerDraw: 3, hapticCost: 6, waveformControl: true,
    forPhone: false, actuator: "moving_coil_magnet",
    bestUse: "vr_controller_glove",
  },
  electroactive_polymer: {
    responseTime: 6, bandwidth: 5, force: 4,
    powerDraw: 8, hapticCost: 8, waveformControl: true,
    forPhone: false, actuator: "deap_film_stretch",
    bestUse: "wearable_skin_patch",
  },
};

const get = (t: HapticDriver) => DATA[t];

export const responseTime = (t: HapticDriver) => get(t).responseTime;
export const bandwidth = (t: HapticDriver) => get(t).bandwidth;
export const force = (t: HapticDriver) => get(t).force;
export const powerDraw = (t: HapticDriver) => get(t).powerDraw;
export const hapticCost = (t: HapticDriver) => get(t).hapticCost;
export const waveformControl = (t: HapticDriver) => get(t).waveformControl;
export const forPhone = (t: HapticDriver) => get(t).forPhone;
export const actuator = (t: HapticDriver) => get(t).actuator;
export const bestUse = (t: HapticDriver) => get(t).bestUse;
export const hapticDrivers = (): HapticDriver[] => Object.keys(DATA) as HapticDriver[];
