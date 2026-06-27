export type DcMotorBrushType =
  | "series_wound_traction"
  | "shunt_wound_constant"
  | "compound_wound_mixed"
  | "permanent_magnet_small"
  | "universal_motor_ac_dc";

interface DcMotorBrushData {
  speedRange: number;
  torqueControl: number;
  efficiency: number;
  brushLife: number;
  dmCost: number;
  selfExcited: boolean;
  forTraction: boolean;
  winding: string;
  bestUse: string;
}

const DATA: Record<DcMotorBrushType, DcMotorBrushData> = {
  series_wound_traction: {
    speedRange: 10, torqueControl: 8, efficiency: 7, brushLife: 5, dmCost: 5,
    selfExcited: true, forTraction: true,
    winding: "field_in_series_with_armature_high_start_torque",
    bestUse: "electric_traction_crane_hoist_starter_motor",
  },
  shunt_wound_constant: {
    speedRange: 7, torqueControl: 9, efficiency: 8, brushLife: 7, dmCost: 6,
    selfExcited: true, forTraction: false,
    winding: "field_parallel_with_armature_constant_speed",
    bestUse: "machine_tool_lathe_mill_constant_speed_drive",
  },
  compound_wound_mixed: {
    speedRange: 8, torqueControl: 8, efficiency: 7, brushLife: 6, dmCost: 7,
    selfExcited: true, forTraction: true,
    winding: "series_plus_shunt_field_combined_character",
    bestUse: "elevator_rolling_mill_press_punch_variable",
  },
  permanent_magnet_small: {
    speedRange: 6, torqueControl: 7, efficiency: 8, brushLife: 7, dmCost: 3,
    selfExcited: false, forTraction: false,
    winding: "permanent_magnet_field_armature_commutator",
    bestUse: "automotive_accessory_toy_small_appliance",
  },
  universal_motor_ac_dc: {
    speedRange: 10, torqueControl: 5, efficiency: 6, brushLife: 4, dmCost: 3,
    selfExcited: true, forTraction: false,
    winding: "series_wound_laminated_field_ac_dc_capable",
    bestUse: "power_tool_vacuum_cleaner_blender_high_rpm",
  },
};

function get(t: DcMotorBrushType): DcMotorBrushData {
  return DATA[t];
}

export const speedRange = (t: DcMotorBrushType) => get(t).speedRange;
export const torqueControl = (t: DcMotorBrushType) => get(t).torqueControl;
export const efficiency = (t: DcMotorBrushType) => get(t).efficiency;
export const brushLife = (t: DcMotorBrushType) => get(t).brushLife;
export const dmCost = (t: DcMotorBrushType) => get(t).dmCost;
export const selfExcited = (t: DcMotorBrushType) => get(t).selfExcited;
export const forTraction = (t: DcMotorBrushType) => get(t).forTraction;
export const winding = (t: DcMotorBrushType) => get(t).winding;
export const bestUse = (t: DcMotorBrushType) => get(t).bestUse;
export const dcMotorBrushTypes = (): DcMotorBrushType[] =>
  Object.keys(DATA) as DcMotorBrushType[];
