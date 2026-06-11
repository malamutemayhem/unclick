export type DividingWallColumnType =
  | "standard_dwc_three"
  | "kaibel_four_product"
  | "multi_partition_wall"
  | "adiabatic_dwc_simple"
  | "heat_integrated_dwc";

interface DividingWallColumnData {
  energySaving: number;
  separation: number;
  capitalSaving: number;
  controllability: number;
  dwCost: number;
  multiProduct: boolean;
  forTernary: boolean;
  wall: string;
  bestUse: string;
}

const DATA: Record<DividingWallColumnType, DividingWallColumnData> = {
  standard_dwc_three: {
    energySaving: 9, separation: 8, capitalSaving: 8, controllability: 7, dwCost: 6,
    multiProduct: true, forTernary: true,
    wall: "single_vertical_wall_prefraction_main_section",
    bestUse: "btx_separation_naphtha_reformate_three_cut",
  },
  kaibel_four_product: {
    energySaving: 8, separation: 9, capitalSaving: 7, controllability: 6, dwCost: 8,
    multiProduct: true, forTernary: false,
    wall: "extended_wall_four_product_side_draw_kaibel",
    bestUse: "crude_oil_fractionation_multi_product_cut",
  },
  multi_partition_wall: {
    energySaving: 9, separation: 10, capitalSaving: 8, controllability: 5, dwCost: 9,
    multiProduct: true, forTernary: false,
    wall: "multiple_partition_walls_five_plus_product",
    bestUse: "specialty_chemical_multi_component_fractionation",
  },
  adiabatic_dwc_simple: {
    energySaving: 7, separation: 7, capitalSaving: 9, controllability: 8, dwCost: 5,
    multiProduct: true, forTernary: true,
    wall: "simple_adiabatic_wall_no_heat_transfer_across",
    bestUse: "retrofit_existing_column_ternary_upgrade",
  },
  heat_integrated_dwc: {
    energySaving: 10, separation: 9, capitalSaving: 7, controllability: 6, dwCost: 9,
    multiProduct: true, forTernary: true,
    wall: "heat_transfer_wall_internal_heat_integration",
    bestUse: "close_boiling_isomer_separation_max_energy_save",
  },
};

function get(t: DividingWallColumnType): DividingWallColumnData {
  return DATA[t];
}

export const energySaving = (t: DividingWallColumnType) => get(t).energySaving;
export const separation = (t: DividingWallColumnType) => get(t).separation;
export const capitalSaving = (t: DividingWallColumnType) => get(t).capitalSaving;
export const controllability = (t: DividingWallColumnType) => get(t).controllability;
export const dwCost = (t: DividingWallColumnType) => get(t).dwCost;
export const multiProduct = (t: DividingWallColumnType) => get(t).multiProduct;
export const forTernary = (t: DividingWallColumnType) => get(t).forTernary;
export const wall = (t: DividingWallColumnType) => get(t).wall;
export const bestUse = (t: DividingWallColumnType) => get(t).bestUse;
export const dividingWallColumnTypes = (): DividingWallColumnType[] =>
  Object.keys(DATA) as DividingWallColumnType[];
