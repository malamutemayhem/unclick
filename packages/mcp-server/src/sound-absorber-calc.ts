export type SoundAbsorberType =
  | "fiberglass_panel_wall"
  | "foam_wedge_anechoic"
  | "perforated_metal_ceil"
  | "fabric_wrapped_core"
  | "microperforated_panel";

interface SoundAbsorberData {
  absorption: number;
  lowFreqPerf: number;
  durability: number;
  aesthetics: number;
  saCost: number;
  cleanable: boolean;
  forIndustrial: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<SoundAbsorberType, SoundAbsorberData> = {
  fiberglass_panel_wall: {
    absorption: 9, lowFreqPerf: 7, durability: 7, aesthetics: 5, saCost: 4,
    cleanable: false, forIndustrial: true,
    material: "rigid_fiberglass_board_faced_scrim_or_foil",
    bestUse: "mechanical_room_factory_ceiling_wall_lining",
  },
  foam_wedge_anechoic: {
    absorption: 10, lowFreqPerf: 8, durability: 4, aesthetics: 3, saCost: 5,
    cleanable: false, forIndustrial: false,
    material: "polyurethane_melamine_foam_wedge_pyramid_cut",
    bestUse: "anechoic_chamber_recording_studio_test_room",
  },
  perforated_metal_ceil: {
    absorption: 7, lowFreqPerf: 5, durability: 10, aesthetics: 8, saCost: 7,
    cleanable: true, forIndustrial: true,
    material: "perforated_aluminum_steel_panel_mineral_wool",
    bestUse: "food_plant_pool_hall_cleanable_ceiling_tile",
  },
  fabric_wrapped_core: {
    absorption: 8, lowFreqPerf: 6, durability: 7, aesthetics: 10, saCost: 6,
    cleanable: false, forIndustrial: false,
    material: "fabric_stretched_over_fiberglass_core_frame",
    bestUse: "office_auditorium_conference_room_decorative",
  },
  microperforated_panel: {
    absorption: 6, lowFreqPerf: 9, durability: 9, aesthetics: 9, saCost: 8,
    cleanable: true, forIndustrial: false,
    material: "thin_metal_plastic_sheet_sub_mm_perforation",
    bestUse: "transparent_resonant_absorber_glass_facade",
  },
};

function get(t: SoundAbsorberType): SoundAbsorberData {
  return DATA[t];
}

export const absorption = (t: SoundAbsorberType) => get(t).absorption;
export const lowFreqPerf = (t: SoundAbsorberType) => get(t).lowFreqPerf;
export const durability = (t: SoundAbsorberType) => get(t).durability;
export const aesthetics = (t: SoundAbsorberType) => get(t).aesthetics;
export const saCost = (t: SoundAbsorberType) => get(t).saCost;
export const cleanable = (t: SoundAbsorberType) => get(t).cleanable;
export const forIndustrial = (t: SoundAbsorberType) => get(t).forIndustrial;
export const material = (t: SoundAbsorberType) => get(t).material;
export const bestUse = (t: SoundAbsorberType) => get(t).bestUse;
export const soundAbsorberTypes = (): SoundAbsorberType[] =>
  Object.keys(DATA) as SoundAbsorberType[];
