export type BeltFilterType =
  | "gravity_belt_thicken"
  | "pressure_belt_dewater"
  | "vacuum_belt_horizontal"
  | "belt_press_combo"
  | "enclosed_belt_fume";

interface BeltFilterData {
  cakeDryness: number;
  throughput: number;
  washability: number;
  footprint: number;
  bfCost: number;
  continuous: boolean;
  forSludge: boolean;
  belt: string;
  bestUse: string;
}

const DATA: Record<BeltFilterType, BeltFilterData> = {
  gravity_belt_thicken: {
    cakeDryness: 3, throughput: 8, washability: 6, footprint: 7, bfCost: 3,
    continuous: true, forSludge: true,
    belt: "polyester_mesh_gravity_drain_wedge",
    bestUse: "municipal_sludge_thicken_pretreat",
  },
  pressure_belt_dewater: {
    cakeDryness: 7, throughput: 8, washability: 7, footprint: 6, bfCost: 6,
    continuous: true, forSludge: true,
    belt: "endless_belt_press_roller_squeeze",
    bestUse: "wastewater_sludge_dewater_municipal",
  },
  vacuum_belt_horizontal: {
    cakeDryness: 6, throughput: 9, washability: 10, footprint: 4, bfCost: 7,
    continuous: true, forSludge: false,
    belt: "rubber_belt_vacuum_box_suction_table",
    bestUse: "mineral_concentrate_wash_countercurrent",
  },
  belt_press_combo: {
    cakeDryness: 8, throughput: 9, washability: 8, footprint: 5, bfCost: 8,
    continuous: true, forSludge: true,
    belt: "dual_belt_gravity_then_pressure_zone",
    bestUse: "paper_mill_effluent_high_vol_dewater",
  },
  enclosed_belt_fume: {
    cakeDryness: 7, throughput: 7, washability: 7, footprint: 6, bfCost: 9,
    continuous: true, forSludge: false,
    belt: "sealed_hood_belt_fume_extract_contain",
    bestUse: "chemical_toxic_fume_contain_filter",
  },
};

function get(t: BeltFilterType): BeltFilterData {
  return DATA[t];
}

export const cakeDryness = (t: BeltFilterType) => get(t).cakeDryness;
export const throughput = (t: BeltFilterType) => get(t).throughput;
export const washability = (t: BeltFilterType) => get(t).washability;
export const footprint = (t: BeltFilterType) => get(t).footprint;
export const bfCost = (t: BeltFilterType) => get(t).bfCost;
export const continuous = (t: BeltFilterType) => get(t).continuous;
export const forSludge = (t: BeltFilterType) => get(t).forSludge;
export const belt = (t: BeltFilterType) => get(t).belt;
export const bestUse = (t: BeltFilterType) => get(t).bestUse;
export const beltFilterTypes = (): BeltFilterType[] =>
  Object.keys(DATA) as BeltFilterType[];
