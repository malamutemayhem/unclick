export type BarrelJackType =
  | "dc_5521_standard"
  | "dc_5525_thick_pin"
  | "dc_3515_mini_barrel"
  | "locking_barrel_twist"
  | "right_angle_pcb_mount";

const DATA: Record<BarrelJackType, {
  currentRating: number; contactReliable: number; insertCycles: number;
  sizeCompact: number; jackCost: number; locking: boolean;
  pcbMount: boolean; pinSize: string; bestUse: string;
}> = {
  dc_5521_standard: { currentRating: 7, contactReliable: 7, insertCycles: 7, sizeCompact: 5, jackCost: 1, locking: false, pcbMount: true, pinSize: "2_1mm_center_pin", bestUse: "arduino_power_input" },
  dc_5525_thick_pin: { currentRating: 8, contactReliable: 8, insertCycles: 8, sizeCompact: 5, jackCost: 2, locking: false, pcbMount: true, pinSize: "2_5mm_center_pin", bestUse: "laptop_dc_adapter" },
  dc_3515_mini_barrel: { currentRating: 4, contactReliable: 5, insertCycles: 6, sizeCompact: 9, jackCost: 2, locking: false, pcbMount: true, pinSize: "1_5mm_center_pin", bestUse: "small_sensor_power" },
  locking_barrel_twist: { currentRating: 9, contactReliable: 10, insertCycles: 9, sizeCompact: 3, jackCost: 5, locking: true, pcbMount: false, pinSize: "2_1mm_locking_ring", bestUse: "field_equipment_power" },
  right_angle_pcb_mount: { currentRating: 7, contactReliable: 7, insertCycles: 7, sizeCompact: 7, jackCost: 2, locking: false, pcbMount: true, pinSize: "2_1mm_right_angle", bestUse: "low_profile_board_power" },
};

const get = (t: BarrelJackType) => DATA[t];

export const currentRating = (t: BarrelJackType) => get(t).currentRating;
export const contactReliable = (t: BarrelJackType) => get(t).contactReliable;
export const insertCycles = (t: BarrelJackType) => get(t).insertCycles;
export const sizeCompact = (t: BarrelJackType) => get(t).sizeCompact;
export const jackCost = (t: BarrelJackType) => get(t).jackCost;
export const locking = (t: BarrelJackType) => get(t).locking;
export const pcbMount = (t: BarrelJackType) => get(t).pcbMount;
export const pinSize = (t: BarrelJackType) => get(t).pinSize;
export const bestUse = (t: BarrelJackType) => get(t).bestUse;
export const barrelJacks = (): BarrelJackType[] => Object.keys(DATA) as BarrelJackType[];
