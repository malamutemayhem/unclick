export type IbcContainerType =
  | "rigid_composite_cage"
  | "flexible_bulk_bag"
  | "stainless_tote_tank"
  | "folding_ibc_collapsible"
  | "heated_ibc_jacketed";

interface IbcContainerData {
  capacity: number;
  reusability: number;
  stackability: number;
  cleanability: number;
  icCost: number;
  collapsible: boolean;
  forHazmat: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<IbcContainerType, IbcContainerData> = {
  rigid_composite_cage: {
    capacity: 8, reusability: 7, stackability: 9, cleanability: 6, icCost: 5,
    collapsible: false, forHazmat: false,
    material: "hdpe_bladder_steel_cage_pallet",
    bestUse: "chemical_food_liquid_bulk_ship",
  },
  flexible_bulk_bag: {
    capacity: 9, reusability: 3, stackability: 5, cleanability: 2, icCost: 2,
    collapsible: true, forHazmat: false,
    material: "woven_polypropylene_liner_loops",
    bestUse: "dry_powder_granule_one_trip_bulk",
  },
  stainless_tote_tank: {
    capacity: 7, reusability: 10, stackability: 8, cleanability: 10, icCost: 9,
    collapsible: false, forHazmat: true,
    material: "316l_stainless_frame_valve_vent",
    bestUse: "pharma_food_grade_reusable_clean",
  },
  folding_ibc_collapsible: {
    capacity: 7, reusability: 8, stackability: 10, cleanability: 7, icCost: 7,
    collapsible: true, forHazmat: false,
    material: "plastic_wall_fold_flat_pallet_base",
    bestUse: "auto_parts_reusable_return_logistic",
  },
  heated_ibc_jacketed: {
    capacity: 7, reusability: 9, stackability: 6, cleanability: 8, icCost: 10,
    collapsible: false, forHazmat: true,
    material: "stainless_jacket_insulate_heat_trace",
    bestUse: "viscous_wax_chocolate_temp_maintain",
  },
};

function get(t: IbcContainerType): IbcContainerData {
  return DATA[t];
}

export const capacity = (t: IbcContainerType) => get(t).capacity;
export const reusability = (t: IbcContainerType) => get(t).reusability;
export const stackability = (t: IbcContainerType) => get(t).stackability;
export const cleanability = (t: IbcContainerType) => get(t).cleanability;
export const icCost = (t: IbcContainerType) => get(t).icCost;
export const collapsible = (t: IbcContainerType) => get(t).collapsible;
export const forHazmat = (t: IbcContainerType) => get(t).forHazmat;
export const material = (t: IbcContainerType) => get(t).material;
export const bestUse = (t: IbcContainerType) => get(t).bestUse;
export const ibcContainerTypes = (): IbcContainerType[] =>
  Object.keys(DATA) as IbcContainerType[];
