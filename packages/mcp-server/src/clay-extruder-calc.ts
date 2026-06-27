// clay-extruder-calc - clay extruder types

export type ClayExtruder =
  | "hand_extruder_basic"
  | "wall_mount_lever"
  | "table_mount_gear"
  | "hydraulic_press_power"
  | "slab_extruder_flat";

const DATA: Record<ClayExtruder, {
  forceOutput: number; dieRange: number; consistency: number; setupSpeed: number;
  cost: number; powered: boolean; wallMount: boolean; driveType: string; bestUse: string;
}> = {
  hand_extruder_basic:   { forceOutput: 4, dieRange: 5, consistency: 5, setupSpeed: 9, cost: 3, powered: false, wallMount: false, driveType: "manual_plunger_push", bestUse: "small_coil_extrude" },
  wall_mount_lever:      { forceOutput: 7, dieRange: 7, consistency: 7, setupSpeed: 7, cost: 6, powered: false, wallMount: true, driveType: "lever_arm_press", bestUse: "general_studio_extrude" },
  table_mount_gear:      { forceOutput: 8, dieRange: 8, consistency: 8, setupSpeed: 6, cost: 8, powered: false, wallMount: false, driveType: "geared_crank_drive", bestUse: "heavy_clay_extrude" },
  hydraulic_press_power: { forceOutput: 10, dieRange: 9, consistency: 10, setupSpeed: 5, cost: 10, powered: true, wallMount: false, driveType: "hydraulic_ram_press", bestUse: "production_volume_extrude" },
  slab_extruder_flat:    { forceOutput: 6, dieRange: 4, consistency: 9, setupSpeed: 8, cost: 7, powered: false, wallMount: false, driveType: "roller_slab_press", bestUse: "even_slab_sheet" },
};

const get = (e: ClayExtruder) => DATA[e];
export const forceOutput = (e: ClayExtruder) => get(e).forceOutput;
export const dieRange = (e: ClayExtruder) => get(e).dieRange;
export const consistency = (e: ClayExtruder) => get(e).consistency;
export const setupSpeed = (e: ClayExtruder) => get(e).setupSpeed;
export const extruderCost = (e: ClayExtruder) => get(e).cost;
export const powered = (e: ClayExtruder) => get(e).powered;
export const wallMount = (e: ClayExtruder) => get(e).wallMount;
export const driveType = (e: ClayExtruder) => get(e).driveType;
export const bestUse = (e: ClayExtruder) => get(e).bestUse;
export const clayExtruders = (): ClayExtruder[] => Object.keys(DATA) as ClayExtruder[];
