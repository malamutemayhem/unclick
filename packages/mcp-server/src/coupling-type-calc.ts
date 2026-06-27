export type CouplingType =
  | "rigid_flange_keyed"
  | "flexible_jaw_spider"
  | "disc_pack_metallic"
  | "gear_tooth_lubricated"
  | "oldham_slider_parallel";

const DATA: Record<CouplingType, {
  torque: number; misalignment: number; speed: number;
  stiffness: number; cpCost: number; maintenanceFree: boolean;
  forPump: boolean; element: string; bestUse: string;
}> = {
  rigid_flange_keyed: {
    torque: 10, misalignment: 1, speed: 8,
    stiffness: 10, cpCost: 2, maintenanceFree: true,
    forPump: false, element: "bolted_flange_keyway",
    bestUse: "precise_shaft_alignment_genset",
  },
  flexible_jaw_spider: {
    torque: 6, misalignment: 7, speed: 7,
    stiffness: 5, cpCost: 1, maintenanceFree: true,
    forPump: true, element: "elastomer_spider_insert",
    bestUse: "pump_motor_general_purpose",
  },
  disc_pack_metallic: {
    torque: 8, misalignment: 6, speed: 10,
    stiffness: 7, cpCost: 3, maintenanceFree: true,
    forPump: true, element: "stainless_disc_laminate",
    bestUse: "turbomachinery_high_speed_drive",
  },
  gear_tooth_lubricated: {
    torque: 10, misalignment: 5, speed: 6,
    stiffness: 8, cpCost: 4, maintenanceFree: false,
    forPump: false, element: "crowned_gear_mesh_hub",
    bestUse: "rolling_mill_heavy_duty_drive",
  },
  oldham_slider_parallel: {
    torque: 4, misalignment: 9, speed: 5,
    stiffness: 3, cpCost: 2, maintenanceFree: false,
    forPump: false, element: "sliding_disc_cross_slot",
    bestUse: "encoder_feedback_shaft_connect",
  },
};

const get = (t: CouplingType) => DATA[t];

export const torque = (t: CouplingType) => get(t).torque;
export const misalignment = (t: CouplingType) => get(t).misalignment;
export const speed = (t: CouplingType) => get(t).speed;
export const stiffness = (t: CouplingType) => get(t).stiffness;
export const cpCost = (t: CouplingType) => get(t).cpCost;
export const maintenanceFree = (t: CouplingType) => get(t).maintenanceFree;
export const forPump = (t: CouplingType) => get(t).forPump;
export const element = (t: CouplingType) => get(t).element;
export const bestUse = (t: CouplingType) => get(t).bestUse;
export const couplingTypes = (): CouplingType[] => Object.keys(DATA) as CouplingType[];
