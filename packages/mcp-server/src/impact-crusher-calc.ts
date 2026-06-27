export type ImpactCrusherType =
  | "horizontal_shaft_primary"
  | "vertical_shaft_vsi"
  | "cage_mill_fine"
  | "rotor_impactor_recycle"
  | "autogenous_rock_on_rock";

interface ImpactCrusherData {
  capacity: number;
  reductionRatio: number;
  productShape: number;
  wear: number;
  icCost: number;
  cubicProduct: boolean;
  forSoft: boolean;
  rotor: string;
  bestUse: string;
}

const DATA: Record<ImpactCrusherType, ImpactCrusherData> = {
  horizontal_shaft_primary: {
    capacity: 9, reductionRatio: 9, productShape: 8, wear: 4, icCost: 6,
    cubicProduct: true, forSoft: false,
    rotor: "horizontal_shaft_blow_bar_impact",
    bestUse: "limestone_primary_high_reduction_single",
  },
  vertical_shaft_vsi: {
    capacity: 7, reductionRatio: 6, productShape: 10, wear: 5, icCost: 7,
    cubicProduct: true, forSoft: false,
    rotor: "vertical_shaft_rock_shelf_autogenous",
    bestUse: "manufactured_sand_cubic_aggregate_shape",
  },
  cage_mill_fine: {
    capacity: 4, reductionRatio: 10, productShape: 6, wear: 3, icCost: 5,
    cubicProduct: false, forSoft: true,
    rotor: "multi_cage_counter_rotate_fine_grind",
    bestUse: "fertilizer_coal_soft_material_fine",
  },
  rotor_impactor_recycle: {
    capacity: 6, reductionRatio: 7, productShape: 7, wear: 6, icCost: 5,
    cubicProduct: true, forSoft: false,
    rotor: "heavy_duty_rotor_rebar_tolerant",
    bestUse: "concrete_recycle_demolition_rebar_strip",
  },
  autogenous_rock_on_rock: {
    capacity: 8, reductionRatio: 5, productShape: 9, wear: 8, icCost: 4,
    cubicProduct: true, forSoft: false,
    rotor: "rock_on_rock_anvil_ring_autogenous",
    bestUse: "abrasive_rock_low_wear_self_lining",
  },
};

function get(t: ImpactCrusherType): ImpactCrusherData {
  return DATA[t];
}

export const capacity = (t: ImpactCrusherType) => get(t).capacity;
export const reductionRatio = (t: ImpactCrusherType) => get(t).reductionRatio;
export const productShape = (t: ImpactCrusherType) => get(t).productShape;
export const wear = (t: ImpactCrusherType) => get(t).wear;
export const icCost = (t: ImpactCrusherType) => get(t).icCost;
export const cubicProduct = (t: ImpactCrusherType) => get(t).cubicProduct;
export const forSoft = (t: ImpactCrusherType) => get(t).forSoft;
export const rotor = (t: ImpactCrusherType) => get(t).rotor;
export const bestUse = (t: ImpactCrusherType) => get(t).bestUse;
export const impactCrusherTypes = (): ImpactCrusherType[] =>
  Object.keys(DATA) as ImpactCrusherType[];
