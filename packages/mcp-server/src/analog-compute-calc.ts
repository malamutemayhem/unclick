export type AnalogCompute =
  | "opamp_integrator"
  | "switched_capacitor"
  | "log_domain_filter"
  | "charge_domain_ccd"
  | "stochastic_bit_stream";

const DATA: Record<AnalogCompute, {
  speed: number; powerEff: number; accuracy: number;
  noiseTolerance: number; anaCost: number; digital: boolean;
  forSignal: boolean; domain: string; bestUse: string;
}> = {
  opamp_integrator: {
    speed: 6, powerEff: 7, accuracy: 8,
    noiseTolerance: 5, anaCost: 3, digital: false,
    forSignal: true, domain: "continuous_time_voltage",
    bestUse: "ode_solver_physical",
  },
  switched_capacitor: {
    speed: 7, powerEff: 8, accuracy: 9,
    noiseTolerance: 7, anaCost: 4, digital: false,
    forSignal: true, domain: "discrete_time_charge",
    bestUse: "adc_filter_pipeline",
  },
  log_domain_filter: {
    speed: 8, powerEff: 10, accuracy: 6,
    noiseTolerance: 4, anaCost: 5, digital: false,
    forSignal: true, domain: "subthreshold_mos_current",
    bestUse: "biomedical_ultra_low_power",
  },
  charge_domain_ccd: {
    speed: 5, powerEff: 6, accuracy: 7,
    noiseTolerance: 6, anaCost: 6, digital: false,
    forSignal: false, domain: "bucket_brigade_shift",
    bestUse: "analog_delay_line_sonar",
  },
  stochastic_bit_stream: {
    speed: 9, powerEff: 9, accuracy: 5,
    noiseTolerance: 10, anaCost: 2, digital: true,
    forSignal: false, domain: "probability_encoded_bits",
    bestUse: "fault_tolerant_nn_edge",
  },
};

const get = (t: AnalogCompute) => DATA[t];

export const speed = (t: AnalogCompute) => get(t).speed;
export const powerEff = (t: AnalogCompute) => get(t).powerEff;
export const accuracy = (t: AnalogCompute) => get(t).accuracy;
export const noiseTolerance = (t: AnalogCompute) => get(t).noiseTolerance;
export const anaCost = (t: AnalogCompute) => get(t).anaCost;
export const digital = (t: AnalogCompute) => get(t).digital;
export const forSignal = (t: AnalogCompute) => get(t).forSignal;
export const domain = (t: AnalogCompute) => get(t).domain;
export const bestUse = (t: AnalogCompute) => get(t).bestUse;
export const analogComputes = (): AnalogCompute[] => Object.keys(DATA) as AnalogCompute[];
