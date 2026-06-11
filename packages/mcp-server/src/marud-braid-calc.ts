// marud-braid-calc - marudai braiding disk types

export type MarudBraid =
  | "foam_disk_beginner"
  | "wood_marudai_classic"
  | "acrylic_disk_light"
  | "travel_disk_compact"
  | "weighted_stand_pro";

const DATA: Record<MarudBraid, {
  braidEven: number; patternRange: number; speedBraid: number; portability: number;
  cost: number; freestanding: boolean; forBeginner: boolean; diskBase: string; bestUse: string;
}> = {
  foam_disk_beginner:    { braidEven: 6, patternRange: 5, speedBraid: 8, portability: 10, cost: 2, freestanding: false, forBeginner: true, diskBase: "dense_foam_round", bestUse: "beginner_flat_braid" },
  wood_marudai_classic:  { braidEven: 10, patternRange: 10, speedBraid: 7, portability: 3, cost: 9, freestanding: true, forBeginner: false, diskBase: "hardwood_cross_frame", bestUse: "traditional_kumi_braid" },
  acrylic_disk_light:    { braidEven: 7, patternRange: 6, speedBraid: 8, portability: 8, cost: 4, freestanding: false, forBeginner: true, diskBase: "clear_acrylic_round", bestUse: "lightweight_studio_braid" },
  travel_disk_compact:   { braidEven: 5, patternRange: 4, speedBraid: 7, portability: 10, cost: 3, freestanding: false, forBeginner: true, diskBase: "mini_foam_disk", bestUse: "portable_travel_braid" },
  weighted_stand_pro:    { braidEven: 9, patternRange: 9, speedBraid: 6, portability: 2, cost: 10, freestanding: true, forBeginner: false, diskBase: "weighted_wood_stand", bestUse: "professional_complex_braid" },
};

const get = (m: MarudBraid) => DATA[m];
export const braidEven = (m: MarudBraid) => get(m).braidEven;
export const patternRange = (m: MarudBraid) => get(m).patternRange;
export const speedBraid = (m: MarudBraid) => get(m).speedBraid;
export const portability = (m: MarudBraid) => get(m).portability;
export const braidCost = (m: MarudBraid) => get(m).cost;
export const freestanding = (m: MarudBraid) => get(m).freestanding;
export const forBeginner = (m: MarudBraid) => get(m).forBeginner;
export const diskBase = (m: MarudBraid) => get(m).diskBase;
export const bestUse = (m: MarudBraid) => get(m).bestUse;
export const marudBraids = (): MarudBraid[] => Object.keys(DATA) as MarudBraid[];
