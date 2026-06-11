export type PlateHeatExType =
  | "gasketed_plate_frame"
  | "brazed_plate_compact"
  | "welded_plate_block"
  | "semi_welded_hybrid"
  | "plate_fin_aluminum";

interface PlateHeatExData {
  heatTransfer: number;
  compactness: number;
  pressureLimit: number;
  maintenance: number;
  phCost: number;
  expandable: boolean;
  forCorrosive: boolean;
  plate: string;
  bestUse: string;
}

const DATA: Record<PlateHeatExType, PlateHeatExData> = {
  gasketed_plate_frame: {
    heatTransfer: 9, compactness: 8, pressureLimit: 5, maintenance: 10, phCost: 5,
    expandable: true, forCorrosive: false,
    plate: "corrugated_stainless_gasket_seal_clamp",
    bestUse: "hvac_dairy_process_flexible_clean",
  },
  brazed_plate_compact: {
    heatTransfer: 9, compactness: 10, pressureLimit: 7, maintenance: 3, phCost: 3,
    expandable: false, forCorrosive: false,
    plate: "copper_brazed_stainless_plate_stack",
    bestUse: "refrigerant_chiller_compact_oem",
  },
  welded_plate_block: {
    heatTransfer: 8, compactness: 7, pressureLimit: 9, maintenance: 4, phCost: 8,
    expandable: false, forCorrosive: true,
    plate: "laser_welded_plate_pack_block_shell",
    bestUse: "chemical_aggressive_high_press_temp",
  },
  semi_welded_hybrid: {
    heatTransfer: 8, compactness: 7, pressureLimit: 8, maintenance: 7, phCost: 7,
    expandable: true, forCorrosive: true,
    plate: "alternating_welded_gasketed_pair",
    bestUse: "ammonia_refrigerant_one_side_hazard",
  },
  plate_fin_aluminum: {
    heatTransfer: 10, compactness: 10, pressureLimit: 6, maintenance: 2, phCost: 9,
    expandable: false, forCorrosive: false,
    plate: "aluminum_fin_braze_multi_stream_core",
    bestUse: "cryogenic_lng_air_separation_multi",
  },
};

function get(t: PlateHeatExType): PlateHeatExData {
  return DATA[t];
}

export const heatTransfer = (t: PlateHeatExType) => get(t).heatTransfer;
export const compactness = (t: PlateHeatExType) => get(t).compactness;
export const pressureLimit = (t: PlateHeatExType) => get(t).pressureLimit;
export const maintenance = (t: PlateHeatExType) => get(t).maintenance;
export const phCost = (t: PlateHeatExType) => get(t).phCost;
export const expandable = (t: PlateHeatExType) => get(t).expandable;
export const forCorrosive = (t: PlateHeatExType) => get(t).forCorrosive;
export const plate = (t: PlateHeatExType) => get(t).plate;
export const bestUse = (t: PlateHeatExType) => get(t).bestUse;
export const plateHeatExTypes = (): PlateHeatExType[] =>
  Object.keys(DATA) as PlateHeatExType[];
