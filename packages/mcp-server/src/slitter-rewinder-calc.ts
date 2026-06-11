export type SlitterRewinderType =
  | "razor_blade"
  | "shear_cut"
  | "score_cut"
  | "hot_knife"
  | "laser_slit";

interface SlitterRewinderData {
  cutQuality: number;
  throughput: number;
  materialRange: number;
  edgeCleanliness: number;
  srCost: number;
  contactFree: boolean;
  forFilm: boolean;
  slitterConfig: string;
  bestUse: string;
}

const DATA: Record<SlitterRewinderType, SlitterRewinderData> = {
  razor_blade: {
    cutQuality: 8, throughput: 8, materialRange: 7, edgeCleanliness: 9, srCost: 4,
    contactFree: false, forFilm: true,
    slitterConfig: "razor_blade_slitter_rewinder_sharp_blade_holder_shear_web_film",
    bestUse: "flexible_film_razor_blade_slitter_rewinder_thin_film_clean_cut",
  },
  shear_cut: {
    cutQuality: 9, throughput: 9, materialRange: 9, edgeCleanliness: 9, srCost: 7,
    contactFree: false, forFilm: false,
    slitterConfig: "shear_cut_slitter_rewinder_top_bottom_blade_rotary_scissors",
    bestUse: "paper_board_shear_cut_slitter_rewinder_clean_edge_heavy_web",
  },
  score_cut: {
    cutQuality: 6, throughput: 9, materialRange: 6, edgeCleanliness: 6, srCost: 5,
    contactFree: false, forFilm: false,
    slitterConfig: "score_cut_slitter_rewinder_blade_press_anvil_roll_crush_score",
    bestUse: "non_woven_score_cut_slitter_rewinder_simple_soft_web_material",
  },
  hot_knife: {
    cutQuality: 8, throughput: 7, materialRange: 8, edgeCleanliness: 8, srCost: 6,
    contactFree: false, forFilm: true,
    slitterConfig: "hot_knife_slitter_rewinder_heated_blade_melt_seal_synthetic_web",
    bestUse: "synthetic_fabric_hot_knife_slitter_melt_seal_edge_fray_prevent",
  },
  laser_slit: {
    cutQuality: 10, throughput: 6, materialRange: 7, edgeCleanliness: 10, srCost: 10,
    contactFree: true, forFilm: true,
    slitterConfig: "laser_slit_rewinder_focused_beam_non_contact_precision_slit",
    bestUse: "precision_laser_slit_rewinder_battery_separator_medical_film",
  },
};

function get(t: SlitterRewinderType): SlitterRewinderData {
  return DATA[t];
}

export const cutQuality = (t: SlitterRewinderType) => get(t).cutQuality;
export const throughput = (t: SlitterRewinderType) => get(t).throughput;
export const materialRange = (t: SlitterRewinderType) => get(t).materialRange;
export const edgeCleanliness = (t: SlitterRewinderType) => get(t).edgeCleanliness;
export const srCost = (t: SlitterRewinderType) => get(t).srCost;
export const contactFree = (t: SlitterRewinderType) => get(t).contactFree;
export const forFilm = (t: SlitterRewinderType) => get(t).forFilm;
export const slitterConfig = (t: SlitterRewinderType) => get(t).slitterConfig;
export const bestUse = (t: SlitterRewinderType) => get(t).bestUse;
export const slitterRewinderTypes = (): SlitterRewinderType[] =>
  Object.keys(DATA) as SlitterRewinderType[];
