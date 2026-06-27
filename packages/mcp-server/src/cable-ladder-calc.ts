export type CableLadderType =
  | "steel_hot_dip_galv"
  | "aluminum_lightweight"
  | "fiberglass_frp_corr"
  | "stainless_food_grade"
  | "wire_mesh_basket";

const DATA: Record<CableLadderType, {
  loadCapacity: number; corrosionResist: number; installEase: number;
  ventilation: number; ladderCost: number; conductive: boolean;
  forOutdoor: boolean; material: string; bestUse: string;
}> = {
  steel_hot_dip_galv: { loadCapacity: 9, corrosionResist: 7, installEase: 5, ventilation: 8, ladderCost: 5, conductive: true, forOutdoor: true, material: "hot_dip_galvanized_steel", bestUse: "heavy_industrial_run" },
  aluminum_lightweight: { loadCapacity: 6, corrosionResist: 8, installEase: 8, ventilation: 8, ladderCost: 6, conductive: true, forOutdoor: true, material: "extruded_aluminum_alloy", bestUse: "rooftop_lightweight_run" },
  fiberglass_frp_corr: { loadCapacity: 7, corrosionResist: 10, installEase: 7, ventilation: 8, ladderCost: 8, conductive: false, forOutdoor: true, material: "fiberglass_frp_pultruded", bestUse: "chemical_plant_corrosive" },
  stainless_food_grade: { loadCapacity: 8, corrosionResist: 10, installEase: 5, ventilation: 8, ladderCost: 10, conductive: true, forOutdoor: true, material: "stainless_316_polished", bestUse: "food_pharma_cleanroom" },
  wire_mesh_basket: { loadCapacity: 5, corrosionResist: 6, installEase: 10, ventilation: 10, ladderCost: 3, conductive: true, forOutdoor: false, material: "welded_wire_zinc", bestUse: "office_ceiling_data_run" },
};

const get = (t: CableLadderType) => DATA[t];

export const loadCapacity = (t: CableLadderType) => get(t).loadCapacity;
export const corrosionResist = (t: CableLadderType) => get(t).corrosionResist;
export const installEase = (t: CableLadderType) => get(t).installEase;
export const ventilation = (t: CableLadderType) => get(t).ventilation;
export const ladderCost = (t: CableLadderType) => get(t).ladderCost;
export const conductive = (t: CableLadderType) => get(t).conductive;
export const forOutdoor = (t: CableLadderType) => get(t).forOutdoor;
export const material = (t: CableLadderType) => get(t).material;
export const bestUse = (t: CableLadderType) => get(t).bestUse;
export const cableLadders = (): CableLadderType[] => Object.keys(DATA) as CableLadderType[];
