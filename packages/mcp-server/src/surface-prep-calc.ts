export type SurfacePrepType =
  | "abrasive_blast_grit"
  | "wet_blast_slurry"
  | "power_tool_grind"
  | "chemical_acid_pickle"
  | "laser_ablation_clean";

interface SurfacePrepData {
  profile: number;
  speed: number;
  cleanliness: number;
  dustFree: number;
  spCost: number;
  ecofriendly: boolean;
  forCoating: boolean;
  media: string;
  bestUse: string;
}

const DATA: Record<SurfacePrepType, SurfacePrepData> = {
  abrasive_blast_grit: {
    profile: 10, speed: 9, cleanliness: 10, dustFree: 3, spCost: 5,
    ecofriendly: false, forCoating: true,
    media: "steel_grit_garnet_aluminum_oxide",
    bestUse: "structural_steel_ship_sa2_5_prep",
  },
  wet_blast_slurry: {
    profile: 8, speed: 7, cleanliness: 9, dustFree: 9, spCost: 7,
    ecofriendly: true, forCoating: true,
    media: "water_abrasive_slurry_garnet_mix",
    bestUse: "offshore_confined_space_dust_free",
  },
  power_tool_grind: {
    profile: 6, speed: 5, cleanliness: 6, dustFree: 4, spCost: 3,
    ecofriendly: false, forCoating: true,
    media: "flap_disc_needle_scaler_wire_brush",
    bestUse: "spot_repair_weld_seam_touch_up",
  },
  chemical_acid_pickle: {
    profile: 3, speed: 6, cleanliness: 9, dustFree: 10, spCost: 6,
    ecofriendly: false, forCoating: true,
    media: "hydrochloric_phosphoric_acid_bath",
    bestUse: "stainless_galvanize_pre_treatment",
  },
  laser_ablation_clean: {
    profile: 5, speed: 8, cleanliness: 10, dustFree: 10, spCost: 10,
    ecofriendly: true, forCoating: true,
    media: "pulsed_fiber_laser_ablation_beam",
    bestUse: "precision_mold_heritage_selective",
  },
};

function get(t: SurfacePrepType): SurfacePrepData {
  return DATA[t];
}

export const profile = (t: SurfacePrepType) => get(t).profile;
export const speed = (t: SurfacePrepType) => get(t).speed;
export const cleanliness = (t: SurfacePrepType) => get(t).cleanliness;
export const dustFree = (t: SurfacePrepType) => get(t).dustFree;
export const spCost = (t: SurfacePrepType) => get(t).spCost;
export const ecofriendly = (t: SurfacePrepType) => get(t).ecofriendly;
export const forCoating = (t: SurfacePrepType) => get(t).forCoating;
export const media = (t: SurfacePrepType) => get(t).media;
export const bestUse = (t: SurfacePrepType) => get(t).bestUse;
export const surfacePrepTypes = (): SurfacePrepType[] =>
  Object.keys(DATA) as SurfacePrepType[];
