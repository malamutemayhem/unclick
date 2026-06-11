export type ScupperType =
  | "through_wall_channel"
  | "through_parapet_open"
  | "conductor_head_box"
  | "overflow_emergency"
  | "decorative_gargoyle";

interface ScupperData {
  flow: number;
  durability: number;
  aesthetic: number;
  maintenance: number;
  spCost: number;
  enclosed: boolean;
  forOverflow: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<ScupperType, ScupperData> = {
  through_wall_channel: {
    flow: 7, durability: 8, aesthetic: 5, maintenance: 8, spCost: 3,
    enclosed: true, forOverflow: false,
    material: "galvanized_steel_copper_lined",
    bestUse: "standard_flat_roof_parapet",
  },
  through_parapet_open: {
    flow: 9, durability: 7, aesthetic: 4, maintenance: 9, spCost: 2,
    enclosed: false, forOverflow: false,
    material: "sheet_metal_open_slot_cut",
    bestUse: "parking_deck_open_drainage",
  },
  conductor_head_box: {
    flow: 8, durability: 9, aesthetic: 8, maintenance: 7, spCost: 6,
    enclosed: true, forOverflow: false,
    material: "copper_aluminum_collector_box",
    bestUse: "downspout_transition_collector",
  },
  overflow_emergency: {
    flow: 10, durability: 8, aesthetic: 3, maintenance: 9, spCost: 4,
    enclosed: false, forOverflow: true,
    material: "cast_iron_open_overflow_slot",
    bestUse: "code_required_secondary_over",
  },
  decorative_gargoyle: {
    flow: 5, durability: 8, aesthetic: 10, maintenance: 6, spCost: 9,
    enclosed: false, forOverflow: false,
    material: "cast_stone_bronze_ornamental",
    bestUse: "historic_church_ornamental_drain",
  },
};

function get(t: ScupperType): ScupperData {
  return DATA[t];
}

export const flow = (t: ScupperType) => get(t).flow;
export const durability = (t: ScupperType) => get(t).durability;
export const aesthetic = (t: ScupperType) => get(t).aesthetic;
export const maintenance = (t: ScupperType) => get(t).maintenance;
export const spCost = (t: ScupperType) => get(t).spCost;
export const enclosed = (t: ScupperType) => get(t).enclosed;
export const forOverflow = (t: ScupperType) => get(t).forOverflow;
export const material = (t: ScupperType) => get(t).material;
export const bestUse = (t: ScupperType) => get(t).bestUse;
export const scupperTypes = (): ScupperType[] =>
  Object.keys(DATA) as ScupperType[];
