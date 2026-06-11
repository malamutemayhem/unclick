export type AltimeterType =
  | "barometric_aneroid"
  | "radar_radio_fmcw"
  | "gps_geometric_gnss"
  | "laser_lidar_terrain"
  | "encoding_mode_c_gilham";

const DATA: Record<AltimeterType, {
  accuracy: number; range: number; allWeather: number;
  reliability: number; alCost: number; groundRef: boolean;
  forApproach: boolean; principle: string; bestUse: string;
}> = {
  barometric_aneroid: {
    accuracy: 6, range: 10, allWeather: 9,
    reliability: 9, alCost: 1, groundRef: false,
    forApproach: false, principle: "pressure_altitude_isa_model",
    bestUse: "cruise_altitude_standard_flight",
  },
  radar_radio_fmcw: {
    accuracy: 9, range: 4, allWeather: 10,
    reliability: 8, alCost: 3, groundRef: true,
    forApproach: true, principle: "radio_wave_ground_bounce_time",
    bestUse: "low_altitude_catiii_decision_ht",
  },
  gps_geometric_gnss: {
    accuracy: 8, range: 10, allWeather: 7,
    reliability: 7, alCost: 2, groundRef: false,
    forApproach: false, principle: "satellite_geometric_wgs84_ht",
    bestUse: "terrain_awareness_lpv_approach",
  },
  laser_lidar_terrain: {
    accuracy: 10, range: 3, allWeather: 4,
    reliability: 6, alCost: 4, groundRef: true,
    forApproach: false, principle: "laser_pulse_time_of_flight",
    bestUse: "helicopter_wire_strike_terrain",
  },
  encoding_mode_c_gilham: {
    accuracy: 5, range: 10, allWeather: 9,
    reliability: 8, alCost: 1, groundRef: false,
    forApproach: false, principle: "barometric_encoded_gray_code",
    bestUse: "atc_transponder_altitude_report",
  },
};

const get = (t: AltimeterType) => DATA[t];

export const accuracy = (t: AltimeterType) => get(t).accuracy;
export const range = (t: AltimeterType) => get(t).range;
export const allWeather = (t: AltimeterType) => get(t).allWeather;
export const reliability = (t: AltimeterType) => get(t).reliability;
export const alCost = (t: AltimeterType) => get(t).alCost;
export const groundRef = (t: AltimeterType) => get(t).groundRef;
export const forApproach = (t: AltimeterType) => get(t).forApproach;
export const principle = (t: AltimeterType) => get(t).principle;
export const bestUse = (t: AltimeterType) => get(t).bestUse;
export const altimeterTypes = (): AltimeterType[] => Object.keys(DATA) as AltimeterType[];
