export type TunedMassType =
  | "pendulum_building_sway"
  | "spring_mass_floor_vibe"
  | "liquid_sloshing_column"
  | "active_electromagnetic"
  | "viscoelastic_constrained";

interface TunedMassData {
  attenuation: number;
  bandwidth: number;
  response: number;
  maintenance: number;
  tmCost: number;
  active: boolean;
  forBuilding: boolean;
  element: string;
  bestUse: string;
}

const DATA: Record<TunedMassType, TunedMassData> = {
  pendulum_building_sway: {
    attenuation: 9, bandwidth: 5, response: 6, maintenance: 7, tmCost: 9,
    active: false, forBuilding: true,
    element: "suspended_mass_pendulum_cable",
    bestUse: "tall_building_wind_sway_control",
  },
  spring_mass_floor_vibe: {
    attenuation: 7, bandwidth: 6, response: 8, maintenance: 8, tmCost: 5,
    active: false, forBuilding: false,
    element: "steel_mass_coil_spring_dashpot",
    bestUse: "factory_floor_machine_footfall",
  },
  liquid_sloshing_column: {
    attenuation: 8, bandwidth: 7, response: 7, maintenance: 9, tmCost: 6,
    active: false, forBuilding: true,
    element: "u_tube_liquid_column_sloshing",
    bestUse: "bridge_tower_low_maintenance_damp",
  },
  active_electromagnetic: {
    attenuation: 10, bandwidth: 10, response: 10, maintenance: 5, tmCost: 10,
    active: true, forBuilding: true,
    element: "servo_actuator_mass_sensor_loop",
    bestUse: "high_rise_seismic_multi_freq_damp",
  },
  viscoelastic_constrained: {
    attenuation: 6, bandwidth: 8, response: 7, maintenance: 10, tmCost: 4,
    active: false, forBuilding: false,
    element: "constrained_layer_viscoelastic_pad",
    bestUse: "panel_duct_pipe_broadband_damp",
  },
};

function get(t: TunedMassType): TunedMassData {
  return DATA[t];
}

export const attenuation = (t: TunedMassType) => get(t).attenuation;
export const bandwidth = (t: TunedMassType) => get(t).bandwidth;
export const response = (t: TunedMassType) => get(t).response;
export const maintenance = (t: TunedMassType) => get(t).maintenance;
export const tmCost = (t: TunedMassType) => get(t).tmCost;
export const active = (t: TunedMassType) => get(t).active;
export const forBuilding = (t: TunedMassType) => get(t).forBuilding;
export const element = (t: TunedMassType) => get(t).element;
export const bestUse = (t: TunedMassType) => get(t).bestUse;
export const tunedMassTypes = (): TunedMassType[] =>
  Object.keys(DATA) as TunedMassType[];
