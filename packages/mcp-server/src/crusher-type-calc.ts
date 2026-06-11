export type CrusherType =
  | "jaw_primary_toggle"
  | "cone_secondary_gyrate"
  | "impact_horizontal_shaft"
  | "roll_double_smooth"
  | "vsi_vertical_shaft_impact";

const DATA: Record<CrusherType, {
  reduction: number; capacity: number; fines: number;
  wearLife: number; crCost: number; cubicProduct: boolean;
  forPrimary: boolean; mechanism: string; bestUse: string;
}> = {
  jaw_primary_toggle: {
    reduction: 7, capacity: 8, fines: 4,
    wearLife: 7, crCost: 2, cubicProduct: false,
    forPrimary: true, mechanism: "toggle_plate_compression",
    bestUse: "quarry_primary_rom_ore_break",
  },
  cone_secondary_gyrate: {
    reduction: 8, capacity: 9, fines: 6,
    wearLife: 8, crCost: 4, cubicProduct: true,
    forPrimary: false, mechanism: "mantle_concave_gyration",
    bestUse: "aggregate_secondary_tertiary_crush",
  },
  impact_horizontal_shaft: {
    reduction: 9, capacity: 7, fines: 8,
    wearLife: 4, crCost: 3, cubicProduct: true,
    forPrimary: true, mechanism: "rotor_blow_bar_impact",
    bestUse: "limestone_cement_raw_material",
  },
  roll_double_smooth: {
    reduction: 4, capacity: 6, fines: 3,
    wearLife: 6, crCost: 2, cubicProduct: false,
    forPrimary: false, mechanism: "counter_rotating_rolls",
    bestUse: "coal_salt_friable_material",
  },
  vsi_vertical_shaft_impact: {
    reduction: 6, capacity: 7, fines: 9,
    wearLife: 5, crCost: 4, cubicProduct: true,
    forPrimary: false, mechanism: "rotor_rock_on_rock_anvil",
    bestUse: "manufactured_sand_shape_improve",
  },
};

const get = (t: CrusherType) => DATA[t];

export const reduction = (t: CrusherType) => get(t).reduction;
export const capacity = (t: CrusherType) => get(t).capacity;
export const fines = (t: CrusherType) => get(t).fines;
export const wearLife = (t: CrusherType) => get(t).wearLife;
export const crCost = (t: CrusherType) => get(t).crCost;
export const cubicProduct = (t: CrusherType) => get(t).cubicProduct;
export const forPrimary = (t: CrusherType) => get(t).forPrimary;
export const mechanism = (t: CrusherType) => get(t).mechanism;
export const bestUse = (t: CrusherType) => get(t).bestUse;
export const crusherTypes = (): CrusherType[] => Object.keys(DATA) as CrusherType[];
