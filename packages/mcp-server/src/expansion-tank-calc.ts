export type ExpansionTankType =
  | "bladder_precharged"
  | "diaphragm_captive_air"
  | "plain_steel_open"
  | "stainless_potable_water"
  | "chilled_water_large";

interface ExpansionTankData {
  capacity: number;
  pressure: number;
  longevity: number;
  maintenance: number;
  etCost: number;
  closed: boolean;
  forPotable: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<ExpansionTankType, ExpansionTankData> = {
  bladder_precharged: {
    capacity: 7, pressure: 8, longevity: 8, maintenance: 9, etCost: 5,
    closed: true, forPotable: false,
    material: "steel_shell_butyl_bladder",
    bestUse: "hydronic_heating_closed_loop",
  },
  diaphragm_captive_air: {
    capacity: 7, pressure: 8, longevity: 7, maintenance: 8, etCost: 4,
    closed: true, forPotable: false,
    material: "steel_shell_rubber_diaphragm",
    bestUse: "small_boiler_residential_hvac",
  },
  plain_steel_open: {
    capacity: 9, pressure: 4, longevity: 5, maintenance: 5, etCost: 3,
    closed: false, forPotable: false,
    material: "plain_steel_vented_tank",
    bestUse: "gravity_open_system_old_bldg",
  },
  stainless_potable_water: {
    capacity: 6, pressure: 9, longevity: 10, maintenance: 9, etCost: 8,
    closed: true, forPotable: true,
    material: "304_stainless_nsf_bladder",
    bestUse: "domestic_water_thermal_expand",
  },
  chilled_water_large: {
    capacity: 10, pressure: 8, longevity: 8, maintenance: 7, etCost: 7,
    closed: true, forPotable: false,
    material: "carbon_steel_epoxy_lined",
    bestUse: "chiller_plant_large_system",
  },
};

function get(t: ExpansionTankType): ExpansionTankData {
  return DATA[t];
}

export const capacity = (t: ExpansionTankType) => get(t).capacity;
export const pressure = (t: ExpansionTankType) => get(t).pressure;
export const longevity = (t: ExpansionTankType) => get(t).longevity;
export const maintenance = (t: ExpansionTankType) => get(t).maintenance;
export const etCost = (t: ExpansionTankType) => get(t).etCost;
export const closed = (t: ExpansionTankType) => get(t).closed;
export const forPotable = (t: ExpansionTankType) => get(t).forPotable;
export const material = (t: ExpansionTankType) => get(t).material;
export const bestUse = (t: ExpansionTankType) => get(t).bestUse;
export const expansionTankTypes = (): ExpansionTankType[] =>
  Object.keys(DATA) as ExpansionTankType[];
