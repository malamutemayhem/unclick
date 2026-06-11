export type HydraulicPumpType =
  | "gear_external"
  | "vane_balanced"
  | "piston_axial"
  | "piston_radial"
  | "screw_triple";

interface HydraulicPumpData {
  maxPressure: number;
  flowRate: number;
  volumetricEfficiency: number;
  noiseLevel: number;
  hpCost: number;
  variableDisplacement: boolean;
  forHighPressure: boolean;
  pumpingElement: string;
  bestUse: string;
}

const DATA: Record<HydraulicPumpType, HydraulicPumpData> = {
  gear_external: {
    maxPressure: 6, flowRate: 7, volumetricEfficiency: 6, noiseLevel: 4, hpCost: 3,
    variableDisplacement: false, forHighPressure: false,
    pumpingElement: "meshing_spur_gear_pair_trap_fluid_between_teeth_and_casing",
    bestUse: "log_splitter_power_pack_mobile_equipment_simple_low_cost",
  },
  vane_balanced: {
    maxPressure: 7, flowRate: 8, volumetricEfficiency: 8, noiseLevel: 8, hpCost: 5,
    variableDisplacement: true, forHighPressure: false,
    pumpingElement: "sliding_vane_in_slotted_rotor_cam_ring_balanced_pressure",
    bestUse: "machine_tool_injection_mold_quiet_industrial_fixed_install",
  },
  piston_axial: {
    maxPressure: 10, flowRate: 9, volumetricEfficiency: 10, noiseLevel: 6, hpCost: 8,
    variableDisplacement: true, forHighPressure: true,
    pumpingElement: "swashplate_angled_piston_barrel_variable_angle_flow_control",
    bestUse: "excavator_press_brake_aircraft_high_pressure_variable_flow",
  },
  piston_radial: {
    maxPressure: 10, flowRate: 7, volumetricEfficiency: 10, noiseLevel: 7, hpCost: 9,
    variableDisplacement: true, forHighPressure: true,
    pumpingElement: "radial_piston_star_arrangement_eccentric_cam_high_torque",
    bestUse: "winch_drive_wheel_motor_steel_mill_very_high_pressure_slow",
  },
  screw_triple: {
    maxPressure: 5, flowRate: 10, volumetricEfficiency: 9, noiseLevel: 10, hpCost: 6,
    variableDisplacement: false, forHighPressure: false,
    pumpingElement: "triple_screw_helical_rotor_positive_displacement_pulseless",
    bestUse: "lubrication_system_fuel_transfer_elevator_quiet_pulse_free",
  },
};

function get(t: HydraulicPumpType): HydraulicPumpData {
  return DATA[t];
}

export const maxPressure = (t: HydraulicPumpType) => get(t).maxPressure;
export const flowRate = (t: HydraulicPumpType) => get(t).flowRate;
export const volumetricEfficiency = (t: HydraulicPumpType) => get(t).volumetricEfficiency;
export const noiseLevel = (t: HydraulicPumpType) => get(t).noiseLevel;
export const hpCost = (t: HydraulicPumpType) => get(t).hpCost;
export const variableDisplacement = (t: HydraulicPumpType) => get(t).variableDisplacement;
export const forHighPressure = (t: HydraulicPumpType) => get(t).forHighPressure;
export const pumpingElement = (t: HydraulicPumpType) => get(t).pumpingElement;
export const bestUse = (t: HydraulicPumpType) => get(t).bestUse;
export const hydraulicPumpTypes = (): HydraulicPumpType[] =>
  Object.keys(DATA) as HydraulicPumpType[];
