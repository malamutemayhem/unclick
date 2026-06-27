export type FrictionStirWeldType =
  | "conventional_butt"
  | "bobbin_tool"
  | "self_reacting"
  | "friction_stir_spot"
  | "robotic_fsw";

interface FrictionStirWeldData {
  jointStrength: number;
  speed: number;
  distortion: number;
  materialRange: number;
  fwCost: number;
  solidState: boolean;
  forAluminum: boolean;
  tool: string;
  bestUse: string;
}

const DATA: Record<FrictionStirWeldType, FrictionStirWeldData> = {
  conventional_butt: {
    jointStrength: 9, speed: 7, distortion: 9, materialRange: 7, fwCost: 7,
    solidState: true, forAluminum: true,
    tool: "rotating_shoulder_pin_tool_plunge_traverse_forge_weld",
    bestUse: "aluminum_plate_butt_joint_aerospace_panel_ship_hull_rail",
  },
  bobbin_tool: {
    jointStrength: 9, speed: 8, distortion: 10, materialRange: 6, fwCost: 8,
    solidState: true, forAluminum: true,
    tool: "double_shoulder_bobbin_self_reacting_no_backing_bar_need",
    bestUse: "hollow_extrusion_panel_floor_deck_no_root_flaw_full_weld",
  },
  self_reacting: {
    jointStrength: 8, speed: 6, distortion: 9, materialRange: 5, fwCost: 9,
    solidState: true, forAluminum: true,
    tool: "retractable_pin_self_react_no_backing_fixture_adaptive",
    bestUse: "curved_panel_complex_path_variable_thickness_aerospace",
  },
  friction_stir_spot: {
    jointStrength: 6, speed: 10, distortion: 8, materialRange: 8, fwCost: 5,
    solidState: true, forAluminum: true,
    tool: "plunge_rotate_retract_spot_weld_no_traverse_lap_joint",
    bestUse: "automotive_body_panel_lap_joint_rivet_replacement_light",
  },
  robotic_fsw: {
    jointStrength: 8, speed: 7, distortion: 8, materialRange: 7, fwCost: 10,
    solidState: true, forAluminum: true,
    tool: "six_axis_robot_arm_force_controlled_fsw_head_3d_path",
    bestUse: "complex_3d_geometry_automotive_frame_multi_axis_weld_path",
  },
};

function get(t: FrictionStirWeldType): FrictionStirWeldData {
  return DATA[t];
}

export const jointStrength = (t: FrictionStirWeldType) => get(t).jointStrength;
export const speed = (t: FrictionStirWeldType) => get(t).speed;
export const distortion = (t: FrictionStirWeldType) => get(t).distortion;
export const materialRange = (t: FrictionStirWeldType) => get(t).materialRange;
export const fwCost = (t: FrictionStirWeldType) => get(t).fwCost;
export const solidState = (t: FrictionStirWeldType) => get(t).solidState;
export const forAluminum = (t: FrictionStirWeldType) => get(t).forAluminum;
export const tool = (t: FrictionStirWeldType) => get(t).tool;
export const bestUse = (t: FrictionStirWeldType) => get(t).bestUse;
export const frictionStirWeldTypes = (): FrictionStirWeldType[] =>
  Object.keys(DATA) as FrictionStirWeldType[];
