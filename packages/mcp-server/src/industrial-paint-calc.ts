export type IndustrialPaintType =
  | "epoxy_primer_two_part"
  | "polyurethane_topcoat"
  | "zinc_rich_primer"
  | "intumescent_fire_protect"
  | "fluoropolymer_pvdf";

interface IndustrialPaintData {
  corrosionResist: number;
  uvResist: number;
  adhesion: number;
  life: number;
  ipCost: number;
  fireRated: boolean;
  forMarine: boolean;
  binder: string;
  bestUse: string;
}

const DATA: Record<IndustrialPaintType, IndustrialPaintData> = {
  epoxy_primer_two_part: {
    corrosionResist: 9, uvResist: 4, adhesion: 10, life: 8, ipCost: 5,
    fireRated: false, forMarine: true,
    binder: "bisphenol_a_epoxy_polyamide_cure",
    bestUse: "steel_structure_tank_primer_coat",
  },
  polyurethane_topcoat: {
    corrosionResist: 7, uvResist: 10, adhesion: 8, life: 9, ipCost: 7,
    fireRated: false, forMarine: true,
    binder: "aliphatic_polyurethane_isocyanate",
    bestUse: "exterior_bridge_facade_gloss_finish",
  },
  zinc_rich_primer: {
    corrosionResist: 10, uvResist: 3, adhesion: 7, life: 10, ipCost: 8,
    fireRated: false, forMarine: true,
    binder: "inorganic_ethyl_silicate_zinc_dust",
    bestUse: "structural_steel_galvanic_cathodic",
  },
  intumescent_fire_protect: {
    corrosionResist: 5, uvResist: 5, adhesion: 8, life: 7, ipCost: 9,
    fireRated: true, forMarine: false,
    binder: "acrylic_intumescent_char_forming",
    bestUse: "steel_beam_column_fire_rating",
  },
  fluoropolymer_pvdf: {
    corrosionResist: 9, uvResist: 10, adhesion: 7, life: 10, ipCost: 10,
    fireRated: false, forMarine: false,
    binder: "polyvinylidene_fluoride_70_30_pvdf",
    bestUse: "architectural_curtain_wall_panel",
  },
};

function get(t: IndustrialPaintType): IndustrialPaintData {
  return DATA[t];
}

export const corrosionResist = (t: IndustrialPaintType) => get(t).corrosionResist;
export const uvResist = (t: IndustrialPaintType) => get(t).uvResist;
export const adhesion = (t: IndustrialPaintType) => get(t).adhesion;
export const life = (t: IndustrialPaintType) => get(t).life;
export const ipCost = (t: IndustrialPaintType) => get(t).ipCost;
export const fireRated = (t: IndustrialPaintType) => get(t).fireRated;
export const forMarine = (t: IndustrialPaintType) => get(t).forMarine;
export const binder = (t: IndustrialPaintType) => get(t).binder;
export const bestUse = (t: IndustrialPaintType) => get(t).bestUse;
export const industrialPaintTypes = (): IndustrialPaintType[] =>
  Object.keys(DATA) as IndustrialPaintType[];
