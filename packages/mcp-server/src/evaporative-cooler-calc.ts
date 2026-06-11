export type EvaporativeCoolerType =
  | "direct_media_pad"
  | "indirect_plate_heat"
  | "two_stage_indirect_direct"
  | "misting_high_pressure"
  | "dew_point_regenerative";

interface EvaporativeCoolerData {
  cooling: number;
  humidity: number;
  energy: number;
  waterUse: number;
  ecCost: number;
  noHumidityAdd: boolean;
  forDryClimate: boolean;
  medium: string;
  bestUse: string;
}

const DATA: Record<EvaporativeCoolerType, EvaporativeCoolerData> = {
  direct_media_pad: {
    cooling: 7, humidity: 4, energy: 10, waterUse: 6, ecCost: 3,
    noHumidityAdd: false, forDryClimate: true,
    medium: "cellulose_pad_wetted_media",
    bestUse: "warehouse_greenhouse_desert_cool",
  },
  indirect_plate_heat: {
    cooling: 6, humidity: 8, energy: 8, waterUse: 7, ecCost: 7,
    noHumidityAdd: true, forDryClimate: true,
    medium: "plate_exchanger_secondary_air",
    bestUse: "data_center_pre_cool_supply",
  },
  two_stage_indirect_direct: {
    cooling: 9, humidity: 6, energy: 8, waterUse: 5, ecCost: 8,
    noHumidityAdd: false, forDryClimate: true,
    medium: "indirect_then_direct_cascade",
    bestUse: "commercial_office_arid_region",
  },
  misting_high_pressure: {
    cooling: 5, humidity: 3, energy: 9, waterUse: 4, ecCost: 4,
    noHumidityAdd: false, forDryClimate: true,
    medium: "high_pressure_nozzle_micro_drop",
    bestUse: "outdoor_patio_livestock_barn",
  },
  dew_point_regenerative: {
    cooling: 10, humidity: 9, energy: 7, waterUse: 6, ecCost: 10,
    noHumidityAdd: true, forDryClimate: true,
    medium: "regenerative_dew_point_cycle",
    bestUse: "high_performance_dry_climate_ac",
  },
};

function get(t: EvaporativeCoolerType): EvaporativeCoolerData {
  return DATA[t];
}

export const cooling = (t: EvaporativeCoolerType) => get(t).cooling;
export const humidity = (t: EvaporativeCoolerType) => get(t).humidity;
export const energy = (t: EvaporativeCoolerType) => get(t).energy;
export const waterUse = (t: EvaporativeCoolerType) => get(t).waterUse;
export const ecCost = (t: EvaporativeCoolerType) => get(t).ecCost;
export const noHumidityAdd = (t: EvaporativeCoolerType) => get(t).noHumidityAdd;
export const forDryClimate = (t: EvaporativeCoolerType) => get(t).forDryClimate;
export const medium = (t: EvaporativeCoolerType) => get(t).medium;
export const bestUse = (t: EvaporativeCoolerType) => get(t).bestUse;
export const evaporativeCoolerTypes = (): EvaporativeCoolerType[] =>
  Object.keys(DATA) as EvaporativeCoolerType[];
