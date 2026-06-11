export type RadarType =
  | "pulse_doppler_airborne"
  | "fmcw_automotive_77ghz"
  | "phased_array_aesa"
  | "synthetic_aperture_sar"
  | "weather_doppler_sband";

const DATA: Record<RadarType, {
  range: number; resolution: number; velocity: number;
  clutter: number; rdCost: number; electronic: boolean;
  forTracking: boolean; waveform: string; bestUse: string;
}> = {
  pulse_doppler_airborne: {
    range: 9, resolution: 6, velocity: 10,
    clutter: 9, rdCost: 5, electronic: false,
    forTracking: true, waveform: "coherent_pulse_train_prf",
    bestUse: "fighter_aircraft_look_down",
  },
  fmcw_automotive_77ghz: {
    range: 3, resolution: 8, velocity: 8,
    clutter: 5, rdCost: 1, electronic: false,
    forTracking: false, waveform: "linear_chirp_sawtooth",
    bestUse: "adaptive_cruise_control_car",
  },
  phased_array_aesa: {
    range: 10, resolution: 7, velocity: 9,
    clutter: 10, rdCost: 5, electronic: true,
    forTracking: true, waveform: "agile_beam_multi_function",
    bestUse: "naval_air_defense_multitrack",
  },
  synthetic_aperture_sar: {
    range: 8, resolution: 10, velocity: 3,
    clutter: 7, rdCost: 4, electronic: false,
    forTracking: false, waveform: "side_looking_aperture_synth",
    bestUse: "terrain_mapping_satellite_image",
  },
  weather_doppler_sband: {
    range: 7, resolution: 5, velocity: 7,
    clutter: 6, rdCost: 3, electronic: false,
    forTracking: false, waveform: "dual_polarization_pulse",
    bestUse: "precipitation_storm_detection",
  },
};

const get = (t: RadarType) => DATA[t];

export const range = (t: RadarType) => get(t).range;
export const resolution = (t: RadarType) => get(t).resolution;
export const velocity = (t: RadarType) => get(t).velocity;
export const clutter = (t: RadarType) => get(t).clutter;
export const rdCost = (t: RadarType) => get(t).rdCost;
export const electronic = (t: RadarType) => get(t).electronic;
export const forTracking = (t: RadarType) => get(t).forTracking;
export const waveform = (t: RadarType) => get(t).waveform;
export const bestUse = (t: RadarType) => get(t).bestUse;
export const radarTypes = (): RadarType[] => Object.keys(DATA) as RadarType[];
