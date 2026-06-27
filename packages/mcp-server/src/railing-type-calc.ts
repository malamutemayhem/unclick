export type RailingTypeType =
  | "cable_rail_stainless"
  | "glass_panel_frameless"
  | "aluminum_picket_powder"
  | "wrought_iron_ornamental"
  | "wood_baluster_traditional";

interface RailingTypeData {
  strength: number;
  visibility: number;
  aesthetic: number;
  maintenance: number;
  rlCost: number;
  codeCompliant: boolean;
  forExterior: boolean;
  infill: string;
  bestUse: string;
}

const DATA: Record<RailingTypeType, RailingTypeData> = {
  cable_rail_stainless: {
    strength: 7, visibility: 10, aesthetic: 8, maintenance: 8, rlCost: 7,
    codeCompliant: true, forExterior: true,
    infill: "stainless_cable_horizontal_run",
    bestUse: "deck_view_preservation_modern",
  },
  glass_panel_frameless: {
    strength: 6, visibility: 10, aesthetic: 10, maintenance: 6, rlCost: 9,
    codeCompliant: true, forExterior: true,
    infill: "tempered_laminated_glass_panel",
    bestUse: "pool_balcony_wind_screen",
  },
  aluminum_picket_powder: {
    strength: 8, visibility: 7, aesthetic: 6, maintenance: 9, rlCost: 5,
    codeCompliant: true, forExterior: true,
    infill: "vertical_picket_powder_coat",
    bestUse: "commercial_code_compliant_standard",
  },
  wrought_iron_ornamental: {
    strength: 9, visibility: 6, aesthetic: 9, maintenance: 4, rlCost: 8,
    codeCompliant: true, forExterior: true,
    infill: "scroll_twist_forged_picket",
    bestUse: "historic_ornamental_entry",
  },
  wood_baluster_traditional: {
    strength: 5, visibility: 5, aesthetic: 7, maintenance: 3, rlCost: 3,
    codeCompliant: true, forExterior: false,
    infill: "turned_square_wood_baluster",
    bestUse: "residential_interior_staircase",
  },
};

function get(t: RailingTypeType): RailingTypeData {
  return DATA[t];
}

export const strength = (t: RailingTypeType) => get(t).strength;
export const visibility = (t: RailingTypeType) => get(t).visibility;
export const aesthetic = (t: RailingTypeType) => get(t).aesthetic;
export const maintenance = (t: RailingTypeType) => get(t).maintenance;
export const rlCost = (t: RailingTypeType) => get(t).rlCost;
export const codeCompliant = (t: RailingTypeType) => get(t).codeCompliant;
export const forExterior = (t: RailingTypeType) => get(t).forExterior;
export const infill = (t: RailingTypeType) => get(t).infill;
export const bestUse = (t: RailingTypeType) => get(t).bestUse;
export const railingTypeTypes = (): RailingTypeType[] =>
  Object.keys(DATA) as RailingTypeType[];
