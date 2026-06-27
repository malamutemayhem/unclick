export type FireHydrantType =
  | "dry_barrel_frost_proof"
  | "wet_barrel_california"
  | "wall_mounted_flush"
  | "pillar_post_indicator"
  | "underground_vault_pit";

interface FireHydrantData {
  flow: number;
  pressure: number;
  frostProtect: number;
  accessibility: number;
  fhCost: number;
  dryBarrel: boolean;
  forCold: boolean;
  outlet: string;
  bestUse: string;
}

const DATA: Record<FireHydrantType, FireHydrantData> = {
  dry_barrel_frost_proof: {
    flow: 8, pressure: 8, frostProtect: 10, accessibility: 8, fhCost: 7,
    dryBarrel: true, forCold: true,
    outlet: "two_hose_one_pumper_nst",
    bestUse: "cold_climate_municipal_street",
  },
  wet_barrel_california: {
    flow: 9, pressure: 8, frostProtect: 1, accessibility: 9, fhCost: 5,
    dryBarrel: false, forCold: false,
    outlet: "individual_valve_each_outlet",
    bestUse: "warm_climate_year_round_access",
  },
  wall_mounted_flush: {
    flow: 5, pressure: 6, frostProtect: 7, accessibility: 6, fhCost: 4,
    dryBarrel: true, forCold: true,
    outlet: "single_outlet_wall_flush",
    bestUse: "building_exterior_tight_space",
  },
  pillar_post_indicator: {
    flow: 7, pressure: 7, frostProtect: 8, accessibility: 10, fhCost: 6,
    dryBarrel: true, forCold: true,
    outlet: "indicator_valve_post_mount",
    bestUse: "private_site_valve_indicator",
  },
  underground_vault_pit: {
    flow: 8, pressure: 9, frostProtect: 9, accessibility: 3, fhCost: 9,
    dryBarrel: true, forCold: true,
    outlet: "vault_cover_below_grade_access",
    bestUse: "airport_runway_flush_grade",
  },
};

function get(t: FireHydrantType): FireHydrantData {
  return DATA[t];
}

export const flow = (t: FireHydrantType) => get(t).flow;
export const pressure = (t: FireHydrantType) => get(t).pressure;
export const frostProtect = (t: FireHydrantType) => get(t).frostProtect;
export const accessibility = (t: FireHydrantType) => get(t).accessibility;
export const fhCost = (t: FireHydrantType) => get(t).fhCost;
export const dryBarrel = (t: FireHydrantType) => get(t).dryBarrel;
export const forCold = (t: FireHydrantType) => get(t).forCold;
export const outlet = (t: FireHydrantType) => get(t).outlet;
export const bestUse = (t: FireHydrantType) => get(t).bestUse;
export const fireHydrantTypes = (): FireHydrantType[] =>
  Object.keys(DATA) as FireHydrantType[];
