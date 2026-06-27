export type EndEffectorType =
  | "parallel_jaw_gripper"
  | "vacuum_suction_cup"
  | "magnetic_plate_lift"
  | "soft_adaptive_finger"
  | "tool_changer_auto";

interface EndEffectorData {
  gripForce: number;
  versatility: number;
  speed: number;
  delicacy: number;
  eeCost: number;
  contactless: boolean;
  forFragile: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<EndEffectorType, EndEffectorData> = {
  parallel_jaw_gripper: {
    gripForce: 8, versatility: 6, speed: 8, delicacy: 5, eeCost: 4,
    contactless: false, forFragile: false,
    mechanism: "pneumatic_or_electric_parallel_jaw_clamp_force",
    bestUse: "machine_tending_part_transfer_rigid_object_pickup",
  },
  vacuum_suction_cup: {
    gripForce: 6, versatility: 8, speed: 9, delicacy: 7, eeCost: 3,
    contactless: false, forFragile: true,
    mechanism: "venturi_or_pump_vacuum_suction_cup_flat_surface",
    bestUse: "box_handling_sheet_metal_glass_panel_carton_pick",
  },
  magnetic_plate_lift: {
    gripForce: 9, versatility: 3, speed: 9, delicacy: 2, eeCost: 5,
    contactless: false, forFragile: false,
    mechanism: "electro_permanent_magnet_ferrous_material_only",
    bestUse: "steel_sheet_handling_stamping_press_load_unload",
  },
  soft_adaptive_finger: {
    gripForce: 4, versatility: 10, speed: 6, delicacy: 10, eeCost: 7,
    contactless: false, forFragile: true,
    mechanism: "silicone_elastomer_pneumatic_inflate_conform_grip",
    bestUse: "food_handling_fruit_picking_lab_sample_delicate",
  },
  tool_changer_auto: {
    gripForce: 7, versatility: 10, speed: 5, delicacy: 6, eeCost: 9,
    contactless: false, forFragile: false,
    mechanism: "pneumatic_lock_multi_tool_dock_quick_swap_utility",
    bestUse: "multi_task_cell_weld_then_grind_then_inspect_flex",
  },
};

function get(t: EndEffectorType): EndEffectorData {
  return DATA[t];
}

export const gripForce = (t: EndEffectorType) => get(t).gripForce;
export const versatility = (t: EndEffectorType) => get(t).versatility;
export const speed = (t: EndEffectorType) => get(t).speed;
export const delicacy = (t: EndEffectorType) => get(t).delicacy;
export const eeCost = (t: EndEffectorType) => get(t).eeCost;
export const contactless = (t: EndEffectorType) => get(t).contactless;
export const forFragile = (t: EndEffectorType) => get(t).forFragile;
export const mechanism = (t: EndEffectorType) => get(t).mechanism;
export const bestUse = (t: EndEffectorType) => get(t).bestUse;
export const endEffectorTypes = (): EndEffectorType[] =>
  Object.keys(DATA) as EndEffectorType[];
