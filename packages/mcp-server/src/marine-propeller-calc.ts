export type MarinePropellerType =
  | "fixed_pitch"
  | "controllable_pitch"
  | "azimuth_thruster"
  | "waterjet"
  | "voith_schneider";

interface MarinePropellerData {
  thrust: number;
  efficiency: number;
  maneuverability: number;
  cavitationResistance: number;
  mpCost: number;
  variablePitch: boolean;
  forHighSpeed: boolean;
  propulsion: string;
  bestUse: string;
}

const DATA: Record<MarinePropellerType, MarinePropellerData> = {
  fixed_pitch: {
    thrust: 8, efficiency: 9, maneuverability: 4, cavitationResistance: 7, mpCost: 4,
    variablePitch: false, forHighSpeed: false,
    propulsion: "solid_cast_bronze_fixed_blade_angle_shaft_driven_propeller",
    bestUse: "bulk_carrier_tanker_steady_speed_long_voyage_fuel_economy",
  },
  controllable_pitch: {
    thrust: 9, efficiency: 8, maneuverability: 7, cavitationResistance: 7, mpCost: 8,
    variablePitch: true, forHighSpeed: false,
    propulsion: "hydraulic_hub_variable_blade_angle_reverse_without_gearbox",
    bestUse: "ferry_offshore_vessel_variable_load_frequent_maneuvering",
  },
  azimuth_thruster: {
    thrust: 8, efficiency: 7, maneuverability: 10, cavitationResistance: 6, mpCost: 9,
    variablePitch: true, forHighSpeed: false,
    propulsion: "podded_drive_360_degree_rotation_electric_motor_in_pod",
    bestUse: "dynamic_positioning_cruise_ship_tugboat_full_rotation",
  },
  waterjet: {
    thrust: 7, efficiency: 6, maneuverability: 8, cavitationResistance: 10, mpCost: 7,
    variablePitch: false, forHighSpeed: true,
    propulsion: "impeller_pump_nozzle_intake_deflector_bucket_reverse",
    bestUse: "fast_ferry_patrol_boat_shallow_draft_high_speed_craft",
  },
  voith_schneider: {
    thrust: 6, efficiency: 5, maneuverability: 10, cavitationResistance: 5, mpCost: 10,
    variablePitch: true, forHighSpeed: false,
    propulsion: "cycloidal_vertical_axis_blade_pitch_continuous_thrust_vector",
    bestUse: "harbor_tug_fireboat_precise_station_keeping_omnidirectional",
  },
};

function get(t: MarinePropellerType): MarinePropellerData {
  return DATA[t];
}

export const thrust = (t: MarinePropellerType) => get(t).thrust;
export const efficiency = (t: MarinePropellerType) => get(t).efficiency;
export const maneuverability = (t: MarinePropellerType) => get(t).maneuverability;
export const cavitationResistance = (t: MarinePropellerType) => get(t).cavitationResistance;
export const mpCost = (t: MarinePropellerType) => get(t).mpCost;
export const variablePitch = (t: MarinePropellerType) => get(t).variablePitch;
export const forHighSpeed = (t: MarinePropellerType) => get(t).forHighSpeed;
export const propulsion = (t: MarinePropellerType) => get(t).propulsion;
export const bestUse = (t: MarinePropellerType) => get(t).bestUse;
export const marinePropellerTypes = (): MarinePropellerType[] =>
  Object.keys(DATA) as MarinePropellerType[];
