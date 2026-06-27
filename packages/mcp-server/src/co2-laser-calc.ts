export type Co2LaserType =
  | "sealed_tube_co2"
  | "flowing_gas_co2"
  | "rf_excited_co2"
  | "slab_co2"
  | "tea_co2";

interface Co2LaserData {
  beamQuality: number;
  throughput: number;
  powerRange: number;
  wallPlugEfficiency: number;
  clCost: number;
  sealed: boolean;
  forCutting: boolean;
  laserConfig: string;
  bestUse: string;
}

const DATA: Record<Co2LaserType, Co2LaserData> = {
  sealed_tube_co2: {
    beamQuality: 7, throughput: 7, powerRange: 5, wallPlugEfficiency: 7, clCost: 3,
    sealed: true, forCutting: true,
    laserConfig: "sealed_tube_co2_laser_dc_excited_glass_tube_low_power_long_life",
    bestUse: "small_shop_sealed_tube_co2_laser_engrave_cut_acrylic_wood_simple",
  },
  flowing_gas_co2: {
    beamQuality: 8, throughput: 9, powerRange: 10, wallPlugEfficiency: 8, clCost: 8,
    sealed: false, forCutting: true,
    laserConfig: "flowing_gas_co2_laser_axial_flow_high_power_multi_kw_industrial",
    bestUse: "thick_steel_flowing_gas_co2_laser_multi_kw_heavy_cut_industrial",
  },
  rf_excited_co2: {
    beamQuality: 9, throughput: 8, powerRange: 7, wallPlugEfficiency: 9, clCost: 6,
    sealed: true, forCutting: true,
    laserConfig: "rf_excited_co2_laser_radio_frequency_compact_pulse_capable_stable",
    bestUse: "packaging_rf_excited_co2_laser_marking_perforate_score_clean_cut",
  },
  slab_co2: {
    beamQuality: 10, throughput: 8, powerRange: 8, wallPlugEfficiency: 9, clCost: 7,
    sealed: true, forCutting: true,
    laserConfig: "slab_co2_laser_diffusion_cooled_waveguide_excellent_mode_compact",
    bestUse: "precision_cut_slab_co2_laser_excellent_beam_mode_thin_material",
  },
  tea_co2: {
    beamQuality: 6, throughput: 6, powerRange: 9, wallPlugEfficiency: 5, clCost: 9,
    sealed: false, forCutting: false,
    laserConfig: "tea_co2_laser_transverse_excite_atmospheric_high_peak_pulse_short",
    bestUse: "research_tea_co2_laser_high_peak_power_short_pulse_spectroscopy",
  },
};

function get(t: Co2LaserType): Co2LaserData {
  return DATA[t];
}

export const beamQuality = (t: Co2LaserType) => get(t).beamQuality;
export const throughput = (t: Co2LaserType) => get(t).throughput;
export const powerRange = (t: Co2LaserType) => get(t).powerRange;
export const wallPlugEfficiency = (t: Co2LaserType) => get(t).wallPlugEfficiency;
export const clCost = (t: Co2LaserType) => get(t).clCost;
export const sealed = (t: Co2LaserType) => get(t).sealed;
export const forCutting = (t: Co2LaserType) => get(t).forCutting;
export const laserConfig = (t: Co2LaserType) => get(t).laserConfig;
export const bestUse = (t: Co2LaserType) => get(t).bestUse;
export const co2LaserTypes = (): Co2LaserType[] =>
  Object.keys(DATA) as Co2LaserType[];
