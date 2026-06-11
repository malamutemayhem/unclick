export type GlassTemperType =
  | "horizontal_roller"
  | "vertical_tong"
  | "forced_convection"
  | "chemical_ion_exchange"
  | "differential_quench";

interface GlassTemperData {
  quenchSpeed: number;
  flatness: number;
  strengthGain: number;
  opticalQuality: number;
  gtCost: number;
  thermal: boolean;
  forArchitectural: boolean;
  temperConfig: string;
  bestUse: string;
}

const DATA: Record<GlassTemperType, GlassTemperData> = {
  horizontal_roller: {
    quenchSpeed: 9, flatness: 9, strengthGain: 8, opticalQuality: 8, gtCost: 8,
    thermal: true, forArchitectural: true,
    temperConfig: "horizontal_roller_hearth_heat_air_quench_flat_glass_temper",
    bestUse: "architectural_flat_glass_window_facade_horizontal_roller_temper",
  },
  vertical_tong: {
    quenchSpeed: 7, flatness: 6, strengthGain: 8, opticalQuality: 6, gtCost: 6,
    thermal: true, forArchitectural: true,
    temperConfig: "vertical_tong_hang_glass_heat_air_quench_older_style_temper",
    bestUse: "older_style_glass_temper_tong_mark_acceptable_vertical_hang",
  },
  forced_convection: {
    quenchSpeed: 10, flatness: 10, strengthGain: 9, opticalQuality: 9, gtCost: 10,
    thermal: true, forArchitectural: true,
    temperConfig: "forced_convection_jet_array_uniform_quench_low_e_coated_glass",
    bestUse: "low_e_coated_glass_high_quality_forced_convection_uniform_quench",
  },
  chemical_ion_exchange: {
    quenchSpeed: 3, flatness: 10, strengthGain: 10, opticalQuality: 10, gtCost: 9,
    thermal: false, forArchitectural: false,
    temperConfig: "chemical_temper_ion_exchange_salt_bath_thin_glass_phone_screen",
    bestUse: "phone_tablet_screen_thin_glass_chemical_ion_exchange_strengthen",
  },
  differential_quench: {
    quenchSpeed: 8, flatness: 8, strengthGain: 7, opticalQuality: 7, gtCost: 7,
    thermal: true, forArchitectural: false,
    temperConfig: "differential_quench_zone_control_automotive_sidelite_pattern",
    bestUse: "automotive_sidelite_backlite_differential_quench_break_pattern",
  },
};

function get(t: GlassTemperType): GlassTemperData {
  return DATA[t];
}

export const quenchSpeed = (t: GlassTemperType) => get(t).quenchSpeed;
export const flatness = (t: GlassTemperType) => get(t).flatness;
export const strengthGain = (t: GlassTemperType) => get(t).strengthGain;
export const opticalQuality = (t: GlassTemperType) => get(t).opticalQuality;
export const gtCost = (t: GlassTemperType) => get(t).gtCost;
export const thermal = (t: GlassTemperType) => get(t).thermal;
export const forArchitectural = (t: GlassTemperType) => get(t).forArchitectural;
export const temperConfig = (t: GlassTemperType) => get(t).temperConfig;
export const bestUse = (t: GlassTemperType) => get(t).bestUse;
export const glassTemperTypes = (): GlassTemperType[] =>
  Object.keys(DATA) as GlassTemperType[];
