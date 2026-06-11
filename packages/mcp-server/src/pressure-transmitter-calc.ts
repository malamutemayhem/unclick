export type PressureTransmitterType =
  | "capacitance_diaphragm"
  | "piezoresistive_silicon"
  | "resonant_silicon_freq"
  | "strain_gauge_bonded"
  | "sapphire_high_overpress";

interface PressureTransmitterData {
  accuracy: number;
  stability: number;
  overpressure: number;
  responseTime: number;
  ptCost: number;
  digital: boolean;
  forHazardous: boolean;
  sensor: string;
  bestUse: string;
}

const DATA: Record<PressureTransmitterType, PressureTransmitterData> = {
  capacitance_diaphragm: {
    accuracy: 9, stability: 9, overpressure: 8, responseTime: 7, ptCost: 6,
    digital: true, forHazardous: true,
    sensor: "capacitive_diaphragm_oil_filled_isolator",
    bestUse: "process_plant_general_dp_level_flow_pressure",
  },
  piezoresistive_silicon: {
    accuracy: 8, stability: 7, overpressure: 6, responseTime: 9, ptCost: 4,
    digital: true, forHazardous: false,
    sensor: "silicon_piezoresistive_wheatstone_bridge_mems",
    bestUse: "hvac_compressor_hydraulic_fast_response_oem",
  },
  resonant_silicon_freq: {
    accuracy: 10, stability: 10, overpressure: 7, responseTime: 6, ptCost: 8,
    digital: true, forHazardous: true,
    sensor: "resonant_silicon_frequency_output_digital",
    bestUse: "custody_transfer_fiscal_metering_highest_spec",
  },
  strain_gauge_bonded: {
    accuracy: 7, stability: 7, overpressure: 9, responseTime: 8, ptCost: 3,
    digital: false, forHazardous: false,
    sensor: "bonded_foil_strain_gauge_diaphragm_welded",
    bestUse: "industrial_utility_water_steam_basic_monitoring",
  },
  sapphire_high_overpress: {
    accuracy: 9, stability: 9, overpressure: 10, responseTime: 7, ptCost: 7,
    digital: true, forHazardous: true,
    sensor: "sapphire_diaphragm_oil_filled_high_overload",
    bestUse: "subsea_wellhead_high_overpress_extreme_environ",
  },
};

function get(t: PressureTransmitterType): PressureTransmitterData {
  return DATA[t];
}

export const accuracy = (t: PressureTransmitterType) => get(t).accuracy;
export const stability = (t: PressureTransmitterType) => get(t).stability;
export const overpressure = (t: PressureTransmitterType) => get(t).overpressure;
export const responseTime = (t: PressureTransmitterType) => get(t).responseTime;
export const ptCost = (t: PressureTransmitterType) => get(t).ptCost;
export const digital = (t: PressureTransmitterType) => get(t).digital;
export const forHazardous = (t: PressureTransmitterType) => get(t).forHazardous;
export const sensor = (t: PressureTransmitterType) => get(t).sensor;
export const bestUse = (t: PressureTransmitterType) => get(t).bestUse;
export const pressureTransmitterTypes = (): PressureTransmitterType[] =>
  Object.keys(DATA) as PressureTransmitterType[];
