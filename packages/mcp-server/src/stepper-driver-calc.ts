export type StepperDriver =
  | "full_step_wave"
  | "half_step_interleave"
  | "microstep_256"
  | "closed_loop_servo"
  | "silent_stealthchop";

const DATA: Record<StepperDriver, {
  resolution: number; torque: number; noise: number;
  efficiency: number; driverCost: number; closedLoop: boolean;
  for3dPrint: boolean; drive: string; bestUse: string;
}> = {
  full_step_wave: {
    resolution: 2, torque: 8, noise: 2,
    efficiency: 5, driverCost: 2, closedLoop: false,
    for3dPrint: false, drive: "full_step_h_bridge",
    bestUse: "conveyor_belt_index",
  },
  half_step_interleave: {
    resolution: 4, torque: 6, noise: 4,
    efficiency: 5, driverCost: 3, closedLoop: false,
    for3dPrint: false, drive: "half_step_8state",
    bestUse: "valve_positioner",
  },
  microstep_256: {
    resolution: 9, torque: 5, noise: 7,
    efficiency: 7, driverCost: 5, closedLoop: false,
    for3dPrint: true, drive: "sine_cosine_dac_chop",
    bestUse: "3d_printer_axis",
  },
  closed_loop_servo: {
    resolution: 10, torque: 9, noise: 8,
    efficiency: 9, driverCost: 8, closedLoop: true,
    for3dPrint: false, drive: "encoder_foc_hybrid",
    bestUse: "cnc_router_z_axis",
  },
  silent_stealthchop: {
    resolution: 8, torque: 7, noise: 10,
    efficiency: 8, driverCost: 6, closedLoop: false,
    for3dPrint: true, drive: "voltage_mode_spread",
    bestUse: "desktop_3d_printer",
  },
};

const get = (t: StepperDriver) => DATA[t];

export const resolution = (t: StepperDriver) => get(t).resolution;
export const torque = (t: StepperDriver) => get(t).torque;
export const noise = (t: StepperDriver) => get(t).noise;
export const efficiency = (t: StepperDriver) => get(t).efficiency;
export const driverCost = (t: StepperDriver) => get(t).driverCost;
export const closedLoop = (t: StepperDriver) => get(t).closedLoop;
export const for3dPrint = (t: StepperDriver) => get(t).for3dPrint;
export const drive = (t: StepperDriver) => get(t).drive;
export const bestUse = (t: StepperDriver) => get(t).bestUse;
export const stepperDrivers = (): StepperDriver[] => Object.keys(DATA) as StepperDriver[];
