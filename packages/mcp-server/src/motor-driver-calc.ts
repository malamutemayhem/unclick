export type MotorDriverType =
  | "l298n_dual_hbridge"
  | "drv8825_stepper_micro"
  | "tb6612_compact_dual"
  | "bts7960_high_current"
  | "a4988_stepper_basic";

const DATA: Record<MotorDriverType, {
  currentCapacity: number; efficiency: number; heatManage: number;
  controlPrecision: number; driverCost: number; microstepping: boolean;
  forStepper: boolean; bridgeType: string; bestUse: string;
}> = {
  l298n_dual_hbridge: { currentCapacity: 7, efficiency: 5, heatManage: 4, controlPrecision: 5, driverCost: 3, microstepping: false, forStepper: false, bridgeType: "bipolar_bjt_hbridge", bestUse: "dual_dc_motor_robot" },
  drv8825_stepper_micro: { currentCapacity: 6, efficiency: 8, heatManage: 6, controlPrecision: 9, driverCost: 5, microstepping: true, forStepper: true, bridgeType: "mosfet_chopper_drive", bestUse: "cnc_stepper_axis" },
  tb6612_compact_dual: { currentCapacity: 5, efficiency: 9, heatManage: 7, controlPrecision: 7, driverCost: 4, microstepping: false, forStepper: false, bridgeType: "mosfet_hbridge_compact", bestUse: "small_robot_drive" },
  bts7960_high_current: { currentCapacity: 10, efficiency: 8, heatManage: 7, controlPrecision: 5, driverCost: 7, microstepping: false, forStepper: false, bridgeType: "half_bridge_mosfet_pair", bestUse: "heavy_load_actuator" },
  a4988_stepper_basic: { currentCapacity: 5, efficiency: 7, heatManage: 5, controlPrecision: 8, driverCost: 2, microstepping: true, forStepper: true, bridgeType: "bipolar_chopper_drive", bestUse: "3d_printer_stepper" },
};

const get = (t: MotorDriverType) => DATA[t];

export const currentCapacity = (t: MotorDriverType) => get(t).currentCapacity;
export const efficiency = (t: MotorDriverType) => get(t).efficiency;
export const heatManage = (t: MotorDriverType) => get(t).heatManage;
export const controlPrecision = (t: MotorDriverType) => get(t).controlPrecision;
export const driverCost = (t: MotorDriverType) => get(t).driverCost;
export const microstepping = (t: MotorDriverType) => get(t).microstepping;
export const forStepper = (t: MotorDriverType) => get(t).forStepper;
export const bridgeType = (t: MotorDriverType) => get(t).bridgeType;
export const bestUse = (t: MotorDriverType) => get(t).bestUse;
export const motorDrivers = (): MotorDriverType[] => Object.keys(DATA) as MotorDriverType[];
