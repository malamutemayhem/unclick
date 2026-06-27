export type FloatingRoofTankType =
  | "external_floating_roof"
  | "internal_floating_roof"
  | "double_deck_pontoon"
  | "geodesic_dome_float"
  | "full_contact_aluminum";

interface FloatingRoofTankData {
  emissionControl: number;
  capacity: number;
  windResist: number;
  maintenance: number;
  frCost: number;
  weatherProtected: boolean;
  forVolatile: boolean;
  roof: string;
  bestUse: string;
}

const DATA: Record<FloatingRoofTankType, FloatingRoofTankData> = {
  external_floating_roof: {
    emissionControl: 8, capacity: 10, windResist: 6, maintenance: 6, frCost: 6,
    weatherProtected: false, forVolatile: true,
    roof: "steel_pontoon_deck_floating_on_liquid_surface",
    bestUse: "crude_oil_large_terminal_refinery_tank_farm",
  },
  internal_floating_roof: {
    emissionControl: 9, capacity: 8, windResist: 9, maintenance: 7, frCost: 7,
    weatherProtected: true, forVolatile: true,
    roof: "aluminum_or_steel_float_inside_fixed_roof_shell",
    bestUse: "gasoline_jet_fuel_chemical_emission_control",
  },
  double_deck_pontoon: {
    emissionControl: 9, capacity: 10, windResist: 8, maintenance: 7, frCost: 8,
    weatherProtected: false, forVolatile: true,
    roof: "double_deck_steel_pontoon_buoyancy_compartment",
    bestUse: "large_crude_storage_high_wind_zone_seismic",
  },
  geodesic_dome_float: {
    emissionControl: 10, capacity: 9, windResist: 10, maintenance: 9, frCost: 9,
    weatherProtected: true, forVolatile: true,
    roof: "aluminum_geodesic_dome_over_internal_float",
    bestUse: "chemical_terminal_zero_emission_weather_protect",
  },
  full_contact_aluminum: {
    emissionControl: 10, capacity: 7, windResist: 8, maintenance: 8, frCost: 7,
    weatherProtected: true, forVolatile: true,
    roof: "full_contact_aluminum_skin_on_liquid_surface",
    bestUse: "water_treatment_potable_reservoir_cover",
  },
};

function get(t: FloatingRoofTankType): FloatingRoofTankData {
  return DATA[t];
}

export const emissionControl = (t: FloatingRoofTankType) => get(t).emissionControl;
export const capacity = (t: FloatingRoofTankType) => get(t).capacity;
export const windResist = (t: FloatingRoofTankType) => get(t).windResist;
export const maintenance = (t: FloatingRoofTankType) => get(t).maintenance;
export const frCost = (t: FloatingRoofTankType) => get(t).frCost;
export const weatherProtected = (t: FloatingRoofTankType) => get(t).weatherProtected;
export const forVolatile = (t: FloatingRoofTankType) => get(t).forVolatile;
export const roof = (t: FloatingRoofTankType) => get(t).roof;
export const bestUse = (t: FloatingRoofTankType) => get(t).bestUse;
export const floatingRoofTankTypes = (): FloatingRoofTankType[] =>
  Object.keys(DATA) as FloatingRoofTankType[];
