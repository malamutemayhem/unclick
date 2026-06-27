export type CurtainWallType =
  | "stick_built_field_assembled"
  | "unitized_prefab_panel"
  | "structural_glazed_silicone"
  | "point_supported_spider"
  | "double_skin_ventilated";

interface CurtainWallData {
  thermal: number;
  structural: number;
  aesthetic: number;
  speed: number;
  cwCost: number;
  prefabricated: boolean;
  forHighRise: boolean;
  glazing: string;
  bestUse: string;
}

const DATA: Record<CurtainWallType, CurtainWallData> = {
  stick_built_field_assembled: {
    thermal: 6, structural: 6, aesthetic: 6, speed: 4, cwCost: 4,
    prefabricated: false, forHighRise: false,
    glazing: "captured_pressure_plate_gasket",
    bestUse: "low_rise_simple_storefront",
  },
  unitized_prefab_panel: {
    thermal: 8, structural: 8, aesthetic: 8, speed: 10, cwCost: 8,
    prefabricated: true, forHighRise: true,
    glazing: "factory_glazed_unitized_frame",
    bestUse: "high_rise_fast_track_schedule",
  },
  structural_glazed_silicone: {
    thermal: 7, structural: 7, aesthetic: 9, speed: 6, cwCost: 7,
    prefabricated: false, forHighRise: true,
    glazing: "structural_silicone_flush_face",
    bestUse: "flush_glass_modern_aesthetic",
  },
  point_supported_spider: {
    thermal: 5, structural: 5, aesthetic: 10, speed: 3, cwCost: 10,
    prefabricated: false, forHighRise: false,
    glazing: "point_fix_spider_fitting_bolt",
    bestUse: "atrium_lobby_feature_glass",
  },
  double_skin_ventilated: {
    thermal: 10, structural: 7, aesthetic: 8, speed: 5, cwCost: 9,
    prefabricated: false, forHighRise: true,
    glazing: "inner_outer_cavity_ventilated",
    bestUse: "energy_efficient_office_tower",
  },
};

function get(t: CurtainWallType): CurtainWallData {
  return DATA[t];
}

export const thermal = (t: CurtainWallType) => get(t).thermal;
export const structural = (t: CurtainWallType) => get(t).structural;
export const aesthetic = (t: CurtainWallType) => get(t).aesthetic;
export const speed = (t: CurtainWallType) => get(t).speed;
export const cwCost = (t: CurtainWallType) => get(t).cwCost;
export const prefabricated = (t: CurtainWallType) => get(t).prefabricated;
export const forHighRise = (t: CurtainWallType) => get(t).forHighRise;
export const glazing = (t: CurtainWallType) => get(t).glazing;
export const bestUse = (t: CurtainWallType) => get(t).bestUse;
export const curtainWallTypes = (): CurtainWallType[] =>
  Object.keys(DATA) as CurtainWallType[];
