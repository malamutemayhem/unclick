export type DemolitionMethodType =
  | "mechanical_excavator_crush"
  | "implosion_controlled_blast"
  | "deconstruction_hand_salvage"
  | "hydro_demolition_water_jet"
  | "chemical_expansion_silent";

interface DemolitionMethodData {
  speed: number;
  precision: number;
  noise: number;
  debris: number;
  dmCost: number;
  explosive: boolean;
  forConcrete: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<DemolitionMethodType, DemolitionMethodData> = {
  mechanical_excavator_crush: {
    speed: 8, precision: 5, noise: 4, debris: 4, dmCost: 5,
    explosive: false, forConcrete: true,
    method: "hydraulic_jaw_crusher_shear_attach",
    bestUse: "building_slab_bridge_general_demo",
  },
  implosion_controlled_blast: {
    speed: 10, precision: 8, noise: 1, debris: 3, dmCost: 9,
    explosive: true, forConcrete: true,
    method: "timed_charge_sequence_progressive",
    bestUse: "high_rise_tower_stadium_urban_drop",
  },
  deconstruction_hand_salvage: {
    speed: 2, precision: 10, noise: 8, debris: 9, dmCost: 7,
    explosive: false, forConcrete: false,
    method: "manual_reverse_build_sort_salvage",
    bestUse: "heritage_material_reclaim_green_demo",
  },
  hydro_demolition_water_jet: {
    speed: 5, precision: 9, noise: 6, debris: 7, dmCost: 8,
    explosive: false, forConcrete: true,
    method: "ultra_high_pressure_water_jet_robot",
    bestUse: "selective_concrete_remove_rebar_keep",
  },
  chemical_expansion_silent: {
    speed: 3, precision: 7, noise: 10, debris: 6, dmCost: 6,
    explosive: false, forConcrete: true,
    method: "expansive_grout_drill_hole_crack",
    bestUse: "sensitive_area_no_vibration_no_noise",
  },
};

function get(t: DemolitionMethodType): DemolitionMethodData {
  return DATA[t];
}

export const speed = (t: DemolitionMethodType) => get(t).speed;
export const precision = (t: DemolitionMethodType) => get(t).precision;
export const noise = (t: DemolitionMethodType) => get(t).noise;
export const debris = (t: DemolitionMethodType) => get(t).debris;
export const dmCost = (t: DemolitionMethodType) => get(t).dmCost;
export const explosive = (t: DemolitionMethodType) => get(t).explosive;
export const forConcrete = (t: DemolitionMethodType) => get(t).forConcrete;
export const method = (t: DemolitionMethodType) => get(t).method;
export const bestUse = (t: DemolitionMethodType) => get(t).bestUse;
export const demolitionMethodTypes = (): DemolitionMethodType[] =>
  Object.keys(DATA) as DemolitionMethodType[];
