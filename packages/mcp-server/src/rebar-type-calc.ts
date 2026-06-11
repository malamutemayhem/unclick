export type RebarType =
  | "carbon_steel_grade_60"
  | "epoxy_coated_corrosion"
  | "stainless_316_marine"
  | "gfrp_glass_fiber"
  | "galvanized_hot_dip";

const DATA: Record<RebarType, {
  tensile: number; corrosionResist: number; bond: number;
  fatigue: number; rbCost: number; magnetic: boolean;
  forMarine: boolean; coating: string; bestUse: string;
}> = {
  carbon_steel_grade_60: {
    tensile: 8, corrosionResist: 2, bond: 9,
    fatigue: 7, rbCost: 1, magnetic: true,
    forMarine: false, coating: "none_mill_scale_only",
    bestUse: "interior_column_beam_general",
  },
  epoxy_coated_corrosion: {
    tensile: 8, corrosionResist: 7, bond: 7,
    fatigue: 6, rbCost: 2, magnetic: true,
    forMarine: false, coating: "fusion_bonded_epoxy_green",
    bestUse: "bridge_deck_deicing_salt",
  },
  stainless_316_marine: {
    tensile: 7, corrosionResist: 10, bond: 8,
    fatigue: 9, rbCost: 5, magnetic: false,
    forMarine: true, coating: "none_inherent_passive_film",
    bestUse: "coastal_seawall_splash_zone",
  },
  gfrp_glass_fiber: {
    tensile: 9, corrosionResist: 10, bond: 6,
    fatigue: 5, rbCost: 3, magnetic: false,
    forMarine: true, coating: "vinyl_ester_resin_matrix",
    bestUse: "mri_room_non_magnetic_slab",
  },
  galvanized_hot_dip: {
    tensile: 8, corrosionResist: 6, bond: 8,
    fatigue: 7, rbCost: 2, magnetic: true,
    forMarine: false, coating: "zinc_hot_dip_galvanize",
    bestUse: "parking_garage_moderate_exposure",
  },
};

const get = (t: RebarType) => DATA[t];

export const tensile = (t: RebarType) => get(t).tensile;
export const corrosionResist = (t: RebarType) => get(t).corrosionResist;
export const bond = (t: RebarType) => get(t).bond;
export const fatigue = (t: RebarType) => get(t).fatigue;
export const rbCost = (t: RebarType) => get(t).rbCost;
export const magnetic = (t: RebarType) => get(t).magnetic;
export const forMarine = (t: RebarType) => get(t).forMarine;
export const coating = (t: RebarType) => get(t).coating;
export const bestUse = (t: RebarType) => get(t).bestUse;
export const rebarTypes = (): RebarType[] => Object.keys(DATA) as RebarType[];
