export type FlameArresterType =
  | "deflagration_inline"
  | "detonation_inline"
  | "end_of_line_vent"
  | "hydraulic_liquid_seal"
  | "high_velocity_vent";

interface FlameArresterData {
  protection: number;
  pressureDrop: number;
  flowCapacity: number;
  maintenance: number;
  faCost: number;
  detonationRated: boolean;
  forTankVent: boolean;
  element: string;
  bestUse: string;
}

const DATA: Record<FlameArresterType, FlameArresterData> = {
  deflagration_inline: {
    protection: 7, pressureDrop: 6, flowCapacity: 7, maintenance: 7, faCost: 5,
    detonationRated: false, forTankVent: false,
    element: "crimped_ribbon_metal_matrix_quench_gap",
    bestUse: "process_piping_vapor_recovery_deflagration",
  },
  detonation_inline: {
    protection: 10, pressureDrop: 5, flowCapacity: 6, maintenance: 6, faCost: 8,
    detonationRated: true, forTankVent: false,
    element: "multiple_element_bank_detonation_quench_matrix",
    bestUse: "long_pipe_run_flare_header_detonation_risk",
  },
  end_of_line_vent: {
    protection: 6, pressureDrop: 8, flowCapacity: 8, maintenance: 8, faCost: 4,
    detonationRated: false, forTankVent: true,
    element: "weather_hood_crimped_ribbon_end_mounted",
    bestUse: "atmospheric_tank_vent_pipe_end_protection",
  },
  hydraulic_liquid_seal: {
    protection: 8, pressureDrop: 4, flowCapacity: 7, maintenance: 5, faCost: 6,
    detonationRated: false, forTankVent: false,
    element: "liquid_seal_drum_water_glycol_bubble_quench",
    bestUse: "flare_knockout_drum_seal_continuous_flow",
  },
  high_velocity_vent: {
    protection: 7, pressureDrop: 7, flowCapacity: 9, maintenance: 9, faCost: 5,
    detonationRated: false, forTankVent: true,
    element: "velocity_actuated_pallet_high_flow_vent_valve",
    bestUse: "tank_pressure_vacuum_vent_with_flame_protect",
  },
};

function get(t: FlameArresterType): FlameArresterData {
  return DATA[t];
}

export const protection = (t: FlameArresterType) => get(t).protection;
export const pressureDrop = (t: FlameArresterType) => get(t).pressureDrop;
export const flowCapacity = (t: FlameArresterType) => get(t).flowCapacity;
export const maintenance = (t: FlameArresterType) => get(t).maintenance;
export const faCost = (t: FlameArresterType) => get(t).faCost;
export const detonationRated = (t: FlameArresterType) => get(t).detonationRated;
export const forTankVent = (t: FlameArresterType) => get(t).forTankVent;
export const element = (t: FlameArresterType) => get(t).element;
export const bestUse = (t: FlameArresterType) => get(t).bestUse;
export const flameArresterTypes = (): FlameArresterType[] =>
  Object.keys(DATA) as FlameArresterType[];
