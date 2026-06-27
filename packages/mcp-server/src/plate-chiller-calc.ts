export type PlateChillerType =
  | "gasketed_plate"
  | "brazed_plate"
  | "welded_plate"
  | "semi_welded_plate"
  | "plate_and_shell";

interface PlateChillerData {
  heatTransfer: number;
  throughput: number;
  pressureRating: number;
  cleanability: number;
  pcCost: number;
  expandable: boolean;
  forDairy: boolean;
  chillerConfig: string;
  bestUse: string;
}

const DATA: Record<PlateChillerType, PlateChillerData> = {
  gasketed_plate: {
    heatTransfer: 9, throughput: 9, pressureRating: 6, cleanability: 10, pcCost: 5,
    expandable: true, forDairy: true,
    chillerConfig: "gasketed_plate_chiller_removable_gasket_expand_clean_inspect_cip",
    bestUse: "dairy_process_gasketed_plate_chiller_cip_expand_inspect_flexible",
  },
  brazed_plate: {
    heatTransfer: 9, throughput: 7, pressureRating: 8, cleanability: 4, pcCost: 3,
    expandable: false, forDairy: false,
    chillerConfig: "brazed_plate_chiller_copper_braze_compact_sealed_no_gasket_fail",
    bestUse: "hvac_glycol_brazed_plate_chiller_compact_sealed_low_maintenance",
  },
  welded_plate: {
    heatTransfer: 8, throughput: 8, pressureRating: 10, cleanability: 6, pcCost: 8,
    expandable: false, forDairy: false,
    chillerConfig: "welded_plate_chiller_all_weld_high_pressure_aggressive_media_safe",
    bestUse: "chemical_plant_welded_plate_chiller_aggressive_media_high_pressure",
  },
  semi_welded_plate: {
    heatTransfer: 8, throughput: 8, pressureRating: 9, cleanability: 7, pcCost: 7,
    expandable: true, forDairy: false,
    chillerConfig: "semi_welded_plate_chiller_weld_one_side_gasket_other_ammonia_safe",
    bestUse: "ammonia_refrigeration_semi_welded_plate_chiller_safe_expandable",
  },
  plate_and_shell: {
    heatTransfer: 7, throughput: 9, pressureRating: 10, cleanability: 8, pcCost: 9,
    expandable: false, forDairy: true,
    chillerConfig: "plate_and_shell_chiller_corrugated_pack_in_shell_high_pressure_cip",
    bestUse: "brewery_plate_and_shell_chiller_high_pressure_cip_capable_robust",
  },
};

function get(t: PlateChillerType): PlateChillerData {
  return DATA[t];
}

export const heatTransfer = (t: PlateChillerType) => get(t).heatTransfer;
export const throughput = (t: PlateChillerType) => get(t).throughput;
export const pressureRating = (t: PlateChillerType) => get(t).pressureRating;
export const cleanability = (t: PlateChillerType) => get(t).cleanability;
export const pcCost = (t: PlateChillerType) => get(t).pcCost;
export const expandable = (t: PlateChillerType) => get(t).expandable;
export const forDairy = (t: PlateChillerType) => get(t).forDairy;
export const chillerConfig = (t: PlateChillerType) => get(t).chillerConfig;
export const bestUse = (t: PlateChillerType) => get(t).bestUse;
export const plateChillerTypes = (): PlateChillerType[] =>
  Object.keys(DATA) as PlateChillerType[];
