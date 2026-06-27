export type LevelSensorRadarType =
  | "fmcw_guided_wave"
  | "fmcw_non_contact"
  | "pulse_radar_tof"
  | "radar_tank_gauging"
  | "mimo_array_3d_scan";

interface LevelSensorRadarData {
  accuracy: number;
  range: number;
  dustImmunity: number;
  foamHandling: number;
  lrCost: number;
  contactFree: boolean;
  forSolids: boolean;
  signal: string;
  bestUse: string;
}

const DATA: Record<LevelSensorRadarType, LevelSensorRadarData> = {
  fmcw_guided_wave: {
    accuracy: 10, range: 7, dustImmunity: 9, foamHandling: 9, lrCost: 6,
    contactFree: false, forSolids: false,
    signal: "guided_wave_probe_rod_cable_coaxial_tdr",
    bestUse: "small_vessel_interface_foam_turbulent_liquid",
  },
  fmcw_non_contact: {
    accuracy: 9, range: 9, dustImmunity: 8, foamHandling: 7, lrCost: 7,
    contactFree: true, forSolids: true,
    signal: "fmcw_continuous_wave_horn_lens_antenna",
    bestUse: "chemical_tank_silo_general_liquid_solid_level",
  },
  pulse_radar_tof: {
    accuracy: 8, range: 10, dustImmunity: 8, foamHandling: 6, lrCost: 5,
    contactFree: true, forSolids: true,
    signal: "pulse_burst_time_of_flight_parabolic_antenna",
    bestUse: "large_silo_stockpile_bulk_solid_long_range",
  },
  radar_tank_gauging: {
    accuracy: 10, range: 8, dustImmunity: 9, foamHandling: 8, lrCost: 9,
    contactFree: true, forSolids: false,
    signal: "high_precision_fmcw_still_pipe_custody_grade",
    bestUse: "oil_terminal_tank_farm_custody_transfer_level",
  },
  mimo_array_3d_scan: {
    accuracy: 8, range: 8, dustImmunity: 9, foamHandling: 7, lrCost: 10,
    contactFree: true, forSolids: true,
    signal: "mimo_phased_array_3d_surface_mapping_volume",
    bestUse: "irregular_solid_surface_3d_volume_measurement",
  },
};

function get(t: LevelSensorRadarType): LevelSensorRadarData {
  return DATA[t];
}

export const accuracy = (t: LevelSensorRadarType) => get(t).accuracy;
export const range = (t: LevelSensorRadarType) => get(t).range;
export const dustImmunity = (t: LevelSensorRadarType) => get(t).dustImmunity;
export const foamHandling = (t: LevelSensorRadarType) => get(t).foamHandling;
export const lrCost = (t: LevelSensorRadarType) => get(t).lrCost;
export const contactFree = (t: LevelSensorRadarType) => get(t).contactFree;
export const forSolids = (t: LevelSensorRadarType) => get(t).forSolids;
export const signal = (t: LevelSensorRadarType) => get(t).signal;
export const bestUse = (t: LevelSensorRadarType) => get(t).bestUse;
export const levelSensorRadarTypes = (): LevelSensorRadarType[] =>
  Object.keys(DATA) as LevelSensorRadarType[];
