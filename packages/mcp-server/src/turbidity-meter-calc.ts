export type TurbidityMeterType =
  | "nephelometric_90_degree"
  | "ratio_four_beam"
  | "backscatter_high_range"
  | "absorption_inline"
  | "laser_nephelometric";

interface TurbidityMeterData {
  accuracy: number;
  range: number;
  strayLightReject: number;
  maintenance: number;
  tmCost: number;
  inline: boolean;
  forLowTurb: boolean;
  optic: string;
  bestUse: string;
}

const DATA: Record<TurbidityMeterType, TurbidityMeterData> = {
  nephelometric_90_degree: {
    accuracy: 8, range: 6, strayLightReject: 7, maintenance: 6, tmCost: 4,
    inline: true, forLowTurb: true,
    optic: "white_light_source_90_deg_scatter",
    bestUse: "drinking_water_regulatory_epa_180_1",
  },
  ratio_four_beam: {
    accuracy: 9, range: 7, strayLightReject: 9, maintenance: 7, tmCost: 6,
    inline: true, forLowTurb: true,
    optic: "four_beam_ratio_color_compensate",
    bestUse: "process_water_color_interference_reject",
  },
  backscatter_high_range: {
    accuracy: 5, range: 10, strayLightReject: 5, maintenance: 8, tmCost: 4,
    inline: true, forLowTurb: false,
    optic: "backscatter_detector_high_solids",
    bestUse: "wastewater_slurry_high_solids_monitor",
  },
  absorption_inline: {
    accuracy: 6, range: 8, strayLightReject: 4, maintenance: 7, tmCost: 3,
    inline: true, forLowTurb: false,
    optic: "transmitted_light_attenuation_measure",
    bestUse: "industrial_effluent_suspended_solids_tss",
  },
  laser_nephelometric: {
    accuracy: 10, range: 5, strayLightReject: 10, maintenance: 5, tmCost: 8,
    inline: false, forLowTurb: true,
    optic: "laser_diode_narrow_beam_high_resolution",
    bestUse: "ultrapure_water_pharma_semiconductor_lab",
  },
};

function get(t: TurbidityMeterType): TurbidityMeterData {
  return DATA[t];
}

export const accuracy = (t: TurbidityMeterType) => get(t).accuracy;
export const range = (t: TurbidityMeterType) => get(t).range;
export const strayLightReject = (t: TurbidityMeterType) => get(t).strayLightReject;
export const maintenance = (t: TurbidityMeterType) => get(t).maintenance;
export const tmCost = (t: TurbidityMeterType) => get(t).tmCost;
export const inline = (t: TurbidityMeterType) => get(t).inline;
export const forLowTurb = (t: TurbidityMeterType) => get(t).forLowTurb;
export const optic = (t: TurbidityMeterType) => get(t).optic;
export const bestUse = (t: TurbidityMeterType) => get(t).bestUse;
export const turbidityMeterTypes = (): TurbidityMeterType[] =>
  Object.keys(DATA) as TurbidityMeterType[];
