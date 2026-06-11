export type AdcType =
  | "sar_successive"
  | "delta_sigma_oversampled"
  | "pipeline_stage"
  | "flash_parallel"
  | "dual_slope_integrating";

const DATA: Record<AdcType, {
  resolution: number; speed: number; powerEff: number;
  linearity: number; adcCost: number; multiplexed: boolean;
  forSensor: boolean; architecture: string; bestUse: string;
}> = {
  sar_successive: {
    resolution: 7, speed: 7, powerEff: 9,
    linearity: 8, adcCost: 3, multiplexed: true,
    forSensor: true, architecture: "binary_search_capacitor",
    bestUse: "data_acquisition_multi_ch",
  },
  delta_sigma_oversampled: {
    resolution: 10, speed: 4, powerEff: 7,
    linearity: 10, adcCost: 4, multiplexed: false,
    forSensor: true, architecture: "modulator_decimation_filter",
    bestUse: "precision_weighing_bridge",
  },
  pipeline_stage: {
    resolution: 7, speed: 9, powerEff: 5,
    linearity: 7, adcCost: 6, multiplexed: false,
    forSensor: false, architecture: "residue_amplify_cascade",
    bestUse: "video_baseband_digitize",
  },
  flash_parallel: {
    resolution: 3, speed: 10, powerEff: 2,
    linearity: 5, adcCost: 8, multiplexed: false,
    forSensor: false, architecture: "comparator_ladder_decode",
    bestUse: "rf_direct_sampling_gsps",
  },
  dual_slope_integrating: {
    resolution: 8, speed: 2, powerEff: 8,
    linearity: 9, adcCost: 2, multiplexed: true,
    forSensor: true, architecture: "ramp_counter_integrate",
    bestUse: "multimeter_slow_precision",
  },
};

const get = (t: AdcType) => DATA[t];

export const resolution = (t: AdcType) => get(t).resolution;
export const speed = (t: AdcType) => get(t).speed;
export const powerEff = (t: AdcType) => get(t).powerEff;
export const linearity = (t: AdcType) => get(t).linearity;
export const adcCost = (t: AdcType) => get(t).adcCost;
export const multiplexed = (t: AdcType) => get(t).multiplexed;
export const forSensor = (t: AdcType) => get(t).forSensor;
export const architecture = (t: AdcType) => get(t).architecture;
export const bestUse = (t: AdcType) => get(t).bestUse;
export const adcTypes = (): AdcType[] => Object.keys(DATA) as AdcType[];
