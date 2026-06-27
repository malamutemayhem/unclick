export type TigWelderType =
  | "dc_tig_steel_standard"
  | "ac_tig_aluminum"
  | "pulsed_tig_precision"
  | "hot_wire_tig_fast"
  | "orbital_tig_tube";

interface TigWelderData {
  quality: number;
  control: number;
  speed: number;
  versatility: number;
  twCost: number;
  autogenous: boolean;
  forThinWall: boolean;
  electrode: string;
  bestUse: string;
}

const DATA: Record<TigWelderType, TigWelderData> = {
  dc_tig_steel_standard: {
    quality: 9, control: 9, speed: 4, versatility: 8, twCost: 4,
    autogenous: true, forThinWall: true,
    electrode: "tungsten_2_pct_thoriated_dcen_argon",
    bestUse: "stainless_steel_pipe_root_pass_pressure",
  },
  ac_tig_aluminum: {
    quality: 9, control: 8, speed: 4, versatility: 6, twCost: 5,
    autogenous: false, forThinWall: true,
    electrode: "tungsten_pure_or_ceriated_ac_balance",
    bestUse: "aluminum_magnesium_oxide_clean_aerospace",
  },
  pulsed_tig_precision: {
    quality: 10, control: 10, speed: 5, versatility: 7, twCost: 7,
    autogenous: true, forThinWall: true,
    electrode: "tungsten_lanthanated_pulsed_dc_fine_arc",
    bestUse: "thin_wall_tube_medical_device_jewelry",
  },
  hot_wire_tig_fast: {
    quality: 8, control: 7, speed: 8, versatility: 5, twCost: 8,
    autogenous: false, forThinWall: false,
    electrode: "tungsten_plus_preheated_filler_wire_feed",
    bestUse: "overlay_cladding_thick_section_fill_pass",
  },
  orbital_tig_tube: {
    quality: 10, control: 10, speed: 6, versatility: 4, twCost: 9,
    autogenous: true, forThinWall: true,
    electrode: "enclosed_head_orbital_auto_rotation",
    bestUse: "pharma_semiconductor_tube_weld_cleanroom",
  },
};

function get(t: TigWelderType): TigWelderData {
  return DATA[t];
}

export const quality = (t: TigWelderType) => get(t).quality;
export const control = (t: TigWelderType) => get(t).control;
export const speed = (t: TigWelderType) => get(t).speed;
export const versatility = (t: TigWelderType) => get(t).versatility;
export const twCost = (t: TigWelderType) => get(t).twCost;
export const autogenous = (t: TigWelderType) => get(t).autogenous;
export const forThinWall = (t: TigWelderType) => get(t).forThinWall;
export const electrode = (t: TigWelderType) => get(t).electrode;
export const bestUse = (t: TigWelderType) => get(t).bestUse;
export const tigWelderTypes = (): TigWelderType[] =>
  Object.keys(DATA) as TigWelderType[];
