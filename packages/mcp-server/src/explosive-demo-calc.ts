export type ExplosiveDemoType =
  | "dynamite_nitroglycerin_stick"
  | "emulsion_bulk_pump_truck"
  | "anfo_ammonium_nitrate_fuel"
  | "det_cord_pentaerythritol"
  | "shaped_charge_linear_cut";

interface ExplosiveDemoData {
  power: number;
  precision: number;
  safety: number;
  waterResist: number;
  edCost: number;
  bulkLoaded: boolean;
  forQuarry: boolean;
  initiation: string;
  bestUse: string;
}

const DATA: Record<ExplosiveDemoType, ExplosiveDemoData> = {
  dynamite_nitroglycerin_stick: {
    power: 8, precision: 6, safety: 4, waterResist: 5, edCost: 6,
    bulkLoaded: false, forQuarry: true,
    initiation: "blasting_cap_detonator_electric",
    bestUse: "hard_rock_tunnel_drift_small_bore",
  },
  emulsion_bulk_pump_truck: {
    power: 9, precision: 5, safety: 8, waterResist: 10, edCost: 4,
    bulkLoaded: true, forQuarry: true,
    initiation: "booster_primer_non_electric_shock",
    bestUse: "open_pit_mine_bench_blast_wet_hole",
  },
  anfo_ammonium_nitrate_fuel: {
    power: 7, precision: 4, safety: 7, waterResist: 2, edCost: 2,
    bulkLoaded: true, forQuarry: true,
    initiation: "booster_primer_pneumatic_load",
    bestUse: "dry_quarry_construction_blast_bulk",
  },
  det_cord_pentaerythritol: {
    power: 5, precision: 8, safety: 6, waterResist: 7, edCost: 7,
    bulkLoaded: false, forQuarry: false,
    initiation: "petn_core_instantaneous_line",
    bestUse: "trunk_line_timing_perimeter_trim",
  },
  shaped_charge_linear_cut: {
    power: 6, precision: 10, safety: 5, waterResist: 6, edCost: 10,
    bulkLoaded: false, forQuarry: false,
    initiation: "copper_liner_focused_jet_cut",
    bestUse: "steel_cut_demolition_surgical_sever",
  },
};

function get(t: ExplosiveDemoType): ExplosiveDemoData {
  return DATA[t];
}

export const power = (t: ExplosiveDemoType) => get(t).power;
export const precision = (t: ExplosiveDemoType) => get(t).precision;
export const safety = (t: ExplosiveDemoType) => get(t).safety;
export const waterResist = (t: ExplosiveDemoType) => get(t).waterResist;
export const edCost = (t: ExplosiveDemoType) => get(t).edCost;
export const bulkLoaded = (t: ExplosiveDemoType) => get(t).bulkLoaded;
export const forQuarry = (t: ExplosiveDemoType) => get(t).forQuarry;
export const initiation = (t: ExplosiveDemoType) => get(t).initiation;
export const bestUse = (t: ExplosiveDemoType) => get(t).bestUse;
export const explosiveDemoTypes = (): ExplosiveDemoType[] =>
  Object.keys(DATA) as ExplosiveDemoType[];
