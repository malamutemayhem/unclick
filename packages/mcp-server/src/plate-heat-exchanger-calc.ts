export type PlateHeatExchangerType =
  | "gasketed_plate_frame"
  | "brazed_plate_compact"
  | "welded_plate_block"
  | "semi_welded_plate"
  | "plate_fin_aluminum";

interface PlateHeatExchangerData {
  heatTransfer: number;
  compactness: number;
  pressureRating: number;
  cleanability: number;
  phCost: number;
  expandable: boolean;
  forCorrosive: boolean;
  construction: string;
  bestUse: string;
}

const DATA: Record<PlateHeatExchangerType, PlateHeatExchangerData> = {
  gasketed_plate_frame: {
    heatTransfer: 9, compactness: 8, pressureRating: 5, cleanability: 10, phCost: 5,
    expandable: true, forCorrosive: false,
    construction: "gasket_sealed_pressed_plate_frame_clamp",
    bestUse: "hvac_dairy_food_process_general_duty",
  },
  brazed_plate_compact: {
    heatTransfer: 9, compactness: 10, pressureRating: 7, cleanability: 3, phCost: 4,
    expandable: false, forCorrosive: false,
    construction: "copper_brazed_stainless_plates_no_gasket",
    bestUse: "refrigeration_heat_pump_small_hvac_compact",
  },
  welded_plate_block: {
    heatTransfer: 8, compactness: 7, pressureRating: 9, cleanability: 5, phCost: 8,
    expandable: false, forCorrosive: true,
    construction: "fully_welded_plate_pack_high_press_temp",
    bestUse: "chemical_process_high_temp_press_aggressive",
  },
  semi_welded_plate: {
    heatTransfer: 8, compactness: 8, pressureRating: 7, cleanability: 7, phCost: 7,
    expandable: true, forCorrosive: true,
    construction: "alternate_welded_gasketed_plate_pairs",
    bestUse: "ammonia_refrigeration_aggressive_one_side",
  },
  plate_fin_aluminum: {
    heatTransfer: 10, compactness: 10, pressureRating: 6, cleanability: 2, phCost: 9,
    expandable: false, forCorrosive: false,
    construction: "aluminum_fin_brazed_multi_stream_core",
    bestUse: "cryogenic_air_separation_lng_multi_stream",
  },
};

function get(t: PlateHeatExchangerType): PlateHeatExchangerData {
  return DATA[t];
}

export const heatTransfer = (t: PlateHeatExchangerType) => get(t).heatTransfer;
export const compactness = (t: PlateHeatExchangerType) => get(t).compactness;
export const pressureRating = (t: PlateHeatExchangerType) => get(t).pressureRating;
export const cleanability = (t: PlateHeatExchangerType) => get(t).cleanability;
export const phCost = (t: PlateHeatExchangerType) => get(t).phCost;
export const expandable = (t: PlateHeatExchangerType) => get(t).expandable;
export const forCorrosive = (t: PlateHeatExchangerType) => get(t).forCorrosive;
export const construction = (t: PlateHeatExchangerType) => get(t).construction;
export const bestUse = (t: PlateHeatExchangerType) => get(t).bestUse;
export const plateHeatExchangerTypes = (): PlateHeatExchangerType[] =>
  Object.keys(DATA) as PlateHeatExchangerType[];
