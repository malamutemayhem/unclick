export type SheetPileType =
  | "steel_z_profile_hot_roll"
  | "steel_u_profile_larssen"
  | "vinyl_pvc_lightweight"
  | "aluminum_alloy_marine"
  | "composite_frp_corrosion";

interface SheetPileData {
  strength: number;
  stiffness: number;
  corrosion: number;
  drivability: number;
  spCost: number;
  reusable: boolean;
  forMarine: boolean;
  interlock: string;
  bestUse: string;
}

const DATA: Record<SheetPileType, SheetPileData> = {
  steel_z_profile_hot_roll: {
    strength: 10, stiffness: 10, corrosion: 4, drivability: 8, spCost: 7,
    reusable: true, forMarine: true,
    interlock: "thumb_finger_z_continuous_wall",
    bestUse: "deep_excavation_cofferdam_quay_wall",
  },
  steel_u_profile_larssen: {
    strength: 9, stiffness: 8, corrosion: 4, drivability: 8, spCost: 6,
    reusable: true, forMarine: true,
    interlock: "clutch_swing_u_double_section",
    bestUse: "temporary_shoring_trench_cofferdam",
  },
  vinyl_pvc_lightweight: {
    strength: 3, stiffness: 3, corrosion: 10, drivability: 6, spCost: 3,
    reusable: false, forMarine: false,
    interlock: "snap_fit_pvc_tongue_groove",
    bestUse: "seawall_bulkhead_low_height_erosion",
  },
  aluminum_alloy_marine: {
    strength: 5, stiffness: 5, corrosion: 9, drivability: 7, spCost: 8,
    reusable: true, forMarine: true,
    interlock: "aluminum_extrusion_slide_lock",
    bestUse: "saltwater_dock_light_marine_wall",
  },
  composite_frp_corrosion: {
    strength: 6, stiffness: 6, corrosion: 10, drivability: 5, spCost: 9,
    reusable: false, forMarine: true,
    interlock: "fiberglass_tongue_groove_bond",
    bestUse: "chemical_containment_corrosive_environ",
  },
};

function get(t: SheetPileType): SheetPileData {
  return DATA[t];
}

export const strength = (t: SheetPileType) => get(t).strength;
export const stiffness = (t: SheetPileType) => get(t).stiffness;
export const corrosion = (t: SheetPileType) => get(t).corrosion;
export const drivability = (t: SheetPileType) => get(t).drivability;
export const spCost = (t: SheetPileType) => get(t).spCost;
export const reusable = (t: SheetPileType) => get(t).reusable;
export const forMarine = (t: SheetPileType) => get(t).forMarine;
export const interlock = (t: SheetPileType) => get(t).interlock;
export const bestUse = (t: SheetPileType) => get(t).bestUse;
export const sheetPileTypes = (): SheetPileType[] =>
  Object.keys(DATA) as SheetPileType[];
