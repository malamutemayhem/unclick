export type SampleHold =
  | "cmos_switch_cap"
  | "open_loop_diode"
  | "closed_loop_opamp"
  | "flip_around_sha"
  | "bootstrapped_nmos";

const DATA: Record<SampleHold, {
  acqTime: number; droop: number; aperture: number;
  feedthrough: number; shCost: number; differential: boolean;
  forHighSpeed: boolean; architecture: string; bestUse: string;
}> = {
  cmos_switch_cap: {
    acqTime: 6, droop: 5, aperture: 6,
    feedthrough: 5, shCost: 2, differential: false,
    forHighSpeed: false, architecture: "transmission_gate_cap",
    bestUse: "sigma_delta_frontend",
  },
  open_loop_diode: {
    acqTime: 9, droop: 4, aperture: 8,
    feedthrough: 4, shCost: 4, differential: false,
    forHighSpeed: true, architecture: "diode_bridge_hold",
    bestUse: "rf_subsampling_rx",
  },
  closed_loop_opamp: {
    acqTime: 5, droop: 8, aperture: 5,
    feedthrough: 8, shCost: 5, differential: false,
    forHighSpeed: false, architecture: "unity_gain_buffer",
    bestUse: "data_acq_multiplex",
  },
  flip_around_sha: {
    acqTime: 8, droop: 7, aperture: 9,
    feedthrough: 7, shCost: 6, differential: true,
    forHighSpeed: true, architecture: "cap_flip_diff_pair",
    bestUse: "pipeline_adc_stage",
  },
  bootstrapped_nmos: {
    acqTime: 10, droop: 6, aperture: 10,
    feedthrough: 9, shCost: 3, differential: false,
    forHighSpeed: true, architecture: "boot_clock_switch",
    bestUse: "gsps_adc_input",
  },
};

const get = (t: SampleHold) => DATA[t];

export const acqTime = (t: SampleHold) => get(t).acqTime;
export const droop = (t: SampleHold) => get(t).droop;
export const aperture = (t: SampleHold) => get(t).aperture;
export const feedthrough = (t: SampleHold) => get(t).feedthrough;
export const shCost = (t: SampleHold) => get(t).shCost;
export const differential = (t: SampleHold) => get(t).differential;
export const forHighSpeed = (t: SampleHold) => get(t).forHighSpeed;
export const architecture = (t: SampleHold) => get(t).architecture;
export const bestUse = (t: SampleHold) => get(t).bestUse;
export const sampleHolds = (): SampleHold[] => Object.keys(DATA) as SampleHold[];
