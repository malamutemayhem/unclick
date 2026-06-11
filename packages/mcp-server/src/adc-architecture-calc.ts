export type AdcArchitecture =
  | "flash_parallel"
  | "sar_successive"
  | "pipeline_staged"
  | "sigma_delta_over"
  | "dual_slope_integ";

const DATA: Record<AdcArchitecture, {
  speed: number; resolution: number; powerDraw: number;
  latency: number; archCost: number; differential: boolean;
  forAudio: boolean; topology: string; bestUse: string;
}> = {
  flash_parallel: {
    speed: 10, resolution: 2, powerDraw: 9,
    latency: 10, archCost: 8, differential: false,
    forAudio: false, topology: "comparator_ladder_2n",
    bestUse: "oscilloscope_frontend",
  },
  sar_successive: {
    speed: 7, resolution: 7, powerDraw: 3,
    latency: 8, archCost: 4, differential: true,
    forAudio: false, topology: "binary_search_cap_dac",
    bestUse: "sensor_acquisition_mcu",
  },
  pipeline_staged: {
    speed: 9, resolution: 6, powerDraw: 6,
    latency: 5, archCost: 7, differential: true,
    forAudio: false, topology: "mdac_residue_amplify",
    bestUse: "communications_if_sample",
  },
  sigma_delta_over: {
    speed: 3, resolution: 10, powerDraw: 4,
    latency: 2, archCost: 5, differential: true,
    forAudio: true, topology: "modulator_decimator",
    bestUse: "precision_weigh_scale",
  },
  dual_slope_integ: {
    speed: 1, resolution: 8, powerDraw: 2,
    latency: 1, archCost: 2, differential: false,
    forAudio: false, topology: "integrator_counter",
    bestUse: "digital_multimeter",
  },
};

const get = (t: AdcArchitecture) => DATA[t];

export const speed = (t: AdcArchitecture) => get(t).speed;
export const resolution = (t: AdcArchitecture) => get(t).resolution;
export const powerDraw = (t: AdcArchitecture) => get(t).powerDraw;
export const latency = (t: AdcArchitecture) => get(t).latency;
export const archCost = (t: AdcArchitecture) => get(t).archCost;
export const differential = (t: AdcArchitecture) => get(t).differential;
export const forAudio = (t: AdcArchitecture) => get(t).forAudio;
export const topology = (t: AdcArchitecture) => get(t).topology;
export const bestUse = (t: AdcArchitecture) => get(t).bestUse;
export const adcArchitectures = (): AdcArchitecture[] => Object.keys(DATA) as AdcArchitecture[];
