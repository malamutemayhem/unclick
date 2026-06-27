export type SoffitTypeType =
  | "vinyl_perforated_vented"
  | "aluminum_continuous_vent"
  | "wood_tongue_groove"
  | "fiber_cement_smooth"
  | "steel_perforated_commercial";

interface SoffitTypeData {
  ventilation: number;
  durability: number;
  aesthetic: number;
  maintenance: number;
  sfCost: number;
  vented: boolean;
  forCommercial: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<SoffitTypeType, SoffitTypeData> = {
  vinyl_perforated_vented: {
    ventilation: 8, durability: 6, aesthetic: 5, maintenance: 9, sfCost: 2,
    vented: true, forCommercial: false,
    material: "pvc_vinyl_perforated_panel",
    bestUse: "residential_eave_budget",
  },
  aluminum_continuous_vent: {
    ventilation: 9, durability: 8, aesthetic: 7, maintenance: 9, sfCost: 5,
    vented: true, forCommercial: true,
    material: "powder_coat_aluminum_continuous",
    bestUse: "commercial_continuous_ventilation",
  },
  wood_tongue_groove: {
    ventilation: 3, durability: 4, aesthetic: 9, maintenance: 3, sfCost: 6,
    vented: false, forCommercial: false,
    material: "cedar_redwood_tongue_groove",
    bestUse: "craftsman_historic_exposed_eave",
  },
  fiber_cement_smooth: {
    ventilation: 5, durability: 9, aesthetic: 7, maintenance: 8, sfCost: 6,
    vented: false, forCommercial: true,
    material: "fiber_cement_smooth_primed",
    bestUse: "fire_zone_non_combustible_eave",
  },
  steel_perforated_commercial: {
    ventilation: 7, durability: 10, aesthetic: 6, maintenance: 8, sfCost: 7,
    vented: true, forCommercial: true,
    material: "galvanized_steel_perforated",
    bestUse: "commercial_parking_canopy_underside",
  },
};

function get(t: SoffitTypeType): SoffitTypeData {
  return DATA[t];
}

export const ventilation = (t: SoffitTypeType) => get(t).ventilation;
export const durability = (t: SoffitTypeType) => get(t).durability;
export const aesthetic = (t: SoffitTypeType) => get(t).aesthetic;
export const maintenance = (t: SoffitTypeType) => get(t).maintenance;
export const sfCost = (t: SoffitTypeType) => get(t).sfCost;
export const vented = (t: SoffitTypeType) => get(t).vented;
export const forCommercial = (t: SoffitTypeType) => get(t).forCommercial;
export const material = (t: SoffitTypeType) => get(t).material;
export const bestUse = (t: SoffitTypeType) => get(t).bestUse;
export const soffitTypeTypes = (): SoffitTypeType[] =>
  Object.keys(DATA) as SoffitTypeType[];
