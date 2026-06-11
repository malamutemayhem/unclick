export type GeomembraneType =
  | "hdpe_smooth_liner"
  | "hdpe_textured_slope"
  | "lldpe_flexible_liner"
  | "pvc_reinforced_pond"
  | "epdm_rubber_exposed";

interface GeomembraneData {
  impermeability: number;
  durability: number;
  flexibility: number;
  uvResistance: number;
  gmCost: number;
  weldable: boolean;
  forExposed: boolean;
  thickness: string;
  bestUse: string;
}

const DATA: Record<GeomembraneType, GeomembraneData> = {
  hdpe_smooth_liner: {
    impermeability: 10, durability: 9, flexibility: 5, uvResistance: 8, gmCost: 5,
    weldable: true, forExposed: false,
    thickness: "hdpe_60_80mil_smooth_black",
    bestUse: "landfill_containment_liner",
  },
  hdpe_textured_slope: {
    impermeability: 10, durability: 9, flexibility: 5, uvResistance: 8, gmCost: 6,
    weldable: true, forExposed: false,
    thickness: "hdpe_60mil_textured_both_side",
    bestUse: "steep_slope_landfill_cap",
  },
  lldpe_flexible_liner: {
    impermeability: 9, durability: 7, flexibility: 9, uvResistance: 6, gmCost: 4,
    weldable: true, forExposed: false,
    thickness: "lldpe_40_60mil_flexible",
    bestUse: "pond_lagoon_irregular_subgrade",
  },
  pvc_reinforced_pond: {
    impermeability: 8, durability: 6, flexibility: 8, uvResistance: 5, gmCost: 3,
    weldable: false, forExposed: true,
    thickness: "pvc_30mil_reinforced_scrim",
    bestUse: "decorative_pond_water_feature",
  },
  epdm_rubber_exposed: {
    impermeability: 8, durability: 8, flexibility: 10, uvResistance: 10, gmCost: 7,
    weldable: false, forExposed: true,
    thickness: "epdm_45_60mil_rubber_sheet",
    bestUse: "exposed_roof_pond_reservoir",
  },
};

function get(t: GeomembraneType): GeomembraneData {
  return DATA[t];
}

export const impermeability = (t: GeomembraneType) => get(t).impermeability;
export const durability = (t: GeomembraneType) => get(t).durability;
export const flexibility = (t: GeomembraneType) => get(t).flexibility;
export const uvResistance = (t: GeomembraneType) => get(t).uvResistance;
export const gmCost = (t: GeomembraneType) => get(t).gmCost;
export const weldable = (t: GeomembraneType) => get(t).weldable;
export const forExposed = (t: GeomembraneType) => get(t).forExposed;
export const thickness = (t: GeomembraneType) => get(t).thickness;
export const bestUse = (t: GeomembraneType) => get(t).bestUse;
export const geomembraneTypes = (): GeomembraneType[] =>
  Object.keys(DATA) as GeomembraneType[];
