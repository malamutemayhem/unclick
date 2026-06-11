export type StuccoType =
  | "traditional_three_coat"
  | "one_coat_modified"
  | "eifs_synthetic_foam"
  | "acrylic_finish_thin"
  | "lime_plaster_historic";

interface StuccoData {
  durability: number;
  flexibility: number;
  insulation: number;
  aesthetic: number;
  stCost: number;
  breathable: boolean;
  forExterior: boolean;
  binder: string;
  bestUse: string;
}

const DATA: Record<StuccoType, StuccoData> = {
  traditional_three_coat: {
    durability: 9, flexibility: 4, insulation: 5, aesthetic: 7, stCost: 6,
    breathable: true, forExterior: true,
    binder: "portland_cement_lime_sand",
    bestUse: "residential_masonry_substrate",
  },
  one_coat_modified: {
    durability: 7, flexibility: 6, insulation: 5, aesthetic: 7, stCost: 4,
    breathable: true, forExterior: true,
    binder: "polymer_modified_fiber_cement",
    bestUse: "wood_frame_fast_application",
  },
  eifs_synthetic_foam: {
    durability: 6, flexibility: 7, insulation: 10, aesthetic: 8, stCost: 7,
    breathable: false, forExterior: true,
    binder: "acrylic_over_eps_foam_board",
    bestUse: "commercial_continuous_insulation",
  },
  acrylic_finish_thin: {
    durability: 7, flexibility: 8, insulation: 3, aesthetic: 9, stCost: 5,
    breathable: true, forExterior: true,
    binder: "acrylic_polymer_thin_coat",
    bestUse: "color_texture_over_cmu_block",
  },
  lime_plaster_historic: {
    durability: 8, flexibility: 6, insulation: 4, aesthetic: 10, stCost: 9,
    breathable: true, forExterior: true,
    binder: "natural_hydraulic_lime_putty",
    bestUse: "historic_restoration_heritage",
  },
};

function get(t: StuccoType): StuccoData {
  return DATA[t];
}

export const durability = (t: StuccoType) => get(t).durability;
export const flexibility = (t: StuccoType) => get(t).flexibility;
export const insulation = (t: StuccoType) => get(t).insulation;
export const aesthetic = (t: StuccoType) => get(t).aesthetic;
export const stCost = (t: StuccoType) => get(t).stCost;
export const breathable = (t: StuccoType) => get(t).breathable;
export const forExterior = (t: StuccoType) => get(t).forExterior;
export const binder = (t: StuccoType) => get(t).binder;
export const bestUse = (t: StuccoType) => get(t).bestUse;
export const stuccoTypes = (): StuccoType[] =>
  Object.keys(DATA) as StuccoType[];
