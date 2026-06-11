export type FrictionWelderType =
  | "rotary_direct_drive"
  | "rotary_inertia"
  | "linear_reciprocating"
  | "orbital_circular"
  | "friction_stir";

interface FrictionWelderData {
  weldSpeed: number;
  jointStrength: number;
  materialRange: number;
  heatAffectedZone: number;
  fwCost: number;
  solidState: boolean;
  forDissimilar: boolean;
  welderConfig: string;
  bestUse: string;
}

const DATA: Record<FrictionWelderType, FrictionWelderData> = {
  rotary_direct_drive: {
    weldSpeed: 9, jointStrength: 9, materialRange: 7, heatAffectedZone: 8, fwCost: 7,
    solidState: true, forDissimilar: true,
    welderConfig: "rotary_direct_drive_spindle_forge_axial_pressure_round_bar_weld",
    bestUse: "round_bar_tube_axle_shaft_rotary_direct_drive_friction_weld",
  },
  rotary_inertia: {
    weldSpeed: 10, jointStrength: 9, materialRange: 7, heatAffectedZone: 7, fwCost: 6,
    solidState: true, forDissimilar: true,
    welderConfig: "rotary_inertia_flywheel_store_energy_rapid_forge_weld_round",
    bestUse: "high_production_round_part_flywheel_inertia_rapid_friction_weld",
  },
  linear_reciprocating: {
    weldSpeed: 7, jointStrength: 8, materialRange: 9, heatAffectedZone: 8, fwCost: 9,
    solidState: true, forDissimilar: true,
    welderConfig: "linear_reciprocating_oscillate_forge_non_round_part_turbine",
    bestUse: "turbine_blade_non_round_part_linear_reciprocating_friction_weld",
  },
  orbital_circular: {
    weldSpeed: 7, jointStrength: 8, materialRange: 8, heatAffectedZone: 9, fwCost: 9,
    solidState: true, forDissimilar: false,
    welderConfig: "orbital_circular_motion_friction_weld_complex_shape_aerospace",
    bestUse: "complex_shape_aerospace_component_orbital_circular_friction_weld",
  },
  friction_stir: {
    weldSpeed: 6, jointStrength: 10, materialRange: 6, heatAffectedZone: 10, fwCost: 10,
    solidState: true, forDissimilar: true,
    welderConfig: "friction_stir_rotating_tool_plunge_traverse_butt_lap_aluminum",
    bestUse: "aluminum_alloy_panel_ship_rail_aerospace_friction_stir_butt_weld",
  },
};

function get(t: FrictionWelderType): FrictionWelderData {
  return DATA[t];
}

export const weldSpeed = (t: FrictionWelderType) => get(t).weldSpeed;
export const jointStrength = (t: FrictionWelderType) => get(t).jointStrength;
export const materialRange = (t: FrictionWelderType) => get(t).materialRange;
export const heatAffectedZone = (t: FrictionWelderType) => get(t).heatAffectedZone;
export const fwCost = (t: FrictionWelderType) => get(t).fwCost;
export const solidState = (t: FrictionWelderType) => get(t).solidState;
export const forDissimilar = (t: FrictionWelderType) => get(t).forDissimilar;
export const welderConfig = (t: FrictionWelderType) => get(t).welderConfig;
export const bestUse = (t: FrictionWelderType) => get(t).bestUse;
export const frictionWelderTypes = (): FrictionWelderType[] =>
  Object.keys(DATA) as FrictionWelderType[];
