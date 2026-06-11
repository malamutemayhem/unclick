export type StencilPrintType =
  | "hand_cut_paper_craft"
  | "photo_emulsion_screen"
  | "laser_cut_metal_smt"
  | "electroform_nickel_fine"
  | "chemical_etch_step_stencil";

interface StencilPrintData {
  precision: number;
  durability: number;
  speed: number;
  pasteRelease: number;
  stCost: number;
  reusable: boolean;
  forElectronics: boolean;
  aperture: string;
  bestUse: string;
}

const DATA: Record<StencilPrintType, StencilPrintData> = {
  hand_cut_paper_craft: {
    precision: 3, durability: 2, speed: 3, pasteRelease: 4, stCost: 1,
    reusable: false, forElectronics: false,
    aperture: "hand_cut_blade_paper_mylar",
    bestUse: "art_craft_signage_stencil_spray",
  },
  photo_emulsion_screen: {
    precision: 6, durability: 5, speed: 6, pasteRelease: 6, stCost: 3,
    reusable: true, forElectronics: false,
    aperture: "uv_exposed_emulsion_mesh",
    bestUse: "graphic_tshirt_poster_multi_use",
  },
  laser_cut_metal_smt: {
    precision: 9, durability: 9, speed: 8, pasteRelease: 8, stCost: 6,
    reusable: true, forElectronics: true,
    aperture: "laser_cut_stainless_trapezoidal",
    bestUse: "smt_solder_paste_standard_pitch",
  },
  electroform_nickel_fine: {
    precision: 10, durability: 8, speed: 8, pasteRelease: 10, stCost: 9,
    reusable: true, forElectronics: true,
    aperture: "electrodeposited_nickel_smooth_wall",
    bestUse: "fine_pitch_bga_01005_component",
  },
  chemical_etch_step_stencil: {
    precision: 8, durability: 7, speed: 7, pasteRelease: 7, stCost: 7,
    reusable: true, forElectronics: true,
    aperture: "chemical_etch_variable_thickness",
    bestUse: "mixed_component_step_down_area",
  },
};

function get(t: StencilPrintType): StencilPrintData {
  return DATA[t];
}

export const precision = (t: StencilPrintType) => get(t).precision;
export const durability = (t: StencilPrintType) => get(t).durability;
export const speed = (t: StencilPrintType) => get(t).speed;
export const pasteRelease = (t: StencilPrintType) => get(t).pasteRelease;
export const stCost = (t: StencilPrintType) => get(t).stCost;
export const reusable = (t: StencilPrintType) => get(t).reusable;
export const forElectronics = (t: StencilPrintType) => get(t).forElectronics;
export const aperture = (t: StencilPrintType) => get(t).aperture;
export const bestUse = (t: StencilPrintType) => get(t).bestUse;
export const stencilPrintTypes = (): StencilPrintType[] =>
  Object.keys(DATA) as StencilPrintType[];
