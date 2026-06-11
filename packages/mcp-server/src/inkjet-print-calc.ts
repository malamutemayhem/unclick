export type InkjetPrintType =
  | "thermal_bubble_desktop"
  | "piezo_drop_on_demand"
  | "continuous_cij_industrial"
  | "uv_cure_flatbed"
  | "solvent_wide_format";

interface InkjetData {
  speed: number;
  resolution: number;
  durability: number;
  mediaRange: number;
  ijCost: number;
  dropOnDemand: boolean;
  forPhoto: boolean;
  ejection: string;
  bestUse: string;
}

const DATA: Record<InkjetPrintType, InkjetData> = {
  thermal_bubble_desktop: {
    speed: 5, resolution: 7, durability: 4, mediaRange: 4, ijCost: 2,
    dropOnDemand: true, forPhoto: true,
    ejection: "thermal_vapor_bubble_nozzle",
    bestUse: "home_office_document_photo",
  },
  piezo_drop_on_demand: {
    speed: 7, resolution: 9, durability: 7, mediaRange: 7, ijCost: 6,
    dropOnDemand: true, forPhoto: true,
    ejection: "piezo_crystal_deflection",
    bestUse: "commercial_proof_fine_art_print",
  },
  continuous_cij_industrial: {
    speed: 10, resolution: 4, durability: 8, mediaRange: 9, ijCost: 7,
    dropOnDemand: false, forPhoto: false,
    ejection: "continuous_stream_electrostatic",
    bestUse: "date_code_batch_marking_line",
  },
  uv_cure_flatbed: {
    speed: 6, resolution: 8, durability: 10, mediaRange: 10, ijCost: 8,
    dropOnDemand: true, forPhoto: false,
    ejection: "piezo_uv_lamp_instant_cure",
    bestUse: "rigid_substrate_signage_display",
  },
  solvent_wide_format: {
    speed: 7, resolution: 7, durability: 9, mediaRange: 6, ijCost: 5,
    dropOnDemand: true, forPhoto: false,
    ejection: "piezo_solvent_evaporation",
    bestUse: "outdoor_banner_vehicle_wrap",
  },
};

function get(t: InkjetPrintType): InkjetData {
  return DATA[t];
}

export const speed = (t: InkjetPrintType) => get(t).speed;
export const resolution = (t: InkjetPrintType) => get(t).resolution;
export const durability = (t: InkjetPrintType) => get(t).durability;
export const mediaRange = (t: InkjetPrintType) => get(t).mediaRange;
export const ijCost = (t: InkjetPrintType) => get(t).ijCost;
export const dropOnDemand = (t: InkjetPrintType) => get(t).dropOnDemand;
export const forPhoto = (t: InkjetPrintType) => get(t).forPhoto;
export const ejection = (t: InkjetPrintType) => get(t).ejection;
export const bestUse = (t: InkjetPrintType) => get(t).bestUse;
export const inkjetPrintTypes = (): InkjetPrintType[] =>
  Object.keys(DATA) as InkjetPrintType[];
