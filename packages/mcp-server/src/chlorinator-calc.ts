export type ChlorinatorType =
  | "gas_cylinder_vacuum"
  | "sodium_hypochlorite_pump"
  | "calcium_hypochlorite_tablet"
  | "on_site_electrolytic"
  | "uv_chloramine_advanced";

interface ChlorinatorData {
  dosing: number;
  safety: number;
  capacity: number;
  residual: number;
  clCost: number;
  onSiteGen: boolean;
  forMunicipal: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<ChlorinatorType, ChlorinatorData> = {
  gas_cylinder_vacuum: {
    dosing: 10, safety: 4, capacity: 10, residual: 9, clCost: 5,
    onSiteGen: false, forMunicipal: true,
    method: "chlorine_gas_vacuum_regulator",
    bestUse: "large_municipal_water_plant",
  },
  sodium_hypochlorite_pump: {
    dosing: 8, safety: 8, capacity: 7, residual: 7, clCost: 6,
    onSiteGen: false, forMunicipal: true,
    method: "metering_pump_liquid_bleach_12pct",
    bestUse: "small_water_system_wastewater",
  },
  calcium_hypochlorite_tablet: {
    dosing: 5, safety: 9, capacity: 4, residual: 6, clCost: 3,
    onSiteGen: false, forMunicipal: false,
    method: "erosion_tablet_feeder_contact",
    bestUse: "swimming_pool_small_well",
  },
  on_site_electrolytic: {
    dosing: 8, safety: 9, capacity: 8, residual: 8, clCost: 8,
    onSiteGen: true, forMunicipal: true,
    method: "brine_electrolysis_naclo_onsite",
    bestUse: "remote_plant_no_chemical_delivery",
  },
  uv_chloramine_advanced: {
    dosing: 9, safety: 7, capacity: 6, residual: 10, clCost: 9,
    onSiteGen: false, forMunicipal: true,
    method: "chloramine_uv_aop_combined",
    bestUse: "distribution_system_residual_mgmt",
  },
};

function get(t: ChlorinatorType): ChlorinatorData {
  return DATA[t];
}

export const dosing = (t: ChlorinatorType) => get(t).dosing;
export const safety = (t: ChlorinatorType) => get(t).safety;
export const capacity = (t: ChlorinatorType) => get(t).capacity;
export const residual = (t: ChlorinatorType) => get(t).residual;
export const clCost = (t: ChlorinatorType) => get(t).clCost;
export const onSiteGen = (t: ChlorinatorType) => get(t).onSiteGen;
export const forMunicipal = (t: ChlorinatorType) => get(t).forMunicipal;
export const method = (t: ChlorinatorType) => get(t).method;
export const bestUse = (t: ChlorinatorType) => get(t).bestUse;
export const chlorinatorTypes = (): ChlorinatorType[] =>
  Object.keys(DATA) as ChlorinatorType[];
