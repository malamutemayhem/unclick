export type ScaraRobotType =
  | "standard_four_axis"
  | "ceiling_mount_inverted"
  | "cleanroom_iso_class"
  | "high_speed_assembly"
  | "long_arm_extended_reach";

interface ScaraRobotData {
  speed: number;
  precision: number;
  payload: number;
  reach: number;
  srCost: number;
  cleanroom: boolean;
  forElectronics: boolean;
  drive: string;
  bestUse: string;
}

const DATA: Record<ScaraRobotType, ScaraRobotData> = {
  standard_four_axis: {
    speed: 9, precision: 9, payload: 7, reach: 7, srCost: 6,
    cleanroom: false, forElectronics: true,
    drive: "servo_harmonic_belt_direct",
    bestUse: "pcb_load_screw_insert_dispense",
  },
  ceiling_mount_inverted: {
    speed: 9, precision: 8, payload: 6, reach: 7, srCost: 7,
    cleanroom: false, forElectronics: false,
    drive: "servo_harmonic_inverted_mount",
    bestUse: "conveyor_access_floor_space_save",
  },
  cleanroom_iso_class: {
    speed: 8, precision: 10, payload: 5, reach: 6, srCost: 9,
    cleanroom: true, forElectronics: true,
    drive: "direct_drive_sealed_iso_class_5",
    bestUse: "wafer_handling_flat_panel_clean",
  },
  high_speed_assembly: {
    speed: 10, precision: 9, payload: 4, reach: 5, srCost: 8,
    cleanroom: false, forElectronics: true,
    drive: "direct_drive_high_accel_motor",
    bestUse: "smt_component_placement_rapid",
  },
  long_arm_extended_reach: {
    speed: 7, precision: 7, payload: 9, reach: 10, srCost: 7,
    cleanroom: false, forElectronics: false,
    drive: "servo_belt_extended_arm_pair",
    bestUse: "pallet_transfer_large_part_load",
  },
};

function get(t: ScaraRobotType): ScaraRobotData {
  return DATA[t];
}

export const speed = (t: ScaraRobotType) => get(t).speed;
export const precision = (t: ScaraRobotType) => get(t).precision;
export const payload = (t: ScaraRobotType) => get(t).payload;
export const reach = (t: ScaraRobotType) => get(t).reach;
export const srCost = (t: ScaraRobotType) => get(t).srCost;
export const cleanroom = (t: ScaraRobotType) => get(t).cleanroom;
export const forElectronics = (t: ScaraRobotType) => get(t).forElectronics;
export const drive = (t: ScaraRobotType) => get(t).drive;
export const bestUse = (t: ScaraRobotType) => get(t).bestUse;
export const scaraRobotTypes = (): ScaraRobotType[] =>
  Object.keys(DATA) as ScaraRobotType[];
