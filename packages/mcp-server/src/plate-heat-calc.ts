export type PlateHeatType =
  | "gasketed_frame_standard"
  | "brazed_copper_compact"
  | "welded_wide_gap"
  | "semi_welded_aggressive"
  | "double_wall_safety";

interface PlateHeatData {
  efficiency: number;
  pressure: number;
  temperature: number;
  maintenance: number;
  phCost: number;
  expandable: boolean;
  forHvac: boolean;
  plate: string;
  bestUse: string;
}

const DATA: Record<PlateHeatType, PlateHeatData> = {
  gasketed_frame_standard: {
    efficiency: 9, pressure: 7, temperature: 7, maintenance: 10, phCost: 6,
    expandable: true, forHvac: true,
    plate: "corrugated_stainless_nbr_gasket",
    bestUse: "hvac_district_heating_cooling",
  },
  brazed_copper_compact: {
    efficiency: 9, pressure: 9, temperature: 8, maintenance: 4, phCost: 4,
    expandable: false, forHvac: true,
    plate: "vacuum_brazed_copper_stainless",
    bestUse: "refrigeration_heat_pump_economizer",
  },
  welded_wide_gap: {
    efficiency: 7, pressure: 8, temperature: 9, maintenance: 6, phCost: 8,
    expandable: false, forHvac: false,
    plate: "laser_welded_wide_channel_gap",
    bestUse: "fibrous_slurry_viscous_fluid",
  },
  semi_welded_aggressive: {
    efficiency: 8, pressure: 8, temperature: 8, maintenance: 7, phCost: 7,
    expandable: true, forHvac: false,
    plate: "alternating_welded_gasketed_pair",
    bestUse: "ammonia_refrigerant_chemical",
  },
  double_wall_safety: {
    efficiency: 8, pressure: 7, temperature: 7, maintenance: 9, phCost: 7,
    expandable: true, forHvac: true,
    plate: "double_embossed_leak_detection",
    bestUse: "potable_water_cross_contamination",
  },
};

function get(t: PlateHeatType): PlateHeatData {
  return DATA[t];
}

export const efficiency = (t: PlateHeatType) => get(t).efficiency;
export const pressure = (t: PlateHeatType) => get(t).pressure;
export const temperature = (t: PlateHeatType) => get(t).temperature;
export const maintenance = (t: PlateHeatType) => get(t).maintenance;
export const phCost = (t: PlateHeatType) => get(t).phCost;
export const expandable = (t: PlateHeatType) => get(t).expandable;
export const forHvac = (t: PlateHeatType) => get(t).forHvac;
export const plate = (t: PlateHeatType) => get(t).plate;
export const bestUse = (t: PlateHeatType) => get(t).bestUse;
export const plateHeatTypes = (): PlateHeatType[] =>
  Object.keys(DATA) as PlateHeatType[];
