export type FixedRoofTankType =
  | "cone_roof_standard"
  | "dome_roof_pressure"
  | "flat_roof_low_press"
  | "umbrella_roof_self"
  | "nitrogen_blanketed";

interface FixedRoofTankData {
  pressureRating: number;
  capacity: number;
  simplicity: number;
  vaporControl: number;
  fxCost: number;
  inertBlanketed: boolean;
  forNonVolatile: boolean;
  construction: string;
  bestUse: string;
}

const DATA: Record<FixedRoofTankType, FixedRoofTankData> = {
  cone_roof_standard: {
    pressureRating: 5, capacity: 9, simplicity: 10, vaporControl: 4, fxCost: 3,
    inertBlanketed: false, forNonVolatile: true,
    construction: "welded_steel_cone_roof_atmospheric_vent",
    bestUse: "diesel_fuel_oil_lube_oil_non_volatile_storage",
  },
  dome_roof_pressure: {
    pressureRating: 8, capacity: 8, simplicity: 7, vaporControl: 7, fxCost: 6,
    inertBlanketed: false, forNonVolatile: false,
    construction: "self_supporting_dome_low_pressure_gas_tight",
    bestUse: "naphtha_light_product_low_pressure_vapor_space",
  },
  flat_roof_low_press: {
    pressureRating: 4, capacity: 10, simplicity: 9, vaporControl: 3, fxCost: 2,
    inertBlanketed: false, forNonVolatile: true,
    construction: "flat_plate_roof_column_supported_large_diameter",
    bestUse: "water_storage_wastewater_holding_large_volume",
  },
  umbrella_roof_self: {
    pressureRating: 5, capacity: 8, simplicity: 9, vaporControl: 4, fxCost: 3,
    inertBlanketed: false, forNonVolatile: true,
    construction: "self_supporting_umbrella_curved_roof_no_column",
    bestUse: "general_chemical_intermediate_atmospheric_store",
  },
  nitrogen_blanketed: {
    pressureRating: 6, capacity: 8, simplicity: 6, vaporControl: 9, fxCost: 5,
    inertBlanketed: true, forNonVolatile: false,
    construction: "fixed_roof_nitrogen_pad_inert_blanket_system",
    bestUse: "solvent_resin_oxidation_sensitive_inert_blanket",
  },
};

function get(t: FixedRoofTankType): FixedRoofTankData {
  return DATA[t];
}

export const pressureRating = (t: FixedRoofTankType) => get(t).pressureRating;
export const capacity = (t: FixedRoofTankType) => get(t).capacity;
export const simplicity = (t: FixedRoofTankType) => get(t).simplicity;
export const vaporControl = (t: FixedRoofTankType) => get(t).vaporControl;
export const fxCost = (t: FixedRoofTankType) => get(t).fxCost;
export const inertBlanketed = (t: FixedRoofTankType) => get(t).inertBlanketed;
export const forNonVolatile = (t: FixedRoofTankType) => get(t).forNonVolatile;
export const construction = (t: FixedRoofTankType) => get(t).construction;
export const bestUse = (t: FixedRoofTankType) => get(t).bestUse;
export const fixedRoofTankTypes = (): FixedRoofTankType[] =>
  Object.keys(DATA) as FixedRoofTankType[];
