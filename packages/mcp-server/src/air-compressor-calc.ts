export type AirCompressorType =
  | "rotary_screw"
  | "reciprocating_piston"
  | "scroll_oil_free"
  | "centrifugal_turbo"
  | "rotary_vane";

interface AirCompressorData {
  cfmOutput: number;
  maxPressure: number;
  energyEfficiency: number;
  noiseLevel: number;
  acCost: number;
  oilFree: boolean;
  forContinuous: boolean;
  compression: string;
  bestUse: string;
}

const DATA: Record<AirCompressorType, AirCompressorData> = {
  rotary_screw: {
    cfmOutput: 9, maxPressure: 8, energyEfficiency: 8, noiseLevel: 7, acCost: 7,
    oilFree: false, forContinuous: true,
    compression: "intermeshing_helical_rotors_continuous_sweep_oil_injected",
    bestUse: "factory_plant_air_system_continuous_duty_24_7_operation",
  },
  reciprocating_piston: {
    cfmOutput: 6, maxPressure: 10, energyEfficiency: 6, noiseLevel: 4, acCost: 4,
    oilFree: false, forContinuous: false,
    compression: "piston_cylinder_crankshaft_intake_compression_discharge_cycle",
    bestUse: "auto_shop_small_workshop_intermittent_high_pressure_fill",
  },
  scroll_oil_free: {
    cfmOutput: 5, maxPressure: 6, energyEfficiency: 7, noiseLevel: 9, acCost: 6,
    oilFree: true, forContinuous: true,
    compression: "orbiting_scroll_spiral_trap_compress_oil_free_quiet_clean",
    bestUse: "dental_office_lab_clean_room_food_grade_oil_free_quiet",
  },
  centrifugal_turbo: {
    cfmOutput: 10, maxPressure: 7, energyEfficiency: 9, noiseLevel: 6, acCost: 10,
    oilFree: true, forContinuous: true,
    compression: "impeller_diffuser_multi_stage_dynamic_compression_oil_free",
    bestUse: "large_manufacturing_plant_wastewater_aeration_high_volume",
  },
  rotary_vane: {
    cfmOutput: 7, maxPressure: 7, energyEfficiency: 7, noiseLevel: 7, acCost: 5,
    oilFree: false, forContinuous: true,
    compression: "eccentric_rotor_sliding_vane_sweep_compress_oil_lubricated",
    bestUse: "printing_press_textile_mill_medium_duty_steady_demand",
  },
};

function get(t: AirCompressorType): AirCompressorData {
  return DATA[t];
}

export const cfmOutput = (t: AirCompressorType) => get(t).cfmOutput;
export const maxPressure = (t: AirCompressorType) => get(t).maxPressure;
export const energyEfficiency = (t: AirCompressorType) => get(t).energyEfficiency;
export const noiseLevel = (t: AirCompressorType) => get(t).noiseLevel;
export const acCost = (t: AirCompressorType) => get(t).acCost;
export const oilFree = (t: AirCompressorType) => get(t).oilFree;
export const forContinuous = (t: AirCompressorType) => get(t).forContinuous;
export const compression = (t: AirCompressorType) => get(t).compression;
export const bestUse = (t: AirCompressorType) => get(t).bestUse;
export const airCompressorTypes = (): AirCompressorType[] =>
  Object.keys(DATA) as AirCompressorType[];
