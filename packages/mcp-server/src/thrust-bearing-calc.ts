export type ThrustBearingType =
  | "thrust_ball_single"
  | "cylindrical_thrust_roller"
  | "tapered_thrust_roller"
  | "spherical_thrust_roller"
  | "tilting_pad_hydro";

interface ThrustBearingData {
  axialCapacity: number;
  speedLimit: number;
  misalignment: number;
  stiffness: number;
  tbCost: number;
  hydrodynamic: boolean;
  forHeavyAxial: boolean;
  element: string;
  bestUse: string;
}

const DATA: Record<ThrustBearingType, ThrustBearingData> = {
  thrust_ball_single: {
    axialCapacity: 5, speedLimit: 8, misalignment: 2, stiffness: 6, tbCost: 3,
    hydrodynamic: false, forHeavyAxial: false,
    element: "flat_washer_race_single_row_balls_cage",
    bestUse: "automotive_clutch_light_axial_load_general",
  },
  cylindrical_thrust_roller: {
    axialCapacity: 8, speedLimit: 5, misalignment: 2, stiffness: 9, tbCost: 6,
    hydrodynamic: false, forHeavyAxial: true,
    element: "flat_cylindrical_rollers_washer_race_heavy",
    bestUse: "crane_slewing_ring_heavy_axial_static_load",
  },
  tapered_thrust_roller: {
    axialCapacity: 9, speedLimit: 6, misalignment: 3, stiffness: 9, tbCost: 7,
    hydrodynamic: false, forHeavyAxial: true,
    element: "tapered_roller_axial_combined_load_capable",
    bestUse: "rolling_mill_screw_down_high_axial_plus_radial",
  },
  spherical_thrust_roller: {
    axialCapacity: 10, speedLimit: 4, misalignment: 8, stiffness: 8, tbCost: 8,
    hydrodynamic: false, forHeavyAxial: true,
    element: "barrel_roller_spherical_seat_self_aligning",
    bestUse: "hydroelectric_vertical_shaft_heavy_misalign",
  },
  tilting_pad_hydro: {
    axialCapacity: 10, speedLimit: 10, misalignment: 5, stiffness: 10, tbCost: 10,
    hydrodynamic: true, forHeavyAxial: true,
    element: "tilting_pad_oil_film_hydrodynamic_wedge",
    bestUse: "large_turbine_generator_vertical_pump_hydro",
  },
};

function get(t: ThrustBearingType): ThrustBearingData {
  return DATA[t];
}

export const axialCapacity = (t: ThrustBearingType) => get(t).axialCapacity;
export const speedLimit = (t: ThrustBearingType) => get(t).speedLimit;
export const misalignment = (t: ThrustBearingType) => get(t).misalignment;
export const stiffness = (t: ThrustBearingType) => get(t).stiffness;
export const tbCost = (t: ThrustBearingType) => get(t).tbCost;
export const hydrodynamic = (t: ThrustBearingType) => get(t).hydrodynamic;
export const forHeavyAxial = (t: ThrustBearingType) => get(t).forHeavyAxial;
export const element = (t: ThrustBearingType) => get(t).element;
export const bestUse = (t: ThrustBearingType) => get(t).bestUse;
export const thrustBearingTypes = (): ThrustBearingType[] =>
  Object.keys(DATA) as ThrustBearingType[];
