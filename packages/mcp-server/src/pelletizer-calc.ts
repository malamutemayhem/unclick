export type PelletizerType =
  | "strand_pelletizer"
  | "underwater_pelletizer"
  | "water_ring_pelletizer"
  | "hot_face_pelletizer"
  | "drop_pelletizer";

interface PelletizerData {
  pelletQuality: number;
  throughput: number;
  sizeRange: number;
  coolingRate: number;
  plCost: number;
  forHighMelt: boolean;
  forMicro: boolean;
  pelletConfig: string;
  bestUse: string;
}

const DATA: Record<PelletizerType, PelletizerData> = {
  strand_pelletizer: {
    pelletQuality: 7, throughput: 8, sizeRange: 6, coolingRate: 6, plCost: 4,
    forHighMelt: false, forMicro: false,
    pelletConfig: "strand_pelletizer_extrude_cool_cut_standard_polymer_pellet",
    bestUse: "commodity_polymer_strand_pelletizer_simple_reliable_standard",
  },
  underwater_pelletizer: {
    pelletQuality: 10, throughput: 10, sizeRange: 8, coolingRate: 10, plCost: 9,
    forHighMelt: true, forMicro: true,
    pelletConfig: "underwater_pelletizer_die_face_cut_water_chamber_instant_cool",
    bestUse: "engineering_resin_underwater_pelletizer_spherical_uniform_high",
  },
  water_ring_pelletizer: {
    pelletQuality: 8, throughput: 8, sizeRange: 7, coolingRate: 8, plCost: 6,
    forHighMelt: false, forMicro: false,
    pelletConfig: "water_ring_pelletizer_centrifugal_cut_water_cool_semi_sphere",
    bestUse: "polyolefin_water_ring_pelletizer_centrifugal_semi_crystalline",
  },
  hot_face_pelletizer: {
    pelletQuality: 6, throughput: 9, sizeRange: 5, coolingRate: 5, plCost: 5,
    forHighMelt: true, forMicro: false,
    pelletConfig: "hot_face_pelletizer_die_face_cut_air_cool_wax_compound_filler",
    bestUse: "compound_wax_hot_face_pelletizer_die_face_air_cool_filler_batch",
  },
  drop_pelletizer: {
    pelletQuality: 9, throughput: 6, sizeRange: 9, coolingRate: 7, plCost: 7,
    forHighMelt: false, forMicro: true,
    pelletConfig: "drop_pelletizer_pastille_rotoform_belt_cool_uniform_droplet",
    bestUse: "pastille_drop_pelletizer_rotoform_belt_cool_chemical_additive",
  },
};

function get(t: PelletizerType): PelletizerData {
  return DATA[t];
}

export const pelletQuality = (t: PelletizerType) => get(t).pelletQuality;
export const throughput = (t: PelletizerType) => get(t).throughput;
export const sizeRange = (t: PelletizerType) => get(t).sizeRange;
export const coolingRate = (t: PelletizerType) => get(t).coolingRate;
export const plCost = (t: PelletizerType) => get(t).plCost;
export const forHighMelt = (t: PelletizerType) => get(t).forHighMelt;
export const forMicro = (t: PelletizerType) => get(t).forMicro;
export const pelletConfig = (t: PelletizerType) => get(t).pelletConfig;
export const bestUse = (t: PelletizerType) => get(t).bestUse;
export const pelletizerTypes = (): PelletizerType[] =>
  Object.keys(DATA) as PelletizerType[];
