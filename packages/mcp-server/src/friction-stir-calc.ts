export type FrictionStirType =
  | "conventional_fsw"
  | "bobbin_tool_fsw"
  | "self_reacting_fsw"
  | "stationary_shoulder"
  | "friction_stir_spot";

interface FrictionStirData {
  jointStrength: number;
  throughput: number;
  distortion: number;
  materialRange: number;
  fsCost: number;
  solidState: boolean;
  forAluminum: boolean;
  weldConfig: string;
  bestUse: string;
}

const DATA: Record<FrictionStirType, FrictionStirData> = {
  conventional_fsw: {
    jointStrength: 9, throughput: 8, distortion: 8, materialRange: 7, fsCost: 7,
    solidState: true, forAluminum: true,
    weldConfig: "conventional_fsw_rotating_pin_shoulder_plasticize_forge_butt_joint",
    bestUse: "aerospace_panel_conventional_fsw_butt_joint_high_strength_no_filler",
  },
  bobbin_tool_fsw: {
    jointStrength: 9, throughput: 7, distortion: 9, materialRange: 6, fsCost: 8,
    solidState: true, forAluminum: true,
    weldConfig: "bobbin_tool_fsw_double_shoulder_self_react_no_backing_bar_needed",
    bestUse: "ship_hull_bobbin_tool_fsw_double_shoulder_no_backing_bar_both_side",
  },
  self_reacting_fsw: {
    jointStrength: 8, throughput: 7, distortion: 9, materialRange: 5, fsCost: 9,
    solidState: true, forAluminum: true,
    weldConfig: "self_reacting_fsw_adjustable_shoulder_gap_compensate_thick_vary",
    bestUse: "rocket_tank_self_reacting_fsw_adjustable_shoulder_variable_thick",
  },
  stationary_shoulder: {
    jointStrength: 8, throughput: 8, distortion: 10, materialRange: 7, fsCost: 8,
    solidState: true, forAluminum: false,
    weldConfig: "stationary_shoulder_fsw_only_pin_rotate_smooth_surface_low_flash",
    bestUse: "titanium_part_stationary_shoulder_fsw_smooth_surface_low_heat_input",
  },
  friction_stir_spot: {
    jointStrength: 7, throughput: 9, distortion: 8, materialRange: 8, fsCost: 6,
    solidState: true, forAluminum: true,
    weldConfig: "friction_stir_spot_weld_plunge_retract_lap_joint_no_keyhole",
    bestUse: "auto_body_friction_stir_spot_weld_lap_join_dissimilar_metal_light",
  },
};

function get(t: FrictionStirType): FrictionStirData {
  return DATA[t];
}

export const jointStrength = (t: FrictionStirType) => get(t).jointStrength;
export const throughput = (t: FrictionStirType) => get(t).throughput;
export const distortion = (t: FrictionStirType) => get(t).distortion;
export const materialRange = (t: FrictionStirType) => get(t).materialRange;
export const fsCost = (t: FrictionStirType) => get(t).fsCost;
export const solidState = (t: FrictionStirType) => get(t).solidState;
export const forAluminum = (t: FrictionStirType) => get(t).forAluminum;
export const weldConfig = (t: FrictionStirType) => get(t).weldConfig;
export const bestUse = (t: FrictionStirType) => get(t).bestUse;
export const frictionStirTypes = (): FrictionStirType[] =>
  Object.keys(DATA) as FrictionStirType[];
