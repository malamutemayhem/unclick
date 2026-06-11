export type NutscheFilterType =
  | "open_top_gravity"
  | "agitated_nutsche_closed"
  | "pressure_nutsche_jacketed"
  | "vacuum_nutsche_glass_lined"
  | "filter_dryer_combo";

interface NutscheFilterData {
  cakeDryness: number;
  containment: number;
  washability: number;
  versatility: number;
  nfCost: number;
  agitated: boolean;
  forPharma: boolean;
  vessel: string;
  bestUse: string;
}

const DATA: Record<NutscheFilterType, NutscheFilterData> = {
  open_top_gravity: {
    cakeDryness: 4, containment: 2, washability: 5, versatility: 3, nfCost: 2,
    agitated: false, forPharma: false,
    vessel: "open_cylindrical_perforated_plate_cloth",
    bestUse: "simple_gravity_drain_coarse_crystal",
  },
  agitated_nutsche_closed: {
    cakeDryness: 7, containment: 9, washability: 9, versatility: 8, nfCost: 8,
    agitated: true, forPharma: true,
    vessel: "closed_vessel_agitator_blade_smoothing",
    bestUse: "pharma_api_isolation_contained_wash",
  },
  pressure_nutsche_jacketed: {
    cakeDryness: 8, containment: 10, washability: 9, versatility: 9, nfCost: 9,
    agitated: true, forPharma: true,
    vessel: "jacketed_pressure_vessel_inert_gas",
    bestUse: "potent_compound_high_contain_isolate",
  },
  vacuum_nutsche_glass_lined: {
    cakeDryness: 6, containment: 8, washability: 8, versatility: 7, nfCost: 7,
    agitated: true, forPharma: true,
    vessel: "glass_lined_vessel_corrosion_resist",
    bestUse: "corrosive_acid_slurry_glass_protect",
  },
  filter_dryer_combo: {
    cakeDryness: 10, containment: 10, washability: 10, versatility: 10, nfCost: 10,
    agitated: true, forPharma: true,
    vessel: "heated_agitated_vessel_filter_dry_one",
    bestUse: "single_vessel_filter_wash_dry_pharma",
  },
};

function get(t: NutscheFilterType): NutscheFilterData {
  return DATA[t];
}

export const cakeDryness = (t: NutscheFilterType) => get(t).cakeDryness;
export const containment = (t: NutscheFilterType) => get(t).containment;
export const washability = (t: NutscheFilterType) => get(t).washability;
export const versatility = (t: NutscheFilterType) => get(t).versatility;
export const nfCost = (t: NutscheFilterType) => get(t).nfCost;
export const agitated = (t: NutscheFilterType) => get(t).agitated;
export const forPharma = (t: NutscheFilterType) => get(t).forPharma;
export const vessel = (t: NutscheFilterType) => get(t).vessel;
export const bestUse = (t: NutscheFilterType) => get(t).bestUse;
export const nutscheFilterTypes = (): NutscheFilterType[] =>
  Object.keys(DATA) as NutscheFilterType[];
