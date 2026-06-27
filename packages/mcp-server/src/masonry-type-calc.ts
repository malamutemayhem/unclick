export type MasonryType =
  | "clay_brick_fired"
  | "concrete_block_cmu"
  | "aac_autoclaved_aerated"
  | "stone_natural_ashlar"
  | "glass_block_translucent";

const DATA: Record<MasonryType, {
  compressive: number; thermal: number; fireResist: number;
  acoustic: number; msCost: number; loadBearing: boolean;
  forExterior: boolean; bond: string; bestUse: string;
}> = {
  clay_brick_fired: {
    compressive: 8, thermal: 5, fireResist: 9,
    acoustic: 7, msCost: 3, loadBearing: true,
    forExterior: true, bond: "stretcher_running_mortar",
    bestUse: "traditional_facade_load_wall",
  },
  concrete_block_cmu: {
    compressive: 9, thermal: 4, fireResist: 8,
    acoustic: 6, msCost: 1, loadBearing: true,
    forExterior: true, bond: "stack_or_running_grouted",
    bestUse: "foundation_retaining_wall",
  },
  aac_autoclaved_aerated: {
    compressive: 4, thermal: 10, fireResist: 10,
    acoustic: 8, msCost: 3, loadBearing: false,
    forExterior: true, bond: "thin_bed_mortar_adhesive",
    bestUse: "energy_efficient_infill_wall",
  },
  stone_natural_ashlar: {
    compressive: 10, thermal: 6, fireResist: 10,
    acoustic: 9, msCost: 5, loadBearing: true,
    forExterior: true, bond: "ashlar_cut_stone_mortar",
    bestUse: "monumental_heritage_facade",
  },
  glass_block_translucent: {
    compressive: 5, thermal: 7, fireResist: 6,
    acoustic: 5, msCost: 4, loadBearing: false,
    forExterior: false, bond: "silicone_spacer_stack",
    bestUse: "interior_partition_light_transmit",
  },
};

const get = (t: MasonryType) => DATA[t];

export const compressive = (t: MasonryType) => get(t).compressive;
export const thermal = (t: MasonryType) => get(t).thermal;
export const fireResist = (t: MasonryType) => get(t).fireResist;
export const acoustic = (t: MasonryType) => get(t).acoustic;
export const msCost = (t: MasonryType) => get(t).msCost;
export const loadBearing = (t: MasonryType) => get(t).loadBearing;
export const forExterior = (t: MasonryType) => get(t).forExterior;
export const bond = (t: MasonryType) => get(t).bond;
export const bestUse = (t: MasonryType) => get(t).bestUse;
export const masonryTypes = (): MasonryType[] => Object.keys(DATA) as MasonryType[];
