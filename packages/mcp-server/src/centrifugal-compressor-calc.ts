export type CentrifugalCompressorType =
  | "single_stage_overhung"
  | "multi_stage_inline"
  | "integrally_geared"
  | "pipeline_barrel_casing"
  | "fan_type_low_pressure";

interface CentrifugalCompressorData {
  flowCapacity: number;
  pressureRatio: number;
  efficiency: number;
  reliability: number;
  ccCost: number;
  oilFree: boolean;
  forHighFlow: boolean;
  impeller: string;
  bestUse: string;
}

const DATA: Record<CentrifugalCompressorType, CentrifugalCompressorData> = {
  single_stage_overhung: {
    flowCapacity: 7, pressureRatio: 4, efficiency: 7, reliability: 8, ccCost: 4,
    oilFree: true, forHighFlow: false,
    impeller: "single_overhung_impeller_direct_drive_simple",
    bestUse: "air_handling_low_pressure_boost_ventilation",
  },
  multi_stage_inline: {
    flowCapacity: 9, pressureRatio: 8, efficiency: 8, reliability: 9, ccCost: 8,
    oilFree: true, forHighFlow: true,
    impeller: "multi_stage_inline_impeller_back_to_back",
    bestUse: "refinery_gas_compression_process_air_large",
  },
  integrally_geared: {
    flowCapacity: 8, pressureRatio: 9, efficiency: 9, reliability: 8, ccCost: 7,
    oilFree: true, forHighFlow: true,
    impeller: "bull_gear_pinion_multiple_stage_high_speed",
    bestUse: "plant_air_nitrogen_co2_multi_service_compact",
  },
  pipeline_barrel_casing: {
    flowCapacity: 10, pressureRatio: 7, efficiency: 8, reliability: 10, ccCost: 10,
    oilFree: true, forHighFlow: true,
    impeller: "barrel_casing_horizontally_split_bundle",
    bestUse: "natural_gas_pipeline_high_pressure_transport",
  },
  fan_type_low_pressure: {
    flowCapacity: 10, pressureRatio: 2, efficiency: 6, reliability: 9, ccCost: 3,
    oilFree: true, forHighFlow: true,
    impeller: "large_diameter_fan_impeller_low_tip_speed",
    bestUse: "flue_gas_draft_cooling_tower_ventilation",
  },
};

function get(t: CentrifugalCompressorType): CentrifugalCompressorData {
  return DATA[t];
}

export const flowCapacity = (t: CentrifugalCompressorType) => get(t).flowCapacity;
export const pressureRatio = (t: CentrifugalCompressorType) => get(t).pressureRatio;
export const efficiency = (t: CentrifugalCompressorType) => get(t).efficiency;
export const reliability = (t: CentrifugalCompressorType) => get(t).reliability;
export const ccCost = (t: CentrifugalCompressorType) => get(t).ccCost;
export const oilFree = (t: CentrifugalCompressorType) => get(t).oilFree;
export const forHighFlow = (t: CentrifugalCompressorType) => get(t).forHighFlow;
export const impeller = (t: CentrifugalCompressorType) => get(t).impeller;
export const bestUse = (t: CentrifugalCompressorType) => get(t).bestUse;
export const centrifugalCompressorTypes = (): CentrifugalCompressorType[] =>
  Object.keys(DATA) as CentrifugalCompressorType[];
