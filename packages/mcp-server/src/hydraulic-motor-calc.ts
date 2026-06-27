export type HydraulicMotorType =
  | "gear_motor"
  | "vane_motor"
  | "axial_piston_bent"
  | "radial_piston_cam"
  | "gerotor_orbital";

interface HydraulicMotorData {
  torqueOutput: number;
  speedRange: number;
  mechanicalEfficiency: number;
  startingTorque: number;
  hmCost: number;
  bidirectional: boolean;
  forLowSpeed: boolean;
  design: string;
  bestUse: string;
}

const DATA: Record<HydraulicMotorType, HydraulicMotorData> = {
  gear_motor: {
    torqueOutput: 5, speedRange: 9, mechanicalEfficiency: 6, startingTorque: 5, hmCost: 3,
    bidirectional: true, forLowSpeed: false,
    design: "external_gear_mesh_high_speed_low_torque_simple_compact",
    bestUse: "fan_drive_conveyor_mixer_general_purpose_moderate_duty",
  },
  vane_motor: {
    torqueOutput: 6, speedRange: 8, mechanicalEfficiency: 7, startingTorque: 6, hmCost: 4,
    bidirectional: true, forLowSpeed: false,
    design: "balanced_vane_rotor_cam_ring_smooth_operation_quiet_run",
    bestUse: "injection_mold_machine_tool_smooth_quiet_medium_torque",
  },
  axial_piston_bent: {
    torqueOutput: 9, speedRange: 9, mechanicalEfficiency: 10, startingTorque: 8, hmCost: 8,
    bidirectional: true, forLowSpeed: false,
    design: "bent_axis_piston_barrel_high_efficiency_variable_angle",
    bestUse: "excavator_swing_winch_drive_high_power_density_mobile",
  },
  radial_piston_cam: {
    torqueOutput: 10, speedRange: 4, mechanicalEfficiency: 9, startingTorque: 10, hmCost: 9,
    bidirectional: true, forLowSpeed: true,
    design: "radial_piston_cam_lobe_ring_high_torque_low_speed_direct",
    bestUse: "wheel_drive_track_drive_conveyor_direct_no_gearbox_needed",
  },
  gerotor_orbital: {
    torqueOutput: 8, speedRange: 5, mechanicalEfficiency: 7, startingTorque: 9, hmCost: 5,
    bidirectional: true, forLowSpeed: true,
    design: "gerotor_star_orbit_within_ring_gear_compact_high_torque",
    bestUse: "steering_motor_auger_drive_lawn_mower_compact_low_speed",
  },
};

function get(t: HydraulicMotorType): HydraulicMotorData {
  return DATA[t];
}

export const torqueOutput = (t: HydraulicMotorType) => get(t).torqueOutput;
export const speedRange = (t: HydraulicMotorType) => get(t).speedRange;
export const mechanicalEfficiency = (t: HydraulicMotorType) => get(t).mechanicalEfficiency;
export const startingTorque = (t: HydraulicMotorType) => get(t).startingTorque;
export const hmCost = (t: HydraulicMotorType) => get(t).hmCost;
export const bidirectional = (t: HydraulicMotorType) => get(t).bidirectional;
export const forLowSpeed = (t: HydraulicMotorType) => get(t).forLowSpeed;
export const design = (t: HydraulicMotorType) => get(t).design;
export const bestUse = (t: HydraulicMotorType) => get(t).bestUse;
export const hydraulicMotorTypes = (): HydraulicMotorType[] =>
  Object.keys(DATA) as HydraulicMotorType[];
