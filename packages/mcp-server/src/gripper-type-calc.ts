export type GripperType =
  | "parallel_jaw_pneumatic"
  | "vacuum_suction_cup"
  | "magnetic_permanent"
  | "soft_pneumatic_finger"
  | "adaptive_underactuated";

const DATA: Record<GripperType, {
  graspForce: number; versatility: number; speed: number;
  delicacy: number; grCost: number; contactFree: boolean;
  forFood: boolean; actuation: string; bestUse: string;
}> = {
  parallel_jaw_pneumatic: {
    graspForce: 9, versatility: 5, speed: 8,
    delicacy: 4, grCost: 2, contactFree: false,
    forFood: false, actuation: "double_acting_cylinder_jaw",
    bestUse: "machine_tending_cnc_load",
  },
  vacuum_suction_cup: {
    graspForce: 6, versatility: 8, speed: 10,
    delicacy: 7, grCost: 1, contactFree: false,
    forFood: true, actuation: "venturi_vacuum_generator",
    bestUse: "flat_surface_box_depalletize",
  },
  magnetic_permanent: {
    graspForce: 10, versatility: 3, speed: 9,
    delicacy: 2, grCost: 3, contactFree: true,
    forFood: false, actuation: "switchable_electro_permanent",
    bestUse: "steel_plate_handling_press_feed",
  },
  soft_pneumatic_finger: {
    graspForce: 4, versatility: 9, speed: 5,
    delicacy: 10, grCost: 5, contactFree: false,
    forFood: true, actuation: "inflatable_silicone_bellows",
    bestUse: "fruit_harvest_delicate_grip",
  },
  adaptive_underactuated: {
    graspForce: 7, versatility: 10, speed: 6,
    delicacy: 8, grCost: 6, contactFree: false,
    forFood: true, actuation: "tendon_driven_compliant_link",
    bestUse: "mixed_sku_bin_picking_varied",
  },
};

const get = (t: GripperType) => DATA[t];

export const graspForce = (t: GripperType) => get(t).graspForce;
export const versatility = (t: GripperType) => get(t).versatility;
export const speed = (t: GripperType) => get(t).speed;
export const delicacy = (t: GripperType) => get(t).delicacy;
export const grCost = (t: GripperType) => get(t).grCost;
export const contactFree = (t: GripperType) => get(t).contactFree;
export const forFood = (t: GripperType) => get(t).forFood;
export const actuation = (t: GripperType) => get(t).actuation;
export const bestUse = (t: GripperType) => get(t).bestUse;
export const gripperTypes = (): GripperType[] => Object.keys(DATA) as GripperType[];
