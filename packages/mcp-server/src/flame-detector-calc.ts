export type FlameDetectorType =
  | "uv_single_band"
  | "ir_single_band"
  | "uv_ir_combo"
  | "triple_ir_multi"
  | "visual_flame_imaging";

interface FlameDetectorData {
  sensitivity: number;
  falseAlarmReject: number;
  range: number;
  response: number;
  fdCost: number;
  explosionProof: boolean;
  forOutdoor: boolean;
  sensor: string;
  bestUse: string;
}

const DATA: Record<FlameDetectorType, FlameDetectorData> = {
  uv_single_band: {
    sensitivity: 8, falseAlarmReject: 5, range: 6, response: 10, fdCost: 4,
    explosionProof: true, forOutdoor: false,
    sensor: "uv_tube_185_260nm_solar_blind",
    bestUse: "indoor_hydrogen_clean_fuel_fast_detect",
  },
  ir_single_band: {
    sensitivity: 6, falseAlarmReject: 6, range: 8, response: 7, fdCost: 4,
    explosionProof: true, forOutdoor: false,
    sensor: "pyroelectric_ir_4_3um_co2_band",
    bestUse: "hydrocarbon_flame_monitor_indoor_boiler",
  },
  uv_ir_combo: {
    sensitivity: 8, falseAlarmReject: 8, range: 8, response: 8, fdCost: 6,
    explosionProof: true, forOutdoor: true,
    sensor: "uv_tube_plus_ir_pyroelectric_dual",
    bestUse: "refinery_chemical_plant_general_purpose",
  },
  triple_ir_multi: {
    sensitivity: 9, falseAlarmReject: 10, range: 10, response: 7, fdCost: 8,
    explosionProof: true, forOutdoor: true,
    sensor: "three_ir_wavelength_ratio_algorithm",
    bestUse: "offshore_oil_gas_long_range_harsh_enviro",
  },
  visual_flame_imaging: {
    sensitivity: 9, falseAlarmReject: 9, range: 9, response: 6, fdCost: 9,
    explosionProof: true, forOutdoor: true,
    sensor: "cmos_imaging_ai_flame_pattern_analysis",
    bestUse: "large_area_warehouse_tunnel_video_verify",
  },
};

function get(t: FlameDetectorType): FlameDetectorData {
  return DATA[t];
}

export const sensitivity = (t: FlameDetectorType) => get(t).sensitivity;
export const falseAlarmReject = (t: FlameDetectorType) => get(t).falseAlarmReject;
export const range = (t: FlameDetectorType) => get(t).range;
export const response = (t: FlameDetectorType) => get(t).response;
export const fdCost = (t: FlameDetectorType) => get(t).fdCost;
export const explosionProof = (t: FlameDetectorType) => get(t).explosionProof;
export const forOutdoor = (t: FlameDetectorType) => get(t).forOutdoor;
export const sensor = (t: FlameDetectorType) => get(t).sensor;
export const bestUse = (t: FlameDetectorType) => get(t).bestUse;
export const flameDetectorTypes = (): FlameDetectorType[] =>
  Object.keys(DATA) as FlameDetectorType[];
