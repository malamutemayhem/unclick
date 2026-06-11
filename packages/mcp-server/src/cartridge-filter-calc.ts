export type CartridgeFilterType =
  | "pleated_cellulose"
  | "pleated_synthetic"
  | "depth_wound_string"
  | "melt_blown_graded"
  | "activated_carbon_block";

interface CartridgeFilterData {
  particleRemoval: number;
  flowRate: number;
  dirtHolding: number;
  chemCompat: number;
  cfCost: number;
  surfaceFilter: boolean;
  forPotable: boolean;
  construction: string;
  bestUse: string;
}

const DATA: Record<CartridgeFilterType, CartridgeFilterData> = {
  pleated_cellulose: {
    particleRemoval: 7, flowRate: 8, dirtHolding: 8, chemCompat: 5, cfCost: 3,
    surfaceFilter: true, forPotable: false,
    construction: "pleated_cellulose_paper_resin_bonded_frame",
    bestUse: "hydraulic_oil_coolant_general_industrial_liquid",
  },
  pleated_synthetic: {
    particleRemoval: 9, flowRate: 9, dirtHolding: 9, chemCompat: 8, cfCost: 5,
    surfaceFilter: true, forPotable: true,
    construction: "pleated_polyester_polypropylene_absolute_rated",
    bestUse: "pharmaceutical_electronic_ultrapure_water",
  },
  depth_wound_string: {
    particleRemoval: 6, flowRate: 6, dirtHolding: 7, chemCompat: 7, cfCost: 2,
    surfaceFilter: false, forPotable: false,
    construction: "wound_cotton_polypropylene_string_gradient",
    bestUse: "pre_filter_sediment_removal_low_cost_disposable",
  },
  melt_blown_graded: {
    particleRemoval: 8, flowRate: 7, dirtHolding: 8, chemCompat: 7, cfCost: 3,
    surfaceFilter: false, forPotable: false,
    construction: "melt_blown_polypropylene_graded_density_core",
    bestUse: "process_water_chemical_pre_filtration_graded",
  },
  activated_carbon_block: {
    particleRemoval: 8, flowRate: 5, dirtHolding: 6, chemCompat: 6, cfCost: 4,
    surfaceFilter: false, forPotable: true,
    construction: "compressed_activated_carbon_block_adsorption",
    bestUse: "drinking_water_chlorine_voc_taste_odor_removal",
  },
};

function get(t: CartridgeFilterType): CartridgeFilterData {
  return DATA[t];
}

export const particleRemoval = (t: CartridgeFilterType) => get(t).particleRemoval;
export const flowRate = (t: CartridgeFilterType) => get(t).flowRate;
export const dirtHolding = (t: CartridgeFilterType) => get(t).dirtHolding;
export const chemCompat = (t: CartridgeFilterType) => get(t).chemCompat;
export const cfCost = (t: CartridgeFilterType) => get(t).cfCost;
export const surfaceFilter = (t: CartridgeFilterType) => get(t).surfaceFilter;
export const forPotable = (t: CartridgeFilterType) => get(t).forPotable;
export const construction = (t: CartridgeFilterType) => get(t).construction;
export const bestUse = (t: CartridgeFilterType) => get(t).bestUse;
export const cartridgeFilterTypes = (): CartridgeFilterType[] =>
  Object.keys(DATA) as CartridgeFilterType[];
