export type RotaryDryerType =
  | "direct_heat_co_current"
  | "indirect_steam_tube"
  | "triple_pass_compact"
  | "rotary_louvre_gentle"
  | "rotary_kiln_calcine";

interface RotaryDryerData {
  capacity: number;
  heatEfficiency: number;
  materialRange: number;
  footprint: number;
  rdCost: number;
  directHeat: boolean;
  forBulk: boolean;
  heating: string;
  bestUse: string;
}

const DATA: Record<RotaryDryerType, RotaryDryerData> = {
  direct_heat_co_current: {
    capacity: 9, heatEfficiency: 6, materialRange: 9, footprint: 4, rdCost: 5,
    directHeat: true, forBulk: true,
    heating: "hot_gas_direct_contact_co_current_drum",
    bestUse: "mineral_ore_sand_aggregate_bulk_dry",
  },
  indirect_steam_tube: {
    capacity: 7, heatEfficiency: 9, materialRange: 7, footprint: 5, rdCost: 7,
    directHeat: false, forBulk: true,
    heating: "steam_heated_tube_bundle_inside_drum",
    bestUse: "chemical_sludge_no_gas_contact_solvent",
  },
  triple_pass_compact: {
    capacity: 8, heatEfficiency: 8, materialRange: 7, footprint: 8, rdCost: 6,
    directHeat: true, forBulk: true,
    heating: "three_concentric_cylinder_compact_path",
    bestUse: "biomass_wood_chip_sawdust_compact_site",
  },
  rotary_louvre_gentle: {
    capacity: 6, heatEfficiency: 7, materialRange: 5, footprint: 5, rdCost: 6,
    directHeat: true, forBulk: false,
    heating: "louvre_plate_gentle_cascade_low_attrition",
    bestUse: "fertilizer_granule_seed_fragile_product",
  },
  rotary_kiln_calcine: {
    capacity: 10, heatEfficiency: 5, materialRange: 6, footprint: 3, rdCost: 8,
    directHeat: true, forBulk: true,
    heating: "high_temp_refractory_lined_calcination",
    bestUse: "cement_clinker_lime_calcine_high_temp",
  },
};

function get(t: RotaryDryerType): RotaryDryerData {
  return DATA[t];
}

export const capacity = (t: RotaryDryerType) => get(t).capacity;
export const heatEfficiency = (t: RotaryDryerType) => get(t).heatEfficiency;
export const materialRange = (t: RotaryDryerType) => get(t).materialRange;
export const footprint = (t: RotaryDryerType) => get(t).footprint;
export const rdCost = (t: RotaryDryerType) => get(t).rdCost;
export const directHeat = (t: RotaryDryerType) => get(t).directHeat;
export const forBulk = (t: RotaryDryerType) => get(t).forBulk;
export const heating = (t: RotaryDryerType) => get(t).heating;
export const bestUse = (t: RotaryDryerType) => get(t).bestUse;
export const rotaryDryerTypes = (): RotaryDryerType[] =>
  Object.keys(DATA) as RotaryDryerType[];
