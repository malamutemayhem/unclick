export type AdcArch =
  | "sar_successive"
  | "sigma_delta_oversampling"
  | "pipeline_interleaved"
  | "flash_parallel"
  | "time_interleaved";

const DATA: Record<AdcArch, {
  resolution: number; speed: number; powerEff: number;
  area: number; adcCost: number; calibrated: boolean;
  forComms: boolean; technique: string; bestUse: string;
}> = {
  sar_successive: {
    resolution: 8, speed: 6, powerEff: 10,
    area: 9, adcCost: 3, calibrated: true,
    forComms: false, technique: "binary_search_cap_dac",
    bestUse: "sensor_iot_low_power",
  },
  sigma_delta_oversampling: {
    resolution: 10, speed: 3, powerEff: 7,
    area: 6, adcCost: 4, calibrated: false,
    forComms: false, technique: "noise_shaping_decimation",
    bestUse: "audio_precision_measurement",
  },
  pipeline_interleaved: {
    resolution: 7, speed: 8, powerEff: 5,
    area: 5, adcCost: 6, calibrated: true,
    forComms: true, technique: "mdac_stage_residue_amplify",
    bestUse: "base_station_digital_rx",
  },
  flash_parallel: {
    resolution: 3, speed: 10, powerEff: 2,
    area: 2, adcCost: 8, calibrated: false,
    forComms: true, technique: "comparator_bank_thermometer",
    bestUse: "oscilloscope_front_end",
  },
  time_interleaved: {
    resolution: 7, speed: 10, powerEff: 4,
    area: 4, adcCost: 9, calibrated: true,
    forComms: true, technique: "multi_core_mux_calibrate",
    bestUse: "112g_serdes_receiver",
  },
};

const get = (t: AdcArch) => DATA[t];

export const resolution = (t: AdcArch) => get(t).resolution;
export const speed = (t: AdcArch) => get(t).speed;
export const powerEff = (t: AdcArch) => get(t).powerEff;
export const area = (t: AdcArch) => get(t).area;
export const adcCost = (t: AdcArch) => get(t).adcCost;
export const calibrated = (t: AdcArch) => get(t).calibrated;
export const forComms = (t: AdcArch) => get(t).forComms;
export const technique = (t: AdcArch) => get(t).technique;
export const bestUse = (t: AdcArch) => get(t).bestUse;
export const adcArchs = (): AdcArch[] => Object.keys(DATA) as AdcArch[];
