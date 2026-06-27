export type ScrollCompressorType =
  | "hermetic_refrigerant"
  | "semi_hermetic_service"
  | "open_drive_process"
  | "oil_free_scroll_air"
  | "variable_speed_inverter";

interface ScrollCompressorData {
  efficiency: number;
  noiseLevel: number;
  reliability: number;
  compactness: number;
  slCost: number;
  oilFree: boolean;
  forHvac: boolean;
  scroll: string;
  bestUse: string;
}

const DATA: Record<ScrollCompressorType, ScrollCompressorData> = {
  hermetic_refrigerant: {
    efficiency: 8, noiseLevel: 9, reliability: 9, compactness: 9, slCost: 5,
    oilFree: false, forHvac: true,
    scroll: "hermetic_welded_shell_orbital_scroll_pair",
    bestUse: "residential_commercial_hvac_heat_pump_quiet",
  },
  semi_hermetic_service: {
    efficiency: 8, noiseLevel: 8, reliability: 8, compactness: 7, slCost: 6,
    oilFree: false, forHvac: true,
    scroll: "semi_hermetic_bolted_shell_field_serviceable",
    bestUse: "commercial_refrigeration_supermarket_rack",
  },
  open_drive_process: {
    efficiency: 7, noiseLevel: 6, reliability: 7, compactness: 6, slCost: 7,
    oilFree: false, forHvac: false,
    scroll: "open_drive_shaft_seal_external_motor_mount",
    bestUse: "process_chiller_special_refrigerant_custom",
  },
  oil_free_scroll_air: {
    efficiency: 7, noiseLevel: 10, reliability: 8, compactness: 8, slCost: 8,
    oilFree: true, forHvac: false,
    scroll: "oil_free_tip_seal_ptfe_no_lubricant_contact",
    bestUse: "dental_lab_medical_air_clean_room_small_flow",
  },
  variable_speed_inverter: {
    efficiency: 10, noiseLevel: 9, reliability: 9, compactness: 8, slCost: 7,
    oilFree: false, forHvac: true,
    scroll: "inverter_driven_variable_speed_modulate_cap",
    bestUse: "vrf_system_part_load_efficient_building_hvac",
  },
};

function get(t: ScrollCompressorType): ScrollCompressorData {
  return DATA[t];
}

export const efficiency = (t: ScrollCompressorType) => get(t).efficiency;
export const noiseLevel = (t: ScrollCompressorType) => get(t).noiseLevel;
export const reliability = (t: ScrollCompressorType) => get(t).reliability;
export const compactness = (t: ScrollCompressorType) => get(t).compactness;
export const slCost = (t: ScrollCompressorType) => get(t).slCost;
export const oilFree = (t: ScrollCompressorType) => get(t).oilFree;
export const forHvac = (t: ScrollCompressorType) => get(t).forHvac;
export const scroll = (t: ScrollCompressorType) => get(t).scroll;
export const bestUse = (t: ScrollCompressorType) => get(t).bestUse;
export const scrollCompressorTypes = (): ScrollCompressorType[] =>
  Object.keys(DATA) as ScrollCompressorType[];
