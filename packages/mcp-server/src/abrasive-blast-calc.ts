export type AbrasiveBlastType =
  | "pressure_pot_dry"
  | "suction_cabinet_dry"
  | "wet_blast_slurry"
  | "wheel_blast_centrifugal"
  | "dry_ice_blast_co2";

interface AbrasiveBlastData {
  aggression: number;
  speed: number;
  dustControl: number;
  surfaceFinish: number;
  abCost: number;
  noResidual: boolean;
  forHeavy: boolean;
  media: string;
  bestUse: string;
}

const DATA: Record<AbrasiveBlastType, AbrasiveBlastData> = {
  pressure_pot_dry: {
    aggression: 10, speed: 9, dustControl: 4, surfaceFinish: 6, abCost: 4,
    noResidual: false, forHeavy: true,
    media: "garnet_aluminum_oxide_steel_grit",
    bestUse: "structural_steel_ship_hull_prep",
  },
  suction_cabinet_dry: {
    aggression: 7, speed: 6, dustControl: 9, surfaceFinish: 8, abCost: 5,
    noResidual: false, forHeavy: false,
    media: "glass_bead_aluminum_oxide_fine",
    bestUse: "small_part_mold_cleaning_cabinet",
  },
  wet_blast_slurry: {
    aggression: 6, speed: 7, dustControl: 10, surfaceFinish: 9, abCost: 6,
    noResidual: false, forHeavy: false,
    media: "water_slurry_fine_abrasive_mix",
    bestUse: "medical_implant_turbine_blade_fin",
  },
  wheel_blast_centrifugal: {
    aggression: 9, speed: 10, dustControl: 7, surfaceFinish: 6, abCost: 3,
    noResidual: false, forHeavy: true,
    media: "steel_shot_grit_centrifugal",
    bestUse: "casting_forging_plate_descale",
  },
  dry_ice_blast_co2: {
    aggression: 4, speed: 5, dustControl: 8, surfaceFinish: 7, abCost: 9,
    noResidual: true, forHeavy: false,
    media: "co2_dry_ice_pellet_sublimate",
    bestUse: "electrical_panel_mold_food_equip",
  },
};

function get(t: AbrasiveBlastType): AbrasiveBlastData {
  return DATA[t];
}

export const aggression = (t: AbrasiveBlastType) => get(t).aggression;
export const speed = (t: AbrasiveBlastType) => get(t).speed;
export const dustControl = (t: AbrasiveBlastType) => get(t).dustControl;
export const surfaceFinish = (t: AbrasiveBlastType) => get(t).surfaceFinish;
export const abCost = (t: AbrasiveBlastType) => get(t).abCost;
export const noResidual = (t: AbrasiveBlastType) => get(t).noResidual;
export const forHeavy = (t: AbrasiveBlastType) => get(t).forHeavy;
export const media = (t: AbrasiveBlastType) => get(t).media;
export const bestUse = (t: AbrasiveBlastType) => get(t).bestUse;
export const abrasiveBlastTypes = (): AbrasiveBlastType[] =>
  Object.keys(DATA) as AbrasiveBlastType[];
