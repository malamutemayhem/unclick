export type VacuumLifterType =
  | "electric_tube"
  | "pneumatic_pad"
  | "self_powered_cup"
  | "crane_mounted_sheet"
  | "cobot_integrated";

interface VacuumLifterData {
  liftCapacity: number;
  speed: number;
  ergonomic: number;
  versatility: number;
  vlCost: number;
  powered: boolean;
  forSheet: boolean;
  suction: string;
  bestUse: string;
}

const DATA: Record<VacuumLifterType, VacuumLifterData> = {
  electric_tube: {
    liftCapacity: 5, speed: 8, ergonomic: 10, versatility: 8, vlCost: 6,
    powered: true, forSheet: false,
    suction: "electric_vacuum_pump_tube_lift_grip_release_single_hand",
    bestUse: "box_carton_bag_pick_place_ergonomic_repetitive_packing",
  },
  pneumatic_pad: {
    liftCapacity: 7, speed: 7, ergonomic: 8, versatility: 7, vlCost: 5,
    powered: true, forSheet: true,
    suction: "venturi_vacuum_generator_pad_array_quick_release_lever",
    bestUse: "sheet_metal_panel_glass_pane_flat_surface_handling_shop",
  },
  self_powered_cup: {
    liftCapacity: 4, speed: 6, ergonomic: 9, versatility: 6, vlCost: 3,
    powered: false, forSheet: true,
    suction: "manual_pump_handle_suction_cup_no_external_power_portable",
    bestUse: "glass_install_window_tile_field_work_portable_no_power",
  },
  crane_mounted_sheet: {
    liftCapacity: 10, speed: 5, ergonomic: 5, versatility: 4, vlCost: 8,
    powered: true, forSheet: true,
    suction: "multi_pad_beam_frame_crane_hook_heavy_sheet_plate_lift",
    bestUse: "heavy_steel_plate_shipyard_panel_large_glass_facade_lift",
  },
  cobot_integrated: {
    liftCapacity: 6, speed: 9, ergonomic: 9, versatility: 10, vlCost: 9,
    powered: true, forSheet: false,
    suction: "robot_arm_end_effector_vacuum_gripper_vision_pick_place",
    bestUse: "automated_pick_pack_assembly_line_robot_arm_end_tooling",
  },
};

function get(t: VacuumLifterType): VacuumLifterData {
  return DATA[t];
}

export const liftCapacity = (t: VacuumLifterType) => get(t).liftCapacity;
export const speed = (t: VacuumLifterType) => get(t).speed;
export const ergonomic = (t: VacuumLifterType) => get(t).ergonomic;
export const versatility = (t: VacuumLifterType) => get(t).versatility;
export const vlCost = (t: VacuumLifterType) => get(t).vlCost;
export const powered = (t: VacuumLifterType) => get(t).powered;
export const forSheet = (t: VacuumLifterType) => get(t).forSheet;
export const suction = (t: VacuumLifterType) => get(t).suction;
export const bestUse = (t: VacuumLifterType) => get(t).bestUse;
export const vacuumLifterTypes = (): VacuumLifterType[] =>
  Object.keys(DATA) as VacuumLifterType[];
