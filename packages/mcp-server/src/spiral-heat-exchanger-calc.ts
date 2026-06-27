export type SpiralHeatExchangerType =
  | "type_i_both_spiral"
  | "type_ii_spiral_cross"
  | "type_iii_spiral_coil"
  | "welded_spiral_plate"
  | "micro_spiral_compact";

interface SpiralHeatExchangerData {
  heatTransfer: number;
  selfCleaning: number;
  compactness: number;
  foulingResist: number;
  shCost: number;
  singleChannel: boolean;
  forSlurry: boolean;
  flowPattern: string;
  bestUse: string;
}

const DATA: Record<SpiralHeatExchangerType, SpiralHeatExchangerData> = {
  type_i_both_spiral: {
    heatTransfer: 9, selfCleaning: 9, compactness: 9, foulingResist: 9, shCost: 7,
    singleChannel: true, forSlurry: true,
    flowPattern: "counter_current_both_channels_spiral_flow",
    bestUse: "sludge_heating_slurry_process_fouling_duty",
  },
  type_ii_spiral_cross: {
    heatTransfer: 8, selfCleaning: 7, compactness: 8, foulingResist: 7, shCost: 7,
    singleChannel: false, forSlurry: false,
    flowPattern: "one_spiral_one_crossflow_condenser_mode",
    bestUse: "vapor_condensation_top_entry_crossflow",
  },
  type_iii_spiral_coil: {
    heatTransfer: 7, selfCleaning: 6, compactness: 7, foulingResist: 6, shCost: 5,
    singleChannel: false, forSlurry: false,
    flowPattern: "spiral_coil_in_shell_simple_construction",
    bestUse: "sample_cooler_small_duty_steam_condensate",
  },
  welded_spiral_plate: {
    heatTransfer: 9, selfCleaning: 10, compactness: 9, foulingResist: 10, shCost: 8,
    singleChannel: true, forSlurry: true,
    flowPattern: "fully_welded_spiral_plate_no_gasket_high_p",
    bestUse: "wastewater_treatment_digestate_heavy_slurry",
  },
  micro_spiral_compact: {
    heatTransfer: 10, selfCleaning: 5, compactness: 10, foulingResist: 4, shCost: 9,
    singleChannel: false, forSlurry: false,
    flowPattern: "micro_channel_spiral_very_high_surface_area",
    bestUse: "process_intensification_lab_pilot_clean_fluid",
  },
};

function get(t: SpiralHeatExchangerType): SpiralHeatExchangerData {
  return DATA[t];
}

export const heatTransfer = (t: SpiralHeatExchangerType) => get(t).heatTransfer;
export const selfCleaning = (t: SpiralHeatExchangerType) => get(t).selfCleaning;
export const compactness = (t: SpiralHeatExchangerType) => get(t).compactness;
export const foulingResist = (t: SpiralHeatExchangerType) => get(t).foulingResist;
export const shCost = (t: SpiralHeatExchangerType) => get(t).shCost;
export const singleChannel = (t: SpiralHeatExchangerType) => get(t).singleChannel;
export const forSlurry = (t: SpiralHeatExchangerType) => get(t).forSlurry;
export const flowPattern = (t: SpiralHeatExchangerType) => get(t).flowPattern;
export const bestUse = (t: SpiralHeatExchangerType) => get(t).bestUse;
export const spiralHeatExchangerTypes = (): SpiralHeatExchangerType[] =>
  Object.keys(DATA) as SpiralHeatExchangerType[];
