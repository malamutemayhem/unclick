export type Propulsion =
  | "chemical_bipropellant"
  | "cold_gas_thruster"
  | "hall_effect_electric"
  | "ion_gridded_electrostatic"
  | "solar_sail_photon";

const DATA: Record<Propulsion, {
  thrust: number; specificImpulse: number; efficiency: number;
  reliability: number; prCost: number; throttleable: boolean;
  forDeepSpace: boolean; propellant: string; bestUse: string;
}> = {
  chemical_bipropellant: {
    thrust: 10, specificImpulse: 4, efficiency: 3,
    reliability: 9, prCost: 3, throttleable: true,
    forDeepSpace: false, propellant: "mmh_n2o4_hypergolic",
    bestUse: "orbit_insertion_large_delta_v",
  },
  cold_gas_thruster: {
    thrust: 2, specificImpulse: 1, efficiency: 2,
    reliability: 10, prCost: 1, throttleable: true,
    forDeepSpace: false, propellant: "nitrogen_stored_pressure",
    bestUse: "cubesat_attitude_control",
  },
  hall_effect_electric: {
    thrust: 4, specificImpulse: 8, efficiency: 7,
    reliability: 8, prCost: 4, throttleable: true,
    forDeepSpace: true, propellant: "xenon_ionized_plasma",
    bestUse: "geo_station_keeping_spiral",
  },
  ion_gridded_electrostatic: {
    thrust: 3, specificImpulse: 10, efficiency: 9,
    reliability: 7, prCost: 5, throttleable: true,
    forDeepSpace: true, propellant: "xenon_or_krypton_ion",
    bestUse: "interplanetary_cruise_transfer",
  },
  solar_sail_photon: {
    thrust: 1, specificImpulse: 10, efficiency: 10,
    reliability: 6, prCost: 2, throttleable: false,
    forDeepSpace: true, propellant: "none_photon_pressure",
    bestUse: "solar_system_escape_trajectory",
  },
};

const get = (t: Propulsion) => DATA[t];

export const thrust = (t: Propulsion) => get(t).thrust;
export const specificImpulse = (t: Propulsion) => get(t).specificImpulse;
export const efficiency = (t: Propulsion) => get(t).efficiency;
export const reliability = (t: Propulsion) => get(t).reliability;
export const prCost = (t: Propulsion) => get(t).prCost;
export const throttleable = (t: Propulsion) => get(t).throttleable;
export const forDeepSpace = (t: Propulsion) => get(t).forDeepSpace;
export const propellant = (t: Propulsion) => get(t).propellant;
export const bestUse = (t: Propulsion) => get(t).bestUse;
export const propulsions = (): Propulsion[] => Object.keys(DATA) as Propulsion[];
