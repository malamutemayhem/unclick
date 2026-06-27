export type AccessFloorType =
  | "steel_cementitious_panel"
  | "steel_bare_conductive"
  | "calcium_sulphate_heavy"
  | "aluminum_die_cast_light"
  | "wood_core_laminate_finish";

interface AccessFloorData {
  loadCapacity: number;
  acoustic: number;
  fireRating: number;
  adjustability: number;
  afCost: number;
  conductive: boolean;
  forDataCenter: boolean;
  pedestal: string;
  bestUse: string;
}

const DATA: Record<AccessFloorType, AccessFloorData> = {
  steel_cementitious_panel: {
    loadCapacity: 8, acoustic: 7, fireRating: 8, adjustability: 8, afCost: 6,
    conductive: false, forDataCenter: true,
    pedestal: "steel_tube_adjustable_head_lock",
    bestUse: "office_data_center_general_purpose",
  },
  steel_bare_conductive: {
    loadCapacity: 7, acoustic: 5, fireRating: 7, adjustability: 8, afCost: 5,
    conductive: true, forDataCenter: true,
    pedestal: "steel_tube_conductive_bonding",
    bestUse: "server_room_esd_sensitive_equipment",
  },
  calcium_sulphate_heavy: {
    loadCapacity: 10, acoustic: 9, fireRating: 10, adjustability: 7, afCost: 8,
    conductive: false, forDataCenter: true,
    pedestal: "steel_tube_heavy_duty_lock",
    bestUse: "trading_floor_heavy_equipment_load",
  },
  aluminum_die_cast_light: {
    loadCapacity: 5, acoustic: 4, fireRating: 5, adjustability: 9, afCost: 7,
    conductive: true, forDataCenter: false,
    pedestal: "aluminum_snap_fit_low_profile",
    bestUse: "exhibition_temporary_low_height_floor",
  },
  wood_core_laminate_finish: {
    loadCapacity: 6, acoustic: 8, fireRating: 4, adjustability: 6, afCost: 4,
    conductive: false, forDataCenter: false,
    pedestal: "steel_tube_standard_office",
    bestUse: "office_retrofit_cable_management",
  },
};

function get(t: AccessFloorType): AccessFloorData {
  return DATA[t];
}

export const loadCapacity = (t: AccessFloorType) => get(t).loadCapacity;
export const acoustic = (t: AccessFloorType) => get(t).acoustic;
export const fireRating = (t: AccessFloorType) => get(t).fireRating;
export const adjustability = (t: AccessFloorType) => get(t).adjustability;
export const afCost = (t: AccessFloorType) => get(t).afCost;
export const conductive = (t: AccessFloorType) => get(t).conductive;
export const forDataCenter = (t: AccessFloorType) => get(t).forDataCenter;
export const pedestal = (t: AccessFloorType) => get(t).pedestal;
export const bestUse = (t: AccessFloorType) => get(t).bestUse;
export const accessFloorTypes = (): AccessFloorType[] =>
  Object.keys(DATA) as AccessFloorType[];
