export type TimingMachineType =
  | "mechanical_listen_basic"
  | "electronic_micro_phone"
  | "digital_display_modern"
  | "multi_position_auto"
  | "computer_connect_full";

const specs: Record<TimingMachineType, {
  rateAccuracy: number; beatError: number; positionTest: number;
  dataRecord: number; cost: number; digital: boolean; multiPosition: boolean;
  sensorType: string; use: string;
}> = {
  mechanical_listen_basic: {
    rateAccuracy: 60, beatError: 50, positionTest: 35,
    dataRecord: 20, cost: 30, digital: false, multiPosition: false,
    sensorType: "ear_listen_direct", use: "basic_rate_check",
  },
  electronic_micro_phone: {
    rateAccuracy: 82, beatError: 78, positionTest: 55,
    dataRecord: 60, cost: 200, digital: false, multiPosition: false,
    sensorType: "piezo_microphone", use: "standard_rate_check",
  },
  digital_display_modern: {
    rateAccuracy: 90, beatError: 88, positionTest: 72,
    dataRecord: 80, cost: 400, digital: true, multiPosition: false,
    sensorType: "precision_piezo_amp", use: "accurate_rate_test",
  },
  multi_position_auto: {
    rateAccuracy: 92, beatError: 90, positionTest: 95,
    dataRecord: 85, cost: 800, digital: true, multiPosition: true,
    sensorType: "auto_rotate_piezo", use: "full_position_test",
  },
  computer_connect_full: {
    rateAccuracy: 95, beatError: 95, positionTest: 90,
    dataRecord: 95, cost: 1200, digital: true, multiPosition: true,
    sensorType: "usb_precision_sensor", use: "analysis_record_test",
  },
};

export function rateAccuracy(t: TimingMachineType): number { return specs[t].rateAccuracy; }
export function beatError(t: TimingMachineType): number { return specs[t].beatError; }
export function positionTest(t: TimingMachineType): number { return specs[t].positionTest; }
export function dataRecord(t: TimingMachineType): number { return specs[t].dataRecord; }
export function machineCost(t: TimingMachineType): number { return specs[t].cost; }
export function digital(t: TimingMachineType): boolean { return specs[t].digital; }
export function multiPosition(t: TimingMachineType): boolean { return specs[t].multiPosition; }
export function sensorType(t: TimingMachineType): string { return specs[t].sensorType; }
export function bestUse(t: TimingMachineType): string { return specs[t].use; }
export function timingMachines(): TimingMachineType[] { return Object.keys(specs) as TimingMachineType[]; }
