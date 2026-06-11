export type AutoclaveSterilizerType =
  | "gravity_displacement"
  | "pre_vacuum"
  | "steam_flush_pressure_pulse"
  | "ethylene_oxide"
  | "hydrogen_peroxide_plasma";

interface AutoclaveSterilizerData {
  cycleSpeed: number;
  penetration: number;
  materialCompat: number;
  validation: number;
  asCost: number;
  steam: boolean;
  forHeatSensitive: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<AutoclaveSterilizerType, AutoclaveSterilizerData> = {
  gravity_displacement: {
    cycleSpeed: 5, penetration: 6, materialCompat: 7, validation: 7, asCost: 4,
    steam: true, forHeatSensitive: false,
    method: "gravity_air_displacement_downward_steam_enter_top_vent",
    bestUse: "laboratory_glassware_media_waste_decontamination_basic",
  },
  pre_vacuum: {
    cycleSpeed: 8, penetration: 10, materialCompat: 7, validation: 9, asCost: 7,
    steam: true, forHeatSensitive: false,
    method: "vacuum_pump_air_removal_steam_pulse_deep_penetration_wrap",
    bestUse: "surgical_instrument_wrapped_pack_porous_load_hospital_csd",
  },
  steam_flush_pressure_pulse: {
    cycleSpeed: 7, penetration: 9, materialCompat: 7, validation: 8, asCost: 6,
    steam: true, forHeatSensitive: false,
    method: "steam_flush_above_atmospheric_pressure_pulse_no_vacuum",
    bestUse: "facility_without_vacuum_system_wrapped_goods_alternative",
  },
  ethylene_oxide: {
    cycleSpeed: 3, penetration: 8, materialCompat: 10, validation: 8, asCost: 8,
    steam: false, forHeatSensitive: true,
    method: "ethylene_oxide_gas_low_temperature_humidity_aeration_cycle",
    bestUse: "heat_sensitive_plastic_device_electronic_implant_catheter",
  },
  hydrogen_peroxide_plasma: {
    cycleSpeed: 9, penetration: 7, materialCompat: 8, validation: 9, asCost: 10,
    steam: false, forHeatSensitive: true,
    method: "hydrogen_peroxide_vapor_plasma_phase_low_temp_no_residue",
    bestUse: "endoscope_optic_instrument_moisture_sensitive_fast_turnaround",
  },
};

function get(t: AutoclaveSterilizerType): AutoclaveSterilizerData {
  return DATA[t];
}

export const cycleSpeed = (t: AutoclaveSterilizerType) => get(t).cycleSpeed;
export const penetration = (t: AutoclaveSterilizerType) => get(t).penetration;
export const materialCompat = (t: AutoclaveSterilizerType) => get(t).materialCompat;
export const validation = (t: AutoclaveSterilizerType) => get(t).validation;
export const asCost = (t: AutoclaveSterilizerType) => get(t).asCost;
export const steam = (t: AutoclaveSterilizerType) => get(t).steam;
export const forHeatSensitive = (t: AutoclaveSterilizerType) => get(t).forHeatSensitive;
export const method = (t: AutoclaveSterilizerType) => get(t).method;
export const bestUse = (t: AutoclaveSterilizerType) => get(t).bestUse;
export const autoclaveSterilizerTypes = (): AutoclaveSterilizerType[] =>
  Object.keys(DATA) as AutoclaveSterilizerType[];
